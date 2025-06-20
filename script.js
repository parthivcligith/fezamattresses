// Preloader functionality with real loading progress
document.addEventListener("DOMContentLoaded", () => {
  // Array of sleep facts to display during loading
  const sleepFacts = [
    "Humans spend about 1/3 of their lives sleeping. A good mattress is essential for quality sleep.",
    "The right mattress can help reduce back pain by up to 57% and improve sleep quality by 60%.",
    "A mattress should be replaced every 7-10 years for optimal comfort and support.",
    "Memory foam mattresses were first developed by NASA in the 1970s for spacecraft cushioning.",
    "Kerala's humid climate makes breathable mattress materials like natural latex especially important.",
    "Side sleepers typically need a softer mattress than back or stomach sleepers.",
    "The weight of your mattress can double over 10 years due to dust mites and their waste products.",
    "Natural latex mattresses are resistant to dust mites and mold, making them ideal for Kerala's climate.",
    "A good mattress can help regulate your body temperature while you sleep.",
    "Feza Mattresses are specially designed for Kerala's tropical climate and humidity levels.",
  ]

  let currentFactIndex = 0
  const sleepFactElement = document.getElementById("sleep-fact")
  const loadingProgressBar = document.getElementById("loading-progress")
  const loadingPercentage = document.querySelector(".loading-percentage")
  const skipButton = document.getElementById("skip-button")
  const preloader = document.querySelector(".preloader")

  // Function to update sleep facts
  function updateSleepFact() {
    sleepFactElement.style.opacity = "0"
    sleepFactElement.style.transform = "translateY(20px)"

    setTimeout(() => {
      currentFactIndex = (currentFactIndex + 1) % sleepFacts.length
      sleepFactElement.querySelector("p").textContent = sleepFacts[currentFactIndex]
      sleepFactElement.style.opacity = "1"
      sleepFactElement.style.transform = "translateY(0)"
    }, 500)
  }

  // Rotate sleep facts every 5 seconds
  const factInterval = setInterval(updateSleepFact, 5000)

  // Track real loading progress
  let loadingProgress = 0
  const totalResources =
    document.images.length + document.querySelectorAll("script").length + document.querySelectorAll("link").length
  let loadedResources = 0

  function updateProgress() {
    // Calculate real loading progress
    const realProgress = Math.min(Math.round((loadedResources / totalResources) * 100), 100)

    // Ensure progress always moves forward (never decreases)
    loadingProgress = Math.max(loadingProgress, realProgress)

    // Update the loading bar and percentage
    loadingProgressBar.style.width = loadingProgress + "%"
    loadingPercentage.textContent = loadingProgress + "%"

    // If loading is complete, hide the preloader
    if (loadingProgress >= 100) {
      setTimeout(() => {
        hidePreloader()
      }, 500)
    }
  }

  // Track image loading
  Array.from(document.images).forEach((img) => {
    if (img.complete) {
      loadedResources++
      updateProgress()
    } else {
      img.addEventListener("load", () => {
        loadedResources++
        updateProgress()
      })
      img.addEventListener("error", () => {
        loadedResources++
        updateProgress()
      })
    }
  })

  // Track script loading
  Array.from(document.querySelectorAll("script")).forEach((script) => {
    loadedResources++
    updateProgress()
  })

  // Track CSS loading
  Array.from(document.querySelectorAll("link")).forEach((link) => {
    if (link.rel === "stylesheet") {
      loadedResources++
      updateProgress()
    }
  })

  // Ensure preloader hides even if resource counting fails
  window.addEventListener("load", () => {
    loadingProgress = 100
    updateProgress()
  })

  // Skip button functionality
  skipButton.addEventListener("click", () => {
    hidePreloader()
  })

  // Function to hide preloader
  function hidePreloader() {
    clearInterval(factInterval)
    preloader.classList.add("fade-out")

    // Enable scrolling after preloader is gone
    setTimeout(() => {
      document.body.style.overflow = ""

      // Add the page-content class to the main content for reveal animation
      const mainContent = document.querySelector("main")
      if (mainContent) {
        mainContent.classList.add("page-content")
      }
    }, 800)
  }

  // Fallback to hide preloader after 8 seconds regardless of loading state
  setTimeout(() => {
    if (!preloader.classList.contains("fade-out")) {
      hidePreloader()
    }
  }, 8000)
})

