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


//I run thiis method to avoid a redirect caused by submitting the POST request by the form directly
//Instead, I copy the data from the form and create a separate request, in case you were curious
function verifyUpload(event) {
    event.preventDefault();
    let file = document.getElementById('uploadInput').files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
        fetch("/uploadFile", {
            method: "POST",
            body: JSON.stringify({data: event.target.result}),
            headers: {
                "Content-type": "application/json"
            }
        }).then(response => response.text()).then(text => {
            if(text == "-1") {
                document.getElementById("uploadDiv").innerHTML = "File Uploaded Succesfully!"
            }
            else {
                document.getElementById("uploadDiv").innerHTML = "File Not Uploaded, Error In Row " + text;
            }
        });
    };
}
