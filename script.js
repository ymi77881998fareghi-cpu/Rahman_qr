// کپی کردن متن
function copyText(id) {
    const text = document.getElementById(id).innerText;

    navigator.clipboard.writeText(text).then(() => {
        showToast("✅ با موفقیت کپی شد");
    }).catch(() => {
        showToast("❌ امکان کپی وجود ندارد");
    });
}

// نمایش پیام شناور
function showToast(message) {

    const toast = document.getElementById("toast");

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);

}

// افکت موج روی دکمه‌ها
document.querySelectorAll("button,.btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const size = Math.max(this.clientWidth, this.clientHeight);

        const x = e.clientX - this.getBoundingClientRect().left - size / 2;

        const y = e.clientY - this.getBoundingClientRect().top - size / 2;

        circle.style.width = size + "px";
        circle.style.height = size + "px";
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        circle.className = "ripple";

        this.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);

    });

});

// ظاهر شدن نرم کارت‌ها هنگام اسکرول
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(".item").forEach(item => {
    observer.observe(item);
});

// ثبت Service Worker برای PWA
if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("sw.js")
            .then(() => console.log("Service Worker Registered"))
            .catch(() => console.log("Service Worker Failed"));

    });

}

// نمایش سال جاری
const footer = document.querySelector("footer");

if (footer) {

    const year = new Date().getFullYear();

    footer.innerHTML += `<br><small>© ${year} مؤسسه رحمان</small>`;

}