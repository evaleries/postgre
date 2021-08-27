

export default function events_upload_page() {
    return (
      <div>
          <h1>Upload Image</h1>
          <form action="/api/events/upload" method="post" enctype="multipart/form-data">
              <h4>foto</h4>
              <input type="file" accept="image/*" name="photo"/>
              <br></br>
              <br></br>
              <h4>title</h4>
              <input type="text" name="title" placeholder="title"/>
              <br></br>
              <br></br>
              <h4>desc</h4>
              <input type="text" name="desc" placeholder="deskripsi"/>
              <br></br>
              <br></br>
              <h4>waktu acara mulai</h4>
              <input type="time" step="1" name="start_time" placeholder="start_time"/>
              <br></br>
              <br></br>
              <h4>url zoom</h4>
              <input type="text" name="zoom" placeholder="url zoom"/>
              <br></br>
              <br></br>
              <h4>tanggal h</h4>
              <input type="date" name="date" placeholder="date"/>
              <br></br>
              <br></br>
              <h4>tanggal open registrasi</h4>
              <input type="date" name="open_date" placeholder="open_date"/>
              <br></br>
              <br></br>
              <h4>waktu open presensii</h4>
              <input type="time" step="1" name="open_attendance" placeholder="open_attendance"/>
              <br></br>
              <br></br>
              <h4>waktu close presensi</h4>
              <input type="time" step="1" name="close_attendance" placeholder="close_attendance"/>
              <br></br>
              <br></br>
              <input type="text" name="key" placeholder="secret key"/>
              <input type="submit" value="Upload"/>
          </form>
      </div>
    );
  }