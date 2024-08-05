Webcam.set({
    width: 350,
    fps: 144,
    height: 300,
    image_format: "png",
    image_quality: 100
});

predict_1 = "";
predict_2 = "";

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takesnapshot() {
    Webcam.snap(function (dataURI) {
        document.getElementById("result").innerHTML="<img src = '"+dataURI+"' id = 'capturedimage'>"
    })

}
console.log("V",ml5.version);

classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/7AShJPkAM/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth  = window.speechSynthesis;
    speak_data1 = "The First Prediction "+ predict_1;
    speak_data2 = "And The Second Prediction Is "+ predict_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    utterThis.rate = 0.8;
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('capturedimage');
    classifier.classify(img, gotresult);
}

function gotresult(error,result) {
    if (error) {
        console.error(error);
        
    } else {
        console.log(result);
        document.getElementById("resulte1").innerHTML=result[0].label;
        document.getElementById("resulte2").innerHTML=result[1].label;
        predict_1 = result[0].label;
        predict_2 = result[1].label;
        speak();
        if (predict_1 == "smile") {
            document.getElementById("update_emoji1").innerHTML = "&#128512";
        } 
        if (predict_1 == "angry") {
            document.getElementById("update_emoji1").innerHTML = "&#128544";
        } 
        if (predict_1 == "happy") {
            document.getElementById("update_emoji1").innerHTML = "&#128513";
        } 
        if (predict_1 == "Sad") {
            document.getElementById("update_emoji1").innerHTML = "&#128550;";
        } 


        if (predict_2 == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128550;";
        } 
        if (predict_2 == "happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128513;";
        } 
        if (predict_2 == "smile") {
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        } 
        if (predict_2 == "angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128544;";
        } 
    }
}

