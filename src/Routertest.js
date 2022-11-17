import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Componets/Home/Home";
import About from "./Componets/About/About";
import NotFound from "./Componets/NotFound/NotFound";
import BookList from "./Componets/BookList/BookList";

//First we wrapped our content around BrowserRouter 

//We then define our routes, then for each route we have Route 

// we give each route a path name 
//* catch all component that are not found within the site 
// <Route path="/books/detail" element={<BookList />} /> // 
// need to make a fetch for this one  and depending upon what book selected 
// will do a fetch with that particular id or what ever 

// express url should not be in UI at all 
class Routertest extends Component {
    render() {
      return (
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<BookList />} /> 
            

         
          </Routes>
       </BrowserRouter>
      );
    }
  } // FAQ will be used as the book list website 
  
  export default Routertest;
 /* 
 function Home() {
    return (
      <div>
        <h2>Home</h2>
          <ul>
            <li><Link to="about">About</Link></li>
            <li><Link to="faq">FAQ</Link></li>
          </ul>
      </div>
    );
  }
  function About() { return <h1>About</h1>; }
  function FAQ() { return <h2>FAQ</h2>; }
  function NotFound() { return <h1>derp</h1>; }
  */