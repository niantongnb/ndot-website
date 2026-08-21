(function(){
  var hex = function(c){
    var m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c);
    if(!m) return '111110';
    return [1,2,3].map(function(i){ return ('0'+parseInt(m[i],10).toString(16)).slice(-2); }).join('').toUpperCase();
  };
  var isBlock = function(el){ var d = getComputedStyle(el).display; return d !== 'inline' && d !== 'contents'; };
  var styleOf = function(el){
    var cs = getComputedStyle(el);
    return { f: cs.fontFamily.toLowerCase().indexOf('plex') >= 0 ? 'M' : 'N',
      s: Math.round(parseFloat(cs.fontSize) * 0.75 * 10) / 10,
      b: parseInt(cs.fontWeight, 10) >= 600 ? 1 : 0,
      i: cs.fontStyle === 'italic' ? 1 : 0,
      c: hex(cs.color),
      sp: Math.round(parseFloat(cs.letterSpacing || 0) * 0.75 * 100) / 100 || 0,
      u: cs.textTransform === 'uppercase' };
  };
  var table = [], index = {};
  var sid = function(st){
    var k = [st.f,st.s,st.b,st.i,st.c,st.sp].join('|');
    if(!(k in index)){ index[k] = table.length; table.push([st.f, st.s, st.b, st.i, st.c, st.sp]); }
    return index[k];
  };
  var out = [];
  document.querySelectorAll('.page').forEach(function(pg){
    var pr = pg.getBoundingClientRect(), S = pr.width / 1280, blocks = [];
    var visit = function(el){
      Array.prototype.forEach.call(el.children, function(ch){
        var tn = ch.tagName.toLowerCase();
        if(tn === 'canvas' || tn === 'svg') return;
        if(isBlock(ch)) visit(ch);
      });
      var paras = [[]], textNodes = [];
      var walk = function(node, st){
        Array.prototype.forEach.call(node.childNodes, function(n){
          if(n.nodeType === 3){
            var t = n.textContent.replace(/\s+/g, ' ');
            if(t.trim()){ paras[paras.length-1].push({ t: st.u ? t.toUpperCase() : t, s: sid(st) }); textNodes.push(n); }
          } else if(n.nodeType === 1){
            var tn2 = n.tagName.toLowerCase();
            if(tn2 === 'br'){ paras.push([]); return; }
            if(tn2 === 'canvas' || tn2 === 'svg') return;
            if(isBlock(n)) return;
            walk(n, styleOf(n));
          }
        });
      };
      walk(el, styleOf(el));
      if(!textNodes.length) return;
      var top = Infinity, bot = -Infinity;
      textNodes.forEach(function(n){
        var rg = document.createRange(); rg.selectNodeContents(n);
        Array.prototype.forEach.call(rg.getClientRects(), function(r){
          if(r.height){ top = Math.min(top, r.top); bot = Math.max(bot, r.bottom); }
        });
      });
      if(!isFinite(top)) return;
      var r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      var pl = parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth);
      var prr = parseFloat(cs.paddingRight) + parseFloat(cs.borderRightWidth);
      blocks.push({
        x: Math.round((r.left - pr.left + pl) / S * 10) / 10,
        y: Math.round((top - pr.top) / S * 10) / 10,
        w: Math.round((r.width - pl - prr) / S * 10) / 10,
        h: Math.round((bot - top) / S * 10) / 10,
        a: cs.textAlign === 'right' ? 'r' : (cs.textAlign === 'center' ? 'c' : 'l'),
        lh: Math.round((parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2) * 0.75 * 10) / 10,
        p: paras.filter(function(p){ return p.length; })
      });
    };
    visit(pg);
    out.push(blocks);
  });
  return JSON.stringify({ styles: table, pages: out });
})()
