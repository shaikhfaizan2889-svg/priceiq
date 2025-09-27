// Simple interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Back to top functionality
    document.querySelector('.back-to-top').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Category card hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});
// Add to your existing script.js
function animateCounter() {
    const counter = document.querySelector('.counter');
    const target = parseInt(counter.getAttribute('data-count'));
    let current = 0;
    const increment = target / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 20);
}

document.addEventListener('DOMContentLoaded', function() {
    animateCounter();
});
// Add to your script.js
function updateCountdown() {
    // Set your actual sale dates here
    const amazonDate = new Date('2025-10-10T00:00:00').getTime();
    const flipkartDate = new Date('2025-10-12T00:00:00').getTime();
    const diwaliDate = new Date('2025-10-25T00:00:00').getTime();
    
    const now = new Date().getTime();
    
    // Update Amazon timer
    const amazonDiff = amazonDate - now;
    document.getElementById('amazon-days').textContent = Math.floor(amazonDiff / (1000 * 60 * 60 * 24));
    document.getElementById('amazon-hours').textContent = Math.floor((amazonDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('amazon-minutes').textContent = Math.floor((amazonDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    // Update other timers similarly...
}

// Update every minute
setInterval(updateCountdown, 60000);
updateCountdown(); // Initial call