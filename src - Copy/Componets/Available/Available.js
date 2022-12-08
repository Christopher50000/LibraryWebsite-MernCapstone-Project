import React from 'react'
import ReactDOM from 'react-dom/client';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';



import {  Link } from "react-router-dom";

import  './Available.css'



class Available extends React.Component
{ // note to self probabaly use use effect that will probbably be the only way 
  constructor(props){
      super(props);
      this.state = {
          books: [],
          loading: true,
          };
    
      // we will have a setState that will contain the list of books from the back end
      // const booklist=[]
      //add refresh method for changing the state of the book list
      // when changing the page when something is deleted or added , or checking something out 
      // fetch the express array that contains all values from database
      // dont worry about description just have a book detail page through routes , 
      // allocate routes // how to allocate routes  
  
  }

  // do a compdidmount that fetches each book and places them 
  // add buttons when wanting to check out 

   getbooks(){
      fetch("http://localhost:3001/book")
      .then(res =>
          {   
             if(res.status==200)
                console.log("Got books"+res.status)
               return res.json();
             
          } )
      .then(book => {
      this.setState({
      loading: false,
      books:book
      }).then(window.location.reload());
  });
}

  getbooksAvail(){
      fetch("http://localhost:3001/book?avail=true")
      .then(res =>
          {   
             if(res.status==200)
                console.log("Got books"+res.status)
               return res.json();
             
          } )
      .then(book => {
        
        if(book.length==0)
        {
            console.log("Success")
            let x=document.getElementsById('headerfornewbook');
            
           
            
        }
        else
        {
             this.setState({
            loading: false,
            books:book
             })  
        }
     // this.setState({
     // loading: false,
      //books:book
     // })
  });
  };

  getbooksUnAvail(){
      fetch("http://localhost:3001/book?avail=false")
      .then(res =>
          {   
             if(res.status==200)
                console.log("Got books"+res.status)
               return res.json();
             
          } )
      .then(book => {
      this.setState({
      loading: false,
      books:book
      })
  });
  };

 
 

  


  
  // fact is a key in the express server 
  //ask when to use data =>{ } or data => very confusing
      
  
  componentDidMount(){ this.getbooksAvail();
  
  }


  
  

  // render is a method that tell react what to display 

  // return is a method/ give output of function 


  render() { // render seems to be the js part without the methods






  return(
      // we will want to render this in a way that displays a list 
      
  //.map creates a new array from calling a function for every array element in 
  // we are in the /books link now so we need to go up a level using 
  //../about  we need to go to the paretn directory not ./about which is refering to the current directory 
 

  <div className="page" >
   
    
    <ul className='navbar'>
          
  <li ><Link to="/books">BookList</Link></li>
  <li ><Link to="../UnAvailableBooks">Unavailable Books</Link></li> 
  
  
  </ul>
  

    
      <div className='container'>
     
      
      <div className='zookcontainer'> 
      <div className='headerfornewbook'> All Available Books</div>    
      {this.state.books.map((book,index) => (  // book is the current value , index is the index of the current value 
         
      <div className='book' key={index} >{`${book.id}.`}<Link to={`/books/${book.id}`}>{book.title}</Link> </div>
     // this is where we need to put the link for the book and associate it with the id
           
                                  // express server 
      )

    
  
 // we needed to use .map so we can map through the array fetched from the 
 
  )}
     

   
   </div> 


    
  </div>

  
      
    
  
     
      
      
  </div>
   
      )}
}
// 
export default Available;


// class BookList we need to do a get / fetch from express to get stuff as well as
// update the Router just in case we have another book from a post

// plan next time around we need to create a class that list number of books each with a id isbn etc , 
// even a source file
// if response is equal to post then we need to create a new route with new page along with adding it to the list of current 
// books 
