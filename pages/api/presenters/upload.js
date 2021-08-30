import { supabase } from '../../../utils/supabase';
import fs from 'fs'
const multiparty = require("multiparty")

//we need to disable bodyPraser in order uploading file, hence we need seperate post url
export const config = {
    api: {
        bodyParser: false
    }
};

const tableName = "presenters"
const bucket = "postgre"
const dest = "presenters/";

export default async function upload_presenters(req, res) {
    const {
        body,
        method
    } = req;
    switch(method) {
        case "POST":
            let form = new multiparty.Form()
            await form.parse(req, async function (err, fields, files) {
                if(fields.key[0] == process.env.SECRET_KEY) {
                    if(fields.name[0] && fields.id_event[0] && fields.position[0] && fields.workplace[0]) {
                        const _res = await supabase.from(tableName).insert([
                            {name: fields.name[0], photo: dest + files.photo[0].originalFilename, desc: fields.desc[0], id_event: fields.id_event[0], position: fields.position[0], workplace: fields.workplace[0]}
                        ])
                        if(_res.error) {
                            console.error(_res.error);
                            deleteP(req.file.filename)
                            res.status(400).send({
                                "status": 400,
                                "success": false,
                                "message": "An error occured",
                                "data": []
                            });
                        }

                        //upload to supabase storage
                        let buf = fs.readFileSync(files.photo[0].path)
                        await supabase.storage.from(bucket).upload(dest + files.photo[0].originalFilename, buf)
                        
                        res.status(200).send({
                            "status": 200,
                            "success": true,
                            "message": "ok",
                            "data": _res.body
                        })
                    } else {
                        res.status(400).send({
                            "status": 400,
                            "success": false,
                            "message": "Invalid Parameter",
                            "data": []
                        });
                    }
                } else {
                    res.status(200).send({
                        "status": 200,
                        "success": false,
                        "message": "Wrong key",
                        "data": []
                    });
                }
            })
            break
        default:
            res.status(405).send({
                "status": 405,
                "success": false,
                "message": `Method ${method} not allowed`,
                "data": []
            })
    }
}
/*
export default async function upload(req, res) {
    const {
        body,
        method
    } = req;
    switch(method) {
        case "POST":
            up.single("photo")(req, {}, async function(err) {
                try {
                    req.body = JSON.parse(JSON.stringify(req.body))
                } catch (error) {
                    res.status(400).send({
                        "status": 400,
                        "success": false,
                        "message": "Invalid JSON",
                        "data": []
                    });
                    deleteP(req.file.filename)
                    return;
                }
                if(req.body.key != process.env.SECRET_KEY) {
                    deleteP(req.file.filename)
                        res.status(200).send({
                            "status": 200,
                            "success": false,
                            "message": "Wrong key",
                            "data": []
                        });
                    return
                }
                //cek param, desc is ok to be null
                if(req.body.name && req.body.id_event && req.body.position && req.body.workplace) {
                    const _res = await supabase.from(tableName).insert([
                        {name: req.body.name, photo: "/assets/presenters/" + req.file.filename, desc: req.body.desc, id_event: req.body.id_event, position: req.body.position, workplace: req.body.workplace}
                    ])
                    if(_res.error) {
                        console.error(_res.error);
                        deleteP(req.file.filename)
                        res.status(400).send({
                            "status": 400,
                            "success": false,
                            "message": "An error occured",
                            "data": []
                        });
                    }
                    res.status(200).send({
                        "status": 200,
                        "success": true,
                        "message": "ok",
                        "data": _res.body
                    })
                } else {
                    deleteP(req.file.filename)
                    res.status(400).send({
                        "status": 400,
                        "success": false,
                        "message": "Invalid Parameter",
                        "data": []
                    });
                }
            })
            break;
        default:
            res.status(405).send({
                "status": 405,
                "success": false,
                "message": `Method ${method} not allowed`,
                "data": []
            })
    }
}
*/