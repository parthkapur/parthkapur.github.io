// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Enhanced cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const speed = 0.1;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .bento-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.style.boxShadow = 'none';
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            } else {
                navbar.style.boxShadow = '0 2px 30px rgba(0, 255, 136, 0.15)';
                navbar.style.background = 'rgba(0, 0, 0, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
        });
    }

    // Enhanced Intersection Observer for staggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation to child elements
                const children = entry.target.querySelectorAll('.bento-item, .skill-item, .exp-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to sections and bento items
    setTimeout(() => {
        document.querySelectorAll('section').forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });

        // Stagger bento items animation
        document.querySelectorAll('.bento-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        });
    }, 200);

    // Parallax effect for hero background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .profile-glow');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Enhanced typing effect for hero text
    const heroName = document.querySelector('.hero-name');
    if (heroName && !heroName.classList.contains('typed')) {
        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.classList.add('typed');
        heroName.style.minHeight = '1.2em';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                // Add cursor blink effect
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                cursor.style.color = 'var(--primary-green)';
                heroName.appendChild(cursor);
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    cursor.remove();
                }, 3000);
            }
        };
        
        // Start typing after hero elements are loaded
        setTimeout(typeWriter, 1000);
    }

    // Skill items interactive hover
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0, 255, 136, 0.2)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Profile photo interaction
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08) rotate(2deg)';
            document.querySelector('.profile-glow').style.opacity = '0.5';
        });
        
        profilePhoto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            document.querySelector('.profile-glow').style.opacity = '0.2';
        });
    }

    // Add floating animation to stats
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'float 3s ease-in-out infinite';
    });

    // Active navigation highlighting based on current page
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Handle both relative and absolute paths
        if (href) {
            const linkPath = href.replace('./', '').split('#')[0];
            if (linkPath === currentLocation || 
                (currentLocation === '' && linkPath === 'index.html') ||
                (currentLocation === 'index.html' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        }
    });

    // Add smooth reveal for contact section
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const links = entry.target.querySelectorAll('.contact-link');
                    links.forEach((link, index) => {
                        setTimeout(() => {
                            link.style.opacity = '1';
                            link.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        contactObserver.observe(contactSection);
        
        // Initially hide contact links
        document.querySelectorAll('.contact-link').forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            link.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
});

// Add CSS for additional animations
const additionalStyles = `
<style>
.custom-cursor {
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary-green);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.1s ease;
    opacity: 0.7;
}

.cursor-hover {
    transform: scale(1.5);
    background: rgba(0, 255, 136, 0.2);
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.hero-greeting {
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

.hero-title-container {
    animation: fadeInUp 0.8s ease-out 0.6s both;
}

.cta-buttons {
    animation: fadeInUp 0.8s ease-out 0.8s both;
}

@media (pointer: coarse) {
    .custom-cursor {
        display: none;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);
