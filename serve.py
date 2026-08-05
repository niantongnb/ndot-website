#!/usr/bin/env python3
"""Dev server for the NDot pages.

Identical to `python3 -m http.server` except it tells the browser never to
cache. Without this, edits to index.html / v2.html appear not to take effect
because the browser keeps serving its stored copy.
"""
import functools
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def send_header(self, keyword, value):
        # drop the validator that would otherwise let a browser 304
        if keyword == "Last-Modified":
            return
        super().send_header(keyword, value)

    def log_message(self, fmt, *args):
        sys.stderr.write("%s\n" % (fmt % args))


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8899
    handler = functools.partial(NoCacheHandler, directory=ROOT)
    with http.server.ThreadingHTTPServer(("", port), handler) as httpd:
        print(f"NDot site on http://localhost:{port}  (no-cache)", flush=True)
        httpd.serve_forever()


if __name__ == "__main__":
    main()
