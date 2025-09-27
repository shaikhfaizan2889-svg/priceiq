// API URLs with CORS proxy
const FLIPKART_API_URL = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://raw.githubusercontent.com/kashafshah665-dot/e-commerce-data/refs/heads/main/flipkart.json');
const AMAZON_API_URL = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://raw.githubusercontent.com/kashafshah665-dot/e-commerce-data/refs/heads/main/amazondata.json');

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const productsGrid = document.getElementById('productsGrid');
const noResultsElement = document.getElementById('noResults');
const retryBtn = document.getElementById('retryBtn');

// Global variables
let allProducts = [];
let filteredProducts = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });
    categoryFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', filterProducts);
    retryBtn.addEventListener('click', loadProducts);
});

// Load products from both APIs
async function loadProducts() {
    showLoading();
    hideError();
    
    try {
        console.log('Loading products from APIs...');
        
        const [flipkartData, amazonData] = await Promise.all([
            fetchData(FLIPKART_API_URL),
            fetchData(AMAZON_API_URL)
        ]);
        
        console.log('Raw Flipkart data structure:', flipkartData);
        console.log('Raw Amazon data structure:', amazonData);
        
        // Process the actual data structure
        allProducts = processActualData(flipkartData, amazonData);
        filteredProducts = [...allProducts];
        
        console.log('Processed products:', allProducts);
        
        displayProducts();
        hideLoading();
        
    } catch (error) {
        console.error('Error loading products:', error);
        showError(error.message);
        hideLoading();
    }
}

// Fetch data from API
async function fetchData(url) {
    try {
        console.log(`Fetching from: ${url}`);
        
        const response = await fetch(url);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('Raw response text:', text);
        
        // Try to parse as JSON
        try {
            const data = JSON.parse(text);
            return data;
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            throw new Error('Invalid JSON format in response');
        }
        
    } catch (error) {
        console.error(`Error fetching data:`, error);
        throw error;
    }
}

// Process the actual data structure from your JSON files
function processActualData(flipkartData, amazonData) {
    const productsMap = new Map();
    
    console.log('Processing actual data structure...');
    
    // Process Amazon data (based on the sample you showed)
    if (amazonData) {
        // Check if it's an array of products
        if (Array.isArray(amazonData)) {
            amazonData.forEach((item, index) => {
                console.log(`Amazon item ${index}:`, item);
                processAmazonItem(item, productsMap);
            });
        } 
        // Check if it's an object containing an array
        else if (amazonData.products && Array.isArray(amazonData.products)) {
            amazonData.products.forEach((item, index) => {
                console.log(`Amazon product ${index}:`, item);
                processAmazonItem(item, productsMap);
            });
        }
        // Check if it's a single product object
        else if (amazonData['product name']) {
            console.log('Single Amazon product:', amazonData);
            processAmazonItem(amazonData, productsMap);
        }
        else {
            console.warn('Unknown Amazon data structure:', amazonData);
        }
    }
    
    // Process Flipkart data
    if (flipkartData) {
        // Check if it's an array of products
        if (Array.isArray(flipkartData)) {
            flipkartData.forEach((item, index) => {
                console.log(`Flipkart item ${index}:`, item);
                processFlipkartItem(item, productsMap);
            });
        } 
        // Check if it's an object containing an array
        else if (flipkartData.products && Array.isArray(flipkartData.products)) {
            flipkartData.products.forEach((item, index) => {
                console.log(`Flipkart product ${index}:`, item);
                processFlipkartItem(item, productsMap);
            });
        }
        // Check if it's a single product object
        else if (flipkartData['product name'] || flipkartData.name) {
            console.log('Single Flipkart product:', flipkartData);
            processFlipkartItem(flipkartData, productsMap);
        }
        else {
            console.warn('Unknown Flipkart data structure:', flipkartData);
        }
    }
    
    const result = Array.from(productsMap.values());
    console.log('Final processed products:', result);
    return result;
}