// Product Data
const products = [
  // Mattresses
  {
    id: 1,
    name: "Opulence",
    type: "Latex Mattress",
    category: "mattresses",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Natural Latex", "Antibacterial", "Dust-mite Resistant", "Hypoallergenic"],
    description:
      "Latex mattresses are resilient and inherently antibacterial, dust-mite resistant and hypoallergenic softly cradles heavy body parts, such as the hips and shoulders.",
    layers: [
      "Premium Knitted Fabric",
      "PU Foam",
      "Natural Latex Foam",
      "HD PU Foam",
      "High Density Rebonded Foam",
      "HD PU Foam",
      "Premium Knitted Fabric",
    ],
  },
  {
    id: 2,
    name: "Luxe Cloud",
    type: "Memory Foam Mattress",
    category: "mattresses",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Memory Foam", "Pressure Relief", "Temperature Responsive", "Body Contouring"],
    description:
      "A memory foam mattress is made of viscoelastic foam that molds to the body in response to pressure and temperature. It is known for its ability to provide excellent pressure relief and support.",
    layers: [
      "Premium Knitted Fabric",
      "PU Foam",
      "Memory Foam",
      "HD PU Foam",
      "High Density Rebonded Foam",
      "HD PU Foam",
      "Premium Knitted Fabric",
    ],
  },
  {
    id: 3,
    name: "Spinal Support",
    type: "Orthopaedic Mattress",
    category: "mattresses",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1592229505726-ca121723b8ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    features: ["Spinal Alignment", "Firm Support", "Back Care", "Rebonded Foam"],
    description:
      "Rebonded foam Mattress is a firm type of foam intended to offer strong support for the back and proper spinal alignment.",
    layers: [
      "Premium Knitted Fabric",
      "PU Foam",
      "Super Soft Foam",
      "High Density Rebonded Foam",
      "PU Foam",
      "Premium Knitted Fabric",
    ],
  },
  {
    id: 4,
    name: "PostureMate",
    type: "Pocket Spring Mattress",
    category: "mattresses",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1634643836960-c345b3c3e998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    features: ["Individual Springs", "Motion Isolation", "Targeted Support", "Body Contouring"],
    description:
      "A pocket spring mattress uses individually wrapped coils that move independently, allowing them to contour to the body curves and provide targeted support.",
    layers: [
      "Premium Knitted Fabric",
      "PU Foam",
      "High Density Super Soft Foam",
      "PU Foam",
      "Pocket Spring",
      "PU Foam",
      "High Density PU Foam",
      "Premium Knitted Fabric",
    ],
  },
  {
    id: 5,
    name: "BreezeCloud",
    type: "Bonnell Spring Mattress",
    category: "mattresses",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Classic Springs", "Affordable", "Supportive", "Breathable"],
    description:
      "Bonnell spring mattresses are a classic and widely available type of innerspring mattress. They are known for their affordability and supportive feel.",
    layers: [
      "Premium Knitted Fabric",
      "PU Foam",
      "Super Soft Foam",
      "Cotton Felt",
      "Bonnel Spring",
      "Cotton Felt",
      "PU Foam",
      "Premium Knitted Fabric",
    ],
  },
  {
    id: 6,
    name: "Back Care",
    type: "Semi-Medicated Mattress",
    category: "mattresses",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1634642899627-796e9bf39e98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Back Support", "Joint Care", "Semi-Medicated", "Therapeutic"],
    description:
      "Semi-Medicated mattress provide enhanced support for the back and joints, also prioritize comfort, making them suitable for everyday use.",
    layers: ["Knitted Fabric", "PU Foam", "Rebonded Foam", "Coir Foam", "PU Foam", "Knitted Fabric"],
  },
  {
    id: 7,
    name: "Nature Heaven",
    type: "Coir Mattress",
    category: "mattresses",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1634642942061-b28ce05501ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Natural Coir", "Eco-Friendly", "Firm Support", "Breathable"],
    description:
      "Coir mattresses are a popular choice for those seeking a firm, supportive, breathable, and eco-friendly sleep surface.",
    layers: [
      "Premium Knitted Fabric",
      "PU Foam",
      "High Density PU Foam",
      "Coir Sheet",
      "High Density Rebonded Foam",
      "Coir Sheet",
      "PU Foam",
      "Premium Knitted Fabric",
    ],
  },
  {
    id: 8,
    name: "Bio Nest",
    type: "Pure Coir Mattress",
    category: "mattresses",
    price: 10000,
    image:
      "https://images.unsplash.com/photo-1634642942188-5f20c83af1e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["100% Natural", "Eco-Friendly", "Temperature Regulation", "Spinal Alignment"],
    description:
      "Coir is a natural and Eco-Friendly material, these structure allows for good air circulation, which helps regulate temperature and prevent heat buildup.",
    layers: ["Knitted Fabric", "Soft Foam", "Coir Foam", "PU Foam", "Knitted Fabric"],
  },
  // Pillows
  {
    id: 9,
    name: "Latex Pillow",
    type: "Natural Latex Pillow",
    category: "pillows",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Natural Latex", "Hypoallergenic", "Breathable", "Durable"],
    description:
      "Natural latex pillow provides excellent support and comfort with superior breathability and hypoallergenic properties.",
  },
  {
    id: 10,
    name: "Memory Pillow",
    type: "Memory Foam Pillow",
    category: "pillows",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    features: ["Memory Foam", "Contour Support", "Pressure Relief", "Temperature Sensitive"],
    description:
      "Memory foam pillow contours to your head and neck, providing personalized support and pressure relief.",
  },
  {
    id: 11,
    name: "Foam Pillow",
    type: "High Density Foam Pillow",
    category: "pillows",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1631049552188-c37c1e7d60c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["High Density Foam", "Firm Support", "Durable", "Affordable"],
    description: "High density foam pillow offers firm support and excellent durability at an affordable price.",
  },
  {
    id: 12,
    name: "Fiber Pillow",
    type: "Microfiber Pillow",
    category: "pillows",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1584100366354-72c64717fcc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    features: ["Microfiber Fill", "Soft Comfort", "Machine Washable", "Lightweight"],
    description: "Microfiber pillow provides soft comfort and is easy to maintain with machine washable properties.",
  },
  // Accessories
  {
    id: 13,
    name: "Premium Bed Cover",
    type: "Cotton Bed Cover",
    category: "accessories",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1584100980736-85232b8dd7d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    features: ["100% Cotton", "Breathable", "Soft Touch", "Easy Care"],
    description: "Premium cotton bed cover with superior comfort and breathability for a perfect night's sleep.",
  },
  {
    id: 14,
    name: "Luxury Pillow Cover",
    type: "Silk Pillow Cover",
    category: "accessories",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1584100936503-b937a6f5a71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    features: ["Pure Silk", "Hair Friendly", "Temperature Regulating", "Hypoallergenic"],
    description: "Luxury silk pillow cover that's gentle on hair and skin while providing temperature regulation.",
  },
  {
    id: 15,
    name: "Winter Comforter",
    type: "Down Alternative Comforter",
    category: "accessories",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1584100897494-c5f1432bd6e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    features: ["Down Alternative", "Hypoallergenic", "Machine Washable", "All Season"],
    description: "Down alternative comforter providing warmth and comfort without allergens, suitable for all seasons.",
  },
]

