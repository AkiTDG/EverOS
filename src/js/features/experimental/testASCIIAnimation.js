import{frames} from "./AnimationFrames.js"

let animationInterval;

export function runAnimation() {
  let index = 0;
  const animationLine = document.getElementById("console");
  if (animationLine) animationLine.textContent = "Loading ASCII animation..."
  setTimeout(() => {
    animationInterval = setInterval(() => {
      animationLine.textContent = frames[index];
      index = (index + 1) % frames.length;
    }, 100);

    document.addEventListener("keydown", stopHandlerKey);
  }, 3000);
  return 
}

export function stopHandlerKey(e) {
  if (["End", "Home", "Delete"].includes(e.key)) {
    stopAnimation();
  }
}

export function stopAnimation() {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
    const animationLine = document.getElementById("console");
    if (animationLine) animationLine.textContent = "Animation stopped.";
    document.removeEventListener("keydown", stopHandlerKey);
  }
}
