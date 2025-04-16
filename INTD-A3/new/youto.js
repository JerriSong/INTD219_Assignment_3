document.addEventListener('DOMContentLoaded', function() {
    // Page transition animation
    const transition = document.querySelector('.page-transition');
    const body = document.body;
    const projectHeader = document.getElementById('projectHeader');
    const headerInfo = document.getElementById('headerInfo');
    const projectTitle = document.querySelector('.project-title');
    
    // 新增获取标题元素和文本元素
    const studioTitleSpans = document.querySelectorAll('.studio-title span');
    const projectName = document.querySelector('.project-name');
    const altProjectName = document.querySelector('.alt-title');
    const headerInfoText = headerInfo ? headerInfo.querySelector('p') : null;
    const brandConceptTitle = document.getElementById('brandConceptTitle');
    const brandConceptText = document.getElementById('brandConceptText');
    const brandConceptSection = document.getElementById('brandConceptSection');
    const mainVideoContainer = document.getElementById('mainVideoContainer');
    const packagingContainer = document.getElementById('packagingContainer');

    let conceptSectionSeen = false;
    
    // Initial state
    transition.style.transform = 'translateY(100%)';
    
    setTimeout(() => {
        transition.classList.add('active');
        
        setTimeout(() => {
            transition.style.transform = 'translateY(-100%)';
            transition.style.transition = 'transform 0s';
        }, 800);
    }, 100);

    // Custom cursor with smooth animation - improved for perfect centering
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCircle = document.getElementById('cursor-circle');
    
    // Initial position variables
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;
    
    // Physics parameters for natural movement
    const dotEasing = 0.35; // Faster for small dot
    const circleEasing = 0.12; // Slower for outer circle
    
    // Track if mouse is on page
    let isMouseOnPage = false;
    
    // Animation function with improved smoothing and exact centering
    function animateCursor() {
        if (!isMouseOnPage) {
            requestAnimationFrame(animateCursor);
            return;
        }
        
        // Dot follows cursor directly with perfect centering
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        
        // Circle follows with delay for smoother effect
        const dotDx = mouseX - circleX;
        const dotDy = mouseY - circleY;
        
        // Apply easing for natural movement
        circleX += dotDx * circleEasing;
        circleY += dotDy * circleEasing;
        
        // Apply transforms with perfect centering
        cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start the animation
    animateCursor();
    
    // Update cursor position on mouse move with precise tracking
    document.addEventListener('mousemove', function(e) {
        isMouseOnPage = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
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
    
    // Play button cursor effect - only for main video container
    const exploreElement = document.querySelector('[data-cursor-type="explore"]');
    if (exploreElement) {
        exploreElement.addEventListener('mouseenter', function() {
            // Add class for play button cursor
            cursorCircle.classList.add('cursor-explore');
            // We don't need text content since we're using the ::after pseudo-element for the play triangle
            cursorCircle.textContent = '';
            
            // Hide dot completely on hover
            cursorDot.style.opacity = '0';
        });
        
        exploreElement.addEventListener('mouseleave', function() {
            cursorCircle.classList.remove('cursor-explore');
            cursorCircle.textContent = '';
            
            // Show dot again
            cursorDot.style.opacity = '1';
        });
    }
    
    // Links and interactive elements cursor effect
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1.5)`;
            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%) scale(1.2)`;
        });
        
        element.addEventListener('mouseleave', function() {
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`;
            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%) scale(1)`;
        });
    });

    // Next Project hover video effect
    const nextProjectContainer = document.querySelector('.next-project-container');
    const nextProject = document.querySelector('.next-project');
    const previewVideo = document.createElement('video');
    previewVideo.src = '../new/img/video/hunogigi.mp4';
    previewVideo.muted = true;
    previewVideo.loop = true;
    previewVideo.playsInline = true;
    cursorCircle.appendChild(previewVideo);

    // Track mouse for preview positioning
    document.addEventListener('mousemove', function(e) {
        const nextProjectRect = nextProject.getBoundingClientRect();
        const isOverNextProject = (
            e.clientY >= nextProjectRect.top && 
            e.clientY <= nextProjectRect.bottom &&
            e.clientX >= nextProjectRect.left && 
            e.clientX <= nextProjectRect.right
        );
        
        if (isOverNextProject && !cursorCircle.classList.contains('video-preview')) {
            cursorCircle.classList.add('video-preview');
            previewVideo.play().catch(() => {});
        } else if (!isOverNextProject && cursorCircle.classList.contains('video-preview')) {
            cursorCircle.classList.remove('video-preview');
            previewVideo.pause();
        }
    });

  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.willChange = 'transform, opacity';
            } else {
                entry.target.style.willChange = 'auto';
            }
        });
    });

    
    document.querySelectorAll('.project-section, .product-grid, .packaging-container').forEach(el => {
        observer.observe(el);
    });

  
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    

    function isHeaderOverMainVideo() {
        if (!mainVideoContainer || !projectHeader) return false;
        
        const headerRect = projectHeader.getBoundingClientRect();
        const videoRect = mainVideoContainer.getBoundingClientRect();
        
        return headerRect.bottom >= videoRect.top && headerRect.bottom <= videoRect.bottom;
    }
    
    // if the concept text is over the main video
    function isConceptTextOverMainVideo() {
        if (!mainVideoContainer || !brandConceptTitle || !brandConceptText) return false;
        
        const titleRect = brandConceptTitle.getBoundingClientRect();
        const textRect = brandConceptText.getBoundingClientRect();
        const videoRect = mainVideoContainer.getBoundingClientRect();
        
        return (
            (titleRect.bottom >= videoRect.top && titleRect.top <= videoRect.bottom) ||
            (textRect.bottom >= videoRect.top && textRect.top <= videoRect.bottom)
        );
    }

    function isPackagingContainerVisible() {
        if (!packagingContainer) return false;
        
        const rect = packagingContainer.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= 0;
    }
    
    // detect header text colors
    function checkHeaderTextColors() {
        if (!mainVideoContainer || !projectHeader || !headerInfoText) return;
        
        const videoRect = mainVideoContainer.getBoundingClientRect();
        const headerRect = projectHeader.getBoundingClientRect();
        
        const headerBottom = headerRect.bottom;
        const videoTop = videoRect.top;
        const videoBottom = videoRect.bottom;
        
        // 判断 header 是否在视频区域内
        const isOverVideo = headerBottom >= videoTop && headerRect.top <= videoBottom;
        
        // 判断 header 是否在视频区域上方
        const isAboveVideo = headerBottom < videoTop;
        
        if (isOverVideo) {
            // 当 header 与视频重叠时，文字变白
            studioTitleSpans.forEach(span => span.classList.add('text-light'));
            projectName.classList.add('text-light');
            altProjectName.classList.add('text-light');
            headerInfoText.classList.add('text-light');
            headerInfoText.style.color = '#ffffff';
        } else {
      
            studioTitleSpans.forEach(span => {
                span.classList.remove('text-light');
                span.style.color = '#060001';
            });
            projectName.classList.remove('text-light');
            projectName.style.color = '#060001';
            altProjectName.classList.remove('text-light');
            altProjectName.style.color = '#060001';
            headerInfoText.classList.remove('text-light');
            headerInfoText.style.color = '#060001';
        }
        
        // check concept text color
        if (brandConceptTitle && brandConceptText) {
            const conceptTitleRect = brandConceptTitle.getBoundingClientRect();
            const conceptTextRect = brandConceptText.getBoundingClientRect();
            const isConceptOverVideo = 
                (conceptTitleRect.bottom >= videoTop && conceptTitleRect.top <= videoBottom) ||
                (conceptTextRect.bottom >= videoTop && conceptTextRect.top <= videoBottom);
            
            if (isConceptOverVideo) {
                brandConceptTitle.classList.add('text-light');
                brandConceptText.classList.add('text-light');
            } else {
                brandConceptTitle.classList.remove('text-light');
                brandConceptText.classList.remove('text-light');
                brandConceptTitle.style.color = '#060001';
                brandConceptText.style.color = '#060001';
            }
        }
    }
    
    // detect header content
    function checkHeaderContent() {
        if (!mainVideoContainer || !packagingContainer || !projectHeader || !headerInfo) return;
        
        const videoRect = mainVideoContainer.getBoundingClientRect();
        const headerRect = projectHeader.getBoundingClientRect();
        const packagingRect = packagingContainer.getBoundingClientRect();

        const isOverVideo = headerRect.bottom >= videoRect.top && headerRect.top <= videoRect.bottom;
        
        // adjust header content
        const isNearPackaging = packagingRect.top <= window.innerHeight / 2;
        
        if (isNearPackaging && !isOverVideo) {
  
            projectTitle.classList.add('alt-view');
            
            // update header content
            const headerColor = isOverVideo ? '#ffffff' : '#060001';
            headerInfo.innerHTML = `<div class="glass-effect"></div><p style="color: ${headerColor};">The English logo has taken the visual element of the oval from the old "panda face". The YouTouch logo, whether presented on its own or in conjunction with different product lines, provides a clear and dynamic visual experience, and reflects the Chinese expression of the YouTouch brand.</p>`;
            
        
            if (brandConceptTitle) brandConceptTitle.style.opacity = '0';
            if (brandConceptText) brandConceptText.style.opacity = '0';
        } else {
            // restore original header content
            projectTitle.classList.remove('alt-view');
            
            const headerColor = isOverVideo ? '#ffffff' : '#060001';
            headerInfo.innerHTML = `<div class="glass-effect"></div><p style="color: ${headerColor};">As a comfortable and preferred eye health brand, youto has reconstructed the contact lens product coordinates to match different eye needs, and the Chinese and English logos have been completely updated and upgraded. We focus on "text recognition" to ensure that the Chinese logo is unique and clearly recognizable in even the smallest of products and materials, and the English logo has taken the visual element of an oval from the "panda face" of the past.</p>`;
    
            if (brandConceptTitle) brandConceptTitle.style.opacity = '1';
            if (brandConceptText) brandConceptText.style.opacity = '1';
        }
    }
    
    // improve scrolling performance
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const onScroll = () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(() => {
            
                if (projectHeader) {
                    if (lastScrollY > 100) {
                        projectHeader.classList.add('scrolled');
                        projectHeader.style.paddingTop = '20px';
                        projectHeader.style.paddingBottom = '20px';
                    } else {
                        projectHeader.classList.remove('scrolled');
                        projectHeader.style.paddingTop = '40px';
                        projectHeader.style.paddingBottom = '40px';
                    }
                }
                
                // check header text colors
                checkHeaderTextColors();
                
                // check header content
                checkHeaderContent();
                
                ticking = false;
            });
            ticking = true;
        }
    };

    // use passive event listener
    window.addEventListener('scroll', onScroll, { passive: true });

    // check header text colors
    checkHeaderTextColors();
    checkHeaderContent();

    // Mobile menu toggle functionality
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.add('closing');
                setTimeout(() => {
                    mobileMenu.classList.remove('active');
                    mobileMenu.classList.remove('closing');
                    document.body.classList.remove('menu-open');
                }, 400);
            } else {
                mobileMenu.classList.add('active');
                document.body.classList.add('menu-open');
            }
        });
    }
    
    // add window resize listener
    window.addEventListener('resize', debounce(() => {
        checkHeaderTextColors();
        checkHeaderContent();
    }, 100), { passive: true });

    // improve mouse performance
    let mouseTicking = false;
    const onMouseMove = (e) => {
        if (!mouseTicking) {
            requestAnimationFrame(() => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                mouseTicking = false;
            });
            mouseTicking = true;
        }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    // clean up
    window.addEventListener('beforeunload', () => {
        observer.disconnect();
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', debounce);
    });

    // Video click play functionality
    const mainVideo = document.querySelector('.main-image-container video');
    if (mainVideo) {
        // 检查是否是移动设备
        if (window.innerWidth <= 430) {
            mainVideo.play().catch(function(error) {
                console.log("视频自动播放失败:", error);
            });
            // 移动端禁用点击暂停功能
            mainVideo.style.pointerEvents = 'none';
            mainVideo.style.cursor = 'default';
        } else {
            // 桌面端保持原有行为
            mainVideo.pause();
            mainVideo.addEventListener('click', function() {
                if (this.paused) {
                    this.play();
                } else {
                    this.pause();
                }
            });
            mainVideo.style.cursor = 'pointer';
        }
    }
    
    // 添加窗口大小改变时的处理
    window.addEventListener('resize', function() {
        if (mainVideo) {
            if (window.innerWidth <= 430) {
                mainVideo.play().catch(function(error) {
                    console.log("视频自动播放失败:", error);
                });
                mainVideo.style.pointerEvents = 'none';
                mainVideo.style.cursor = 'default';
            } else {
                mainVideo.pause();
                mainVideo.style.pointerEvents = 'auto';
                mainVideo.style.cursor = 'pointer';
            }
        }
    });
    
    // 在DOM加载完成后执行一次检查
    setTimeout(() => {
        checkHeaderTextColors();
        checkHeaderContent();
    }, 500);

    // 更新返回顶部按钮的 JavaScript
    const mobileBackToTop = document.getElementById('mobileBackToTop');
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            mobileBackToTop.classList.add('visible');
        } else {
            mobileBackToTop.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
    mobileBackToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});