/* ==========================================================================
   ReSell – Second-Hand Buying and Selling Website
   JavaScript File: js/script.js
   Features:
   1. 27 Sample products across 9 categories + LocalStorage persistence
   2. Search products by name
   3. Filter by category and condition
   4. Sort products by price (Low to High / High to Low)
   5. Submit new products with validation & image upload preview
   6. Manage & Delete your own posted products
   7. Product details modal popup + WhatsApp Contact Seller link
   8. Mobile navigation toggle
   ========================================================================== */

// LocalStorage key
const STORAGE_KEY = "resellProducts";

// Fallback image if a seller does not upload a product photo
const PLACEHOLDER_IMAGE = "images/placeholder.svg";

// ==================== 1. DEFAULT SAMPLE PRODUCTS (27 ITEMS = 3 PER CATEGORY) ====================
const defaultProducts = [
  // --- Mobiles (3) ---
  {
    id: "sample-1",
    name: "iPhone 12",
    price: 22000,
    category: "Mobiles",
    condition: "Like New",
    seller: "Aarav Patel",
    contact: "9876543210",
    description:
      "64GB Blue iPhone 12 in clean condition. Battery health is 86%. Comes with original cable and back cover. No screen scratches.",
    image: "images/iphone12.jpg"
  },
  {
    id: "sample-2",
    name: "Samsung Galaxy",
    price: 12000,
    category: "Mobiles",
    condition: "Good",
    seller: "Sneha Verma",
    contact: "9823456781",
    description:
      "Samsung Galaxy 128GB smartphone, 1 year old. Smooth display and strong battery backup. Original charger included.",
    image: "images/samsung-galaxy.jpg"
  },
  {
    id: "sample-11",
    name: "OnePlus Nord CE 3",
    price: 16500,
    category: "Mobiles",
    condition: "Like New",
    seller: "Devansh Kapoor",
    contact: "9810456721",
    description:
      "8GB RAM, 128GB storage in Aqua Mint color. Fast 80W charger and original box included. Used carefully with tempered glass.",
    image: "images/oneplus-nord.jpg"
  },

  // --- Laptops (3) ---
  {
    id: "sample-3",
    name: "HP Laptop",
    price: 25000,
    category: "Laptops",
    condition: "Good",
    seller: "Rohan Mehta",
    contact: "9811223344",
    description:
      "HP Pavilion Intel Core i5, 8GB RAM, 512GB SSD. Great for B.Tech coding assignments, VS Code, and online classes.",
    image: "images/hp-laptop.jpg"
  },
  {
    id: "sample-12",
    name: "Dell Inspiron 15",
    price: 28500,
    category: "Laptops",
    condition: "Like New",
    seller: "Niharika Joshi",
    contact: "9873214560",
    description:
      "Dell Inspiron 15 with 11th Gen Core i5, 16GB RAM, 512GB NVMe SSD, and backlit keyboard. Battery lasts 5+ hours.",
    image: "images/dell-laptop.jpg"
  },
  {
    id: "sample-13",
    name: "Lenovo IdeaPad Slim 3",
    price: 19500,
    category: "Laptops",
    condition: "Used",
    seller: "Siddharth Das",
    contact: "9820113344",
    description:
      "Lightweight 15.6-inch Ryzen 5 laptop with 8GB RAM and 256GB SSD. Ideal budget coding and college presentation laptop.",
    image: "images/lenovo-laptop.jpg"
  },

  // --- Electronics (3) ---
  {
    id: "sample-4",
    name: "Boat Headphones",
    price: 800,
    category: "Electronics",
    condition: "Like New",
    seller: "Ananya Singh",
    contact: "9765432109",
    description:
      "Boat Rockerz wireless Bluetooth over-ear headphones with deep bass and comfortable ear cushions. Barely used for 2 months.",
    image: "images/boat-headphones.jpg"
  },
  {
    id: "sample-14",
    name: "JBL Bluetooth Speaker",
    price: 1600,
    category: "Electronics",
    condition: "Good",
    seller: "Manav Sharma",
    contact: "9844556677",
    description:
      "Compact waterproof portable Bluetooth speaker with crisp sound and 10-hour battery backup. Includes USB-C charging cable.",
    image: "images/jbl-speaker.jpg"
  },
  {
    id: "sample-15",
    name: "Logitech Wireless Keyboard & Mouse",
    price: 950,
    category: "Electronics",
    condition: "Like New",
    seller: "Ritika Sen",
    contact: "9831122445",
    description:
      "Silent compact wireless keyboard and optical mouse combo with single USB receiver. Great for desk coding setups.",
    image: "images/logitech-combo.jpg"
  },

  // --- Books (3) ---
  {
    id: "sample-6",
    name: "Engineering Books",
    price: 500,
    category: "Books",
    condition: "Good",
    seller: "Priya Nair",
    contact: "9900112233",
    description:
      "Complete 1st-year B.Tech CSE textbook combo including Engineering Mathematics, C Programming, Physics, and Digital Electronics.",
    image: "images/engineering-books.jpg"
  },
  {
    id: "sample-16",
    name: "DSA & C++ Programming Set",
    price: 450,
    category: "Books",
    condition: "Like New",
    seller: "Harsh Vardhan",
    contact: "9867543211",
    description:
      "Set of 3 Data Structures, Algorithms, and C++ programming books with clean pages and zero pen markings.",
    image: "images/dsa-books.jpg"
  },
  {
    id: "sample-17",
    name: "GATE CSE Preparation Books",
    price: 850,
    category: "Books",
    condition: "Used",
    seller: "Tanvi Deshmukh",
    contact: "9890123456",
    description:
      "Bundle of 4 GATE Computer Science solved papers and theory workbooks covering OS, DBMS, CN, and Algorithms.",
    image: "images/gate-books.jpg"
  },

  // --- Furniture (3) ---
  {
    id: "sample-7",
    name: "Wooden Study Table",
    price: 2500,
    category: "Furniture",
    condition: "Good",
    seller: "Vikram Rao",
    contact: "9845123456",
    description:
      "Compact light-oak wooden study table with sturdy metal legs. Spacious enough for a laptop and textbooks. Easy to carry.",
    image: "images/study-table.jpg"
  },
  {
    id: "sample-18",
    name: "Ergonomic Mesh Study Chair",
    price: 2200,
    category: "Furniture",
    condition: "Like New",
    seller: "Ishita Gupta",
    contact: "9818765432",
    description:
      "Breathable black mesh office & study chair with height adjustment, lumbar support, and smooth rolling wheels.",
    image: "images/study-chair.jpg"
  },
  {
    id: "sample-19",
    name: "3-Tier Metal Bookshelf",
    price: 1300,
    category: "Furniture",
    condition: "Used",
    seller: "Arjun Nair",
    contact: "9790112233",
    description:
      "Sturdy 3-shelf metal and wood organizer rack for hostel rooms. Holds textbooks, files, and storage boxes neatly.",
    image: "images/bookshelf.jpg"
  },

  // --- Bicycles (3) ---
  {
    id: "sample-5",
    name: "Bicycle",
    price: 3000,
    category: "Bicycles",
    condition: "Used",
    seller: "Karan Joshi",
    contact: "9898765432",
    description:
      "Sturdy campus hybrid bicycle with smooth gears, working disc brakes, and a bell. Ideal for daily hostel-to-college rides.",
    image: "images/bicycle.jpg"
  },
  {
    id: "sample-20",
    name: "Hero Sprint Pro 21-Gear Cycle",
    price: 6500,
    category: "Bicycles",
    condition: "Like New",
    seller: "Pranav Tiwari",
    contact: "9826543218",
    description:
      "Sporty 21-speed Shimano geared mountain cycle with front suspension and dual disc brakes. Recently serviced.",
    image: "images/gear-cycle.jpg"
  },
  {
    id: "sample-21",
    name: "Firefox City Cruiser Bicycle",
    price: 4800,
    category: "Bicycles",
    condition: "Good",
    seller: "Riya Banerjee",
    contact: "9830987654",
    description:
      "Comfortable navy-blue commuter cycle with cushioned saddle, mudguards, and side stand. Very smooth ride.",
    image: "images/city-bicycle.jpg"
  },

  // --- Sports (3) ---
  {
    id: "sample-8",
    name: "Kashmir Willow Cricket Bat",
    price: 1400,
    category: "Sports",
    condition: "Good",
    seller: "Aditya Kulkarni",
    contact: "9871122334",
    description:
      "Full-size Kashmir willow cricket bat with fresh green rubber grip and toe guard. Well-knocked and great for college ground matches.",
    image: "images/cricket-bat.jpg"
  },
  {
    id: "sample-22",
    name: "Yonex Badminton Racket Pair",
    price: 1100,
    category: "Sports",
    condition: "Like New",
    seller: "Neha Choudhary",
    contact: "9812340987",
    description:
      "Pair of lightweight graphite badminton rackets with fresh string tension, full cover, and 3 shuttlecocks included.",
    image: "images/badminton-rackets.jpg"
  },
  {
    id: "sample-23",
    name: "Nivia Football & Air Pump",
    price: 550,
    category: "Sports",
    condition: "Used",
    seller: "Yashwant Reddy",
    contact: "9848112299",
    description:
      "Size 5 stitched match football in good playable condition, bundled with a compact hand air pump and needle.",
    image: "images/football.jpg"
  },

  // --- Watches (3) ---
  {
    id: "sample-9",
    name: "Noise Smart Watch",
    price: 1800,
    category: "Watches",
    condition: "Like New",
    seller: "Meera Iyer",
    contact: "9833445566",
    description:
      "Round AMOLED display smartwatch with heart rate monitor, step counter, and 7-day battery life. Includes magnetic charging cable.",
    image: "images/smart-watch.jpg"
  },
  {
    id: "sample-24",
    name: "Casio Vintage Digital Watch",
    price: 1150,
    category: "Watches",
    condition: "Good",
    seller: "Saurabh Mishra",
    contact: "9891234500",
    description:
      "Classic silver stainless-steel Casio retro digital watch with LED backlight, stopwatch, and daily alarm. Water resistant.",
    image: "images/casio-watch.jpg"
  },
  {
    id: "sample-25",
    name: "Titan Leather Strap Watch",
    price: 2100,
    category: "Watches",
    condition: "Used",
    seller: "Kunal Arora",
    contact: "9811778899",
    description:
      "Minimalist silver-dial analog dress watch with genuine brown leather strap. New battery installed recently.",
    image: "images/titan-watch.jpg"
  },

  // --- Musical Instruments (3) ---
  {
    id: "sample-10",
    name: "Yamaha Acoustic Guitar",
    price: 5500,
    category: "Musical Instruments",
    condition: "Like New",
    seller: "Kabir Malhotra",
    contact: "9819988776",
    description:
      "Natural spruce-wood 6-string acoustic guitar with rich tone. Recently fitted with new strings. Comes with padded carry bag and picks.",
    image: "images/acoustic-guitar.jpg"
  },
  {
    id: "sample-26",
    name: "Casio 61-Key Musical Keyboard",
    price: 4200,
    category: "Musical Instruments",
    condition: "Good",
    seller: "Shruti Menon",
    contact: "9845998877",
    description:
      "61-key portable electronic keyboard with 400 tones, built-in speakers, and power adapter. Perfect for beginners and hostel jam sessions.",
    image: "images/casio-keyboard.jpg"
  },
  {
    id: "sample-27",
    name: "Concert Wooden Ukulele",
    price: 1650,
    category: "Musical Instruments",
    condition: "Used",
    seller: "Varun Saxena",
    contact: "9829001122",
    description:
      "Warm mahogany 23-inch concert ukulele with soft nylon strings and gig bag. Easy to learn and lightweight to carry.",
    image: "images/ukulele.jpg"
  }
];

