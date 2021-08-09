import {supabase} from '../../utils/supabase'

let result = {
    "status": 200,
    "success": true,
    "message": "ok",
    "data": []
}

const tableName = "partisipan"

async function getPartisipan(filter) {
    const user = supabase.auth.user()
    let res;
    if(filter) {
        if(filter.id) {
            res = await supabase.from(tableName).select("*").eq("id", parseInt(filter.id))
        } else if(filter.email) {
            res = await supabase.from(tableName).select("*").eq("email", filter.email)
        } else if(filter.no) {
            res = await supabase.from(tableName).select("*").eq("no", filter.no)
        } else if(filter.name) {
            res = await supabase.from(tableName).select("*").ilike("name", `%${filter.name}%`);
        }
    } else {
        res = await supabase.from(tableName).select("*");
    }
    if(res.error)
        throw res.error;
    return res.body;
}

async function insertPartisipan(name, email, no, from, info) {
    const res = await supabase.from(tableName).insert([
        {name: name, email: email, no: no, from: from, info:info}
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
    if(filter.no)
        filter = {no: filter.no}
    if(filter.name)
        filter = {name: filter.name}
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
    } else if(filter.no) {
        res = await supabase.from(tableName).delete().eq("no", filter.no)
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
            if(body.name && body.email && body.no && body.from && body.info) {
                result.data = await insertPartisipan(body.name, body.email, body.no, body.from, body.info);
            } else {
                result.status = 400;
                result.success = false;
                result.message = "Missing argument"
            }
            break
        case "GET":
            if(query.id || query.email || query.no || query.name)
                result.data = await getPartisipan(query)
            else 
                result.data = await getPartisipan()
            break
        case "PUT":
            if(body.id || body.email || body.no) {
                let newData = {
                    name: body.newname,
                    email: body.newemail,
                    no: body.newno,
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
            if(body.id || body.email || body.no) {
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