

export default function events_upload_page() {
    return (
      <div>
          <h1>Upload Image</h1>
          <form action="/api/events/upload" method="post" enctype="multipart/form-data">
              <input type="file" accept="image/*" name="photo"/>
              <input type="text" name="title" placeholder="title"/>
              <input type="date" name="date" placeholder="date"/>
              <input type="date" name="open_date" placeholder="open_date"/>
              <input type="submit" value="Upload"/>
          </form>
      </div>
    );
  }