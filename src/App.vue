<template>
  <div id="app">
    <dark-mode-switch class="dark-mode-switch" v-if="darkModeSupported" />
    <app-editor class="editor-container" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppEditor from "@/components/AppEditor.vue";
import DarkModeSwitch from "@/helpers/DarkModeSwitch.vue";

@Component({
  name: "App",
  components: {
    DarkModeSwitch,
    AppEditor
  }
})
export default class App extends Vue {
  get darkModeSupported() {
    return process.env.VUE_APP_DARK_MODE_SUPPORTED === "true";
  }
}
</script>
<style lang="css">
@import "~bulma/css/bulma.css";
@import "./themes/default.css";
</style>

<style lang="scss">
:root {
  --primary-color: #302ae6;
  --secondary-color: #536390;
  --font-color: #424242;
  --bg-color: #fff;
  --heading-color: #292922;
  --inverted-color: #9a97f3;
  --inverted-bg-color: #161625;
}

[data-theme="dark"] {
  --primary-color: #9a97f3;
  --secondary-color: #818cab;
  --font-color: #e1e1ff;
  --bg-color: #161625;
  --heading-color: #818cab;
  --inverted-color: #302ae6;
  --inverted-bg-color: #fff;
}

body {
  background-color: var(--bg-color) !important;
  color: var(--font-color) !important;
  min-height: 100vh;
}

.modal-dialog {
  width: 65% !important;
  max-width: 65% !important;

  .modal-content {
    color: var(--font-color) !important;
    background-color: var(--bg-color) !important;
  }

  .close {
    color: var(--inverted-bg-color);

    &:hover {
      color: var(--inverted-bg-color);
    }
  }
}
</style>

<style lang="scss" scoped>
.editor-container {
  background-color: var(--bg-color);
}

.dark-mode-switch {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 999;
}
</style>
