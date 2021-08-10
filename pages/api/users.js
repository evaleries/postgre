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
        }
    } else {
        res = await supabase.from(tableName).select("*");
    }
    if(res.error)
        throw res.error;
    return res.body;
}

async function insertPartisipan(nama, email, whatsapp, asal, info) {
    const res = await supabase.from(tableName).insert([
        {nama: nama, email: email, whatsapp: whatsapp, asal: asal, info:info}
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
            if(body.nama && body.email && body.whatsapp && body.asal && body.info) {
                result.data = await insertPartisipan(body.nama, body.email, body.whatsapp, body.asal, body.info);
            } else {
                result.status = 400;
                result.success = false;
                result.message = "Missing argument"
            }
            break
        case "GET":
            if(query.id || query.email || query.whatsapp || query.nama)
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