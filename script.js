const productsData = [
  { 
    name: "iPhone 15", 
    category: "Smartphones", 
    amazon_price: "₹47,999", 
    flipkart_price: "₹59,999", 
    amazon_link: "https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX2F5QT/ref=sr_1_1_sspa?crid=UVDI4GH0HLV5&dib=eyJ2IjoiMSJ9.4Amcm6ymShwYf2cUNy6g86WDoB5h-9C6cHAj-CJcKnhhDPQn-fIYfKJxxKAv6p4v1WokuXVTy6CEak1Vh-NyyXpy1iuZzyJEP3yfBPiuod5AXI92mgE8K5Ri0StNbI0cfCLZwoWw4xYhZ4Zy_dCVzULq4y1fWHi5rPK31itoqAgrZmOkeZB49DiYrK0gcVbu-CZqvbRJ78fXOdBW-E8F5P4xctGvqO0NCJng4IPb63Q.k3UztQ_Unzo8RMUrifLHLCMETEjmneM1ZxAnZkmBbz4&dib_tag=se&keywords=iphone%2B15&qid=1758657846&sprefix=iphone%2B15%2Caps%2C229&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1", 
    flipkart_link: "https://www.flipkart.com/apple-iphone-15-blue-128-gb/p/itmbf14ef54f645d", 
    image: "https://i.ibb.co/BHB27Dgv/iphone-15.jpg" 
  },
  
  { 
    name: "Smart Watch", 
    category: "Watches", 
    amazon_price: "₹1,799", 
    flipkart_price: "₹1,799", 
    amazon_link: "https://www.amazon.in/boAt-Ultima-Ember-Smartwatch-Personalized/dp/B0DSFS2LLC/ref=sr_1_1_sspa?crid=1Y7P4BWTWHN19&dib=eyJ2IjoiMSJ9.35vSbzh_XJS-D_R9_uOXeZFB-pQGApvCncDdyKW2WejmESmYV7bpR4pSQliidlTOPmyGjOz2EQ4N0ZR33vtvqwHibU0cd2-kYpYc-QXQudtCc4XZlt3J9BrjOwQB6vOhjUj7VJrWpQ0GqQIHtQONMldT-NANTkEm2x8iJKv9Ko-1j8xN0W3RZCU7OP0iW1Loe5oAQdxDRLtFoGMtOYlRIXVOiKKANu-W4gRuYo_Nf4A.TBIG0a0fNz31NcghF4vyCmDuidSzGedi9d0G2rN6gnM&dib_tag=se&keywords=boat%2Bwatches%2Bon%2Bsale&qid=1758659426&sprefix=boat%2Bwatches%2Bon%2Bsal%2Caps%2C252&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1", 
    flipkart_link: "https://www.flipkart.com/boat-ultima-ember-w-1-96-4-97cm-amoled-display-bt-calling-functional-crown-smartwatch/p/itm5d5cbfc47f9d8",
    image: "https://i.ibb.co/N20YG3L7/smartwatch.webp"

  },
  { 
    name: "Headphones", 
    category: "Headphones", 
    amazon_price: "₹3,989", 
    flipkart_price: "₹3,990", 
    amazon_link: "https://www.amazon.in/Sony-Bluetooth-Headphones-Multipoint-Connectivity/dp/B0BS1PRC4L/ref=asc_df_B0BS1PRC4L?mcid=c48aa6e13ae73441a8db1bd360c647af&tag=googleshopdes-21&linkCode=df0&hvadid=709962856241&hvpos=&hvnetw=g&hvrand=10824339495894797282&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1007785&hvtargid=pla-1965477142251&gad_source=1&th=1", 
    flipkart_link: "https://www.flipkart.com/sony-wh-ch520-50-hrs-playtime-dsee-upscale-multipoint-connection-dual-pairing-bluetooth/p/itm064cf3dcf3b5c?pid=ACCGZ4MAKQZWQDRJ&lid=LSTACCGZ4MAKQZWQDRJNUGFL1&marketplace=FLIPKART&q=sony%20headphones&sattr[]=color&st=color", 
    image: "https://i.ibb.co/sdzLpSNn/sonyheadphones.jpg"
  }
];


const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function displayProducts(products) {
  productsContainer.innerHTML = '';
  if(products.length === 0) { 
    productsContainer.innerHTML = '<p>No products found.</p>'; 
    return; 
  }
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('deal-card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Amazon: ${product.amazon_price} | Flipkart: ${product.flipkart_price}</p>
      <a href="${product.amazon_link}" target="_blank" class="buy-btn">Buy on Amazon</a>
      <a href="${product.flipkart_link}" target="_blank" class="buy-btn">Buy on Flipkart</a>
    `;
    productsContainer.appendChild(card);
  });
}

displayProducts(productsData);

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = productsData.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
});

searchInput.addEventListener('keyup', (e) => { 
  if(e.key === 'Enter') searchBtn.click(); 
});

// =====================
// 2. NEWSLETTER VALIDATION
// =====================
const newsletterBtn = document.querySelector(".newsletter button");
const newsletterInput = document.querySelector(".newsletter input");

newsletterBtn.addEventListener("click", () => {
  const email = newsletterInput.value.trim();
  if (email && email.includes("@") && email.includes(".")) {
    alert(`Thanks for subscribing, ${email}!`);
    newsletterInput.value = "";
  } else {
    alert("Please enter a valid email address.");
  }
});

// =====================
// 3. SEARCH BAR ALERT (optional)
// =====================
const searchBtnAlt = document.querySelector(".search-bar button");
const searchInputAlt = document.querySelector(".search-bar input");

searchBtnAlt.addEventListener("click", () => {
  const query = searchInputAlt.value.trim();
  if(query) alert(`Searching for: ${query}`);
  else alert("Please enter a product name to search.");
});

// =====================
// 4. SMOOTH SCROLL NAVIGATION
// =====================
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", function (e) {
    if(this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const sectionId = this.getAttribute("href");
      document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
    }
  });
});

// =====================
// 5. TESTIMONIAL AUTO SLIDE
// =====================
let testimonialIndex = 0;
const testimonials = document.querySelectorAll(".testimonial-card");

function showTestimonial() {
  testimonials.forEach((card, index) => {
    card.style.display = index === testimonialIndex ? "block" : "none";
  });
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
}

if(testimonials.length > 0) {
  showTestimonial();
  setInterval(showTestimonial, 4000);
}

console.log("BuySmart JS loaded successfully 🚀");

