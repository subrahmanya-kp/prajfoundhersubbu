/* @ds-bundle: {"format":4,"namespace":"Vivaha","components":[{"name":"Button"},{"name":"Icon"},{"name":"Ornament"},{"name":"Toran"},{"name":"Monogram"},{"name":"SectionHeading"},{"name":"Hero"},{"name":"Countdown"},{"name":"EventCard"},{"name":"VenueCard"},{"name":"Footer"}]} */
(function () {
  var React = window.React, h = React.createElement, useState = React.useState, useEffect = React.useEffect;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }
  var S = { stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };
  function st(extra) { return Object.assign({}, S, extra); }

  /* Icon */
  var PATHS = {
    lamp: function () { return [ // kuthu vilakku
      h('path', { key: 1, d: 'M12 1.8c.9 1.1 1.3 2 1.3 2.8a1.3 1.3 0 0 1-2.6 0c0-.8.4-1.7 1.3-2.8z', fill: 'currentColor' }),
      h('path', { key: 2, d: 'M6.2 4.4c.6.8.9 1.4.9 2a.9.9 0 0 1-1.8 0c0-.6.3-1.2.9-2zM17.8 4.4c.6.8.9 1.4.9 2a.9.9 0 0 1-1.8 0c0-.6.3-1.2.9-2z', fill: 'currentColor' }),
      h('path', { key: 3, d: 'M4.5 8.2h15c-.6 2-3.8 3.3-7.5 3.3S5.1 10.2 4.5 8.2z', fill: 'currentColor' }),
      h('path', { key: 4, d: 'M12 11.5v7M10 14h4' , stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }),
      h('path', { key: 5, d: 'M7.5 21.8c.6-2 2.4-3.3 4.5-3.3s3.9 1.3 4.5 3.3z', fill: 'currentColor' })]; },
    kalash: function () { return [
      h('path', { key: 1, d: 'M12 1.8c.9 1.3 1.3 2.4 1.3 3.3a1.3 1.3 0 0 1-2.6 0c0-.9.4-2 1.3-3.3z', fill: 'currentColor' }),
      h('path', { key: 2, d: 'M7 7.5c1.5-.9 3.2-1.3 5-1.3s3.5.4 5 1.3M5.5 6.8l2.3 1.4M18.5 6.8l-2.3 1.4' , stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', fill: 'none' }),
      h('path', { key: 3, d: 'M8.5 9h7v1.3c3 1.3 4.5 3.8 4.5 6.4 0 3-2.6 5.3-8 5.3s-8-2.3-8-5.3c0-2.6 1.5-5.1 4.5-6.4z', fill: 'currentColor' })]; },
    jasmine: function () {
      var out = [];
      for (var i = 0; i < 5; i++) out.push(h('ellipse', { key: i, cx: 12, cy: 6.6, rx: 2.8, ry: 5, transform: 'rotate(' + (i * 72) + ' 12 12)', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 }));
      out.push(h('circle', { key: 'c', cx: 12, cy: 12, r: 1.8, fill: 'currentColor' }));
      return out; },
    lotus: function () { return [
      h('path', { key: 1, d: 'M12 4c2 2.2 3 4.6 3 7.2 0 2.7-1.2 4.8-3 6.3-1.8-1.5-3-3.6-3-6.3C9 8.6 10 6.2 12 4z', fill: 'currentColor' }),
      h('path', { key: 2, d: 'M12 17.5c-1.8-.2-4.8-1.2-6.4-3.5-1-1.5-1.4-3.2-1.4-4.6 2 .2 4.2 1.2 5.2 2.6M12 17.5c1.8-.2 4.8-1.2 6.4-3.5 1-1.5 1.4-3.2 1.4-4.6-2 .2-4.2 1.2-5.2 2.6', fill: 'currentColor', opacity: .75 }),
      h('path', { key: 3, d: 'M3 19.5c3 .8 6 1.2 9 1.2s6-.4 9-1.2', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', fill: 'none' })]; },
    rings: function () { return [
      h('circle', { key: 1, cx: 9, cy: 14, r: 5.5, fill: 'none', stroke: 'currentColor', strokeWidth: 1.7 }),
      h('circle', { key: 2, cx: 15, cy: 14, r: 5.5, fill: 'none', stroke: 'currentColor', strokeWidth: 1.7 }),
      h('path', { key: 3, d: 'M13 3.5l2 2.5-2 2.5-2-2.5z', fill: 'currentColor' })]; },
    calendar: function () { return [h('rect', { key: 1, x: 3.5, y: 5, width: 17, height: 15.5, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }), h('path', { key: 2, d: 'M3.5 10h17M8 3v4M16 3v4', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' })]; },
    clock: function () { return [h('circle', { key: 1, cx: 12, cy: 12, r: 8.5, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }), h('path', { key: 2, d: 'M12 7.5V12l3 2', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', fill: 'none' })]; },
    pin: function () { return [h('path', { key: 1, d: 'M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round' }), h('circle', { key: 2, cx: 12, cy: 10, r: 2.3, fill: 'currentColor' })]; }
  };
  function Icon(p) {
    var size = p.size || 24, draw = PATHS[p.name] || PATHS.lamp;
    return h('svg', { className: cx('vv-icon', p.className), width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': p.label ? undefined : 'true', role: p.label ? 'img' : undefined, 'aria-label': p.label, style: p.style }, draw());
  }
  Icon.names = Object.keys(PATHS);

  /* Button */
  function Button(p) {
    var cls = cx('vv-btn', 'vv-btn-' + (p.variant || 'primary'), p.size === 'lg' && 'vv-btn-lg', p.className);
    var rest = omit(p, ['variant', 'size', 'icon', 'className', 'children', 'href']);
    var kids = [p.icon ? h(Icon, { key: 'i', name: p.icon, size: 18 }) : null, h('span', { key: 't' }, p.children)];
    return p.href ? h('a', Object.assign({ href: p.href, className: cls }, rest), kids) : h('button', Object.assign({ type: 'button', className: cls }, rest), kids);
  }

  /* Ornament */
  function Ornament(p) {
    return h('div', { className: cx('vv-orn', p.onDark && 'vv-orn-light', p.className), role: 'separator' },
      h('span', { className: 'vv-orn-line l' }), h(Icon, { name: p.motif || 'lamp', size: p.size || 26 }), h('span', { className: 'vv-orn-line r' }));
  }

  /* Toran: mango leaves alternating with jasmine strings */
  function Toran(p) {
    var n = p.count || 16, U = 48, W = n * U, H = 96, kids = [], i, k;
    var d = 'M0 10';
    for (i = 0; i < n; i++) d += ' Q' + (i * U + U / 2) + ' 22 ' + ((i + 1) * U) + ' 10';
    kids.push(h('path', { key: 's', className: 'str', d: d }));
    kids.push(h('path', { key: 's2', className: 'str', d: 'M0 4 H' + W, style: { strokeWidth: 1.2 } }));
    for (i = 0; i < n; i++) {
      var x = i * U + U / 2;
      if (i % 2 === 0) {
        kids.push(h('g', { key: 'l' + i, transform: 'translate(' + x + ' 16)' },
          h('path', { className: 'leaf', d: 'M0 0 C 11 9 12 32 0 50 C -12 32 -11 9 0 0 Z' }), h('path', { className: 'rib', d: 'M0 4 V44' })));
      } else {
        var len = (i % 4 === 1) ? 5 : 7, end = 18 + len * 9;
        kids.push(h('line', { key: 't' + i, className: 'thr', x1: x, y1: 14, x2: x, y2: end }));
        for (k = 0; k < len; k++) {
          var y = 22 + k * 9, side = k % 2 ? 1 : -1;
          kids.push(h('ellipse', { key: 'b' + i + '-' + k, className: 'bud', cx: x + side * 2.6, cy: y, rx: 2.6, ry: 4.4, transform: 'rotate(' + (side * 22) + ' ' + (x + side * 2.6) + ' ' + y + ')' }));
        }
        kids.push(h('circle', { key: 'e' + i, className: 'bead', cx: x, cy: end + 3, r: 2.6 }));
      }
    }
    return h('svg', { className: cx('vv-toran', p.className), viewBox: '0 0 ' + W + ' ' + H, 'aria-hidden': 'true' }, kids);
  }

  /* Monogram */
  function Monogram(p) {
    var a = p.a || 'A', b = p.b || 'R', s = p.size || 64;
    return h('svg', { className: cx('vv-mono', p.className), width: s, height: s * 1.2, viewBox: '0 0 100 120', role: 'img', 'aria-label': a + ' and ' + b },
      h('path', { d: 'M8 116 V50 A42 42 0 0 1 92 50 V116 Z', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }),
      h('path', { d: 'M15 110 V51 A35 35 0 0 1 85 51 V110 Z', fill: 'none', stroke: 'currentColor', strokeWidth: 1, opacity: .6 }),
      h('path', { d: 'M50 12 c3 3.5 4.5 7 4.5 10.5 a4.5 4.5 0 0 1 -9 0 c0 -3.5 1.5 -7 4.5 -10.5z', fill: 'currentColor' }),
      h('text', { x: 50, y: 82, textAnchor: 'middle', fontSize: 36 }, a + '\u200A\u0026\u200A' + b),
      h('path', { d: 'M30 96 H70', stroke: 'currentColor', strokeWidth: 1 }),
      h('path', { d: 'M50 92 l4 4 -4 4 -4 -4z', fill: 'currentColor' }));
  }

  /* SectionHeading */
  function SectionHeading(p) {
    return h('header', { className: cx('vv-sh', p.className) },
      p.eyebrow ? h('p', { className: 'vv-eyebrow' }, p.eyebrow) : null,
      h('h2', { id: p.id }, p.title),
      p.intro ? h('p', { className: 'intro' }, p.intro) : null,
      p.ornament === false ? null : h(Ornament, { motif: p.motif || 'jasmine' }));
  }

  /* Hero */
  function Hero(p) {
    var events = p.events || [];
    var dates = [];
    events.forEach(function (e, i) {
      if (i) dates.push(h('li', { key: 's' + i, className: 'sep', 'aria-hidden': 'true' }));
      dates.push(h('li', { key: i }, h('span', { className: 'what' }, e.label), h('span', { className: 'when' }, e.date)));
    });
    return h('section', { className: cx('vv-hero vv-on-maroon', p.className), id: p.id, 'aria-label': 'Invitation' },
      h(Toran, { count: p.toranCount || 16 }),
      h('div', { className: 'vv-hero-frame' },
        h('span', { className: 'vv-hero-finial', 'aria-hidden': 'true' }, h(Icon, { name: 'kalash', size: 30 })),
        p.invocation === false ? null : h('p', { className: 'vv-hero-inv' }, p.invocation || '|| Sri Ganeshaya Namaha ||'),
        h('p', { className: 'vv-eyebrow' }, p.eyebrow || 'Together with their families'),
        h('h1', { className: 'vv-hero-names' }, p.bride || 'Ananya', ' ', h('span', { className: 'amp' }, p.joiner || 'weds'), ' ', p.groom || 'Rohan'),
        p.intro ? h('p', { className: 'vv-hero-intro' }, p.intro) : null,
        h(Ornament, { motif: 'lamp', onDark: true }),
        dates.length ? h('ul', { className: 'vv-hero-dates' }, dates) : null,
        p.place ? h('p', { className: 'vv-hero-place' }, p.place) : null,
        (p.primaryCta || p.secondaryCta) ? h('div', { className: 'vv-hero-ctas' },
          p.primaryCta ? h(Button, { variant: 'gold', size: 'lg', href: p.primaryCta.href }, p.primaryCta.label) : null,
          p.secondaryCta ? h(Button, { variant: 'outline-light', size: 'lg', href: p.secondaryCta.href }, p.secondaryCta.label) : null) : null));
  }

  /* Countdown */
  function diff(t) { var ms = Math.max(0, new Date(t).getTime() - Date.now()); return { done: ms === 0, d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60 }; }
  function Countdown(p) {
    var s = useState(function () { return diff(p.date); }), t = s[0], set = s[1];
    useEffect(function () { var id = setInterval(function () { set(diff(p.date)); }, 1000); return function () { clearInterval(id); }; }, [p.date]);
    if (t.done) return h('div', { className: 'vv-cd' }, h('p', { className: 'vv-cd-done' }, p.doneText || 'The celebrations have begun.'));
    return h('div', { className: 'vv-cd', role: 'timer', 'aria-label': t.d + ' days to go' },
      p.label ? h('p', { className: 'vv-eyebrow' }, p.label) : null,
      h('div', { className: 'vv-cd-tiles' }, [['d', 'Days'], ['h', 'Hours'], ['m', 'Minutes'], ['s', 'Seconds']].map(function (x) {
        return h('div', { key: x[0], className: 'vv-cd-tile' }, h('span', { className: 'vv-cd-num' }, String(t[x[0]]).padStart(2, '0')), h('span', { className: 'vv-cd-unit' }, x[1]));
      })));
  }

  /* EventCard */
  function EventCard(p) {
    var tone = p.tone || 'wedding';
    return h('article', { className: cx('vv-ev', 'vv-ev-' + tone, p.className) },
      h('div', { className: 'vv-ev-head' },
        h(Icon, { name: p.icon || (tone === 'engagement' ? 'rings' : 'kalash'), size: 40 }),
        p.day ? h('span', { className: 'vv-ev-day' }, p.day) : null,
        h('h3', { className: 'vv-ev-name' }, p.name)),
      h('div', { className: 'vv-ev-body' },
        p.description ? h('p', { className: 'vv-ev-desc' }, p.description) : null,
        p.date ? h('p', { className: 'vv-ev-meta' }, h(Icon, { name: 'calendar', size: 18 }), h('span', null, h('strong', null, p.date))) : null,
        p.time ? h('p', { className: 'vv-ev-meta' }, h(Icon, { name: 'clock', size: 18 }), h('span', null, h('strong', null, p.time), p.timeNote)) : null,
        p.venue ? h('p', { className: 'vv-ev-meta' }, h(Icon, { name: 'pin', size: 18 }), h('span', null, h('strong', null, p.venue), p.venueNote)) : null));
  }

  /* VenueCard with a kolam panel */
  function Kolam() {
    var g = [], S2 = 36, x, y;
    for (y = 0; y < 9; y++) for (x = 0; x < 14; x++) {
      var cx0 = x * S2 + 18, cy0 = y * S2 + 18;
      g.push(h('circle', { key: 'd' + x + '-' + y, cx: cx0, cy: cy0, r: 1.6, fill: 'currentColor' }));
      if ((x + y) % 2 === 0) g.push(h('path', { key: 'p' + x + '-' + y, d: 'M' + cx0 + ' ' + (cy0 - 14) + ' Q' + (cx0 + 14) + ' ' + (cy0 - 14) + ' ' + (cx0 + 14) + ' ' + cy0 + ' Q' + (cx0 + 14) + ' ' + (cy0 + 14) + ' ' + cx0 + ' ' + (cy0 + 14) + ' Q' + (cx0 - 14) + ' ' + (cy0 + 14) + ' ' + (cx0 - 14) + ' ' + cy0 + ' Q' + (cx0 - 14) + ' ' + (cy0 - 14) + ' ' + cx0 + ' ' + (cy0 - 14) + 'Z', fill: 'none', stroke: 'currentColor', strokeWidth: 1 }));
    }
    return h('svg', { className: 'kolam', viewBox: '0 0 504 324', preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': 'true' }, h('g', { opacity: .4 }, g));
  }
  function VenueCard(p) {
    return h('article', { className: cx('vv-venue', p.className) },
      h('div', { className: 'vv-venue-art' }, h(Kolam), h('span', { className: 'pin' }, h(Icon, { name: 'pin', size: 38 }))),
      h('div', { className: 'vv-venue-body' },
        p.eyebrow ? h('p', { className: 'vv-eyebrow' }, p.eyebrow) : null,
        h('h3', null, p.name),
        p.address ? h('address', null, p.address) : null,
        p.note ? h('p', { className: 'vv-venue-note' }, p.note) : null,
        p.mapHref ? h(Button, { variant: 'primary', href: p.mapHref, icon: 'pin', target: '_blank', rel: 'noopener' }, p.mapLabel || 'Open in Maps') : null));
  }

  /* Footer */
  function Footer(p) {
    return h('footer', { className: cx('vv-foot vv-on-maroon', p.className) },
      h(Toran, { count: p.toranCount || 16 }),
      h('div', { className: 'vv-foot-inner' },
        h(Monogram, { a: p.a, b: p.b, size: 56 }),
        h('p', { className: 'vv-foot-names' }, p.names || 'Ananya & Rohan'),
        h(Ornament, { motif: 'jasmine', onDark: true }),
        p.note ? h('p', { className: 'vv-foot-note' }, p.note) : null));
  }

  window.Vivaha = Object.assign(window.Vivaha || {}, { Button: Button, Icon: Icon, Ornament: Ornament, Toran: Toran, Monogram: Monogram, SectionHeading: SectionHeading, Hero: Hero, Countdown: Countdown, EventCard: EventCard, VenueCard: VenueCard, Footer: Footer });
})();
