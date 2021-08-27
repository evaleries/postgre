import {supabase} from '../../utils/supabase'
import { sendmail } from '../../utils/nodemailer'

const tableName = "users"

async function getPartisipan(filter) {
    const user = supabase.auth.user()
    let res = await supabase.from(tableName).select(`
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
    `)
    if(filter) {
        //pake if, loop 1 1 biar bisa apply multifilter
        if(filter.id) {
            res.body = res.body.filter(function (value, index, array) {
                return (value.id == filter.id);
            });
        } 
        if(filter.email) {
            res.body = res.body.filter(function (value, index, array) {
                return (value.email == filter.email);
            });
        } 
        if(filter.whatsapp) {
            res.body = res.body.filter(function (value, index, array) {
                return (value.whatsapp == filter.whatsapp);
            });
        } 
        if(filter.nama) {
            res.body = res.body.filter(function (value, index, array) {
                return (value.nama.toLowerCase().indexOf(filter.nama.toLowerCase()) != -1);
            });
        } 
        if(filter.id_event) {
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
            res.body = res.body.filter(function (value, index, array) {
                return (value.events != null);
            });
        }
    }
    if(res.error)
        throw res.error;
    return res.body;
}

async function insertPartisipan(nama, email, whatsapp, asal, info, id_event) {
    //prevent register_date > event_date
    const events = await supabase.from("events").select("*").eq("id", parseInt(id_event))
    if(events.body.length == 0) {
        return 1;
    }
    let date_event = new Date(events.body[0].date)
    let open_date = new Date(events.body[0].open_date)
    date_event.setHours(0, 0, -1) //set ke h-1 23.59 pendaftaran
    open_date.setHours(0) // set ke 00.00
    if(new Date() < open_date) {
        return 0;
    }
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
    sendmail(email, events.body[0].title, "header text goes here", '<img src="https://i.ppy.sh/7a9fe4885ddf462b2ac23366cd144682575f1949/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3631303337373137333238363531383831362f3636363138333531393739333331353835312f417175614e65655f2e35782e706e67"><img src="https://i.ppy.sh/7a9fe4885ddf462b2ac23366cd144682575f1949/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3631303337373137333238363531383831362f3636363138333531393739333331353835312f417175614e65655f2e35782e706e67"><img src="https://i.ppy.sh/7a9fe4885ddf462b2ac23366cd144682575f1949/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3631303337373137333238363531383831362f3636363138333531393739333331353835312f417175614e65655f2e35782e706e67">')
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
            if(body.nama && body.email && body.whatsapp && body.asal && body.info && body.id_event) {
                result.data = await insertPartisipan(body.nama, body.email, body.whatsapp, body.asal, body.info, body.id_event);
                if(result.data == 0) {
                    result.success = false;
                    result.message = "Belum buka"
                    result.data = []
                }
                else if(result.data == -1) {
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
                } else if(result.data == 1) {
                    result.success = false;
                    result.message = "eventID not found"
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