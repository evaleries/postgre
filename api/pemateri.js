function shuffle(arr) {
    var i = arr.length, rng;
    while(0 !== i) {
        rng = Math.floor(Math.random() * i);
        i--;
        [arr[i], arr[rng]] = [arr[rng], arr[i]];
    }
}

function start(app, data, writeLog) {
    //PEMATERI
    /*
    Nama: str
    Foto: blob / url ? kalo blob ntr terlalu gede
    Desc: str
    */
    /**** CREATE ****/
    /*
    */
    app.post("/api/pemateri", function(req, res, writeLog) {
        let param = req.body;
        if(param.nama) {
            let orang = {
                "nama": param.nama,
                "desc": param.desc || "",
                "foto": param.foto || ""
            }
            data.pemateri.insertOne(
                orang
            ).then(result => {
                res.send(
                    {
                        "res": "success",
                        "_id": result.insertedId
                    }
                );
                writeLog("Pemateri", "POST", orang);
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
                writeLog("Pemateri", "GET", param.nama);
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
                writeLog("Pemateri", "GET", param.nama);
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
                    upsert: false,
                    returnNewDocument: true
                }
            ).then(result => {
                if(result.value) {
                    writeLog("Pemateri", "PUT", result.value);
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
                    writeLog("Pemateri", "DELETE", param.id);
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
                writeLog("Pemateri", "DELETE", param.nama);
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
}

module.exports = { start };