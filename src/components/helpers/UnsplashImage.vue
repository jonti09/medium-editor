<template>
  <div class="col-12">
    <b-input-group>
      <b-form-input
        v-model="searchValue"
        type="text"
        debounce="500"
        id="search-field"
        placeholder="Search for Image"
      />
    </b-input-group>
    <div class="search-result-container">
      <template v-if="searching">
        <b-spinner label="Spinning"></b-spinner>
      </template>
      <template v-if="info['class'] !== 'danger'">
        <b-card-group columns>
          <b-card
            class="card"
            v-for="image in images"
            :key="image['id']"
            :img-src="image['urls']['regular']"
            :img-alt="image['alt_description']"
            img-top
            no-body
            @click="getAndBuildImage(image['urls']['full'])"
          >
          </b-card>
        </b-card-group>
      </template>
      <template v-else>
        <div class="message" :class="info['class']">
          {{ info["message"] }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  BCard,
  BCardGroup,
  BForm,
  BFormInput,
  BInputGroup,
  BSpinner
} from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

library.add(faSearch);

@Component({
  name: "UnsplashImage",
  components: {
    BCard,
    BCardGroup,
    BForm,
    BFormInput,
    BInputGroup,
    BSpinner,
    FontAwesomeIcon
  }
})
export default class UnsplashImage extends Vue {
  searchValue = "";
  images = [];
  info = {
    message: "Pleas enter a search term (search will start automatically)",
    class: "info"
  };
  searching = false;

  @Watch("searchValue")
  searchUpdated(value: string) {
    this.fetchImages(value);
  }

  getAccessToken() {
    return process.env.VUE_APP_UNSPLASH_ACCESS_KEY;
  }

  updateDisplay(message: string, _class: string, searching = true) {
    this.info = {
      message: message,
      class: _class
    };
    this.searching = searching;

    if (searching) {
      this.images.length = 0;
    }
  }

  async fetchImages(searchVal) {
    this.updateDisplay("Fetching Images...", "info");
    const url = `https://api.unsplash.com/search/photos/?query=${searchVal}&client_id=${this.getAccessToken()}`;
    try {
      const { data } = await axios.get(url);
      this.images = data["results"];
      this.searching = false;
    } catch (e) {
      this.updateDisplay(
        "Unsplash did not reply with any image...",
        "danger",
        false
      );
    }
  }

  async getAndBuildImage(url) {
    try {
      this.updateDisplay("Uploading the image", "info");
      const { data } = await axios.get(url, { responseType: "blob" });
      this.$emit("image-uploaded", new File([data], url));
    } catch (e) {
      this.updateDisplay(
        "Could not load that image, try a different one",
        "danger",
        false
      );
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result-container {
  margin-top: 25px;

  .card {
    cursor: pointer;
  }

  .message {
    text-align: center;
    padding: 10px;
  }
}
</style>
