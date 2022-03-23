import React from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import { useData } from "../contexts/DataContext";


//Create command line script with yargs
const argv = require('yargs').argv;

//Create constant variables for input and output variables (JSON & CSV)
const inputFileName = argv._[0];
const outputFileName = argv._[1];

//Read and parse JSON file using Node.js fs package
const {readFile, writeFile } = require("fs").promises

//Parsing JSON file
async function parseJSONFile (fileName) {
    try {
      const file = await readFile(fileName);
      return JSON.parse(file);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  //Convert format to CSV
  function arrayToCSV (data) {
    csv = data.map(row => Object.values(row));
    csv.unshift(Object.keys(data[0]));
    return `"${csv.join('"\n"').replace(/,/g, '","')}"`;
  }

  //Writer CSV file
  async function writeCSV (fileName, data) {
    try {
        await writeFile(fileName, data, 'utf8'); 
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  (async () => {
    const data = await parseJSONFile(inputFileName);
    const CSV = arrayToCSV(data);
    await writeCSV(outputFileName, CSV);
  console.log(`Successfully converted ${outputFileName}!`);
})();



// const { currentData } = useData();


// var data = [
//     ['Data', currentData.data], 
//     ['TimeStamp', currentData.timestamp],
//     ['ID', currentData.id],
// ];

// function download_csv_file() {  
  
//     var csv_file = 'Data Signals,TimeLog,ID\n';  
      
//     data.forEach(function(row) {  
//             csv_file += row.join(',');  
//             csv_file += "\n";  
//     });  
   
//     document.write(csv_file);  
  
//     var hiddenElement = document.createElement('a');  
//     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv_file);  
//     hiddenElement.target = '_blank';  
      
//     hiddenElement.download = 'Car Data';  
//     hiddenElement.click();  
// }  
