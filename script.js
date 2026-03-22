let boxes = document.querySelectorAll(".choice");
let reset = document.querySelector(".resetGame");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let newGame = document.querySelector(".newGame");

let userTurn = true;

let count = 0;

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (userTurn) {
            choice.innerText = "X";
            choice.style.color = "red";
            userTurn = false;
        } else {
            choice.innerText = "O";
            choice.style.color = "black";
            userTurn = true;
        }
        count++;
        choice.disabled = true;
        let isWinner = winner();
        if (!isWinner && count === 9) {
            gameDraw();
        }
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (show) => {
    msg.innerText = `Congratulations, Winner is ${show}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const winner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

const startGame = () => {
    userTurn = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

reset.addEventListener("click", startGame);

newGame.addEventListener("click", startGame);
