to_speak="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90,
    });

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>'
    });
}
console.log('ml5version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/XohzLo4Up/model.json',model_loaded);

function model_loaded(){
    console.log("model loaded");
}

function Check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,got_results);
}
function got_results(error,results)
{
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        gesture=results[0].label;
    }
to_speak=" ";
    if(gesture=="amazing"){
        to_speak="This is looking Amazing";
        document.getElementById(update_emoji).innerHTML="&#128076";
    }
    else if(gesture=="best"){
        to_speak="This is marvelous";
        document.getElementById(update_emoji).innerHTML="&#128077";
    }
    else if(gesture=="victory"){
        to_speak="Nice work";
        document.getElementById(update_emoji).innerHTML="&#9996";
}
speak();
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data=to_speak;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
