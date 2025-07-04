class PortfolioApp {
    constructor () {
        this.initializeNavBarScroll();
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
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
})