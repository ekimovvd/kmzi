<template>
  <div class="frequency">
    <div class="frequency__block">
      <div class="frequency__inputs">
        <textarea
          class="frequency__textarea"
          cols="30"
          rows="10"
          v-model="text"
        ></textarea>
        <textarea
          class="frequency__textarea"
          cols="30"
          rows="10"
          v-model="textDecrypt"
        ></textarea>
      </div>
      <div class="frequency__buttons">
        <div class="frequency__group">
          <button class="frequency__btn frequency__btn_doc" id="btn_doc">
            Выбрать файл - doc
          </button>
          <input type="file" id="input_doc" />
        </div>
        <div class="frequency__group">
          <button
            class="frequency__btn frequency__btn_txt"
            @click="handleFileTxt"
          >
            Выбрать файл - txt
          </button>
          <input
            type="file"
            id="input_txt"
            ref="input_txt"
            @change="handleFileTxtRead"
          />
        </div>
        <div class="frequency__group">
          <button
            class="frequency__btn frequency__btn_txt"
            @click="handleDecrypt"
          >
            Расшифровать
          </button>
        </div>
      </div>
    </div>
    <Bar
      class="frequency__bar"
      v-if="Object.keys(probability).length > 0"
      :chart-options="chartOptions"
      :chart-data="getChartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :width="400"
      :height="400"
    />
    <Table
      class="frequency__table"
      :rows="getRows"
      @handleOption="handleOption"
    />
    {{ getRows }}
  </div>
</template>

<script>
import SocketIOFileUpload from "socketio-file-upload";
import { Bar } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

import Table from "@/components/Table/Table";

