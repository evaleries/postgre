import { supabase } from '../../../utils/supabase';
import multer from 'multer'
import fs from 'fs'

//we need to disable bodyPraser in order uploading file, hence we need seperate post url
export const config = {
    api: {
        bodyParser: false
    }
};

const tableName = "events"

const dest = "public/assets/events";

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

export default async function upload_events(req, res) {
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
                console.log(req.body)
                if(req.body.title && req.body.date && req.body.open_date) {
                    req.body.open_attendance = (req.body.open_attendance == null || req.body.open_attendance == undefined) ? "07:00:00" : req.body.open_attendance
                    req.body.close_attendance = (req.body.close_attendance == null || req.body.close_attendance == undefined) ? "23:59:59" : req.body.close_attendance
                    const _res = await supabase.from(tableName).insert([
                        {title: req.body.title, date: req.body.date, open_date: req.body.open_date, photo: "/assets/events/" + req.file.filename, zoom: req.body.zoom, open_attendance: req.body.open_attendance, close_attendance: req.body.close_attendance}
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
                    //get id, update
                    const id_event = _res.body[0].id
                    const attendance = "https://postgre.pemro.id/attendance?eventId=" + id_event
                    const update = await supabase.from(tableName).update(
                        {attendance: attendance}
                    ).match(
                        {id: id_event}
                    )
                    res.status(200).send({
                        "status": 200,
                        "success": true,
                        "message": "ok",
                        "data": update.body
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