function fullCSV() {
    document.getElementById("create").style.display = "none";
    document.getElementById("loader").style.display = "inline-block";
    fetch("/database").then(endCSV());
}

function endCSV() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("download").style.display = "inline-block";
}

function changeText() {
    let name = "File Chosen: ";
    if(document.getElementById('uploadInput').files[0])
    {
        name += document.getElementById('uploadInput').files[0].name;
    }
    else
    {
        name += "None";
    }
    document.getElementById("uploadDiv").innerHTML = name;
}

function verifyUpload(event) {
    event.preventDefault();
    fetch("/check").then(response => response.text()).then(text => {
        if(text == "true") {
            document.getElementById("uploadDiv").innerHTML = "File Uploaded Succesfully!"
        }
        else {
            document.getElementById("uploadDiv").innerHTML = "File Not Uploaded, Invalid Data"
        }
    });
}
