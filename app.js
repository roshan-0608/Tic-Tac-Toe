let games = document.querySelectorAll(".game");
let msg = document.querySelector("#msg");
let resetbtn = document.querySelector("#reset");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

games.forEach((game) => {
    msg.innerText = "It's O's turn."
    game.addEventListener('click', () => {
        if(turnO){
            game.innerHTML = "O";
            msg.innerText = "It's X's turn."
            turnO = false;
        }
        else{
            game.innerHTML = "X";
            msg.innerText = "It's O's turn."
            turnO = true;
        }
        game.disabled = true;
        count++;
        let isWinner = checkWinner();

        if(count === 9 && !isWinner) gamedraw();
    })
})

const gamedraw = () => {
    msg.innerText = "Game ended in a draw!";
    disablebtns();
}
const resetgame = () => {
    turnO = true;
    count = 0;
    enablebtns();
}

const disablebtns = () => {
    for(let btn of games){
        btn.disabled = true;
    }
}

const enablebtns = () => {
    for(let btn of games){
        btn.disabled = false;
        btn.innerText = "";
        btn.style.backgroundColor = "#012622";
    }
    msg.innerText = "It's O's turn.";
}

const showWinner = (winner) => {
    msg.innerText = `Player ${winner} has Won!`;
    disablebtns();
}

const checkWinner = () => {
    for (let patterns of winPatterns){
        let posv1 = games[patterns[0]].innerText;
        let posv2 = games[patterns[1]].innerText;
        let posv3 = games[patterns[2]].innerText;

        if(posv1 != "" && posv2 != "" && posv3 != ""){
            if(posv1 === posv2 && posv2 === posv3){
                for (let idx of patterns){
                    games[idx].style.backgroundColor = "#E98A15";
                }
                showWinner(posv1);
                return true;
            }
        }
        
    }
    return false;
}

resetbtn.addEventListener('click', resetgame);