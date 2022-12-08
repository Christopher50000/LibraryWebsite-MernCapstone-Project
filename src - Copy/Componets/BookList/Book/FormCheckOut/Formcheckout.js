import React, { useState } from 'react'
import ReactDOM from 'react-dom/client';

import './Formcheckout.css'


function Formcheckout(obj)
{
    
    const [Name,setName]=useState('');
    const [error,setError]=useState(false);

    const handleSubmit=(e)=>
    {
        e.preventDefault();
        if(Name.length==0)
        {
            setError(true);
        }
        else
        {
            setError(false);
            obj.title.ChangeStatus(obj.title.state.avail,Name);
        }
        
    }
    return( 
    
        <div>
    
    <form onSubmit={handleSubmit}  >
        <label>Name:
        <div>
            <input id='inputForName'  onChange={e=>setName(e.target.value)} />
            {error? <label id="error">Invalid:No Name was entered</label>:""}
        </div>
         <button id="checkoutbutton2">
             Check Out
         </button>
         </label>
     </form>
     </div>
    )
    
}

export default Formcheckout;