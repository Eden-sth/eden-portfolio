// 디자인 갤러리: 터치/모바일에서 자동으로 천천히 흐르다가,
// 손가락으로 만지면 멈추고 직접 밀어서 넘길 수 있음. 손을 떼고 잠시 후 다시 자동 재생.
(() => {
  const wrapper = document.querySelector("#page-5 .marquee-wrapper");
  const gallery = wrapper && wrapper.querySelector(".design-gallery");
  if (!wrapper || !gallery) return;

  const SPEED = 50; // px/초 (자동 이동 속도)
  const RESUME_DELAY = 1800; // ms (손 뗀 뒤 재생까지 대기)
  const SET_SIZE = 10; // 이미지 1세트 개수 (HTML 의 복제 단위)

  // CSS 의 슬라이드 모드 조건과 동일하게 맞춤
  const touchMode = window.matchMedia(
    "(hover: none), (pointer: coarse), (max-width: 1024px)"
  );
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let rafId = null;
  let paused = false;
  let visible = true;
  let pos = 0;
  let last = 0;
  let resumeTimer = null;

  // 1세트의 가로 길이 (gap 포함) → 이 값만큼 이동하면 같은 화면이 반복됨
  const setWidth = () => {
    const items = gallery.querySelectorAll("a");
    if (items.length <= SET_SIZE) return 0;
    return items[SET_SIZE].offsetLeft - items[0].offsetLeft;
  };

  const wrap = () => {
    const w = setWidth();
    if (w > 0 && wrapper.scrollLeft >= w) {
      wrapper.scrollLeft -= w;
      pos = wrapper.scrollLeft;
    }
  };

  const tick = (now) => {
    const dt = Math.min((now - last) / 1000, 0.1); // 탭 전환 후 점프 방지
    last = now;

    if (!paused && visible) {
      const w = setWidth();
      pos += SPEED * dt;
      if (w > 0 && pos >= w) pos -= w;
      wrapper.scrollLeft = pos; // 소수점은 pos 에 누적해서 반올림 오차 방지
    }
    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (rafId !== null || reduceMotion.matches) return;
    pos = wrapper.scrollLeft;
    last = performance.now();
    rafId = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
  };

  // 사용자가 만지는 동안 정지 → 조용해지면 재생
  const holdThenResume = () => {
    paused = true;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      wrap();
      pos = wrapper.scrollLeft;
      paused = false;
    }, RESUME_DELAY);
  };

  const hold = () => {
    paused = true;
    clearTimeout(resumeTimer); // 손가락이 닿아 있는 동안은 재생 예약 취소
  };

  wrapper.addEventListener("touchstart", hold, { passive: true });
  wrapper.addEventListener("pointerdown", hold, { passive: true });
  wrapper.addEventListener("touchend", holdThenResume, { passive: true });
  wrapper.addEventListener("touchcancel", holdThenResume, { passive: true });
  wrapper.addEventListener("pointerup", holdThenResume, { passive: true });
  wrapper.addEventListener("wheel", holdThenResume, { passive: true });
  // 손을 뗀 뒤 관성 스크롤이 이어지는 동안에도 재생 보류
  wrapper.addEventListener(
    "scroll",
    () => {
      if (paused) holdThenResume();
    },
    { passive: true }
  );

  // 화면에 보일 때만 동작 (배터리 절약)
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) pos = wrapper.scrollLeft;
      },
      { threshold: 0.1 }
    ).observe(wrapper);
  }

  const sync = () => {
    if (touchMode.matches) {
      start();
    } else {
      stop();
      wrapper.scrollLeft = 0; // PC 로 돌아오면 CSS 마퀴가 담당
    }
  };

  touchMode.addEventListener("change", sync);
  reduceMotion.addEventListener("change", () => {
    stop();
    sync();
  });
  window.addEventListener("load", sync);
  sync();
})();