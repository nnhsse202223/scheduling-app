//Data stored as a 2D array representing every class
var csvData = [
    ['Programming 1', 'Schmit', '142', '3'],
    ['Consumer Economics', 'Smith', '112', '5'],
    ['Agriculture', 'Harrison', '156', '3'],
    ['Autos 1', 'Jacobs', '133', '8']
];

//The function that turns the array into a CSV file and then downloads it to the users computer when a button is clicked
function downloadCSV() {
    //Header for the CSV file which starts out as a string
    var csvString = "Class, Teacher, Room, Period\n";
    
    //Add a comma to the end of each element and then add the contents of a whole row to the CSV file string, then move to a new line and repeat
    csvData.forEach((row) => csvString += row.join(',') + '\n');
    
    //???
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);  
    hiddenElement.target = '_blank';  
    hiddenElement.download = 'classes.csv';  
    hiddenElement.click();  
}