export default {
  name: "Frequency",
  components: {
    Bar,
    Table,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
  },
  data() {
    return {
      text: "",
      textDecrypt: "",
      frequency: {},
      probability: {},
      probabilityArr: [],
      countSymbols: 0,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      alphabetRu: [
        {
          symbol: "о",
          frequency: 0.10983,
        },
        {
          symbol: "е",
          frequency: 0.08483,
        },
        {
          symbol: "а",
          frequency: 0.07998,
        },
        {
          symbol: "и",
          frequency: 0.07367,
        },
        {
          symbol: "н",
          frequency: 0.067,
        },
        {
          symbol: "т",
          frequency: 0.06318,
        },
        {
          symbol: "с",
          frequency: 0.05473,
        },
        {
          symbol: "р",
          frequency: 0.04746,
        },
        {
          symbol: "в",
          frequency: 0.04533,
        },
        {
          symbol: "л",
          frequency: 0.04343,
        },
        {
          symbol: "к",
          frequency: 0.03486,
        },
        {
          symbol: "м",
          frequency: 0.03203,
        },
        {
          symbol: "д",
          frequency: 0.02977,
        },
        {
          symbol: "п",
          frequency: 0.02804,
        },
        {
          symbol: "у",
          frequency: 0.02615,
        },
        {
          symbol: "я",
          frequency: 0.02001,
        },
        {
          symbol: "ы",
          frequency: 0.01898,
        },
        {
          symbol: "ь",
          frequency: 0.01735,
        },
        {
          symbol: "г",
          frequency: 0.01687,
        },
        {
          symbol: "з",
          frequency: 0.01641,
        },
        {
          symbol: "б",
          frequency: 0.01592,
        },
        {
          symbol: "ч",
          frequency: 0.0145,
        },
        {
          symbol: "й",
          frequency: 0.01208,
        },
        {
          symbol: "х",
          frequency: 0.00966,
        },
        {
          symbol: "ж",
          frequency: 0.0094,
        },
        {
          symbol: "ш",
          frequency: 0.00718,
        },
        {
          symbol: "ю",
          frequency: 0.00639,
        },
        {
          symbol: "ю",
          frequency: 0.00639,
        },
        {
          symbol: "ц",
          frequency: 0.00486,
        },
        {
          symbol: "щ",
          frequency: 0.00361,
        },
        {
          symbol: "э",
          frequency: 0.00331,
        },
        {
          symbol: "ф",
          frequency: 0.00267,
        },
        {
          symbol: "ъ",
          frequency: 0.00037,
        },
        {
          symbol: "ё",
          frequency: 0.00013,
        },
      ],
    };
  },
  mounted() {
    this.handleInitSocket();
  },
  computed: {
    getChartData() {
      return {
        labels: Object.keys(this.probability).map((key) => {
          return key;
        }),
        datasets: [
          {
            label: "TXT",
            backgroundColor: "#f87979",
            data: Object.values(this.probability).map((value) => {
              return value;
            }),
          },
        ],
      };
    },

    getRows() {
      this.probabilityArr = Object.keys(this.probability).map((key) => {
        return {
          symbol: key,
          frequency: this.probability[key],
        };
      });
      return this.alphabetRu.map((obj, index) => {
        return {
          symbol: this.probabilityArr[index]
            ? this.probabilityArr[index].symbol
            : "",
          frequency: this.probabilityArr[index]
            ? this.probabilityArr[index].frequency
            : "",
          select: obj,
        };
      });
    },
  },
  methods: {
    handleDecrypt() {
      let text = this.text.toLowerCase().split("");

      const textArr = text.map((symbol) => {
        const findRow = this.getRows.find((row) => row.symbol === symbol);

        if (findRow) {
          return findRow.select.symbol;
        } else {
          return symbol;
        }
      });

      textArr.forEach((symbol) => {
        this.textDecrypt += symbol;
      });
    },

    handleOption(event) {
      const { first, next } = event;

      const findSymbolFirst = this.alphabetRu.find(
        (obj) => obj.symbol === first.symbol
      );
      const findSymbolFirstIndex = this.alphabetRu.indexOf(findSymbolFirst);

      const findSymbolNext = this.alphabetRu.find(
        (obj) => obj.symbol === next.symbol
      );
      const findSymbolNextIndex = this.alphabetRu.indexOf(findSymbolNext);
      this.alphabetRu.splice(findSymbolFirstIndex, 1, next);
      this.alphabetRu.splice(findSymbolNextIndex, 1, first);
    },

    handleInitSocket() {
      const socket = window["__socket"];
      var siofu = new SocketIOFileUpload(socket);

      document
        .getElementById("btn_doc")
        .addEventListener("click", siofu.prompt, false);
      siofu.listenOnInput(document.getElementById("input_doc"));

      siofu.addEventListener("complete", function (event) {
        console.log(event.success);
        console.log(event.file);
      });

      socket.on("FILE:UPLOAD", (response) => {
        console.log(response);
      });
    },

    handleFileTxt() {
      this.$refs.input_txt.click();
    },

    async handleFileTxtRead() {
      const text = await this.$refs.input_txt.files[0].text();
      this.text = text;
      this.handleFrequency(text);
      this.handleCountSymbols();
      this.handleProbability();
    },

    handleFrequency(text) {
      const arr_ru = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
      const arr_en = "abcdefghijklmnopqrstuvwxyz";
      text
        .toLowerCase()
        .split("")
        .forEach((symbol) => {
          if (arr_ru.includes(symbol)) {
            if (this.frequency[symbol]) {
              this.frequency[symbol] += 1;
            } else {
              this.frequency[symbol] = 1;
            }
          } else if (arr_en.includes(symbol)) {
            if (this.frequency[symbol]) {
              this.frequency[symbol] += 1;
            } else {
              this.frequency[symbol] = 1;
            }
          }
        });
    },

    handleCountSymbols() {
      Object.values(this.frequency).forEach((value) => {
        this.countSymbols += value;
      });
    },

    handleProbability() {
      Object.keys(this.frequency).forEach((key) => {
        this.probability[key] = (1 / this.countSymbols) * this.frequency[key];
      });

      const probability = [];
      for (let key in this.probability) {
        probability.push([key, this.probability[key]]);
      }

      probability.sort(function (a, b) {
        return b[1] - a[1];
      });

      this.probability = {};
      probability.forEach((element) => {
        this.probability[element[0]] = element[1];
      });
    },
  },
};
</script>

<style>
.frequency__table {
  margin-right: 20px;
}

.frequency__bar {
  margin-top: 40px;
}

canvas {
  width: 900px !important;
  height: 400px;
  margin: 0 auto;
}

.frequency {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.frequency__block {
  display: flex;
  align-items: center;
  justify-content: center;
}

.frequency__buttons {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.frequency__btn {
  padding: 5px 10px;
  color: #fff;
  border: none;
  border-radius: 5px;
  outline: none;
  text-align: center;
  cursor: pointer;
  margin-bottom: 15px;
}

.frequency__btn:last-child {
  margin-bottom: 0;
}

.frequency__btn_doc {
  background: #28a745;
}

.frequency__btn_txt {
  background: #007bff;
}

input[type="file"] {
  position: absolute;
  top: -500px;
}
</style>
