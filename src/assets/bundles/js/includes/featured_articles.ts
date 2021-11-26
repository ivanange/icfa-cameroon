import { secondaries, principal } from "./selections";

// featured articles logic
secondaries.forEach((e: HTMLElement) => {
  e.addEventListener("click", () => {
    [e.style.backgroundImage, principal.style.backgroundImage] = [
      principal.style.backgroundImage,
      e.style.backgroundImage,
    ];
    let [principalDesc, secondaryDesc] = [
      e.firstElementChild.getAttribute("desc"),
      principal.firstElementChild.getAttribute("desc"),
    ];
    principal.firstElementChild.setAttribute("desc", principalDesc);
    e.firstElementChild.setAttribute("desc", secondaryDesc);
  });
});
