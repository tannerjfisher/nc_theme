/**
 * @file
 * Slider Script Boilerplate Default.
 */

// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// init Swiper:
const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 600,
  autoplay: false,
  simulateTouch: false,
});

swiper.on('slideChange', function (e) {
  e.scrollLeft = 0;
  e.scrollTop = 0;
  //e.slideTo( event[ 0 ].activeIndex );
});
