import { gsap } from "gsap";
import "./style.css";

const giftButton = document.querySelector("#gift-button");
const giftBox = document.querySelector("#gift-box");
const letter = document.querySelector("#letter");
const hint = document.querySelector("#tap-hint");
const stickerImage = document.querySelector("#sticker-image");
const stickerFallback = document.querySelector("#sticker-fallback");
const confetti = document.querySelector("#confetti");

if (
  !(giftButton instanceof HTMLButtonElement) ||
  !(giftBox instanceof HTMLElement) ||
  !(letter instanceof HTMLElement) ||
  !(hint instanceof HTMLElement) ||
  !(stickerImage instanceof HTMLImageElement) ||
  !(stickerFallback instanceof HTMLElement) ||
  !(confetti instanceof HTMLElement)
) {
  throw new Error("Không tìm thấy các thành phần cần thiết để mở hộp quà.");
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const confettiColors = ["#d28a6f", "#d6bd78", "#90a987", "#f0d8a8", "#bb7b66"];

for (let index = 0; index < 18; index += 1) {
  const piece = document.createElement("span");
  piece.className = "confetti__piece";
  piece.style.setProperty("--piece-color", confettiColors[index % confettiColors.length]);
  piece.style.setProperty("--piece-angle", `${(index / 18) * 360}deg`);
  piece.style.setProperty("--piece-distance", `${75 + (index % 4) * 24}px`);
  confetti.append(piece);
}

const showStickerImage = () => {
  stickerImage.classList.add("is-loaded");
  stickerFallback.hidden = true;
};

const showStickerFallback = () => {
  stickerImage.hidden = true;
  stickerFallback.hidden = false;
};

stickerImage.addEventListener("load", showStickerImage);
stickerImage.addEventListener("error", showStickerFallback);

if (stickerImage.complete) {
  if (stickerImage.naturalWidth > 0) {
    showStickerImage();
  } else {
    showStickerFallback();
  }
}

giftButton.addEventListener("click", () => {
  if (giftButton.getAttribute("aria-expanded") === "true") return;

  giftButton.setAttribute("aria-expanded", "true");
  giftButton.setAttribute("aria-label", "Hộp quà đã mở");
  letter.setAttribute("aria-hidden", "false");

  if (prefersReducedMotion) {
    gsap.set(".gift-box__lid", { rotateX: 125, y: -38 });
    gsap.set(".gift-box__glow", { opacity: 1, scale: 1.25 });
    if (window.matchMedia("(min-width: 900px)").matches) {
      gsap.set(giftButton, { x: -30 });
    }
    hint.classList.add("is-hidden");
    letter.classList.add("is-visible");
    gsap.set(".letter__seal", { scale: 1, rotation: 0 });
    gsap.set(".sticker", { opacity: 1, y: 0, rotation: 0 });
    return;
  }

  const timeline = gsap.timeline();
  timeline
    .to(giftBox, { y: -12, duration: 0.28, ease: "power2.out" })
    .to(giftBox, { y: 0, duration: 0.35, ease: "bounce.out" });

  if (window.matchMedia("(min-width: 900px)").matches) {
    timeline.to(giftButton, { x: -30, duration: 0.72, ease: "power2.inOut" }, "<");
  }

  timeline
    .to(".gift-box__lid", { rotateX: 125, y: -38, duration: 0.72, ease: "back.out(1.35)" }, "<")
    .to(".gift-box__glow", { opacity: 1, scale: 1.25, duration: 0.45, ease: "power2.out" }, "<0.12")
    .to(hint, { opacity: 0, y: 8, duration: 0.25 }, "<")
    .to(letter, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.15)" }, "-=0.05")
    .to(".letter__seal", { scale: 1, rotation: 0, duration: 0.45, ease: "back.out(2)" }, "-=0.35")
    .to(".sticker", { opacity: 1, y: 0, rotation: 0, duration: 0.55, ease: "back.out(1.7)" }, "-=0.3")
    .fromTo(
      ".confetti__piece",
      { opacity: 0, scale: 0, x: 0, y: 0, rotation: 0 },
      {
        opacity: 1,
        scale: 1,
        x: (index) => Math.cos((index / 18) * Math.PI * 2) * (75 + (index % 4) * 24),
        y: (index) => Math.sin((index / 18) * Math.PI * 2) * (75 + (index % 4) * 24),
        rotation: (index) => index % 2 === 0 ? 100 : -100,
        duration: 0.8,
        stagger: 0.012,
        ease: "power2.out",
      },
      "-=0.72",
    )
    .to(".confetti__piece", { opacity: 0, duration: 0.35 }, "-=0.25")
    .add(() => {
      hint.classList.add("is-hidden");
      letter.classList.add("is-visible");
    });
});
