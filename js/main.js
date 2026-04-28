/* ============================================
   U.S. REFRACTORY PRODUCTS - INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // SCROLL REVEAL ANIMATION
    // ==========================================
    const sections = document.querySelectorAll('main > section');
    let sectionDelay = 0;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, sectionDelay);
                sectionDelay += 80;
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // ==========================================
    // COMBINED SCROLL HANDLER (nav + back-to-top)
    // ==========================================
    const nav = document.querySelector('nav');

    const backToTop = document.createElement('button');
    backToTop.innerHTML = '&#8593;';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #e8600a, #c44d00);
        color: white;
        font-size: 1.3rem;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;
        box-shadow: 0 4px 14px rgba(232, 96, 10, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        text-transform: none;
        letter-spacing: 0;
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        const y = window.pageYOffset;

        // Nav shadow effect
        if (y > 100) {
            nav.style.backgroundColor = 'rgba(13, 27, 42, 0.97)';
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            nav.style.backgroundColor = '';
            nav.style.boxShadow = '';
        }

        // Back to top visibility
        if (y > 400) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px) scale(1.1)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = '';
    });

    // ==========================================
    // ACTIVE NAV LINK HIGHLIGHT
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.color = '#e8600a';
            link.style.background = 'rgba(232, 96, 10, 0.08)';
        }
    });

    // ==========================================
    // SMOOTH HOVER PARALLAX ON IMAGES
    // ==========================================
    const images = document.querySelectorAll('main > section > div img');

    images.forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            img.style.transform = `scale(1.02) translate(${x * 6}px, ${y * 6}px)`;
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = '';
        });
    });

    // ==========================================
    // ARTICLE CARD ENTRANCE STAGGER
    // ==========================================
    const articleSections = document.querySelectorAll('main > section');

    articleSections.forEach(sec => {
        const articles = sec.querySelectorAll('article');
        if (articles.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    articles.forEach((article, i) => {
                        setTimeout(() => {
                            article.style.opacity = '1';
                            article.style.transform = 'translateX(0)';
                        }, i * 120);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        articles.forEach(article => {
            article.style.opacity = '0';
            article.style.transform = 'translateX(-16px)';
            article.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        observer.observe(sec);
    });

    // ==========================================
    // LIST ITEMS STAGGER ANIMATION
    // ==========================================
    const listSections = document.querySelectorAll('main section ul');

    listSections.forEach(ul => {
        const items = ul.querySelectorAll('li');

        const listObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    items.forEach((item, i) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-10px)';
                        item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, i * 80);
                    });
                    listObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        listObserver.observe(ul);
    });

    // ==========================================
    // HEADER CLICK-TO-CALL & CLICK-TO-EMAIL
    // ==========================================
    const headerDiv = document.querySelector('header > div:last-child');
    if (headerDiv) {
        const phoneEl = headerDiv.querySelector('p:nth-child(2)');
        const emailEl = headerDiv.querySelector('p:last-child');

        if (phoneEl) {
            phoneEl.style.cursor = 'pointer';
            phoneEl.addEventListener('click', () => {
                window.location.href = 'tel:+14403864580';
            });
            phoneEl.addEventListener('mouseenter', () => {
                phoneEl.style.transform = 'scale(1.03)';
                phoneEl.style.transition = '0.2s ease';
            });
            phoneEl.addEventListener('mouseleave', () => {
                phoneEl.style.transform = '';
            });
        }

        if (emailEl && emailEl.textContent.includes('@')) {
            emailEl.style.cursor = 'pointer';
            emailEl.addEventListener('click', () => {
                window.location.href = 'mailto:info@usrp.com';
            });
            emailEl.addEventListener('mouseenter', () => {
                emailEl.style.color = '#e8600a';
                emailEl.style.transition = '0.2s ease';
            });
            emailEl.addEventListener('mouseleave', () => {
                emailEl.style.color = '';
            });
        }
    }

});