// Global variables
let cart = JSON.parse(localStorage.getItem("fezaCart")) || []
let favorites = JSON.parse(localStorage.getItem("fezaFavorites")) || []
let currentCategory = "all"
let displayedProductsCount = 3 // Start with 3 products
const productsPerLoad = 3 // Load 3 more products each time

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  loadProducts()
  updateCartCount()
  updateFavoritesCount()
  initializeForms()
  initializeProductCategories()
  initializeMobileEnhancements()
})

// Navigation functionality
function initializeNavigation() {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open")
  })

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open")
    })
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      scrollToSection(targetId)
    })
  })
}

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Product category filtering
function initializeProductCategories() {
  const categoryBtns = document.querySelectorAll(".category-btn")

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      currentCategory = btn.dataset.category
      displayedProductsCount = 3 // Reset to show 3 products when category changes
      loadProducts()
    })
  })
}

// Load and display products with "Show More" functionality
function loadProducts() {
  const productsGrid = document.getElementById("products-grid")
  const showMoreContainer = document.getElementById("show-more-container")
  const showMoreBtn = document.getElementById("show-more-btn")

  const filteredProducts =
    currentCategory === "all" ? products : products.filter((product) => product.category === currentCategory)

  // Get products to display (limited by displayedProductsCount)
  const productsToShow = filteredProducts.slice(0, displayedProductsCount)

  // Generate HTML for products
  productsGrid.innerHTML = productsToShow
    .map(
      (product) => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="action-btn ${favorites.includes(product.id) ? "active" : ""}" 
                            onclick="event.stopPropagation(); toggleFavorite(${product.id})"
                            title="Add to Favorites">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn" 
                            onclick="event.stopPropagation(); addToCart(${product.id})"
                            title="Add to Cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-type">${product.type}</p>
                <div class="product-features">
                    ${product.features
                      .slice(0, 3)
                      .map((feature) => `<span class="feature-tag">${feature}</span>`)
                      .join("")}
                </div>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-buttons">
                    <button class="btn-small btn-outline" onclick="event.stopPropagation(); openProductModal(${product.id})">
                        View Details
                    </button>
                    <button class="btn-small btn-solid" onclick="event.stopPropagation(); addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")

  // Show/hide "Show More" button based on remaining products
  if (displayedProductsCount >= filteredProducts.length) {
    showMoreContainer.style.display = "none"
  } else {
    showMoreContainer.style.display = "block"
    const remainingProducts = filteredProducts.length - displayedProductsCount
    showMoreBtn.innerHTML = `
      <i class="fas fa-plus"></i>
      Show More Products (${remainingProducts} remaining)
    `
  }
}

