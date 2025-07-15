class PortfolioApp {
  constructor() {
    this.initializeNavBarScroll();
    this.intializeAnimations();
    this.intializeSmoothScrolling();
    this.intializeThemeToggle();
    this.intializeFormHandling();
  }

  initializeNavBarScroll() {
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  intializeSmoothScrolling() {
    const navLinks = document.querySelectorAll(".nav-link");
    const heroButtons = document.querySelectorAll(".hero-buttons .btn");

    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    heroButtons[0].addEventListener("click", () => {
      const projectsSection = document.querySelector("#projects");
      const offsetTop = projectsSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });

    heroButtons[1].addEventListener("click", () => {
      const contactSection = document.querySelector("#contact");
      const offsetTop = contactSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  }

  intializeAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      ".about-card, .interests, .contact"
    );

    animatedElements.forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = `opacity 0.6s ease ${index * 0.1}s`;
      observer.observe(element);
    });

    this.addTypingEffect();
  }

  addTypingEffect() {
    const heroTitle = document.querySelector(".hero-title");
    const fullText = "Hi, I'm ";
    const name = "Ayabonga.";

    heroTitle.innerHTML = "";

    let i = 0;
    const typeFullText = () => {
      if (i < fullText.length) {
        heroTitle.innerHTML += fullText.charAt(i);

        i++;
        setTimeout(typeFullText, 100);
      } else {
        const nameSpan = document.createElement("span");
        nameSpan.className = "name-highlight";

        heroTitle.appendChild(nameSpan);

        let j = 0;
        const typeName = () => {
          if (j < name.length) {
            nameSpan.innerHTML += name.charAt(j);
            j++;
            setTimeout(typeName, 100);
          }
        };

        setTimeout(typeName, 200);
      }
    };

    setTimeout(typeFullText, 500);
  }

  intializeThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");

    let isDark = true;

    themeToggle.addEventListener("click", () => {
      isDark = !isDark;
      this.applyTheme(isDark);
    });
  }

  applyTheme(isDark) {
    const body = document.body;
    const toggleCircle = document.querySelector(".toggle-circle");

    if (isDark) {
      body.classList.remove("light-theme");
      toggleCircle.style.transform = "translateX(0)";
    } else {
      body.classList.add("light-theme");
      toggleCircle.style.transform = "translateX(26px)";
    }
  }

  intializeFormHandling() {
    const contactForm = document.querySelector(".contact-form");

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = contactForm.querySelector('input[placeholder="Name"]').value;
      const email = contactForm.querySelector(
        'input[placeholder="Email"]'
      ).value;
      const message = contactForm.querySelector("textarea").value;

      if (name && email && message) {
        try {
          const response = await fetch("http://localhost:3000/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
          });

          if (response.ok) {
            this.showNotification("Message sent successfully!", "success");
            contactForm.reset();
          } else {
            const errorData = await response.json();
            this.showNotification(
              errorData?.error || "Something went wrong. Please try again.",
              "error"
            );
          }
        } catch (error) {
          this.showNotification(
            "Network error. Please try again later.",
            "error"
          );
        }
      } else {
        this.showNotification("Please fill in all fields.", "error");
      }
    });
  }

  showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    const isLightTheme = document.body.classList.contains("light-theme");

    notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 1001;
            transform: transalateY(400px);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: ${
              isLightTheme
                ? "0 8px 24px rgba(0, 0, 0, 0.12)"
                : "0 8px 24px rgba(0, 0, 0, 0.2)"
            };
            ${
              type === "success"
                ? "background: #10b981;"
                : "background: #ef4444;"
            }`;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
      notification.style.transform = "translateX(400px)";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
});

document.addEventListener("DOMContentLoaded", () => {
  // parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const rate = scrolled * -0.3;

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  //active nav link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  //magnetic effect to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.1}px, ${
        y * 0.1
      }px) scale(1.02)`;
    });

    button.addEventListener("mouseLeave", () => {
      button.style.transform = "translate(0, 0) scale(1)";
    });
  });

  //floating animation to interest icons
  const interestIcons = document.querySelectorAll(".interest-icon");
  interestIcons.forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
  });
});