// Optional callback set by active page so deleting updates UI cleanly
let refreshCurrentPage = null;

// ==================== 2. STORAGE & HELPER FUNCTIONS ====================

// Read user-submitted products saved in LocalStorage
function getSavedProducts() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      return [];
    }
    const parsed = JSON.parse(rawData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Could not read saved products:", error);
    return [];
  }
}

// Combine newly submitted products (shown first) with default sample products
function getAllProducts() {
  return getSavedProducts().concat(defaultProducts);
}

// Check whether a product was posted by the user on this browser
function isUserListing(product) {
  return String(product.id || "").indexOf("user-") === 0;
}

// Delete a user-posted product from LocalStorage
function deleteUserProduct(productId) {
  const savedProducts = getSavedProducts();
  const updatedProducts = [];

  for (let i = 0; i < savedProducts.length; i++) {
    if (savedProducts[i].id !== productId) {
      updatedProducts.push(savedProducts[i]);
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
}

// Format a number as Indian Rupees (Example: 22000 -> "₹22,000")
function formatPrice(amount) {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) {
    return "₹0";
  }
  return "₹" + numericAmount.toLocaleString("en-IN");
}

// Build a WhatsApp chat URL when a valid 10-digit Indian mobile number is available
function getWhatsAppUrl(product) {
  const digitsOnly = String(product.contact || "").replace(/\D/g, "");

  if (digitsOnly.length !== 10) {
    return null;
  }

  const message =
    "Hi " +
    product.seller +
    ", I saw your " +
    product.name +
    " listed for " +
    formatPrice(product.price) +
    " on ReSell. Is it still available?";

  return "https://wa.me/91" + digitsOnly + "?text=" + encodeURIComponent(message);
}

// Escape special HTML characters to keep innerHTML safe
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ==================== 3. CREATE PRODUCT CARD ====================

function createProductCard(product, options) {
  const cardOptions = options || {};
  const isManageMode = Boolean(cardOptions.manageMode);

  const card = document.createElement("article");
  card.className = "product-card";

  // Product Image + Condition Badge
  const imgWrap = document.createElement("div");
  imgWrap.className = "product-img-wrap";

  const img = document.createElement("img");
  img.src = product.image || PLACEHOLDER_IMAGE;
  img.alt = product.name;
  img.onerror = function () {
    this.onerror = null;
    this.src = PLACEHOLDER_IMAGE;
  };

  imgWrap.appendChild(img);

  const conditionBadge = document.createElement("span");
  conditionBadge.className = "condition-badge";
  conditionBadge.textContent = product.condition;
  imgWrap.appendChild(conditionBadge);

  // Product Info Body
  const info = document.createElement("div");
  info.className = "product-info";

  const badgesRow = document.createElement("div");
  badgesRow.className = "card-badges-row";

  const categoryTag = document.createElement("span");
  categoryTag.className = "product-category-tag";
  categoryTag.textContent = product.category;
  badgesRow.appendChild(categoryTag);

  if (isUserListing(product)) {
    const myBadge = document.createElement("span");
    myBadge.className = "my-listing-badge";
    myBadge.textContent = "My Listing";
    badgesRow.appendChild(myBadge);
  }

  const title = document.createElement("h3");
  title.className = "product-title";
  title.textContent = product.name;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = formatPrice(product.price);

  const seller = document.createElement("p");
  seller.className = "product-seller";
  seller.textContent = "Seller: " + product.seller;

  // Card Action Buttons
  const actions = document.createElement("div");
  actions.className = "product-actions";

  if (isManageMode) {
    // On Sell Page ("My Posted Products"): View on Buy Page + Delete Listing
    const viewBuyBtn = document.createElement("a");
    viewBuyBtn.href = "buy.html";
    viewBuyBtn.className = "btn btn-outline";
    viewBuyBtn.textContent = "View on Buy";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      const confirmed = confirm(
        'Are you sure you want to delete "' + product.name + '"?'
      );
      if (confirmed) {
        deleteUserProduct(product.id);
        if (typeof refreshCurrentPage === "function") {
          refreshCurrentPage();
        }
      }
    });

    actions.appendChild(viewBuyBtn);
    actions.appendChild(deleteBtn);
  } else {
    // On Home & Buy Pages: View Details + Contact Seller
    const detailsBtn = document.createElement("button");
    detailsBtn.type = "button";
    detailsBtn.className = "btn btn-outline";
    detailsBtn.textContent = "View Details";
    detailsBtn.addEventListener("click", function () {
      openProductModal(product);
    });

    const whatsappUrl = getWhatsAppUrl(product);
    const contactBtn = document.createElement("a");
    contactBtn.className = "btn btn-primary";
    contactBtn.textContent = "Contact Seller";

    if (whatsappUrl) {
      contactBtn.href = whatsappUrl;
      contactBtn.target = "_blank";
      contactBtn.rel = "noopener noreferrer";
    } else {
      contactBtn.href = "#";
      contactBtn.addEventListener("click", function (event) {
        event.preventDefault();
        alert("Seller has not provided a valid 10-digit WhatsApp number.");
      });
    }

    actions.appendChild(detailsBtn);
    actions.appendChild(contactBtn);
  }

  info.appendChild(badgesRow);
  info.appendChild(title);
  info.appendChild(price);
  info.appendChild(seller);
  info.appendChild(actions);

  card.appendChild(imgWrap);
  card.appendChild(info);

  return card;
}

