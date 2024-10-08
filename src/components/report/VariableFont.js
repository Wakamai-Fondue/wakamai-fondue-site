import VariableControls from "./VariableControls.vue";

export default {
  props: ["font"],
  components: {
    VariableControls,
  },
  data: () => ({
    variableStyles: "",
    sticky: false,
  }),
  methods: {
    updateVariableStyles: function (updatedStyles) {
      this.variableStyles = updatedStyles;
    },
  },
};
