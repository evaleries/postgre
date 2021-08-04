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


//Custom Function
let postgre = {
    log: function(collection, method, msg = "") {
        switch(method) {
            case "POST":
                msg = "Added new data: " + msg;
                break;
            case "GET":
                msg = "Requested data";
                break;
            case "PUT":
                msg = "Update data";
                break;
            case "DELETE":
                msg = "Delete data " + msg;
                break;
            default:
                break;
        }
        console.log("[" + collection + "]" + "[" + method + "] " + msg);
    }
};
function shuffle(arr) {
    var i = arr.length, rng;
    while(0 !== i) {
        rng = Math.floor(Math.random() * i);
        i--;
        [arr[i], arr[rng]] = [arr[rng], arr[i]];
    }
}

//Main
MongoClient.connect(database.url, {
    useUnifiedTopology: true
}).then(client => {
    console.log("Connected to database");
    const db = client.db(database.name);
    let data = {
        "pemateri": db.collection("pemateri")
    };
    database.collection.forEach(i => {
        data[i] = db.collection(i);
    });

    //PEMATERI
    /*
    Nama: str
    Foto: blob / url ? kalo blob ntr terlalu gede
    Desc: str
    */
    /**** CREATE ****/
    /*
    */
    app.post("/api/pemateri", function(req, res) {
        let param = req.body;
        if(param.nama) {
            data.pemateri.insertOne(
                {
                    "nama": param.nama,
                    "desc": param.desc || "",
                    "foto": param.foto || ""
                }
            ).then(result => {
                res.send(
                    {
                        "res": "success",
                        "_id": result.insertedId
                    }
                );
                postgre.log("Pemateri", "POST", param.nama);
            }).catch(err => {
                console.error(err);
                res.status(400).send(
                    {
                        "res": err
                    }
                );
            })
        } else {
            res.json({
                "res": "Missing parameter"
            });
        }
    });

    /**** READ ****/
    /*
    Parameter:
    nama
    count (opt)
    random (opt) 1 or no
    */
    app.get("/api/pemateri", function(req, res) {
        let param = req.query;
        if(param.nama) {
            data.pemateri.find({
                "nama": {
                    "$regex": param.nama,
                    "$options": "i"
                }
            }).toArray().then(result => {
                if(param.random == '1') {
                    shuffle(result);
                }
                if(parseInt(param.count) > 0 && parseInt(param.count) != NaN) {
                    result = result.slice(0, param.count);
                }
                res.json(result);
                postgre.log("Pemateri", "GET", param.nama);
            }).catch(err => {
                console.error(err);
                res.status(400).send(
                    {
                        "res": err
                    }
                );
            });
        } else {
            data.pemateri.find().toArray().then(result => {
                if(param.random == '1') {
                    shuffle(result);
                }
                if(parseInt(param.count) > 0 && parseInt(param.count) != NaN) {
                    result = result.slice(0, param.count);
                }
                res.json(result);
                postgre.log("Pemateri", "GET", param.nama);
            }).catch(err => {
                console.error(err);
                res.status(400).send(
                    {
                        "res": err
                    }
                );
            })
        }
    });

    /**** UPDATE ****/
    /*
    Parameter:
    id
    nama -> buat ganti ke baru
    */
    app.put("/api/pemateri", function(req, res) {
        //do we need this ?
        let param = req.body;
        //update by id
        if(param.id && param.nama) {
            data.pemateri.findOneAndUpdate(
                {
                    "_id": new mongodb.ObjectId(param.id)
                },
                {
                    $set: {
                        "nama": param.nama
                    }
                },
                {
                    upsert: false
                }
            ).then(result => {
                if(result.ok) {
                    postgre.log("Pemateri", "PUT", param.nama);
                    res.json(
                        {
                            "res": "success"
                        }
                    )
                } else {
                    res.status(400).send(
                        {
                            "res": "Not found"
                        }
                    )
                }
            }).catch(err => {
                console.error(err);
                res.status(400).send(
                    {
                        "res": err
                    }
                );
            })
        } else {
            res.json({});
        }
    });

    /**** DELETE ****/
    /*
    Parameter:
    id (priority)
    nama
    */
    app.delete("/api/pemateri", function(req, res) {
        let param = req.body;
        if(param.id) {
            data.pemateri.deleteOne(
                {
                    "_id": new mongodb.ObjectId(param.id)
                }
            ).then(result => {
                if(result.deletedCount == 0) {
                    res.status(400).send(
                        {
                            "res": "ID not found"
                        }
                    )
                } else {
                    res.json(
                        {
                            "res": "success"
                        }
                    )
                    postgre.log("Pemateri", "DELETE", param.id);
                }
            }).catch(err => {
                console.error(err);
                res.status(400).send(
                    {
                        "res": err
                    }
                );
            })
        } else if(param.nama) {
            data.pemateri.deleteOne(
                {
                    "nama": param.nama
                }
            ).then(result => {
                if(result.deletedCount == 0) {
                    res.status(400).send(
                        {
                            "res": "Nama not found"
                        }
                    )
                } else {
                    res.json(
                        {
                            "res": "success"
                        }
                    )
                }
                postgre.log("Pemateri", "DELETE", param.nama);
            }).catch(err => {
                console.error(err);
                res.status(400).send(
                    {
                        "res": err
                    }
                );
            })
        } else {
            res.json({});
        }
    });


    //DOKUMENTASI
    /*
    eventID: int
    pictures: {
        "blob": blob
        "desc": desc
    }
    */
    /**** CREATE ****/
    app.post("/api/dokumentasi", function(req, res) {
        let param = req.body;
    });

    /**** READ ****/
    app.get("/api/dokumentasi", function(req, res) {
        let param = req.body;
    });

    /**** UPDATE ****/
    app.put("/api/dokumentasi", function(req, res) {
        let param = req.body;
    });

    /**** DELETE ****/
    app.delete("/api/dokumentasi", function(req, res) {
        let param = req.body;
    });

    //EVENT
    /*
    Nama: str
    Pemateri: ref
    Tanggal: str dd-mm-yyyy
    Total peserta: int
    */
    /**** CREATE ****/
    app.post("/api/event", function(req, res) {
        let param = req.body;
    });

    /**** READ ****/
    app.get("/api/event", function(req, res) {
        let param = req.body;
    });

    /**** UPDATE ****/
    app.put("/api/event", function(req, res) {
        let param = req.body;
    });

    /**** DELETE ****/
    app.delete("/api/event", function(req, res) {
        let param = req.body;
    });


    //PARTISIPAN
    /*
    Nama: str
    No HP: str
    Email: str
    */

    //START SERVER
    app.listen(app.get('port'), function() {
        console.log('[SERVER] Server started at port ' + app.get('port'));
    });

}).catch(err => console.error(err));