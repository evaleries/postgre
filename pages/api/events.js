import { supabase } from "../../utils/supabase"
import { getPhoto } from "../../utils/getPhoto";

const tableName = "events"

function format12(time) {
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let fmt = hours >= 12 ? "PM" : "AM"
    hours = hours % 12
    hours = hours ? hours : 12
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    return `${hours}:${minutes} ${fmt}`
}

async function getEvents(filter) {
    let res = await supabase.from(tableName).select("*")
    if(filter) {
        if(filter.id || filter.eventId) {
            if(filter.eventId)
                filter.id = filter.eventId
            if(parseInt(filter.id) == NaN)
                return -1; //err 404
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
        //start time cv
        let d = new Date()
        d.setHours(parseInt(res.body[i].start_time.split(":")[0]), parseInt(res.body[i].start_time.split(":")[1]))
        res.body[i].start_time = format12(d)

        for(var j=0;j<presenters.body.length;j++) {
            if(res.body[i].id == presenters.body[j].id_event) {
                _.push(presenters.body[j])
            }
        }
        res.body[i].presenters = _;
    }

    if(res.body.length == 0)
        return -1; //success = false, data gak ada
    return res.body
}

async function insertEvents(data) {
    if(data.open_attendance == null || data.open_attendance == undefined)
        data.open_attendance = "07:00:00"
    if(data.close_attendance == null || data.close_attendance == undefined)
        data.close_attendance = "23:59:59"
    const res = await supabase.from(tableName).insert([
        {title:data.title, date:data.date, open_date: data.open_date, photo: data.photo, attendance: data.attendance, zoom: data.zoom, open_attendance: data.open_attendance, close_attendance: data.close_attendance, desc: data.desc, start_time: data.start_time}
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
            result.data = query.id || query.year || query.eventId ? await getEvents(query) : await getEvents()
            if(result.data == -1) {
                result.status = 200;
                result.success = false;
                result.message = "No data"
                result.data = []
            }
            break
        case "PUT":
            if(body.id) {
                let newData = {
                    title: body.title,
                    date: body.date,
                    open_date: body.open_date,
                    photo: body.photo,
                    attendance: body.attendance,
                    zoom: body.zoom,
                    open_attendance: body.open_attendance,
                    close_attendance: body.close_attendance,
                    desc: body.desc,
                    start_time: body.start_time
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