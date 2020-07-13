<template>
  <div class="list-handler"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// noinspection TypeScriptCheckImport
import MediumEditor from "medium-editor";

@Component({
  name: "ListHandler"
})
export default class ListHandler extends Vue {
  @Prop()
  editor: MediumEditor;

  focusLine: object;
  currentLine: HTMLElement;
  isLastBeforeLi = false;

  subscribe() {
    this.editor.subscribe("editableKeydown", this.detectList);
    this.editor.subscribe("editableKeyup", this.detectList);
  }

  unsubscribe() {
    this.editor.unsubscribe("editableKeydown", this.detectList);
    this.editor.subscribe("editableKeyup", this.detectList);
  }

  detectList(e) {
    this.currentLine = this.editor.getSelectedParentElement();
    const matchList = this.currentLine.innerHTML.match(/^(-&nbsp;).*/g);

    if (matchList && matchList.length > 0) {
      const content = this.currentLine.innerHTML.replace(/^(-&nbsp;)/g, "");
      this.currentLine.innerHTML = "<ul><li>" + content + "</li></ul>";
    }

    const matchOlList = this.currentLine.innerHTML.match(/^(\d+.&nbsp;)/g);

    if (matchOlList && matchOlList.length > 0) {
      const content = this.currentLine.innerHTML.replace(/^(\d+.&nbsp;)/g, "");
      this.currentLine.innerHTML = "<ol><li>" + content + "</li></ol>";
    }

    const key = e.keyCode || e.charCode;
    if (key === 8 || key === 46) {
      this.isLastBeforeLi = this.currentLine.outerHTML === "<li><br></li>";

      if (this.isLastBeforeLi) {
        this.currentLine.outerHTML = "";
        this.editor.pasteHTML(`<p><br><br></p>`, {
          cleanAttrs: [],
          cleanTags: [],
          unwrapTags: []
        });
      }
    }
  }

  mounted() {
    this.subscribe();
  }

  destroyed() {
    this.unsubscribe();
  }
}
</script>
