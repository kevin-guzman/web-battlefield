let socket;
const initSocket = (id, i,j) => {
  socket = io.connect(
    "http://" + document.domain + ":" + location.port
  );

  socket.on("connect", function () {
    console.log("in on connect--->");
    socket.emit("connected/player", id)
    resetAllBoards()
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