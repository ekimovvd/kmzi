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
        v-model="key"
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
      key: 0,
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
          let key = this.key;

          if (key < 0) {
            while (key < 0) {
              key += 33;
            }
          }

          let shift = this.arr_ru.indexOf(symbol) + key;
          let len = this.arr_ru.length;

          if (shift < 0) {
            result += this.arr_ru[len + shift];
          } else {
            result += this.arr_ru[shift % len];
          }
        } else if (this.arr_RU.includes(symbol)) {
          let key = this.key;

          if (key < 0) {
            while (key < 0) {
              key += 33;
            }
          }

          let shift = this.arr_RU.indexOf(symbol) + key;
          let len = this.arr_RU.length;

          if (shift < 0) {
            result += this.arr_RU[len + shift];
          } else {
            result += this.arr_RU[shift % len];
          }
        } else if (this.arr_en.includes(symbol)) {
          let key = this.key;

          if (key < 0) {
            while (key < 0) {
              key += 26;
            }
          }

          let shift = this.arr_en.indexOf(symbol) + key;
          let len = this.arr_en.length;

          if (shift < 0) {
            result += this.arr_en[len + shift];
          } else {
            result += this.arr_en[shift % len];
          }
        } else if (this.arr_EN.includes(symbol)) {
          let key = this.key;

          if (key < 0) {
            while (key < 0) {
              key += 26;
            }
          }

          let shift = this.arr_EN.indexOf(symbol) + key;
          let len = this.arr_EN.length;

          if (shift < 0) {
            result += this.arr_EN[len + shift];
          } else {
            result += this.arr_EN[shift % len];
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
          let key = this.key;
          if (key > 33) {
            while (key > 33) {
              key -= 33;
            }
          }

          let shift = this.arr_ru.indexOf(symbol) - key;
          let len = this.arr_ru.length;

          if (shift < 0) {
            result += this.arr_ru[len + shift];
          } else {
            result += this.arr_ru[shift % len];
          }
        } else if (this.arr_RU.includes(symbol)) {
          let key = this.key;
          if (key > 33) {
            while (key > 33) {
              key -= 33;
            }
          }

          let shift = this.arr_RU.indexOf(symbol) - key;
          let len = this.arr_RU.length;

          if (shift < 0) {
            result += this.arr_RU[len + shift];
          } else {
            result += this.arr_RU[shift % len];
          }
        } else if (this.arr_en.includes(symbol)) {
          let key = this.key;
          if (key > 26) {
            while (key > 26) {
              key -= 26;
            }
          }

          let shift = this.arr_en.indexOf(symbol) - key;
          let len = this.arr_en.length;

          if (shift < 0) {
            result += this.arr_en[len + shift];
          } else {
            result += this.arr_en[shift % len];
          }
        } else if (this.arr_EN.includes(symbol)) {
          let key = this.key;
          if (key > 26) {
            while (key > 26) {
              key -= 26;
            }
          }

          let shift = this.arr_EN.indexOf(symbol) - key;
          let len = this.arr_EN.length;

          if (shift < 0) {
            result += this.arr_EN[len + shift];
          } else {
            result += this.arr_EN[shift % len];
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
