<template>
  <div>
    <!-- Editor Mode -->
    <div class="medium-editor-container" v-if="!readOnly">
      <insert-embed
        v-if="editor"
        :uploadUrl="options['uploadUrl']"
        :onChange="triggerChange"
        :editorRef="$refs.editor"
        :editor="editor"
      ></insert-embed>
      <list-handler
        v-if="editor"
        :editor="editor"
        :onChange="triggerChange"
      ></list-handler>
      <div
        class="editor"
        v-bind:class="editorClass"
        v-html="preFill"
        ref="editor"
      ></div>
    </div>
    <!-- Read Only Mode -->
    <read-mode v-if="readOnly" :content="preFill"></read-mode>
  </div>
</template>

<script lang="ts">
// noinspection TypeScriptCheckImport
import MediumEditor from "medium-editor";
require("medium-editor/dist/css/themes/default.min.css");
require("medium-editor/dist/css/medium-editor.min.css");
// noinspection TypeScriptCheckImport
import _ from "underscore";
import InsertEmbed from "./helpers/InsertEmbed.vue";
import ListHandler from "./helpers/ListHandler.vue";
import ReadMode from "./helpers/ReadMode.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Editor",
  components: {
    InsertEmbed,
    ListHandler,
    ReadMode
  }
})
export default class Editor extends Vue {
  @Prop()
  options: object;

  @Prop()
  onChange: Function;

  @Prop()
  preFill: string;

  @Prop({ default: false })
  readOnly: boolean;

  editor: MediumEditor = null;
  defaultOptions: object = {
    forcePlainText: false,
    placeholder: {
      text: "Write something great!!"
    },
    toolbar: {
      buttons: ["bold", "italic", "quote", "h1", "h2", "h3", "h4", "h5"]
    }
  };
  hasContent = false;

  get editorOptions() {
    return _.extend(this.defaultOptions, this.options);
  }

  get editorClass() {
    return {
      "has-content": this.hasContent
    };
  }

  createElm() {
    this.editor = new MediumEditor(this.$refs.editor, this.editorOptions);

    if (this.preFill) {
      this.hasContent = /<[a-z][\s\S]*>/i.test(this.preFill);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ref: any = this.$refs.editor;
      ref.focus();
    }

    this.editor.subscribe("editableInput", this.triggerChange);
  }

  destroyElm() {
    this.editor.destroy();
  }

  triggerChange() {
    const content = this.editor.getContent();

    setTimeout(() => {
      this.hasContent = /<[a-z][\s\S]*>/i.test(content);
    }, 0);

    this.$emit("input", content);

    if (this.onChange) {
      this.onChange(content);
    }
  }

  mounted(): void {
    if (!this.readOnly) {
      this.createElm();
    }
  }

  destroyed(): void {
    this.destroyElm();
  }
}
</script>
