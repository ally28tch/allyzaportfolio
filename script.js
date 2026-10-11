/* ==========================================================================
   DATA
   ========================================================================== */
const GRAPHICS_COUNT = 8;
const GRAPHICS_EXT = "jpg";
const GRAPHICS = Array.from({ length: GRAPHICS_COUNT }, (_, i) => ({
  src: `images/projects/project-${i + 1}.${GRAPHICS_EXT}`,
  alt: `Graphic design ${i + 1}`
}));

const ADVOCACY_VIDEOS = [
  {
    topic: "Indigenous Rights and Environmental Justice",
    title: "Ibinasurang Paraiso",
    credit: "Documentary by Kara David | I-Witness | GMA Public Affairs",
    highlight: "The story of an Ayta community fighting to protect its ancestral land from the effects of a dumpsite, raising questions about environmental responsibility and the rights of Indigenous people.",
    description: [
      "A place that should provide a home, safety, and a future for its people becomes a place of struggle when the land they depend on is threatened. Ibinasurang Paraiso tells the story of the Ayta community in Sitio Tibag, Subic, whose ancestral land has been affected by a dumpsite. Beyond the waste and environmental damage lies a deeper issue: the struggle of Indigenous people to protect their home, their rights, and their way of life.",
      "This documentary reveals how development and waste management can have serious consequences for communities whose voices are often overlooked. It reminds us that land is more than a place to live. For Indigenous communities, it carries history, identity, culture, and a connection to generations before them."
    ],
    whyItMatters: "Environmental problems are not experienced equally. While some people benefit from convenience and development, others are left to live with the consequences. The story of the Ayta community calls attention to environmental justice, Indigenous rights, and the responsibility to listen to people whose lives are directly affected by decisions made around them.",
    src: "videos/video1.mp4",
    fullUrl: "https://www.youtube.com/watch?v=mFslA0GxNEQ"
  },
  {
    topic: "Hunger, Poverty, and Food Insecurity",
    title: "Huling Kalam ng Tiyan",
    credit: "Documentary by Kara David | I-Witness | GMA Public Affairs",
    highlight: "A family's experience with hunger exposes the difficult realities of poverty and food insecurity, reminding us that access to safe and sufficient food remains a serious concern.",
    description: [
      "Hunger is not always visible to the people who pass by us every day. Sometimes, it exists quietly in homes where families must stretch what little food they have just to make it through another day. Huling Kalam ng Tiyan revisits Ningning and her family, whose experiences reveal the harsh reality of poverty and food insecurity, including the practice of eating pagpag, or discarded food that has been collected and prepared for consumption.",
      "Behind every meal that is missing is a family trying to survive under circumstances they did not simply choose. This documentary brings viewers closer to the reality of people who face hunger not as a temporary inconvenience, but as a daily struggle. It challenges the idea that having enough food is something everyone can take for granted."
    ],
    whyItMatters: "No family should have to question where their next meal will come from. Hunger affects not only physical health but also dignity, opportunities, and the ability to live securely. By sharing the experiences of families facing food insecurity, this documentary reminds us that poverty is more than a lack of money. It is a reality that demands compassion, understanding, and meaningful action.",
    src: "videos/video2.mp4",
    fullUrl: "https://www.youtube.com/watch?v=I2RTFtGicC0"
  },
  {
    topic: "Agriculture and Farmers' Livelihood",
    title: "Magtanim ay 'Di Biro",
    credit: "Documentary by Kara David | I-Witness | GMA Public Affairs",
    highlight: "Benguet cabbage farmers face low buying prices and unsold harvests, revealing the uncertainty of agricultural work and the struggle to earn a fair living from the food they grow.",
    description: [
      "Planting and harvesting require time, strength, patience, and resources. Yet for many farmers, a successful harvest does not always mean a secure income. Magtanim ay 'Di Biro follows cabbage farmers in Benguet who face the difficult reality of low buying prices and harvests that may remain unsold. After months of hard work, farmers can find themselves struggling to recover the money and effort they invested in growing their crops.",
      "Their situation reveals a painful contradiction: the people who help put food on our tables can also be among those who struggle to earn enough to support their own families. Behind every vegetable sold in the market is a farmer whose livelihood depends on prices, buyers, weather, and a system that does not always work in their favor."
    ],
    whyItMatters: "Farmers play an essential role in feeding the nation, yet their hard work does not always guarantee fair compensation or financial security. Their experiences raise important questions about agricultural support, market prices, food supply, and the value given to the people who produce our food. Recognizing their struggles is a reminder that supporting agriculture also means protecting the dignity and livelihood of Filipino farmers.",
    src: "videos/video3.mp4",
    fullUrl: "https://youtu.be/GcCkQoceR64"
  },
  {
    topic: "Healthcare Access and Indigenous Communities",
    title: "Biyaheng Pakpak Lawin",
    credit: "Documentary by Kara David | I-Witness | GMA Public Affairs",
    highlight: "The difficult journey of bringing sick members of a remote Mangyan community to medical care reveals the barriers that keep essential health services out of reach for some Filipinos.",
    description: [
      "For some communities, reaching a healthcare facility is not as simple as taking a ride or walking a short distance. In remote areas, difficult terrain, long travel times, and limited access to services can turn a medical emergency into a dangerous journey. Biyaheng Pakpak Lawin follows Kapitan Samuel as he helps sick members of the Bangon Mangyan community in Pakpak Lawin, Oriental Mindoro, reach medical care despite the challenges of their location.",
      "The documentary brings attention to people whose access to basic services is shaped by where they live. For them, seeking treatment can require extraordinary effort, assistance from others, and the determination to continue despite difficult conditions. Their experiences show that the struggle for healthcare is not only about hospitals and medicine. It is also about distance, accessibility, and whether help can reach those who need it most."
    ],
    whyItMatters: "Healthcare should not depend on a person's location or ability to travel long distances. Remote and Indigenous communities deserve access to timely, safe, and reliable medical services. By sharing their experiences, this documentary encourages viewers to look beyond the existence of healthcare facilities and consider whether these services are truly accessible to everyone.",
    src: "videos/video4.mp4",
    fullUrl: "https://youtu.be/VtUg7js8OeA"
  }
];

