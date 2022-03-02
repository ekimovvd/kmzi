<template>
  <div class="atbash">
    <div class="atbash__card">
      <input
        type="text"
        placeholder="Введите сообщение"
        class="atbash__input"
        v-model="encode"
      />
      <button type="button" class="atbash__btn" @click="handleEncode">
        Зашифровать
      </button>
    </div>
    <div class="atbash__card">
      <input
        type="text"
        placeholder="Введите сообщение"
        class="atbash__input"
        v-model="decode"
      />
      <button type="button" class="atbash__btn" @click="handleDecode">
        Расшифровать
      </button>
    </div>
    <p>Результат: {{ result }}</p>
  </div>
</template>

<script>
export default {
  name: "Atbash",
  data() {
    return {
      encode: "",
      decode: "",
      result: "",
      arr_ru: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
      arr_RU: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
      arr_en: "abcdefghijklmnopqrstuvwxyz",
      arr_EN: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    };
  },
  methods: {
    handleEncode() {
      const arrayEncode = this.encode.split("");

      let result = "";

      arrayEncode.forEach((symbol) => {
        if (this.arr_ru.includes(symbol)) {
          result += this.arr_ru[32 - (this.arr_ru.indexOf(symbol) + 1) + 1];
        } else if (this.arr_RU.includes(symbol)) {
          result += this.arr_RU[32 - (this.arr_RU.indexOf(symbol) + 1) + 1];
        } else if (this.arr_en.includes(symbol)) {
          result += this.arr_en[25 - (this.arr_en.indexOf(symbol) + 1) + 1];
        } else if (this.arr_EN.includes(symbol)) {
          result += this.arr_EN[25 - (this.arr_EN.indexOf(symbol) + 1) + 1];
        } else {
          result += symbol;
        }
      });

      this.result = result;
    },

    handleDecode() {
      const arrayDecode = this.decode.split("");

      let result = "";

      arrayDecode.forEach((symbol) => {
        if (this.arr_ru.includes(symbol)) {
          result += this.arr_ru[32 - (this.arr_ru.indexOf(symbol) + 1) + 1];
        } else if (this.arr_RU.includes(symbol)) {
          result += this.arr_RU[32 - (this.arr_RU.indexOf(symbol) + 1) + 1];
        } else if (this.arr_en.includes(symbol)) {
          result += this.arr_en[25 - (this.arr_en.indexOf(symbol) + 1) + 1];
        } else if (this.arr_EN.includes(symbol)) {
          result += this.arr_EN[25 - (this.arr_EN.indexOf(symbol) + 1) + 1];
        } else {
          result += symbol;
        }
      });

      this.result = result;
    },
  },
};
</script>

<style>
.atbash {
  padding: 10px;
}

.atbash__card {
  margin-bottom: 10px;
}

.atbash__btn {
  margin-left: 10px;
}
</style>
