"""Run a JS expression in headless Chrome via CDP and write the result to a file."""
import json, subprocess, sys, time, urllib.request, os, signal
import websocket

CHROME = os.path.expanduser(
    "~/Library/Caches/ms-playwright/chromium_headless_shell-1228/"
    "chrome-headless-shell-mac-arm64/chrome-headless-shell")

url, js_path, out_path = sys.argv[1], sys.argv[2], sys.argv[3]
port = 9333

proc = subprocess.Popen(
    [CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
     f"--remote-debugging-port={port}", "--remote-allow-origins=*", "--window-size=1280,720",
     "--no-first-run", "--user-data-dir=/tmp/cdp-profile-ndot", url],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

try:
    ws_url = None
    for _ in range(80):
        try:
            tabs = json.load(urllib.request.urlopen(f"http://127.0.0.1:{port}/json"))
            pages = [t for t in tabs if t.get("type") == "page"]
            if pages:
                ws_url = pages[0]["webSocketDebuggerUrl"]
                break
        except Exception:
            pass
        time.sleep(0.25)
    if not ws_url:
        sys.exit("could not reach the debugger")

    ws = websocket.create_connection(ws_url, timeout=60)

    def send(mid, method, params=None):
        ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
        while True:
            msg = json.loads(ws.recv())
            if msg.get("id") == mid:
                return msg

    # let fonts and the canvas painting settle
    send(1, "Runtime.enable")
    for _ in range(40):
        r = send(2, "Runtime.evaluate", {
            "expression": "document.fonts.status === 'loaded' && "
                          "document.querySelectorAll('canvas[data-art]').length > 0",
            "returnByValue": True})
        if r["result"]["result"].get("value"):
            break
        time.sleep(0.25)
    time.sleep(1.5)

    expr = open(js_path, encoding="utf-8").read()
    r = send(3, "Runtime.evaluate", {"expression": expr, "returnByValue": True,
                                     "awaitPromise": True})
    res = r["result"]["result"]
    if res.get("subtype") == "error" or "exceptionDetails" in r["result"]:
        sys.exit("JS error: " + json.dumps(r["result"])[:800])
    open(out_path, "w", encoding="utf-8").write(res["value"])
    print("wrote", out_path, len(res["value"]), "bytes")
finally:
    proc.send_signal(signal.SIGTERM)
    proc.wait(timeout=10)
