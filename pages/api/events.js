import { supabase } from "../../utils/supabase"

const tableName = "events"

async function getEvents(filter) {
    let res = await supabase.from(tableName).select("*")
    if(filter) {
        if(filter.id) {
            res = await supabase.from(tableName).select("*").eq("id", parseInt(filter.id))
        } else if(filter.year) {
            res.body = res.body.filter(function (value, index, array) {
                return (value.date.split('-')[0] == filter.year);
            });
        }
    }
    
    if(res.error)
        throw res.error
    let presenters = await supabase.from("presenters").select("*")
    for(var i=0;i<res.body.length;i++) {
        let _ = []
        for(var j=0;j<presenters.body.length;j++) {
            if(res.body[i].id == presenters.body[j].id_event) {
                _.push(presenters.body[j].name)
            }
        }
        res.body[i].presenters = _;
    }
    return res.body
}

async function insertEvents(data) {
    if(data.open_attendance == null || data.open_attendance == undefined)
        data.open_attendance = "07:00:00"
    if(data.close_attendance == null || data.close_attendance == undefined)
        data.close_attendance = "23:59:59"
    const res = await supabase.from(tableName).insert([
        {title:data.title, date:data.date, open_date: data.open_date, photo: data.photo, attendance: data.attendance, zoom: data.zoom, open_attendance: data.open_attendance, close_attendance: data.close_attendance}
    ])
    if(res.error)
        return -1;
    //get id, then update attendance url
    const id_event = res.body[0].id
    const attendance = "https://postgre.pemro.id/attendance?eventId=" + id_event
    const filter = {
        id: id_event
    }
    updateEvents(filter, {attendance: attendance})
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
    let result = {
        "status": 200,
        "success": true,
        "message": "ok",
        "data": []
    }
    //body = post, query = ? url
    const {
        query,
        body,
        method,
    } = req;
    switch(method) {
        case "POST":
            if(body.title && body.date && body.open_date && body.photo) {
                result.data = await insertEvents(body)
                if(result.data == -1) {
                    result.success = false;
                    result.message = "Something err happened"
                }
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
                    open_date: body.open_date,
                    photo: body.photo,
                    attendance: body.attendance,
                    zoom: body.zoom
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