import multer from 'multer'
import axios from 'axios';
export const config = {
    api: {
      bodyParser: false
    }
  };

let dest = "public/assets/presenters";

const up = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, dest);
          },
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
  });

export default async function upload(req, res) {
    const {
        query,
        body,
        method,
    } = req;
    switch(method) {
        case "POST":
            up.single("photo")(req, {}, err => {
               // console.log(req.file); // do something with the file
                req.body = JSON.parse(JSON.stringify(req.body));
        
                axios({
                    method: "POST",
                    url: "http://localhost:3000/api/presenters",
                    headers: {}, 
                    data: {
                      name: req.body.name,
                      desc: req.body.desc,
                      photo: "/assets/presenters/" + req.file.filename,
                    }
                  }).then(resc => {
                      res.send(resc.data);
                  })
                })
            break
        case "PUT":
          up.single("photo")(req, {}, err => {
            //req.body = JSON.parse(JSON.stringify(req.body));
            console.log(req)
            console.log(req.body)
            res.send('wewe')
          });
          break
        default:
            res.status(400).send("no")
            break
    }
}