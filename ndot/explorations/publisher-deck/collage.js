/* =============================================================================
   ndot collage engine
   -----------------------------------------------------------------------------
   The generative layer behind the publisher-deck exploration, lifted out of the
   deck so it can be pointed at any canvas.

   Flat cut shapes, each filled once and then screened with a printed texture,
   over a construction lattice, with an isometric box as the recurring object and
   the accent used exactly once per composition, as the dot inside that box.

   Deterministic: same seed, same composition. Nothing here reads the DOM beyond
   the canvas you hand it, and nothing animates.

   Usage
   -----
     <canvas id="art" style="width:1200px;height:700px"></canvas>
     <script src="collage.js"></script>
     <script>
       NDot.paint(document.getElementById('art'), {
         recipe: 'cover',                 // cover | div1..div4 | terms | quiet | photo
         zone:   [0.55, 0, 0.48, 1],      // where the fragments live, page fractions
         dark:   false,                   // inverted band
         seed:   2026
       });
     </script>

   Lower level, if you want one piece rather than a whole plate:

     NDot.isoBox(ctx, cx, cy, size, { top, left, right, dot, screen });
     ctx.fillStyle = NDot.texture(ctx, 'dots', '#111110', 6);   // dots|hatch|cross|rule|grit
     NDot.guides(ctx, w, h, NDot.rng(41), { dark:false, cols:4, rows:3, nodes:3 });

   Palette lives in NDot.PALETTE and mirrors tokens.json.
   ============================================================================= */
