<template>
  <div
    class="image-handler"
    v-if="handler['isShow']"
    v-bind:style="handler['position']"
  >
    <div class="image-handler-menu">
      <button class="btn-toggle" v-on:click="imageSizing('is-normal')">
        <img
          :src="
            handler['currentSize'] === 'is-normal'
              ? require('../../../assets/icons/image-align-normal-active.png')
              : require('../../../assets/icons/image-align-normal.png')
          "
          alt=""
        />
      </button>
      <button class="btn-toggle" v-on:click="imageSizing('is-expand')">
        <img
          :src="
            handler['currentSize'] === 'is-expand'
              ? require('../../../assets/icons/image-align-expand-active.png')
              : require('../../../assets/icons/image-align-expand.png')
          "
          alt=""
        />
      </button>
      <button class="btn-toggle" v-on:click="imageSizing('is-full')">
        <img
          :src="
            handler['currentSize'] === 'is-full'
              ? require('../../../assets/icons/image-align-full-active.png')
              : require('../../../assets/icons/image-align-full.png')
          "
          alt=""
        />
      </button>
      <button id="adjust-opacity" class="btn-toggle">
        <font-awesome-icon icon="adjust" />
      </button>
      <b-popover target="adjust-opacity" placement="bottom" triggers="click">
        <vue-slider
          :value="handler['opacity']"
          v-model="handler['opacity']"
          @change="opacityChange"
        />
      </b-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { BButton, BPopover } from "bootstrap-vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAdjust } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import VueSlider from "vue-slider-component";

library.add(faAdjust);
@Component({
  name: "ImagePosition",
  components: {
    BButton,
    BPopover,
    FontAwesomeIcon,
    VueSlider
  }
})
export default class ImagePosition extends Vue {
  @Prop()
  handler: object;

  imageSizing = size => {
    this.handler["currentSize"] = size;
    this.handler["currentLine"].className = "editor-image " + size;
    this.onPositionChange();
  };

  @Emit()
  onPositionChange() {
    return this.handler;
  }

  @Emit()
  resetImageContainer() {
    return this.handler;
  }

  @Emit()
  opacityChange() {
    return this.handler;
  }
}
</script>

<style lang="scss">
$themeColor: #292922;

/* import theme style */
@import "~vue-slider-component/lib/theme/default.scss";
.vue-slider {
  width: 250px !important;
}
</style>

<style lang="scss" scoped>
.btn-toggle {
  svg {
    font-size: 0.8rem;
    color: white;
    display: block;
    width: 80%;
    margin: auto;
    height: auto;
  }
}
</style>
