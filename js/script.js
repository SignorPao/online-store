'use strict';

// pc or touchscreen
const isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
    return (
      isMobile.Android() || 
      isMobile.BlackBerry() || 
      isMobile.iOS() || 
      isMobile.Opera() || 
      isMobile.Windows());
  }
};

if (isMobile.any()) {
  document.body.classList.add('touch');

  let menuArrows = document.querySelectorAll('.menu-arrow');
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener('click', (e) => {
        menuArrow.parentElement.classList.toggle('active');
      });
    }
  }
} else {
  document.body.classList.add('pc');
}


// smooth scrolling
const menuLinks = document.querySelectorAll('.menu-sub-link[data-goto], .menu-link[data-goto], .btn[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const goToBlock = document.querySelector(menuLink.dataset.goto);
      const goToBlockValue = goToBlock.getBoundingClientRect().top + scrollY - document.querySelector('nav').offsetHeight;

      // remove menu body when going to a section
      if (iconMenu.classList.contains('active')) {
        document.body.classList.remove('lock');
        iconMenu.classList.remove('active');
        menuBody.classList.remove('active');
        menuBody.classList.remove('divider');
      }

      window.scrollTo({
        top: goToBlockValue,
        behavior: 'smooth'
      });
      e.preventDefault();
    }
  }
}


// hamburger icon
const iconMenu = document.querySelector('.menu-icon');
const menuBody = document.querySelector('.menu-body');
if (iconMenu) {
  iconMenu.addEventListener('click', function(e) {
    document.body.classList.toggle('lock');
    iconMenu.classList.toggle('active');
    menuBody.classList.toggle('active');
    menuBody.classList.toggle('divider');
  });
}


// accordion for pc
const burgerLink = document.querySelectorAll('.accordion');
burgerLink.forEach((e) => {
  e.addEventListener('click', (event) => {
    if (document.body.classList.contains('pc')) {
      const subMenu = event.target.parentElement.querySelector('.menu-sub-list');
      subMenu.classList.toggle('open');
    };
  })
});


// swiper slider
const swiper = new Swiper('.living-slider', {
  loop: true,
  speed: 300,

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },

  navigation: {
    enabled: false,
  },

  breakpoints: {
    992: {
      slidesPerView: 1.5,
      spaceBetween: 30,

      navigation: {
        enabled: true,
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      
      pagination: {
        enabled: false,
      }
    }
  }
});


new Swiper('.office-slider', {
  loop: false,
  slidesPerView: 1.3,
  spaceBetween: 10,
  speed: 100,
  navigation: {
    enabled: false,
  },

  breakpoints: {
    600: {
      slidesPerView: 2.4,
      spaceBetween: 20,

      navigation: {
        enabled: true,
        nextEl: '.office-button-next',
        prevEl: '.office-button-prev',
      },
    },

    992: {
      slidesPerView: 3.5,
      slidesPerGroup: 2,
      spaceBetween: 30,
      navigation: {
        enabled: true,
        nextEl: '.office-button-next',
        prevEl: '.office-button-prev',
      },
    }
  }
});
