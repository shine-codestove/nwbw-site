// NWBW 모션 그래픽 (index.html · en/index.html 공용)
// - 히어로: 트레일 길이 측정 → 드로잉, 러너가 트레일을 따라 정상까지 반복 이동, 능선 패럴랙스
// - 코스 여정: 스크롤 진행률에 따라 러너가 고도 프로필을 달리고, 지점마다 기능 카드 전환
// - 등장 효과: 카드가 화면에 들어올 때 페이드업
(function () {
    'use strict';

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var NS = 'http://www.w3.org/2000/svg';

    /* ---------- Hero ---------- */
    function initHero() {
        var trail = document.querySelector('[data-hero-trail]');
        var runner = document.querySelector('[data-hero-runner]');
        var ridges = document.querySelector('.hs-ridges');
        if (!trail) return;

        var len = trail.getTotalLength();
        trail.style.setProperty('--len', len.toFixed(0));

        function place(t) {
            var p = trail.getPointAtLength(len * t);
            runner.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ')');
        }

        if (reduceMotion) {
            place(1);
            return;
        }

        // 드로잉(0.6s 지연 + 3.2s)과 같은 속도로 따라 오르고, 이후 7초마다 다시 오른다
        var start = null;
        var DRAW_DELAY = 600, DRAW = 3200, LOOP = 7000, REST = 1400;
        function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
        function frame(ts) {
            if (start === null) start = ts;
            var el = ts - start;
            var t;
            if (el < DRAW_DELAY) {
                t = 0;
                runner.style.opacity = 0;
            } else if (el < DRAW_DELAY + DRAW) {
                t = ease((el - DRAW_DELAY) / DRAW);
                runner.style.opacity = 1;
            } else {
                var k = (el - DRAW_DELAY - DRAW) % LOOP;
                if (k < REST) {
                    t = 1;
                    runner.style.opacity = 1 - k / REST;
                } else {
                    t = ease((k - REST) / (LOOP - REST));
                    runner.style.opacity = Math.min(1, (k - REST) / 400);
                }
            }
            place(t);
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);

        // 능선 패럴랙스
        if (ridges) {
            var ticking = false;
            window.addEventListener('scroll', function () {
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(function () {
                    var y = Math.min(window.scrollY, window.innerHeight * 1.2);
                    ridges.style.setProperty('--sy', y.toFixed(0));
                    ticking = false;
                });
            }, { passive: true });
        }
    }

    /* ---------- Journey ---------- */
    function initJourney() {
        var section = document.querySelector('[data-journey]');
        if (!section) return;
        var svg = section.querySelector('.journey-svg');
        var line = section.querySelector('.jp-line');
        var done = section.querySelector('.jp-done');
        var runner = section.querySelector('.jp-runner');
        var stopsG = section.querySelector('.jp-stops');
        var cards = Array.prototype.slice.call(section.querySelectorAll('.jcard'));
        var distEl = section.querySelector('[data-jp-dist]');
        var eleEl = section.querySelector('[data-jp-ele]');
        var gainEl = section.querySelector('[data-jp-gain]');

        var TOTAL_KM = parseFloat(section.getAttribute('data-total-km')) || 32;
        var len = line.getTotalLength();
        done.style.strokeDasharray = len + ' ' + len;

        // x(0~1000) → 경로 길이 (x가 단조 증가하는 경로라 이분 탐색)
        function lengthAtX(x) {
            var lo = 0, hi = len;
            for (var i = 0; i < 24; i++) {
                var mid = (lo + hi) / 2;
                if (line.getPointAtLength(mid).x < x) lo = mid; else hi = mid;
            }
            return (lo + hi) / 2;
        }
        function elevationAt(y) { return Math.round(180 + (230 - y) * 6.2); }

        // 누적 상승 테이블
        var SAMPLES = 200, gainTable = [0], prev = line.getPointAtLength(0).y, acc = 0;
        for (var s = 1; s <= SAMPLES; s++) {
            var py = line.getPointAtLength(lengthAtX(1000 * s / SAMPLES)).y;
            if (py < prev) acc += (prev - py) * 6.2;
            prev = py;
            gainTable.push(acc);
        }

        // 지점 마커
        var stops = cards.map(function (card) {
            var at = parseFloat(card.getAttribute('data-at'));
            var l = lengthAtX(at * 1000);
            var pt = line.getPointAtLength(l);
            var g = document.createElementNS(NS, 'g');
            g.setAttribute('class', 'jp-stop');
            var c = document.createElementNS(NS, 'circle');
            c.setAttribute('cx', pt.x); c.setAttribute('cy', pt.y); c.setAttribute('r', 6);
            var t = document.createElementNS(NS, 'text');
            t.setAttribute('x', Math.min(965, Math.max(35, pt.x)));
            t.setAttribute('y', pt.y - 18);
            t.textContent = card.getAttribute('data-label');
            g.appendChild(c); g.appendChild(t);
            stopsG.appendChild(g);
            return { at: at, g: g, card: card };
        });

        var current = -1;
        function render(p) {
            p = Math.max(0, Math.min(1, p));
            var l = lengthAtX(p * 1000);
            var pt = line.getPointAtLength(l);
            runner.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')');
            done.style.strokeDashoffset = (len - l).toFixed(1);

            var idx = 0;
            stops.forEach(function (st, i) { if (p + 0.001 >= st.at) idx = i; });
            stops.forEach(function (st, i) {
                st.g.classList.toggle('passed', i < idx);
                st.g.classList.toggle('current', i === idx);
            });
            if (idx !== current) {
                current = idx;
                cards.forEach(function (c, i) { c.classList.toggle('active', i === idx); });
            }
            if (distEl) distEl.textContent = (TOTAL_KM * p).toFixed(1) + ' km';
            if (eleEl) eleEl.textContent = elevationAt(pt.y).toLocaleString('en-US') + ' m';
            if (gainEl) gainEl.textContent = '↑ ' + Math.round(gainTable[Math.round(p * SAMPLES)]).toLocaleString('en-US') + ' m';
        }

        if (reduceMotion) {
            render(1);
            cards.forEach(function (c) { c.classList.add('active'); });
            return;
        }

        var ticking = false;
        function onScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                var r = section.getBoundingClientRect();
                var range = section.offsetHeight - window.innerHeight;
                render(range > 0 ? -r.top / range : 0);
                ticking = false;
            });
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        render(0);
        onScroll();
    }

    /* ---------- Reveal ---------- */
    function initReveal() {
        var targets = document.querySelectorAll('.features .feature-card, .how-it-works .feature-card, .screenshots, .closing, .verse');
        if (reduceMotion || !('IntersectionObserver' in window)) return;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        Array.prototype.forEach.call(targets, function (el, i) {
            el.classList.add('reveal');
            el.style.transitionDelay = (i % 3) * 90 + 'ms';
            io.observe(el);
        });
    }

    function init() {
        initHero();
        initJourney();
        initReveal();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
