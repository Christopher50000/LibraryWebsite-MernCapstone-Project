import React from "react";
import "./ImageComponent.css";

function ImageComponent (){


    const myStyle={
        backgroundImage: 
 "url('https://th.bing.com/th/id/R.3cb4cd4128fb22620a5aed42eb63822b?rik=rYl1opjePk4Lpw&riu=http%3a%2f%2fgifimage.net%2fwp-content%2fuploads%2f2017%2f08%2fworld-of-warcraft-gif-16.gif&ehk=GkFMW%2bqJ5GZoWVfXHF%2bandA4qfU%2bLKQ6VM4N%2fxbWRVc%3d&risl=&pid=ImgRaw&r=0')",
        height:'100vh',
        marginTop:'-70px',
        fontSize:'50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
    return (
      //<div style={myStyle}>
        <h1 class="text"> The Library </h1>
     // </div>
    );
}

export default ImageComponent;