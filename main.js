status = "";
video = "";
objects = [];

function preload(){

    video = createVideo("video.mp4");
    video.hide();

}

function setup(){

    canvas = createCanvas(800,600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

}

function start(){

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : OBJECTS DETECTING";
    name_of_object = document.getElementById("object_name").value;

}

function modelLoaded(){

    console.log("OK. HERE'S THE RULES. THIS MODEL HAS BEEN TURNED ON AND YOU ARE NOT ALLOWED TO TURN IT OFF UNLESS YOU WANT TO BE VERY SORRY.");
    status = true;

}

function draw(){

    image(video, 1, 1, 800, 600);

    if(status != ""){

        objectDetector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++){

            percent = floor(objects[i].confidence * 100);
            name_of_object_array = objects[i].label;
            fill("red");
            noFill();
            stroke("red");
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }

        if(objects[i].label == name_of_object){

            video.stop()
            objectDetector.detect(gotResults);
            document.getElementById("status").innerHTML = objects[i].label + " Found";
            synth = window.speechSynthesis;
            utterThis = SpeechSynthesisUtterance(objects[i].label + " found");
            synth.speak(utterThis);

        }

        else{

            document.getElementById("status").innerHTML = name_of_object + " Not Found";

        }

    }

}

function gotResults(error, results){

    if(error){

        console.log(error);

    }

    else{

        console.log(results)
        objects = results;

    }

}