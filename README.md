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
{"res":"success","_id":"610a22356a1344b60bd6e1fc"}
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
    id: "610a22356a1344b60bd6e1fc"
    nama: "Nakiri Ayame"
}
```
Result
```
{"res":"success"}
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
{"res":"success"}
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
    email: "mostima@arknights.jp"
}
```
Result
```
[{"_id":"610a48504ae2bc3c9898bd3b","nama":"Mostima","email":"mostima@arknights.jp","no":"01234","asal":"Laterano","info":"laterano"}]
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
    nama: "Mostima",
    email: "mostima@arknights.jp",
    no: "01234",
    asal: "Laterano",
    info: "laterano"
}
```
Result
```
{"res":"success","_id":"610a48504ae2bc3c9898bd3b"}
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
    email: "mostima@arknights.jp",
    newnama: "Exusiai",
    info: "Apple Pie"
}
```
Result: return the original one.
```
{"res":"success","data":{"_id":"610a48504ae2bc3c9898bd3b","nama":"Mostima","email":"mostima@arknights.jp","no":"01234","asal":"Laterano","info":"laterano"}}
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
    email: "mostima@arknights.jp"
}
```
Result
```
{"res":"success"}
```