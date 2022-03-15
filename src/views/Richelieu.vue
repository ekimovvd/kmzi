<template>
  <div class="richelieu">
    <div class="richelieu__block">
      <input
        class="richelieu__input"
        type="text"
        placeholder="Введите текст для шифрование"
        v-model="encode"
      />
      <input
        class="richelieu__input"
        type="text"
        placeholder="Введите текст для расшифрования"
        v-model="decode"
      />
      <input
        class="richelieu__input"
        type="text"
        placeholder="Введите ключ"
        v-model="key"
      />
      <button @click="handleEncode">Зашифровать</button>
      <button @click="handleDecode">Расшифровать</button>
      <p>encodeStr: {{ encodeStr }}</p>
      <p>decodeStr: {{ decodeStr }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Richelieu",
  data() {
    return {
      encode: "LETTER SENT TO THE EMPEROR GIVING FULL DETAIL",
      decode: "TLRT EESN TE EM HTOTEOPE RRIGVING FULL DETAIL",
      key: "1,6,3,0,5,2,4 0,4,1,3,2 5,6,0,7,4,1,3,8,2 1,2,5,0,4,3 1,0",
      encodeStr: null,
      decodeStr: null,
    };
  },
  methods: {
    handleEncode() {
      const encodeArray = this.encode.split("");
      console.log("encodeArray: ", encodeArray);

      const keyArray = this.key.split(" ");
      // console.log("keyArray: ", keyArray);

      const keyArraySub = keyArray.map((key) => {
        return key.split(",");
      });
      console.log("keyArraySub: ", keyArraySub);

      let start = 0;
      let end = 0;
      const encodeBlocks = [];
      keyArraySub.forEach((keys, index) => {
        end += keys.length;
        // console.log("end: ", end);
        // console.log("start: ", start);
        const block = encodeArray.slice(start, end);

        if (index === keyArraySub.length - 1) {
          if (encodeArray[end]) {
            for (let i = end; i < encodeArray.length; i++) {
              block.push(encodeArray[i]);
            }
          }
        }
        encodeBlocks.push(block);
        start += keys.length;
      });
      console.log("encodeBlocks: ", encodeBlocks);

      let error = false;
      keyArraySub.forEach((block, blockIndex) => {
        block.forEach((key, keyIndex) => {
          if (parseInt(key) > block.length - 1) {
            console.log(
              `ВЫХОД ЗА ГРАНИЦЫ В БЛОКЕ: ${blockIndex + 1} - КЛЮЧ: ${key}`
            );
            error = true;
          }
          if (this.handleDublicate(block, key, keyIndex)) {
            console.log(
              `ДУБЛИКАТ КЛЮЧА В БЛОКЕ: ${blockIndex + 1} - КЛЮЧ: ${key}`
            );
            error = true;
          }
        });
      });

      if (!error) {
        let encodeArrayObj = [];

        encodeBlocks.forEach((blockStr, blockIndex) => {
          const encodeObj = {};
          const blockKey = keyArraySub[blockIndex];
          blockKey.forEach((key, keyIndex) => {
            if (blockStr[keyIndex]) {
              encodeObj[key] = blockStr[keyIndex];
            }
          });
          encodeArrayObj.push(encodeObj);
        });

        encodeArrayObj = encodeArrayObj.filter(
          (obj) => Object.keys(obj).length > 0
        );

        console.log("encodeArrayObj: ", encodeArrayObj);

        let encodeStr = "";
        encodeArrayObj.forEach((block) => {
          Object.values(block).forEach((value) => {
            encodeStr += value;
          });
        });

        if (encodeStr.length < this.encode.length) {
          for (
            let index = encodeStr.length;
            index < this.encode.length;
            index++
          ) {
            encodeStr += encodeArray[index];
          }
        }

        console.log("encodeStr: ", encodeStr);
        this.encodeStr = encodeStr;
      }
    },

    handleDecode() {
      const decodeArray = this.decode.split("");
      console.log("decodeArray: ", decodeArray);

      const keyArray = this.key.split(" ");
      // console.log("keyArray: ", keyArray);

      const keyArraySub = keyArray.map((key) => {
        return key.split(",");
      });
      console.log("keyArraySub: ", keyArraySub);

      let start = 0;
      let end = 0;
      const decodeBlocks = [];
      keyArraySub.forEach((keys, index) => {
        end += keys.length;
        // console.log("end: ", end);
        // console.log("start: ", start);
        const block = decodeArray.slice(start, end);

        if (index === keyArraySub.length - 1) {
          if (decodeArray[end]) {
            for (let i = end; i < decodeArray.length; i++) {
              block.push(decodeArray[i]);
            }
          }
        }
        decodeBlocks.push(block);
        start += keys.length;
      });
      console.log("decodeBlocks: ", decodeBlocks);

      let error = false;
      keyArraySub.forEach((block, blockIndex) => {
        block.forEach((key, keyIndex) => {
          if (parseInt(key) > block.length - 1) {
            console.log(
              `ВЫХОД ЗА ГРАНИЦЫ В БЛОКЕ: ${blockIndex + 1} - КЛЮЧ: ${key}`
            );
            error = true;
          }
          if (this.handleDublicate(block, key, keyIndex)) {
            console.log(
              `ДУБЛИКАТ КЛЮЧА В БЛОКЕ: ${blockIndex + 1} - КЛЮЧ: ${key}`
            );
            error = true;
          }
        });
      });

      if (!error) {
        let decodeArrayObj = [];

        decodeBlocks.forEach((blockStr, blockIndex) => {
          const decodeObj = {};
          const blockKey = keyArraySub[blockIndex];
          blockKey.forEach((key, keyIndex) => {
            if (blockStr[key]) {
              decodeObj[keyIndex] = blockStr[key];
            }
          });
          decodeArrayObj.push(decodeObj);
        });

        decodeArrayObj = decodeArrayObj.filter(
          (obj) => Object.keys(obj).length > 0
        );

        console.log("decodeArrayObj: ", decodeArrayObj);

        let decodeStr = "";
        decodeArrayObj.forEach((block) => {
          Object.values(block).forEach((value) => {
            decodeStr += value;
          });
        });

        if (decodeStr.length < this.decode.length) {
          for (
            let index = decodeStr.length;
            index < this.decode.length;
            index++
          ) {
            decodeStr += decodeArray[index];
          }
        }

        console.log("decodeStr: ", decodeStr);
        this.decodeStr = decodeStr;
      }
    },

    handleDublicate(findKeys, findKey, findKeyIndex) {
      let countKey = 0;
      findKeys.forEach((key, keyIndex) => {
        if (key === findKey && keyIndex < findKeyIndex) {
          countKey += 1;
        }
      });

      return countKey > 0;
    },
  },
};
</script>

<style>
.richelieu {
  padding: 10px;
}

.richelieu__block {
  width: 500px;
  display: grid;
  grid-row-gap: 10px;
}

p {
  padding: 0;
  margin: 0;
}
</style>
