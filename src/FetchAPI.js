
import React, { Component } from "react";
import ReactDOM from "react-dom";

 // This is how to fetch an api 
function FetchAPI()
{
    let state=[];

    const apiGet = () =>{fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response =>  response.json())  // 
    .then(json=> console.log(json))
    }
   

    return (
        <div>
            My api <br />

            <button onClick={apiGet}>Fetch API</button>
           

        </div>
    )
}

export default FetchAPI;


  /* const apiGet = () =>{fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response =>  response.json())  // 
    .then(json=>{ console.log(json)
    })*/// gets the actal object 
  /*  const apiGet = () =>{fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response =>  response.json())  // 
    .then(json=>{ console.log(JSON.stringify(json))
    }) */// prints out a JSON text
   

    // The response object , is not the JSON response body but its the representaion of the entire HTTPS
    // response. So to extract the JSON body content from the REsponse object we use the json() method , 
    // which returns a second promise that resolves with the result of parsing the response body as text JSON 
   
    //Note that despite the method being named json(), the result is not JSON but is instead the result of 
    // taking JSON as input and parsing it to produce a JavaScript object.