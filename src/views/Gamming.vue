<template>
  <div class="gamming">
    <div class="gamming__blocks">
      <div class="gamming__block">
        <textarea
          class="gamming__textarea"
          placeholder="Введите текст"
          v-model="encode"
        ></textarea>
        <textarea
          class="gamming__textarea"
          placeholder="Зашифрованный текст"
          v-model="decode"
        ></textarea>
        <textarea
          class="gamming__textarea"
          placeholder="Расшифрованный текст"
          v-model="result"
        ></textarea>
      </div>
      <div class="gamming__block">
        <div class="gamming__grid">
          <input
            type="number"
            v-model="a"
            placeholder="Введите а"
            class="gamming__input"
          />
          <input
            type="number"
            v-model="c"
            placeholder="Введите с"
            class="gamming__input"
          />
          <input
            type="number"
            v-model="m"
            placeholder="Введите m"
            class="gamming__input"
          />
          <input
            type="number"
            v-model="x"
            placeholder="Введите x"
            class="gamming__input"
          />
        </div>
        <div class="gamming__buttons">
          <button class="gamming__button" @click="handleEncode('encode')">
            Зашифровать
          </button>
          <button class="gamming__button" @click="handleEncode('decode')">
            Расшифровать
          </button>
          <button class="gamming__button" @click="handleFileTxt">
            Txt файл
          </button>
          <button
            class="gamming__button"
            id="btn_doc"
            @click="handleEncode('decode')"
          >
            Doc файл
          </button>
        </div>
      </div>
    </div>
    <input
      type="file"
      id="input_txt"
      ref="input_txt"
      @change="handleFileTxtRead"
    />
    <input type="file" id="input_doc" />
  </div>
</template>

<script>
import SocketIOFileUpload from "socketio-file-upload";

export default {
  name: "Gamming",
  data() {
    return {
      a: 1664525,
      c: 1013904223,
      m: 4294967296,
      x: 15,
      encode: "Мама мыла раму",
      decode: "",
      result: "",
    };
  },
  mounted() {
    this.handleInitSocket();
  },
  methods: {
    handleEncode(type) {
      const binary = this.text2Binary(
        type === "encode" ? this.encode : this.decode
      );
      console.log("Binary: ", binary);

      const binaryArray = binary.split(" ").filter((item) => item !== "");
      console.log("BinaryArray: ", binaryArray);

      let number = this.x;
      const encode = binaryArray.map((text) => {
        let binaryTextArray = text.split("");
        const randomNumber = this.handleGenerate(number);
        const randomNumberBinary = Number(randomNumber).toString(2);

        while (binaryTextArray.length < randomNumberBinary.length) {
          binaryTextArray.splice(0, 0, "0");
        }
        number = randomNumber;
        return this.handleXOR(binaryTextArray, randomNumberBinary.split(""));
      });
      const decode = this.binary2Text(encode);
      type === "encode" ? (this.decode = decode) : (this.result = decode);
    },

    handleXOR(text, key) {
      let textXOR = "";
      text.forEach((symbol, index) => {
        textXOR += ((parseInt(symbol) + parseInt(key[index])) % 2).toString();
      });
      return textXOR;
    },

    handleGenerate(x) {
      return (this.a * x + this.c) % this.m;
    },

    text2Binary(text) {
      let binaryOutput = "";
      for (var i = 0; i < text.length; i++) {
        binaryOutput += text[i].charCodeAt(0).toString(2) + " ";
      }
      return binaryOutput;
    },

    binary2Text(text) {
      let decode = "";
      for (let i = 0; i < text.length; i++) {
        decode += String.fromCharCode(parseInt(text[i], 2));
      }
      return decode;
    },

    handleFileTxt() {
      this.$refs.input_txt.click();
    },

    async handleFileTxtRead() {
      this.encode = await this.$refs.input_txt.files[0].text();
    },

    handleInitSocket() {
      const socket = window["__socket"];
      var siofu = new SocketIOFileUpload(socket);

      document
        .getElementById("btn_doc")
        .addEventListener("click", siofu.prompt, false);
      siofu.listenOnInput(document.getElementById("input_doc"));

      socket.on("FILE:UPLOAD", (response) => {
        this.encode = response;
      });
    },
  },
};
</script>

<style>
.gamming {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gamming__blocks {
  display: grid;
  grid-template-columns: repeat(2, 320px);
  grid-column-gap: 30px;
}

.gamming__block {
  display: flex;
  flex-direction: column;
}

.gamming__grid {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.gamming__button {
  margin: 15px auto 0 auto;
}

.gamming__textarea {
  margin-bottom: 20px;
  resize: none;
  height: 100px;
}

.gamming__textarea:last-child {
  margin-bottom: 0;
}

.gamming__buttons {
  display: grid;
  grid-template-columns: repeat(2, 100px);
  grid-column-gap: 10px;
}

input[type="file"] {
  position: absolute;
  top: -500px;
}
</style>
