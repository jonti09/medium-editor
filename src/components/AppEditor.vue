<template>
  <editor
    v-model="content"
    :read-only="false"
    :pre-fill="preFill"
    :options="options"
    :onChange="onChange"
    v-on:uploaded="uploadCallback"
  >
  </editor>
</template>

<script lang="ts">
import Editor from "./Editor.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "AppEditor",
  components: {
    Editor
  }
})
export default class AppEditor extends Vue {
  content = ``;
  preFill = `<h1><b>Medium Editor</b></h1>`;
  options: object = {
    uploadURL: ""
  };

  onChange = () => {
    // console.log(this.content);
  };

  uploadCallback = url => {
    // console.log("url", url);
  };
}
</script>
