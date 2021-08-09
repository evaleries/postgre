import axios from "axios";

function _delete() {
    axios({
        method: "DELETE",
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
}

export default function presenters_delete_page() {
    return (
      <div>
          <h1>Upload Image</h1>
          <form action="/api/presenters/upload" method="delete">
              <input type="text" name="id" placeholder="ID"/>
              <input type="submit" value="Delete"/>
          </form>
      </div>
    );
  }