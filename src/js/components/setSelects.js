import Select from 'select-custom';

export default function setSelects() {
  const $selects = $('.js-select');

  if(!$selects.length) return;

  $selects.each((i, select) => {
    const name = select.dataset.type;
    const options = {
      'with_icons': {
        optionBuilder: (option, customOption) => {
          const icon = option.dataset.icon;
          if (!icon) return;
          const inner = customOption.innerHTML;
          customOption.innerHTML = `<div class="custom-select__option-icon">${icon}</div> ${inner}`;
        }
      }
    };

    const sel = new Select(select, options[name]);
    sel.init();

    // elements
    const $wrap =  $(select).closest('.custom-select');
    const $options = $(select).find('option');
    const $customOptions = $wrap.find('.custom-select__option');

    function removeOptionsDataIconAttrs() {
      $options.each((i, option) => {
        option.removeAttribute('data-icon');
      });

      $customOptions.each((i, option) => {
        option.removeAttribute('data-icon');
      });
    };

    removeOptionsDataIconAttrs();
  });  
};
