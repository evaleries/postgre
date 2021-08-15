import { supabase } from "../../utils/supabase"

let result = {
    "status": 200,
    "success": true,
    "message": "ok",
    "data": []
}

const tableName = "events"

async function getEvents(filter) {
    let res = await supabase.from(tableName).select(`
    id,
    title,
    date,
    open_date
    `)
    if(filter) {
        if(filter.id) {
            res = await supabase.from(tableName).select(`
            id,
            title,
            date,
            open_date
            `).eq("id", parseInt(filter.id))
        } else if(filter.year) {
            for(var i=0;i<res.body.length;i++) {
                if(res.body[i].date.split('-')[0] != filter.year)
                    res.body.splice(i, 1)
            }
        }
    }
    if(res.error)
        throw res.error
    return res.body
}

async function insertEvents(title, date, open_date) {
    const res = await supabase.from(tableName).insert([
        {title:title, date:date, open_date: open_date}
    ])
    if(res.error)
        throw res.error;
    return res.body;
}

async function updateEvents(filter, newData) {
    const oldData = await getEvents(filter)
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

async function deleteEvents(id) {
    const res = await supabase.from(tableName).delete().eq("id", parseInt(id))
    if(res.error)
        throw res.error
    return res.body
}

export default async function events(req, res) {
    //body = post, query = ? url
    const {
        query,
        body,
        method,
    } = req;
    switch(method) {
        case "POST":
            if(body.title && body.date && body.open_date) {
                result.data = await insertEvents(body.title, body.date, body.open_date)
            } else {
                result.status = 400;
                result.success = false;
                result.message = "Missing argument"
            }
            break
        case "GET":
            result.data = query.year ? await getEvents(query) : await getEvents()
            break
        case "PUT":
            if(body.id) {
                let newData = {
                    title: body.title,
                    date: body.date,
                    open_date: body.open_date
                }
                result.data = await updateEvents(body, newData)
            } else {
                result.status = 400;
                result.success = false;
                result.message = "Missing argument"
            }
            break
        case "DELETE":
            if(body.id) {
                result.data = await deleteEvents(body.id)
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