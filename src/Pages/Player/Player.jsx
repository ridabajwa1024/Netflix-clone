import React, { useEffect, useState } from 'react'
import "./player.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Player = ({movieId}) =>{

const [trailers,setTrailer] = useState({
  name :" ",
  key :" ",
  published_at : " ",
  type : " ",


})

const getTrailer=async(id)=>{
  try {
  const TrailerData= await fetch('https://api.themoviedb.org/3/movie/550/videos?api_key=01b61f48985cc560d6bd09610590e5f7');
const resultdata = await TrailerData.json();
const trailers = resultdata.results[0].key;
setTrailer(trailers)
  }

catch(error){
  console.log(error)
};
}
useEffect(()=>{
  if(movieId){
  getTrailer();
  }
  
},[movieId])


  return (
    <div className='player'>
      <FontAwesomeIcon icon={faPlay} className='play-icon' />
      <iframe width="70%" height="90%" 
src= {`https://www.youtube.com/embed/${trailers}`}title='trailer'
frameBorder="0" allowFullScreen>
</iframe>
<div className='player-info'>
  <p>{setTrailer.published_at}</p>
  <p>{setTrailer.name}</p>
    <p>{setTrailer.type}</p>
</div>
    </div>
  )
}

export default Player
