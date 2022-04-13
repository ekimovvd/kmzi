<template>
  <td class="table-cell-select">
    <div class="table-cell-select__block">
      <Select
        :value="cell.frequency"
        :label="cell.symbol"
        :options="options"
        @handleChange="handleOption"
      />
    </div>
  </td>
</template>

<script>
import Select from "@/components/Select/Select";

export default {
  name: "TableCellSelect",
  components: {
    Select,
  },
  props: {
    cell: {
      type: [String, Number, Object],
      default: null,
    },
  },
  data() {
    return {
      options: [
        {
          name: "о",
          value: 0.10983,
        },
        {
          name: "е",
          value: 0.08483,
        },
        {
          name: "а",
          value: 0.07998,
        },
        {
          name: "и",
          value: 0.07367,
        },
        {
          name: "н",
          value: 0.067,
        },
        {
          name: "т",
          value: 0.06318,
        },
        {
          name: "с",
          value: 0.05473,
        },
        {
          name: "р",
          value: 0.04746,
        },
        {
          name: "в",
          value: 0.04533,
        },
        {
          name: "л",
          value: 0.04343,
        },
        {
          name: "к",
          value: 0.03486,
        },
        {
          name: "м",
          value: 0.03203,
        },
        {
          name: "д",
          value: 0.02977,
        },
        {
          name: "п",
          value: 0.02804,
        },
        {
          name: "у",
          value: 0.02615,
        },
        {
          name: "я",
          value: 0.02001,
        },
        {
          name: "ы",
          value: 0.01898,
        },
        {
          name: "ь",
          value: 0.01735,
        },
        {
          name: "г",
          value: 0.01687,
        },
        {
          name: "з",
          value: 0.01641,
        },
        {
          name: "б",
          value: 0.01592,
        },
        {
          name: "ч",
          value: 0.0145,
        },
        {
          name: "й",
          value: 0.01208,
        },
        {
          name: "х",
          value: 0.00966,
        },
        {
          name: "ж",
          value: 0.0094,
        },
        {
          name: "ш",
          value: 0.00718,
        },
        {
          name: "ю",
          value: 0.00639,
        },
        {
          name: "ю",
          value: 0.00639,
        },
        {
          name: "ц",
          value: 0.00486,
        },
        {
          name: "щ",
          value: 0.00361,
        },
        {
          name: "э",
          value: 0.00331,
        },
        {
          name: "ф",
          value: 0.00267,
        },
        {
          name: "ъ",
          value: 0.00037,
        },
        {
          name: "ё",
          value: 0.00013,
        },
      ],
    };
  },
  methods: {
    handleOption(event) {
      this.$emit("handleOption", event);
    },
  },
};
</script>

<style>
.table-cell-select {
  padding: 6px;
  height: 45px;
  position: relative;
  width: 150px;
}

.table-cell-select__block {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6b778c;
  padding: 6px;
  text-align: center;
}
</style>
