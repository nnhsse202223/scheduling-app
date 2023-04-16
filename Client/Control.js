var x = false;

function startCSV() {
    document.getElementById("create").style.display = "none";
    document.getElementById("loader").style.display = "inline-block";
}

function endCSV() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("download").style.display = "inline-block";
}

function fullCSV() {
    startCSV();
    fetch('/database').then(endCSV());
}

function changeText() {
    let name = "File Chosen: ";
    if(document.getElementById('uploadInput').files[0])
    {
        x = true;
        name += document.getElementById('uploadInput').files[0].name;
    }
    else
    {
        name += "None";
    }
    document.getElementById("uploadDiv").innerHTML = name;
}

function changeTextUpload() {
    if(x){
        document.getElementById("uploadDiv").innerHTML = "File Uploaded!";
    }
}