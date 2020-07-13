<template>
  <div class="medium-editor-container">
    <div
      class="editor read-only has-content"
      ref="content"
      v-html="content"
    ></div>
  </div>
</template>

<script lang="ts">
// noinspection TypeScriptCheckImport
import Gist from "pure-gist-embed";
// noinspection TypeScriptCheckImport
import _ from "underscore";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "ReadMode"
})
export default class ReadMode extends Vue {
  @Prop()
  content: string;

  render() {
    this.renderEmbed();
  }

  renderEmbed() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const elem: any = this.$refs.content;
    const editorEmbeds = elem.getElementsByClassName("editor-embed");
    _.map(editorEmbeds, elm => {
      const link = elm.getElementsByTagName("a")[0];
      const nextElm = elm.nextElementSibling;

      if (nextElm.className.indexOf("gist-embed-iframe") > -1) {
        nextElm.outerHTML = "";
      }

      if (link) {
        const url = link.getAttribute("href");
        this.renderEmbedElm(url, elm);
      }
    });
  }

  renderEmbedElm(url, elm) {
    Gist.embed(url, elm);
  }

  mounted() {
    this.render();
  }
}
</script>
