<template>
  <td class="table-cell-symbol">
    <div class="table-cell-symbol__block">
      {{ cell }}
    </div>
  </td>
</template>

<script>
export default {
  name: "TableCellSymbol",
  props: {
    cell: {
      type: [String, Number],
      default: null,
    },
  },
};
</script>

<style>
.table-cell-symbol {
  padding: 6px;
  height: 45px;
  position: relative;
}

.table-cell-symbol__block {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6b778c;
  padding: 6px;
  text-align: center;
}
</style>
