<template>
  <div class="playfair">
    <div class="playfair__block">
      <input
        class="playfair__input"
        type="text"
        placeholder="Введите текст для шифрование"
        v-model="encode"
      />
      <input
        class="playfair__input"
        type="text"
        placeholder="Введите текст для расшифрования"
        v-model="decode"
      />
      <input
        class="playfair__input"
        type="text"
        placeholder="Введите ключ"
        v-model="key"
      />
      <div class="playfair__group">
        <input type="radio" id="ru" value="Русский" v-model="lang" />
        <label for="ru"> Русский язык </label>
      </div>
      <div class="playfair__group">
        <input type="radio" id="en" value="Английский" v-model="lang" />
        <label for="en"> Английский язык </label>
      </div>
      <button @click="handleEncode">Зашифровать</button>
      <button @click="handleDecode">Расшифровать</button>
    </div>
    <p>encodeStr: {{ encodeStr }}</p>
    <p>decodeStr: {{ decodeStr }}</p>
  </div>
</template>

<script>
import playfair from "../helpers/playfair";

export default {
  name: "Playfair",
  data() {
    return {
      encode: "IDYOCY OFTEN LOOKS LIKE INTELLIGENCE",
      decode: "GJUCJ@FLAHOMBUFRDUPRAGCEHMUPGFNGNT",
      key: "wheatson",
      encodeStr: "",
      decodeStr: "",
      arr_RU: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
      arr_EN: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lang: "Английский",
    };
  },
  methods: {
    handleEncode() {
      this.encodeStr = playfair.encoding(this.encode, this.key, this.lang);
    },

    handleDecode() {
      this.decodeStr = playfair.decoding(this.decode, this.key, this.lang);
    },
  },
};
</script>

<style>
.playfair {
  padding: 10px;
}

.playfair__block {
  width: 500px;
  display: grid;
  grid-row-gap: 10px;
}

p {
  padding: 0;
  margin: 0;
}
</style>