/* ==========================================================================
   SHOP DATA
   Product images go in images/shop/ (4:5 ratio). Edit the payment account below.
   ========================================================================== */
const PAYMENT_ACCOUNT_NAME = "Allyza Aclan";
const PAYMENT_ACCOUNT_NUMBER = "0930 753 8997";
const PAYMENT_QR = {
  GCash: "images/payments/gcash-qr.png",
  Maya: "images/payments/maya-qr.png"
};

/* Social media links: edit these three */
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  github: "https://github.com/"
};

const SHOP_PRODUCTS = [
  {
    id: 1,
    name: "32mm Button Pins",
    type: "physical",
    tag: "Physical Product",
    price: 20,
    meta: [["Category", "Physical Products"], ["Size", "32mm"]],
    short: "Little pins, big personality! Add a cute touch to your bags, pouches, and everyday essentials with these adorable 32mm button pins.",
    full: [
      "Add a little personality to your everyday essentials! These 32mm button pins are perfect for decorating bags, pouches, lanyards, and other accessories. Small but full of charm, they're a fun way to express your style, collect your favorite designs, or give someone a little something to smile about."
    ],
    note: "",
    designs: 32,
    maxQty: 99,
    images: ["images/shop/button-pins.jpg"]
  },
  {
    id: 2,
    name: "Cute Memo Pads",
    type: "physical",
    tag: "Physical Product",
    price: 20,
    meta: [["Category", "Physical Products"], ["Design", "Random design shipment"]],
    short: "Make every note a little cuter! Perfect for reminders, to-do lists, random thoughts, and sweet little messages.",
    full: [
      "Turn your everyday notes into something a little more fun! These cute memo pads are perfect for jotting down reminders, organizing your to-do list, writing quick messages, or simply putting your thoughts on paper. A lovely little stationery essential for students, stationery lovers, and anyone who enjoys making ordinary moments feel special."
    ],
    note: "",
    designs: 0,
    maxQty: 100,
    images: ["images/shop/memo-pads.jpg"]
  },
  {
    id: 3,
    name: "Phone Charms",
    type: "physical",
    tag: "Physical Product",
    price: 45,
    meta: [["Category", "Physical Products"]],
    short: "Give your phone a little extra charm with cute accessories that add personality and a touch of your own style.",
    full: [
      "Your phone deserves a little accessorizing, too! These adorable phone charms add a playful touch to your device and let you show off your personal style. Whether you love colorful details, cute accessories, or simply enjoy customizing your everyday essentials, these little charms are made to make your phone feel more like you."
    ],
    note: "",
    designs: 4,
    maxQty: 100,
    images: ["images/shop/phone-charms.jpg"]
  },
  {
    id: 4,
    name: "Plushie Keychains",
    type: "physical",
    tag: "Physical Product",
    price: 50,
    meta: [["Category", "Physical Products"]],
    short: "A tiny bundle of cuteness for your everyday adventures! Decorate your bags, backpacks, or keys with an adorable plushie companion.",
    full: [
      "Carry a little cuteness wherever life takes you! These plushie keychains are perfect for adding a soft, adorable touch to your bags, backpacks, or keys. Whether you're collecting them, styling your favorite bag, or looking for a small gift for someone special, these tiny companions make everyday essentials a little more fun."
    ],
    note: "",
    designs: 9,
    maxQty: 100,
    images: ["images/shop/plushie-keychains.jpg"]
  },
  {
    id: 5,
    name: "BT21 Coloring Book",
    type: "digital",
    tag: "Digital · Printable",
    price: 150,
    meta: [["Category", "Digital Products"], ["Format", "PDF"], ["Delivery", "Digital Download"]],
    short: "Bring your favorite BT21 character designs to life with colors! A fun and relaxing printable activity for creative breaks and cozy afternoons.",
    full: [
      "Looking for a fun way to spend your creative time? This BT21 coloring book offers an enjoyable coloring activity for fans who love adding their own colors and personal touches to character designs. Print your pages, grab your favorite coloring materials, and enjoy a relaxing moment filled with creativity."
    ],
    note: "Important: This is a digital product only. No physical coloring book will be shipped.",
    designs: 0,
    maxQty: 99,
    images: ["images/shop/bt21-coloring-book.jpg"]
  },
  {
    id: 6,
    name: "Ready-to-Print Button Pin Designs",
    type: "digital",
    tag: "Digital · Printable",
    price: 10,
    meta: [["Category", "Digital Products"], ["Format", "PDF"], ["Size", "For 32mm Button Pins"], ["Delivery", "Digital Download"]],
    short: "Cute, pre-designed button pin artwork ready to download, print, and turn into real button pins. Just print and bring the designs to life!",
    full: [
      "Turn your favorite designs into something you can hold! These ready-to-print button pin designs feature pre-made artwork, so you don't have to start from scratch. Simply purchase the digital file, download the designs, print them using suitable materials, and use a compatible button pin-making process to create your own physical pins.",
      "Perfect for personal collections, creative projects, and making little accessories to share or gift. It's an easy way to bring digital designs into the real world!"
    ],
    note: "Please note: This is a digital product only. No physical button pins, printing materials, or button pin-making services are included. Check the listed size and file details before purchasing.",
    designs: 8,
    maxQty: 99,
    images: ["images/shop/button-designs-1.jpg", "images/shop/button-designs-2.jpg"]
  }
];

