<template>
  <div class="table">
    <table class="table__field">
      <TableHeader />
      <TableBody :rows="rows" @handleOption="handleOption" />
    </table>
  </div>
</template>

<script>
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default {
  name: "Table",
  components: {
    TableHeader,
    TableBody,
  },
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleOption(event) {
      this.$emit("handleOption", event);
    },
  },
};
</script>

<style>
.table__field {
  border: 2px solid #e7e7ed;
  border-radius: 5px;
}
</style>
