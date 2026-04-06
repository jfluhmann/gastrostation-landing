/* ============================================
   GASTRO STATION — Landing Page JavaScript
   ============================================ */

(function () {
    'use strict';

    // --- Nav scroll behavior ---
    const nav = document.getElementById('nav');

    function handleNavScroll() {
        if (!nav) return;
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // --- Mobile nav toggle ---
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (toggle && mobileNav) {
        function closeMobileNav() {
            toggle.classList.remove('active');
            mobileNav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }

        toggle.addEventListener('click', function () {
            const isActive = toggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            toggle.setAttribute('aria-expanded', String(isActive));
        });

        // Close mobile nav on link click
        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                closeMobileNav();
            });
        });

        // Close mobile nav when clicking outside the menu/toggle
        document.addEventListener('click', function (event) {
            const clickedInsideMenu = mobileNav.contains(event.target);
            const clickedToggle = toggle.contains(event.target);
            if (!clickedInsideMenu && !clickedToggle && mobileNav.classList.contains('active')) {
                closeMobileNav();
            }
        });

        // Close mobile nav with Escape
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && mobileNav.classList.contains('active')) {
                closeMobileNav();
            }
        });

        // Ensure menu is closed when switching to desktop width
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
                closeMobileNav();
            }
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = nav ? nav.offsetHeight + 20 : 80;
                var top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // --- Scroll reveal ---
    function initReveal() {
        var elements = document.querySelectorAll(
            '.problem-card, .feature-card, .module-card, .context-stat, .signup-wrapper, .pricing-teaser'
        );

        elements.forEach(function (el) {
            el.classList.add('reveal');
        });

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // Init on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
    } else {
        initReveal();
    }
})();