/* ==========================================================================
   NAVIGATION
   ========================================================================== */

const SECTIONS = ["home", "about", "projects", "advocacy", "shop", "contact"];
let activeIndex = 0;

const navLinks = document.querySelectorAll("[data-nav-link]");
const mobileMenu = document.getElementById("mobileMenu");
const menuToggle = document.getElementById("menuToggle");

function goToSection(sectionId, opts = {}){
  const idx = SECTIONS.indexOf(sectionId);
  if (idx === -1) return;
  activeIndex = idx;
  updateCarousel();
  updateNavActiveState();

  if (!document.documentElement.classList.contains("js-carousel")){
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  }

  if (!opts.silent){
    closeMobileMenu();
  }
}

function updateNavActiveState(){
  const current = SECTIONS[activeIndex];
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.target === current);
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => goToSection(link.dataset.target));
});

function closeMobileMenu(){
  mobileMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
}
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen;
});

/* ==========================================================================
   CARD CAROUSEL
   ========================================================================== */

const cardStage = document.getElementById("cardStage");
const cardEls = SECTIONS.map(id => document.getElementById(id));
const dotsContainer = document.getElementById("carouselDots");
const prevBtn = document.getElementById("prevCard");
const nextBtn = document.getElementById("nextCard");

function buildDots(){
  dotsContainer.innerHTML = "";
  SECTIONS.forEach((id) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Go to " + id + " section");
    dot.addEventListener("click", () => goToSection(id));
    dotsContainer.appendChild(dot);
  });
}

function updateCarousel(){
  cardEls.forEach((el, i) => {
    let position = "hidden-right";
    if (i === activeIndex) position = "active";
    else if (i === activeIndex - 1) position = "prev";
    else if (i === activeIndex + 1) position = "next";
    else if (i < activeIndex) position = "hidden-left";
    el.setAttribute("data-position", position);
    el.setAttribute("aria-hidden", i === activeIndex ? "false" : "true");
  });

  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeIndex);
    dot.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
  });

  prevBtn.disabled = activeIndex === 0;
  nextBtn.disabled = activeIndex === SECTIONS.length - 1;
}

prevBtn.addEventListener("click", () => goToSection(SECTIONS[Math.max(0, activeIndex - 1)]));
nextBtn.addEventListener("click", () => goToSection(SECTIONS[Math.min(SECTIONS.length - 1, activeIndex + 1)]));

document.addEventListener("keydown", (e) => {
  if (!document.documentElement.classList.contains("js-carousel")) return;
  const modalOpen = document.querySelector(".modal-overlay:not([hidden])");
  if (modalOpen) return;
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
});

/* Swipe between sections */
let touchStartX = 0;
let touchStartY = 0;

cardStage.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

cardStage.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5){
    if (dx < 0) nextBtn.click();
    else prevBtn.click();
  }
}, { passive: true });

function enableCarousel(){
  document.documentElement.classList.add("js-carousel");
  buildDots();
  updateCarousel();
}

/* ==========================================================================
   PROJECTS — GRAPHICS GALLERY
   ========================================================================== */

let gfxIndex = 0;

function setGraphic(i){
  const n = GRAPHICS.length;
  gfxIndex = ((i % n) + n) % n;
  updateGraphics();
}

function updateGraphics(){
  const n = GRAPHICS.length;
  document.querySelectorAll(".gfx-slide").forEach((slide, i) => {
    let off = i - gfxIndex;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
    const abs = Math.abs(off);
    const clamped = Math.max(-3, Math.min(3, off));
    slide.style.setProperty("--o", clamped);
    slide.style.setProperty("--abs", Math.min(abs, 3));
    slide.dataset.far = abs >= 3 ? "true" : "false";
    slide.classList.toggle("is-active", off === 0);
    slide.setAttribute("aria-hidden", off === 0 ? "false" : "true");
  });
}

