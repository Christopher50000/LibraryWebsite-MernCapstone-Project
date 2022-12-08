import React from 'react';
import {useParams} from "react-router";




import Book from './Book'

function GetBook()
{
    const {id} = useParams();



    return (
       
            <Book BookID={id}/>
       
    );



}

export default GetBook;