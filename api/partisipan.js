function start(app, data, writeLog) {
    //PARTISIPAN
    /*
    Nama
    Email
    No
    Asal
    Info
    */
    /**** CREATE ****/
    /*
    */
    app.post("/api/partisipan", function(req, res) {
        let param = req.body;
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(param.email))) {
            res.json(
                {
                    "res": "invalid email"
                }
            )
            return;
        }
        if(param.nama && param.email && param.no && param.asal && param.info) {
            let orang = {
                "nama": param.nama,
                "email": param.email,
                "no": param.no,
                "asal": param.asal,
                "info": param.info
            }
            data.partisipan.insertOne(
                orang
            ).then(result => {
                res.send(
                    {
                        "res": "success",
                        "_id": result.insertedId
                    }
                );
                writeLog("Partisipan", "POST", orang);
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
    get list
    filters:
    nama
    no hp
    email
    cek:
    email
    */
    app.get("/api/partisipan/list", function(req, res) {
        let param = req.query;
        let filter = {};
        if(param.nama) {
            filter.nama ={
                "$regex": param.nama,
                "$options": "i"
            }
        }
        if(param.email) {
            filter.email ={
                "$regex": param.email,
                "$options": "i"
            }
        }
        if(param.no) {
            filter.no ={
                "$regex": param.no,
                "$options": "i"
            }
        }
        //not empty param
        if(Object.keys(filter).length > 0) {
            data.partisipan.find(filter).toArray().then(result => {
                res.json(result);
                writeLog("Partisipan", "GET", param.nama);
            }).catch(err => {
                console.error(err);
                res.status(400).send(
                    {
                        "res": err
                    }
                );
            });
        } else {
            data.partisipan.find().toArray().then(result => {
                res.json(result);
                writeLog("Partisipan", "GET", param.nama);
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
    app.get("/api/partisipan/cek", function(req, res) {
        let param = req.query;
        if(param.email) {
            data.partisipan.find(
                {
                    "email": param.email
                }
            ).toArray().then(result => {
                res.json(result);
                writeLog("Partisipan", "GET", param.nama);
            }).catch(err => {
                console.error(err);
                res.status(400).send(
                    {
                        "res": err
                    }
                );
            });
        } else {
            res.json({
                "res": "Missing parameter"
            });
        }
    });

    /**** UPDATE ****/
    /*
    Parameter:
    email / hp (priority email)
    new data -> choose
    newnama
    newemail
    newno
    newasal
    newinfo
    */
    app.put("/api/partisipan", function(req, res) {
        let param = req.body;
        let filter = {}
        if(param.email) {
            filter = {
                "email": param.email
            }
        } else if(param.no) {
            filter = {
                "no": param.no
            }
        } else {
            res.json({
                "res": "Missing parameter"
            });
        }
        if(Object.keys(filter).length > 0) {
            //get list data yang mau diupdate
            let newData = {
            };
            if(param.newnama) 
                newData["nama"] = param.newnama;
            if(param.newemail) 
                newData["email"] = param.newemail;
            if(param.newno) 
                newData["no"] = param.newno;
            if(param.newasal) 
                newData["asal"] = param.newasal;
            if(param.newinfo) 
                newData["info"] = param.newinfo;
            if(Object.keys(newData).length > 0) {
                data.partisipan.findOneAndUpdate(
                    filter,
                    {
                        $set: newData
                    },
                    {
                        upsert: false,
                        returnNewDocument: true
                    }
                ).then(result => {
                    if(result.value) {
                        writeLog("Partisipan", "PUT", result.value);
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
                res.json(
                    {
                        "res": "missing new data"
                    }
                )
            }
        }
    });

    /**** DELETE ****/
    /*
    Parameter:
    email / no (email priority)
    */
    app.delete("/api/partisipan", function(req, res) {
        let param = req.body;
        let filter = {}
        if(param.email) {
            filter = {
                "email": param.email
            }
        } else if(param.no) {
            filter = {
                "no": param.no
            }
        } else {
            res.json({
                "res": "Missing parameter"
            });
        }
        if(Object.keys(filter).length > 0) {
            data.partisipan.deleteOne(filter).then(result => {
                if(result.deletedCount == 0) {
                    res.status(400).send(
                        {
                            "res": "not found"
                        }
                    )
                } else {
                    res.json(
                        {
                            "res": "success"
                        }
                    )
                    writeLog("Partisipan", "DELETE", filter);
                }
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
}

module.exports = { start };