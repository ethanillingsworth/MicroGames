import "../../jquery.js"


let grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

let currentTurn = "X"
let xWins = 0
let oWins = 0
let disabled = false

function switchTurn() {
    if (currentTurn == "X") {
        currentTurn = "O"
    }
    else {
        currentTurn = "X"
    }
}

function checkWinState() {
    // Check for row wins
    if (grid.some(row => row.every(v => v === "X"))) {
        xWins += 1
        return true;
    }

    if (grid.some(row => row.every(v => v === "O"))) {
        oWins += 1
        return true;
    }

    // Check for column wins
    for (let col = 0; col < grid[0].length; col++) {
        let column = grid.map(row => row[col]);

        if (column.every(v => v === "X")) {
            xWins += 1

            return true;
        }

        if (column.every(v => v === "O")) {
            oWins += 1

            return true;
        }
    }


    // check main diagonal
    let mainDiagonal = grid.map((row, i) => row[i]);

    if (mainDiagonal.every(v => v === "X")) {
        xWins += 1

        return true

    }

    if (mainDiagonal.every(v => v === "O")) {
        oWins += 1

        return true

    }

    // check anti-diagonal
    let antiDiagonal = grid.map((row, i) => row[row.length - 1 - i]);

    if (antiDiagonal.every(v => v === "X")) {
        xWins += 1
        return true

    }

    if (antiDiagonal.every(v => v === "O")) {
        oWins += 1
        return true

    }

    if (grid.every((row) => row.every((v) => { return v != "" }))) {
        return true
    }


    return false
}

let nums = {
    "X": 2,
    "O": 1
}

let colors = {
    "X": "blue",
    "O": "red"
}

for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
        const span = $("<span/>")
        span.text(grid[x][y])


        span.on("click", function () {
            if (!disabled) {

                $(this).text(currentTurn).css("color", colors[currentTurn])


                $("#player").text(nums[currentTurn])

                grid[x][y] = currentTurn
                switchTurn()

                console.log(oWins)
                if (checkWinState()) {
                    $("#x-wins").text(xWins)
                    $("#o-wins").text(oWins)
                    disabled = true

                    $("#replay").css("display", "block")

                }

            }
        })

        $("#board").append(span)
    }
}

$("#replay").on("click", () => {
    if (disabled) {
        grid = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
        $("#player").text(1)
        currentTurn = "X"

        $("#board").children().text("")
        $("#replay").css("display", "none")

        disabled = false
    }
})