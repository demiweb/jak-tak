import { $DOC } from '../constants';

export default function setCounter() {
  const btns = ['js-counter-increase', 'js-counter-decrease'];

  function increse($input, value) {
    value++;
    $input.val(value);
  };

  function decrease($input, value) {
    if (value <= 1) return;
    value--;
    $input.val(value);
  };

  btns.forEach(btn => {
    $DOC.on('click', `.${btn}`, (e) => {
      e.preventDefault();

      const $wrap = $(e.currentTarget).closest('.js-counter');
      const $input = $wrap.find('input');
      let value = +$input.val();

      if ($(e.currentTarget).hasClass(btns[1])) {
        increse($input, value);
      };
      if ($(e.currentTarget).hasClass(btns[0])) {
        decrease($input, value);
      };
    });
  });  
};
