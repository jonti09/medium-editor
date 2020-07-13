import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ImageMixin extends Vue {
  changeHeight (img, size = 'is-normal') {
    // reset the size
    img.parentElement.style.height = '100%';
    img.parentElement.style.width = '100%';
    // configure the new size based on selection
    const heightMapping = {
      'is-full': img.height,
      'is-expand': img.height / 2,
      'is-normal': img.height / 3
    };
    if (heightMapping[size] > 0) {
      img.parentElement.style.height = heightMapping[size] + 'px';
    }
    return img;
  }

  changeOpacity (img, opacity = 100) {
    img.style.opacity = (opacity / 100).toFixed(2);
    return img;
  }

  resetImageContainer (handler) {
    const imgElem = handler['currentLine'].querySelector('img').parentElement;
    imgElem.style.width = '100%';
    imgElem.style.height = 'auto';
  }
}
