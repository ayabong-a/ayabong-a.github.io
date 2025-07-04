class PortfolioApp {
    constructor () {
        this.initializeNavBarScroll();
        this.intializeAnimations();
        this.intializeSmoothScrolling();
        this.intializeThemeToggle();
    }

    initializeNavBarScroll() {
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            if(window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled')
            }
        })
    }

    intializeSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');

        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if(targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            })
        });

        heroButtons[0].addEventListener('click', () => {
            const projectsSection = document.querySelector('#projects');
            const offsetTop = projectsSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });

        heroButtons[1].addEventListener('click', () => {
            const contactSection = document.querySelector('#contact');
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            })
        });
    }

    intializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            })
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.about-card, .project-card, .interests, .contact');

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s`;
            observer.observe(element)

        });

        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)'
            })

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)'
            });
        });

        this.addTypingEffect();
    }

    addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        const text = "Hi, I'm Ayabonga.";
        const name = "Ayabonga.";

        heroTitle.innerHTML = "";

        let i = 0;
        const typeWriter = () => {
            if(i < text.length) {
                if(i === text.indexOf(name)) {
                    heroTitle.innerHTML += '<span class="name-highlight">';
                }

                heroTitle.innerHTML += text.charAt(i);

                if(i === text.length - 1) {
                    heroTitle.innerHTML += '</span>';
                }

                i++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 500);
    }

    intializeThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const toggleCircle = themeToggle.querySelector('.toggle-circle');

        let isDark = true;
        
        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            this.applyTheme(isDark);
        })
    }

    applyTheme(isDark){
        const body = document.body;
        const toggleCircle = document.querySelector('.toggle-circle');

        if(isDark) {
            body.classList.remove('light-theme');
            toggleCircle.style.transform = 'translateX(0)';
        } else {
            body.classList.add('light-theme');
            toggleCircle.style.transform = 'translateX(26px)';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
})