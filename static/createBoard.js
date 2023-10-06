function createEmptyMatrix(i, j) {
  return Array.from({ length: i }, () => Array(j).fill(0));
}

const fillSellectBoard = (id, i, j) => {
  let movements = 0;
  const maxMovements = Math.round(i / 2);
  const boats = [];
  const selectBoard = document.getElementById("select_board")

  const sendButton = document.createElement('button')
  sendButton.textContent = "Send board"
  sendButton.disabled = true
  sendButton.onclick = () => {
    onSendBoats(id, boats)
    sendButton.disabled=true
  }

  createEmptyMatrix(i, j).forEach((column, i) => {
    column.forEach((_, j) => {
      const button = document.createElement('button')
      button.textContent = '0'
      button.onclick = () => {

        if (movements > maxMovements) {
          return;
        }

        if (movements < maxMovements) {
          button.textContent = "1";
          boats.push({ x: i, y: j });
          movements++;
        } else if (movements == maxMovements) {
          button.textContent = "1";
          boats.push({ x: i, y: j });
          movements++;
          sendButton.disabled = false
        }
      }
      selectBoard.appendChild(button)
    })
    selectBoard.appendChild(document.createElement("br"))
  })


  selectBoard.appendChild(document.createElement("br"))
  selectBoard.appendChild(sendButton)
  selectBoard.appendChild(document.createElement("br"))
}

const fillAttackBoard = (id, i, j) => {
  const attackBoard = document.getElementById("attack_board")

  createEmptyMatrix(i, j).forEach((column, i) => {
    column.forEach((_, j) => {
      const button = document.createElement('button')
      button.textContent = '0'
      button.onclick = () => {
        onAttack(id, i, j);
      }
      attackBoard.appendChild(button)
    })
    attackBoard.appendChild(document.createElement("br"))
  })
}