<script>
import Vue from 'vue';
import Clipboard from '@/Clipboard.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    Clipboard
  }
});
</script>

<template>
  <div id="app">
    <Clipboard :logs="true" />
  </div>
</template>
