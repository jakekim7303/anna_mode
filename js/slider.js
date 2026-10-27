/**
 * 메인 배너 슬라이드
 * - 좌우 버튼 / 하단 점 클릭으로 이동
 * - 기본적으로 3초마다 다음 배너로 자동 이동
 * - 마우스를 올리면 자동 이동 일시정지
 */
(function () {
  var slider = document.querySelector('.main_ad');
  if (!slider) return;

  var track = slider.querySelector('.slide_track');
  var slides = track.querySelectorAll('a');
  var dotBox = slider.querySelector('.slide_dots');
  var total = slides.length;
  var current = 0;
  var timer = null;
  var INTERVAL = 3000;

  /** 하단 점(인디케이터) 생성 */
  for (var i = 0; i < total; i++) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', (i + 1) + '번 배너');
    dot.dataset.index = i;
    dotBox.appendChild(dot);
  }
  var dots = dotBox.querySelectorAll('button');

  /** index 번째 배너로 이동 */
  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach(function (d, n) {
      d.classList.toggle('on', n === current);
    });
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(function () { goTo(current + 1); }, INTERVAL);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  slider.querySelector('.prev').addEventListener('click', function () {
    goTo(current - 1);
  });
  slider.querySelector('.next').addEventListener('click', function () {
    goTo(current + 1);
  });
  dotBox.addEventListener('click', function (e) {
    if (e.target.dataset.index !== undefined) goTo(Number(e.target.dataset.index));
  });

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  goTo(0);
  startAuto();
})();
