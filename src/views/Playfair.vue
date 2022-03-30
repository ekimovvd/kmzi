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
        <input type="radio" id="ru" value="ru" v-model="lang" />
        <label for="ru"> Русский язык </label>
      </div>
      <div class="playfair__group">
        <input type="radio" id="en" value="en" v-model="lang" />
        <label for="en"> Английский язык </label>
      </div>
      <button @click="handleEncode">Зашифровать</button>
      <button @click="handleDecode">Расшифровать</button>
    </div>
    <p>
      {{ getColumns }}
    </p>
    <p>encodeStr: {{ encodeStr }}</p>
    <p>decodeStr: {{ decodeStr }}</p>
  </div>
</template>

<script>
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
      lang: "en",
    };
  },
  computed: {
    getColumns() {
      if (this.lang === "en") {
        return 5;
      } else if (this.lang === "ru") {
        return 6;
      }
    },
  },
  methods: {
    handleDecode() {
      this.decodeStr = "";
      const decode = this.decode.toUpperCase();
      let decodeArray = decode.split("");
      console.log("DecodeArray: ", decodeArray);

      let subBlocks = this.handleSubBlocks(decodeArray);
      console.log("Blocks: ", subBlocks);

      const keyArray = this.key.toUpperCase().split("");
      const lang = "en";
      const matrix = this.handleMatrix(lang, keyArray);
      console.log("Matrix: ", matrix);

      subBlocks.forEach((block) => {
        if (this.handleCheckRow(matrix, block)) {
          this.handleRowDecode(matrix, this.handleCheckRow(matrix, block));
        } else if (this.handleCheckRowRevers(matrix, block)) {
          this.handleRowReverseDecode(
            matrix,
            this.handleCheckRowRevers(matrix, block)
          );
        } else if (this.handleCheckColumn(matrix, block)) {
          this.handleColumnDecode(
            matrix,
            this.handleCheckColumn(matrix, block)
          );
        } else if (this.handleCheckColumnReverse(matrix, block)) {
          this.handleColumnReverseDecode(
            matrix,
            this.handleCheckColumnReverse(matrix, block)
          );
        } else if (this.handleCheckSquare(matrix, block)) {
          this.handleSquareDecode(
            matrix,
            this.handleCheckSquare(matrix, block)
          );
        }
      });
    },

    handleEncode() {
      this.encodeStr = "";
      const encode = this.encode.toUpperCase();
      let encodeArray = encode.split("");
      encodeArray = encodeArray.map((symbol) => {
        if (this.arr_RU.includes(symbol)) {
          return symbol;
        } else if (this.arr_EN.includes(symbol)) {
          return symbol;
        }
      });

      encodeArray = encodeArray.filter((symbol) => symbol !== undefined);
      console.log("EncodeArray: ", encodeArray);

      let subBlocks = this.handleSubBlocks(encodeArray);
      console.log("Blocks: ", subBlocks);

      let newSubBlocks = this.handleAddSymbol(subBlocks);
      let shift = newSubBlocks.shift;
      let shifts = newSubBlocks.shifts;
      let subBlocksToArray = this.handleBlocksToArray(newSubBlocks.blocks);

      while (shift) {
        subBlocksToArray = this.handleBlocksToArray(newSubBlocks.blocks);
        subBlocks = this.handleSubBlocks(subBlocksToArray);
        newSubBlocks = this.handleAddSymbol(subBlocks);
        shift = newSubBlocks.shift;
        shifts = { ...shifts, ...newSubBlocks.shifts };
      }
      console.log("NewSubBlocks: ", newSubBlocks.blocks);
      console.log("SubBlocksToArray: ", subBlocksToArray);

      const correctSubBlocks = this.handleSubBlocks(subBlocksToArray);
      console.log("CorrectSubBlocks: ", correctSubBlocks);
      console.log("Shifts: ", shifts);

      const keyArray = this.key.toUpperCase().split("");
      const lang = "en";
      const matrix = this.handleMatrix(lang, keyArray);
      console.log("Matrix: ", matrix);

      correctSubBlocks.forEach((block) => {
        if (this.handleCheckRow(matrix, block)) {
          this.handleRowEncode(matrix, this.handleCheckRow(matrix, block));
        } else if (this.handleCheckRowRevers(matrix, block)) {
          this.handleRowReverseEncode(
            matrix,
            this.handleCheckRowRevers(matrix, block)
          );
        } else if (this.handleCheckColumn(matrix, block)) {
          this.handleColumnEncode(
            matrix,
            this.handleCheckColumn(matrix, block)
          );
        } else if (this.handleCheckColumnReverse(matrix, block)) {
          this.handleColumnReverseEncode(
            matrix,
            this.handleCheckColumnReverse(matrix, block)
          );
        } else if (this.handleCheckSquare(matrix, block)) {
          this.handleSquareEncode(
            matrix,
            this.handleCheckSquare(matrix, block)
          );
        }
      });
    },

    handleRowDecode(matrix, params) {
      let columnIndexOne = params.columnIndexOne;
      let columnIndexTwo = params.columnIndexTwo;
      console.log("RowDecode!");
      console.log("rowIndex: ", params.rowIndex);
      console.log("columnIndexOne: ", columnIndexOne);
      console.log("columnIndexTwo: ", columnIndexTwo);
      console.log("block: ", params.block);

      const row = matrix[params.rowIndex];
      const rowLength = row.length;
      console.log("row: ", row);
      console.log("rowLength: ", rowLength);

      // if (columnIndexOne === 0) {
      //   columnIndexOne = rowLength - 1;
      // } else {
      //   columnIndexOne -= 1;
      // }

      // columnIndexTwo -= 1;

      columnIndexOne += 1;

      if (columnIndexTwo === rowLength - 1) {
        columnIndexTwo = 0;
      } else {
        columnIndexTwo += 1;
      }

      if (matrix[params.rowIndex][columnIndexOne]) {
        this.decodeStr += matrix[params.rowIndex][columnIndexOne];
      }

      if (matrix[params.rowIndex][columnIndexTwo]) {
        this.decodeStr += matrix[params.rowIndex][columnIndexTwo];
      }
    },

    handleRowReverseDecode(matrix, params) {
      let columnIndexOne = params.columnIndexOne;
      let columnIndexTwo = params.columnIndexTwo;
      console.log("RowReverseDecode!");
      console.log("rowIndex: ", params.rowIndex);
      console.log("columnIndexOne: ", columnIndexOne);
      console.log("columnIndexTwo: ", columnIndexTwo);
      console.log("block: ", params.block);

      const row = matrix[params.rowIndex];
      const rowLength = row.length;
      console.log("row: ", row);
      console.log("rowLength: ", rowLength);

      if (columnIndexOne === rowLength - 1) {
        columnIndexOne = 0;
      } else {
        columnIndexOne += 1;
      }

      columnIndexTwo += 1;

      if (matrix[params.rowIndex][columnIndexOne]) {
        this.decodeStr += matrix[params.rowIndex][columnIndexOne];
      }

      if (matrix[params.rowIndex][columnIndexTwo]) {
        this.decodeStr += matrix[params.rowIndex][columnIndexTwo];
      }
    },

    handleColumnDecode(matrix, params) {
      let rowIndexOne = params.rowIndexOne;
      let rowIndexTwo = params.rowIndexTwo;
      console.log("ColumnDecode!");
      console.log("rowIndexOne: ", rowIndexOne);
      console.log("rowIndexTwo: ", rowIndexTwo);
      console.log("columnIndexOne: ", params.columnIndexOne);
      console.log("columnIndexTwo: ", params.columnIndexTwo);
      console.log("block: ", params.block);

      const rows = matrix.length;
      console.log("rows: ", rows);

      // if (rowIndexTwo === rows - 1) {
      //   rowIndexTwo = 0;
      // } else {
      //   rowIndexTwo += 1;
      // }
      // rowIndexOne += 1;

      if (rowIndexOne === 0) {
        rowIndexOne = rows - 1;
      } else {
        rowIndexOne -= 1;
      }

      rowIndexTwo -= 1;

      if (matrix[rowIndexOne] && matrix[rowIndexOne][params.columnIndexOne]) {
        this.decodeStr += matrix[rowIndexOne][params.columnIndexOne];
      }

      if (matrix[rowIndexTwo] && matrix[rowIndexTwo][params.columnIndexTwo]) {
        this.decodeStr += matrix[rowIndexTwo][params.columnIndexTwo];
      }
    },

    handleColumnReverseDecode(matrix, params) {
      let rowIndexOne = params.rowIndexOne;
      let rowIndexTwo = params.rowIndexTwo;
      console.log("handleColumnReverseDecode!");
      console.log("rowIndexOne: ", rowIndexOne);
      console.log("rowIndexTwo: ", rowIndexTwo);
      console.log("columnIndexOne: ", params.columnIndexOne);
      console.log("columnIndexTwo: ", params.columnIndexTwo);
      console.log("block: ", params.block);

      const rows = matrix.length;
      console.log("rows: ", rows);

      rowIndexTwo += 1;

      if (rowIndexOne === rows - 1) {
        rowIndexOne = 0;
      } else {
        rowIndexOne += 1;
      }

      if (matrix[rowIndexOne] && matrix[rowIndexOne][params.columnIndexOne]) {
        this.decodeStr += matrix[rowIndexOne][params.columnIndexOne];
      }

      if (matrix[rowIndexTwo] && matrix[rowIndexTwo][params.columnIndexTwo]) {
        this.decodeStr += matrix[rowIndexTwo][params.columnIndexTwo];
      }
    },

    handleSquareDecode(matrix, params) {
      let rowIndexOne = params.rowIndexOne;
      let rowIndexTwo = params.rowIndexTwo;
      console.log("SquareDecode!");
      console.log("rowIndexOne: ", rowIndexOne);
      console.log("rowIndexTwo: ", rowIndexTwo);
      console.log("columnIndexOne: ", params.columnIndexOne);
      console.log("columnIndexTwo: ", params.columnIndexTwo);
      console.log("block: ", params.block);

      if (matrix[rowIndexOne] && matrix[rowIndexOne][params.columnIndexTwo]) {
        this.decodeStr += matrix[rowIndexOne][params.columnIndexTwo];
      }

      if (matrix[rowIndexTwo] && matrix[rowIndexTwo][params.columnIndexOne]) {
        this.decodeStr += matrix[rowIndexTwo][params.columnIndexOne];
      }
    },

    handleRowEncode(matrix, params) {
      let columnIndexOne = params.columnIndexOne;
      let columnIndexTwo = params.columnIndexTwo;
      console.log("RowEncode!");
      console.log("rowIndex: ", params.rowIndex);
      console.log("columnIndexOne: ", columnIndexOne);
      console.log("columnIndexTwo: ", columnIndexTwo);
      console.log("block: ", params.block);

      const row = matrix[params.rowIndex];
      const rowLength = row.length;
      console.log("row: ", row);
      console.log("rowLength: ", rowLength);

      columnIndexOne += 1;

      if (columnIndexTwo === rowLength - 1) {
        columnIndexTwo = 0;
      } else {
        columnIndexTwo += 1;
      }

      this.encodeStr +=
        matrix[params.rowIndex][columnIndexOne] +
        matrix[params.rowIndex][columnIndexTwo];

      console.log("columnIndexOne: ", columnIndexOne);
      console.log("columnIndexTwo: ", columnIndexTwo);
    },

    handleRowReverseEncode(matrix, params) {
      let columnIndexOne = params.columnIndexOne;
      let columnIndexTwo = params.columnIndexTwo;
      console.log("RowReverseEncode!");
      console.log("rowIndex: ", params.rowIndex);
      console.log("columnIndexOne: ", columnIndexOne);
      console.log("columnIndexTwo: ", columnIndexTwo);
      console.log("block: ", params.block);

      const row = matrix[params.rowIndex];
      const rowLength = row.length;
      console.log("row: ", row);
      console.log("rowLength: ", rowLength);

      columnIndexOne -= 1;

      if (columnIndexTwo === 0) {
        columnIndexTwo = row.length - 1;
      } else {
        columnIndexTwo -= 1;
      }

      this.encodeStr +=
        matrix[params.rowIndex][columnIndexOne] +
        matrix[params.rowIndex][columnIndexTwo];

      console.log("columnIndexOne: ", columnIndexOne);
      console.log("columnIndexTwo: ", columnIndexTwo);
    },

    handleColumnEncode(matrix, params) {
      let rowIndexOne = params.rowIndexOne;
      let rowIndexTwo = params.rowIndexTwo;
      console.log("ColumnEncode!");
      console.log("rowIndexOne: ", rowIndexOne);
      console.log("rowIndexTwo: ", rowIndexTwo);
      console.log("columnIndexOne: ", params.columnIndexOne);
      console.log("columnIndexTwo: ", params.columnIndexTwo);
      console.log("block: ", params.block);

      const rows = matrix.length;
      console.log("rows: ", rows);

      rowIndexOne += 1;

      if (rowIndexTwo === rows - 1) {
        rowIndexTwo = 0;
      } else {
        rowIndexTwo += 1;
      }

      this.encodeStr +=
        matrix[rowIndexOne][params.columnIndexOne] +
        matrix[rowIndexTwo][params.columnIndexTwo];

      console.log("rowIndexOne: ", rowIndexOne);
      console.log("rowIndexTwo: ", rowIndexTwo);
    },

    handleColumnReverseEncode(matrix, params) {
      let rowIndexOne = params.rowIndexOne;
      let rowIndexTwo = params.rowIndexTwo;
      console.log("handleColumnReverseEncode!");
      console.log("rowIndexOne: ", rowIndexOne);
      console.log("rowIndexTwo: ", rowIndexTwo);
      console.log("columnIndexOne: ", params.columnIndexOne);
      console.log("columnIndexTwo: ", params.columnIndexTwo);
      console.log("block: ", params.block);

      const rows = matrix.length;
      console.log("rows: ", rows);

      rowIndexOne -= 1;

      if (rowIndexTwo === 0) {
        rowIndexTwo = rows - 1;
      } else {
        rowIndexTwo -= 1;
      }

      this.encodeStr +=
        matrix[rowIndexOne][params.columnIndexOne] +
        matrix[rowIndexTwo][params.columnIndexTwo];

      console.log("rowIndexOne: ", rowIndexOne);
      console.log("rowIndexTwo: ", rowIndexTwo);
    },

    handleSquareEncode(matrix, params) {
      let rowIndexOne = params.rowIndexOne;
      let rowIndexTwo = params.rowIndexTwo;
      console.log("SquareEncode!");
      console.log("rowIndexOne: ", rowIndexOne);
      console.log("rowIndexTwo: ", rowIndexTwo);
      console.log("columnIndexOne: ", params.columnIndexOne);
      console.log("columnIndexTwo: ", params.columnIndexTwo);
      console.log("block: ", params.block);

      this.encodeStr +=
        matrix[rowIndexOne][params.columnIndexTwo] +
        matrix[rowIndexTwo][params.columnIndexOne];
    },

    handleSubBlocks(arr) {
      const blocks = [];
      let block = [];

      arr.forEach((symbol, symbolIndex) => {
        if (block.length > 1) {
          blocks.push(block);
          block = [];
        }
        block.push(symbol);

        if (arr.length - 1 === symbolIndex) {
          blocks.push(block);
          block = [];
        }
      });
      return blocks;
    },

    handleAddSymbol(arr) {
      let blocks = [];
      let block = [];
      let shift = false;
      let shifts = {};
      arr.forEach((subBlock, subBlockIndex) => {
        subBlock.forEach((symbol) => {
          block.push(symbol);
        });

        if (subBlock.length === 1) {
          if (this.arr_RU.includes(subBlock[0])) {
            if (subBlock[0] === "Ъ") {
              shifts[subBlockIndex] = "Ь";
              block.push("Ь");
            } else {
              shifts[subBlockIndex] = "Ъ";
              block.push("Ъ");
            }
          }

          if (this.arr_EN.includes(subBlock[0])) {
            if (subBlock[0] === "X") {
              shifts[subBlockIndex] = "Q";
              block.push("Q");
            } else {
              shifts[subBlockIndex] = "X";
              block.push("X");
            }
          }
        }

        if (subBlock[0] === subBlock[1]) {
          shift = true;
          if (this.arr_RU.includes(subBlock[0])) {
            if (subBlock[0] === "Ъ") {
              shifts[subBlockIndex] = "Ь";
              block.splice(1, 0, "Ь");
            } else {
              shifts[subBlockIndex] = "Ъ";
              block.splice(1, 0, "Ъ");
            }
          }

          if (this.arr_EN.includes(subBlock[0])) {
            if (subBlock[0] === "X") {
              shifts[subBlockIndex] = "Q";
              block.splice(1, 0, "Q");
            } else {
              shifts[subBlockIndex] = "X";
              block.splice(1, 0, "X");
            }
          }
        }

        blocks.push(block);
        block = [];
      });

      return { blocks, shift, shifts };
    },

    handleBlocksToArray(arr) {
      const subBlocksToArray = [];
      arr.forEach((block) => {
        block.forEach((symbol) => {
          subBlocksToArray.push(symbol);
        });
      });

      return subBlocksToArray;
    },

    handleMatrix(lang, key) {
      const alphabet =
        this.getColumns === 5 ? this.arr_EN.split("") : this.arr_RU.split("");
      const alphabetSymbols = [".", "!", ",", "@"];

      const matrix = [];
      let keyIndex = 0;
      for (let i = 0; i < 6; i++) {
        const row = [];
        for (let j = 0; j < this.getColumns; j++) {
          if (key[keyIndex]) {
            row.push(key[keyIndex]);
            alphabet.splice(alphabet.indexOf(key[keyIndex]), 1);
            keyIndex += 1;
          }
        }
        matrix.push(row);
      }

      let alphabetIndex = 0;
      let alphabetSymbolsIndex = 0;
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < this.getColumns; j++) {
          if (!matrix[i][j]) {
            if (!alphabet[alphabetIndex]) {
              matrix[i].push(alphabetSymbols[alphabetSymbolsIndex]);
              alphabetSymbolsIndex += 1;
            } else {
              matrix[i].push(alphabet[alphabetIndex]);
              alphabetIndex += 1;
            }
          }
        }
      }
      return matrix;
    },

    handleCheckRow(matrix, findBlock) {
      let rowIndex = null;
      let columnIndexOne = null;
      let columnIndexTwo = null;

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < this.getColumns; j++) {
          const findSymbolOne = matrix[i].find(
            (symbol) => symbol === findBlock[0]
          );
          const findSymbolTwo = matrix[i].find(
            (symbol) => symbol === findBlock[1]
          );

          if (findSymbolOne && findSymbolTwo) {
            columnIndexOne = matrix[i].indexOf(findBlock[0]);
            columnIndexTwo = matrix[i].indexOf(findBlock[1]);
            rowIndex = i;

            if (columnIndexOne > columnIndexTwo) {
              columnIndexOne = null;
              columnIndexTwo = null;
              rowIndex = null;
            }
          }
        }
      }
      return rowIndex !== null
        ? {
            rowIndex,
            columnIndexOne,
            columnIndexTwo,
            block: findBlock,
          }
        : null;
    },

    handleCheckRowRevers(matrix, findBlock) {
      let rowIndex = null;
      let columnIndexOne = null;
      let columnIndexTwo = null;

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < this.getColumns; j++) {
          const findSymbolOne = matrix[i].find(
            (symbol) => symbol === findBlock[0]
          );
          const findSymbolTwo = matrix[i].find(
            (symbol) => symbol === findBlock[1]
          );

          if (findSymbolOne && findSymbolTwo) {
            columnIndexOne = matrix[i].indexOf(findBlock[0]);
            columnIndexTwo = matrix[i].indexOf(findBlock[1]);
            rowIndex = i;

            if (columnIndexOne < columnIndexTwo) {
              columnIndexOne = null;
              columnIndexTwo = null;
              rowIndex = null;
            }
          }
        }
      }

      return rowIndex !== null
        ? {
            rowIndex,
            columnIndexOne,
            columnIndexTwo,
            block: findBlock,
          }
        : null;
    },

    handleCheckColumn(matrix, findBlock) {
      let rowIndexOne = null;
      let rowIndexTwo = null;
      let columnIndexOne = null;
      let columnIndexTwo = null;

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < this.getColumns; j++) {
          if (matrix[i][j] === findBlock[0]) {
            columnIndexOne = j;
            rowIndexOne = i;
          }
          if (matrix[i][j] === findBlock[1]) {
            columnIndexTwo = j;
            rowIndexTwo = i;
          }
        }
      }

      if (columnIndexOne && columnIndexTwo) {
        if (columnIndexOne !== columnIndexTwo) {
          rowIndexOne = null;
          rowIndexTwo = null;
          columnIndexOne = null;
          columnIndexTwo = null;
        } else {
          if (rowIndexOne > rowIndexTwo) {
            rowIndexOne = null;
            rowIndexTwo = null;
            columnIndexOne = null;
            columnIndexTwo = null;
          }
        }
      }

      return rowIndexOne !== null
        ? {
            rowIndexOne,
            rowIndexTwo,
            columnIndexOne,
            columnIndexTwo,
            block: findBlock,
          }
        : null;
    },

    handleCheckColumnReverse(matrix, findBlock) {
      let rowIndexOne = null;
      let rowIndexTwo = null;
      let columnIndexOne = null;
      let columnIndexTwo = null;

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < this.getColumns; j++) {
          if (matrix[i][j] === findBlock[0]) {
            columnIndexOne = j;
            rowIndexOne = i;
          }
          if (matrix[i][j] === findBlock[1]) {
            columnIndexTwo = j;
            rowIndexTwo = i;
          }
        }
      }

      if (columnIndexOne && columnIndexTwo) {
        if (columnIndexOne !== columnIndexTwo) {
          rowIndexOne = null;
          rowIndexTwo = null;
          columnIndexOne = null;
          columnIndexTwo = null;
        } else {
          if (rowIndexOne < rowIndexTwo) {
            rowIndexOne = null;
            rowIndexTwo = null;
            columnIndexOne = null;
            columnIndexTwo = null;
          }
        }
      }

      return rowIndexOne !== null
        ? {
            rowIndexOne,
            rowIndexTwo,
            columnIndexOne,
            columnIndexTwo,
            block: findBlock,
          }
        : null;
    },

    handleCheckSquare(matrix, findBlock) {
      let rowIndexOne = null;
      let rowIndexTwo = null;
      let columnIndexOne = null;
      let columnIndexTwo = null;

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < this.getColumns; j++) {
          if (matrix[i][j] === findBlock[0]) {
            columnIndexOne = j;
            rowIndexOne = i;
          }
          if (matrix[i][j] === findBlock[1]) {
            columnIndexTwo = j;
            rowIndexTwo = i;
          }
        }
      }

      return {
        rowIndexOne,
        rowIndexTwo,
        columnIndexOne,
        columnIndexTwo,
        block: findBlock,
      };
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
