<template>
  <file-upload
    class="btn-toggle"
    :post-action="uploadUrl"
    extensions="gif,jpg,jpeg,png,webp"
    accept="image/png,image/gif,image/jpeg,image/webp"
    :multiple="true"
    :size="1024 * 1024 * 10"
    v-model="insert.files"
    @input-filter="inputFilter"
    @input-file="inputFile"
    ref="upload"
  >
    <font-awesome-icon :icon="['far', 'images']" />
  </file-upload>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ImageHandler"
})
export default class ImageHandler extends Vue {}
</script>
