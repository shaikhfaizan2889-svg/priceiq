// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

// Form submission
document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && isNaN(email)) {
        alert('Please enter a valid email address or phone number');
        return;
    }
    
    // Simulate successful sign in
    alert('Sign in successful! Redirecting to your dashboard...');
    
    // In a real application, you would redirect to the dashboard
    // window.location.href = 'dashboard.html';
    
    // For demo purposes, we'll just reset the form
    this.reset();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effects to form inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add loading state to sign in button
    const signinBtn = document.querySelector('.signin-btn');
    signinBtn.addEventListener('click', function() {
        if (document.getElementById('email').value && document.getElementById('password').value) {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            this.disabled = true;
            
            // Reset after 2 seconds (simulating API call)
            setTimeout(() => {
                this.innerHTML = 'Sign In';
                this.disabled = false;
            }, 2000);
        }
    });
});


