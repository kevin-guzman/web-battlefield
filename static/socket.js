let socket;
const initSocket = (id) => {
  socket = io.connect(
    "http://" + document.domain + ":" + location.port
  );

  socket.on("connect", function () {
    socket.emit("connected/player", id)
  });
}

function onAttack(id, x, y) {
  console.log("Atacanding->");
  socket.emit("attack", { id, x, y });
}

function onSendBoats(id = 0, boats = []) {
  console.log("Sending boats->", boats);
  socket.emit("connected/boats", { id, boats });
}