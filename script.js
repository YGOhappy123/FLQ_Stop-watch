const minuteText = document.querySelector('.text--minute')
const secondText = document.querySelector('.text--second')
const hourText = document.querySelector('.text--hour')
const startClockBtn = document.querySelector('.btn--start')
const stopClockBtn = document.querySelector('.btn--stop')
const continueClockBtn = document.querySelector('.btn--continue')
const resetClockBtn = document.querySelector('.btn--reset')

const tickingSound = new Audio('./Assets/Audio/clock ticking.mp3')
const clickSound = new Audio('./Assets/Audio/mouse click.mp3')
clickSound.volume = 0.4
tickingSound.loop = true

let secondValue = 0
let minuteValue = 0
let hourValue = 0
let isPaused = false
let timeCount

const soundControl = {
    playSound() {
        clickSound.play()
        setTimeout(()=> {
            tickingSound.play()
        },1000)
    },
    stopSound() {
        clickSound.play()
        tickingSound.pause()
    }
}

const checkSecondValue = () => {
    return setInterval(() => {
        if (isPaused === false) {
            secondValue ++
            switch (true) {
                case (secondValue < 10):
                    secondText.innerText = '0' + secondValue
                break
                case (secondValue >= 10 && secondValue < 60):
                    secondText.innerText = secondValue
                break
                case (secondValue >= 60):
                    secondValue = 0
                    secondText.innerText = '00'
                    minuteValue++
                    checkMinuteValue()
                break
            }
        }
    },1000)
}

const checkMinuteValue = (value) => {
    switch (true) {
        case (minuteValue <= 1):
            minuteText.innerText = '0' + minuteValue
        break
        case (minuteValue >= 10 && minuteValue < 60):
            minuteText.innerText = minuteValue
        break
        case (minuteValue >= 60):
            minuteValue = 0
            minuteText.innerText = '00'
            hourValue++
            if (hourValue < 10) {
                hourText.innerText = '0' + hourValue
            } else {
                hourText.innerText = hourValue
            }
        break
    }
}

startClockBtn.onclick = function () {
    soundControl.playSound()
    timeCount = checkSecondValue()
    startClockBtn.disabled = true
    stopClockBtn.disabled = false
}

stopClockBtn.onclick = function () {
    soundControl.stopSound()
    isPaused = true
    stopClockBtn.disabled = true
    continueClockBtn.disabled = false
}

continueClockBtn.onclick = function () {
    soundControl.playSound()
    isPaused = false
    stopClockBtn.disabled = false
    continueClockBtn.disabled = true
}

resetClockBtn.onclick = function () {
    soundControl.stopSound()
    startClockBtn.disabled = false
    stopClockBtn.disabled = true
    continueClockBtn.disabled = true
    secondValue = 0
    minuteValue = 0
    hourValue = 0
    isPaused = false
    secondText.innerText = '00'
    minuteText.innerText = '00'
    hourText.innerText = '00'
    clearInterval(timeCount)
}