function renderProjects(){
  const track = document.getElementById("gfxTrack");
  const stage = document.getElementById("gfxStage");
  if (!track || !stage) return;

  track.innerHTML = GRAPHICS.map((g, i) => `
    <figure class="gfx-slide" data-gfx="${i}">
      <span class="gfx-label">[GRAPHIC ${i + 1}]</span>
      <img src="${g.src}" alt="${escapeHTML(g.alt)}" loading="lazy" onerror="this.remove()">
    </figure>
  `).join("");

  track.querySelectorAll(".gfx-slide").forEach(slide => {
    slide.addEventListener("click", () => setGraphic(Number(slide.dataset.gfx)));
  });

  document.getElementById("gfxPrev").addEventListener("click", () => setGraphic(gfxIndex - 1));
  document.getElementById("gfxNext").addEventListener("click", () => setGraphic(gfxIndex + 1));

  /* Swipe changes the graphic, not the page */
  let sx = 0, sy = 0;
  stage.addEventListener("touchstart", (e) => {
    e.stopPropagation();
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    e.stopPropagation();
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2){
      setGraphic(gfxIndex + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });

  updateGraphics();
}

/* ==========================================================================
   ADVOCACY VIDEOS
   ========================================================================== */

function renderAdvocacyVideos(){
  const grid = document.getElementById("videoGrid");
  grid.innerHTML = ADVOCACY_VIDEOS.map((video, i) => `
    <button type="button" class="video-card" data-video-index="${i}" aria-haspopup="dialog" aria-label="Open ${escapeHTML(video.title)}">
      <span class="block-plus" aria-hidden="true">+</span>
      <div class="video-thumb">
        <video src="${video.src}#t=0.5" preload="metadata" muted playsinline onerror="this.remove()"></video>
        <span class="play-icon">&#9658;</span>
      </div>
      <div class="video-body">
        <p class="video-topic">${escapeHTML(video.topic)}</p>
        <h3>${escapeHTML(video.title)}</h3>
        <p class="video-highlight">${escapeHTML(video.highlight)}</p>
      </div>
    </button>
  `).join("");

  grid.querySelectorAll("[data-video-index]").forEach(card => {
    card.addEventListener("click", () => openVideoModal(ADVOCACY_VIDEOS[card.dataset.videoIndex], card));
  });
}

const videoOverlay = document.getElementById("videoOverlay");
function openVideoModal(video, triggerEl){
  const modal = videoOverlay.querySelector(".modal");
  document.getElementById("videoModalBody").innerHTML = `
    <div class="video-frame">
      <span class="video-fallback">[HIGHLIGHT VIDEO]</span>
      <video controls playsinline aria-label="${escapeHTML(video.title)}">
        <source src="${video.src}" type="video/mp4" onerror="this.closest('video').remove()">
      </video>
    </div>
    <p class="video-topic">${escapeHTML(video.topic)}</p>
    <h3 id="videoModalTitle">${escapeHTML(video.title)}</h3>
    <p class="video-credit">${escapeHTML(video.credit)}</p>
    ${video.description.map(p => `<p class="video-desc">${escapeHTML(p)}</p>`).join("")}
    <div class="video-why">
      <h4>Why It Matters</h4>
      <p>${escapeHTML(video.whyItMatters)}</p>
    </div>
    <a class="btn btn-primary video-full" href="${escapeHTML(video.fullUrl)}" target="_blank" rel="noopener">Watch Full Documentary on YouTube</a>
  `;
  modal.scrollTop = 0;
  openModal(videoOverlay);

  if (triggerEl){
    const r = triggerEl.getBoundingClientRect();
    modal.style.setProperty("--ox", (r.left + r.width / 2 - modal.offsetLeft) + "px");
    modal.style.setProperty("--oy", (r.top + r.height / 2 - modal.offsetTop) + "px");
  }
}

/* ==========================================================================
   SHOP — CART
   ========================================================================== */

const CATEGORY_LABEL = { physical: "Physical Products", digital: "Digital Products" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let cart = loadCart();

function getProduct(id){
  return SHOP_PRODUCTS.find(p => p.id === Number(id));
}

function cartKey(id, design){
  return id + "|" + (design || "");
}

function loadCart(){
  try{
    const raw = localStorage.getItem("allyza_cart_v2");
    const data = raw ? JSON.parse(raw) : {};
    Object.keys(data).forEach(k => { if (!getProduct(data[k].id)) delete data[k]; });
    return data;
  }catch(err){
    return {};
  }
}

function saveCart(){
  try{
    localStorage.setItem("allyza_cart_v2", JSON.stringify(cart));
  }catch(err){
    console.warn("Could not save cart:", err);
  }
}

function addToCart(id, design, qty){
  if (isSoldOut(id)) return;
  const p = getProduct(id);
  if (!p) return;
  const key = cartKey(id, design);
  const line = cart[key] || { id: p.id, design: design || null, qty: 0 };
  line.qty = Math.min(p.maxQty, line.qty + qty);
  cart[key] = line;
  saveCart();
  renderCartIcon();
  renderCartDrawer();
}

function changeQty(key, delta){
  const line = cart[key];
  if (!line) return;
  line.qty = Math.min(getProduct(line.id).maxQty, line.qty + delta);
  if (line.qty <= 0) delete cart[key];
  saveCart();
  renderCartIcon();
  renderCartDrawer();
}

function removeFromCart(key){
  delete cart[key];
  saveCart();
  renderCartIcon();
  renderCartDrawer();
}

function emptyCart(){
  cart = {};
  saveCart();
  renderCartIcon();
  renderCartDrawer();
}

function cartItemsList(){
  return Object.values(cart).map(l => ({ id: l.id, design: l.design, qty: l.qty }));
}

function itemsTotal(items){
  return items.reduce((sum, i) => sum + getProduct(i.id).price * i.qty, 0);
}

function cartTotal(){
  return itemsTotal(cartItemsList());
}

function formatPeso(amount){
  return "₱" + amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderCartIcon(){
  const count = Object.values(cart).reduce((a, l) => a + l.qty, 0);
  document.getElementById("cartCount").textContent = count;
}

function renderCartDrawer(){
  const itemsEl = document.getElementById("cartItems");
  const entries = Object.entries(cart);

  if (entries.length === 0){
    itemsEl.innerHTML = `<p class="cart-empty">Your cart is empty. Browse the shop to add something you like.</p>`;
  } else {
    itemsEl.innerHTML = entries.map(([key, line]) => {
      const p = getProduct(line.id);
      return `
        <div class="cart-item">
          <div class="cart-item-thumb">
            <span>IMG</span>
            <img src="${p.images[0]}" alt="" onerror="this.remove()">
          </div>
          <div>
            <p class="cart-item-name">${escapeHTML(p.name)}${isSoldOut(p.id) ? ' <span class="soldout-inline">Sold Out</span>' : ""}</p>
            ${line.design ? `<p class="cart-item-design">Design ${line.design}</p>` : ""}
            <p class="cart-item-price">${formatPeso(p.price)} each</p>
            <div class="qty-control">
              <button type="button" data-qty="-1" data-key="${key}" aria-label="Decrease quantity">&minus;</button>
              <span>${line.qty}</span>
              <button type="button" data-qty="1" data-key="${key}" aria-label="Increase quantity" ${line.qty >= p.maxQty ? "disabled" : ""}>+</button>
            </div>
          </div>
          <button type="button" class="remove-item" data-remove="${key}">Remove</button>
        </div>
      `;
    }).join("");
  }

  document.getElementById("cartSubtotal").textContent = formatPeso(cartTotal());
  const hasSold = entries.some(([, l]) => isSoldOut(l.id));
  document.getElementById("checkoutBtn").disabled = entries.length === 0 || hasSold;
  document.getElementById("checkoutBtn").title = hasSold ? "Remove the sold out items to continue" : "";
}

document.getElementById("cartItems").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-qty], [data-remove]");
  if (!btn) return;
  if (btn.hasAttribute("data-remove")) removeFromCart(btn.dataset.remove);
  else changeQty(btn.dataset.key, Number(btn.dataset.qty));
});

