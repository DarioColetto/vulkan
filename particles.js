let containers = [];

// Create layers and add particles
function initializeAnimation() {
  createLayers();
  addParticles();
  initializeMouseMovement();
  startAnimation();
}

// Create three layers and append them to the wrapper
function createLayers() {
  const wrapper = document.querySelector(".layer-wrapper");

  for (let i = 0; i < 3; i++) {
    const container = document.createElement("div");
    container.className = "particles-container";
    container.id = `container${i}`;
    container.style.zIndex = -i;
    wrapper.appendChild(container);
    containers.push(container);
  }
}

// Add particles to each container
function addParticles() {
  containers.forEach((container) => {
    for (let i = 0; i < 100; i++) {
      const particle = createParticle();
      container.appendChild(particle);
    }
  });
}

// Create a particle element with random properties
function createParticle() {
  const particle = document.createElement("div");
  const duration = Math.random() + 10 + "s";
  particle.className = "particle";
  particle.style.position = "relative";
  particle.style.height = "10px";
  particle.style.width = "10px";
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = Math.random() * 100 + "vh";
  particle.style.borderRadius = "50%";
  particle.style.animationDuration = duration;
  particle.style.animationDelay = Math.random() * 2 + "s";
  return particle;
}

// Initialize mouse movement listener
function initializeMouseMovement() {
  let difX = 0;
  let difY = 0;

  window.addEventListener("mousemove", (e) => {
    difX += e.movementX;
    difY += e.movementY;

    containers[0].style.transform = `translate(${Math.round(
      difX * 0.01
    )}px, ${Math.round(difY * 0.01)}px)`;

    containers[1].style.transform = `translate(${Math.round(
      difX * 0.03
    )}px, ${Math.round(difY * 0.03)}px)`;
    containers[2].style.transform = `translate(${Math.round(
      difX * 0.05
    )}px, ${Math.round(difY * 0.05)}px)`;
  });
}

// Restart the animation with a random delay
function restartAnimation() {
  const element = document.querySelector(".animate");
  element.style.animation = "none"; // Reset the animation
  void element.offsetWidth; // Trigger reflow to apply the reset
  element.style.animation = ""; // Reapply the animation

  setTimeout(restartAnimation, getRandomDelay());
}

// Get a random delay for animation restart
function getRandomDelay() {
  let duration = Math.floor(Math.random() * (7 - 2 + 1)) + 3;
  duration *= 1000; // Convert seconds to milliseconds
  return duration;
}

// Start the animation
function startAnimation() {
  restartAnimation();
}

// Initial start of animation
initializeAnimation();
