import React, { useState, useEffect, useRef } from "react";
import { tmdb } from "../../tmdb.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./titlecard.css";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function Titlecard({ title, category }) {
  const cardsRef = useRef(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
  let url = "";

  if (category === "trending") {
    url = "/trending/movie/week";
  } else {
    url = `/movie/${category}`;
  }

  tmdb
    .get(url)
    .then((res) => {
      console.log("Fetched movies for", category, res.data.results);
      setMovies(res.data.results || []);
    })
    .catch((err) => console.error("Error fetching movies:", err));
}, [category]);


  const scrollcards = (scroll) => {
    cardsRef.current.scrollBy({
      left: scroll === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
 
      <div className="movies-list">
       
  
  <div className="movies-row">
    <button className="scroll-btn left" onClick={() => scrollcards("left")}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
 <h2>{title ? title : "Popular on Netflix"}</h2>
    <div className="card-list" ref={cardsRef}>
      {movies.length > 0 ? (
        movies.map((movie, index) => (
          <div className="card" key={movie.id || index}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
            <p>{movie.title || movie.name}</p>
            <div className="movie-number">{index + 1}</div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>

    <button className="scroll-btn right" onClick={() => scrollcards("right")}>
      <FontAwesomeIcon icon={faAngleRight} />
    </button>
  </div>
</div>

   );
  }
