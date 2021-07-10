<template>
  <div class="clipboard">
    <a @click.stop="copyTextToClipboard(currentText)" :class="disabled ? 'disabled' : 'pointer'">
      <slot name="button">
        <input class="tgl tgl-skewed" id="clipboard1" type="checkbox" />
        <label class="tgl-btn" data-tg-off="Copy" data-tg-on="Copied" for="clipboard1" />
      </slot>
    </a>
  </div>
</template>

<script>
  import '@/style.css';

  export default ({
    name: 'Clipboard',
    props: {
      text: {
        type: String,
        default: ''
      },
      logs: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        disabled: false
      }
    },
    computed: {
      currentText() {
        return this.text
      },
    },
    methods: {
      copyTextToClipboard(text) {
        if(this.disabled) return
        this.disabled = true

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
</style>
