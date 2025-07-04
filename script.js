const sections = document.querySelectorAll("section");
let currentIndex = 0;
let isScrolling = false;

function scrollToPage(index) {
  isScrolling = true;

  sections.forEach((section, i) => {
    section.style.transform = `translateY(${(i - index) * 100}%)`;
  });

  setTimeout(() => {
    isScrolling = false;
  }, 800); // gelijk aan transition-tijd
}

document.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0 && currentIndex < sections.length - 1) {
    currentIndex++;
    scrollToPage(currentIndex);
  } else if (e.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
    scrollToPage(currentIndex);
  }
});

// Optioneel: toetsenbord
document.addEventListener("keydown", (e) => {
  if (isScrolling) return;

  if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
    currentIndex++;
    scrollToPage(currentIndex);
  } else if (e.key === "ArrowUp" && currentIndex > 0) {
    currentIndex--;
    scrollToPage(currentIndex);
  }
});

const music = document.getElementById("bg-music");
const muteBtn = document.getElementById("mute-toggle");

muteBtn.addEventListener("click", () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? "🔇" : "🔊";
});