/* ==========================================================================
   SHOP — PRODUCTS
   ========================================================================== */

let currentFilter = "all";
const soldOutIds = new Set();
const isSoldOut = (id) => soldOutIds.has(Number(id));

async function loadAvailability(){
  if (location.protocol === "file:") return;
  try{
    const res = await fetch("php/products.php", { cache: "no-store" });
    const json = parseJSON(await res.text());
    if (!json || !json.success) return;
    soldOutIds.clear();
    json.products.forEach(p => { if (p.sold_out) soldOutIds.add(Number(p.id)); });
    renderProducts();
    renderCartDrawer();
  }catch(err){ /* stays available if the server can't be reached */ }
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  const list = SHOP_PRODUCTS.filter(p => currentFilter === "all" || p.type === currentFilter);

  grid.innerHTML = list.map(p => `
    <article class="product-card${isSoldOut(p.id) ? " is-soldout" : ""}" role="button" tabindex="0" data-view-product="${p.id}" aria-haspopup="dialog" aria-label="View ${escapeHTML(p.name)}">
      <div class="product-image">
        <span>[PRODUCT IMAGE]</span>
        <img src="${p.images[0]}" alt="${escapeHTML(p.name)}" loading="lazy" onerror="this.remove()">
        <span class="block-plus" aria-hidden="true">+</span>
        ${isSoldOut(p.id) ? '<span class="soldout-badge">Sold Out</span>' : ""}
      </div>
      <div class="product-body">
        <p class="product-category">${CATEGORY_LABEL[p.type]}</p>
        <h3>${escapeHTML(p.name)}</h3>
        <p class="product-tag">${escapeHTML(p.tag)}</p>
        <p class="product-desc">${escapeHTML(p.short)}</p>
        <div class="product-footer">
          <span class="product-price">${formatPeso(p.price)}</span>
          <span class="product-view">View details</span>
        </div>
      </div>
    </article>
  `).join("");
}

document.getElementById("productGrid").addEventListener("click", (e) => {
  const card = e.target.closest("[data-view-product]");
  if (card) openProductModal(card.dataset.viewProduct);
});
document.getElementById("productGrid").addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest("[data-view-product]");
  if (!card) return;
  e.preventDefault();
  openProductModal(card.dataset.viewProduct);
});

document.querySelectorAll(".filter-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach(c => { c.classList.remove("active"); c.setAttribute("aria-selected", "false"); });
    chip.classList.add("active");
    chip.setAttribute("aria-selected", "true");
    currentFilter = chip.dataset.filter;
    renderProducts();
  });
});

const productModalOverlay = document.getElementById("productModalOverlay");

