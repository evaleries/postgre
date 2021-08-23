

export default function presenters_upload_page() {
  return (
    <div>
        <h1>Upload Image</h1>
        <form action="/api/presenters/upload" method="post" enctype="multipart/form-data">
            <input type="file" accept="image/*" name="photo"/>
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="desc" placeholder="Desc"/>
            <input type="text" name="id_event" placeholder="id_event"/>
              <input type="text" name="key" placeholder="secret key"/>
            <input type="submit" value="Upload"/>
        </form>
    </div>
  );
}