// Show more products function
function showMoreProducts() {
  const filteredProducts =
    currentCategory === "all" ? products : products.filter((product) => product.category === currentCategory)

  displayedProductsCount += productsPerLoad

  // Don't exceed total products
  if (displayedProductsCount > filteredProducts.length) {
    displayedProductsCount = filteredProducts.length
  }

  loadProducts()

  // Add smooth scroll animation to new products
  setTimeout(() => {
    const productCards = document.querySelectorAll(".product-card")
    const newCards = Array.from(productCards).slice(-productsPerLoad)

    newCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
        card.style.transition = "all 0.5s ease"

        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 50)
      }, index * 100)
    })
  }, 100)
}

// Add this function to close all modals
function closeAllModals() {
  document.getElementById("product-modal").classList.remove("open")
  document.getElementById("sleep-quiz-modal").classList.remove("open")
  document.getElementById("size-guide-modal").classList.remove("open")
  document.getElementById("overlay").classList.remove("open")
}

// Product modal functionality
// Update the openProductModal function to close other modals first
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Redirect to product details page and pass productId as query parameter
    window.location.href = `product-details.html?id=${productId}`;
}


function closeModal() {
  document.getElementById("product-modal").classList.remove("open")
  document.getElementById("overlay").classList.remove("open")
}

// Cart functionality
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: productId,
      name: product.name,
      type: product.type,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  updateCartCount()
  updateCartDisplay()
  saveCart()
  showNotification(`${product.name} added to cart!`)
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  updateCartCount()
  updateCartDisplay()
  saveCart()
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (!item) return

  item.quantity += change

  if (item.quantity <= 0) {
    removeFromCart(productId)
  } else {
    updateCartCount()
    updateCartDisplay()
    saveCart()
  }
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0)
  document.getElementById("cart-count").textContent = count
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 2rem;">Your cart is empty</p>'
    cartTotal.textContent = "0"
    return
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-price">₹${item.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="qty-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: red;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.textContent = total.toLocaleString()
}

function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar")
  const overlay = document.getElementById("overlay")

  cartSidebar.classList.toggle("open")
  overlay.classList.toggle("open")

  if (cartSidebar.classList.contains("open")) {
    updateCartDisplay()
  }
}

function saveCart() {
  localStorage.setItem("fezaCart", JSON.stringify(cart))
}

// Favorites functionality
function toggleFavorite(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  if (favorites.includes(productId)) {
    favorites = favorites.filter((id) => id !== productId)
    showNotification(`${product.name} removed from favorites!`)
  } else {
    favorites.push(productId)
    showNotification(`${product.name} added to favorites!`)
  }

  updateFavoritesCount()
  updateFavoritesDisplay()
  saveFavorites()
  loadProducts() // Refresh products to update heart icons
}

