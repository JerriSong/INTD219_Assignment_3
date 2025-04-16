
document.addEventListener("DOMContentLoaded", function() {
 
    const isMobile = window.innerWidth <= 430;

    if (isMobile) {
      
        document.querySelector('.mobile-header').style.display = 'block';
        document.querySelector('.menu-toggle').style.display = 'flex';
        document.querySelector('.mobile-menu').style.display = 'block';
        document.querySelector('.first-page-mobile').style.display = 'flex';
        document.querySelector('.second-page-mobile').style.display = 'flex';
        document.querySelector('.third-page-mobile').style.display = 'flex';
        
        // desktop elements hidden
        document.querySelector('.nav').style.display = 'none';
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.glass-effect').style.display = 'none';
        document.querySelector('.mouse-follower-container').style.display = 'none';
        if (document.getElementById('cursor')) {
            document.getElementById('cursor').style.display = 'none';
        }
    }

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

    // =================== 桌面版代码（>768px） ===================
    if (!isMobile) {
        // Custom cursor for ME section
        const transitionElement = document.querySelector('.page-transition');
        const worksLink = document.querySelector('.nav-item-main[data-transition] a');

        if (worksLink) {
            worksLink.addEventListener('click', function(e) {
                e.preventDefault();
                const targetUrl = this.getAttribute('href');
                
                // 强制显示并触发动画
                transitionElement.style.opacity = '1'; // 先变为不透明
                transitionElement.style.transform = 'translateY(-100%)'; // 向上滑动
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 1000); // 保持与动画时间一致
            });
        }

        // 页面加载时复位动画层
        window.addEventListener('load', () => {
            transitionElement.style.transform = 'translateY(0)';
            transitionElement.style.opacity = '0';
        });

        const cursor = document.getElementById('cursor');
        
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX;
            const y = e.clientY;
            
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                cursor.style.left = x + 'px';
                cursor.style.top = y + 'px';
            });
        });
        
        // Detect when cursor is over images in ME section
        function updateMouseCursorVisibility() {
            // Get scroll position
            const scrollTop = window.scrollY;
            const meSection = document.querySelector('.me-section');
            
            // Only activate custom cursor in ME section
            if (scrollTop > window.innerHeight * 0.6 && meSection.classList.contains('visible')) {
                cursor.classList.add('active');
                
                // Add event listeners for images
                const images = document.querySelectorAll('.parallax-img');
                images.forEach(img => {
                    img.addEventListener('mouseenter', expandCursor);
                    img.addEventListener('mouseleave', shrinkCursor);
                });
            } else {
                cursor.classList.remove('active');
                cursor.classList.remove('expanded');
                cursor.innerHTML = '';
                
                // Remove event listeners when not in ME section
                const images = document.querySelectorAll('.parallax-img');
                images.forEach(img => {
                    img.removeEventListener('mouseenter', expandCursor);
                    img.removeEventListener('mouseleave', shrinkCursor);
                });
            }
        }
        
        function expandCursor() {
            cursor.classList.add('expanded');
            const img = document.createElement('img');
            img.src = './img/Instagram_icon.png';
            img.alt = 'Instagram';
            cursor.innerHTML = ''; // 清空之前的内容
            cursor.appendChild(img);

            // 创建一个隐藏的链接
            const hiddenLink = document.createElement('a');
            hiddenLink.href = 'https://www.instagram.com/mazzybox/';
            hiddenLink.target = '_blank';
            hiddenLink.style.display = 'none';
            document.body.appendChild(hiddenLink);

            // 添加点击事件
            cursor.onclick = () => {
                hiddenLink.click();
            };

            // 添加鼠标样式变化
            cursor.style.cursor = 'pointer';
        }

        function shrinkCursor() {
            cursor.classList.remove('expanded');
            cursor.innerHTML = '';
            cursor.onclick = null;
            cursor.style.cursor = 'default';
        }     
        // Page load animation
        setTimeout(() => {
            document.querySelector('.logo').style.opacity = '1';
            document.querySelector('.logo').style.transform = 'translateY(0)';
            
            // Handle both nav styles for compatibility
            document.querySelectorAll('.nav-item').forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
            
            document.querySelectorAll('.nav-item-sub').forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
            
            document.querySelector('.glass-effect').style.opacity = '1';
            document.querySelector('.header').style.opacity = '1';
            document.querySelector('.header-info').style.opacity = '1';
            document.querySelector('.header-info').style.transform = 'translateY(0)';
            
            document.querySelectorAll('.studio-title div').forEach(div => {
                div.style.opacity = '1';
                div.style.transform = 'translateY(0)';
            });
            
            document.querySelector('.mouse-follower-container').style.opacity = '1';

            // 增加chinese-text和large-text的延迟时间
            setTimeout(() => {
                document.querySelectorAll('.chinese-text').forEach(text => {
                    text.style.opacity = '1';
                    text.style.transform = 'translateY(0)';
                });
            }, 2000); 

            setTimeout(() => {
                document.querySelectorAll('.large-text').forEach(text => {
                    text.style.opacity = '1';
                    text.style.transform = 'translateY(0)';
                    text.style.scale = '1';
                });
            }, 2800);  
        }, 300);
        
        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-item:not([data-transition]) a, .nav-item-sub a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
        
        // Mouse follower images effect
        const imageUrls = [
            './img/Snipaste_2025-03-24_20-00-39.png',
            './img/Snipaste_2025-03-24_20-01-22.png',
            './img/Snipaste_2025-03-24_20-02-11.png',
            './img/Snipaste_2025-03-24_20-02-47.png',
            './img/Snipaste_2025-03-24_20-03-31.png'
        ];
        
        const followerContainer = document.getElementById('followerContainer');
        const navElement = document.querySelector('.nav');
        let lastMoveTime = 0;
        let currentImageIndex = 0;
        let activeImages = [];
        
        function isMouseOverNav(x, y) {
            const navRect = navElement.getBoundingClientRect();
            return (
                x >= navRect.left &&
                x <= navRect.right &&
                y >= navRect.top &&
                y <= navRect.bottom
            );
        }
        
        function shouldShowImageFollower() {
            const scrollTop = window.scrollY;
            return scrollTop <= window.innerHeight * 0.6;
        }
        
        function createImageFollower(x, y) {
            // Only create image followers when in home section
            if (!shouldShowImageFollower()) {
                return;
            }
            
            const img = document.createElement('img');
            img.src = imageUrls[currentImageIndex];
            img.alt = "Interactive image";
            img.className = "follower-image";
            img.style.left = `${x - 75}px`;
            img.style.top = `${y - 75}px`;
            
            followerContainer.appendChild(img);
            activeImages.push(img);
            
            if (activeImages.length > 3) {
                const oldImg = activeImages.shift();
                oldImg.style.opacity = "0";
                setTimeout(() => {
                    followerContainer.removeChild(oldImg);
                }, 250);
            }
            
            setTimeout(() => {
                img.style.opacity = "1";
            }, 50);
            
            currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        }
        
        document.addEventListener('mousemove', function(e) {
            const now = Date.now();
            
            if (now - lastMoveTime > 150) {
                if (!isMouseOverNav(e.clientX, e.clientY)) {
                    if (shouldShowImageFollower()) {
                        followerContainer.style.opacity = '1';
                        createImageFollower(e.clientX, e.clientY);
                    } else {
                        followerContainer.style.opacity = '0';
                    }
                } else {
                    activeImages.forEach(img => {
                        img.style.opacity = "0";
                    });
                    activeImages = [];
                }
                
                lastMoveTime = now;
            }
        });
        
        // Parallax and scroll effects for desktop
        function handleDesktopScroll() {
            const scrollTop = window.scrollY;
            const parallaxElements = document.querySelectorAll('[data-speed]');
            const meSection = document.querySelector('.me-section');
            const studioInfo = document.querySelector('.studio-info');
            const mazzyboxInfo = document.querySelector('.mazzybox-info');
            const studioInfoNav = document.getElementById('studio-info-nav');
            const meNav = document.getElementById('me-nav');
            

            // Parallax effect
            
            // Update nav active state based on scroll position
            if (scrollTop > window.innerHeight * 0.6) {
                studioInfoNav.classList.remove('active');
                meNav.classList.add('active');
                
                // Switch header content when scrolling to ME section
                studioInfo.classList.add('hidden');
                mazzyboxInfo.classList.add('visible');
            } else {
                studioInfoNav.classList.add('active');
                meNav.classList.remove('active');
                
                // Restore original header when scrolling back up
                studioInfo.classList.remove('hidden');
                mazzyboxInfo.classList.remove('visible');
            }
            
            // Show ME section when scrolled to it
            if (scrollTop > window.innerHeight * 0.6) {
                meSection.classList.add('visible');
                
                // Reveal images with delay when ME section is visible
                setTimeout(() => {
                    document.querySelectorAll('.parallax-img').forEach((img, index) => {
                        setTimeout(() => {
                            img.classList.add('visible');
                        }, index * 200);
                    });
                }, 300);
            }
            
            // Update custom cursor visibility based on section
            updateMouseCursorVisibility();
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-speed'));
                const yPos = -scrollTop * speed * 0.25;
                
                if(element.classList.contains('large-text')) {
                    const progress = Math.min(1, scrollTop / 100);
                    element.style.opacity = progress;
                    element.style.transform = `translateY(${80 - progress * 80}px)`;
                    element.style.scale = `${0.95 + 0.05 * progress}`;
                }
                
                if(scrollTop > 10 && element.classList.contains('small-chinese')) {
                    element.style.opacity = Math.max(0, 1 - (scrollTop - 10) / 80);
                }
                
                if(element.classList.contains('chinese-text') && element.style.opacity === '1') {
                    element.style.transform = `translateY(${yPos}px)`;
                }
                
                // Apply parallax to the images in ME section when visible
                if(element.classList.contains('parallax-img') && element.classList.contains('visible')) {
                    // Calculate distance from the element to the top of viewport
                    const rect = element.getBoundingClientRect();
                    const elementCenter = rect.top + rect.height / 2;
                    const viewportCenter = window.innerHeight / 2;
                    const distanceFromCenter = elementCenter - viewportCenter;
                    
                    // Apply parallax movement based on distance from center
                    element.style.transform = `translateY(${distanceFromCenter * speed * 0.1}px)`;
                }
            });
        }
    }
    
    // =================== mobile（<=768px） ===================
    // mobile（<=768px）
    function handleMobileScroll() {
        const scrollTop = window.scrollY;
        
      
        const banner = document.querySelector('.scrolling-banner-mobile');
        if (banner) {
            if (scrollTop > window.innerHeight) {
                banner.style.opacity = '0';
            } else {
                banner.style.opacity = (1 - scrollTop / window.innerHeight).toString();
            }
        }
    }
    
    // Fade in studio text elements on load
    const studioTextElements = isMobile ? 
        document.querySelectorAll('.studio-text-mobile') : 
        document.querySelectorAll('.studio-text');
    
    setTimeout(() => {
        studioTextElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
    
    // Easing function for animations
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // Handle scroll events based on device type
    window.addEventListener('scroll', function() {
        if (isMobile) {
            handleMobileScroll();
        } else {
            handleDesktopScroll();
        }
    });
    
    // Handle window resize - reload page if crossing breakpoint
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 430;
        if (newIsMobile !== isMobile) {
            location.reload(); // Reload on breakpoint change
        }
    });
    
    // Initial execution of scroll handler
    setTimeout(() => {
        if (isMobile) {
            handleMobileScroll();
        } else {
            handleDesktopScroll();
            if (document.getElementById('studio-info-nav')) {
                document.getElementById('studio-info-nav').classList.add('active');
            }
        }
    }, 1500);

    // Hamburger menu functionality (both desktop and mobile)
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            const navItems = document.querySelector('.nav-items');
            if (navItems) {
                navItems.classList.toggle('active');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const navItems = document.querySelector('.nav-items');
            if (hamburger && navItems && !hamburger.contains(e.target) && !navItems.contains(e.target)) {
                hamburger.classList.remove('active');
                navItems.classList.remove('active');
            }
        });
    }
    
    // Mobile hamburger menu
    const mobileHamburger = document.querySelector('.mobile-hamburger');
    if (mobileHamburger) {
        mobileHamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            // Mobile menu functionality could be added here
        });
    }

    // add back to top botton
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // mobile
    if (isMobile) {
        window.addEventListener('scroll', () => {
            const first = document.querySelector('.first-page-mobile');
            const second = document.querySelector('.second-page-mobile');
            const third = document.querySelector('.third-page-mobile');
            const mobileHeader = document.querySelector('.mobile-header');
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;

            // control mobile header
            if (scrollTop >= windowHeight * 0.5) {
                mobileHeader.classList.add('visible');
            } else {
                mobileHeader.classList.remove('visible');
            }

            if (scrollTop >= windowHeight * 1) {
                second.style.transform = 'translateY(0)';
            } else {
                second.style.transform = 'translateY(100vh)';
            }

            if (scrollTop >= windowHeight * 2) {
                third.style.transform = 'translateY(0)';
                third.style.position = 'absolute';
                third.style.top = (windowHeight * 2) + 'px';
                third.style.height = 'auto';
            } else {
                third.style.transform = 'translateY(100vh)';
                third.style.position = 'fixed';
                third.style.top = '0';
                third.style.height = '100vh';
            }
        });
    }

    
    document.querySelector('a[href="#mobile-footer"]').addEventListener('click', function(e) {
        e.preventDefault();
        const mobileFooter = document.querySelector('.mobile-footer');
        if (mobileFooter) {
            mobileFooter.scrollIntoView({ behavior: 'smooth' });
            // close menu
            const menuCheckbox = document.querySelector('.menu-toggle');
            if (menuCheckbox) {
                menuCheckbox.checked = false;
            }
        }
    });
});
