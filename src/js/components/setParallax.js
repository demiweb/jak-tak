import Parallax from 'parallax-js';

export default function setParallax() {
  const scenes = [].slice.call(document.querySelectorAll('.js-parallax-scene'));

  if(!scenes.length) return;

  scenes.forEach(scene => {
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true
    });
  });  
};