function updateFavoritesCount() {
  document.getElementById("favorites-count").textContent = favorites.length
}

// Update the updateFavoritesDisplay function to add a trash icon for removing items
function updateFavoritesDisplay() {
  const favoritesItems = document.getElementById("favorites-items")

  if (favorites.length === 0) {
    favoritesItems.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 2rem;">No favorites yet</p>'
    return
  }

  const favoriteProducts = products.filter((product) => favorites.includes(product.id))

  favoritesItems.innerHTML = favoriteProducts
    .map(
      (product) => `
        <div class="favorite-item">
            <div class="item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="item-info">
                <div class="item-name">${product.name}</div>
                <div class="item-price">₹${product.price.toLocaleString()}</div>
                <div style="margin-top: 10px;">
                    <button class="btn-small btn-outline" onclick="openProductModal(${product.id})" style="margin-right: 5px;">View</button>
                    <button class="btn-small btn-solid" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
            <button class="remove-favorite-btn" onclick="toggleFavorite(${product.id})" title="Remove from favorites">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `,
    )
    .join("")
}

function toggleFavorites() {
  const favoritesSidebar = document.getElementById("favorites-sidebar")
  const overlay = document.getElementById("overlay")

  favoritesSidebar.classList.toggle("open")
  overlay.classList.toggle("open")

  if (favoritesSidebar.classList.contains("open")) {
    updateFavoritesDisplay()
  }
}

function saveFavorites() {
  localStorage.setItem("fezaFavorites", JSON.stringify(favorites))
}

// Checkout functionality
function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!", "error")
    return
  }

  const orderDetails = cart
    .map(
      (item) =>
        `${item.name} (${item.type}) - Qty: ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`,
    )
    .join("\n")

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const message =
    `🛏️ *Feza Mattresses Order*\n\n` +
    `📋 *Order Details:*\n${orderDetails}\n\n` +
    `💰 *Total Amount: ₹${total.toLocaleString()}*\n\n` +
    `📞 Please confirm this order and provide delivery details.`

  const whatsappUrl = `https://wa.me/919605600614?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

// Form handling
function initializeForms() {
  // Custom mattress form
  const customForm = document.getElementById("custom-form")
  customForm.addEventListener("submit", handleCustomForm)

  // Contact form
  const contactForm = document.getElementById("contact-form")
  contactForm.addEventListener("submit", handleContactForm)
}

function handleCustomForm(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)

  const message =
    `🛏️ *Custom Mattress Request*\n\n` +
    `👤 *Customer Details:*\n` +
    `Name: ${data.name}\n` +
    `Phone: ${data.phone}\n\n` +
    `🛏️ *Mattress Specifications:*\n` +
    `Type: ${data.type}\n` +
    `Size: ${data.size}\n` +
    `Firmness: ${data.firmness}\n` +
    `Thickness: ${data.thickness} inches\n` +
    `Budget: ${data.budget}\n\n` +
    `📝 *Special Requirements:*\n${data.requirements || "None"}\n\n` +
    `Please provide a custom quote for this mattress.`

  const whatsappUrl = `https://wa.me/919605600614?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")

  showNotification("Custom request sent! We will contact you soon.")
  e.target.reset()
}

function handleContactForm(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)

  const message =
    `📞 *Contact Form Submission*\n\n` +
    `👤 *Contact Details:*\n` +
    `Name: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone}\n\n` +
    `💬 *Message:*\n${data.message}`

  const whatsappUrl = `https://wa.me/919605600614?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")

  showNotification("Message sent! We will get back to you soon.")
  e.target.reset()
}

// Notification system
function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "error" ? "#ef4444" : "#10b981"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 1003;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `

  notification.textContent = message
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Close overlays when clicking outside
document.getElementById("overlay").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.remove("open")
  document.getElementById("favorites-sidebar").classList.remove("open")
  document.getElementById("product-modal").classList.remove("open")
  document.getElementById("overlay").classList.remove("open")
})

// Smooth scroll for hero buttons
document.addEventListener("DOMContentLoaded", () => {
  const heroButtons = document.querySelectorAll(".hero-buttons .btn-primary, .hero-buttons .btn-secondary")
  heroButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetSection = this.textContent.includes("Shop") ? "products" : "home"
      scrollToSection(targetSection)
    })
  })
})

