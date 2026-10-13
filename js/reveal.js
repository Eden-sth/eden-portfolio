// 모바일 화면에서 runcanvas 이미지 애니메이션 구현용
// page-3(RunCanvas): 모바일에서는 스크롤해서 화면에 들어오면 2번째 이미지가 나타남
// (PC 는 기존 CSS hover 방식 그대로)
(() => {
  const section = document.querySelector(".page-3");
  const target = section && section.querySelector(".runcanvas > ul > li:nth-child(2)");
  if (!section || !target || !("IntersectionObserver" in window)) return;

  const mobile = window.matchMedia("(max-width: 1024px)");
  let observer = null;

  const enable = () => {
    section.classList.add("reveal-ready");
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          target.classList.add("is-visible");
          observer.disconnect(); // 한 번 나타나면 유지
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(target);
  };

  const disable = () => {
    if (observer) observer.disconnect();
    section.classList.remove("reveal-ready");
    target.classList.remove("is-visible");
  };

  const sync = () => (mobile.matches ? enable() : disable());
  mobile.addEventListener("change", sync);
  sync();
})();