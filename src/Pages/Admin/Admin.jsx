import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../supabase";
import "../Admin/Admin.css";

function Admin() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [movies, setMovies] = useState([]);
  const fileInputRef = useRef(null);

  // File select karna
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload function
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const filePath = `public/${Date.now()}-${file.name}`;

    // 1️⃣ File storage me upload
    const { error: uploadError } = await supabase.storage
      .from("Netflix-clone-movies")
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      return;
    }

    // 2️⃣ Public URL get karo
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("Netflix-clone-movies")
      .getPublicUrl(filePath);

    // 3️⃣ Database me save karo
    const { error: insertError } = await supabase
      .from("movies")
      .insert([{ title, caption, file_url: publicUrl }]);

    if (insertError) {
      console.error(insertError);
    } else {
      fetchMovies(); // list refresh
      setTitle("");
      setCaption("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // ✅ input reset
      }
    }
  };

  // Movies fetch
  const fetchMovies = async () => {
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="admin-page">
      <h1>Welcome to Admin Page</h1>

      <form onSubmit={handleUpload}>
        <h2>Upload Your Movies</h2>
        <input
          type="text"
          placeholder="Movie Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Caption"
          required
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="file"
          required
          onChange={handleFileChange}
          ref={fileInputRef}
          accept="image/*,video/*"
        />
        <button type="submit">Upload</button>
      </form>

      <div  className="My-movies-Set">
        <h1>Your Movies</h1>
        <div className="movies-grid">
          {movies.map((movie) => {
            // ✅ check file type
            const isVideo =
              movie.file_url.endsWith(".mp4") ||
              movie.file_url.endsWith(".mov") ||
              movie.file_url.endsWith(".webm");

            return (
              <div className="movie-card" key={movie.id}>
                {isVideo ? (
                  <video src={movie.file_url} width="250" controls />
                ) : (
                  <img src={movie.file_url} alt={movie.title} width="250" />
                )}
                <div className="movie-info">
                  <h2>{movie.title}</h2>
                  <p>{movie.caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admin;
