//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'Clipboard',
  props: {
    text: {
      type: String,
      default: ''
    },
    logs: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      disabled: false
    };
  },

  computed: {
    currentText() {
      return this.text;
    }

  },
  methods: {
    copyTextToClipboard(text) {
      if (this.disabled) return;
      this.disabled = true;

      if (!text) {
        if (window.getSelection) {
          text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
          text = document.selection.createRange().text;
        }
      }

      if (!navigator.clipboard) {
        this.fallbackCopyTextToClipboard(text);
        this.$emit('clicked', text);
        return;
      }

      navigator.clipboard.writeText(text).then(function () {
        this.$emit('clicked', text);

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

      textArea.value = text; // Avoid scrolling to bottom

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

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "clipboard"
  }, [_c('a', {
    class: _vm.disabled ? 'disabled' : 'pointer',
    on: {
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.copyTextToClipboard(_vm.currentText);
      }
    }
  }, [_vm._t("button", function () {
    return [_c('input', {
      staticClass: "tgl tgl-skewed",
      attrs: {
        "id": "clipboard1",
        "type": "checkbox"
      }
    }), _vm._v(" "), _c('label', {
      staticClass: "tgl-btn",
      attrs: {
        "data-tg-off": "Copy",
        "data-tg-on": "Copied",
        "for": "clipboard1"
      }
    })];
  })], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-6251737e_0", {
    source: ".disabled[data-v-6251737e]{pointer-events:none}.pointer[data-v-6251737e]{cursor:pointer}.tgl[data-v-6251737e]{display:none}.tgl[data-v-6251737e],.tgl *[data-v-6251737e],.tgl[data-v-6251737e] :after,.tgl[data-v-6251737e] :before,.tgl+.tgl-btn[data-v-6251737e],.tgl[data-v-6251737e]:after,.tgl[data-v-6251737e]:before{box-sizing:border-box}.tgl[data-v-6251737e] ::-moz-selection,.tgl[data-v-6251737e] :after::-moz-selection,.tgl[data-v-6251737e] :before::-moz-selection,.tgl+.tgl-btn[data-v-6251737e]::-moz-selection,.tgl[data-v-6251737e]::-moz-selection,.tgl[data-v-6251737e]:after::-moz-selection,.tgl[data-v-6251737e]:before::-moz-selection{background:0 0}.tgl[data-v-6251737e] ::selection,.tgl[data-v-6251737e] :after::selection,.tgl[data-v-6251737e] :before::selection,.tgl+.tgl-btn[data-v-6251737e]::selection,.tgl[data-v-6251737e]::selection,.tgl[data-v-6251737e]:after::selection,.tgl[data-v-6251737e]:before::selection{background:0 0}.tgl+.tgl-btn[data-v-6251737e]{outline:0;display:block;width:4em;height:2em;position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tgl+.tgl-btn[data-v-6251737e]:after,.tgl+.tgl-btn[data-v-6251737e]:before{position:relative;display:block;content:\"\";width:50%;height:100%}.tgl+.tgl-btn[data-v-6251737e]:after{left:0}.tgl+.tgl-btn[data-v-6251737e]:before{display:none}.tgl-skewed+.tgl-btn[data-v-6251737e]{border-radius:5px;padding:1px 10px;overflow:hidden;-webkit-backface-visibility:hidden;backface-visibility:hidden;transition:all .2s ease;font-family:sans-serif;background:#888}.tgl-skewed+.tgl-btn[data-v-6251737e]:after,.tgl-skewed+.tgl-btn[data-v-6251737e]:before{display:inline-block;transition:all .2s ease;width:100%;text-align:center;position:absolute;line-height:2em;font-weight:700;color:#fff;text-shadow:0 1px 0 rgba(0,0,0,.4)}.tgl-skewed+.tgl-btn[data-v-6251737e]:after{left:100%;content:attr(data-tg-on)}.tgl-skewed+.tgl-btn[data-v-6251737e]:before{left:0;content:attr(data-tg-off)}.tgl-skewed+.tgl-btn[data-v-6251737e]:active{background:#888}.tgl-skewed+.tgl-btn[data-v-6251737e]:active:before{left:-10%}.tgl-skewed:checked+.tgl-btn[data-v-6251737e]{background:#86d993}.tgl-skewed:checked+.tgl-btn[data-v-6251737e]:before{left:-100%}.tgl-skewed:checked+.tgl-btn[data-v-6251737e]:after{left:0}.tgl-skewed:checked+.tgl-btn[data-v-6251737e]:active:after{left:10%}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-6251737e";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('Clipboard', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
