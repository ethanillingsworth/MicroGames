import "../../jquery.js"


let highscore = parseInt(localStorage.getItem("highscore-speedclick")) || 0
let score = 0;

let paused = true;

$("#highscore").text(highscore)

let time = 30

function startTimer() {
    time = 30
    score = 0
    paused = false
    const id = setInterval(() => {
        time -= 0.1
        time = Math.round(time * 10) / 10
        $("#time").text(time)

        if (time <= 0) {
            clearInterval(id)
            paused = true
        }
    }, 100)

}

$("#click").on("click", () => {
    if (paused == true) {
        startTimer()
    }
    score += 1

    if (score > highscore) {
        highscore = score
        localStorage.setItem("highscore-speedclick", highscore)
    }
    $("#score").text(score)
    $("#highscore").text(highscore)

})