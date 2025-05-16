import "../../jquery.js"


let grid = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "🐿️", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]


let highscore = parseInt(localStorage.getItem("highscore-wackamunk")) || 0
let score = 0;

$("#highscore").text(highscore)


let disabled = false

async function start() {
    score = 0
    $("#score").text(score)
    grid = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ]
    let time = 30;
    let timerloop = setInterval(() => {
        if (time > 0) {
            time -= 1
            $("#time").text(time)
        }
    }, 1000)
    while (time > 0) {

        let x = Math.floor(Math.random() * grid.length)
        let y = Math.floor(Math.random() * grid[0].length)

        let odds = Math.floor(Math.random() * 3 + 1)

        if (grid[x][y] == "" && odds == 3) {
            grid[x][y] = "🐿️"
        }
        else {
            grid[x][y] = ""
        }
        $("#board").children().remove()

        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[0].length; y++) {
                const span = $("<span/>")
                span.text(grid[x][y])
                if (grid[x][y] == "🐿️") {
                    span.addClass("hover-effect")
                    span[0].onclick = function () {
                        score += 100
                        if (score > highscore) {
                            highscore += 100
                            localStorage.setItem("highscore-wackamunk", score)
                        }
                        $("#score").text(score)
                        $("#highscore").text(highscore)

                        grid[x][y] = ""
                    }
                }
                $("#board").append(span)
            }
        }

        await new Promise(r => setTimeout(r, 500));
    }

    clearInterval(timerloop)

    $("#board").children().remove()

    grid = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ]

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            const span = $("<span/>")
            span.text(grid[x][y])
            $("#board").append(span)
        }
    }
    disabled = true

    $("#replay").css("display", "block")
}

for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
        const span = $("<span/>")
        span.text(grid[x][y])
        if (x == 2 && y == 2) {
            span.addClass("hover-effect")

            span[0].onclick = async () => {
                // starts game
                await start()
            }
        }
        $("#board").append(span)
    }
}

$("#replay").on("click", async () => {
    if (disabled) {

        $("#replay").css("display", "none")
        disabled = false
        await start()

    }
})