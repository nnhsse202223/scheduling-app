function startCSV() {
    document.getElementById("create").style.display = "none";
    document.getElementById("loader").style.display = "block";
}

function endCSV() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("download").style.display = "block";
}

function downloadCSV() {
    var csvData = getCSV();
    var csvString = "Class, Teacher, Room, Period\n";
    csvData.forEach((row) => csvString += row.join(',') + '\n');
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);  
    hiddenElement.target = '_blank';
    hiddenElement.download = 'classes.csv';  
    hiddenElement.click();  
}

function fullCSV() {
    startCSV();
    createCSV();
    setTimeout(endCSV, 5000);
}