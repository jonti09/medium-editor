<template>
  <file-upload
    ref="upload"
    class="btn-toggle"
    extensions="gif,jpg,jpeg,png,webp"
    accept="image/png,image/gif,image/jpeg,image/webp"
    :multiple="true"
    :size="1024 * 1024 * 10"
    v-model="insert['files']"
    @input-filter="inputFilter"
    @input-file="inputFile"
  >
    <font-awesome-icon :icon="['far', 'images']" />
  </file-upload>
</template>

<script lang="ts">
import VueUploadComponent from "vue-upload-component";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faImages } from "@fortawesome/free-regular-svg-icons";
// noinspection TypeScriptCheckImport
import _ from "underscore";
// noinspection TypeScriptCheckImport
import * as MediumEditor from "medium-editor";
import { Component, Prop, Vue } from "vue-property-decorator";

library.add(faImages);

@Component({
  name: "InsertImage",
  components: {
    "file-upload": VueUploadComponent,
    "font-awesome-icon": FontAwesomeIcon
  }
})
export default class InsertImage extends Vue {
  @Prop()
  editor: MediumEditor;

  @Prop()
  insert: object;

  @Prop()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorRef: any;

  @Prop()
  handler: Function;

  currentLine: HTMLElement;

  currentSize = "is-normal";

  position: object = {
    top: "0"
  };

  isShow = false;

  initializeExisting() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    setTimeout(() => {
      const focused = this.editor.getFocusedElement();
      if (!focused) return false;

      const editorImages = focused.getElementsByClassName("editor-image");
      _.map(editorImages, elm => {
        // Set Onclick to Show Image Size Handler
        console.log("elm", elm);
        elm.onmouseover = function() {
          setTimeout(() => {
            self.sizingHandler(this);
          });
        };
      });
    });
  }

  addImage(file) {
    if (this.insert["isToggle"]) {
      const reader = new FileReader();
      reader.onload = () => {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        this.editorRef.focus();
        this.editor.selectElement(this.insert["focusLine"]);
        this.editor.pasteHTML(
          `
            <div class="editor-image">
                <img src="${reader.result}"  alt=""/>
            </div>
            <div class="editor-image-description"><br></div>
            <br />
          `,
          { cleanAttrs: [], cleanTags: [], unwrapTags: [] }
        );

        this.currentLine = this.editor.getSelectedParentElement().previousElementSibling.previousElementSibling;
        const currentImg = this.currentLine.querySelector("img");
        const currentPos = currentImg?.getBoundingClientRect();

        if (currentPos) {
          window.scrollTo(0, currentPos.top - currentPos.x);
          this.currentLine.onclick = function() {
            setTimeout(() => {
              self.sizingHandler(this);
            });
          };
        }
        this.insert["isShow"] = false;
      };
      reader.readAsDataURL(file.file);
    }
  }

  sizingHandler(elm) {
    const className = elm.className;
    elm.className = className.replace("is-focus", "") + " is-focus";
    if (className.indexOf("expand") > -1) {
      this.currentSize = "is-expand";
    } else if (className.indexOf("full") > -1) {
      this.currentSize = "is-full";
    } else {
      this.currentSize = "is-normal";
    }

    const img = elm.querySelector("img");
    this.currentLine = elm;
    this.isShow = true;
    const currentPos = img.getBoundingClientRect();
    this.position["top"] = currentPos.top + "px";
    this.$emit("imageClick", {
      position: this.position,
      currentLine: this.currentLine,
      isShow: this.isShow,
      currentSize: this.currentSize
    });
  }

  inputFilter(newFile, oldFile, prevent) {
    if (newFile && !oldFile) {
      if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
        return prevent();
      }
      if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
        return prevent();
      }
    }
  }

  inputFile(newFile, oldFile) {
    if (newFile && !oldFile) {
      this.$refs.upload["active"] = true;
      this.addImage(newFile);
    }
  }

  mounted() {
    this.initializeExisting();
  }
}
</script>
