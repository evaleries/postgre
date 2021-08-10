# postgre-backend
Uses supabase. Configure .env.local first.
```
NEXT_PUBLIC_SUPABASE_URL=your supabase url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your anon key
```
## to do
- [ ] ERD
- [ ] Events
- [ ] Docs
- [ ] Auth
- [ ] SMTP
## /api/presenters
### Params
#### POST
| Parameters    | Desc                                |
| ------------- | ----------------------------------- |
| name          | Name of presenter                   |
| photo         | Photo of presenter in relative path |
| desc          | Description of presenter            |
#### PUT
| Parameters    | Desc                                |
| ------------- | ----------------------------------- |
| id            | ID of presenter                     |
| name          | Name of presenter                   |
| photo         | Photo of presenter in relative path |
| desc          | Description of presenter            |
#### DELETE
| Parameters    | Desc                                |
| ------------- | ----------------------------------- |
| id            | ID of presenter                     |
## /api/presenters/upload
For inserting presneters with photo (multiform data).

 See /presenters/upload for example.
 
 Photos of presenters are located in public/assets/presenters/
### Params
#### POST
| Parameters    | Desc                      |
| ------------- | ------------------------- |
| nama          | Name of presenter         |
| photo         | Photo of presenter (file) |
| desc          | Description of presenter  |
## /api/users
### Params
#### POST
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| nama          | Name of user                |
| email         | Email of user               |
| whatsapp      | Phone of user               |
| asal          | Origin of user              |
| info          | Where the user got the info |
#### PUT
Choose one
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| nama          | Name of user                |
| email         | Email of user               |
| whatsapp      | Phone of user               |
##### new data
| Parameters       | Desc                        |
| -------------    | --------------------------- |
| newnama          | Name of user                |
| newemail         | Email of user               |
| newwhatsapp      | Phone of user               |
| newasal          | Origin of user              |
| newinfo          | Where the user got the info |
#### Delete
Choose one
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| nama          | Name of user                |
| email         | Email of user               |
| whatsapp      | Phone of user               |