const cells = document.querySelectorAll(".container li");
const restartBtn = document.querySelector(".restart button");
const statusText = document.querySelector(".status");

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let options = 
["", "", "",
 "", "", "",
 "", "", ""];
let currentPlayer = "X";
let running = false;

intializeGame();

function intializeGame(){
    cells.forEach((cell) => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex"); //number

    if(options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(cell){
    if (currentPlayer == "X")
        currentPlayer = "O"
    else 
        currentPlayer = "X"
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
        let roundWon = false;
        for(let i = 0; i < winCondition.length; i++)
        {
            const condition = winCondition[i];
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];
        
        if (cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if (cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins!!`;
        running = false;
    } else if (!options.includes("")){
        statusText.textContent = 'DRAW!';
        running = false;
    } else {
        changePlayer();
    }
}


function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];   
    cells.forEach((cell) => cell.textContent = "");
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}