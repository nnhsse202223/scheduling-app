let csvToJson = require('convert-csv-to-json');
let fs = require('fs');


// let json = csvToJson.parseSubArray(',',',').getJsonFromCsv('CustomClassData.csv');
let fileOutputName = 'data.json';
let fileInputName = 'CustomClassData.csv'

let json = csvToJson.parseSubArray('*','| ').getJsonFromCsv(fileInputName);



//is this code repeatable with different data?
for(let i=0; i<json.length;i++){
   if (json[i]['Course_ID'].slice(0,1) == "B"){
      json[i]['Class_Type'] = "Business";
   }
   else if(json[i]['Course_ID'].slice(0,1) == "J"){
      if (Number(json[i]['Course_ID'].slice(1,2))-2 <= 0){ //Where classes that start J1 to J2 are agriculture
         json[i]['Class_Type'] = "Agriculture";
      }
      else if (Number(json[i]['Course_ID'].slice(1,2)) - 2 > 0){ //where classes that go from J3 to J7 are Tech classes
         json[i]['Class_Type'] = "Technology";
      }
      
   }
   else if (json[i]['Course_ID'].slice(0,1) == "F"){ //classes that start with F are FACS classes
      json[i]['Class_Type'] = "FACS";
   }
   else{
      json[i]['Class_Type'] = "ERROR";
   }
   
}


for(let i=0; i<json.length;i++){
   console.log(json[i]);
}


json = JSON.stringify(json);
fs.writeFile("data.json",json,(err) => err && console.error(err));


//write notes about how to format data: *s, getting rid of spaces, |
