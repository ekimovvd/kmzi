<template>
  <thead class="table-header">
    <tr>
      <th
        class="table-header__th"
        v-for="(cell, index) in columns"
        :key="index"
      >
        <div class="table-header__block">
          {{ cell }}
        </div>
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "TableSortHeader",
  data() {
    return {
      columns: ["Символ", "Частота", "Замена"],
    };
  },
};
</script>

<style>
.table-header {
  border-bottom: 2px solid #e7e7ed;
}
.table-header__th {
  padding: 6px;
}

.table__block {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: #6b778c;
  padding: 6px;
}
</style>
