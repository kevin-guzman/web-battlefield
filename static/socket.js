let socket;
const initSocket = (id) => {
  socket = io.connect(
    "http://" + document.domain + ":" + location.port
  );

  socket.on("connect", function () {
    socket.emit("connected/player", id)
  });

  socket.on("update/attack", function (data) {
    const {x,y,id: attackId} = data;
    console.log("In update/attack -------->", data);
    if (attackId != id){
      onAttackReceived(x,y);
    }
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