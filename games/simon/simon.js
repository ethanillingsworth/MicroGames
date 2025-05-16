import "../../jquery.js"

let sequence = []
let movesMade = []

let moveIndex = -1

let colors = ["red", "blue", "green", "yellow"]

let highscore = localStorage.getItem("highscore-simon") || 0
let score = 0

let buttonsDisabled = true

$("#highscore").text(highscore)


const circle = $('#circle');
const red = $('#red');
const green = $('#green');
const blue = $('#blue');
const yellow = $('#yellow');


function addHover(el, dir, color1, color2) {
    el[0].addEventListener('mouseenter', () => {
        if (!buttonsDisabled) circle.css(`border${dir}Color`, color2);

    });

    el[0].addEventListener('mouseleave', () => {
        if (!buttonsDisabled) circle.css(`border${dir}Color`, color1);
    });
}

addHover(red, "Top", 'red', '#ff6666')
addHover(green, "Left", 'green', '#66ff66')
addHover(blue, "Right", 'blue', '#6666ff')
addHover(yellow, "Bottom", 'yellow', '#ffff66')

function generateSequence() {
    let color = colors[Math.floor(Math.random() * 4)]
    if (sequence.length > 0) {
        do {
            color = colors[Math.floor(Math.random() * 4)]
        }
        while (color == sequence[sequence.length - 1])
    }
    sequence.push(color)

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showSequence() {
    for (let s of sequence) {
        console.log(s)
        if (s == "red") {
            circle.css(`borderTopColor`, '#ff6666');
        }
        else if (s == "green") {
            circle.css(`borderLeftColor`, '#66ff66');
        }
        else if (s == "blue") {
            circle.css(`borderRightColor`, '#6666ff');
        }
        else if (s == "yellow") {
            circle.css(`borderBottomColor`, '#ffff66');
        }


        await sleep(1000)

        circle.css(`borderTopColor`, 'red');
        circle.css(`borderLeftColor`, 'green');
        circle.css(`borderRightColor`, 'blue');
        circle.css(`borderBottomColor`, 'yellow');

    }
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function click(e, val) {
    e.on("click", () => {
        if (!buttonsDisabled) {
            circle.css(`borderTopColor`, 'red');
            circle.css(`borderLeftColor`, 'green');
            circle.css(`borderRightColor`, 'blue');
            circle.css(`borderBottomColor`, 'yellow');
            movesMade.push(val)
            moveIndex += 1
            if (movesMade[moveIndex] != sequence[moveIndex]) {
                buttonsDisabled = true
                $("#replay").text("Try again!")
                $("#replay").css("display", "block")

            }

            if (arraysAreEqual(movesMade, sequence)) {
                // move onto next round
                score += 1
                if (score > highscore) {
                    highscore = score
                    localStorage.setItem("highscore-simon", highscore)
                }
                $("#score").text(score)
                $("#highscore").text(highscore)

                buttonsDisabled = true
                play()
            }
        }
    })
}

click(red, "red")
click(blue, "blue")
click(green, "green")
click(yellow, "yellow")



function play() {
    moveIndex = -1
    movesMade = []
    generateSequence()
    showSequence()
    buttonsDisabled = false


    // wait for user to finish input
}

$("#replay").on("click", () => {

    $("#replay").css("display", "none")
    play()
})