// Process individual Amazon item
function processAmazonItem(item, productsMap) {
    if (!item) return;
    
    const productName = item['product name'] || item.name || 'Unknown Product';
    const key = productName.toLowerCase().trim();
    
    if (!key) return;
    
    if (productsMap.has(key)) {
        // Update existing product with Amazon data
        const existingProduct = productsMap.get(key);
        existingProduct.amazon = {
            price: parseFloat(item['discounted price '] || item.price || item['discounted price'] || 0),
            rating: parseFloat(item.rating || 0),
            url: item['product url '] || item.url || item['product url'] || '#',
            offers: item.offers || 'Check website for offers',
            actualPrice: parseFloat(item['actual price'] || item['actual price'] || 0)
        };
    } else {
        // Create new product with Amazon data
        productsMap.set(key, {
            id: generateId(),
            name: productName,
            category: item.category || 'electronics',
            image: item['image url'] || item.image || 'https://via.placeholder.com/300x200/ff9900/ffffff?text=Product+Image',
            flipkart: null,
            amazon: {
                price: parseFloat(item['discounted price '] || item.price || item['discounted price'] || 0),
                rating: parseFloat(item.rating || 0),
                url: item['product url '] || item.url || item['product url'] || '#',
                offers: item.offers || 'Check website for offers',
                actualPrice: parseFloat(item['actual price'] || item['actual price'] || 0)
            }
        });
    }
}

// Process individual Flipkart item
function processFlipkartItem(item, productsMap) {
    if (!item) return;
    
    const productName = item['product name'] || item.name || 'Unknown Product';
    const key = productName.toLowerCase().trim();
    
    if (!key) return;
    
    if (productsMap.has(key)) {
        // Update existing product with Flipkart data
        const existingProduct = productsMap.get(key);
        existingProduct.flipkart = {
            price: parseFloat(item['discounted price '] || item.price || item['discounted price'] || 0),
            rating: parseFloat(item.rating || 0),
            url: item['product url '] || item.url || item['product url'] || '#',
            offers: item.offers || 'Check website for offers',
            actualPrice: parseFloat(item['actual price'] || item['actual price'] || 0)
        };
    } else {
        // Create new product with Flipkart data
        productsMap.set(key, {
            id: generateId(),
            name: productName,
            category: item.category || 'electronics',
            image: item['image url'] || item.image || 'https://via.placeholder.com/300x200/2874f0/ffffff?text=Product+Image',
            flipkart: {
                price: parseFloat(item['discounted price '] || item.price || item['discounted price'] || 0),
                rating: parseFloat(item.rating || 0),
                url: item['product url '] || item.url || item['product url'] || '#',
                offers: item.offers || 'Check website for offers',
                actualPrice: parseFloat(item['actual price'] || item['actual price'] || 0)
            },
            amazon: null
        });
    }
}

