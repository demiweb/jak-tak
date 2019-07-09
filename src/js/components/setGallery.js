import { $DOC, $WIN, ACTIVE } from '../constants';
import { debounce } from 'throttle-debounce';

import lightGallery from 'lightgallery';
import 'lg-zoom';
import 'lg-fullscreen';
import 'lg-autoplay';
import 'lg-share';
import 'lg-thumbnail';
import 'lg-video';

export default function setGallery() {
  const $lg = $('.js-lightgallery');
  if(!$lg.length) return;

  $lg.lightGallery({
    exThumbImage: 'data-exthumbimage',
    selector: '.swiper-slide:not(.swiper-slide-duplicate)'
  }); 
};
