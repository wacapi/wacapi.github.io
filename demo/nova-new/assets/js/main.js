/**
* Template Name: Nova
* Template URL: https://bootstrapmade.com/nova-bootstrap-business-template/
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
    this.initMobileNavToggle();
    this.initHideMobileNavOnSamePageLinks();
    this.initToggleMobileNavDropdowns();
    this.initPreloader();
    this.initScrollTopButton();
    this.initAOS();
    this.initGLightbox();
    this.initSwiper();
    this.initIsotope();
  }

  toggleScrolled() {
    if (!this.selectHeader) return;
    if (!this.selectHeader.classList.contains('scroll-up-sticky') && !this.selectHeader.classList.contains('sticky-top') && !this.selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? this.selectBody.classList.add('scrolled') : this.selectBody.classList.remove('scrolled');
  }

  initMobileNavToggle() {
    if (this.mobileNavToggleBtn) {
      this.mobileNavToggleBtn.addEventListener('click', () => {
        this.selectBody.classList.toggle('mobile-nav-active');
        this.mobileNavToggleBtn.classList.toggle('bi-list');
        this.mobileNavToggleBtn.classList.toggle('bi-x');
      });
    }
  }

  initHideMobileNavOnSamePageLinks() {
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (this.selectBody.classList.contains('mobile-nav-active')) {
          this.selectBody.classList.toggle('mobile-nav-active');
          this.mobileNavToggleBtn.classList.toggle('bi-list');
          this.mobileNavToggleBtn.classList.toggle('bi-x');
        }
      });
    });
  }

  initToggleMobileNavDropdowns() {
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  }

  initPreloader() {
    if (!this.preloader) return;
    this.preloader.remove();
  }

  initScrollTopButton() {
    if (this.scrollTop) {
      this.scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      window.addEventListener('load', this.toggleScrollTop.bind(this));
      document.addEventListener('scroll', this.toggleScrollTop.bind(this));
      document.addEventListener('scroll', this.toggleScrolled.bind(this));
    }
  }

  toggleScrollTop() {
    if (this.scrollTop) {
      window.scrollY > 100 ? this.scrollTop.classList.add('active') : this.scrollTop.classList.remove('active');
    }
  }

  initAOS() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  initGLightbox() {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  initSwiper() {
    if(!document.querySelectorAll(".init-swiper")) return;
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

  initIsotope() {
    if (!document.querySelectorAll('.isotope-layout')) return;
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope;
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });
  }
}

const main = new Main();
window.mainScript = main;
document.addEventListener('DOMContentLoaded', () => {
  new Main().init();
});