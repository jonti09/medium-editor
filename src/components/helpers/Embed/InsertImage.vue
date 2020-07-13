<template>
  <div class="modal-container">
    <b-modal
      ref="image-upload-modal"
      hide-footer
      title="Choose the mode of upload"
    >
      <b-container class="text-center">
        <b-row v-if="!unsplashClicked">
          <b-col>
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
              <b-img
                ref="uploadImageRef"
                class="image-upload-option"
                thumbnail
                fluid
                :src="require('../../../assets/upload.png')"
                alt="Upload Image"
              />
            </file-upload>
          </b-col>
          <b-col v-if="unSplashEnabled" @click="unsplashClicked = true">
            <b-img
              class="image-upload-option"
              thumbnail
              fluid
              :src="require('../../../assets/unsplash.jpg')"
              alt="Unsplash"
            />
          </b-col>
        </b-row>
        <b-row v-else>
          <unsplash-image @image-uploaded="addImage" />
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script lang="ts">
import VueUploadComponent from "vue-upload-component";
// noinspection TypeScriptCheckImport
import _ from "underscore";
// noinspection TypeScriptCheckImport
import * as MediumEditor from "medium-editor";
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { BCol, BContainer, BImg, BModal, BRow } from "bootstrap-vue";
import UnsplashImage from "@/components/helpers/UnsplashImage.vue";

@Component({
  name: "InsertImage",
  components: {
    UnsplashImage,
    "file-upload": VueUploadComponent,
    BModal,
    BContainer,
    BRow,
    BCol,
    BImg
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

  @Watch("insert", { immediate: true, deep: true })
  nameChanged(newVal: object) {
    if (newVal["isToggle"]) {
      this.openModal();
    }
  }

  currentLine: HTMLElement;

  currentSize = "is-normal";

  position: object = {
    top: "0"
  };

  isShow = false;
  unsplashClicked = false;

  initializeExisting() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    setTimeout(() => {
      const focused = this.editor.getFocusedElement();
      if (!focused) return false;

      const editorImages = focused.getElementsByClassName("editor-image");
      _.map(editorImages, elm => {
        // Set Onclick to Show Image Size Handler
        elm.onclick = function() {
          setTimeout(() => {
            self.sizingHandler(this);
          });
        };
      });
    });
  }

  async addImage(image) {
    const data = await this.toBase64(image);
    if (this.insert["isToggle"]) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      this.editorRef.focus();
      this.editor.selectElement(this.insert["focusLine"]);
      this.editor.pasteHTML(
        `
          <div class="editor-image">
            <img src="${data}" alt=""/>
            <div class="editor-image-description"></div>
          </div>
          <br>
        `,
        { cleanAttrs: [], cleanTags: [], unwrapTags: [] }
      );

      this.currentLine = this.editor.getSelectedParentElement().previousElementSibling;
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
      this.unsplashClicked = false;
      this.insert["isToggle"] = false;
      this.insert["isShow"] = false;
      this.closeModal();
    }
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
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
    this.imageClick();
  }

  @Emit()
  imageClick() {
    return {
      position: this.position,
      currentLine: this.currentLine,
      isShow: this.isShow,
      currentSize: this.currentSize
    };
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

  async inputFile(newFile, oldFile) {
    if (newFile && !oldFile) {
      this.$refs.upload["active"] = true;

      this.addImage(newFile.file);
    }
  }

  get modalRef() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modalRef: any = this.$refs["image-upload-modal"];
    return modalRef;
  }

  get unSplashEnabled() {
    return process.env.VUE_APP_UNSPLASH_ENABLED === "true";
  }

  openModal() {
    this.modalRef.show();
    this.$nextTick(() => {
      if (!this.unSplashEnabled) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uploadImageInput: any = document.querySelector("#file");
        uploadImageInput?.click();
      }
    });
  }

  closeModal() {
    this.modalRef.hide();
  }

  mounted() {
    this.initializeExisting();
    if (this.insert["isToggle"]) {
      this.openModal();
    }
  }
}
</script>

<style lang="scss">
.editor-image {
  position: relative;

  img {
    opacity: 0.6;

    &:hover {
      cursor: pointer;
    }
  }

  .editor-image-description {
    position: absolute;
    text-align: center;
    width: 100%;
    top: 50%;
    -moz-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 2rem;
  }
}
</style>
