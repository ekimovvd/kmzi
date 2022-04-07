<template>
  <div class="frequency">
    <button id="upload_btn">Выбрать файл</button>
    <input type="file" id="upload_input" />
  </div>
</template>

<script>
import SocketIOFileUpload from "socketio-file-upload";

export default {
  name: "Frequency",
  mounted() {
    const socket = window["__socket"];
    var siofu = new SocketIOFileUpload(socket);

    document
      .getElementById("upload_btn")
      .addEventListener("click", siofu.prompt, false);
    siofu.listenOnInput(document.getElementById("upload_input"));

    siofu.addEventListener("complete", function (event) {
      console.log(event.success);
      console.log(event.file);
    });

    socket.on("FILE:UPLOAD", (response) => {
      console.log(response);
    });
  },
  methods: {},
};
</script>

<style>
.frequency {
}

input[type="file"] {
  position: absolute;
  top: -500px;
}
</style>
