<template>
  <div id="app">
    <app-editor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppEditor from "./components/AppEditor.vue";

@Component({
  components: {
    AppEditor
  }
})
export default class App extends Vue {}
</script>
<style lang="css">
@import "~bulma/css/bulma.css";
@import "~medium-editor/dist/css/medium-editor.css";
@import "./themes/default.css";
</style>
