import {supabase} from '../../utils/supabase'
import { getPhoto } from "../../utils/getPhoto";

const tableName = "presenters"

function shuffle(arr) {
    let i = arr.length, rng;
    while(0 !== i) {
        rng = Math.floor(Math.random() * i);
        i--;
        [arr[i], arr[rng]] = [arr[rng], arr[i]]
    }
    return arr
}

async function getPemateri(filter) {
    const user = supabase.auth.user()
    let res;
    if(filter) {
        if(filter.name) {
            res = await supabase.from(tableName).select("*").ilike("name", `%${filter.name}%`);
        } else if(filter.id) {
            res = await supabase.from(tableName).select("*").eq("id", parseInt(filter.id))
        }
    } else {
        res = await supabase.from(tableName).select("*");
    }
    if(res.error)
        throw res.error;

    //convert relative to absolute url supabase storage
    for(var i=0;i<res.body.length;i++) {
        res.body[i].photo = await getPhoto(res.body[i].photo) || "/"
    }
    return res.body;
}

async function insertPemateri(name, photo, desc, id_event, position, workplace) {
    const res = await supabase.from(tableName).insert([
        {name: name, photo:photo, desc:desc, id_event:id_event, position: position, workplace: workplace}
    ])
    if(res.error)
        throw res.error;
    return res.body;
}

async function updatePemateri(filter, newData) {
    const oldData = await getPemateri(filter)
    for(var k in newData) {
        if(newData[k] == null || newData[k] == undefined)
            newData[k] = oldData[k]
    }
    if(filter.id)
        filter = {id: filter.id}
    const res = await supabase.from(tableName).update(
        newData
    ).match(
        filter
    )
    if(res.error)
        throw res.error
    return res.body
}

async function deletePemateri(id) {
    const res = await supabase.from(tableName).delete().eq("id", parseInt(id))
    if(res.error)
        throw res.error
    return res.body
}

export default async function pemateri(req, res) {
    //body = post, query = ? url
    let result = {
        "status": 200,
        "success": true,
        "message": "ok",
        "data": []
    }
    const {
        query,
        body,
        method,
    } = req;
    switch(method) {
        case "POST":
            if(body.name && body.id_event && body.position && body.workplace) {
                result.data = await insertPemateri(body.name, body.photo, body.desc, body.id_event, body.position, body.workplace);
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
            if(query.random == "1")
                result.data = shuffle(result.data)
            if(parseInt(query.count) != NaN)
                result.data = result.data.slice(0, query.count)
            break
        case "PUT":
            if(body.id) {
                let newData = {
                    name: body.name,
                    photo: body.photo,
                    desc: body.desc,
                    id_event: body.id_event,
                    position: body.position,
                    workplace: body.workplace
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