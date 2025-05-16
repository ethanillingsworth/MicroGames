import "../../jquery.js"


let highscore = parseInt(localStorage.getItem("highscore-passwordpanic")) || 0
let score = 0;

$("#highscore").text(highscore)


let length = 1
let password;

function generatePassword(len) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pass = '';
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        pass += chars[randomIndex];
    }
    password = pass;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function hidePassword() {
    let t = ""

    for (let i = 0; i < length; i++) {
        t += "•"
    }

    $("#password").text(t)
}

async function showPassword() {
    generatePassword(length)
    $("#password").text(password)

    await sleep(1500)

    hidePassword()
}

$("#input").attr("disabled", true)

async function checkWin() {
    if (password == $("#input").val()) {
        score += 1
        length += 1

        if (score > highscore) {
            highscore = score;
            localStorage.setItem("highscore-passwordpanic", highscore)
        }

        $("#score").text(score)
        $("#highscore").text(highscore)
        $("#input").attr("disabled", true).attr("maxlength", length).css("width", `${length}ch`).val("")
        $("#password").css("width", `${length}ch`)

        await showPassword()

        $("#input").attr("disabled", false).trigger("focus")
    }
    else {
        $("#input").attr("disabled", true)
        $("#password").text(password)

        $("#replay").css("display", "block")

    }
}


$("#confirm")
    .on("click", async () => {
        await checkWin()
    })

document.onkeyup = async (e) => {
    if (e.key == "Enter") {
        await checkWin()
    }
}



$("#replay").on("click", async () => {
    $("#replay").css("display", "none")
    length = 1
    $("#input").attr("maxlength", length).css("width", `${length}ch`).val("")
    $("#password").css("width", `${length}ch`)


    await showPassword()

    $("#input").attr("disabled", false)
    $("#input").trigger("focus")
})