function openProductModal(id){
  const p = getProduct(id);
  if (!p) return;

  const state = { design: null, qty: 1, slide: 0 };
  const body = document.getElementById("productModalBody");
  const multi = p.images.length > 1;
  const needsDesign = p.designs > 0;

  body.innerHTML = `
    <div class="pm">
      <div class="pm-gallery">
        <div class="pm-frame">
          <div class="pm-track" id="pmTrack">
            ${p.images.map((src, i) => `
              <figure class="pm-slide">
                <span>[PRODUCT IMAGE${multi ? " " + (i + 1) : ""}]</span>
                <img src="${src}" alt="${escapeHTML(p.name)}${multi ? " image " + (i + 1) : ""}" onerror="this.remove()">
              </figure>
            `).join("")}
          </div>
          ${multi ? `
            <button type="button" class="pm-arrow pm-arrow--prev" id="pmPrev" aria-label="Previous image">&#8249;</button>
            <button type="button" class="pm-arrow pm-arrow--next" id="pmNext" aria-label="Next image">&#8250;</button>
            <span class="pm-count" id="pmCount">1 / ${p.images.length}</span>
          ` : ""}
        </div>
      </div>

      <div class="pm-info">
        <p class="pm-cat">${CATEGORY_LABEL[p.type]}${isSoldOut(p.id) ? ' <span class="soldout-inline">Sold Out</span>' : ""}</p>
        <h2 id="productModalTitle">${escapeHTML(p.name)}</h2>
        <p class="pm-price">${formatPeso(p.price)}</p>

        <ul class="pm-meta">
          ${p.meta.filter(m => m[0] !== "Category").map(([k, v]) => `<li><span>${escapeHTML(k)}</span>${escapeHTML(v)}</li>`).join("")}
        </ul>

        ${p.full.map(t => `<p class="pm-desc">${escapeHTML(t)}</p>`).join("")}
        ${p.note ? `<p class="pm-note">${escapeHTML(p.note)}</p>` : ""}
        ${p.type === "digital" ? `<p class="pm-note">Digital product &middot; GCash / Maya payment only. After you order, the seller will contact you to send the PDF file.</p>` : ""}

        ${needsDesign ? `
          <div class="pm-block">
            <p class="pm-label">Choose a design</p>
            <div class="design-grid" id="pmDesigns">
              ${Array.from({ length: p.designs }, (_, i) => `<button type="button" class="design-chip" data-design="${i + 1}" aria-pressed="false">Design ${i + 1}</button>`).join("")}
            </div>
          </div>
        ` : ""}

        <div class="pm-block">
          <p class="pm-label">Quantity</p>
          <div class="qty-row">
            <button type="button" id="pmMinus" aria-label="Decrease quantity">&minus;</button>
            <input type="number" id="pmQty" value="1" min="1" max="${p.maxQty}" inputmode="numeric" aria-label="Quantity">
            <button type="button" id="pmPlus" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <p class="pm-total">Total <strong id="pmTotal"></strong></p>

        <div class="pm-actions">
          <button type="button" class="btn btn-outline" id="pmAdd">Add to Cart</button>
          <button type="button" class="btn btn-primary" id="pmBuy">Buy Now</button>
        </div>
        <p class="pm-hint" id="pmHint"></p>
      </div>
    </div>
  `;

  const $ = (sel) => body.querySelector(sel);
  const addBtn = $("#pmAdd"), buyBtn = $("#pmBuy"), hint = $("#pmHint"), qtyInput = $("#pmQty");

  const sold = isSoldOut(p.id);

  function refresh(){
    const blocked = sold || (needsDesign && !state.design);
    addBtn.disabled = blocked;
    buyBtn.disabled = blocked;
    hint.textContent = sold ? "This item is sold out for now." : blocked ? "Please choose a design first." : "";
    qtyInput.value = state.qty;
    $("#pmMinus").disabled = state.qty <= 1;
    $("#pmPlus").disabled = state.qty >= p.maxQty;
    $("#pmTotal").textContent = formatPeso(p.price * state.qty);
  }

  function setQty(n){
    n = Math.round(Number(n)) || 1;
    state.qty = Math.max(1, Math.min(p.maxQty, n));
    refresh();
  }

  $("#pmMinus").addEventListener("click", () => setQty(state.qty - 1));
  $("#pmPlus").addEventListener("click", () => setQty(state.qty + 1));
  qtyInput.addEventListener("change", () => setQty(qtyInput.value));

  if (needsDesign){
    $("#pmDesigns").addEventListener("click", (e) => {
      const chip = e.target.closest("[data-design]");
      if (!chip) return;
      state.design = Number(chip.dataset.design);
      body.querySelectorAll(".design-chip").forEach(c => c.setAttribute("aria-pressed", String(c === chip)));
      refresh();
    });
  }

  if (multi){
    const track = $("#pmTrack"), count = $("#pmCount");
    const n = p.images.length;
    const go = (i) => {
      state.slide = (i + n) % n;
      track.style.transform = `translateX(-${state.slide * 100}%)`;
      count.textContent = `${state.slide + 1} / ${n}`;
    };
    $("#pmPrev").addEventListener("click", () => go(state.slide - 1));
    $("#pmNext").addEventListener("click", () => go(state.slide + 1));
    let sx = 0;
    track.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(state.slide + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  addBtn.addEventListener("click", () => {
    addToCart(p.id, state.design, state.qty);
    addBtn.textContent = "Added to Cart ✓";
    setTimeout(() => { addBtn.textContent = "Add to Cart"; }, 1300);
  });

  buyBtn.addEventListener("click", () => {
    closeModal(productModalOverlay);
    openCheckout([{ id: p.id, design: state.design, qty: state.qty }], false);
  });

  refresh();
  body.scrollTop = 0;
  productModalOverlay.querySelector(".modal").scrollTop = 0;
  openModal(productModalOverlay);
}

/* ==========================================================================
   SHOP — CHECKOUT
   ========================================================================== */

const cartOverlay = document.getElementById("cartOverlay");
const checkoutOverlay = document.getElementById("checkoutOverlay");
const confirmationOverlay = document.getElementById("confirmationOverlay");

const coForm = document.getElementById("checkoutForm");
const coSummary = document.getElementById("coSummary");
const coTitle = document.getElementById("checkoutTitle");
const coSubmit = document.getElementById("coSubmit");
const coHint = document.getElementById("coHint");
const coError = document.getElementById("checkoutError");
const codNote = document.getElementById("codNote");
const payStep = document.getElementById("paymentStep");
const payBtn = document.getElementById("payBtn");
const payRef = document.getElementById("payRef");

const FIELD_RULES = {
  custName:    v => v.trim().length >= 2,
  custEmail:   v => EMAIL_RE.test(v.trim()),
  custContact: v => { const d = v.replace(/\D/g, ""); return d.length >= 10 && d.length <= 13; },
  custAddress: v => v.trim().length >= 8
};

let coItems = [];
let coFromCart = false;
let coWallet = "GCash";
let coBusy = false;
const coTouched = new Set();

function coHasPhysical(){ return coItems.some(i => getProduct(i.id).type === "physical"); }
function coHasDigital(){ return coItems.some(i => getProduct(i.id).type === "digital"); }
function coPaymentChoice(){ return coForm.querySelector('input[name="payment"]:checked').value; }
function itemLabel(i){ return getProduct(i.id).name + (i.design ? ` (Design ${i.design})` : ""); }

function openCheckout(items, fromCart){
  if (!items.length) return;
  coItems = items;
  coFromCart = fromCart;
  coBusy = false;
  coTouched.clear();
  coForm.reset();

  const hasPhysical = coHasPhysical();
  const hasDigital = coHasDigital();

  document.getElementById("coAddressField").hidden = !hasPhysical;

  const codInput = coForm.querySelector('input[value="COD"]');
  codInput.disabled = hasDigital;
  document.getElementById("codOption").classList.toggle("is-disabled", hasDigital);
  codNote.hidden = !hasDigital;

  coSummary.innerHTML = items.map(i => `
    <div class="co-summary-row"><span>${escapeHTML(itemLabel(i))} × ${i.qty}</span><span>${formatPeso(getProduct(i.id).price * i.qty)}</span></div>
  `).join("");
  document.getElementById("checkoutTotal").textContent = formatPeso(itemsTotal(items));

  showCheckoutStep(1);
  refreshCheckout();
  openModal(checkoutOverlay);
}

function showCheckoutStep(step){
  coError.hidden = true;
  coForm.hidden = step !== 1;
  payStep.hidden = step !== 2;
  coTitle.textContent = step === 1 ? "Checkout" : "Payment";
  coSummary.hidden = step !== 1;
}

function checkoutValues(){
  return {
    name: document.getElementById("custName").value.trim(),
    email: document.getElementById("custEmail").value.trim(),
    contact: document.getElementById("custContact").value.trim(),
    address: document.getElementById("custAddress").value.trim(),
    notes: document.getElementById("custNotes").value.trim()
  };
}

function checkoutIsValid(){
  const needAddress = coHasPhysical();
  return Object.keys(FIELD_RULES).every(id => {
    if (id === "custAddress" && !needAddress) return true;
    return FIELD_RULES[id](document.getElementById(id).value);
  });
}

function refreshCheckout(){
  document.querySelectorAll(".pay-option").forEach(o => {
    o.classList.toggle("is-selected", o.querySelector("input").checked);
  });
  Object.keys(FIELD_RULES).forEach(id => {
    const el = document.getElementById(id);
    const bad = coTouched.has(id) && !FIELD_RULES[id](el.value) && !(id === "custAddress" && !coHasPhysical());
    el.classList.toggle("invalid", bad);
  });
  const ok = checkoutIsValid();
  coSubmit.disabled = !ok;
  coHint.hidden = ok;
  coSubmit.textContent = coPaymentChoice() === "COD" ? "Place Order" : "Continue to Payment";
}

coForm.addEventListener("input", refreshCheckout);
coForm.addEventListener("change", refreshCheckout);
coForm.addEventListener("focusout", (e) => {
  if (e.target.id) { coTouched.add(e.target.id); refreshCheckout(); }
});

coForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!checkoutIsValid() || coBusy) return;
  if (coPaymentChoice() === "COD"){
    coSubmit.disabled = true;
    coSubmit.textContent = "Placing Order…";
    placeOrder("COD", "");
  } else {
    showPayStep();
  }
});

