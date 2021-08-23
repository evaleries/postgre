import { supabase } from "../../utils/supabase"

const tableName = "users"

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
        case "GET":
            if(query.email && query.id) {
                //get date 
                const ev = await supabase.from("events").select("*").eq("attendance", "https://postgre.pemro.id/attendance?id=" + query.id)
                if(ev.body.length == 0) {
                    //id not found
                    result.status = 200;
                    result.success = false;
                    result.message = "ID not found"
                } else {
                    //found key, check date
                    let end_date = new Date(ev.body[0].date)
                    let start_date = new Date(ev.body[0].date)
                    end_date.setHours(23, 59, 59)
                    if(new Date() <= end_date && new Date >= start_date) {
                        //ok, hadir
                        //cek kehadiran dulu, lek blm baru hadirkan
                        const check = await supabase.from(tableName).select("present").eq("id_event", ev.body[0].id).eq("email", query.email)
                        console.log(check)
                        if(check.body.length > 0) {
                            //found
                            if(check.body[0].present) {
                                //lek udah presensi
                                result.status = 200;
                                result.success = false;
                                result.message = "Sudah melakukan presensi"
                            } else {
                                //belum presensi
                                const presensi = await supabase.from(tableName).update({present: true}).eq("id_event", ev.body[0].id).eq("email", query.email)
                                if(presensi.error) {
                                    throw presensi.error;
                                } else {
                                    result.status = 200;
                                    result.success = false;
                                    result.message = "Berhasil melakukan presensi"
                                }
                            }
                        } else {
                            result.status = 200;
                            result.success = false;
                            result.message = "Email tidak terdaftar"
                        }
                    } else if(new Date() > end_date) {
                        //telat
                        result.status = 200;
                        result.success = false;
                        result.message = "Too late"
                    } else {
                        //keawalan
                        result.status = 200;
                        result.success = false;
                        result.message = "Too early"
                    }
                }
                //const res = await supabase.from(tableName).update()
                
            } else {
                result.status = 200;
                result.success = false;
                result.message = "Missing parameter"
            }
            break
        default:
            result.status = 405;
            result.success = false;
            result.message = `Method ${method} not allowed`
    }
    res.status(result.status).json(result)
}