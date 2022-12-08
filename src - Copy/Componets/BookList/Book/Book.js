import React, { useState } from 'react'
import ReactDOM from 'react-dom/client';

import {  Form, Link, } from "react-router-dom";




import './Book.css'
import Formcheckout from ".//FormCheckOut/Formcheckout"






class Book extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            id:this.id,
            title:this.title,
            author:this.author,
            publisher:this.publisher,
            isbn:this.isbn,
            avail:this.avail,
            who:this.who,
            due:this.due
            };

        this.code="";


    


       
    

        // we will have a setState that will contain the list of books from the back end
        // const booklist=[]
        //add refresh method for changing the state of the book list
        // when changing the page when something is deleted or added , or checking something out 
        // fetch the express array that contains all values from database
        // dont worry about description just have a book detail page through routes , 
        // allocate routes // how to allocate routes  
       //   {id:"6",title:"Be An HTML Hero",author:"Jen Neric",publisher:"Coders-R-Us",isbn:"987-6-54-321123-2",avail:false,who:"Lisa",due:"1/3/23"}
    }

    async getbook()
    {
        fetch(`http://localhost:3001/book/${this.props.BookID}`) //// we could have also done book/+ book.id
        .then(res => res.json())
        .then(book =>
            {
            
                this.setState( book

                      /*  id: book.id,
                        title:book.title,
                        author:book.author,
                        publisher:book.publisher,
                        isbn:book.isbn,
                        avail:book.avail,
                        who:book.who,
                        due:book.due

                    */
                )

            }
       

        )

        
    }

   

    componentDidMount(){ this.getbook()} // it will be rendered twice for some reason ? ask 


    // do a com didmount that fetches each book and places them 
    // add buttons when wanting to check out 

    /* getbook(){
        fetch("http://localhost:3001/{)
        .then(res => res.json())
        .then(books => {
        this.setState({
        loading: false,
        books
        });
    });*/


  
  ChangeStatus(changeavail,Name)
  {
    let current =new Date();

    let FutureDay=new Date();

    FutureDay.setDate(current.getDate()+14);
    
    
    
    

    let FutureDate=parseInt(FutureDay.getMonth()+1)+'/'+parseInt(FutureDay.getDate()) + '/' + parseInt(FutureDay.getFullYear()%100);


    fetch(`http://localhost:3001/book/${this.props.BookID}`,{ // we could have also done book/+
    
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT', 
      mode: 'cors', 
      body: JSON.stringify({avail:!changeavail,who:Name,due:FutureDate}) // body data type must match "Content-Type" header

    }).then(data=> this.setState({avail:data.avail,who:data.who,due:data.due})).then(window.location.reload())  // weird thing going on here 
    //.then(console.log(JSON.stringify(item)))
    //.then(res =>res.json())
    //.then(data =>console.log(data))//this.setState({avail:data.avail1})})
  }

  ChangeStatus2(changeavail)
  {
     

    fetch(`http://localhost:3001/book/${this.props.BookID}`,{ // we could have also done book/+
    
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT', 
      mode: 'cors', 
      body: JSON.stringify({avail:!changeavail,who:" ",due:""}) // body data type must match "Content-Type" header

    }).then(data=> this.setState({avail:data.avail,who:data.who,due:data.due})).then(window.location.reload())  // weird thing going on here 
    //.then(console.log(JSON.stringify(item)))
    //.then(res =>res.json())
    //.then(data =>console.log(data))//this.setState({avail:data.avail1})})
  }



  


        
render() { // render seems to be the js part without the methods
    
    

    let DisplayAvail = ()=>
    {
     //console.log("IT works");
     if(this.state.avail)
        return <div> 
            <div className='detail'> Book Availability Status: Book is Available</div>
             {/* <button id="checkoutbutton" onClick={()=>{this.ChangeStatus(this.state.avail)}}> </button> */}
                                                       
               </div>;
     
     else
     {
         return <div>  
            <div className='detail'>Book Availability Status: Book is Unavailable</div>
            <div className='detail'>Who: {this.state.who}</div>
            <div className='detail'>Due: {this.state.due}</div>
            

          {/* <button id="checkInbutton" onClick={()=>{this.ChangeStatus(this.state.avail)}}>  </button> */}

            </div>
     }
    }
    let DisplayButton=()=>
    {
      
        
        if(this.state.avail)
            return <div className='Column2'>
               {/* <div> <form id="form">
                    <label>Name: 
                    <input 
                    type="text"
                    required
                    id="inputForName" 
                    onChange={this.handlechange}
                    placeholder="Name"
                     />
                     </label>
                </form>
               
                </div>
                <div> */}
                <div>
                <Formcheckout title={this} />
                {/* <button id="checkoutbutton1" onClick={()=>{this.ChangeStatus(this.state.avail)}}>Check Out </button>
                 */}
                </div>
            </div>
            else
            {

                return <div className='Column2'>
                <p id="message">Hello, {this.state.who} to check in your book, click the button below</p>
                <button id="checkoutbutton1" onClick={()=>{this.ChangeStatus2(this.state.avail)}}>Check In</button>
                </div>
            }
            // next to do make a code Id for the owner to put in so that 
            // they may check in the book if it actually them 
            // may need to create a seperate simple form
            // still need to do delete method 
            // and create a form so we can add a book to the list
    }


    return(
        <div className='BookInfoContainer'>
            <div className='Header'>
              <li ><Link to="/books">BookList</Link></li>
              <li ><Link to="../AvailableBooks">Available Books</Link></li> 
              <li ><Link to="../UnAvailableBooks">Unavailable Books</Link></li> 
            </div>
            
            
            <div className='Title'>
             
                <div className='coverdetail'>Book Details</div>
                
            </div>
           
        
            <div className='Row'>
                <div className='Column1'>
                <div className='detail'>ID: {this.state.id}</div>
                <div className='detail'>Title: {this.state.title}</div>
                <div className='detail'>Author: {this.state.author}</div>
                <div className='detail'>Publisher: {this.state.publisher}</div>
                <div className='detail'>ISBN: {this.state.isbn}</div>
                {DisplayAvail()}

            

                


                </div>
              
                {DisplayButton()}
      
              
                
                
            </div>
        </div>
    

   /* <div className='Display'>
    <div className='bookdetails'>
      <div className='detail'>ID: {this.state.id}</div>
      <div className='detail'>Title: {this.state.title}</div>
      <div className='detail'>Author: {this.state.author}</div>
      <div className='detail'>Publisher: {this.state.publisher}</div>
      <div className='detail'>ISBN: {this.state.isbn}</div>
      {DisplayAvail()}
      
      </div>
      <div className='OtherTable'>

      </div>
    </div>*/

       
       
    )
     
        
      

    

      
 
    
  
   } 
    // fact is a key in the express server 
    //ask when to use data =>{ } or data => very confusing
        
    
   
    
    

}
export default Book;
