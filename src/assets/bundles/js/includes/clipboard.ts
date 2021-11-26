
var clipboard: HTMLTextAreaElement = undefined;
var tooltip: HTMLElement = undefined;
document.querySelectorAll('a.copy').forEach((el: HTMLAnchorElement) => {
    el.addEventListener('click', function (event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        if (clipboard === undefined) {
            clipboard = document.createElement("textarea");
            tooltip = document.createElement("div");
            tooltip.innerHTML = "Copié !";
            tooltip.classList.add("fixed", "text-white", "bg-black", "animated", "rounded", "px-5", "py-2", "delay-1s", "hidden")
            tooltip.style.left = "calc(50% - 40px)";
            tooltip.style.top = "calc(50% - 95px)";
            tooltip.onanimationend = (e: AnimationEvent) => {
                tooltip.classList.remove("fadeOut");
                tooltip.classList.add("hidden")
            };
            document.body.appendChild(clipboard);
            document.body.appendChild(tooltip);
        }
        clipboard.value = el.getAttribute("href");
        clipboard.select();
        document.execCommand('copy');
        tooltip.classList.remove('hidden');
        tooltip.classList.add('fadeOut');
    });
});