// ==================== 4. PRODUCT DETAILS MODAL ====================

function openProductModal(product) {
  const modal = document.getElementById("productModal");
  const modalContent = document.getElementById("modalContent");

  if (!modal || !modalContent) {
    return;
  }

  modalContent.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "modal-grid";

  // Left: Image
  const imgWrap = document.createElement("div");
  imgWrap.className = "modal-image-wrap";

  const img = document.createElement("img");
  img.src = product.image || PLACEHOLDER_IMAGE;
  img.alt = product.name;
  img.onerror = function () {
    this.onerror = null;
    this.src = PLACEHOLDER_IMAGE;
  };
  imgWrap.appendChild(img);

  // Right: Details
  const details = document.createElement("div");
  details.className = "modal-details";

  const meta = document.createElement("div");
  meta.className = "modal-meta";

  const catTag = document.createElement("span");
  catTag.className = "product-category-tag";
  catTag.textContent = product.category;

  const condTag = document.createElement("span");
  condTag.className = "product-category-tag";
  condTag.textContent = "Condition: " + product.condition;

  meta.appendChild(catTag);
  meta.appendChild(condTag);

  const heading = document.createElement("h2");
  heading.textContent = product.name;

  const price = document.createElement("p");
  price.className = "modal-price";
  price.textContent = formatPrice(product.price);

  const desc = document.createElement("p");
  desc.className = "modal-description";
  desc.textContent = product.description || "No additional description provided.";

  const sellerBox = document.createElement("div");
  sellerBox.className = "modal-seller-box";
  sellerBox.innerHTML =
    "<strong>Seller:</strong> " +
    escapeHtml(product.seller) +
    "<br><strong>Contact:</strong> +91 " +
    escapeHtml(product.contact || "Not Available");

  const actionStack = document.createElement("div");
  actionStack.className = "modal-action-stack";

  // WhatsApp Button
  const whatsappUrl = getWhatsAppUrl(product);
  const contactLink = document.createElement("a");
  contactLink.className = "btn btn-primary btn-full";
  contactLink.textContent = "Chat with Seller on WhatsApp";

  if (whatsappUrl) {
    contactLink.href = whatsappUrl;
    contactLink.target = "_blank";
    contactLink.rel = "noopener noreferrer";
  } else {
    contactLink.href = "#";
    contactLink.addEventListener("click", function (event) {
      event.preventDefault();
      alert("Valid WhatsApp contact number is not available for this seller.");
    });
  }
  actionStack.appendChild(contactLink);

  // If this is a user-posted product, also allow deleting right from the modal
  if (isUserListing(product)) {
    const deleteModalBtn = document.createElement("button");
    deleteModalBtn.type = "button";
    deleteModalBtn.className = "btn btn-danger btn-full";
    deleteModalBtn.textContent = "Delete My Listing";
    deleteModalBtn.addEventListener("click", function () {
      const confirmed = confirm(
        'Are you sure you want to delete "' + product.name + '"?'
      );
      if (confirmed) {
        deleteUserProduct(product.id);
        closeProductModal();
        if (typeof refreshCurrentPage === "function") {
          refreshCurrentPage();
        }
      }
    });
    actionStack.appendChild(deleteModalBtn);
  }

  details.appendChild(meta);
  details.appendChild(heading);
  details.appendChild(price);
  details.appendChild(desc);
  details.appendChild(sellerBox);
  details.appendChild(actionStack);

  grid.appendChild(imgWrap);
  grid.appendChild(details);
  modalContent.appendChild(grid);

  modal.classList.add("open");
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal) {
    modal.classList.remove("open");
  }
}

