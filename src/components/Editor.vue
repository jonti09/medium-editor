<template>
  <div>
    <!-- Editor Mode -->
    <div class="medium-editor-container" v-if="!readOnly">
      <insert-embed
        v-if="editor"
        :uploadUrl="options.uploadUrl"
        :onChange="triggerChange"
        :editorRef="$refs.editor"
        :editor="editor"
        v-on:uploaded="uploadedCallback"
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

<script>
import MediumEditor from "medium-editor";
import InsertEmbed from "./libs/InsertEmbed";
import ListHandler from "./libs/ListHandler";
import ReadMode from "./libs/ReadMode";
import _ from "underscore";

export default {
  name: "medium-editor",
  data() {
    return {
      editor: null,
      defaultOptions: {
        forcePlainText: false,
        placeholder: {
          text: "Write something great!!"
        },
        toolbar: {
          buttons: ["bold", "italic", "quote", "h1", "h2", "h3", "h4", "h5"]
        }
      },
      hasContent: false
    };
  },
  props: ["options", "onChange", "preFill", "readOnly"],
  computed: {
    editorOptions() {
      return _.extend(this.defaultOptions, this.options);
    },
    editorClass() {
      return {
        "has-content": this.hasContent
      };
    }
  },
  components: {
    InsertEmbed,
    ListHandler,
    ReadMode
  },
  mounted() {
    if (!this.readOnly) {
      this.createElm();
    }
  },
  methods: {
    createElm() {
      this.editor = new MediumEditor(this.$refs.editor, this.editorOptions);

      if (this.preFill) {
        this.hasContent = /<[a-z][\s\S]*>/i.test(this.preFill);
        this.$refs.editor.focus();
      }

      this.editor.subscribe("editableInput", this.triggerChange);
    },
    destroyElm() {
      this.editor.destroy();
    },
    triggerChange() {
      const content = this.editor.getContent();

      setTimeout(() => {
        this.hasContent = /<[a-z][\s\S]*>/i.test(content);
      }, 0);

      this.$emit("input", content);

      if (this.onChange) {
        this.onChange(content);
      }
    },
    uploadedCallback(url) {
      console.log("callback");
      this.$emit("uploaded", url);
    }
  },
  destroyed() {
    this.destroyElm();
  }
};
</script>
