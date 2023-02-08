var csvData;

function startCSV() {
    document.getElementById("create").style.display = "none";
    document.getElementById("loader").style.display = "block";
}

function createCSV() {
    csvData = [
        ['Programming 1', 'Schmit', '142', '3'],
        ['Consumer Economics', 'Smith', '112', '5'],
        ['Agriculture', 'Harrison', '156', '3'],
        ['Autos 1', 'Jacobs', '133', '8']
    ];
}

function endCSV() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("download").style.display = "block";
}


function downloadCSV() {
    var csvString = "Class, Teacher, Room, Period\n";
    csvData.forEach((row) => csvString += row.join(',') + '\n');
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);  
    hiddenElement.target = '_blank';
    hiddenElement.download = 'classes.csv';  
    hiddenElement.click();  
}

function csvFull() {
    startCSV();
    createCSV();
    setTimeout(endCSV, 5000);
}
