// Animation script to enhance text animations

document.addEventListener("DOMContentLoaded", () => {
  // Set animation order for elements
  setAnimationOrder(".feature-item")
  setAnimationOrder(".testimonial-card")
  setAnimationOrder(".stat-item")
  setAnimationOrder(".district-item")

  // Add animation order for timeline items
  setAnimationOrder(".timeline-item")
  setAnimationOrder(".value-item")

  // Add scroll-triggered animations
  addScrollAnimations()

  // Add typing effect to hero heading
  addTypingEffect(".hero-text h1")

  // Add wave text animation to about-us section headers
  addWaveTextAnimation(".about-us-header h2")
  addWaveTextAnimation(".about-us-text h3")
})

// Set animation order for staggered animations
function setAnimationOrder(selector) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((el, index) => {
    el.style.setProperty("--animation-order", index)
  })
}

// Add scroll-triggered animations
function addScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".section-header h2, .section-header p, .feature-item, .testimonial-card, .stat-item, .about-text h2, .about-text p",
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((el) => {
    observer.observe(el)
    el.classList.add("animate-ready")
  })
}

// Add typing effect to text
function addTypingEffect(selector) {
  const element = document.querySelector(selector)
  if (!element) return

  const text = element.textContent
  element.textContent = ""
  element.style.opacity = "1"

  let i = 0
  const speed = 50 // typing speed in milliseconds

  function typeWriter() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, speed)
    }
  }

  // Start typing after a short delay
  setTimeout(typeWriter, 500)
}

// Add number counter animation
document.addEventListener("DOMContentLoaded", () => {
  const statNumbers = document.querySelectorAll(".stat-number")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          const finalNumber = target.textContent.replace(/,/g, "").replace(/\+/g, "")
          const hasPlus = target.textContent.includes("+")

          animateCounter(target, 0, Number.parseInt(finalNumber), hasPlus)
          observer.unobserve(target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((number) => {
    observer.observe(number)
  })
})

function animateCounter(element, start, end, hasPlus) {
  let current = start
  const increment = Math.ceil(end / 50) // Divide animation into 50 steps
  const duration = 1500 // Animation duration in milliseconds
  const stepTime = duration / (end / increment)

  const timer = setInterval(() => {
    current += increment
    if (current >= end) {
      current = end
      clearInterval(timer)
    }
    element.textContent = current.toLocaleString() + (hasPlus ? "+" : "")
  }, stepTime)
}

function addWaveTextAnimation(selector) {
  const elements = document.querySelectorAll(selector)

  elements.forEach((element) => {
    const text = element.textContent
    element.innerHTML = ""

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span")
      span.textContent = text[i] === " " ? "\u00A0" : text[i]
      span.style.setProperty("--char-index", i)
      span.classList.add("wave-letter")
      element.appendChild(span)
    }
  })
}

const aboutUsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const timelineItems = entry.target.querySelectorAll(".timeline-item")
        timelineItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("animate-in")
          }, index * 300)
        })
        aboutUsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 },
)

document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.querySelector(".timeline")
  if (timeline) {
    aboutUsObserver.observe(timeline)
  }
})
