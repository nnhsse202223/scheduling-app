let csvToJson = require('convert-csv-to-json');
let fs = require('fs');


// let json = csvToJson.parseSubArray(',',',').getJsonFromCsv('CustomClassData.csv');
let fileOutputName = 'data.json';
let fileInputName = '/Users/amnguyen2/Desktop/scheduling-app/CustomClassData.csv'

let json = csvToJson.getJsonFromCsv(fileInputName);
for(let i=0; i<json.length;i++){
   console.log(json[i]);
}


//console.log(json.toString);
//json = JSON.stringify(json);
//fs.writefile("data.json",json);

