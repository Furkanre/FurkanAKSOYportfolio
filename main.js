const menuButonu = document.querySelector(".menu-butonu");
const navigasyon = document.querySelector("nav");
const temaButonu = document.getElementById("temaButonu");
const temaIkonu = temaButonu.querySelector("i");
const bolumler = document.querySelectorAll("section");
const navLinkleri = document.querySelectorAll("nav a");

menuButonu.addEventListener("click", () => {
    navigasyon.classList.toggle("aktif");
});

navLinkleri.forEach(link => {
    link.addEventListener("click", () => {
        navigasyon.classList.remove("aktif");
    });
});

temaButonu.addEventListener("click", () => {
    document.body.classList.toggle("acik-tema");

    if (document.body.classList.contains("acik-tema")) {
        temaIkonu.className = "fa-solid fa-sun";
    } else {
        temaIkonu.className = "fa-solid fa-moon";
    }
});

function aktifMenuyuBelirle() {
    let aktifBolum = "";

    bolumler.forEach(bolum => {
        const bolumUstKonum = bolum.offsetTop - 160;
        const bolumYukseklik = bolum.offsetHeight;

        if (window.scrollY >= bolumUstKonum && window.scrollY < bolumUstKonum + bolumYukseklik) {
            aktifBolum = bolum.getAttribute("id");
        }
    });

    navLinkleri.forEach(link => {
        link.classList.remove("active");

        if (aktifBolum && link.getAttribute("href") === "#" + aktifBolum) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", aktifMenuyuBelirle);
window.addEventListener("load", aktifMenuyuBelirle);

const yukariButonu = document.createElement("div");
yukariButonu.classList.add("yukari-cik");
yukariButonu.innerHTML = "↑";
document.body.appendChild(yukariButonu);

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        yukariButonu.classList.add("aktif");
    } else {
        yukariButonu.classList.remove("aktif");
    }
});

yukariButonu.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const gozlemci = new IntersectionObserver(girdiler => {
    girdiler.forEach(girdi => {
        if (girdi.isIntersecting) {
            girdi.target.classList.add("goster");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(
    ".hakkimda-karti, .yetenek-karti, .proje-karti, .zaman-karti, form"
).forEach(eleman => {
    eleman.classList.add("gizli");
    gozlemci.observe(eleman);
});

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const alanlar = form.querySelectorAll("input, textarea");
    let gecerliMi = true;

    alanlar.forEach(alan => {
        if (alan.value.trim() === "") {
            gecerliMi = false;
        }
    });

    if (!gecerliMi) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    alert("Mesajınız başarıyla gönderildi.");
    form.reset();
});