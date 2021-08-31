import { supabase } from '../../../utils/supabase';
import fs from 'fs'
const multiparty = require("multiparty")

//we need to disable bodyPraser in order uploading file, hence we need seperate post url
export const config = {
    api: {
        bodyParser: false
    }
};

const tableName = "docs"
const bucket = "postgre"
const dest = "docs/"

export default async function upload_docs(req, res) {
    const {
        body,
        method
    } = req;
    switch(method) {
        case "POST":
            let form = new multiparty.Form()
            await form.parse(req, async function (err, fields, files) {
                if(fields.key[0] == process.env.SECRET_KEY) {
                    if(fields.id_event[0] && fields.desc[0]) {

                        //upload to supabase storage
                        let buf = fs.readFileSync(files.photo[0].path)
                        let [_h, _m, _s] = new Date().toTimeString().split(' ')[0].split(':')
                        let pid = "-" + _h + "-" + _m + "-" + _s
                        let extension = files.photo[0].originalFilename.split('.').pop()
                        let filename = files.photo[0].originalFilename.split('.')
                        filename.splice(filename.length - 1, 1)
                        filename = filename.join(".") + pid + "." + extension
                        await supabase.storage.from(bucket).upload(dest + filename, buf)
                        //get public url
                        let publicURL = await supabase.storage.from(bucket).getPublicUrl(dest + filename).publicURL

                        let _res = await supabase.from(tableName).insert([
                            {id_event: fields.id_event[0], desc:fields.desc[0], photo: publicURL}
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