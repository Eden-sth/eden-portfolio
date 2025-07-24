const loadingAreaGrey = document.querySelector("#loading");
const loadingAreaGreen = document.querySelector("#loading-screen");
const loadingText = document.querySelector("#loading p");

// const Mg= ()=>{
//   const  r = it.timeline({
//     onComplete: ()=>{
//       window.loading= !0
//     }
//   })
//   ,e= document.querySelectorAll("c-loading-topBox, c-loading-line")
//   ,t= document.querySelectorAll("c-loading-downBox, c-loading-line");
//   .to(e, {
//     height: "0%",
//     duration: 1.4,
//     ease: "power4.inOut",
//     stagger: (o,a,l)=>{
//       const c = (l.length-1)/2,
//       u= Math.abs(o - c) * .03,
//       f= o % 2 ? 0 : .08;
//       return u+f
//     }
//   }, "<0.6").to(t,{
//     height: "0%",
//     duration: 1.4,
//     ease: "power4.inOut",
//     stagger: (o,a,l)=> {
//       const c = (l.length-1)/2,
//       u= Math.abs(o-c)* .03,
//       f= o % 2 ? .08:0;
//       return u+f
//     }
//   }, "<").set(".loading-screen",{
//     pointerEvent: "none"
//   },"<")
// };

// window.addEventListener("load", () => {
//   // 로딩 회색 스크린
//   loadingAreaGrey.animate(
//     {
//       opacity: [1, 0],
//       visibility: "hidden",
//     },
//     {
//       duration: 2000,
//       delay: 1200,
//       easing: "ease",
//       fill: "forwards",
//     }
//   );

//   // 로딩 중(연녹색 스크린)
//   loadingAreaGreen.animate(
//     {
//       translate: ["0 100vh", "0 0", "0 -100vh"],
//     },
//     {
//       duration: 2000,
//       delay: 800,
//       easing: "ease",
//       fill: "forwards",
//     }
//   );

//   //   로딩 중 텍스트
//   //   loadingText.animate(
//   //     [
//   //       {
//   //         opacity: 1,
//   //         offset: 0.8,
//   //       },
//   //       {
//   //         opacity: 0,
//   //         offset: 1,
//   //       },
//   //     ],
//   //     {
//   //       duration: 1200,
//   //       easing: "ease",
//   //       fill: "forwards",
//   //     }
//   //   );
// });
