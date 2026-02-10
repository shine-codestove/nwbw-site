(function () {
  var track = document.getElementById('carouselTrack');
  var dotsContainer = document.getElementById('carouselDots');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var currentDisplay = document.getElementById('currentSlide');
  var slides = track.querySelectorAll('.carousel-slide');
  var total = slides.length;
  var current = 0;

  // Create dots
  for (var i = 0; i < total; i++) {
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', '스크린샷 ' + (i + 1));
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }

  var dots = dotsContainer.querySelectorAll('.carousel-dot');

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    currentDisplay.textContent = current + 1;
    for (var i = 0; i < dots.length; i++) {
      dots[i].className = 'carousel-dot' + (i === current ? ' active' : '');
    }
  }

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });

  dotsContainer.addEventListener('click', function (e) {
    var dot = e.target.closest('.carousel-dot');
    if (dot) goTo(Number(dot.dataset.index));
  });

  // Touch / pointer swipe
  var startX = 0;
  var startY = 0;
  var dragging = false;
  var delta = 0;
  var locked = false; // true once direction is determined

  track.addEventListener('touchstart', onStart, { passive: true });
  track.addEventListener('touchmove', onMove, { passive: false });
  track.addEventListener('touchend', onEnd);

  track.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse') {
      onStart(e);
      track.setPointerCapture(e.pointerId);
    }
  });
  track.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'mouse') onMove(e);
  });
  track.addEventListener('pointerup', function (e) {
    if (e.pointerType === 'mouse') onEnd(e);
  });

  function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }
  function getY(e) { return e.touches ? e.touches[0].clientY : e.clientY; }

  function onStart(e) {
    dragging = true;
    locked = false;
    delta = 0;
    startX = getX(e);
    startY = getY(e);
    track.style.transition = 'none';
  }

  function onMove(e) {
    if (!dragging) return;
    var dx = getX(e) - startX;
    var dy = getY(e) - startY;

    if (!locked) {
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        locked = true;
        if (Math.abs(dy) > Math.abs(dx)) {
          // vertical scroll intended, release
          dragging = false;
          return;
        }
      } else {
        return;
      }
    }

    if (e.cancelable) e.preventDefault();
    delta = dx;
    var frameWidth = track.parentElement.offsetWidth;
    var offset = -(current * frameWidth) + delta;
    track.style.transform = 'translateX(' + offset + 'px)';
  }

  function onEnd() {
    if (!dragging) return;
    dragging = false;
    track.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    var threshold = track.parentElement.offsetWidth * 0.2;
    if (delta < -threshold) goTo(current + 1);
    else if (delta > threshold) goTo(current - 1);
    else goTo(current);
    delta = 0;
  }

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });
})();
