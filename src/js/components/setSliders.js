// import slick from 'slick-carousel';
import Swiper from 'swiper';
import setLazy from './setLazy';

export default function setSliders() {
  const $sliders = $('.js-slider');

  if(!$sliders.length) return;

  $sliders.each((i, slider) => {
    const name = slider.getAttribute('data-slider');
    
    const $wrap = $(slider).closest('.slider__wrap');
    const prev = $wrap.find('.js-prev')[0];
    const next = $wrap.find('.js-next')[0];

    const options = {
      center: {
        centeredSlides: true,
        slidesPerView: 3,
        loop: true,
        navigation: {
          nextEl: next,
          prevEl: prev
        },
        breakpoints: {
          768: {
            slidesPerView: 1,
            centeredSlides: false
          }
        },
        on: {
          init: setLazy
        }
      },
      testimonials: {
        slidesPerView: 2,
        loop: true,
        spaceBetween: 30,
        navigation: {
          nextEl: next,
          prevEl: prev
        },
        breakpoints: {
          1200: {
            spaceBetween: 15,
          },
          992: {
            slidesPerView: 1
          }
        },
        on: {
          init: setLazy
        }
      }
    };

    // $(slider).slick(options[name]);

    const swiper = new Swiper(slider, options[name]);
  });
}
