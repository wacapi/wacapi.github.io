/**
* Template Name: HeroBiz
* Template URL: https://bootstrapmade.com/herobiz-bootstrap-business-template/
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
    this.navmenulinks = document.querySelectorAll('.navmenu a');
    this.preloader = document.querySelector('#preloader');
  }

  init() {
    this.toggleScrolled();
    this.toggleScrollTop();
    this.aosInit();
    this.initSwiper();
    this.initEventListeners();
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

  navmenuScrollspy() {
    this.navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }

  initEventListeners() {
    document.addEventListener('scroll', () => {
      this.toggleScrolled();
      this.toggleScrollTop();
      this.navmenuScrollspy();
    });

    this.preloader.remove();

    if (this.mobileNavToggleBtn){
      this.mobileNavToggleBtn.addEventListener('click', () => this.mobileNavToogle());
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

    this.scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        faqItem.parentNode.classList.toggle('faq-active');
      });
    });

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

    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }
}

window.mainScript = new Main();

document.addEventListener('DOMContentLoaded', () => {
  new Main().init();
});
