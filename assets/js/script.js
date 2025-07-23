// Trading Book Website - JavaScript Functions
// Payment integration with Razorpay link

// Payment configuration
const PAYMENT_LINK = 'https://rzp.io/rzp/KIujBRJ';
const BOOK_PRICE = 48;

// Process payment function
function processPayment() {
    // Add loading state to button
    const paymentBtn = document.querySelector('.payment-btn');
    const originalText = paymentBtn.innerHTML;
    
    paymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 10px;"></i>Redirecting to Payment...';
    paymentBtn.disabled = true;
    
    // Redirect to Razorpay payment link
    setTimeout(() => {
        window.open(PAYMENT_LINK, '_blank');
        
        // Reset button after a moment
        setTimeout(() => {
            paymentBtn.innerHTML = originalText;
            paymentBtn.disabled = false;
        }, 2000);
    }, 500);
}

// Simulate payment success for testing
function simulatePaymentSuccess() {
    // Store payment status
    localStorage.setItem('tradingBookPaid', 'true');
    localStorage.setItem('paymentDate', new Date().toISOString());
    
    // Show success modal
    document.getElementById('successModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Download book function
function downloadBook() {
    // Check if payment was made
    const hasPaid = localStorage.getItem('tradingBookPaid') === 'true';
    
    if (hasPaid) {
        // Create download link
        const link = document.createElement('a');
        link.href = 'assets/PDF/Candlestick-Chart-Patterns-Guide.pdf';
        link.download = 'Candlestick-Chart-Patterns-Guide.pdf';
        link.click();
        
        // Close modal
        document.getElementById('successModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Show thank you message
        alert('Thank you for your purchase! Your download should start automatically.');
    } else {
        alert('Please complete payment first to download the book.');
        processPayment();
    }
}

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Check if images exist, if not show placeholder
    checkImages();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Add loading states
    addLoadingStates();
    
    // Mobile-specific optimizations
    initMobileOptimizations();
});

// Mobile optimizations
function initMobileOptimizations() {
    // Prevent zoom on input focus for mobile
    if (window.innerWidth <= 768) {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }
    
    // Add touch event listeners for better mobile interaction
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        thumb.addEventListener('touchend', function() {
            this.style.transform = 'scale(1.05)';
        });
    });
    
    // Improve modal behavior on mobile
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('touchmove', function(e) {
            e.preventDefault();
        });
    });
}

// Check if images exist and handle loading
function checkImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log(`Image not found: ${this.src}`);
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
}

// Smooth scrolling for navigation
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading states to buttons
function addLoadingStates() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.opacity = '1';
            }, 300);
        });
    });
}

// Book image gallery functions
function changeMainImage(thumbnail) {
    const mainImg = document.getElementById('main-book-img');
    if (mainImg && thumbnail) {
        // Remove active class from all thumbnails
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        
        // Add active class to clicked thumbnail
        thumbnail.classList.add('active');
        
        // Change main image with fade effect
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = thumbnail.src;
            mainImg.style.opacity = '1';
        }, 200);
    }
}

// Scroll to book section
function scrollToBook() {
    const bookSection = document.getElementById('book-section');
    if (bookSection) {
        bookSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to preview section
function scrollToPreview() {
    const previewSection = document.getElementById('preview-section');
    if (previewSection) {
        previewSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Policy modal functions
function showTerms() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function showPrivacy() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function showRefund() {
    const modal = document.getElementById('refundModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Enhanced mobile experience
if ('ontouchstart' in window) {
    // Add touch feedback for all interactive elements
    const interactiveElements = document.querySelectorAll('button, .thumbnail, .benefit-card, .testimonial');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Image lazy loading for better performance
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    initLazyLoading();
}

// Console message for developers
console.log('Trading Mastery Website Loaded Successfully');
console.log('Payment functions have been removed and will be added later');