(function (root) {
  "use strict";

  var PAL = {
    ink:'#111110', d1:'#2A2A26', d2:'#43433C', d3:'#6B6B63',
    m1:'#9A9A90', m2:'#C9C9C0', l1:'#D8D8CE', l2:'#E6E6DF', l3:'#F1F1EC',
    paper:'#FAFAF8', accent:'#A6231A', accentInk:'#E86A52'
  };
  var LIGHT_SET = [PAL.l3, PAL.l3, PAL.l2, PAL.l2, PAL.l1, PAL.l1, PAL.m2, PAL.m2,
                   PAL.m1, PAL.m1, PAL.d3, PAL.d2];
  var DARK_SET  = [PAL.d1, PAL.d1, PAL.d2, PAL.d2, '#33332E', '#33332E',
                   PAL.d3, PAL.m1, PAL.m2];

  function mkRng(seed){
    var s = (seed >>> 0) || 1;
    return function(){ s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function pick(r, arr){ return arr[Math.floor(r() * arr.length) % arr.length]; }
  function lerp(a,b,t){ return a + (b-a)*t; }

  /* --- texture tiles, cached by key --- */
  var TILES = {};
  function tile(key, w, h, draw){
    if(TILES[key]) return TILES[key];
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    TILES[key] = c;
    return c;
  }
  function texture(ctx, kind, colour, scale){
    var key = kind + '|' + colour + '|' + scale;
    var t, m;
    if(kind === 'dots'){
      t = tile(key, scale, scale, function(c,w,h){
        c.fillStyle = colour; c.beginPath();
        c.arc(w/2, h/2, w*0.23, 0, Math.PI*2); c.fill();
      });
      m = new DOMMatrix().rotateSelf(45);
    } else if(kind === 'hatch'){
      t = tile(key, scale, scale, function(c,w,h){
        c.strokeStyle = colour; c.lineWidth = 1;
        c.beginPath(); c.moveTo(0, h + 0.5); c.lineTo(w, h + 0.5); c.stroke();
      });
      m = new DOMMatrix().rotateSelf(-38);
    } else if(kind === 'cross'){
      t = tile(key, scale, scale, function(c,w,h){
        c.strokeStyle = colour; c.lineWidth = 0.9;
        c.beginPath();
        c.moveTo(0, h + 0.5); c.lineTo(w, h + 0.5);
        c.moveTo(w + 0.5, 0); c.lineTo(w + 0.5, h);
        c.stroke();
      });
      m = new DOMMatrix().rotateSelf(24);
    } else if(kind === 'rule'){
      t = tile(key, scale, scale, function(c,w,h){
        c.strokeStyle = colour; c.lineWidth = 1.4;
        c.beginPath(); c.moveTo(0, h - 1); c.lineTo(w, h - 1); c.stroke();
      });
      m = new DOMMatrix();
    } else { /* grit */
      t = tile(key, 90, 90, function(c,w,h){
        var img = c.createImageData(w, h), d = img.data;
        var rr = parseInt(colour.slice(1,3),16), gg = parseInt(colour.slice(3,5),16), bb = parseInt(colour.slice(5,7),16);
        var q = mkRng(9173);
        for(var i = 0; i < d.length; i += 4){
          var v = q();
          d[i] = rr; d[i+1] = gg; d[i+2] = bb;
          d[i+3] = v > 0.76 ? Math.floor(v * 165) : 0;
        }
        c.putImageData(img, 0, 0);
      });
      m = new DOMMatrix();
    }
    var p = ctx.createPattern(t, 'repeat');
    if(m && p.setTransform) p.setTransform(m);
    return p;
  }

  /* --- one cut shape, filled then screened --- */
  function cut(ctx, path, box, colour, kind, scale, alpha, texColour){
    ctx.save();
    ctx.beginPath(); path(ctx); ctx.clip();
    ctx.globalAlpha = alpha === undefined ? 1 : alpha;
    ctx.fillStyle = colour;
    ctx.fillRect(box[0], box[1], box[2], box[3]);
    if(kind){
      ctx.globalAlpha = (alpha === undefined ? 1 : alpha) * 0.5;
      ctx.fillStyle = texture(ctx, kind, texColour || '#FFFFFF', scale || 7);
      ctx.fillRect(box[0], box[1], box[2], box[3]);
    }
    ctx.restore();
  }

  var SHAPES = ['rect','circle','half','quarter','tri','band','strip','strip'];
  function shapePath(kind, x, y, w, h, rot){
    return function(ctx){
      ctx.save();
      ctx.translate(x + w/2, y + h/2);
      ctx.rotate(rot);
      ctx.translate(-w/2, -h/2);
      if(kind === 'rect'){ ctx.rect(0, 0, w, h); }
      else if(kind === 'circle'){ ctx.arc(w/2, h/2, Math.min(w,h)/2, 0, Math.PI*2); }
      else if(kind === 'half'){ ctx.arc(w/2, h, Math.min(w,h*2)/2, Math.PI, 0); ctx.closePath(); }
      else if(kind === 'quarter'){ ctx.moveTo(0, h); ctx.arc(0, h, Math.min(w,h), -Math.PI/2, 0); ctx.closePath(); }
      else if(kind === 'tri'){ ctx.moveTo(0, h); ctx.lineTo(w/2, 0); ctx.lineTo(w, h); ctx.closePath(); }
      else if(kind === 'strip'){ ctx.rect(0, h*0.42, w * 1.7, h * 0.14); }
      else { ctx.rect(0, h*0.36, w, h*0.28); }
      ctx.restore();
    };
  }

  /* --- big washed plates, the ground layer of the collage --- */
  function plates(ctx, Z, R, opt){
    var pale = opt.dark
      ? ['#1E1E1A','#262622','#2E2E29','#33332E','#3A3A34']
      : [PAL.l3, PAL.l2, PAL.l1, PAL.m2, '#EDEDE6', '#E0E0D8'];
    for(var i = 0; i < (opt.count || 3); i++){
      var w = Z[2] * lerp(0.34, 0.82, R());
      var h = Z[3] * lerp(0.3, 0.76, R());
      var x = Math.max(Z[0] - w * 0.1, Z[0] + Z[2] * (0.5 + (R() - 0.5) * 1.15) - w / 2);
      if(opt.clampRight) x = Math.min(x, Z[0] + Z[2] - w * 0.9);
      var y = Z[1] + Z[3] * (0.5 + (R() - 0.5) * 1.15) - h / 2;
      var kind = pick(R, ['rect','circle','half','tri']);
      cut(ctx, shapePath(kind, x, y, w, h, (R() - 0.5) * 0.5), [x - w, y - h, w * 3, h * 3],
          pick(R, pale), pick(R, ['grit','rule','cross',null]), 5 + Math.floor(R() * 4),
          lerp(0.26, 0.58, R()), '#FFFFFF');
    }
  }

  /* --- drafting guides ---
     Positions come off the page's own 96px column lattice, never off a random
     float: two lines landing 3px apart reads as a printing fault, not a grid.
     A minimum gap of two columns is enforced on top of that. --- */
  function pickLattice(R, lattice, n, minGap){
    var pool = lattice.slice(), out = [], v;
    while(out.length < n && pool.length){
      v = pool.splice(Math.floor(R() * pool.length), 1)[0];
      if(out.every(function(o){ return Math.abs(o - v) >= minGap; })) out.push(v);
    }
    return out.sort(function(a, b){ return a - b; });
  }

  var COL = 96, MARGIN = 64;
  function guides(ctx, W, H, R, opt){
    var line = opt.dark ? 'rgba(244,244,238,0.15)' : 'rgba(17,17,16,0.10)';
    var node = opt.dark ? 'rgba(244,244,238,0.45)' : 'rgba(17,17,16,0.45)';
    var xLat = [], yLat = [], v;
    /* skip the two outer boundaries: a guide sitting exactly on the margin
       reads as a stray rule beside the text rather than as construction */
    for(v = MARGIN + COL; v <= W - MARGIN - COL + 1; v += COL) xLat.push(Math.round(v) + 0.5);
    /* start below the eyebrow rule and stop above the foot rule, so a guide
       never lands a couple of pixels off one of the layout's own hairlines */
    for(v = 216; v <= H - 120 + 1; v += COL) yLat.push(Math.round(v) + 0.5);

    var xs = pickLattice(R, xLat, opt.cols || 3, COL * 2);
    var ys = pickLattice(R, yLat, opt.rows === 0 ? 0 : (opt.rows || 2), COL * 2);

    ctx.strokeStyle = line; ctx.lineWidth = 1;
    ctx.beginPath();
    xs.forEach(function(x){ ctx.moveTo(x, 0); ctx.lineTo(x, H); });
    ys.forEach(function(y){ ctx.moveTo(0, y); ctx.lineTo(W, y); });
    ctx.stroke();

    /* diagonals are struck between lattice intersections, so they land on the
       same construction as the rules rather than floating free */
    if(opt.diagonals !== false && xLat.length > 3){
      ctx.beginPath();
      for(var i = 0; i < 2; i++){
        var y0 = yLat[Math.floor(R() * yLat.length)];
        var y1 = yLat[Math.floor(R() * yLat.length)];
        ctx.moveTo(-40, y0); ctx.lineTo(W + 40, y1 - COL * (1 + i));
      }
      ctx.stroke();
    }

    /* a node only exists where two drawn rules actually cross */
    if(xs.length && ys.length){
      ctx.fillStyle = node;
      var marks = Math.min(opt.nodes === undefined ? 2 : opt.nodes, xs.length * ys.length);
      for(var k = 0; k < marks; k++){
        ctx.beginPath();
        ctx.arc(xs[k % xs.length], ys[Math.floor(k / xs.length) % ys.length], 4.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  /* --- the box with the dot inside it --- */
  function isoBox(ctx, cx, cy, s, R, opt){
    var kx = s * 0.866, ky = s * 0.5;
    var faces = [
      { pts:[[0,-s],[kx,-ky],[0,0],[-kx,-ky]], col: opt.top,   tex:'grit',  sc:7 },
      { pts:[[-kx,-ky],[0,0],[0,s],[-kx,ky]],  col: opt.left,  tex:'hatch', sc:5 },
      { pts:[[kx,-ky],[0,0],[0,s],[kx,ky]],    col: opt.right, tex:'dots',  sc:6 }
    ];
    faces.forEach(function(f){
      ctx.save();
      ctx.beginPath();
      f.pts.forEach(function(p,i){ i ? ctx.lineTo(cx+p[0], cy+p[1]) : ctx.moveTo(cx+p[0], cy+p[1]); });
      ctx.closePath(); ctx.clip();
      ctx.fillStyle = f.col;
      ctx.fillRect(cx-kx-2, cy-s-2, kx*2+4, s*2+4);
      ctx.globalAlpha = 0.24;
      ctx.fillStyle = texture(ctx, f.tex, opt.screen || '#FFFFFF', f.sc);
      ctx.fillRect(cx-kx-2, cy-s-2, kx*2+4, s*2+4);
      ctx.restore();
    });
    /* the dot, held at the inner corner */
    var dr = s * 0.15;
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, dr, 0, Math.PI*2);
    ctx.fillStyle = opt.dot || PAL.ink; ctx.fill();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = texture(ctx, 'grit', '#FFFFFF', 7);
    ctx.fill();
    ctx.restore();
  }

  /* --- paper tooth over the whole plate --- */
  function tooth(ctx, W, H, dark){
    ctx.save();
    ctx.globalAlpha = dark ? 0.16 : 0.2;
    ctx.fillStyle = texture(ctx, 'grit', dark ? '#FFFFFF' : '#6B6B63', 7);
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  /* Z is the zone the fragments live in: [x, y, w, h] in device px */
  function scatter(ctx, Z, R, set, opt){
    var n = opt.count || 12;
    for(var i = 0; i < n; i++){
      var kind = pick(R, SHAPES);
      var t = R(), sz;
      if(t < 0.58)      sz = lerp(opt.min || 26, (opt.max || 190) * 0.36, R());
      else if(t < 0.88) sz = lerp((opt.max || 190) * 0.36, (opt.max || 190) * 0.68, R());
      else              sz = lerp((opt.max || 190) * 0.68, opt.max || 190, R());
      var w = sz, h = sz * lerp(0.5, 1.25, R());
      var x, y;
      if(opt.order){                      /* assembled: snapped to the grid */
        x = Z[0] + Math.round(Z[2] * (0.02 + 0.8 * R()) / 24) * 24;
        y = Z[1] + Math.round(Z[3] * (0.04 + 0.78 * R()) / 24) * 24;
      } else {                            /* fragments: adrift, densest at the core */
        x = Z[0] + Z[2] * (0.5 + (R() + R() + R() - 1.5) * 0.62);
        y = Z[1] + Z[3] * (0.5 + (R() + R() + R() - 1.5) * 0.66);
      }
      x = Math.max(x, Z[0] - w * 0.12);
      if(opt.clampRight) x = Math.min(x, Z[0] + Z[2] - w);
      var rot = opt.order ? 0 : (R() - 0.5) * 1.05;
      var col = pick(R, set);
      var tex = pick(R, ['grit','hatch','dots','cross','rule', null]);
      var al  = lerp(0.55, 1, R());
      cut(ctx, shapePath(kind, x, y, w, h, rot), [x - w, y - h, w * 3, h * 3],
          col, tex, 4 + Math.floor(R() * 5), al, opt.screen || '#FFFFFF');
    }
  }


  /* --------------------------------------------------------------------------
     Public surface. paint() takes the options directly rather than reading
     data- attributes, so it does not care how the host page is marked up.
     -------------------------------------------------------------------------- */
  function paintCanvas(cv, opt) {
    opt = opt || {};
    var W = cv.clientWidth, H = cv.clientHeight;
    if (!W || !H) return false;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr;
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    var recipe = opt.recipe || 'cover';
    var dark = !!opt.dark;
    var set = dark ? DARK_SET : LIGHT_SET;
    var screen = '#FFFFFF';
    var z = opt.zone || [0, 0, 1, 1];
    var Z = [z[0] * W, z[1] * H, z[2] * W, z[3] * H];
    var zc = Z[0] + Z[2] * 0.5, zm = Math.min(Z[2], Z[3]);
    var R = mkRng(opt.seed || 2026);

    if (recipe === 'quiet') {
      ctx.globalAlpha = 0.55;
      guides(ctx, W, H, R, { dark: dark, cols: 2, rows: 0, nodes: 0, diagonals: false });
      ctx.globalAlpha = 1;
      scatter(ctx, Z, R, set, { count: 4, min: 22, max: 78, screen: screen, clampRight: z[0] < 0.2 });
      tooth(ctx, W, H, dark);
      return true;
    }

    if (recipe === 'photo') {
      ctx.fillStyle = PAL.l2; ctx.fillRect(0, 0, W, H);
      cut(ctx, function (c) { c.rect(0, 0, W, H * 0.62); }, [0, 0, W, H], PAL.d2, 'grit', 7, 1);
      cut(ctx, function (c) { c.arc(W * 0.72, H * 0.62, H * 0.42, 0, Math.PI * 2); }, [0, 0, W, H], PAL.m1, 'dots', 5, 0.95);
      cut(ctx, function (c) { c.moveTo(0, H); c.lineTo(W * 0.42, H * 0.3); c.lineTo(W * 0.68, H); c.closePath(); }, [0, 0, W, H], PAL.m2, 'hatch', 5, 0.9);
      tooth(ctx, W, H, false);
      return true;
    }

    var stage = /^div([1-4])$/.exec(recipe);
    plates(ctx, Z, R, { dark: dark, count: stage ? (stage[1] === '1' ? 5 : 3) : 4 });
    guides(ctx, W, H, R, { dark: dark, cols: 4, rows: 3, nodes: 3 });

    if (stage) {
      var n = parseInt(stage[1], 10);
      scatter(ctx, Z, R, set, {
        count: n === 1 ? 26 : n === 2 ? 20 : 12,
        min: 26, max: n === 1 ? 150 : 185,
        order: n >= 3, screen: screen
      });
      if (n === 2) isoBox(ctx, zc + Z[2] * 0.07, H * 0.54, zm * 0.17, R, { top: PAL.d3, left: PAL.m2, right: PAL.l2, dot: PAL.accent, screen: screen });
      if (n === 3) isoBox(ctx, zc, H * 0.5, zm * 0.27, R, { top: PAL.m1, left: PAL.d2, right: PAL.m2, dot: PAL.accentInk, screen: screen });
      if (n === 4) isoBox(ctx, zc + Z[2] * 0.03, H * 0.5, zm * 0.24, R, { top: PAL.d1, left: PAL.d2, right: PAL.m2, dot: PAL.accent, screen: screen });
    } else if (recipe === 'terms') {
      scatter(ctx, Z, R, set, { count: 8, min: 36, max: 170, order: true, screen: screen });
      isoBox(ctx, zc + Z[2] * 0.06, H * 0.52, zm * 0.23, R, { top: PAL.m1, left: PAL.d1, right: PAL.d3, dot: PAL.accentInk, screen: screen });
    } else {
      scatter(ctx, Z, R, set, { count: 16, min: 30, max: 175, screen: screen });
      isoBox(ctx, zc + Z[2] * 0.05, H * 0.47, zm * 0.235, R, { top: PAL.d1, left: PAL.d2, right: PAL.m2, dot: PAL.accent, screen: screen });
      scatter(ctx, Z, R, set, { count: 7, min: 22, max: 78, screen: screen });
    }
    tooth(ctx, W, H, dark);
    return true;
  }

  root.NDot = {
    paint:   paintCanvas,
    isoBox:  function (ctx, cx, cy, s, opt) { return isoBox(ctx, cx, cy, s, mkRng(1), opt); },
    texture: texture,
    guides:  guides,
    tooth:   tooth,
    scatter: scatter,
    plates:  plates,
    rng:     mkRng,
    PALETTE: PAL,
    LIGHT_SET: LIGHT_SET,
    DARK_SET: DARK_SET
  };
})(typeof window !== 'undefined' ? window : this);
