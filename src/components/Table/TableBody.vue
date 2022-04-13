<template>
  <tbody class="table-body">
    <tr class="table-body__tr" v-for="(row, index) in rows" :key="index">
      <TableCellSymbol :cell="row.symbol" />
      <TableCellFrequency :cell="row.frequency" />
      <TableCellSelect :cell="row.select" @handleOption="handleOption" />
    </tr>
  </tbody>
</template>

<script>
import TableCellSymbol from "./TableCellSymbol";
import TableCellFrequency from "./TableCellFrequency";
import TableCellSelect from "./TableCellSelect";

export default {
  name: "TableBody",
  components: {
    TableCellSymbol,
    TableCellFrequency,
    TableCellSelect,
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