function initModalEvents() {
  const modal = document.getElementById("productModal");
  const closeBtn = document.getElementById("closeModalBtn");

  if (!modal || !closeBtn) {
    return;
  }

  closeBtn.addEventListener("click", closeProductModal);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeProductModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeProductModal();
    }
  });
}

// ==================== 5. HOME PAGE LOGIC (index.html) ====================

function initHomePage() {
  const featuredGrid = document.getElementById("featuredProductsGrid");
  const navSearchForm = document.getElementById("navSearchForm");
  const navSearchInput = document.getElementById("navSearchInput");

  function renderFeatured() {
    if (!featuredGrid) {
      return;
    }

    // Show newest user-posted items first, followed by a diverse mix across categories
    const savedProducts = getSavedProducts();
    const diverseSamples = [];
    const seenCategories = {};

    for (let i = 0; i < defaultProducts.length; i++) {
      const item = defaultProducts[i];
      if (!seenCategories[item.category]) {
        seenCategories[item.category] = true;
        diverseSamples.push(item);
      }
    }

    const featuredList = savedProducts.concat(diverseSamples).slice(0, 8);

    featuredGrid.innerHTML = "";
    for (let i = 0; i < featuredList.length; i++) {
      featuredGrid.appendChild(createProductCard(featuredList[i]));
    }
  }

  if (featuredGrid) {
    refreshCurrentPage = renderFeatured;
    renderFeatured();
  }

  if (navSearchForm && navSearchInput) {
    navSearchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const query = navSearchInput.value.trim();
      if (query) {
        window.location.href = "buy.html?search=" + encodeURIComponent(query);
      } else {
        window.location.href = "buy.html";
      }
    });
  }
}

