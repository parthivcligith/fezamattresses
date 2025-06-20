// Additional preloader animations and effects
document.addEventListener("DOMContentLoaded", () => {
  // Create particle background effect for preloader
  const preloader = document.querySelector(".preloader")

  // Create particles
  for (let i = 0; i < 30; i++) {
    createParticle(preloader)
  }

  function createParticle(parent) {
    const particle = document.createElement("div")
    particle.className = "preloader-particle"

    // Random size between 5px and 15px
    const size = Math.random() * 10 + 5

    // Random position
    const posX = Math.random() * 100
    const posY = Math.random() * 100

    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1

    // Random animation duration
    const duration = Math.random() * 20 + 10

    // Apply styles
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${Math.random() > 0.5 ? "var(--primary-blue)" : "var(--gold)"};
      border-radius: 50%;
      top: ${posY}%;
      left: ${posX}%;
      opacity: ${opacity};
      animation: float ${duration}s infinite ease-in-out;
      animation-delay: ${Math.random() * 5}s;
      pointer-events: none;
      z-index: -1;
    `

    parent.appendChild(particle)
  }

  // Add 3D tilt effect to logo
  const logoContainer = document.querySelector(".logo-container")

  preloader.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight

    const tiltX = (y - 0.5) * 10 // -5 to 5 degrees
    const tiltY = (x - 0.5) * -10 // -5 to 5 degrees

    logoContainer.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`
  })

  preloader.addEventListener("mouseleave", () => {
    logoContainer.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)"
  })

  // Add glowing effect to loading bar
  const loadingBar = document.querySelector(".loading-bar")

  function pulseGlow() {
    loadingBar.classList.add("glow-pulse")

    setTimeout(() => {
      loadingBar.classList.remove("glow-pulse")

      setTimeout(pulseGlow, 2000)
    }, 1000)
  }

  pulseGlow()
})
