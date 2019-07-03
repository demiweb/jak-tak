import { ACTIVE } from '../constants';

class Carousel {
  constructor($carousel) {
    this.$carousel = $carousel;
    this.$slider = this.$carousel.find('.circle-gallery__slider');
    this.$prev = this.$carousel.find('.js-prev');
    this.$next = this.$carousel.find('.js-next');
    this.$slides = this.$slider.children();
    this.step = 40;
    this.angle = 0;
    this.current = 0;
  };

  init() {
    this._addClickEvents();
  };

  get currentAngle() {
    return this.$slider.css('transform');
  };

  rotateCarousel(e) {
    e.preventDefault();
    const $target = $(e.currentTarget);
    if ($target.hasClass('js-prev')) {
      this.direction = -1;
    };
    if ($target.hasClass('js-next')) {
      this.direction = 1;
    };

    if ($target.hasClass('circle-gallery__slide')) {
      this.next = $(e.currentTarget).index();
      this.direction = null;

      const difference = this.next - $(this.$slides[this.current]).index();

      console.log(difference);
      // this.angle = this.next * -this.step;
      const breakpoint = 360 - this.step*2;

      this.angle += (-(difference * this.step));

      if (difference * this.step >= breakpoint) {
        this.angle = (-(difference * this.step) + 360);
      };
      if (difference * this.step <= -breakpoint) {
        this.angle = (-(difference * this.step) - 360);
      };

      if (this.current === this.$slides.length - 1 && this.next === 0) {
        this.angle = 0;
        console.log(this.angle);
      } else if(this.current === this.$slides.length - 1 && this.next === 1) {
        this.angle = -this.step;
      };      
    };    

    if (this.direction === 1) {
      this.angle -= this.step;
      this.next = this.current + 1;
    } else if (this.direction === -1) {
      this.angle += this.step;
      this.next = this.current - 1;
    };

    if (this.next > this.$slides.length - 1) {
      this.next = 0;
    };
    if (this.next < 0) {
      this.next = this.$slides.length - 1;
    };

    if (this.angle === 360) {
      setTimeout(() => {
        this.angle = this.angle - 360;
        this.$slider.css({
          transition: 'none',
          transform: `rotate(${this.angle}deg)`
        });

        setTimeout(() => {
          this.$slider.css({ transition: '' });
        }, 100);
      }, 300);      
    } else {
      if (this.angle === -360) {

        setTimeout(() => {
          this.angle = this.angle + 360;
          this.$slider.css({
            transition: 'none',
            transform: `rotate(${this.angle}deg)`
          });

          setTimeout(() => {
            this.$slider.css({ transition: '' });
          }, 100);
        }, 300);         
      }
    };

    this.$slider.css({
      transform: `rotate(${this.angle}deg)`
    });
    this.$slides.css({
      transform: `rotate(${-this.angle}deg)`
    });

    this.$slides.removeClass(ACTIVE);
    $(this.$slides[this.next]).addClass(ACTIVE);

    this.current = this.next;    
  };

  _addClickEvents() {
    this.$prev.on('click', this.rotateCarousel.bind(this));
    this.$next.on('click', this.rotateCarousel.bind(this));
    this.$slides.on('click', this.rotateCarousel.bind(this));
  };
};

Carousel.classNames = {
  
};

export default function setCircleSlider() {
  const $carousel = $('.js-carousel');

  if(!$carousel.length) return;

  const carousel = new Carousel($carousel);
  carousel.init();
};
