# postgre-backend
# To do
- [x] Pemateri
- [ ] Event
- [ ] Dokumentasi
- [ ] Partisipan
- [ ] Better log
# Documentation
## /api/pemateri
### GET
#### Params
```
nama: str //optional
```
Result
```
[{"_id":"610a1da78115519ffc6f1234","nama":"Amane Kanata","desc":"Hololive 4th gen","foto":""}]
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
## /api/partisipan