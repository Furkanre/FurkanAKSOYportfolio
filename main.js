window.addEventListener("DOMContentLoaded", () => {
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

    const projelerGrid = document.querySelector(".projeler-grid");
    const projeOnizlemeResmi = document.getElementById("projeOnizlemeResmi");
    const projeOnizlemeBaslik = document.getElementById("projeOnizlemeBaslik");
    const projeOnizlemeAciklama = document.getElementById("projeOnizlemeAciklama");

    function guncelleProjeOnizleme(kart) {
        if (!kart || !projeOnizlemeResmi || !projeOnizlemeBaslik || !projeOnizlemeAciklama) return;
        const image = kart.dataset.image;
        const title = kart.dataset.title;
        const description = kart.dataset.description;

        if (!image || !title || !description) return;

        projeOnizlemeResmi.classList.remove("gorunur");
        projeOnizlemeBaslik.style.opacity = "0";
        projeOnizlemeBaslik.style.transform = "translateY(6px)";
        projeOnizlemeAciklama.style.opacity = "0";
        projeOnizlemeAciklama.style.transform = "translateY(6px)";

        projeOnizlemeResmi.onload = () => {
            projeOnizlemeResmi.classList.add("gorunur");
            projeOnizlemeBaslik.style.opacity = "1";
            projeOnizlemeBaslik.style.transform = "translateY(0)";
            projeOnizlemeAciklama.style.opacity = "1";
            projeOnizlemeAciklama.style.transform = "translateY(0)";
        };

        projeOnizlemeResmi.src = image;
        projeOnizlemeResmi.alt = `${title} görseli`;
        projeOnizlemeBaslik.textContent = title;
        projeOnizlemeAciklama.textContent = description;
    }

    projelerGrid.addEventListener("click", event => {
        const kart = event.target.closest(".proje-karti");
        if (!kart) return;
        guncelleProjeOnizleme(kart);
    });

    const projeKartlari = document.querySelectorAll(".proje-karti");
    projeKartlari.forEach(kart => {
        kart.style.cursor = "pointer";
        kart.setAttribute("role", "button");
        kart.setAttribute("tabindex", "0");
    });

    if (projeKartlari.length > 0) {
        guncelleProjeOnizleme(projeKartlari[0]);
    }

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
});