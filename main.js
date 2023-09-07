const startIndexOfSharedImages = [1, 6, 11, 16];
const indexOfSharedImages = [1, 6, 11, 16];
const sharedImagesSetNum = 5;
const intervalIDs = [];
const STOP = "Stop";
const START = "Start";

function init() {
    setImageInterval()
}

function setImageInterval() {
    const sharedImages = document.getElementsByClassName("sharedImage")
    for (let i = 0; i < sharedImages.length; i++) {
        // set the interval for each image
        var sharedImage = sharedImages[i];
        var time = getRndInteger(1, 6) * 1000;
        const intervalID = setInterval(changeSharedImage, time, sharedImage);

        // save the interval ID
        intervalIDs.push(intervalID)
    }
}

function getRndInteger(min, max) {
    // returns a random number between [min, max)
    return Math.floor(Math.random() * (max - min)) + min;
}

function changeSharedImage(image) {
    const imageID = Number(image.id[image.id.length - 1]);
    indexOfSharedImages[imageID - 1] = (indexOfSharedImages[imageID - 1] - startIndexOfSharedImages[imageID - 1] + 1) % 5 + startIndexOfSharedImages[imageID - 1];
    const imageNewID = indexOfSharedImages[imageID - 1]
    const imageNewURL = "https://picsum.photos/id/" + imageNewID.toString() + "/200/200";
    image.src = imageNewURL;
}

function changeIntervalStatus(event) {
    const clickedButton = event.target;
    const buttonID = Number(clickedButton.id[clickedButton.id.length - 1]);
    const buttonType = clickedButton.innerHTML;

    if (buttonType == STOP) {
        // stop the interval
        clearInterval(intervalIDs[buttonID - 1]);

        // change the button's label
        clickedButton.innerHTML = START;
    }
    else if (buttonType == START) {
        // change the button's label
        clickedButton.innerHTML = STOP;

        // delay and restart the interval
        const time = getRndInteger(1, 6) * 1000;
        const sharedImage = document.getElementById("sharedImage" + buttonID.toString());
        setTimeout(doNothing, time);
        const intervalID = setInterval(changeSharedImage, time, sharedImage);
        intervalIDs[buttonID - 1] = intervalID;
    }
}

function doNothing() { }