/**
* Template Name: FlexStart
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Updated: Nov 01 2024 with Bootstrap v5.3.3
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
  }

  init() {
    this.addEventListeners();
    this.initPlugins();
    this.aosInit();
    this.initSwiper();
  }

  addEventListeners() {
    document.addEventListener('scroll', this.toggleScrolled.bind(this));
    window.addEventListener('load', this.toggleScrolled.bind(this));
    window.addEventListener('load', this.toggleScrollTop.bind(this));
    document.addEventListener('scroll', this.toggleScrollTop.bind(this));
    window.addEventListener('load', this.correctScrollPosition.bind(this));
    window.addEventListener('load', this.navmenuScrollspy.bind(this));
    document.addEventListener('scroll', this.navmenuScrollspy.bind(this));

    if (this.mobileNavToggleBtn) {
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

    if (this.scrollTop) {
      this.scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        faqItem.parentNode.classList.toggle('faq-active');
      });
    });
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

  initPlugins() {
    document.querySelectorAll('.isotope-layout').forEach((isotopeItem) => {
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

  correctScrollPosition() {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
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
}

window.mainScript = new Main();

document.addEventListener('DOMContentLoaded', () => {
  new Main().init();
});
