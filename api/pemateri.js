const mongodb = require('mongodb');

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
    app.post("/api/pemateri", function(req, res) {
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
                orang["_id"] = result.insertedId;
                res.send(
                    {
                        "code": 200,
                        "success": true,
                        "message": "ok",
                        "data": orang
                    }
                );
                writeLog("Pemateri", "POST", orang);
            }).catch(err => {
                console.error(err);
                res.json(
                    {
                        "code": 200,
                        "success": false,
                        "message": err
                    }
                );
            })
        } else {
            res.status(400).send({
                "code": 400,
                "success": false,
                "message": "Missing parameter"
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
                res.json(
                    {
                        "code": 200,
                        "success": true,
                        "message": "ok",
                        "data": result
                    }
                )
                writeLog("Pemateri", "GET", param.nama);
            }).catch(err => {
                console.error(err);
                res.json(
                    {
                        "code": 200,
                        "success": false,
                        "message": err
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
                res.json(
                    {
                        "code": 200,
                        "success": true,
                        "message": "ok",
                        "data": result
                    }
                )
                writeLog("Pemateri", "GET", param.nama);
            }).catch(err => {
                console.error(err);
                res.json(
                    {
                        "code": 200,
                        "success": false,
                        "message": err
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
    desc
    foto
    */
    app.put("/api/pemateri", function(req, res) {
        //do we need this ?
        let param = req.body;
        //update by id
        if(param.id) {
            let newData = {};
            if(param.nama)
                newData.nama = param.nama;
            if(param.desc)
                newData.desc = param.desc;
            if(param.foto)
                newData.foto = param.foto;
            if(Object.keys(newData).length > 0) {
                data.pemateri.findOneAndUpdate(
                    {
                        "_id": new mongodb.ObjectId(param.id)
                    },
                    {
                        $set: newData
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
                                "code": 200,
                                "success": true,
                                "message": "ok",
                                "data": result.value
                            }
                        )
                    } else {
                        res.json(
                            {
                                "code": 200,
                                "success": false,
                                "message": "Not found"
                            }
                        )
                    }
                }).catch(err => {
                    console.error(err);
                    res.json(
                        {
                            "code": 400,
                            "success": false,
                            "message": err
                        }
                    );
                })
            } else {
                res.status(400).send(
                    {
                        "code": 400,
                        "success": false,
                        "message": "Missing new data"
                    }
                )
            }
        } else {
            res.status(400).send(
                {
                    "code": 400,
                    "success": false,
                    "message": "Missing parameter"
                }
            )
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
            data.pemateri.findOneAndDelete(
                {
                    "_id": new mongodb.ObjectId(param.id)
                }
            ).then(result => {
                if(result.value == null) {
                    res.json(
                        {
                            "code": 200,
                            "success": false,
                            "message": "ID not found"
                        }
                    )
                } else {
                    res.json(
                        {
                            "code": 200,
                            "success": true,
                            "message": "ok",
                            "data": result.value
                        }
                    )
                    writeLog("Pemateri", "DELETE", result.value);
                }
            }).catch(err => {
                console.error(err);
                res.json(
                    {
                        "code": 200,
                        "success": false,
                        "message": err
                    }
                );
            })
        } else if(param.nama) {
            data.pemateri.findOneAndDelete(
                {
                    "nama": param.nama
                }
            ).then(result => {
                if(result.value == null) {
                    res.json(
                        {
                            "code": 200,
                            "success": false,
                            "message": "Nama not found"
                        }
                    )
                } else {
                    res.json(
                        {
                            "code": 200,
                            "success": true,
                            "message": "ok",
                            "data": result.value
                        }
                    )
                }
                writeLog("Pemateri", "DELETE", result.value);
            }).catch(err => {
                console.error(err);
                res.json(
                    {
                        "code": 200,
                        "success": false,
                        "message": err
                    }
                );
            })
        } else {
            res.json({
                "code": 400,
                "success": false,
                "message": "Missing parameter"
            });
        }
    });
}

module.exports = { start };