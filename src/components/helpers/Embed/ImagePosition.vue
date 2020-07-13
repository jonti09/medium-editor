<template>
  <div
    class="image-handler"
    v-if="handler['isShow']"
    v-bind:style="handler['position']"
  >
    <div class="image-handler-menu">
      <button class="btn-toggle" v-on:click="imageSizing('is-normal')">
        <img
          src="../../../assets/icons/image-align-normal-active.png"
          v-if="handler['currentSize'] === 'is-normal'"
          alt=""
        />
        <img
          src="../../../assets/icons/image-align-normal.png"
          v-if="handler['currentSize'] !== 'is-normal'"
          alt=""
        />
      </button>
      <button class="btn-toggle" v-on:click="imageSizing('is-expand')">
        <img
          src="../../../assets/icons/image-align-expand-active.png"
          v-if="handler['currentSize'] === 'is-expand'"
          alt=""
        />
        <img
          src="../../../assets/icons/image-align-expand.png"
          v-if="handler['currentSize'] !== 'is-expand'"
          alt=""
        />
      </button>
      <button class="btn-toggle" v-on:click="imageSizing('is-full')">
        <img
          src="../../../assets/icons/image-align-full-active.png"
          v-if="handler['currentSize'] === 'is-full'"
          alt=""
        />
        <img
          src="../../../assets/icons/image-align-full.png"
          v-if="handler['currentSize'] !== 'is-full'"
          alt=""
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "ImagePosition"
})
export default class ImagePosition extends Vue {
  @Prop()
  handler: object;

  imageSizing = size => {
    this.handler["currentSize"] = size;
    this.handler["currentLine"].className = "editor-image " + size;
  };

  @Emit()
  onPositionChange() {
    return;
  }
}
</script>
