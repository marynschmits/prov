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
  }, 800); // Moet overeenkomen met je CSS transition-tijd
}

// Scroll met muiswiel (desktop)
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

// Scroll met toetsenbord
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

// Mute-knop voor achtergrondmuziek
const music = document.getElementById("bg-music");
const muteBtn = document.getElementById("mute-toggle");

muteBtn.addEventListener("click", () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? "🔇" : "🔊";
});

// Swipe scroll (touch - mobiel)
let startY = 0;

window.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
  if (isScrolling) return;

  let endY = e.changedTouches[0].clientY;
  let deltaY = endY - startY;

  if (deltaY < -30 && currentIndex < sections.length - 1) {
    // Swipe up
    currentIndex++;
    scrollToPage(currentIndex);
  } else if (deltaY > 30 && currentIndex > 0) {
    // Swipe down
    currentIndex--;
    scrollToPage(currentIndex);
  }
});
