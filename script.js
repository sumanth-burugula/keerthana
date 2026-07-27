const body = document.body;
const giftGate = document.getElementById("giftGate");
const pageContent = document.getElementById("pageContent");
const openGiftBtn = document.getElementById("openGiftBtn");
const rejectGiftBtn = document.getElementById("rejectGiftBtn");
const giftResult = document.getElementById("giftResult");

let rejectAttempts = 0;
let homeMode = false;

openGiftBtn.addEventListener("click", () => {
  if (homeMode) {
    window.location.reload();
    return;
  }

  const giftBox = document.querySelector(".gift-box");
  const revealOverlay = document.getElementById("revealOverlay");
  giftBox.classList.add("opening");
  openGiftBtn.disabled = true;
  rejectGiftBtn.disabled = true;

  setTimeout(() => {
    giftGate.classList.add("hidden");
    revealOverlay.classList.remove("hidden");
    createSparkleBurst();
  }, 500);

  setTimeout(() => {
    revealOverlay.classList.add("hidden");
    pageContent.classList.remove("hidden");
    createBirthdayPopup();
    createConfetti();
    createHeartConfetti();
  }, 1800);
});

rejectGiftBtn.addEventListener("click", () => {
  rejectAttempts += 1;

  if (rejectAttempts === 1) {
    giftGate.classList.add("denied");
    giftResult.textContent = "Aww, not this time. Try again, my love 💖";
    openGiftBtn.textContent = "Try again";
    return;
  }

  if (rejectAttempts === 2) {
    giftGate.classList.add("denied");
    giftResult.textContent = "Still playing hard to get? One more try and then we do this the dramatic way ✨";
    openGiftBtn.textContent = "Try again";
    return;
  }

  homeMode = true;
  giftGate.classList.add("denied");
  giftResult.textContent = "You are a badass. Go back home and then click yes 💪✨";
  rejectGiftBtn.classList.add("hidden");
  openGiftBtn.textContent = "Go back home";
});

function createSparkleBurst() {
  const burst = document.createElement("div");
  burst.className = "sparkle-burst";
  burst.innerHTML = "✨💖✨";
  document.body.appendChild(burst);

  setTimeout(() => burst.remove(), 900);
}

function createBirthdayPopup() {
  const popup = document.getElementById("birthdayPopup");
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 1200);
}

function createHeartConfetti() {
  for (let i = 0; i < 24; i += 1) {
    const heart = document.createElement("div");
    heart.className = "heart-confetti";
    heart.textContent = "💗";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.setProperty("--travel", `${Math.random() * 220 - 110}px`);
    document.body.appendChild(heart);
  }
}

function createConfetti() {
  const amount = 24;
  const colors = ["#ff6fa7", "#8b5cf6", "#ffd166", "#ff8ab4"];

  for (let i = 0; i < amount; i += 1) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${Math.random() * 100}%`;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = `${Math.random() * 0.5}s`;
    confetti.style.setProperty("--travel", `${Math.random() * 180 - 90}px`);
    body.appendChild(confetti);
  }
}

const style = document.createElement("style");
style.textContent = `
  .sparkle-burst {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    z-index: 30;
    animation: burstFade 0.9s ease-out forwards;
    pointer-events: none;
  }

  .heart-confetti {
    position: fixed;
    font-size: 1rem;
    pointer-events: none;
    z-index: 30;
    animation: heartDrop 1.2s ease-out forwards;
  }

  .confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    opacity: 0;
    pointer-events: none;
    border-radius: 2px;
    animation: drop 1.2s ease-out forwards;
    z-index: 1;
  }

  @keyframes drop {
    0% { opacity: 0; transform: translate3d(0, 0, 0) rotate(0deg); }
    20% { opacity: 1; }
    100% { opacity: 0; transform: translate3d(var(--travel), 220px, 0) rotate(720deg); }
  }

  @keyframes burstFade {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(1.6); }
  }

  @keyframes heartDrop {
    0% { opacity: 0; transform: translate3d(0, 0, 0) scale(0.4); }
    20% { opacity: 1; }
    100% { opacity: 0; transform: translate3d(var(--travel), 220px, 0) scale(1.3); }
  }
`;
document.head.appendChild(style);
