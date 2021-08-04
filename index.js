//We need a robust security to prevent unauthorized api / api abuse.
/** 
Random thoughts:
1. Use referrer
2. Use secret key (RSA current minute maybe ?)
**/

/* TO DO
1. Consistent Array & JSON return value
2. Robust security
3. Search pemateri by event id
*/

//Express
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded());

app.set('port', (process.env.PORT || port));
app.use(express.static("public"));

//Mongodb
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
//Setting Database
const database = {
    "url": "mongodb+srv://kanatan:liminalia27@cluster0.axbg5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    "name": "postgre",
    "collection": [
        "pemateri",
        "partisipan",
        "event",
        "dokumentasi"
    ]
};


//logger
let logger =  function(collection, method, data = "") {
        switch(method) {
            case "POST":
                msg = "Added new data";
                break;
            case "GET":
                msg = "Requested data";
                break;
            case "PUT":
                msg = "Update data\n";
                break;
            case "DELETE":
                msg = "Delete data\n";
                break;
            default:
                break;
        }
        console.log("[" + collection + "]" + "[" + method + "] " + msg);
        if(data != "")
            console.log(data)
    };


//Main
MongoClient.connect(database.url, {
    useUnifiedTopology: true
}).then(client => {
    console.log("Connected to database");
    const db = client.db(database.name);
    let data = {
        "test": db.collection("partisipan")
    };

    //load db and add pages
    database.collection.forEach(i => {
        data[i] = db.collection(i)
        let p = require('./api/' + i);
        p.start(app, data, logger);
    });

    data.test.createIndex(
        {
            "email": 1,
            "no": 1
        },
        {
            "unique": true
        }
    );

    //START SERVER
    app.listen(app.get('port'), function() {
        console.log('[SERVER] Server started at port ' + app.get('port'));
    });

}).catch(err => console.error(err));