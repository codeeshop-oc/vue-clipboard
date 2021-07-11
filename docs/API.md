# VueClipboard

## Props

### Passing Setting Props

```html
<template>
  <Clipboard :logs="true" :text="'Enjoy a piece of Cake Everyday'" />
</template>
```

### All Props

Check out [demo examples](https://codeeshop-oc.github.io/vue-clipboard/) for settings usage.

| Prop name        | Description                                                                                                                                                                      | Type    | Values                | Default      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------- | ------------ |
| logs             | enables logging in case of errors                    | boolean | -                     | false        |
| text             | copy the text passed in the prop if the text prop is not passed it copies selected text from mouse or cursor                           | string  | -                     | ''           |

### Listening to Events

```html
<template>
  <Clipboard @clicked="onClicked" />
</template>
<script>
  export default {
    methods: {
      onClicked() {
        console.log('our button is clicked')
      },
    },
  }
</script>
```

### All Events

| Event name    | Description                         | Arguments                                  |
| ------------- | ----------------------------------- | ------------------------------------------ |
| clicked       | text data is saved in the clipboard | -                                          |

## Slots

### Customizing Button

```html
<template>
  <Clipboard @clicked="onClicked">
    <template #button>
      <button class="btn">Copy</button>
    </template>
  </Clipboard>
</template>
```

### All Slots

| Name         | Description                           | Bindings                                     |
| ------------ | ------------------------------------- | -------------------------------------------- |
| button       | replaces the default button           |                                              |
