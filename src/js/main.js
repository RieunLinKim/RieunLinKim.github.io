document.addEventListener('DOMContentLoaded', () => {
    // Navbar Resizing and Position Indicator
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const sections = document.querySelectorAll('section');
    const navbarItems = document.querySelectorAll('.navbar-item');

    // Function to handle navbar resizing
    const handleNavbarResize = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Function to handle active navbar item
    const handleActiveNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight;
            if (window.scrollY >= sectionTop - 10) {
                current = section.getAttribute('id');
            }
        });

        navbarItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });

        // If scrolled to bottom, activate last menu item
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            navbarItems.forEach(item => item.classList.remove('active'));
            navbarItems[navbarItems.length - 1].classList.add('active');
        }
    };

    // Initial check
    handleNavbarResize();
    handleActiveNav();

    // Event listeners
    window.addEventListener('scroll', () => {
        handleNavbarResize();
        handleActiveNav();
    });

    // Smooth Scrolling
    navbarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight + 1,
                behavior: 'smooth'
            });
        });
    });

    // Modal Functionality
    const modal = document.getElementById('modal');
    const openModalBtn = document.querySelector('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    // Function to open the modal
    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        // Set focus to the modal for accessibility
        const firstFocusableElement = modal.querySelector('.modal-content');
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }
    };

    // Close the modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    // Event listeners for modal
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with the Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Carousel Functionality
    const gallery = document.querySelector('.gallery');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevButton = document.querySelector('.new-prev-button');
    const nextButton = document.querySelector('.new-next-button');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let autoSlideInterval;

    // Show a specific slide
    const showSlide = (index) => {
        // Ensure index is within bounds
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    };

    // Show the first slide initially
    showSlide(currentSlide);

    // Event listener for previous button
    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        resetAutoSlide();
    });

    // Event listener for next button
    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        resetAutoSlide();
    });

    // Event listeners for indicator dots
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-slide'));
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Start auto-sliding
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); // Change slide every 5 seconds
    };

    // Stop auto-sliding
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Reset auto-slide interval
    const resetAutoSlide = () => {
        stopAutoSlide();
        startAutoSlide();
    };

    // Start auto-sliding when the page loads
    startAutoSlide();

    // Pause auto-slide on hover
    gallery.addEventListener('mouseenter', () => {
        stopAutoSlide();
    });

    // Resume auto-slide when not hovering
    gallery.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Swipe Gestures for Touch Devices
    let touchStartX = 0;
    let touchEndX = 0;

    const handleGesture = () => {
        if (touchEndX < touchStartX - 50) {
            // Swipe Left
            showSlide(currentSlide + 1);
            resetAutoSlide();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe Right
            showSlide(currentSlide - 1);
            resetAutoSlide();
        }
    };

    // Add touch event listeners
    gallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    gallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    }, false);

    // Keyboard Navigation within Carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'a' || e.key === 'A') {
            showSlide(currentSlide - 1);
            resetAutoSlide();
        }
        if (e.key === 'd' || e.key === 'D') { 
            showSlide(currentSlide + 1);
            resetAutoSlide();
        }
    });
});

// main.js

document.addEventListener('DOMContentLoaded', () => {
    // ... existing JavaScript ...

    // Project Modal Functionality
    const projectModals = document.querySelectorAll('.project-modal');
    const openProjectModalButtons = document.querySelectorAll('.open-project-modal');
    const closeProjectModalButtons = document.querySelectorAll('.close-project-modal');

    openProjectModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            const modal = document.getElementById(`${projectId}-modal`);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    closeProjectModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.project-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    });

    // Close modals when clicking outside the modal content
    projectModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modals with the Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            projectModals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Modal Functionality
    const modal = document.getElementById('modal');
    const openModalBtn = document.querySelector('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    // Open the modal
    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Close the modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    // Event listeners for modal
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with the Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});