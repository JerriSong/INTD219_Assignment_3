document.addEventListener('DOMContentLoaded', function() {
    // Fix for nav items visibility
    const navSubItems = document.querySelectorAll('.nav-item-sub');
    navSubItems.forEach(item => {
        item.style.opacity = '1';
    });
    
    // Custom cursor with enhanced smoothness and physics
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCircle = document.getElementById('cursor-circle');
    const mobileBackToTop = document.getElementById('mobileBackToTop');
    const mobileHeader = document.querySelector('.mobile-header');
    const mobileLogo = document.querySelector('.mobile-logo');
    
    // Initial position variables
    let cursorX = 0;
    let cursorY = 0;
    let circleX = 0;
    let circleY = 0;
    
    // More subtle physics parameters for natural movement
    const dotEasing = 0.35; // Faster for small dot (more responsive)
    const circleEasing = 0.12; // Slower for outer circle (more lag)
    
    // Track if mouse is on page
    let isMouseOnPage = false;
    
    // Variable to store saved scroll position
    let savedScrollPosition = 0;
    
    // Animation function with improved smoothing
    function animateCursor() {
        if (!isMouseOnPage) {
            requestAnimationFrame(animateCursor);
            return;
        }
        
        // Dot follows cursor directly for responsiveness
        cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        
        // Circle follows with significant delay for smoother effect
        const dotDx = cursorX - circleX;
        const dotDy = cursorY - circleY;
        
        // Apply easing to make movement more natural
        circleX += dotDx * circleEasing;
        circleY += dotDy * circleEasing;
        
        // Apply transforms instead of left/top for better performance
        cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start the animation
    animateCursor();
    
    // Update cursor position on mouse move with more precise tracking
    document.addEventListener('mousemove', function(e) {
        isMouseOnPage = true;
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            isMouseOnPage = false;
            cursorDot.style.opacity = '0';
            cursorCircle.style.opacity = '0';
        }
    });
    
    // Show cursor when mouse enters window
    document.addEventListener('mouseover', function() {
        isMouseOnPage = true;
        cursorDot.style.opacity = '1';
        cursorCircle.style.opacity = '1';
    });
    
    // Enhanced hover interactions for different elements with proper scaling transitions
    
    // Close menu cursor (big white circle) - hide dot on hover
    const closeMenuElements = document.querySelectorAll('[data-cursor-type="close-menu"]');
    closeMenuElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Add class for styling
            cursorCircle.classList.add('cursor-close-menu');
            
            // Hide dot completely on hover
            cursorDot.style.opacity = '0';
        });
        
        element.addEventListener('mouseleave', function() {
            cursorCircle.classList.remove('cursor-close-menu');
            
            // Show dot again
            cursorDot.style.opacity = '1';
        });
    });
    
    // Explore cursor (black circle with text) - hide dot on hover
    const exploreElements = document.querySelectorAll('[data-cursor-type="explore"]');
    exploreElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Add class for styling
            cursorCircle.classList.add('cursor-explore');
            cursorCircle.textContent = 'Explore';
            
            // Hide dot completely on hover
            cursorDot.style.opacity = '0';
        });
        
        element.addEventListener('mouseleave', function() {
            cursorCircle.classList.remove('cursor-explore');
            cursorCircle.textContent = '';
            
            // Show dot again
            cursorDot.style.opacity = '1';
        });
    });
    
    // Drag cursor (black circle with text) - hide dot on hover
    const dragElements = document.querySelectorAll('[data-cursor-type="drag"]');
    dragElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorCircle.classList.add('cursor-drag');
            cursorCircle.textContent = 'Drag';
            
            // Hide dot completely on hover
            cursorDot.style.opacity = '0';
        });
        
        element.addEventListener('mouseleave', function() {
            cursorCircle.classList.remove('cursor-drag');
            cursorCircle.textContent = '';
            
            // Show dot again
            cursorDot.style.opacity = '1';
        });
    });
    
    // Explore-White cursor (white circle with black text for other works) - hide dot on hover
    const exploreWhiteElements = document.querySelectorAll('[data-cursor-type="explore-white"]');
    exploreWhiteElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorCircle.classList.add('cursor-explore-white');
            cursorCircle.textContent = 'Explore';
            
            // Hide dot completely on hover
            cursorDot.style.opacity = '0';
        });
        
        element.addEventListener('mouseleave', function() {
            cursorCircle.classList.remove('cursor-explore-white');
            cursorCircle.textContent = '';
            
            // Show dot again
            cursorDot.style.opacity = '1';
        });
    });
    
    // Menu cursor effect
    const menuElements = document.querySelectorAll('[data-cursor-type="menu"]');
    menuElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorCircle.classList.add('cursor-menu');
            
            // Hide dot completely on hover
            cursorDot.style.opacity = '0';
        });
        
        element.addEventListener('mouseleave', function() {
            cursorCircle.classList.remove('cursor-menu');
            
            // Show dot again
            cursorDot.style.opacity = '1';
        });
    });
    
    // Links and interactive elements cursor effect with improved animations
    const interactiveElements = document.querySelectorAll('a, button, .nav-item, .nav-subitem');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Smooth transition using transform instead of width/height
            cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(1.5)`;
            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%) scale(1.2)`;
        });
        
        element.addEventListener('mouseleave', function() {
            cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(1)`;
            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%) scale(1)`;
        });
    });
    
    // Initialize videos for the first two latest works items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        const video = item.querySelector('.work-video');
        if (video) {
            // Set the actual source and load the video
            const videoSrc = video.getAttribute('data-src');
            if (videoSrc) {
                video.src = videoSrc;
                
                // Play video on hover
                item.addEventListener('mouseenter', function() {
                    video.play();
                });
                
                // Pause video when not hovering
                item.addEventListener('mouseleave', function() {
                    video.pause();
                    // Optional: reset video to beginning
                    video.currentTime = 0;
                });
            }
        }
    });
    
    function adjustImages() {
        const otherWorks = document.querySelectorAll('.other-work');
        otherWorks.forEach(work => {
            const img = work.querySelector('img');
            if (img) {
                img.style.width = '100%';
                img.style.height = 'auto';
                img.style.display = 'block';
            }
        });
        
        // Additional mobile adjustments for small screens
        if (window.innerWidth <= 768) {
            const workItems = document.querySelectorAll('.work-item, .scrollable-work');
            workItems.forEach(item => {
                const container = item.querySelector('.work-image-container, div[style*="position: relative"]');
                const infoContainer = item.querySelector('.work-info-container, .scrollable-work-info');
                
                if (container && infoContainer) {
                    // Ensure proper image sizing and text layout
                    container.style.minWidth = '100%';
                    container.style.width = '100%';
                    infoContainer.style.width = '100%';
                    infoContainer.style.maxWidth = '100%';
                }
            });
        }
    }

    window.addEventListener('load', adjustImages);
    window.addEventListener('resize', adjustImages);
    
    // Enhanced vertical parallax effect for all images with subtle movement
    const parallaxItems = document.querySelectorAll('.work-item, .scrollable-work, .other-work');

    window.addEventListener('mousemove', function(e) {
        // Only apply parallax effect on desktop
        if (window.innerWidth > 768) {
            parallaxItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                
                // Check if item is visible in viewport
                if (
                    rect.top < window.innerHeight &&
                    rect.bottom > 0 &&
                    rect.left < window.innerWidth &&
                    rect.right > 0
                ) {
                    // remove vertical parallax
                    item.style.transform = 'none';
                    
                    // remove horizontal parallax
                    const image = item.querySelector('img');
                    if (image) {
                        image.style.transform = 'none';
                    }
                }
            });
        }
    });

    //remove vertical parallax
    window.addEventListener('scroll', function() {
        // Toggle mobile back to top button
        toggleMobileBackToTop();
        
        // Only apply parallax effect on desktop
        if (window.innerWidth > 768) {
            parallaxItems.forEach(item => {
                
                item.style.transform = 'none';
            });
        }
        
      
        checkFooterVisibility();
    });
    
    // Function to toggle mobile back to top button
    function toggleMobileBackToTop() {
        // Only apply to mobile screens
        if (window.innerWidth <= 768) {
            // Show button after scrolling down a bit
            if (window.scrollY > 300) {
                mobileBackToTop.classList.add('visible');
            } else {
                mobileBackToTop.classList.remove('visible');
            }
        }
    }
    
    // Add scroll-based parallax for vertical movement and control mobile back to top
    window.addEventListener('scroll', function() {
        // Toggle mobile back to top button
        toggleMobileBackToTop();
        
        // Only apply parallax effect on desktop
        if (window.innerWidth > 768) {
            parallaxItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                
                // Check if item is visible in viewport or near it
                if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
                    // Calculate how far the item is from the center of the viewport
                    const viewportCenter = window.innerHeight / 2;
                    const itemCenter = rect.top + rect.height / 2;
                    const distanceFromCenter = (itemCenter - viewportCenter) / viewportCenter;
                    
                    // Calculate movement amount - move against scroll direction
                    const moveY = -distanceFromCenter * 20; // Multiplier controls intensity
                    
                    // Apply vertical parallax with subtle, smooth movement
                    item.style.transform = `translate3d(0, ${moveY}px, 0)`;
                }
            });
        }
        
      
        checkFooterVisibility();
    });
    
    // Smooth scroll for both back to top buttons
    document.querySelector('.back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    if (mobileBackToTop) {
        mobileBackToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // checkFooterVisibility
    function checkFooterVisibility() {
        const footer = document.getElementById('footer');
        const footerRect = footer.getBoundingClientRect();
        
        if (footerRect.top < window.innerHeight) {
            document.body.classList.add('is-footer-visible');
        } else {
            document.body.classList.remove('is-footer-visible');
        }
    }
    
    // Reset parallax effect when mouse leaves the window or on page load
    window.addEventListener('mouseleave', resetParallax);
    window.addEventListener('load', resetParallax);
    
    function resetParallax() {
        parallaxItems.forEach(item => {
            // Smoothly reset position
            item.style.transform = 'translate3d(0, 0, 0)';
            
            // Reset any image scaling
            const image = item.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    }

    
    const draggableArea = document.getElementById('draggableWorks');
    let isDragging = false;
    let startX;
    let scrollLeft;

    // only add drag functionality on non-mobile devices
    if (window.innerWidth > 768) {
       
        draggableArea.addEventListener('mousedown', (e) => {
            isDragging = true;
            draggableArea.style.cursor = 'grabbing';
            startX = e.pageX - draggableArea.offsetLeft;
            scrollLeft = draggableArea.scrollLeft;
        
            e.preventDefault();
        });

        // calculate scroll position
        draggableArea.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const x = e.pageX - draggableArea.offsetLeft;
            const walk = (x - startX) * 1.5; // 滚动速度系数
            draggableArea.scrollLeft = scrollLeft - walk;
        });

        draggableArea.addEventListener('mouseup', () => {
            isDragging = false;
            draggableArea.style.cursor = 'grab';
        });

        draggableArea.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                draggableArea.style.cursor = 'grab';
            }
        });
    }
    
    // Menu toggle functionality 
    const menuToggle = document.getElementById('menuToggle');
    const menuToggleFooter = document.getElementById('menuToggleFooter');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    // Function to open the menu
    function openMenu() {
        // Remove any inline right style that might have been set during closing
        mobileMenu.style.removeProperty('right');
        
        // Toggle button state
        if (menuToggle) menuToggle.classList.add('active');
        if (menuToggleFooter) menuToggleFooter.classList.add('active');
        
        // Save current scroll position
        savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Prevent background scrolling
        document.body.classList.add('menu-open');
        
        // Remove closing animation class (if any)
        mobileMenu.classList.remove('closing');
        
        // Show menu
        mobileMenu.classList.add('active');
    }

    // Function to close the menu
    function closeMenuFunc() {
        // Add closing animation class
        mobileMenu.classList.add('closing');
        
        // After a short delay (to allow animation to start), set inline style for right
        setTimeout(() => {
            mobileMenu.style.right = '-100%';
            
            // Clear active states
            if (menuToggle) menuToggle.classList.remove('active');
            if (menuToggleFooter) menuToggleFooter.classList.remove('active');
            
            // Remove active class from menu
            mobileMenu.classList.remove('active');
            
            // Allow background to scroll again
            document.body.classList.remove('menu-open');
            
            // Restore scroll position
            window.scrollTo(0, savedScrollPosition);
        }, 10);
    }

    // Add click listener for menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                closeMenuFunc();
            } else {
                openMenu();
            }
        });
    }

    // Add click listener for footer menu toggle
    if (menuToggleFooter) {
        menuToggleFooter.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                closeMenuFunc();
            } else {
                openMenu();
            }
        });
    }

    // Add click listener for close menu button
    if (closeMenu) {
        closeMenu.addEventListener('click', function(event) {
            // Prevent event bubbling and default behavior
            event.preventDefault();
            event.stopPropagation();
            
            closeMenuFunc();
        });
    }

    // Add listener for clicking menu area to close (exclude links)
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(event) {
            // Don't process clicks on menu links or on the close button itself
            if (event.target.tagName === 'A' || 
                event.target === closeMenu || 
                closeMenu.contains(event.target)) {
                return;
            }
            
            // Don't process clicks on menu title or sections
            if (event.target.classList.contains('menu-title') || 
                event.target.classList.contains('main-links') || 
                event.target.classList.contains('bottom-section') ||
                event.target.classList.contains('contact-links')) {
                return;
            }
            
            closeMenuFunc();
        });
    }
    
    // Navigation items
    const navItems = {
        'worksNav': document.getElementById('worksNav'),
        'latestWorksNav': document.getElementById('latestWorksNav'),
        'otherWorksNav': document.getElementById('otherWorksNav'),
        'studio-info-nav': document.getElementById('studio-info-nav'),
        'me-nav': document.getElementById('me-nav')
    };
    
    // Sections for navigation
    const sections = {
        'works': document.getElementById('works'),
        'latest-works': document.getElementById('latest-works'),
        'other-works': document.getElementById('other-works'),
        'about': document.getElementById('about'),
        'me': document.getElementById('me')
    };
    
    // Function to update active navigation based on scroll position
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100; // Offset for better UX
        
        // Check which section is currently in view
        if (sections['latest-works'] && isElementInView(sections['latest-works'], scrollPosition)) {
            setActiveNav('latestWorksNav');
            // Also highlight the parent Works nav
            if (navItems['worksNav']) navItems['worksNav'].style.color = '#000';
        } else if (sections['other-works'] && isElementInView(sections['other-works'], scrollPosition)) {
            setActiveNav('otherWorksNav');
            // Also highlight the parent Works nav
            if (navItems['worksNav']) navItems['worksNav'].style.color = '#000';
        } else if (sections['works'] && isElementInView(sections['works'], scrollPosition)) {
            setActiveNav('worksNav');
        }
    }
    
    // Helper function to check if element is in viewport
    function isElementInView(element, scrollPosition) {
        if (!element) return false;
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;
        return scrollPosition >= elementTop && scrollPosition < elementBottom;
    }
    
    // Function to set active navigation
    function setActiveNav(activeNavId) {
        // Reset all nav items
        for (let navId in navItems) {
            if (navItems[navId] && navItems[navId].classList.contains('nav-item-sub')) {
                navItems[navId].classList.remove('active');
                navItems[navId].style.color = '';
            } else if (navItems[navId]) {
                navItems[navId].style.color = '';
            }
        }
        
        // Set active nav
        if (navItems[activeNavId]) {
            if (navItems[activeNavId].classList.contains('nav-item-sub')) {
                navItems[activeNavId].classList.add('active');
                navItems[activeNavId].style.color = '#000';
            } else {
                navItems[activeNavId].style.color = '#000';
            }
        }
    }
    
    // Add click event listeners to nav items
    for (let navId in navItems) {
        if (navItems[navId]) {
            navItems[navId].addEventListener('click', function(e) {
                let targetId;
                
                // Determine target section based on nav item
                switch(navId) {
                    case 'worksNav':
                        targetId = 'works';
                        break;
                    case 'latestWorksNav':
                        targetId = 'latest-works';
                        break;
                    case 'otherWorksNav':
                        targetId = 'other-works';
                        break;
                    case 'studio-info-nav':
                        targetId = 'about';
                        break;
                    case 'me-nav':
                        targetId = 'me';
                        break;
                }
                
                // Scroll to target section
                if (targetId && sections[targetId]) {
                    sections[targetId].scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    // Initialize mobile back to top visibility on page load
    toggleMobileBackToTop();
    
    // checkFooterVisibility();
    checkFooterVisibility();
   
    // Initial call to set active navigation based on current position
    updateActiveNavigation();
    
    // Add scroll event listener to update navigation
    window.addEventListener('scroll', updateActiveNavigation);
    
    // reset page transition
    const transition = document.querySelector('.page-transition');

    transition.style.transform = 'translateY(-100%)';
    transition.style.opacity = '1';
    

    setTimeout(() => {
        transition.style.transform = 'translateY(0)'; 
        transition.style.opacity = '0'; 
    }, 100); 

    
    const transitionElement = document.querySelector('.page-transition');
    const aboutLink = document.querySelector('.about-link');
    const pageTransition = document.querySelector('.page-transition');

    function handleTransition(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const overlay = document.querySelector('.page-overlay');
        
  
        overlay.classList.add('active');
        
        // delayed transition
        setTimeout(() => {
            pageTransition.style.transform = 'translateY(-100%)';
            pageTransition.style.opacity = '1';
            
            // delayed transition
            setTimeout(() => {
                window.location.href = href;
            }, 1000);
        }, 200);
    }

    // loading reset
    window.addEventListener('load', () => {
        const overlay = document.querySelector('.page-overlay');
        if (pageTransition && overlay) {
            pageTransition.style.transform = 'translateY(0)';
            pageTransition.style.opacity = '0';
            overlay.classList.remove('active');
        }
    });

    if (aboutLink && pageTransition) {
        aboutLink.addEventListener('click', handleTransition);
    }

    if (studioLink && pageTransition) {
        studioLink.addEventListener('click', handleTransition);
    }
});