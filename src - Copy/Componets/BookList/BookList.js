import React from 'react'
import ReactDOM from 'react-dom/client';

import {  Link } from "react-router-dom";

import './Booklist.css'

import NewBookForm from './NewBookForm/NewBookForm';


// need to make a form to add books also need to still create a refresher method somehow 
// need to use post and delete methods 
class BookList extends React.Component
{ // note to self probabaly use use effect that will probbably be the only way 
    constructor(props){
        super(props);
        this.state = {
            books: [],
            loading: true
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
        this.setState({
        loading: false,
        books:book
        })
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
        
    
    componentDidMount(){ this.getbooks();
    
    }


    addbook()
    {

            //window.alert("Test");
    
           let book= {id:"8",title:"Be An HTML Hero3",author:"Jen Neric",publisher:"Coders-R-Us",isbn:"987-6-54-321123-2",avail:false,who:"Lisa",due:"1/3/23"};
            // Send data to the backend via POST
            fetch('http://localhost:3001/book', {  // Enter your IP address here
        
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST', 
              mode: 'cors', 
              body: JSON.stringify(book) // body data type must match "Content-Type" header
        
            }).then(window.location.reload()) 
            
        }
    

    // render is a method that tell react what to display 

    // return is a method/ give output of function 


    render() { // render seems to be the js part without the methods
        const box=[2,5,4];
        const final=[];
        for (let r of box)
        {
            final.push(<li id="listitem" key={r}>{r} this is a test <button>Hello</button></li>)
        }
   
        
    





    return(
        // we will want to render this in a way that displays a list 
        
    //.map creates a new array from calling a function for every array element in 
    // we are in the /books link now so we need to go up a level using 
    //../about  we need to go to the paretn directory not ./about which is refering to the current directory 
   

    <div className="page" >
     
      
    <ul className='navbar'>
            
    <li ><Link to="/">Home</Link></li>
    <li ><Link to="../AvailableBooks">Available Books</Link></li> 
    <li ><Link to="../UnAvailableBooks">Unavailable Books</Link></li> 
    

    </ul>
    

      
        <div className='container'>
       
        
        <div className='bookcontainer'> 
        <div className='headerfornewbook'> List Of All Books</div>    
        {this.state.books.map((book,index) => (  // book is the current value , index is the index of the current value 
           
        <div className='book' key={index} >{`${book.id}.`}<Link to={`${book.id}`}>{book.title}</Link> </div>
       // this is where we need to put the link for the book and associate it with the id
             
                                    // express server 
        )

      
    
   // we needed to use .map so we can map through the array fetched from the 
   
    )}
       

     
     </div> 

     <NewBookForm />
      
      
    </div>
      
    
       
        
        
    </div>
     
        )}
}
// 
export default BookList;


// class BookList we need to do a get / fetch from express to get stuff as well as
// update the Router just in case we have another book from a post

// plan next time around we need to create a class that list number of books each with a id isbn etc , 
// even a source file
// if response is equal to post then we need to create a new route with new page along with adding it to the list of current 
// books 