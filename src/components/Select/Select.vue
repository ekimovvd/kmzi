<template>
  <div v-on-clickaway="handleHideDropdown" class="select">
    <button class="select__toggle" type="button" @click="handleToggle">
      {{ label }} - {{ value }}
    </button>
    <ul v-show="show" class="select__options">
      <li
        class="select__option"
        :class="handleIsOptionSelected(option)"
        v-for="(option, index) in options"
        :key="index"
        @click="handleOption(option)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "Select",
  mixins: [clickaway],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [Object, String, Number],
      default: null,
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: false,
      selectedOption: null,
    };
  },
  created() {
    this.selectedOption = this.handleFindOption(this.value);
  },
  watch: {
    value(value) {
      if (value) {
        this.selectedOption = this.handleFindOption(value);
      } else {
        this.selectedOption = value;
      }
    },
  },
  methods: {
    handleHideDropdown() {
      this.show = false;
    },

    handleIsOptionSelected(option) {
      return this.selectedOption === option ? "select__option_selected" : "";
    },

    handleOption(option) {
      this.selectedOption = option;
      this.$emit("handleChange", {
        first: {
          symbol: this.label,
          frequency: this.value,
        },
        next: {
          symbol: option.name,
          frequency: option.value,
        },
      });
      this.handleHideDropdown();
    },

    handleFindOption(value) {
      const findOption = this.options.find((option) => option.value === value);
      return findOption ? findOption : null;
    },

    handleToggle() {
      this.show = !this.show;
    },
  },
};
</script>

<style>
.select__toggle {
  background: #f4f5f7;
  border-radius: 5px;
  font-weight: 400;
  font-size: 14px;
  color: #7a869a;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 8px;
}

.select__options {
  position: absolute;
  top: 40px;
  left: 50%;
  right: 0;
  z-index: 100;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 150px;
  transform: translateX(-50%);
  padding: 0;
  margin: 0;
}

.select__option {
  padding: 6px 16px;
  font-weight: 400;
  font-size: 14px;
  color: #172b4d;
  cursor: pointer;
  text-align: left;
}

.select__option:hover {
  background: #ebecf0;
}

.select__option_selected {
  background: #ebecf0;
}

.select {
  width: 100%;
  position: relative;
}

ul {
  text-decoration: none;
  display: block;
}

li {
  text-decoration: none;
  display: block;
}
</style>
