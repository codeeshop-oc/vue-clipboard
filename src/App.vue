<script setup lang="ts">
// import VueClipboard from './components/VueClipboard.vue'
import VueClipboard from '/dist/vue-clipboard.js'
import '/dist/style.css'
</script>

<template>
  Clipboard Text is to save it
  <VueClipboard :logs="true" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
