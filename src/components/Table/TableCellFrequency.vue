<template>
  <td class="table-cell-frequency">
    <div class="table-cell-frequency__block">
      {{ cell }}
    </div>
  </td>
</template>

<script>
export default {
  name: "TableCellFrequency",
  props: {
    cell: {
      type: [String, Number],
      default: null,
    },
  },
};
</script>

<style>
.table-cell-frequency {
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
