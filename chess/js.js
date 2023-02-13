var letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
var numbers = [1, 2, 3, 4, 5, 6, 7, 8];
var i;
var l;
var b = document.getElementById('board');
var star = document.getElementById('btn');
star.addEventListener("click", () => {


    drawXY();
    startTimer();
    showInstructions()
});

function startPlay() {
    drawBoard();



}

startPlay();
function drawBoard() {
    for (i = 1; i <= 8; i++) {
        letters.forEach((e) => {
            l = e;
            let smallRect = document.createElement("div");
            smallRect.style.width = "43px";
            smallRect.style.height = "43px";
            // smallRect.style.background = "green";
            smallRect.style.border = "1px solid white";
            smallRect.id = `${l}${i}`;
            smallRect.addEventListener("click", (event) => {
                //passing event.target.id as argument for the call back function, to be used in
                //it to know which element had been called and it's id
                checkInput(event.target.id);
            });


            if (
                i % 2 == 0 &&
                (l == letters[0] ||
                    l == letters[2] ||
                    l == letters[4] ||
                    l == letters[6])
            ) {
                smallRect.style.background = "green";
            }
            else if (
                i % 2 != 0 &&
                (l == letters[1] ||
                    l == letters[3] ||
                    l == letters[5] ||
                    l == letters[7])
            ) {
                smallRect.style.background = "green";
            }
            b.appendChild(smallRect);
        });

    }
}


function drawXY() {

    //print x
    b.children[0].innerHTML = `${b.children[0].id.split("").reverse().join("")}`;
    for (let i = 1; i < 8; i++) {
        b.children[i].innerHTML = `${b.children[i].id.split("")[0]
            }`;
    }
    //print y
    for (let j = 8; j < 64; j += 8) {
        b.children[j].innerHTML = `${b.children[j].id.split("")[1]
            }`;
    }

}

function startTimer() {
    const counter = document.getElementById("counter");
    var x = setInterval(() => {
        // edit in timer element
        currentTime = Number(`${counter.innerHTML}`.split(":")[1]);
        Nexttime = currentTime - 1;
        counter.innerHTML = `00:${String(Nexttime)}`;
        if (Nexttime == 0) {
            clearInterval(x);
        }
    }, 1000);
}

function showInstructions() {
    //give the player a random div to click
    let instructions = [];
    let instructionView = document.getElementById("instruction");
    const randomX =
        letters[Math.floor(Math.random() * letters.length)];
    const randomY =
        numbers[Math.floor(Math.random() * numbers.length)];
    instructions.push(randomX);
    instructions.push(randomY);
    instructions = instructions.join("");
    instructionView.innerHTML = `Click on : ${instructions}`;
    orders = instructions;
    instructions = instructions.split("");
    instructions.pop();
    instructions.pop();
}

function checkInput(targetId) {
    //validate input of the calller this matches the shown instructions
    if (targetId == orders) {
        //if it correct, add to score, show correct sign, show the next random x & y to instruct player
        //add to score
        let score = document.getElementById("score-board");
        let currentScore = Number(`${score.innerHTML}`.split(":")[1]);
        nextScore = currentScore + 1;
        score.innerHTML = `score:${String(nextScore)}`;
        // show correct sign
        const parent = document.getElementById("imgContainer");
        const img = document.createElement("img");
        img.src = "https://as1.ftcdn.net/v2/jpg/00/08/06/22/1000_F_8062235_95r1VLi5D4a2V5UvzxtBUIb44oHSqsPq.jpg";
        img.style.padding = "15px";
        parent.appendChild(img);
        //show the next random x & y to instruct player
        showInstructions();
    } else {
        //if it is not correct, show not correct sign, show the next random x & y to instruct player
        const parent = document.getElementById("imgContainer");
        const img = document.createElement("img");
        img.src = "https://as2.ftcdn.net/v2/jpg/03/76/40/93/1000_F_376409393_AplVbY9EcXNCQz6LPilH8RbScpeG8Cp9.jpg";
        img.style.padding = "15px";
        parent.appendChild(img);
        //show the next random x & y to instruct player
        showInstructions();
    }
}