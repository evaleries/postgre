# postgre-backend
# To do
- [x] Pemateri
- [ ] Pemateri sort by popularity (?)
- [ ] Event
- [ ] Dokumentasi
- [x] Partisipan
- [ ] Partisipan Send Email
- [ ] Better log
# Documentation
Reminder
GET Requests always return an array instead of json.


All of return has 3 keys:
```
code
success
message
```
#### CODE: 200
Executed if request was successfully done. Still return 200 either success or fail. Can be checked further with success: false || true
##### CODE: 400
Executed if there's either missing data or invalid value.
## /api/pemateri
### GET
#### Params
```
nama: str //optional
count: int //optional
random: 1 or none //optional
```
Example:
```
{
    count: 2,
    random: 1
}
```
Result
```
[{"_id":"610a22356a1344b60bd6e1fc","nama":"Nakiri Ayame","desc":"FAMS","foto":""},{"_id":"610984edbe9aacdacace9566","nama":"Riezqu Ibnanta","desc":"","foto":""}]
```
### POST
#### Params
```
nama: str
desc: str //optional
foto: str(url) //optional
```
Example:
```
{
    nama: "Shirakami Fubuki",
    desc: "FAMS"
}
```
Result
```
{
    "code":200,
    "success":true,
    "message":"ok",
    "data":{
        "nama":"Shirakami Fubuki",
        "desc":"FAMS",
        "foto":"",
        "_id":"610a22356a1344b60bd6e1fc"
    }
}
```
### PUT
#### Params
```
id: str
nama: str
```
Example:
```
{
    id: "610a22356a1344b60bd6e1fc",
    nama: "Nakiri Ayame"
}
```
Result
```
{
    "code":200,"
    success":true,
    "message":"ok",
    "data":{
        "_id":"610a22356a1344b60bd6e1fc",
        "nama":"Nakiri Ayame",
        "desc":"FAMS",
        "foto":""
    }
}
```
### DELETE
#### Params
```
id: str //1st priority
nama: str //2nd priority
```
Example:
```
{
    id: "610a22356a1344b60bd6e1fc"
}
```
Result
```
{
    "code":200,
    "success":true,
    "message":"ok",
    "data":{
        "_id":"610a22356a1344b60bd6e1fc",
        "nama":"Nakiri Ayame",
        "desc":"FAMS",
        "foto":""
    }
}
```
## /api/event
## /api/dokumentasi
## /api/partisipan/list
### GET
Result
```
[{"_id":"610a37245ded2ec5425c34ba","nama":"Minato Yukina","email":"yukina@roselia.jp","no":"080808","asal":"Bandori","info":"Song I am."},{"_id":"610a48504ae2bc3c9898bd3b","nama":"Mostima","email":"mostima@arknights.jp","no":"01234","asal":"Laterano","info":"laterano"}]
```
## /api/partisipan/cek
### GET
#### Params
```
email: str //1st priority
no: str //2nd priority
```
Example:
```
{
    email: "yukina@roselia.jp"
}
```
Result
```
{
    "code":200,
    "success":true,
    "message":"ok",
    "data":{
        "_id":"610a37245ded2ec5425c34ba",
        "nama":"Minato Yukina",
        "email":"yukina@roselia.jp",
        "no":"080808",
        "asal":"Bandori",
        "info":"Song I am."
    }
}
```
## /api/partisipan
### POST
#### Params
```
{
nama: str
email: str
no: str
asal: str
info: str
}
```
Example:
```
{
    nama: "nameless",
    email: "mizuru@yahoo.jp",
    no: "0812349",
    asal: "Japan",
    info: "Utaite"
}
```
Result
```
{
    "code":200,
    "success":false,
    "message":"ok",
    "data":{
        "nama":"nameless",
        "email":"mizuru@yahoo.jp",
        "no":"0812349",
        "asal":"Japan",
        "info":"Utaite",
        "_id":"610cae2bd5e6708563e2e308"
    }
}
```
### PUT
#### Params
```
email: to search (1st)
no: to search (2nd)
new data -> pilih, asal salah satu ada, gk bener" kosong
newnama
newemail
newno
newasal
newinfo
```
Example:
```
{
    email: "mizuru@yahoo.jp",
    newinfo: "Utaite. Mizuru."
}
```
Result: return the original one.
```
{
    "code":200,
    "success":true,
    "message":"ok",
    "data":{
        "_id":"610cae2bd5e6708563e2e308",
        "nama":"nameless",
        "email":"mizuru@yahoo.jp",
        "no":"0812349",
        "asal":"Japan",
        "info":"Utaite"
    }
}
```
### DELETE
#### Params
```
email: to search (1st)
no: to search (2nd)
```
Example:
```
{
    email: "mizuru@yahoo.jp"
}
```
Result
```
{
    "code":200,
    "success":true,
    "message":"ok",
    "data":{
        "_id":"610cae2bd5e6708563e2e308",
        "nama":"nameless",
        "email":"mizuru@yahoo.jp",
        "no":"0812349",
        "asal":"Japan",
        "info":"Utaite. Mizuru."
    }
}
```