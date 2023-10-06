function createEmptyMatrix(i, j) {
  return Array.from({ length: i }, () => Array(j).fill(0));
}

const boats = [];
let movements = 0;
const fillSellectBoard = (id, i, j) => {
  const maxMovements = Math.round(i / 2);
  const selectBoard = document.getElementById("select_board")

  const sendButton = document.createElement('button')
  sendButton.textContent = "Send board"
  sendButton.disabled = true
  sendButton.onclick = () => {
    onSendBoats(id, boats)
    sendButton.disabled = true
  }

  createEmptyMatrix(i, j).forEach((column, i) => {
    column.forEach((_, j) => {
      const button = document.createElement('button')
      button.textContent = '🌊'
      button.id = `attack_button_i:${i}_j:${j}`
      button.onclick = () => {
        if (movements > maxMovements) {
          return;
        }

        const markButton = () => {
          updateButonColor(button, "green")
          button.textContent = '🛳️'
        }

        if (movements < maxMovements) {
          markButton();
          boats.push({ x: i, y: j });
          movements++;
        } else if (movements == maxMovements) {
          markButton();
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
      button.textContent = '🌊'
      button.onclick = () => {
        onAttack(id, i, j);
      }
      attackBoard.appendChild(button)
    })
    attackBoard.appendChild(document.createElement("br"))
  })
  attackBoard.appendChild(document.createElement("br"))
}

const onAttackReceived = (i, j) => {
  const attackedButton = document.getElementById(`attack_button_i:${i}_j:${j}`)
  const prevColor = attackedButton.style.background;
  updateButonColor(attackedButton, "red")

  setTimeout(() => {
    attackedButton.style.background = prevColor;
  }, 1200)
}

const updateButonColor = (button, color) => {
  button.style.background=color;
}