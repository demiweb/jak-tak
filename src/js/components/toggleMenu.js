import { $DOC, $BODY, $WIN, ACTIVE, NOSCROLL, HIDDEN } from '../constants';
import { debounce, throttle } from 'throttle-debounce';

class Burger {
  init() {
    $DOC.on('click', `.${Burger.classNames.burger}`, this.toggle.bind(this));
  };

  toggle(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = e.currentTarget.getAttribute('data-menu-target');
    const $target = name 
      ? $(`.${Burger.classNames.menu}[data-menu="${name}"]`)
      : $(`.${Burger.classNames.menu}`);

    $(e.currentTarget).toggleClass(ACTIVE);
    $target.toggleClass(ACTIVE);

    if (this.onToggle) {
      this.onToggle($(e.currentTarget), $target);
    };
  };

  close() {
    const $burgers = $(`.${Burger.classNames.burger}`);
    const $targets = $(`.${Burger.classNames.menu}`);

    if ($burgers.length > 0 && $targets.length > 0) {
      $burgers.removeClass(ACTIVE);
      $targets.removeClass(ACTIVE);
      
      if (this.onClose) {
        this.onClose($burgers, $targets);
      };
    };   
  };
};

Burger.classNames = {
  burger: 'js-burger',
  menu: 'js-menu'
};

export default function toggleMenu() {
  const $btns = $('.js-burger');
  if (!$btns.length) return;

  function setBurgerDataTarget() {    
    $btns.each((i, btn) => {      
      if (btn.hasAttribute('data-menu-mob-target')) {
        const mobTarget = btn.getAttribute('data-menu-mob-target');
        const descTarget = btn.getAttribute('data-menu-desctop-target');

        if (window.matchMedia('(max-width: 1199px)').matches) {
          btn.setAttribute('data-menu-target', mobTarget);
        } else {
          btn.setAttribute('data-menu-target', descTarget);
        };
      };      
    });    
  };

  setBurgerDataTarget();

  const setBurgerDataTargetDebounced = debounce(66, setBurgerDataTarget);
  $WIN.on('resize', setBurgerDataTargetDebounced);  

  const burger = new Burger();
  burger.onToggle = ($burger, $target) => {
    if (window.matchMedia('(max-width: 1199px)').matches) {
      $BODY.toggleClass(NOSCROLL);
    };
  };
  burger.onClose = ($burgers, $targets) => {
    $BODY.removeClass(NOSCROLL);
  };
  burger.init();

  $DOC.on('click', (e) => {
    const $menu = $(e.target).closest('.js-menu');
    if ($(e.target).closest('.js-popup-open').length > 0) return;

    if (window.matchMedia('(max-width: 1199px)').matches) {
      if ($(e.target).is($('.js-menu')) || $(e.target).is($menu.find('.js-close'))) {
        burger.close();
      };
    };

    if (!$menu.length) {
      burger.close();
    };    
  });

  // toggle contacts on scroll
  let lastScrollTop = 0;

  function toggleContactsOnScroll() {
    const $contacts = $('.js-header-contacts');

    if(!$contacts.length) return;

    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
      $contacts.addClass(HIDDEN);
    } else {
      $contacts.removeClass(HIDDEN);
    };
    lastScrollTop = st <= 0 ? 0 : st;
  };

  const toggleContactsOnScrollThrottled = throttle(66, toggleContactsOnScroll);
  $WIN.on('scroll', toggleContactsOnScrollThrottled);
};
