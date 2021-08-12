import {supabase} from '../../utils/supabase'

let result = {
    "status": 200,
    "success": true,
    "message": "ok",
    "data": []
}

const tableName = "users"

async function getPartisipan(filter) {
    const user = supabase.auth.user()
    let res;
    if(filter) {
        if(filter.id) {
            res = await supabase.from(tableName).select("*").eq("id", parseInt(filter.id))
        } else if(filter.email) {
            res = await supabase.from(tableName).select("*").eq("email", filter.email)
        } else if(filter.whatsapp) {
            res = await supabase.from(tableName).select("*").eq("whatsapp", filter.whatsapp)
        } else if(filter.nama) {
            res = await supabase.from(tableName).select("*").ilike("nama", `%${filter.nama}%`);
        } else if(filter.id_event) {
            res = await supabase.from(tableName).select(`
            id,
            nama,
            email,
            whatsapp,
            asal,
            info,
            id_event,
            events (
                id
            )
            `).eq("events.id", parseInt(filter.id_event))
            for(var i=0;i<res.body.length;i++) {
                if(res.body[i].events == null)
                    res.body.splice(i, 1)
            }
        }
    } else {
        res = await supabase.from(tableName).select("*");
    }
    if(res.error)
        throw res.error;
    return res.body;
}

async function insertPartisipan(nama, email, whatsapp, asal, info, id_event) {
    //prevent register_date > event_date
    const events = await supabase.from("events").select("*").eq("id", parseInt(id_event))
    let date_event = new Date(events.body[0].date)
    date_event.setHours(0, 0, -1) //set ke h-1 23.59 pendaftaran
    if(new Date() > date_event) {
        return -1
    }
    //cek email, and id same
    let p = await supabase.from("users").select("*").eq("email", email).eq("id_event", id_event)
    if(p.body.length > 0) {
        return -2
    }
    p = await supabase.from("users").select("*").eq("whatsapp", whatsapp).eq("id_event", id_event)
    if(p.body.length > 0) {
        return -3
    }
    const res = await supabase.from(tableName).insert([
        {nama: nama, email: email, whatsapp: whatsapp, asal: asal, info:info, id_event: id_event}
    ])
    if(res.error)
        throw res.error;
    return res.body;
}

async function updatePartisipan(filter, newData) {
    const oldData = await getPartisipan(filter)
    for(var k in newData) {
        if(newData[k] == null || newData[k] == undefined)
            newData[k] = oldData[k]
    }
    if(filter.id)
        filter = {id: filter.id}
    if(filter.email)
        filter = {email: filter.email}
    if(filter.whatsapp)
        filter = {whatsapp: filter.whatsapp}
    if(filter.nama)
        filter = {nama: filter.nama}
    const res = await supabase.from(tableName).update(
        newData
    ).match(
        filter
    )
    if(res.error)
        throw res.error
    return res.body
}

async function deletePartisipan(filter) {
    let res;
    if(filter.id) {
        res = await supabase.from(tableName).delete().eq("id", parseInt(filter.id))
    } else if(filter.email) {
        res = await supabase.from(tableName).delete().eq("email", filter.email)
    } else if(filter.whatsapp) {
        res = await supabase.from(tableName).delete().eq("whatsapp", filter.whatsapp)
    }
    if(res.error)
        throw res.error
    return res.body
}

export default async function partisipan(req, res) {
    //body = post, query = ? url
    const {
        query,
        body,
        method,
    } = req;
    switch(method) {
        case "POST":
            if(body.nama && body.email && body.whatsapp && body.asal && body.info && body.id_event) {
                result.data = await insertPartisipan(body.nama, body.email, body.whatsapp, body.asal, body.info, body.id_event);
                if(result.data == -1) {
                    result.success = false;
                    result.message = "Kelewat tanggal"
                    result.data = []
                }
                else if(result.data == -2) {
                    result.success = false;
                    result.message = "Email sudah terdaftar"
                    result.data = []
                }
                else if(result.data == -3) {
                    result.success = false;
                    result.message = "Nomor sudah terdaftar"
                    result.data = []
                }
            } else {
                result.status = 400;
                result.success = false;
                result.message = "Missing argument"
            }
            break
        case "GET":
            if(query.id || query.email || query.whatsapp || query.nama || query.id_event)
                result.data = await getPartisipan(query)
            else 
                result.data = await getPartisipan()
            break
        case "PUT":
            if(body.id || body.email || body.whatsapp) {
                let newData = {
                    nama: body.newnama,
                    email: body.newemail,
                    whatsapp: body.newwhatsapp,
                    from: body.newfrom,
                    info: body.newinfo
                }
                result.data = await updatePartisipan(body, newData);
            } else {
                result.status = 400;
                result.success = false;
                result.message = "Missing argument"
            }
            break
        case "DELETE":
            if(body.id || body.email || body.whatsapp) {
                result.data = await deletePartisipan(body)
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