var theObj;

function startCSV() {
    document.getElementById("create").style.display = "none";
    document.getElementById("loader").style.display = "block";
}

function endCSV() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("download").style.display = "block";
}

function downloadCSV() {
    var schedular = theObj.multiverseArray[Math.floor(Math.random() * 2)].scheduleArray; //schedule[1]
    var csvString = "Period, Room, Teacher, Class\n";
    let n = 0;
    schedular.forEach((period) => {
        n++;
        period.forEach((room) => csvString += n + ',' + room.room_no + ',' + room.teacher.name + ',' + room.class.name + '\n');
    });
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);  
    hiddenElement.target = '_blank';
    hiddenElement.download = 'classes.csv';  
    hiddenElement.click();  
}

async function fullCSV() {
    startCSV();
    theObj = await (await fetch('/database')).json();
    endCSV();
}