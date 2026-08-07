const music = document.getElementById("bgMusic");
document.getElementById("openBtn").addEventListener("click", function () {

music.play();

    document.querySelector(".cover-content").style.display = "none";

    document.querySelectorAll(".page")[1].scrollIntoView({
        behavior: "smooth"
    });

});
// Nama tamu otomatis dari URL
const params = new URLSearchParams(window.location.search);
const namaTamu = params.get("to");

if (namaTamu) {
    document.getElementById("guestName").textContent =
        decodeURIComponent(namaTamu);
}
// Isi otomatis kolom nama di RSVP
const inputNama = document.querySelector('input[type="text"]');

if (namaTamu && inputNama) {
    inputNama.value = decodeURIComponent(namaTamu);
    inputNama.readOnly = true;
}
const targetDate = new Date(2026, 9, 25, 18, 0, 0).getTime();

setInterval(function () {

    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) return;

    document.getElementById("days").innerHTML =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").innerHTML =
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById("minutes").innerHTML =
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("seconds").innerHTML =
        Math.floor((distance % (1000 * 60)) / 1000);

}, 1000);
const galleryImages = [
    "assets/images/gallery1.png",
    "assets/images/gallery2.jpg",
    "assets/images/gallery3.jpg",
    "assets/images/gallery4.jpg",
    "assets/images/gallery5.webp",
    "assets/images/gallery6.webp"
];

let currentIndex = 0;

function openImage(src){

    currentIndex = galleryImages.indexOf(src);

    document.getElementById("lightbox-img").src = src;

    document.getElementById("lightbox").style.display="flex";

}

function closeImage(){

    document.getElementById("lightbox").style.display="none";

}

function nextImage(e){

    if(e) e.stopPropagation();

    currentIndex++;

    if(currentIndex>=galleryImages.length){

        currentIndex=0;

    }

    document.getElementById("lightbox-img").src=galleryImages[currentIndex];

}

function prevImage(e){

    if(e) e.stopPropagation();

    currentIndex--;

    if(currentIndex<0){

        currentIndex=galleryImages.length-1;

    }

    document.getElementById("lightbox-img").src=galleryImages[currentIndex];

}
let startX = 0;

const lightbox = document.getElementById("lightbox");

if (lightbox) {

    lightbox.addEventListener("touchstart", function(e){
        startX = e.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", function(e){
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;

        if (diff > 50) nextImage();
        if (diff < -50) prevImage();
    });

}
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwDXDD0FYZbLo_ZFn02myJjLraxKW7DcwsvlNqHu7UVQDrsIJBkjlftDmVwEZ9rBrpWaw/exec";

let statusHadir = "Hadir";

const confirmBtn = document.querySelector(".confirm-btn");
const hadirBtn = document.querySelector(".hadir");
const tidakBtn = document.querySelector(".tidak");

// Tombol Hadir
hadirBtn.addEventListener("click", function () {
    statusHadir = "Hadir";
    hadirBtn.classList.add("active");
    tidakBtn.classList.remove("active");
});

// Tombol Tidak Hadir
tidakBtn.addEventListener("click", function () {
    statusHadir = "Tidak Hadir";
    tidakBtn.classList.add("active");
    hadirBtn.classList.remove("active");
});

// Tombol Konfirmasi
confirmBtn.addEventListener("click", function () {

    const nama = document.querySelector('input[type="text"]').value;
    const jumlah = document.querySelector("select").value;
    const ucapan = document.querySelector("textarea").value;

    if (nama.trim() === "") {
        alert("Silakan isi nama terlebih dahulu.");
        return;
    }

    confirmBtn.disabled = true;
    confirmBtn.textContent = "Mengirim...";

    fetch("https://script.google.com/macros/s/AKfycbxCK9-a7bRZYiCl3shnVi2qeJSBmYv984pun5zk3wdsQIwdzCtRzqjt9LeWdJaSj7y1tA/exec", {
        method: "POST",
        body: JSON.stringify({
            nama: nama,
            status: statusHadir,
            jumlah: jumlah,
            ucapan: ucapan
        })
    })
    .then(() => {
        alert(
            "Terima kasih, " + nama +
            "\n\nStatus: " + statusHadir +
            "\nJumlah Tamu: " + jumlah +
            "\nUcapan: " + ucapan
        );

        confirmBtn.disabled = false;
        confirmBtn.textContent = "Konfirmasi Kehadiran";
    })
    .catch(() => {
        alert("Gagal mengirim data.");

        confirmBtn.disabled = false;
        confirmBtn.textContent = "Konfirmasi Kehadiran";
    });

});
function copyRekening(){

    const rekening =
    document.getElementById("rekening").innerText;

    navigator.clipboard.writeText(rekening);

    alert("Nomor rekening berhasil disalin.");
}