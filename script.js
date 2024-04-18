// 메뉴 버튼, 오버레이, 모바일 메뉴, 카운터 요소들을 DOM에서 가져옵니다.
const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');

// 스크롤이 시작되었는지 상태를 저장하는 변수
let scrollStarted = false;

// 클릭 및 스크롤 이벤트 리스너를 추가합니다.
btn.addEventListener('click', navToggle);
document.addEventListener('scroll', scrollPage);

// 네비게이션 토글 함수: 메뉴 버튼, 오버레이, 본문 스크롤, 메뉴 표시를 토글합니다.
function navToggle() {
  btn.classList.toggle('open');
  overlay.classList.toggle('overlay-show');
  document.body.classList.toggle('stop-scrolling');
  menu.classList.toggle('show-menu');
}

// 페이지 스크롤 함수: 스크롤 위치에 따라 카운트 업 또는 리셋을 실행합니다.
function scrollPage() {
  const scrollPos = window.scrollY;

  if (scrollPos > 100 && !scrollStarted) {
    countUp();
    scrollStarted = true;
  } else if (scrollPos < 100 && scrollStarted) {
    reset();
    scrollStarted = false;
  }
}

// 카운트 업 함수: 각 카운터를 대상 숫자까지 증가시킵니다.
function countUp() {
  counters.forEach((counter) => {
    counter.innerText = '0';

    const updateCounter = () => {
      // 카운터의 목표 값 가져오기
      const target = +counter.getAttribute('data-target');
      // 현재 카운터 값
      const c = +counter.innerText;

      // 증가분 계산
      const increment = target / 100;

      // 목표 값에 도달하지 않았다면 증가분을 더하고 다시 함수 호출
      if (c < target) {
        // 반올림하여 카운터 값 설정
        counter.innerText = `${Math.ceil(c + increment)}`;

        setTimeout(updateCounter, 75);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

// 리셋 함수: 모든 카운터를 0으로 초기화합니다.
function reset() {
  counters.forEach((counter) => (counter.innerHTML = '0'));
}