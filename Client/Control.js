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
    let file = document.getElementById('uploadInput').files[0];
    if(file)
    {
        name += file.name;
    }
    else
    {
        name += "None";
    }
    document.getElementById("uploadDiv").innerHTML = name;
}

function verifyUpload(event) {
    let file = document.getElementById('uploadInput').files[0];
    event.preventDefault();

    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
        console.log(event.target.result);
        fetch("/uploadFile", {
            method: "POST",
            body: JSON.stringify({data: event.target.result}),
            headers: {
                "Content-type": "application/json"
            }
        }).then(response => response.text()).then(text => {
            console.log(text);
            if(text == "true") {
                document.getElementById("uploadDiv").innerHTML = "File Uploaded Succesfully!"
            }
            else {
                document.getElementById("uploadDiv").innerHTML = "File Not Uploaded, Invalid Data"
            }
        });
    };
}
