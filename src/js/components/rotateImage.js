import * as SpriteSpin from 'spritespin';

export default function rotateImage() {
  const $spinner = $('.js-spinner');
  if (!$spinner.length) return;
  
  const src = $spinner.data('source');
  const frames = $spinner.data('frame');
  const width = +$spinner.data('width');
  const height = +$spinner.data('height');

  $spinner.spritespin({
    source: SpriteSpin.sourceArray(src, { frame: frames, digits: 3 }),
    width   : width,
    height  : height,
    sense: -1,
    animate: true,
    frameTime: 66,
    responsive: true,
    plugins: [
      '360',
      'drag'
    ]
  });
};
