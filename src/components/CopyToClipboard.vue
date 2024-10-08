<template>
  <div class="copy-button">
    <textarea
      :value="content"
      ref="content"
      type="text"
      tabindex="-1"
      aria-hidden="true"
      readonly
    />
    <button type="button" @click="copy" title="Copy to clipboard">📋</button>
    <div class="success" ref="success" v-if="show">👍</div>
  </div>
</template>

<script src="./CopyToClipboard.js"></script>
<style src="./CopyToClipboard.css" scoped></style>
