import { debounce } from 'throttle-debounce';

class TextareaHeight {
  constructor(element, { focusedElement, hasFocus = 'has-focus' }) {
    this.TEXTAREA = element;
    this.focusedElement = focusedElement;
    this.FOCUS = hasFocus;
  };

  adjustHeight(textareaElement, minHeight) {
    let outerHeight = parseInt(window.getComputedStyle(textareaElement).height, 10);
    let diff = outerHeight - textareaElement.clientHeight;

    // перестает дергаться в ИЕ при вводе, но при удалении текста может некорректно считаться высота
    // if (window.navigator.userAgent.indexOf('MSIE ') > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    //   textareaElement.style.height = Math.max(minHeight, textareaElement.scrollHeight + diff) + 'px';
    // } else {
    //   textareaElement.style.height = 0;
    //   textareaElement.style.height = Math.max(minHeight, textareaElement.scrollHeight + diff) + 'px';
    // };

    textareaElement.style.height = 0;
    textareaElement.style.height = Math.max(minHeight, textareaElement.scrollHeight + diff) + 'px';

  };

  addClassName() {
    this.focusedElement.classList.add(this.FOCUS);
  };

  removeClassName() {
    this.focusedElement.classList.remove(this.FOCUS);
  };

  init() {
    this._setHeight();
    this._setFocusClassName();
  };

  _setHeight() {

    let minHeight = this.TEXTAREA.scrollHeight;

    this.TEXTAREA.addEventListener('input', () => {
      this.adjustHeight(this.TEXTAREA, minHeight);
    });

    let setHeightOnResize = debounce(66, (e) => {
      this.adjustHeight(this.TEXTAREA, minHeight);
    });

    window.addEventListener('resize', setHeightOnResize);

  };

  _setFocusClassName() {
    if (this.focusedElement) {
      this.TEXTAREA.addEventListener('focus', this.addClassName.bind(this));
      this.TEXTAREA.addEventListener('blur', this.removeClassName.bind(this));
    };    
  };
};

export default function setTextareaAutoHeight() {
  const textareas = [].slice.call(document.querySelectorAll('.js-textarea'));

  if(!textareas.length) return;

  textareas.forEach(textarea => {
    const taHeight = new TextareaHeight(textarea, {});
    taHeight.init();
  });  
};
