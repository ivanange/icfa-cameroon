// team slide logic
import { wrapper } from "./selections";
import "./clipboard";

export const slides = wrapper.querySelector("#slides") as HTMLElement;
export const buttons = wrapper.querySelectorAll(".scroll-button");

if (slides.offsetWidth != slides.scrollWidth) {
  slides.classList.remove("justify-evenly");
  slides.classList.add("justify-start");
  let articleWidth = (slides.children[0] as HTMLElement).offsetWidth;
  let slideOffset =
    Math.floor(slides.offsetWidth / articleWidth) * articleWidth;
  slideOffset |= articleWidth;

  let scrollify = function (
    func: (e: MouseEvent) => any
  ): (e: MouseEvent) => any {
    return (e: MouseEvent) => {
      let target = e.currentTarget as HTMLElement;
      if (!target.classList.contains("inactive")) {
        func.apply(func, arguments);
      }
    };
  };

  (buttons[0] as HTMLElement).onclick = scrollify((e: MouseEvent) => {
    buttons[1].classList.remove("inactive");
    slides.scrollLeft -= slideOffset;
    setTimeout(() => {
      if (slides.scrollLeft - 50 <= 0) {
        buttons[0].classList.add("inactive");
      }
    }, 1000);
  });
  (buttons[1] as HTMLElement).onclick = scrollify((e: MouseEvent) => {
    buttons[0].classList.remove("inactive");
    slides.scrollLeft += slideOffset;
    setTimeout(() => {
      if (slides.scrollLeft + slideOffset >= slides.scrollWidth) {
        buttons[1].classList.add("inactive");
      }
    }, 1000);
  });
} else {
  buttons.forEach((e) => e.classList.add("hidden"));
}

let slide = document.getElementById("slider");

let slider = () => {
  slide.scrollLeft = (slide.scrollLeft + slide.offsetWidth) % slide.scrollWidth;
};
let slideId = setInterval(slider, 4000);

window.onresize = () => {
  clearInterval(slideId);
  // reinitialise slide to avoid, wrong sliding
  slide.scrollLeft = 0;
  slideId = setInterval(slider, 4000);
};