// Generate unique ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Display products in the grid
function displayProducts() {
    if (filteredProducts.length === 0) {
        showNoResults();
        return;
    }
    
    hideNoResults();
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/300x200/3b82f6/ffffff?text=Product+Image'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-category">${product.category}</div>
                
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Platform</th>
                            <th>Discounted Price</th>
                            <th>Actual Price</th>
                            <th>You Save</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderPlatformRow('Flipkart', product.flipkart, product)}
                        ${renderPlatformRow('Amazon', product.amazon, product)}
                    </tbody>
                </table>
                
                ${renderRecommendations(product)}
            </div>
        </div>
    `).join('');
}

// Render platform comparison row
function renderPlatformRow(platform, data, product) {
    if (!data || data.price === 0) {
        return `<tr>
            <td>${platform}</td>
            <td colspan="4" style="color: #94a3b8; text-align: center;">Not available</td>
        </tr>`;
    }
    
    const isBestDeal = isBestPrice(platform, product);
    const rowClass = isBestDeal ? 'best-deal' : '';
    const youSave = data.actualPrice ? data.actualPrice - data.price : 0;
    
    return `<tr class="${rowClass}">
        <td>
            ${platform} 
            ${isBestDeal ? '<span class="best-deal-badge">Best Deal</span>' : ''}
        </td>
        <td class="price">₹${data.price.toLocaleString('en-IN')}</td>
        <td class="actual-price">${data.actualPrice ? '₹' + data.actualPrice.toLocaleString('en-IN') : 'N/A'}</td>
        <td class="savings">${youSave > 0 ? '₹' + youSave.toLocaleString('en-IN') : 'N/A'}</td>
        <td>
            <a href="${data.url}" target="_blank" class="buy-button ${platform.toLowerCase()}">
                Buy on ${platform}
            </a>
        </td>
    </tr>`;
}

// Check if this platform has the best price
function isBestPrice(platform, product) {
    const flipkartPrice = product.flipkart?.price || Infinity;
    const amazonPrice = product.amazon?.price || Infinity;
    
    // If one platform doesn't have data, the other is automatically best
    if (!product.flipkart && product.amazon) return platform === 'Amazon';
    if (!product.amazon && product.flipkart) return platform === 'Flipkart';
    if (!product.flipkart && !product.amazon) return false;
    
    if (platform === 'Flipkart') {
        return flipkartPrice <= amazonPrice;
    } else if (platform === 'Amazon') {
        return amazonPrice <= flipkartPrice;
    }
    return false;
}

// Render recommendations section
function renderRecommendations(product) {
    const recommendations = generateRecommendations(product);
    if (!recommendations) return '';
    
    return `
        <div class="recommendations">
            <h4>💡 Smart Buying Tips</h4>
            <p>${recommendations}</p>
        </div>
    `;
}

// Generate buying recommendations
function generateRecommendations(product) {
    const tips = [];
    
    // Price difference tip
    if (product.flipkart && product.amazon) {
        const priceDiff = Math.abs(product.flipkart.price - product.amazon.price);
        if (priceDiff > 1000) {
            tips.push(`Price difference of ₹${priceDiff.toLocaleString('en-IN')}`);
        }
        
        // Best platform recommendation
        if (product.flipkart.price < product.amazon.price) {
            tips.push("Flipkart has better price");
        } else if (product.amazon.price < product.flipkart.price) {
            tips.push("Amazon has better price");
        } else {
            tips.push("Same price on both platforms");
        }
    }
    
    // Savings tip
    if (product.flipkart && product.flipkart.actualPrice) {
        const flipkartSave = product.flipkart.actualPrice - product.flipkart.price;
        if (flipkartSave > 5000) {
            tips.push(`Save ₹${flipkartSave.toLocaleString('en-IN')} on Flipkart`);
        }
    }
    
    if (product.amazon && product.amazon.actualPrice) {
        const amazonSave = product.amazon.actualPrice - product.amazon.price;
        if (amazonSave > 5000) {
            tips.push(`Save ₹${amazonSave.toLocaleString('en-IN')} on Amazon`);
        }
    }
    
    return tips.length > 0 ? tips.join(' • ') : 'Compare both platforms for best deal';
}

// Search functionality
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filterProducts();
}

// Filter and sort products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const sortBy = sortFilter.value;
    
    filteredProducts = allProducts.filter(product => {
        const matchesSearch = !searchTerm || 
            product.name.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !category || product.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    // Sort products
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
            break;
        default:
            // Best match - keep original order
            break;
    }
    
    displayProducts();
}

// Helper function to get lowest price
function getLowestPrice(product) {
    const prices = [];
    if (product.flipkart?.price > 0) prices.push(product.flipkart.price);
    if (product.amazon?.price > 0) prices.push(product.amazon.price);
    return prices.length > 0 ? Math.min(...prices) : Infinity;
}

// UI State Management
function showLoading() {
    loadingElement.classList.remove('hidden');
    productsGrid.classList.add('hidden');
    errorElement.classList.add('hidden');
    noResultsElement.classList.add('hidden');
}

function hideLoading() {
    loadingElement.classList.add('hidden');
    productsGrid.classList.remove('hidden');
}

function showError(message = 'Failed to load products. Please try again.') {
    errorElement.innerHTML = `
        <p>${message}</p>
        <button id="retryBtn">Retry Loading</button>
    `;
    errorElement.classList.remove('hidden');
    productsGrid.classList.add('hidden');
    
    // Re-attach retry button event listener
    document.getElementById('retryBtn').addEventListener('click', loadProducts);
}

function hideError() {
    errorElement.classList.add('hidden');
}

function showNoResults() {
    noResultsElement.classList.remove('hidden');
    productsGrid.classList.add('hidden');
}

function hideNoResults() {
    noResultsElement.classList.add('hidden');
    productsGrid.classList.remove('hidden');
}