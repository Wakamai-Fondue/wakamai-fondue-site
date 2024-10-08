import Prism from "vue-prism-component";
import CopyToClipboard from "../CopyToClipboard.vue";

export default {
  props: ["font"],
  components: {
    Prism,
    CopyToClipboard,
  },
  data() {
    return {
      css: this.font.cssString,
      fontname: this.font.summary["Font name"],
    };
  },
  methods: {
    getFontCSSLink: function () {
      const filename = `${this.font.slug}-wakamai-fondue.css`;
      let temp = document.createElement("a");
      temp.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(this.font.cssString)
      );
      temp.setAttribute("download", filename);

      if (document.createEvent) {
        let event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        temp.dispatchEvent(event);
      } else {
        temp.click();
      }
    },
  },
};
