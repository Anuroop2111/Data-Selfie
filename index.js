const express = require('express');
const Datastore = require('nedb'); //importing nedb
const app = express();
app.listen(3000, ()=>console.log('Listening at port 3000')); //Giving a call back fn,which executes after app listens to port 3000.
app.use(express.static('public')); //Used to serve static files such as image,css,javascript,html,etc.
//The root argument(here 'public') specifies the root directory from which to serve static assets. 

app.use(express.json({limit: '2mb'})); //This is used to parse the incoming request with json.

const database= new Datastore('database.db') //Creating a database and saving in local machine with the name 'database.db' 
database.loadDatabase();//Going to create a file when you first runs it, after that loads the database.

app.get('/api',(request,response)=>{
    database.find({},(err,data)=>{ //Using find fn to get all the data
        if(err){
            response.end();
            return;
        }
        response.json(data); //The json() method of the Response interface takes a Response stream and reads it to completion. It returns a promise which resolves with the result of parsing the body text as JSON.
    }) ;
    
});






//route to recieve the request.
app.post('/api', (request,response)=>{ //Call back fn which contains two variables. request: everything we need to know from the client side. response: variable used to send things to client side.
    console.log('I got a request');
    //console.log(request.body);
    const data =request.body;
    const timestamp = Date.now(); //It stores the time taken to execute. i.e., get the data.
    data.timestamp = timestamp;
    database.insert(data);//Inserting the data into the Database.
    //console.log(database)
    response.json({ //Sending out a response from server.
        //Status: "Success",
        //Timestamp: timestamp,
        //Latitude: data.latitude,
       // Longitude: data.longitude
    });
});