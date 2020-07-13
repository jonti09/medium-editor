<template>
  <div id="app">
    <editor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Editor from "./components/AppEditor.vue";

@Component({
  components: {
    Editor
  }
})
export default class App extends Vue {}
</script>