// ==================== 6. BUY PAGE LOGIC (buy.html) ====================

function initBuyPage() {
  const productGrid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const conditionFilter = document.getElementById("conditionFilter");
  const sortFilter = document.getElementById("sortFilter");
  const productCount = document.getElementById("productCount");
  const emptyState = document.getElementById("emptyState");
  const resetFilterBtn = document.getElementById("resetFilterBtn");

  if (!productGrid || !searchInput) {
    return;
  }

  let selectedCategory = "All";
  let selectedCondition = "All";
  let selectedSort = "default";
  let searchQuery = "";

  // Read optional ?category=... or ?search=... parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category");
  const initialSearch = urlParams.get("search");

  if (initialCategory) {
    selectedCategory = initialCategory;
    filterButtons.forEach(function (btn) {
      if (btn.getAttribute("data-category") === initialCategory) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  if (initialSearch) {
    searchQuery = initialSearch.toLowerCase();
    searchInput.value = initialSearch;
  }

  function renderProducts() {
    const allProducts = getAllProducts();
    const filteredProducts = [];

    for (let i = 0; i < allProducts.length; i++) {
      const item = allProducts[i];
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesCondition =
        selectedCondition === "All" || item.condition === selectedCondition;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery);

      if (matchesCategory && matchesCondition && matchesSearch) {
        filteredProducts.push(item);
      }
    }

    // Sort by price if selected
    if (selectedSort === "low-to-high") {
      filteredProducts.sort(function (a, b) {
        return Number(a.price) - Number(b.price);
      });
    } else if (selectedSort === "high-to-low") {
      filteredProducts.sort(function (a, b) {
        return Number(b.price) - Number(a.price);
      });
    }

    productGrid.innerHTML = "";

    if (filteredProducts.length === 0) {
      emptyState.classList.remove("hidden");
      productCount.textContent = "Showing 0 products";
    } else {
      emptyState.classList.add("hidden");
      const label = filteredProducts.length === 1 ? "product" : "products";
      productCount.textContent = "Showing " + filteredProducts.length + " " + label;

      for (let i = 0; i < filteredProducts.length; i++) {
        productGrid.appendChild(createProductCard(filteredProducts[i]));
      }
    }
  }

  // Register refresh callback so modal delete updates Buy page
  refreshCurrentPage = renderProducts;

  searchInput.addEventListener("input", function () {
    searchQuery = searchInput.value.trim().toLowerCase();
    renderProducts();
  });

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      selectedCategory = button.getAttribute("data-category");
      renderProducts();
    });
  });

  if (conditionFilter) {
    conditionFilter.addEventListener("change", function () {
      selectedCondition = conditionFilter.value;
      renderProducts();
    });
  }

  if (sortFilter) {
    sortFilter.addEventListener("change", function () {
      selectedSort = sortFilter.value;
      renderProducts();
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", function () {
      selectedCategory = "All";
      selectedCondition = "All";
      selectedSort = "default";
      searchQuery = "";

      searchInput.value = "";
      if (conditionFilter) {
        conditionFilter.value = "All";
      }
      if (sortFilter) {
        sortFilter.value = "default";
      }
      filterButtons.forEach(function (btn) {
        if (btn.getAttribute("data-category") === "All") {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      renderProducts();
    });
  }

  renderProducts();
}

// ==================== 7. SELL PAGE LOGIC (sell.html) ====================

function initSellPage() {
  const sellForm = document.getElementById("sellForm");
  const formMessage = document.getElementById("formMessage");
  const imageInput = document.getElementById("productImage");
  const previewBox = document.getElementById("imagePreviewBox");
  const previewImg = document.getElementById("imagePreview");
  const myListingsGrid = document.getElementById("myListingsGrid");
  const noListingsMessage = document.getElementById("noListingsMessage");

  if (!sellForm) {
    return;
  }

  let uploadedImageData = "";

  function showFormMessage(type, htmlText) {
    formMessage.className = "form-message " + type;
    formMessage.innerHTML = htmlText;
    formMessage.classList.remove("hidden");
    formMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Render the user's own posted products below the Sell form
  function renderMyListings() {
    if (!myListingsGrid || !noListingsMessage) {
      return;
    }

    const savedProducts = getSavedProducts();
    myListingsGrid.innerHTML = "";

    if (savedProducts.length === 0) {
      noListingsMessage.classList.remove("hidden");
    } else {
      noListingsMessage.classList.add("hidden");
      for (let i = 0; i < savedProducts.length; i++) {
        myListingsGrid.appendChild(
          createProductCard(savedProducts[i], { manageMode: true })
        );
      }
    }
  }

  refreshCurrentPage = renderMyListings;
  renderMyListings();

  if (imageInput) {
    imageInput.addEventListener("change", function () {
      const file = imageInput.files[0];

      if (!file) {
        uploadedImageData = "";
        previewBox.classList.add("hidden");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        showFormMessage("error", "Please select an image smaller than 2 MB.");
        imageInput.value = "";
        uploadedImageData = "";
        previewBox.classList.add("hidden");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (event) {
        uploadedImageData = event.target.result;
        previewImg.src = uploadedImageData;
        previewBox.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    });
  }

  sellForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const sellerName = document.getElementById("sellerName").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();
    const productName = document.getElementById("productName").value.trim();
    const productCategory = document.getElementById("productCategory").value;
    const productPrice = Number(document.getElementById("productPrice").value);
    const productCondition = document.getElementById("productCondition").value;
    const productDescription = document
      .getElementById("productDescription")
      .value.trim();

    if (sellerName.length < 2) {
      showFormMessage("error", "Please enter a valid seller name.");
      return;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      showFormMessage(
        "error",
        "Please enter a valid 10-digit mobile number (numbers only)."
      );
      return;
    }

    if (productName.length < 2) {
      showFormMessage("error", "Please enter the product name.");
      return;
    }

    if (!productCategory) {
      showFormMessage("error", "Please select a product category.");
      return;
    }

    if (isNaN(productPrice) || productPrice <= 0) {
      showFormMessage("error", "Please enter a valid price greater than ₹0.");
      return;
    }

    if (!productCondition) {
      showFormMessage("error", "Please select the product condition.");
      return;
    }

    if (productDescription.length < 10) {
      showFormMessage(
        "error",
        "Please write a short description (at least 10 characters)."
      );
      return;
    }

    const newProduct = {
      id: "user-" + Date.now(),
      name: productName,
      price: productPrice,
      category: productCategory,
      condition: productCondition,
      seller: sellerName,
      contact: contactNumber,
      description: productDescription,
      image: uploadedImageData || PLACEHOLDER_IMAGE
    };

    try {
      const existingProducts = getSavedProducts();
      existingProducts.unshift(newProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingProducts));
    } catch (error) {
      showFormMessage(
        "error",
        "Browser storage is full. Please try uploading a smaller image or submitting without an image."
      );
      return;
    }

    showFormMessage(
      "success",
      'Product "' +
        escapeHtml(productName) +
        '" has been listed successfully! <a href="buy.html">View on Buy Page &rarr;</a>'
    );

    sellForm.reset();
    uploadedImageData = "";
    previewBox.classList.add("hidden");
    renderMyListings();
  });
}

// ==================== 8. MOBILE NAVIGATION MENU ====================

function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }
}

// ==================== 9. INITIALIZE ON PAGE LOAD ====================

document.addEventListener("DOMContentLoaded", function () {
  initMobileMenu();
  initModalEvents();
  initHomePage();
  initBuyPage();
  initSellPage();
});
