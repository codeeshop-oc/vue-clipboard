import { defineComponent as c, ref as d, openBlock as r, createElementBlock as p, createElementVNode as s, withModifiers as f, normalizeClass as u, renderSlot as b, withDirectives as g, vModelCheckbox as v, pushScopeId as y, popScopeId as C } from "vue";
const m = c({
  name: "VueClipboard",
  props: {
    text: {
      type: String,
      default: ""
    },
    logs: {
      type: Boolean,
      default: !1
    },
    enableMilliSeconds: {
      type: Number,
      default: 5
    }
  },
  emits: ["clicked"],
  setup(e, { emit: o }) {
    const t = d(!1), a = d(!1), i = function() {
      e.enableMilliSeconds && setTimeout(() => {
        a.value = !1, t.value = !1;
      }, e.enableMilliSeconds * 100);
    };
    return {
      disabled: t,
      toggleBtn: a,
      enableBtn: i,
      copyTextToClipboard(l) {
        if (!t.value) {
          if (t.value = !0, !l && window.getSelection) {
            const n = window.getSelection();
            n != null && (l = n.toString());
          }
          l == null && (l = ""), i(), navigator.clipboard ? navigator.clipboard.writeText(l).then(function() {
            o("clicked", l), e.logs && console.debug("Async: Copying to clipboard was successful!");
          }, function(n) {
            e.logs && console.error("Async: Could not copy text: ", n);
          }) : console.error("Could not copy text: navigator.clipboard is not available");
        }
      }
    };
  }
});
const S = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [a, i] of o)
    t[a] = i;
  return t;
}, _ = (e) => (y("data-v-c3481fba"), e = e(), C(), e), w = { class: "clipboard" }, k = /* @__PURE__ */ _(() => /* @__PURE__ */ s("label", {
  class: "tgl-btn",
  "data-tg-off": "Copy",
  "data-tg-on": "Copied",
  for: "clipboard1"
}, null, -1));
function B(e, o, t, a, i, l) {
  return r(), p("div", w, [
    s("a", {
      onClick: o[1] || (o[1] = f((n) => e.copyTextToClipboard(e.text), ["stop"])),
      class: u(e.disabled ? "disabled" : "pointer")
    }, [
      b(e.$slots, "button", {}, () => [
        g(s("input", {
          class: "tgl tgl-skewed",
          id: "clipboard1",
          type: "checkbox",
          "onUpdate:modelValue": o[0] || (o[0] = (n) => e.toggleBtn = n)
        }, null, 512), [
          [v, e.toggleBtn]
        ]),
        k
      ], !0)
    ], 2)
  ]);
}
const T = /* @__PURE__ */ S(m, [["render", B], ["__scopeId", "data-v-c3481fba"]]);
export {
  T as default
};
