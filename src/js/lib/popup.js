class Popup {
  constructor() {
    this.$popups = $('.'+Popup.classNames.target);
    this.$BODY = $('body');
    this.$DOC = $(document);
    this.$HTML = $('html');
  };

  init() {
    this._detectTouch();
    this._openPopup();
    this._closePopup();
  };

  destroy() {
    this._destroy();
  };

  get isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  };

  openFunc(e) {
    e.preventDefault();
    const $target = $(e.currentTarget);
    const openData = $target.data('popup-target');
    const $popup = $('.'+Popup.classNames.target+'[data-popup="'+openData+'"]');
    const $openedPopups = $('.'+Popup.classNames.target+':not([data-popup="' + openData + '"])');
    if ($(e.target).closest('.'+Popup.classNames.btnInOpen).length > 0) return;

    $openedPopups.removeClass(Popup.classNames.active);
    $popup.addClass(Popup.classNames.active);
    this.$BODY.addClass(Popup.classNames.noScroll);

    if (this.onOpen) {
      this.onOpen($target, $popup);
    };   
  };

  closeFunc(e) { 
    const $popup = $(e.currentTarget);
    const $close = $(e.target).closest('.'+Popup.classNames.close);

    if ($popup.has(e.target).length === 0 || $close.length > 0) {
      e.preventDefault();
      $popup.removeClass(Popup.classNames.active);
      if (!$close.hasClass(Popup.classNames.open)) {
        this.$BODY.removeClass(Popup.classNames.noScroll);
      };

      if (this.onClose) {
        const $btns = $('.'+Popup.classNames.open+'[data-popup-target="'+$popup.data('popup')+'"]');
        this.onClose($btns, $popup);
      };
    };    
  };

  _detectTouch() {
    if (this.isTouch) {
      this.$HTML.addClass(Popup.classNames.isTouch);
    };
  };
  
  _openPopup() {
    this.openFuncBind = this.openFunc.bind(this);
    this.$DOC.on('click', '.'+Popup.classNames.open, this.openFuncBind);
  };

  _closePopup() {
    this.closeFuncBind = this.closeFunc.bind(this);
    this.$DOC.on('click', '.'+Popup.classNames.target, this.closeFuncBind);
  };

  _destroy() {
    this.$DOC.off('click', '.'+Popup.classNames.open, this.openFuncBind);
    this.$DOC.off('click', '.'+Popup.classNames.target, this.closeFuncBind);

    this.$popups.removeClass(Popup.classNames.active);
    this.$BODY.removeClass(Popup.classNames.noScroll);
  };
};

Popup.classNames = {
  open: 'js-popup-open',
  target: 'js-popup',
  close: 'js-popup-close',
  active: 'is-active',
  noScroll: 'no-scroll',
  isTouch: 'is-touch',
  btnInOpen: 'js-btn-in-popup-open'
};

module.exports = Popup;
