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
            if(query.email && query.eventId) {
                //get date 
                const ev = await supabase.from("events").select("*").eq("attendance", "https://postgre.pemro.id/attendance?eventId=" + query.eventId)
                if(ev.body.length == 0) {
                    //id not found
                    result.status = 200;
                    result.success = false;
                    result.message = "ID not found"
                } else {
                    //found key, check date
                    let end_date = new Date(ev.body[0].date)
                    let start_date = new Date(ev.body[0].date)
                    let sh = ev.body[0].open_attendance.split(":")
                    let eh = ev.body[0].close_attendance.split(":")
                    start_date.setHours(sh[0], sh[1], sh[2])
                    end_date.setHours(eh[0], eh[1], eh[2])
                    console.log(new Date())
                    console.log(start_date)
                    console.log(end_date)
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
                                const presensi = await supabase.from(tableName).update({present: true, attendance_date: new Date()}).eq("id_event", ev.body[0].id).eq("email", query.email)
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