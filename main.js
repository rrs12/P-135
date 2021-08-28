objects = []
input = ""

function preload() {}

function setup() {
    createCanvas(480, 380)
    video = createCapture(VIDEO)
    video.hide()
}

function draw() {
    image(video, 0, 0, 480, 380)

    if (status != "") {
        objectDetector.detect(video, gotResult)
    }

    for (i = 0; i < objects.length; i++) {

        document.getElementById("number_of_objects").innerHTML = "Number of objects detected= " + objects.length


        fill(0, 0, 0);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(0, 0, 0);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if (input == objects[i].label) {
            document.getElementById("status").innerHTML ="Status=" + objects[i].label + "Found"
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(objects[i].label + "Found");
            synth.speak(utterThis);
        }
    }


}

function start() {
    input = document.getElementById("object").value
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status= Detecting Objects"
}

function modelLoaded() {
    console.log('Model Load ho gya hain')
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        objects = results
    }
}