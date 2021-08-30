import { supabase } from "../../utils/supabase"
import { getPhoto } from "../../utils/getphoto";

const tableName = "docs"

/*
id
title
postgre_year
photo
*/

async function getDocs(filter) {
    let res;
    if(filter) {
        if(filter.id) {
            res = await supabase.from(tableName).select(`
            id,
            photo,
            desc,
            events (
                title,
                date
            )
            `).eq("id", parseInt(filter.id))
        }
        if(filter.year) {
            res = await supabase.from(tableName).select(`
            id,
            photo,
            desc,
            events (
                title,
                date
            )
            `)
            //filter year
            let temp = []
            res.body.forEach(i => {
                let _year = i.events.date.split('-')[0]
                if(_year == filter.year)
                    temp.push(i)
            });
            res.body = temp
        }
        if(filter.title) {
            res = await supabase.from(tableName).select(`
            id,
            photo,
            desc,
            events (
                title,
                date
            )
            `).ilike("events.title", `%${filter.title}%`);
            res.body = res.body.filter(function (value, index, array) {
                return (value.events != null);
            });
        }
    } else {
        res = await supabase.from(tableName).select(`
        id,
        photo,
        desc,
        events (
            title,
            date
        )
        `);
    }
    if(res.error)
        throw res.error

    //convert relative to absolute url supabase storage
    for(var i=0;i<res.body.length;i++) {
        res.body[i].photo = await getPhoto(res.body[i].photo)
    }
    return res.body
}

async function insertDocs(id_event, desc, photo) {
    const res = await supabase.from(tableName).insert([
        {id_event: id_event, desc:desc, photo:photo}
    ])
    if(res.error)
        throw res.error;
    return res.body;
}

async function updateDocs(filter, newData) {
    const oldData = await getDocs(filter)
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

async function deleteDocs(id) {
    const res = await supabase.from(tableName).delete().eq("id", parseInt(id))
    if(res.error)
        throw res.error
    return res.body
}

export default async function docs(req, res) {
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
            if(body.id_event && body.id_photo && body.desc) {
                result.data = await insertDocs(body.id_event, body.desc, body.photo)
            } else {
                result.status = 400;
                result.success = false;
                result.message = "Missing argument"
            }
            break
        case "GET":
            result.data = query.year || query.title ? await getDocs(query) : await getDocs()
            break
        case "PUT":
            if(body.id) {
                let newData = {
                    id_event: body.id_event,
                    desc: body.desc,
                    photo: body.photo
                }
                result.data = await updateDocs(body, newData)
            } else {
                result.status = 400;
                result.success = false;
                result.message = "Missing argument"
            }
            break
        case "DELETE":
            if(body.id) {
                result.data = await deleteDocs(body.id)
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