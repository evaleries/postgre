import { supabase } from '../../../utils/supabase';
import multer from 'multer'
import fs from 'fs'

//we need to disable bodyPraser in order uploading file, hence we need seperate post url
export const config = {
    api: {
        bodyParser: false
    }
};

const tableName = "presenters"

const dest = "public/assets/presenters";

const up = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, dest)
        },
        filename: (req, file, cb) => cb(null, file.originalname)
    })
})

function deleteP(file) {
    try {
        fs.unlinkSync(dest + "/" + file)
    } catch (error) {
        console.error(error)
    }
}

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
                //cek param, desc is ok to be null
                if(req.body.name && req.body.id_event) {
                    const _res = await supabase.from(tableName).insert([
                        {name: req.body.name, photo: "/assets/presenters/" + req.file.filename, desc: req.body.desc, id_event: req.body.id_event}
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
            /*
            up.single("photo")(req, {}, err => {
                try {
                    req.body = JSON.stringify(req.body)
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
                //cek param, desc is ok to be null
                if(req.body.name) {
                    const _res = await supabase.from(tableName).insert([
                        {name: req.body.name, photo: "/assets/presenters/" + req.file.filename, desc: req.body.desc}
                    ])
                    if(_res.error) {
                        console.error(_res.error);
                        deleteP(req.file.filename)
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
                        "message": "An error occured",
                        "data": []
                    });
                }
            })
            */
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