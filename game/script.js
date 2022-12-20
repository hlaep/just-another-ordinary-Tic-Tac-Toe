const squares = document.getElementsByClassName('space')
const winDisplay = document.querySelector('[victory]')
const restartBtn = document.querySelector('.restart')
let spaces = Array.from(squares)

spaces.forEach(function (square) {
  square.addEventListener('click', function () {
    update(square)
    checkWin()
    draw(square)
  })
})

// > UPDATE < \\
let turn = 'x'

function update(square) {
  if (square.innerHTML) return
  switch (square.id) {
    case 'first':
      board[0][0] = turn
      break
    case 'second':
      board[0][1] = turn
      break
    case 'third':
      board[0][2] = turn
      break
    case 'fourth':
      board[1][0] = turn
      break
    case 'fifth':
      board[1][1] = turn
      break
    case 'sixth':
      board[1][2] = turn
      break
    case 'seventh':
      board[2][0] = turn
      break
    case 'eighth':
      board[2][1] = turn
      break
    case 'ninth':
      board[2][2] = turn
      break
  }
  if (turn === 'x') {
    turn = 'o'
  } else if (turn === 'o') turn = 'x'
}

let board = [
  [null, null, null], //first column
  [null, null, null], //2
  [null, null, null] //3
]

// > DRAW < \\
function draw(square) {
  if (square.innerHTML) return
  switch (turn) {
    case 'o':
      square.innerHTML = `<svg class = "x" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#087e8b" d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"/></svg>`
      break
    case 'x':
      square.innerHTML = `<svg class="o" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="#087e8b" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10S4.477 0 10 0Zm0 1.395a8.605 8.605 0 1 0 0 17.21a8.605 8.605 0 0 0 0-17.21Z"/></svg>`
      break
  }
}

// > CHECK WIN < \\
let roundStatus = undefined

function checkWin() {
  //Horizontal
  for (let i = 0; i < 3; i++) {
    if (isEqual(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0]
      displayWin()
      return
    }
  }

  //Vertical
  for (let i = 0; i < 3; i++) {
    if (isEqual(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i]
      displayWin()
      return
    }
  }

  //Diagonal
  if (isEqual(board[0][0], board[1][1], board[2][2])) {
    winner = board[1][1]
    displayWin()
    return
  }
  if (isEqual(board[0][2], board[1][1], board[2][0])) {
    winner = board[1][1]
    displayWin()
    return
  }

  checkTie()
}

function isEqual(x, y, z) {
  if (!x || !y || !z) return
  return x === y && y === z && z === x
}

function checkTie() {
  for (let i=0; i < board.length; i++) {
    let row = board[i]
    for(let i=0; i < row.length; i++) {
      if (!row[i]) return
    }
  }
  winDisplay.innerText = "Tie!"
  restartBtn.classList.remove('hidden')
}

// > DISPLAY WIN < \\
let winner = null

function displayWin() {
  winDisplay.innerText = `${winner} won!`
  restartBtn.classList.remove('hidden')

}

// > RESTART < \\

function restart() {
  document.location.reload(true)
}
