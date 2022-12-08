
import React from "react";
import {  Link } from "react-router-dom";

import "./Home.css"



function Home() {
    return (
      <div class="background">
      
      <div class="text">
         <h2 class="text">Welcome to the Library</h2>
          <ul>
            <li id="list" ><Link to="books">List of Books</Link></li>
         
          
          </ul>
      </div>
 
  
      </div>

//<li id="list"><Link to="about">About</Link></li>


      
   
      
     
    );
  }
//not sure why we need a class for each li , ul will not work 
export default Home;


