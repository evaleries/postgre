export default function presenters_delete_page() {
    return (
      <div>
          <h1>Upload Image</h1>
          <form action="/api/presenters" method="delete">
              <input type="text" name="id" placeholder="ID"/>
              <input type="submit" value="Delete"/>
          </form>
      </div>
    );
  }