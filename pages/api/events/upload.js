import { supabase } from '../../../utils/supabase';
import fs from 'fs'
const multiparty = require("multiparty")

//we need to disable bodyPraser in order uploading file, hence we need seperate post url
export const config = {
    api: {
        bodyParser: false
    }
};

const tableName = "events"
const bucket = "postgre"
const dest = "events/";

export default async function upload_events(req, res) {
    const {
        body,
        method
    } = req;
    switch(method) {
        case "POST":
            let form = new multiparty.Form()
            await form.parse(req, async function (err, fields, files) {
                if(fields.key[0] == process.env.SECRET_KEY) {
                    if(fields.title[0] && fields.date[0] && fields.open_date[0]) {
                        //fill open_attendance
                        fields.open_attendance[0] = fields.open_attendance[0] ? fields.open_attendance[0] : "07:00:00"
                        //fill close_attendance
                        fields.close_attendance[0] = fields.close_attendance[0] ? fields.close_attendance[0] : "23:59:59"
                        //fill desc
                        fields.desc[0] = fields.desc[0] ? fields.desc[0] : "Lorem Ipsum"
                        //fill starttime
                        fields.start_time[0] = fields.start_time[0] ? fields.start_time[0] : "08:00:00"

                        //upload to supabase storage
                        let buf = fs.readFileSync(files.photo[0].path)
                        let [_h, _m, _s] = new Date().toTimeString().split(' ')[0].split(':')
                        let pid = "-" + _h + "-" + _m + "-" + _s
                        let extension = files.photo[0].originalFilename.split('.').pop()
                        let filename = files.photo[0].originalFilename.split('.')
                        filename.splice(filename.length - 1, 1)
                        filename = filename.join(".") + pid + "." + extension
                        await supabase.storage.from(bucket).upload(dest + filename, buf, {
                            contentType: extension == "png" ? "image/png" : extension == "jpg" || "jpeg" ? "image/jpeg" : extension == "gif" ? "image/gif" : "text/plain;charset=UTF-8"
                        })
                        //get public url
                        let publicURL = await supabase.storage.from(bucket).getPublicUrl(dest + filename).publicURL
                    
                        let _res = await supabase.from(tableName).insert([
                            {title: fields.title[0], date: fields.date[0], open_date: fields.open_date[0], photo: publicURL, zoom: fields.zoom[0], open_attendance: fields.open_attendance[0], close_attendance: fields.close_attendance[0], desc: fields.desc[0], start_time: fields.start_time[0]}
                        ])
                        if(_res.error) {
                            console.error(_res.error);
                            res.status(400).send({
                                "status": 400,
                                "success": false,
                                "message": "An error occured",
                                "data": []
                            });
                        }

                        //update attendance link
                        //get id, update
                        const id_event = _res.body[0].id
                        const attendance = "https://postgre.pemro.id/attendance?eventId=" + id_event
                        _res = await supabase.from(tableName).update(
                            {attendance: attendance}
                        ).match(
                            {id: id_event}
                        )

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