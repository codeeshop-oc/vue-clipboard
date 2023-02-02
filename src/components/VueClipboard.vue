<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'VueClipboard',
  props: {
    text: {
      type: String,
      default: ''
    },
    logs: {
      type: Boolean,
      default: false
    },
    enableMilliSeconds: {
      type: Number,
      default: 5
    }
  },
  emits: ['clicked'],
  setup(props, { emit }) {
    const disabled = ref(false)
    const toggleBtn = ref(false)

    const enableBtn = function () {
      // No milliseconds means no need to change it
      if(!props.enableMilliSeconds) return
      setTimeout(() => {
        toggleBtn.value = false
        disabled.value = false
      }, props.enableMilliSeconds * 100)
    }

    return {
      disabled: disabled,
      toggleBtn: toggleBtn,
      enableBtn,
      copyTextToClipboard(current_text: string | null) {
        if(disabled.value) return
        disabled.value = true

        if(!current_text && window.getSelection) {
          const temp = window.getSelection()
          if(temp != null) {
            current_text = temp.toString()
          }
        }

        if(current_text == null) current_text = ''

        enableBtn()

        if (navigator.clipboard) {
          navigator.clipboard.writeText(current_text).then(function () {
            emit('clicked', current_text)
            if (props.logs) {
              console.debug('Async: Copying to clipboard was successful!');
            }
          }, function (err) {
            if (props.logs) {
              console.error('Async: Could not copy text: ', err);
            }
          });
        } else {
          console.error('Could not copy text: navigator.clipboard is not available');
        }
      },
    }
  }
})

</script>

<template>
  <div class="clipboard">
    <a @click.stop="copyTextToClipboard(text)" :class="disabled ? 'disabled' : 'pointer'">
      <slot name="button">
        <input class="tgl tgl-skewed" id="clipboard1" type="checkbox" v-model="toggleBtn" />
        <label class="tgl-btn" data-tg-off="Copy" data-tg-on="Copied" for="clipboard1" />
      </slot>
    </a>
  </div>
</template>

<style scoped>
.disabled {
  pointer-events: none;
}
.pointer {
  cursor: pointer;
}
.tgl {
  display: none;
}
.tgl,
.tgl:after,
.tgl:before,
.tgl *,
.tgl *:after,
.tgl *:before,
.tgl+.tgl-btn {
  box-sizing: border-box;
}
.tgl::-moz-selection,
.tgl:after::-moz-selection,
.tgl:before::-moz-selection,
.tgl *::-moz-selection,
.tgl *:after::-moz-selection,
.tgl *:before::-moz-selection,
.tgl+.tgl-btn::-moz-selection {
  background: none;
}
.tgl::selection,
.tgl:after::selection,
.tgl:before::selection,
.tgl *::selection,
.tgl *:after::selection,
.tgl *:before::selection,
.tgl+.tgl-btn::selection {
  background: none;
}
.tgl+.tgl-btn {
  outline: 0;
  display: block;
  width: 4em;
  height: 2em;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.tgl+.tgl-btn:after,
.tgl+.tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 50%;
  height: 100%;
}
.tgl+.tgl-btn:after {
  left: 0;
}
.tgl+.tgl-btn:before {
  display: none;
}
.tgl-skewed+.tgl-btn {
  border-radius: 5px;
  padding: 1px 10px;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: all 0.2s ease;
  font-family: sans-serif;
  background: #888;
}
.tgl-skewed+.tgl-btn:after,
.tgl-skewed+.tgl-btn:before {
  display: inline-block;
  transition: all 0.2s ease;
  width: 100%;
  text-align: center;
  position: absolute;
  line-height: 2em;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}
.tgl-skewed+.tgl-btn:after {
  left: 100%;
  content: attr(data-tg-on);
}
.tgl-skewed+.tgl-btn:before {
  left: 0;
  content: attr(data-tg-off);
}
.tgl-skewed+.tgl-btn:active {
  background: #888;
}
.tgl-skewed+.tgl-btn:active:before {
  left: -10%;
}
.tgl-skewed:checked+.tgl-btn {
  background: #86d993;
}
.tgl-skewed:checked+.tgl-btn:before {
  left: -100%;
}
.tgl-skewed:checked+.tgl-btn:after {
  left: 0;
}
.tgl-skewed:checked+.tgl-btn:active:after {
  left: 10%;
}
</style>
