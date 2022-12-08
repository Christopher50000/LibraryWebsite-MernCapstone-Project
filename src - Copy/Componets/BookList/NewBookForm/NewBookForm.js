import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client';

import './NewBookForm.css'


function addbook(bookid,booktitle,bookauthor,bookpublisher,bookisbn)
{
       // const date = format(new Date(),'dd/mm/yyyy')

        //window.alert("Test");

        let book={id:bookid,title:booktitle,author:bookauthor,publisher:bookpublisher,isbn:bookisbn,avail:true,who:"",due:""};
     
      // let book= {id:"8",title:"Be An HTML Hero3",author:"Jen Neric",publisher:"Coders-R-Us",isbn:"987-6-54-321123-2",avail:false,who:"Lisa",due:"1/3/23"};
        // Send data to the backend via POST
        fetch('http://localhost:3001/book', {  // Enter your IP address here
    
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        // needed to catch 403 error 
          method: 'POST', 
          mode: 'cors', 
          body: JSON.stringify(book) // body data type must match "Content-Type" header
    
        }).then(result=>{
            
                if(result.ok)
                {
                    console.log("success");
                    return result.json();
                }
                else
                {
                    console.log('failure Id already exists in the database');
                   let x=document.getElementById('error');

                   x.textContent="Invalid: Id already exists";
                }
            }
            
            
            ).then(window.location.reload())       
        .catch(error=>console.log('error===:',error));
       // ask how to fix please cannot solve when id is the same  
    }

    function fetchposterror()
    {
        
    }


    function callingfunc()
    {

    }



function NewBookForm(obj)
{
    //id:"8",title:"Be An HTML Hero3",author:"Jen Neric",publisher:"Coders-R-Us",isbn:"987-6-54-321123-2",avail:false,who:"Lisa",due:"1/3/23"}
    const [id,setID]=useState('');
    const [title,setTitle]=useState('');
    const [author,setAuthor]=useState('');
    const [publisher,setPublisher]=useState('');
    const [isbn,setIsbn]=useState('');
   
    const [error,setError]=useState(false);

    const handleSubmit=(e)=>
    {
        e.preventDefault();
        if(id.length==0 || title.length==0 || author.length==0||publisher.length==0||isbn.length==0)
        {
            setError(true);
        }
        else
        {
            setError(false);
            addbook(id,title,author,publisher,isbn);
        }
        
    }
    return( 
    
    <div className='For'>
        <div className='headerfornewbook'>Add a Book here!</div>
    <form onSubmit={handleSubmit}  >
    <label>Book Id:
        <div>
     
            <input id='input' placeholder='id'  onChange={e=>setID(e.target.value)} />
            
        </div>
        </label>
      
        <label>Book Title:
        <div>
            <input id='input'  placeholder='Title'onChange={e=>setTitle(e.target.value)} />
   
        </div>
        </label>
        <label>Book Author:
        <div>
            <input id='input'  placeholder='Author'onChange={e=>setAuthor(e.target.value)} />
 
        </div>
        </label>
        <label>Book Publisher:
        <div>
            <input id='input' placeholder='Publisher' onChange={e=>setPublisher(e.target.value)} />
  
        </div>
        </label>

        <label>Book ISBN:
        <div>
            <input id='input' placeholder='ISBN' onChange={e=>setIsbn(e.target.value)} />
         
        </div>
        </label>
         <button id="addbookbutton">
             Submit New Book
    
         </button>
         <br></br>
        
     </form>
     {error? <label id='error'>Invalid: Please Fill Out all Information</label>:""}
         <label id="error"></label>
     </div>
    )
    
}

export default NewBookForm;