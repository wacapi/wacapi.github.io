/**
* Template Name: Mentor
* Template URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

class Main {
  constructor() {
    this.selectBody = document.querySelector('body');
    this.selectHeader = document.querySelector('#header');
    this.mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    this.scrollTop = document.querySelector('.scroll-top');
    this.preloader = document.querySelector('#preloader');
  }

  init() {
    this.toggleScrolled();
    this.toggleScrollTop();
    this.initSwiper();
    this.aosInit();
    this.initGlightbox();
    this.initPureCounter();

    document.addEventListener('scroll', this.toggleScrolled.bind(this));
    window.addEventListener('load', this.toggleScrolled.bind(this));
    if(this.mobileNavToggleBtn){
      this.mobileNavToggleBtn.addEventListener('click', this.mobileNavToogle.bind(this));
    }
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          this.mobileNavToogle();
        }
      });
    });
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
    if (this.preloader) {
      this.preloader.remove();
    }
    this.scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    window.addEventListener('load', this.toggleScrollTop.bind(this));
    document.addEventListener('scroll', this.toggleScrollTop.bind(this));
  }

  toggleScrolled() {
    if (!this.selectHeader) return;
    if (!this.selectHeader.classList.contains('scroll-up-sticky') && !this.selectHeader.classList.contains('sticky-top') && !this.selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? this.selectBody.classList.add('scrolled') : this.selectBody.classList.remove('scrolled');
  }

  mobileNavToogle() {
    this.selectBody.classList.toggle('mobile-nav-active');
    this.mobileNavToggleBtn.classList.toggle('bi-list');
    this.mobileNavToggleBtn.classList.toggle('bi-x');
  }

  toggleScrollTop() {
    if (this.scrollTop) {
      window.scrollY > 100 ? this.scrollTop.classList.add('active') : this.scrollTop.classList.remove('active');
    }
  }

  aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  initGlightbox() {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  initPureCounter() {
    new PureCounter();
  }

  initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = {
        "loop": true,
        "speed": 600,
        "autoplay": {
          "delay": 5000
        },
        "slidesPerView": "auto",
        "centeredSlides": true,
        "pagination": {
          "el": ".swiper-pagination",
          "type": "bullets",
          "clickable": true
        },
        "navigation": {
          "nextEl": ".swiper-button-next",
          "prevEl": ".swiper-button-prev"
        }
      }

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
}

window.mainScript = new Main();

document.addEventListener('DOMContentLoaded', () => {
  new Main().init();
});
