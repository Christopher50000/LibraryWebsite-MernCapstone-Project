



var express = require('express');
const {MongoClient, ReturnDocument} = require('mongodb');
var app = express();
app.use(express.json());// turns the body to an object insstead of text This makes incoming requests return as an object so we do not need to parse

//Could also use mongoose to make things easier and you can create things and update things locally with the datsbase 

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 
    'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 
     'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === "OPTIONS") res.sendStatus(200);
    else next();
    });


    app.use(function (req, res, next) {
         res.set('Cache-control', `no-store`)
         next();
    }
    );








/////////////////////////////////////////////////////////////////
let cs="mongodb+srv://ctupa500:Charger101@cluster0.tsvardc.mongodb.net/test";// creditals to get into db
let db;   //database varable 
let books;

async function start()
{
    const client= new MongoClient(cs); // creating an instance 
    await client.connect();       //returns a promise, so use .then or await

    db = client.db("RandomDB");   //select your database
    //console.log("db");
    books = db.collection("RandomCollection");   //select your collection
    app.listen(3001);
}

/////////////////////////////////////////////////////////////////
app.get('/book',(req,res)=>
{   //.find() method returns documents, the method is actually returning
    // a cursor to the documents 
    // the cursor is the pointer to the collection of documents returned 
    // the cursor will be iterated automatically when the result of the 
    // query is returned 
    // .toArray needs to be there or else we will be returning a cursor
    // we want an array 

    req.query.avail=undefined ? AvailBooks(): AvailBooks(req.query.avail);

  

// comment this line 
    function AvailBooks(avail)
    {
        if(req.query.avail===undefined)
        books.find({}).project({_id:0,id:1,title:1})
        .toArray().then( EveryBook => {
            res.json(EveryBook); // .json is used to stringify the object and then sends the response 
        })


        else 
        {
            //console.log(avail);
            if(avail==="true")
            {
            books.find({avail:true}).project({_id:0,id:1,title:1})
            .toArray().then( EveryBook => {
                res.json(EveryBook); // .json is used to stringify the object and then sends the response 
            });
            }

            else
            {
            books.find({avail:false}).project({_id:0,id:1,title:1})
            .toArray().then( EveryBook => {
                res.json(EveryBook); // .json is used to stringify the object and then sends the response 
            });
            }
        }

    

    }
})
/////////////////////////////////////////////////////////////////

app.get('/book/:id',(req,res)=>{
   // console.log(typeof(req.params.id));
    //find one has the first parameter that finds a field with a specific 
    // value and the second parameter acts as a projection of how you want to display 
 
    books.findOne({id:req.params.id},{projection:{_id:0}}) // returns a promise which contains an object 
    .then(myid=>{ if(myid==null)
        res.status(404).send(`The id of ${req.params.id} was not found`);
    else 
    {
      // const obj=myid.project({_id:0})
       res.send(JSON.stringify(myid));
    }
    });
});

const collectionOFBooks =[
    {id:"1",title:"Reactions in REACT",author:"Ben Dover",publisher:"Random House", isbn:"978-3-16-148410-0",avail:true,who:"",due:""},
    {id:"2",title:"Express-sions",author:"Frieda Livery",publisher:"Chaotic House",isbn:"978-3-16-148410-2",avail:true,who:"",due:""},
    {id:"3",title:"Restful REST",author:"Al Gorithm",publisher:"ACM",isbn:"978-3-16-143310-1",avail:true,who:"",due:""},
    {id:"4",title:"See Essess",author:"Anna Log",publisher:"O'Reilly",isbn:"987-6-54-148220-1",avail:false,who:"Homer",due:"1/1/23"},
    {id:"5",title:"Scripting in JS",author:"Dee Gitial",publisher:"IEEE",isbn:"987-6-54-321123-1",avail:false,who:"Marge",due:"1/2/23"},
    {id:"6",title:"Be An HTML Hero",author:"Jen Neric",publisher:"Coders-R-Us",isbn:"987-6-54-321123-2",avail:false,who:"Lisa",due:"1/3/23"}
];

var mapOfBooks=new Map();



for(let i of collectionOFBooks)
{
mapOfBooks.set(i.id,i)
}

//console.log(Array.from(mapOfBooks.values()));

/////////////////////////////////////////////////////////////////
// used to set the database back to what it was 
app.get('/refresh',(req,res)=>{
  // .delete Many will delete all documents you could also delete certain ones given parameters
    books.deleteMany({})
    .then(dr=>books.insertMany(Array.from(mapOfBooks.values())))
    .then(fr=>res.send("Resetted"));
    //given an array of documents ,.insertMany ,inserts each document in the array into a collection
    // collectionOfBooks is an 
    //books.insertMany(Array.from(mapOfBooks.values())); // Array.from turns map values into an array 
    
});
/////////////////////////////////////////////////////////////////


app.post("/book",(req,res)=>{

  // returns a promise which contains an object 
     console.log(req.body);
    books.findOne({id:req.body.id}).then(newid=>{ 
        if(newid==null){
        books.insertOne(req.body); // why we do not need to stringify this 
                                   // if we already have app.use(express.json())?
        res.send(`The new book with an id of ${req.body.id} was added`);
        }
        else
        {
            res.status(403).send(`The book with an id of ${req.body.id} already exists`);
        }
    }
    )
}
);

/////////////////////////////////////////////////////////////////

app.delete("/book/:id",(req,res)=>
{
   
   books.findOne({id:req.params.id})
   .then(deleted_id=>{ 
        if(deleted_id==null){
            res.status(204).send(`The book with an id was not found`); 
        }
        else
        {
            books.deleteOne(deleted_id);
            res.status(200).send(`The book with an id of ${req.params.id} was deleted `);

        }
    }
    );
  /*
    books.findOneAndDelete({id:req.params.id}).then(deletedbook=>{
        if (deletedbook.value==null)
        {   console.log(deletedbook);
            console.log(deletedbook.value);
           res.status(204).send(`The book with an id was not found`); 
        }
        else
        {   console.log(deletedbook.value);
            res.status(200).send(`The book with an id of ${req.params.id} was deleted `);

        }
    })
    */
});
/////////////////////////////////////////////////////////////////

app.put("/book/:id",(req,res)=>
{

    
   /* books.findOneAndUpdate({id:req.params.id},
        {$set:{id:req.body.id,title:req.body.title,author:req.body.author,
        publisher:req.body.publisher,isbn:req.body.isbn,avail:req.body.avail,
        who:req.body.who,due:req.body.due }})*/ //dont need to construct another object ,

        
        //$set setting the document equal to the object in this case req.body 
        books.findOneAndUpdate({id:req.params.id},{$set:req.body},{$ReturnDocument:true}).then(updatedId=>
            { //does the same without the $ReturnNewDocument it will update regardless 
               // console.log(updatedId);
                if(updatedId.value==null)//return an object that has properties of value 
                {
                    res.status(204).send(`The book with an id of ${req.params.id} was not found`);

                }
                else
                {
                    res.status(200).send(`The book with an id of ${req.params.id} was updated`);
                }
            })

        //res.status(200).send(`The book with an id of ${req.params.id} was updated`);

    }

    //.then(updatedbook=>{
       /* if(updatedbook==null)
        {
            res.status(404).send(`The id of ${req.params.id} was not found`);
         } */
        //else
        //{
           // console.log(updatedbook);
           // res.status(200).send(`The book with an id of ${req.params.id} was updated`);
        //}
   // })

);
start();


