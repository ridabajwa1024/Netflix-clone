import React from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import Titlecard from "../../Components/TitleCards/Titlecards";
import Footer from "../../Components/Footer/Footer.jsx";
import banner2 from "../../Assets/banner2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import main from "../../Assets/main.png";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="Hero">
        <img src={banner2} alt="hero-banner" className="hero-banner" />
        <div className="hero-caption">
          <div className="Main-title">
      
            <img src={main} alt="title-img" />
          </div>
          <p>
            Discovering his a secret ancient order , a young man living in
            modern Istanbul embarks on a quest to save the city from an immoral
            enemy
          </p>
          <div className="hero-btn">
            <button className="btn">
              <FontAwesomeIcon icon={faPlay} />
              Play
            </button>
            <button className="btn">
              <FontAwesomeIcon icon={faInfoCircle} />
              More Info
            </button>
          </div>
             
        </div>
       <Titlecard title="Trending Now" category="trending" />
      </div>

      <div className="More-title">
      
<Titlecard title="Popular On Netflix" category="popular" />
<Titlecard title="Top Rated" category="top_rated" />
<Titlecard title="Upcoming" category="upcoming" />
<Titlecard title="Now Playing" category="now_playing" />

      </div>
      <Footer />
    </div>
  );
};

export default Home;
