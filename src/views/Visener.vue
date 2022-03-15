<template>
  <div class="visener">
    <div class="visener__block">
      <input
        class="visener__input"
        type="text"
        placeholder="Введите текст для шифрование"
        v-model="encode"
      />
      <input
        class="visener__input"
        type="text"
        placeholder="Введите текст для расшифрования"
        v-model="decode"
      />
      <input
        class="visener__input"
        type="text"
        placeholder="Введите ключ"
        v-model="key"
      />
      <button @click="handleEncode">Зашифровать</button>
      <button @click="handleDecode">Расшифровать</button>
    </div>
    <p>encodeStr: {{ encodeStr }}</p>
    <p>decodeStr: {{ decodeStr }}</p>
  </div>
</template>

<script>
export default {
  name: "Visener",
  data() {
    return {
      encode: "MY FAT CAT",
      decode: "",
      key: "abc",
      encodeStr: null,
      decodeStr: null,
      arr_ru: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
      arr_RU: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
      arr_en: "abcdefghijklmnopqrstuvwxyz",
      arr_EN: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    };
  },
  methods: {
    handleEncode() {
      const encodeArray = this.encode.split("");
      console.log("Encode array: ", encodeArray);

      let keyArray = this.key.split("");
      console.log("Key array: ", keyArray);

      if (keyArray.length < encodeArray.length) {
        const difference = encodeArray.length - keyArray.length;
        console.log("Difference: ", difference);

        while (keyArray.length < encodeArray.length) {
          this.key.split("").forEach((key) => {
            keyArray.push(key);
          });
        }

        keyArray = keyArray.filter((key, index) => index < encodeArray.length);
        console.log("New key array: ", keyArray);
      } else if (keyArray.length > encodeArray.length) {
        keyArray = keyArray.filter((key, index) => index < encodeArray.length);
        console.log("New key array: ", keyArray);
      }

      let error = false;
      keyArray = keyArray.map((key) => {
        if (this.arr_ru.includes(key)) {
          return this.arr_ru.indexOf(key);
        } else if (this.arr_RU.includes(key)) {
          return this.arr_RU.indexOf(key);
        } else if (this.arr_en.includes(key)) {
          return this.arr_en.indexOf(key);
        } else if (this.arr_EN.includes(key)) {
          return this.arr_EN.indexOf(key);
        } else {
          error = true;
          return -1;
        }
      });

      console.log("New key array: ", keyArray);

      if (!error) {
        let encode = "";
        encodeArray.forEach((symbol, symbolIndex) => {
          if (this.arr_ru.includes(symbol)) {
            let key = keyArray[symbolIndex];
            let shift = this.arr_ru.indexOf(symbol) + key;
            let arrayLength = this.arr_ru.length;

            encode += this.arr_ru[shift % arrayLength];
          } else if (this.arr_RU.includes(symbol)) {
            let key = keyArray[symbolIndex];
            let shift = this.arr_RU.indexOf(symbol) + key;
            let arrayLength = this.arr_RU.length;

            encode += this.arr_RU[shift % arrayLength];
          } else if (this.arr_en.includes(symbol)) {
            let key = keyArray[symbolIndex];
            let shift = this.arr_en.indexOf(symbol) + key;
            let arrayLength = this.arr_en.length;

            encode += this.arr_en[shift % arrayLength];
          } else if (this.arr_EN.includes(symbol)) {
            let key = keyArray[symbolIndex];
            let shift = this.arr_EN.indexOf(symbol) + key;
            let arrayLength = this.arr_EN.length;

            encode += this.arr_EN[shift % arrayLength];
          } else {
            encode += symbol;
          }
        });
        console.log("Encode: ", encode);
        this.encodeStr = encode;
      } else {
        console.log("ERROR!");
      }
    },

    handleDecode() {
      const decodeArray = this.decode.split("");
      console.log("Decode array: ", decodeArray);

      let keyArray = this.key.split("");
      console.log("Key array: ", keyArray);

      if (keyArray.length < decodeArray.length) {
        const difference = decodeArray.length - keyArray.length;
        console.log("Difference: ", difference);

        while (keyArray.length < decodeArray.length) {
          this.key.split("").forEach((key) => {
            keyArray.push(key);
          });
        }

        keyArray = keyArray.filter((key, index) => index < decodeArray.length);
        console.log("New key array: ", keyArray);
      } else if (keyArray.length > decodeArray.length) {
        keyArray = keyArray.filter((key, index) => index < decodeArray.length);
        console.log("New key array: ", keyArray);
      }

      let error = false;
      keyArray = keyArray.map((key) => {
        if (this.arr_ru.includes(key)) {
          return this.arr_ru.indexOf(key);
        } else if (this.arr_RU.includes(key)) {
          return this.arr_RU.indexOf(key);
        } else if (this.arr_en.includes(key)) {
          return this.arr_en.indexOf(key);
        } else if (this.arr_EN.includes(key)) {
          return this.arr_EN.indexOf(key);
        } else {
          error = true;
          return -1;
        }
      });

      console.log("New key array: ", keyArray);

      if (!error) {
        let decode = "";
        decodeArray.forEach((symbol, symbolIndex) => {
          if (this.arr_ru.includes(symbol)) {
            let key = keyArray[symbolIndex];
            let shift = this.arr_ru.indexOf(symbol) - key;
            let arrayLength = this.arr_ru.length;

            if (shift < 0) {
              decode += this.arr_ru[arrayLength + shift];
            } else {
              decode += this.arr_ru[shift % arrayLength];
            }
          } else if (this.arr_RU.includes(symbol)) {
            let key = keyArray[symbolIndex];
            let shift = this.arr_RU.indexOf(symbol) - key;
            let arrayLength = this.arr_RU.length;

            if (shift < 0) {
              decode += this.arr_RU[arrayLength + shift];
            } else {
              decode += this.arr_RU[shift % arrayLength];
            }
          } else if (this.arr_en.includes(symbol)) {
            let key = keyArray[symbolIndex];
            let shift = this.arr_en.indexOf(symbol) - key;
            let arrayLength = this.arr_en.length;

            if (shift < 0) {
              decode += this.arr_en[arrayLength + shift];
            } else {
              decode += this.arr_en[shift % arrayLength];
            }
          } else if (this.arr_EN.includes(symbol)) {
            let key = keyArray[symbolIndex];
            let shift = this.arr_EN.indexOf(symbol) - key;
            let arrayLength = this.arr_EN.length;

            if (shift < 0) {
              decode += this.arr_EN[arrayLength + shift];
            } else {
              decode += this.arr_EN[shift % arrayLength];
            }
          } else {
            decode += symbol;
          }
        });
        console.log("Decode: ", decode);
        this.decodeStr = decode;
      } else {
        console.log("ERROR!");
      }
    },
  },
};
</script>

<style>
.visener {
  padding: 10px;
}

.visener__block {
  width: 500px;
  display: grid;
  grid-row-gap: 10px;
}

p {
  padding: 0;
  margin: 0;
}
</style>
