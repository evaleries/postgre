# postgre-backend
Uses supabase. Configure .env.local first.
```
NEXT_PUBLIC_SUPABASE_URL=your supabase url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your anon key
```
## ERD
![ERD](https://github.com/Pemrograman-Fasilkom-Unej/postgre/tree/back-end/docs/db.png)
## to do
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
#### GET
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| email         | Filter by email             |
| whatsapp      | Filter by whatsapp          |
| nama          | Filter by nama              |
| id_event      | Filter by id_event          |
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

## /api/events
### Params
#### GET
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| year          | Filter by year              |
| presenter     | Filter by presenter         |
#### POST
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| id_presenter  | ID of presenter             |
| title         | Title                       |
| date          | Event date                  |
| open_date     | Open Registration Date      |
#### PUT
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| id            | ID of event                 |
| id_presenter  | ID of presenter             |
| title         | Title                       |
| date          | Event date                  |
| open_date     | Open Registration Date      |
#### DELETE
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| id            | ID of event                 |

## /api/docs
### Params
#### GET
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| year          | Filter by year              |
| title         | Filter by title             |
#### POST
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| id_event      | ID of event                 |
| photo         | Photo                       |
#### PUT
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| id            | ID of documentation         |
| photo         | Photo                       |
#### DELETE
| Parameters    | Desc                        |
| ------------- | --------------------------- |
| id            | ID of documentation         |

## /api/docs/upload
For inserting docs with photo (multiform data).

 See /docs/upload for example.
 
 Photos of docs are located in public/assets/docs/