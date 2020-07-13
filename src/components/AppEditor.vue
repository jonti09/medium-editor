<template>
  <div class="editor">
    <h4>This is an feature rich editor!!</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MediumEditor from "medium-editor/dist/js/medium-editor.min";
import "medium-editor/dist/css/medium-editor.min.css";
import "medium-editor/dist/css/themes/default.min.css";

@Component
export default class AppEditor extends Vue {
  editor = null;

  mounted() {
    this.editor = new MediumEditor(".editor");
  }
}
</script>

<style lang="scss" scoped>
[contenteditable]:focus {
  outline: 0 solid transparent;
}

.editor {
  border: none;
  margin: 20px;
  padding: 20px;
  background-color: whitesmoke;
}
</style>
