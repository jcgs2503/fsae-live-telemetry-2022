import React from "react";
import styled from "@emotion/styled";
import Form from "react-bootstrap/Form";
import { useData } from "../contexts/DataContext";


const { currentData } = useData();


var data = [
    ['Data', currentData.data], 
    ['TimeStamp', currentData.timestamp],
    ['ID', currentData.id],
];

function download_csv_file() {  
  
    var csv_file = 'Data Signals,TimeLog,ID\n';  
      
    data.forEach(function(row) {  
            csv_file += row.join(',');  
            csv_file += "\n";  
    });  
   
    document.write(csv_file);  
  
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv_file);  
    hiddenElement.target = '_blank';  
      
    hiddenElement.download = 'Car Data';  
    hiddenElement.click();  
}  
