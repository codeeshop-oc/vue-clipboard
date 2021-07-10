<template>
  <div class="clipboard">
    <a @click.stop="copyTextToClipboard(currentText)">
      <slot name="button">
        <input class="tgl tgl-skewed" id="clipboard1" type="checkbox" />
        <label class="tgl-btn" data-tg-off="Copied" data-tg-on="Copy" for="clipboard1"></label>
      </slot>
    </a>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default /*#__PURE__*/ defineComponent({
    name: 'Clipboard',
    props: {
      text: {
        type: String,
        default: 'COpies'
      },
      logs: {
        type: Boolean,
        default: true
      },
    },
    computed: {
      currentText() {
        return this.text
      },
    },
    methods: {
      copyTextToClipboard(text) {
        if (!text) {
          if (window.getSelection) {
            text = window.getSelection().toString();
          } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
          }
        }
        if (!navigator.clipboard) {
          this.fallbackCopyTextToClipboard(text);
          this.$emit('clicked', text)
          return;
        }
        navigator.clipboard.writeText(text).then(function () {
          this.$emit('clicked', text)
          if (this.logs) {
            console.log('Async: Copying to clipboard was successful!');
          }
        }, function (err) {
          if (this.logs) {
            console.error('Async: Could not copy text: ', err);
          }
        });
      },
      fallbackCopyTextToClipboard(text) {
        let textArea;

        if (!document.querySelector('#hiddenfield')) {
          textArea = document.createElement("textarea");
          textArea.setAttribute("id", "hiddenfield");
        }

        textArea.value = text;
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          let successful = document.execCommand('copy');
          let msg = successful ? 'successful' : 'unsuccessful';
          if (this.logs) {
            console.log('Fallback: Copying text command was ' + msg);
          }
        } catch (err) {
          if (this.logs) {
            console.error('Fallback: Oops, unable to copy', err);
          }
        }

        document.body.removeChild(textArea);
      }
    },
  });
</script>

<style scoped>
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