/* GCash / Maya payment */
function setWallet(wallet){
  coWallet = wallet;
  payStep.querySelectorAll(".wallet-btn").forEach(b => {
    const on = b.dataset.wallet === wallet;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-selected", String(on));
  });
  const qr = document.getElementById("payQR");
  qr.innerHTML = "";
  const img = new Image();
  img.alt = wallet + " QR code";
  img.onerror = () => { qr.innerHTML = `<p class="pay-qr-missing">Add your QR image at<br>${escapeHTML(PAYMENT_QR[wallet])}</p>`; };
  img.src = PAYMENT_QR[wallet];
  qr.appendChild(img);
  refreshPay();
}

function refreshPay(){
  const total = formatPeso(itemsTotal(coItems));
  payBtn.disabled = coBusy || payRef.value.trim().length < 6;
  payBtn.textContent = coBusy ? "Processing payment…" : `Pay ${total} via ${coWallet}`;
}

function showPayStep(){
  showCheckoutStep(2);
  document.getElementById("payAmount").textContent = formatPeso(itemsTotal(coItems));
  document.getElementById("payAccountName").textContent = PAYMENT_ACCOUNT_NAME;
  document.getElementById("payAccountNumber").textContent = PAYMENT_ACCOUNT_NUMBER;
  payRef.value = "";
  setWallet("GCash");
}

payStep.querySelectorAll(".wallet-btn").forEach(b => b.addEventListener("click", () => setWallet(b.dataset.wallet)));
payRef.addEventListener("input", refreshPay);
document.getElementById("payBack").addEventListener("click", () => { coBusy = false; showCheckoutStep(1); refreshCheckout(); });

payBtn.addEventListener("click", async () => {
  if (payBtn.disabled) return;
  coBusy = true;
  refreshPay();
  await new Promise(r => setTimeout(r, 1500));
  if (checkoutOverlay.hidden) { coBusy = false; return; }
  placeOrder(coWallet, payRef.value.trim());
});

async function placeOrder(method, reference){
  coBusy = true;
  const v = checkoutValues();
  const payload = {
    customer_name: v.name,
    email: v.email,
    contact_number: v.contact,
    address: coHasPhysical() ? v.address : "",
    notes: v.notes,
    payment_method: method,
    payment_reference: reference,
    items: coItems.map(i => ({ product_id: i.id, design: i.design, quantity: i.qty }))
  };

  const result = await submitOrder(payload);
  coBusy = false;

  if (!result.success){
    loadAvailability();
    coError.textContent = result.message;
    coError.hidden = false;
    if (payStep.hidden) refreshCheckout(); else refreshPay();
    return;
  }

  closeModal(checkoutOverlay);
  showConfirmation(result, payload);
  if (coFromCart) emptyCart();
}

function showConfirmation(result, payload){
  const hasDigital = coHasDigital();
  const itemsList = coItems.map(i => `${itemLabel(i)} × ${i.qty}`).join(", ");
  const methodLabel = payload.payment_method === "COD" ? "Cash on Delivery" : payload.payment_method;

  document.getElementById("confirmationBody").innerHTML = `
    <p><span>Order Number</span><span>${escapeHTML(result.order_code)}</span></p>
    <p><span>Customer Name</span><span>${escapeHTML(payload.customer_name)}</span></p>
    <p><span>Items</span><span>${escapeHTML(itemsList)}</span></p>
    <p><span>Total</span><span>${formatPeso(itemsTotal(coItems))}</span></p>
    <p><span>Payment Method</span><span>${escapeHTML(methodLabel)}</span></p>
    <p><span>Date</span><span>${new Date().toLocaleDateString("en-PH")}</span></p>
  `;
  document.getElementById("confirmationNote").textContent = hasDigital
    ? "Thank you! Your payment will be checked, then you'll be contacted through your email or contact number to receive your PDF file."
    : "Thank you! You'll be contacted through your email or contact number once your order is confirmed.";
  openModal(confirmationOverlay);
}

