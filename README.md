# vue-clipboard

> 🚥 Copy the text data in clipboard from element selection or pass the text data 

## 🚚 Installation

### yarn/npm

```bash
# npm
npm i vue-clipboard
# yarn
yarn add vue-clipboard
```

### cdn

```bash
# latest
https://unpkg.com/@codeeshop/vue-clipboard
```

<br/>

## 🚀 Quick Start

```html
<template>
  <div>
    <Clipboard :arrows="true" :dots="true">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </Clipboard>
  </div>
</template>

<script>
  import Clipboard from 'vue-clipboard'
  
  export default {
    name: 'MyComponent',
    components: { Clipboard },
  }
</script>
```

<br/>

## 🔖 License

This software is licensed under the [MIT](https://github.com/codeeshop-oc/vue-clipboard/blob/main/LICENSE).
