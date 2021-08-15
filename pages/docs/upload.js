

export default function docs_upload_page() {
    return (
      <div>
          <h1>Upload Image</h1>
          <form action="/api/docs/upload" method="post" enctype="multipart/form-data">
              <input type="file" accept="image/*" name="photo"/>
              <input type="text" name="id_event" placeholder="id_event"/>
              <input type="text" name="desc" placeholder="desc"/>
              <input type="submit" value="Upload"/>
          </form>
      </div>
    );
  }