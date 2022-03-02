<template>
  <div class="caesar">
    <div class="caesar__card">
      <input
        type="text"
        placeholder="Введите сообщение"
        class="caesar__input"
        v-model="encode"
      />
      <button type="button" class="caesar__btn" @click="handleEncode">
        Зашифровать
      </button>
    </div>
    <div class="caesar__card">
      <input
        type="text"
        placeholder="Введите сообщение"
        class="caesar__input"
        v-model="decode"
      />
      <button type="button" class="caesar__btn" @click="handleDecode">
        Расшифровать
      </button>
    </div>
    <div class="caesar__card">
      <input
        type="number"
        placeholder="Введите сдвиг"
        class="caesar__input"
        v-model="shift"
      />
    </div>
    <p>Результат: {{ result }}</p>
  </div>
</template>

<script>
export default {
  name: "Caesar",
  data() {
    return {
      encode: "",
      decode: "",
      shift: 0,
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
          let index = this.arr_ru.indexOf(symbol) + this.shift;
          let len = this.arr_ru.length;

          if (index < 0) {
            result += this.arr_ru[len + index];
          } else {
            result += this.arr_ru[index % len];
          }
        } else if (this.arr_RU.includes(symbol)) {
          let index = this.arr_RU.indexOf(symbol) + this.shift;
          let len = this.arr_RU.length;

          if (index < 0) {
            result += this.arr_RU[len + index];
          } else {
            result += this.arr_RU[index % len];
          }
        } else if (this.arr_en.includes(symbol)) {
          let index = this.arr_en.indexOf(symbol) + this.shift;
          let len = this.arr_en.length;

          if (index < 0) {
            result += this.arr_en[len + index];
          } else {
            result += this.arr_en[index % len];
          }
        } else if (this.arr_EN.includes(symbol)) {
          let index = this.arr_EN.indexOf(symbol) + this.shift;
          let len = this.arr_EN.length;

          if (index < 0) {
            result += this.arr_EN[len + index];
          } else {
            result += this.arr_EN[index % len];
          }
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
          let index = this.arr_ru.indexOf(symbol) - this.shift;
          let len = this.arr_ru.length;

          if (index < 0) {
            result += this.arr_ru[len + index];
          } else {
            result += this.arr_ru[index % len];
          }
        } else if (this.arr_RU.includes(symbol)) {
          let index = this.arr_RU.indexOf(symbol) - this.shift;
          let len = this.arr_RU.length;

          if (index < 0) {
            result += this.arr_RU[len + index];
          } else {
            result += this.arr_RU[index % len];
          }
        } else if (this.arr_en.includes(symbol)) {
          let index = this.arr_en.indexOf(symbol) - this.shift;
          let len = this.arr_en.length;

          if (index < 0) {
            result += this.arr_en[len + index];
          } else {
            result += this.arr_en[index % len];
          }
        } else if (this.arr_EN.includes(symbol)) {
          let index = this.arr_EN.indexOf(symbol) - this.shift;
          let len = this.arr_EN.length;

          if (index < 0) {
            result += this.arr_EN[len + index];
          } else {
            result += this.arr_EN[index % len];
          }
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
.caesar {
  padding: 10px;
}

.caesar__card {
  margin-bottom: 10px;
}

.caesar__btn {
  margin-left: 10px;
}
</style>