// Initialize everything when page loads
window.addEventListener("load", () => {
  // Add fade-in animation to sections
  const sections = document.querySelectorAll("section")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up")
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => {
    observer.observe(section)
  })
})

// Sleep Quiz functionality
const quizQuestions = [
  {
    question: "What's your preferred sleeping position?",
    options: [
      { text: "Side sleeper", value: "side" },
      { text: "Back sleeper", value: "back" },
      { text: "Stomach sleeper", value: "stomach" },
      { text: "Combination sleeper", value: "combination" },
    ],
  },
  {
    question: "How firm do you like your mattress?",
    options: [
      { text: "Very soft", value: "very-soft" },
      { text: "Medium soft", value: "medium-soft" },
      { text: "Medium firm", value: "medium-firm" },
      { text: "Very firm", value: "very-firm" },
    ],
  },
  {
    question: "Do you sleep hot or cold?",
    options: [
      { text: "I sleep hot", value: "hot" },
      { text: "I sleep cold", value: "cold" },
      { text: "I'm comfortable", value: "neutral" },
      { text: "It varies", value: "varies" },
    ],
  },
  {
    question: "What's your budget range?",
    options: [
      { text: "₹10,000 - ₹15,000", value: "budget" },
      { text: "₹15,000 - ₹25,000", value: "mid-range" },
      { text: "₹25,000 - ₹35,000", value: "premium" },
      { text: "₹35,000+", value: "luxury" },
    ],
  },
  {
    question: "Any specific health concerns?",
    options: [
      { text: "Back pain", value: "back-pain" },
      { text: "Joint pain", value: "joint-pain" },
      { text: "Allergies", value: "allergies" },
      { text: "No specific concerns", value: "none" },
    ],
  },
]

let currentQuizQuestion = 0
let quizAnswers = []

// Update the openSleepQuiz function to close other modals first
function openSleepQuiz() {
  closeAllModals() // Close any open modals first

  const modal = document.getElementById("sleep-quiz-modal")
  modal.classList.add("open")
  document.getElementById("overlay").classList.add("open")
  currentQuizQuestion = 0
  quizAnswers = []
  loadQuizQuestion()
}

function closeSleepQuiz() {
  document.getElementById("sleep-quiz-modal").classList.remove("open")
  document.getElementById("overlay").classList.remove("open")
}

