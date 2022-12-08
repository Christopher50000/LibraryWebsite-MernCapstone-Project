var express = require('express');
var app = express();

/* The express .json method is used to parse the incoming 
requests with JSON payloads and is based upon the bodyparser. 
This method returns the middleware that only parses JSON and only 
looks at the requests where the content-type header matches the type option.*/
 app.use(express.json());// turns the body to an object insstead of text This makes incoming requests return as an object so we do not need to parse
 app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 
    'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 
     'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === "OPTIONS") res.sendStatus(200);
    else next();
    });

// Creating an array and creating a map 
    const collectionOFBooks =[
        {id:"1",title:"Reactions in REACT",author:"Ben Dover",publisher:"Random House", isbn:"978-3-16-148410-0",avail:true,who:"",due:""},
        {id:"2",title:"Express-sions",author:"Frieda Livery",publisher:"Chaotic House",isbn:"978-3-16-148410-2",avail:true,who:"",due:""},
        {id:"3",title:"Restful REST",author:"Al Gorithm",publisher:"ACM",isbn:"978-3-16-143310-1",avail:true,who:"",due:""},
        {id:"4",title:"See Essess",author:"Anna Log",publisher:"O'Reilly",isbn:"987-6-54-148220-1",avail:false,who:"Homer",due:"1/1/23"},
        {id:"5",title:"Scripting in JS",author:"Dee Gitial",publisher:"IEEE",isbn:"987-6-54-321123-1",avail:false,who:"Marge",due:"1/2/23"},
        {id:"6",title:"Be An HTML Hero",author:"Jen Neric",publisher:"Coders-R-Us",isbn:"987-6-54-321123-2",avail:false,who:"Lisa",due:"1/3/23"}
    ];

    var mapOfBooks=new Map();
    


for( var i of collectionOFBooks)
{
    mapOfBooks.set(i.id,i)
}

console.log(mapOfBooks);


    // Middleware used that handles various various cases 
    // if the book is not found , or if a book object needs to be updated 
  app.use('/book',function(req,res,next)
  {


    
    if(req.method=="POST" && mapOfBooks.has(req.body.id))
    {
        console.log("HERE");
        res.status(403).send(`The book with an id of ${req.body.id} already exists`);
        return;
    }
    next();

  });


 
  app.use( '/book/:id',function(req,res,next)
  { 
    
    let BookID=req.params.id;// gets the value from the request for id  
    let BookExistance=mapOfBooks.has(BookID);// true or false if id is contained in Books

    console.log(BookExistance);

  
    if(req.method=="DELETE" && !BookExistance)
    {   
        res.status(204).send(`The book with an id was not found`); // for some reason does not print out the message
        return;
    }
  
    console.log(BookExistance);
    console.log(req.method);

    if((req.method=="PUT" || req.method=="GET") && !BookExistance)
    {
        
        res.status(404).send(`The id of ${req.params.id} was not found`);
        return;
    }

    


    next();
});



app.get('/book',function(req,res)
{
    // display just the title
    //const list=Array.from(Books.values());
    
    
   //let isavil=req.query.avail //req.querey is the querey string .avail will 
                              // be the  ?avail=true or false 
                              // will alwayd req.querey will 
                              // return a string 

    /*
    console.log(typeof(req.query.avail));
        

    if(isavil=true) // put this in a function then to display rest of list 
    {
        console.log(req.query);
    }

    else if(isavil=false)
    {
        console.log(req.query);
    }
  */
    //console.log(req.query.avail);

    

    req.query.avail=undefined ? Books(): Books(req.query.avail);
    /*return res.json({
        id: req.query.id
    })*/


    function Books(avail)
    {
     let booklist=[];

     for(let values of mapOfBooks.values())
     {
        if(String(values.avail)==avail || avail==undefined)
        {
            booklist.push({id:values.id,title:values.title});
        }
       // console.log(values);
     }
    
    // console.log(booklist[0]);
     

/*
    for(var i=0;i<list.l;i++)
    { 
       // console.log(typeof(list[i].avail)); // prints  boolean
       // console.log(typeof(avail)); //prints a string 
        if(String(list[i].avail)==avail || avail==undefined)
       { 
        booklist.push({id:list[i].id,title:list[i].title});
       }
    }

    }*/

    res.json(booklist); // automatically stringifies
    //res.json() method sends a response with a converted JSON string using the JSON.Stringify method 
    }





});




app.get('/book/:id',function(req,res)
{
    //console.log(req.params.id);

   // console.log(list[req.params.id-1]);

    
    res.json(mapOfBooks.get(req.params.id));
  


});

//postman will be used here 
// using postman we create an object in JSON { "id":"7" , "title":""}

app.post("/book",function(req,res)
{

    // ask about how it goes back into a string without the need of strinigying the object 
    // very weird 


    var obj= req.body;
    //console.log(obj); // this is a JSON object we need to stringify it then add it to the list 
    test=JSON.stringify(obj); 
   // console.log(test); 

    //console.log(obj.title);
    
    mapOfBooks.set(req.body.id,obj); // ask why we do not need to stringify again 
    console.log(mapOfBooks.get(req.body.id));


    res.status(201).send(`The book ${obj.title} was added to the list of books`)
   
});

/*

for( i of collectionOFBooks)
{
    mapOfBooks.set(i.id,i)
}




for( i of collectionOFBooks)
{
    mapOfBooks.set(i.id,i)
}

*/
app.put("/book/:id",function(req,res)
{

     var obj =req.body
   // console.log(req.params.id);
   // temp=req.params.id
   // list[req.params.id-1]={id:temp,title:req.body.title,author:req.body.author,publisher:req.body.publisher,isbn:req.body.isbn,avail:req.body.avail,who:req.body.who,due:req.body.due};

    mapOfBooks.set(req.params.id, obj)
    
    //if (list[req.params.id-1].id!=req.params.id

    res.status(200).send(`The book with an id of ${req.params.id} was updated`);


});


app.delete("/book/:id",function(req,res)
{
    mapOfBooks.delete(req.params.id);

    res.status(200).send(`The book with an id of ${req.params.id} was deleted `);

});



app.listen(3001);

// need to convert body to an object so thats why express .json from the
// bigeining then we needed turn back the body into text to respond back to the client  