document.getElementById("cartToggle").addEventListener("click", () => {
  renderCartDrawer();
  openModal(cartOverlay);
});

document.getElementById("emptyCartBtn").addEventListener("click", emptyCart);

document.getElementById("checkoutBtn").addEventListener("click", () => {
  const items = cartItemsList();
  if (!items.length) return;
  closeModal(cartOverlay);
  openCheckout(items, true);
});

/* ==========================================================================
   BACKEND (PHP / MySQL via XAMPP)
   ========================================================================== */

function parseJSON(text){
  try{ return JSON.parse(text); }catch(err){ /* try to skip stray output */ }
  const i = text.indexOf("{"), j = text.lastIndexOf("}");
  if (i !== -1 && j > i){
    try{ return JSON.parse(text.slice(i, j + 1)); }catch(err){ /* not JSON */ }
  }
  return null;
}

function serverProblem(status, url){
  const where = " [" + status + " · " + new URL(url, location.href).href + "]";
  if (status === 404) return "The server could not find the PHP files (404). Put the whole site folder, including the php folder, inside xampp/htdocs and open it at http://localhost/allyza/." + where;
  if (status === 405) return "The server refused the request (405). The site must be opened through XAMPP Apache at http://localhost/allyza/, not Live Server or another tool." + where;
  if (status === 403) return "Access was blocked (403). Check that the site folder is inside xampp/htdocs." + where;
  return "PHP did not return a valid answer (status " + status + "). Open http://localhost/allyza/php/check.php to see what is wrong." + where;
}

async function postJSON(url, data){
  if (location.protocol === "file:"){
    return { success: false, message: "This page was opened as a file. Start Apache in XAMPP and open http://localhost/allyza/ instead." };
  }
  let res;
  try{
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Requested-With": "fetch" },
      body: JSON.stringify(data)
    });
  }catch(err){
    return { success: false, message: "Could not reach the server at " + new URL(url, location.href).href + ". Start Apache and MySQL in the XAMPP Control Panel and open the site through http://localhost/." };
  }
  const json = parseJSON(await res.text());
  if (json && typeof json.success === "boolean"){
    if (!json.success && !json.message) json.message = serverProblem(res.status, url);
    return json;
  }
  return { success: false, message: serverProblem(res.status, url) };
}

function submitOrder(orderData){
  return postJSON("php/create_order.php", orderData);
}

/* ==========================================================================
   ABOUT POP-UPS
   ========================================================================== */

const aboutOverlay = document.getElementById("aboutOverlay");
const aboutModal = document.getElementById("aboutModal");
const aboutModalBody = document.getElementById("aboutModalBody");

function openAboutModal(key, triggerEl){
  const tpl = document.getElementById("tpl-" + key);
  if (!tpl) return;

  aboutModalBody.innerHTML = tpl.innerHTML;
  aboutModalBody.scrollTop = 0;
  aboutModal.classList.toggle("about-modal--lg", tpl.dataset.size === "lg");

  openModal(aboutOverlay);

  if (triggerEl){
    const r = triggerEl.getBoundingClientRect();
    const ox = r.left + r.width / 2 - aboutModal.offsetLeft;
    const oy = r.top + r.height / 2 - aboutModal.offsetTop;
    aboutModal.style.setProperty("--ox", ox + "px");
    aboutModal.style.setProperty("--oy", oy + "px");
  }

  const closeBtn = aboutModal.querySelector(".modal-close");
  if (closeBtn) closeBtn.focus({ preventScroll: true });
}

document.querySelectorAll("[data-about-modal]").forEach(card => {
  card.addEventListener("click", () => openAboutModal(card.dataset.aboutModal, card));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openAboutModal(card.dataset.aboutModal, card);
    }
  });
});

/* ==========================================================================
   UTILITIES
   ========================================================================== */

function escapeHTML(str){
  const div = document.createElement("div");
  div.textContent = String(str ?? "");
  return div.innerHTML;
}

function openModal(overlay){
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal(overlay){
  overlay.hidden = true;
  document.body.style.overflow = "";
  if (overlay.id === "videoOverlay") document.getElementById("videoModalBody").innerHTML = "";
}
document.querySelectorAll("[data-close-modal]").forEach(btn => {
  btn.addEventListener("click", () => {
    closeModal(btn.closest(".modal-overlay"));
  });
});
document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay);
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll(".modal-overlay:not([hidden])").forEach(closeModal);
});

/* Contact form */
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById("contactStatus");
  const btn = form.querySelector('button[type="submit"]');
  const data = {
    name: document.getElementById("contactName").value.trim(),
    email: document.getElementById("contactEmail").value.trim(),
    message: document.getElementById("contactMessage").value.trim()
  };

  if (!data.name || !data.message){
    status.textContent = "Please enter your name and message.";
    return;
  }
  if (!EMAIL_RE.test(data.email)){
    status.textContent = "Please enter a valid email address.";
    return;
  }

  btn.disabled = true;
  status.textContent = "Sending…";
  const result = await postJSON("php/send_message.php", data);
  btn.disabled = false;

  if (result.success){
    status.textContent = "Thanks for the message! I'll get back to you soon.";
    form.reset();
  } else {
    status.textContent = result.message;
  }
});

/* Social links */
document.querySelectorAll("[data-social]").forEach(a => {
  a.href = SOCIAL_LINKS[a.dataset.social] || "#";
});

/* ==========================================================================
   INIT
   ========================================================================== */

(function init(){
  renderProjects();
  renderAdvocacyVideos();
  enableCarousel();
  renderProducts();
  loadAvailability();
  renderCartIcon();
  renderCartDrawer();
})();
