<script>
import { defineComponent } from 'vue';
import Clipboard from '@/clipboard.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    Clipboard
  }
});
</script>

<template>
  <div id="app">
    <clipboard />
  </div>
</template>
