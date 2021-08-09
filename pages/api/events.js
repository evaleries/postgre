import { supabase } from "../../utils/supabase"

let result = {
    "status": 200,
    "success": true,
    "message": "ok",
    "data": []
}

const tableName = "events"

export default async function events(req, res) {
    //body = post, query = ? url
    const {
        query,
        body,
        method,
    } = req;
    switch(method) {
        case "POST":
            if(body.name) {
                result.data = await insertPemateri(body.name, body.photo, body.desc);
            } else {
                result.status = 400;
                result.success = false;
                result.message = "Missing argument"
            }
            break
        case "GET":
            if(query.id || query.name)
                result.data = await getPemateri(query)
            else 
                result.data = await getPemateri()
            break
        case "PUT":
            if(body.id) {
                let newData = {
                    name: body.name,
                    photo: body.photo,
                    desc: body.desc
                }
                result.data = await updatePemateri(body, newData);
            } else {
                result.status = 400;
                result.success = false;
                result.message = "Missing argument"
            }
            break
        case "DELETE":
            if(body.id) {
                result.data = await deletePemateri(body.id)
            }  else {
                result.status = 400;
                result.success = false;
                result.message = "Missing argument"
            }
            break
        default:
            result.status = 405;
            result.success = false;
            result.message = `Method ${method} not allowed`
    }
    res.status(result.status).json(result)
}