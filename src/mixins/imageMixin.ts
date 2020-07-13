import { Component, Vue } from "vue-property-decorator";

@Component
export default class ImageMixin extends Vue {
  changeHeight(img, size = "is-normal") {
    // reset the size
    img.parentElement.style.height = "100%";
    img.parentElement.style.width = "100%";
    // configure the new size based on selection
    const heightMapping = {
      "is-full": "100vh",
      "is-expand": `${img.height / 2}px`,
      "is-normal": `${img.height / 3}px`
    };
    img.parentElement.style.height = heightMapping[size];
    return img;
  }

  changeOpacity(img, opacity = 100) {
    let layerNode = img.parentElement.querySelector(".layer");
    if (!layerNode) {
      const _layerNode = document.createElement("div");
      _layerNode.className = "layer";
      img.parentElement.appendChild(_layerNode);
    }
    layerNode = img.parentElement.querySelector(".layer");
    layerNode.style.backgroundColor = `rgba(0,0,0,${(1 - opacity / 100).toFixed(
      2
    )})`;
    return img;
  }

  resetImageContainer(handler) {
    const imgElem = handler["currentLine"].querySelector("img").parentElement;
    imgElem.style.width = "100%";
    imgElem.style.height = "auto";
  }
}
