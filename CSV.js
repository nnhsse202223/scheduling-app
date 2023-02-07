function downloadCSV() {
    var csvData = getScheduleArray();
    var csvString = "Class, Teacher, Room, Period\n";
    csvData.forEach((row) => csvString += row.join(',') + '\n');
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);  
    hiddenElement.target = '_blank';
    hiddenElement.download = 'classes.csv';  
    hiddenElement.click();  
}