function loadQuizQuestion() {
  const quizContent = document.getElementById("quiz-content")
  const question = quizQuestions[currentQuizQuestion]

  // Update progress
  const progress = ((currentQuizQuestion + 1) / quizQuestions.length) * 100
  document.getElementById("quiz-progress").style.width = progress + "%"
  document.getElementById("current-question").textContent = currentQuizQuestion + 1

  quizContent.innerHTML = `
    <div class="quiz-question">
      <h3>${question.question}</h3>
      <div class="quiz-options">
        ${question.options
          .map(
            (option, index) => `
          <div class="quiz-option" onclick="selectQuizOption('${option.value}', ${index})">
            ${option.text}
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    <div class="quiz-navigation">
      <button class="btn-secondary" onclick="previousQuestion()" ${currentQuizQuestion === 0 ? 'style="visibility: hidden;"' : ""}>
        <i class="fas fa-arrow-left"></i> Previous
      </button>
      <button class="btn-primary" id="next-btn" onclick="nextQuestion()" style="display: none;">
        ${currentQuizQuestion === quizQuestions.length - 1 ? "Get Recommendations" : "Next <i class='fas fa-arrow-right'></i>"}
      </button>
    </div>
  `
}

function selectQuizOption(value, index) {
  // Remove previous selection
  document.querySelectorAll(".quiz-option").forEach((option) => {
    option.classList.remove("selected")
  })

  // Add selection to clicked option
  document.querySelectorAll(".quiz-option")[index].classList.add("selected")

  // Store answer
  quizAnswers[currentQuizQuestion] = value

  // Show next button
  document.getElementById("next-btn").style.display = "block"
}

function nextQuestion() {
  if (currentQuizQuestion < quizQuestions.length - 1) {
    currentQuizQuestion++
    loadQuizQuestion()
  } else {
    showQuizResults()
  }
}

function previousQuestion() {
  if (currentQuizQuestion > 0) {
    currentQuizQuestion--
    loadQuizQuestion()
  }
}

function showQuizResults() {
  const recommendations = getRecommendations(quizAnswers)
  const quizContent = document.getElementById("quiz-content")

  quizContent.innerHTML = `
    <div class="quiz-results">
      <h3>Your Perfect Mattress Recommendations</h3>
      <div class="recommendations-grid">
        ${recommendations
          .map(
            (rec, index) => `
          <div class="recommendation-card">
            <img src="${rec.image}" alt="${rec.name}">
            <h4>${rec.name}</h4>
            <p>${rec.reason}</p>
            <div class="rec-price">₹${rec.price.toLocaleString()}</div>
            <button class="btn-primary" onclick="openProductModal(${rec.id})">View Details</button>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="quiz-actions">
        <button class="btn-secondary" onclick="closeSleepQuiz()">
          <i class="fas fa-times"></i> Close
        </button>
        <button class="btn-primary" onclick="sendQuizResults()">
          <i class="fab fa-whatsapp"></i> Get Expert Consultation
        </button>
      </div>
    </div>
  `
}

function getRecommendations(answers) {
  // Simple recommendation logic based on answers
  let recommendations = []

  if (answers.includes("back-pain") || answers.includes("joint-pain")) {
    recommendations.push(products.find((p) => p.name === "Spinal Support"))
  }

  if (answers.includes("hot")) {
    recommendations.push(products.find((p) => p.name === "Nature Heaven"))
  }

  if (answers.includes("side")) {
    recommendations.push(products.find((p) => p.name === "Luxe Cloud"))
  }

  if (answers.includes("luxury")) {
    recommendations.push(products.find((p) => p.name === "PostureMate"))
  }

  // Add default recommendations if none match
  if (recommendations.length === 0) {
    recommendations = [products.find((p) => p.name === "Luxe Cloud"), products.find((p) => p.name === "Opulence")]
  }

  // Add recommendation reasons
  return recommendations.slice(0, 3).map((product) => ({
    ...product,
    reason: getRecommendationReason(product, answers),
  }))
}

function getRecommendationReason(product, answers) {
  const reasons = {
    "Spinal Support": "Perfect for back support and pain relief",
    "Luxe Cloud": "Ideal for side sleepers and pressure relief",
    "Nature Heaven": "Great for hot sleepers with natural breathability",
    PostureMate: "Premium comfort with individual spring support",
    Opulence: "Natural latex for hypoallergenic comfort",
  }

  return reasons[product.name] || "Recommended based on your preferences"
}

function sendQuizResults() {
  const recommendations = getRecommendations(quizAnswers)
  const message =
    `🛏️ *Sleep Quiz Results*\n\n` +
    `📋 *Recommended Mattresses:*\n` +
    recommendations.map((rec) => `• ${rec.name} - ${rec.reason}`).join("\n") +
    `\n\n💬 I'd like expert consultation for these recommendations.`

  const whatsappUrl = `https://wa.me/919605600614?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
  closeSleepQuiz()
}

// Size Guide functionality
// Update the openSizeGuide function to close other modals first
function openSizeGuide() {
  closeAllModals() // Close any open modals first

  const modal = document.getElementById("size-guide-modal")
  modal.classList.add("open")
  document.getElementById("overlay").classList.add("open")
}

function closeSizeGuide() {
  document.getElementById("size-guide-modal").classList.remove("open")
  document.getElementById("overlay").classList.remove("open")
}

// Floating action buttons
function openWhatsAppChat() {
  const message = `👋 Hi! I'm interested in Feza Mattresses. Can you help me choose the right mattress?`
  const whatsappUrl = `https://wa.me/919605600614?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Newsletter functionality
document.getElementById("newsletter-form").addEventListener("submit", function (e) {
  e.preventDefault()
  const email = this.querySelector('input[type="email"]').value

  const message = `📧 *Newsletter Subscription*\n\nEmail: ${email}\n\nPlease add me to your newsletter for updates and offers.`
  const whatsappUrl = `https://wa.me/919605600614?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")

  showNotification("Thank you for subscribing! We will contact you soon.")
  this.reset()
})

// Island navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".island-navbar")
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Add this function to enhance the mobile experience
function initializeMobileEnhancements() {
  // Add active class to current nav link
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Add scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".feature-item, .product-card, .testimonial-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.classList.add("fade-in-up")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on load
}
