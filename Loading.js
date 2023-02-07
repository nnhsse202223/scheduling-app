var myVar;

function createCSV() {
    document.getElementById("create").style.display = "none";
    document.getElementById("loader").style.display = "block";
    myVar = setTimeout(newCSV, 3000);
}

function newCSV() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("download").style.display = "block";
}
