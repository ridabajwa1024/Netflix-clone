import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import '../Admin/Admin.css';

function Admin() {
  // cards
  const [movies, setmovies] = useState([]);
  const [title, settitle] = useState("");
  const [caption, setcaption] = useState("");
  // file uploaded by user
  const [file, setfile] = useState(null);

  const getMovies = async () =>
     {
    const { data, error } = await supabase.from("movie").select("*");
    if (error) {
      console.log(error);
    } else {
      setmovies(data);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Upload your file !");
    }
    const UserFile = `${Date.now()}_${file.name}`;
    const { data: uploaded, error: uploadError } = await supabase.storage
      .from("Netflix-clone-movies")
      .upload(UserFile, file);
    if (uploadError) {
      alert(uploadError);
      return;
    }

    const { data: PublicLink } = supabase.storage
      .from("Netflix-clone-movies")
      .getPublicUrl(UserFile);
    const UserFileUrl = PublicLink.publicUrl;

    const { error: insertError } = await supabase
      .from("movie")
      .insert([{ title: title, caption: caption, fileurl: UserFileUrl }]);
    if (insertError) {
      alert(insertError);
    } else {
      alert("Movies added succesfully");
      settitle("");
      setcaption("");
      setfile(null);
      getMovies();
    }
  };

  return (
    <div className="admin-page">
      <h1>Welcome to Admin Page</h1>
      <form onSubmit={HandleSubmit}>
        <h2>Upload Your Movies</h2>
        <input
          onChange={(e) => {
            settitle(e.target.value);
          }}
          value={title}
          type="text"
          placeholder="movies title"
          required
        />
        <input
          onChange={(e) => {
            setcaption(e.target.value);
          }}
          value={caption}
          type="text"
          placeholder="Caption"
          required
        />
        <input
          onChange={(e) => {
            setfile(e.target.files[0]);
          }}

          type="file"
       
          required
        />
        <button type="submit">Sumit</button>
        <button>Save</button>
      </form>
      <div className="My-movies-Set">
        <h1>Your Movies</h1>
        {movies.map((movie) => (
          <div className="my-movie-card" key={movie.id}>
            <img src={file} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.caption}</p>
            <button>Delete</button>
            <button>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
