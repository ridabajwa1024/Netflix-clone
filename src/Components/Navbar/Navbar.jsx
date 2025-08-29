import React, { useState, useEffect, useRef } from 'react';
import "./navbar.css";
import logo1 from '../../Assets/logoBg.png'
// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCaretDown, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';



const Navbar = ({TrendingRef,TopRef,PopularRef}) => {
  const [open, setopen] = useState(false);
  const profileDropdown = useRef(null);
  const navigate = useNavigate();
  const ScrollSection = (ref)=>{
if(ref && ref.current){
  ref.current.scrollIntoView({ 
    block : "center",
    
    behavior : "smooth"})
}
  }
  useEffect(() => {
    function handleclick(event) {
      if (profileDropdown.current && !profileDropdown.current.contains(event.target)) {
        setopen(false);
      }
    }
    document.addEventListener("mousedown", handleclick);
    return () => {
      document.removeEventListener("mousedown", handleclick);
    };
  }, []);

  const [scrolled,setscroll]=useState(false);
const scrollingNav=useRef(null);
useEffect (()=>{
  const Scrolling = () =>
  {
    if(window.scrollY > 50){
      setscroll(true)
    }
    else{
      setscroll(false)
    }
  }
 window.addEventListener("scroll",Scrolling);
 return () => window.removeEventListener("scroll",Scrolling)
},[]);

  return (
    <div  className={`navbar ${scrolled ? "scrolled" : ""}`} ref={scrollingNav}>
      {/* Left */}
      <div className="navbar-left">
        <img src={logo1} alt="logo" className="logo" />
        <ul>
          <li>Home</li>
          <li onClick={()=> ScrollSection(TrendingRef)} id='Trending'>Trending</li>
           <li onClick={()=> ScrollSection(PopularRef)}  id='Popular'>New & Popular</li>
          <li onClick={()=> ScrollSection(TopRef)}  id='Top'>Top Rated</li>
          <li >My List</li>
          <li>Browse by Language</li>
          <li onClick={()=>navigate ("/login")}>Login | Sign Up</li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-right">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
        <FontAwesomeIcon icon={faBell} className="icon" />

        <div  className="profile">
          <FontAwesomeIcon icon={faUser} className="profile-icon"   onClick={() => setopen(!open)} />
          <FontAwesomeIcon icon={faCaretDown} className="caret-icon" onClick={() => setopen(!open)} />

          {open && (
            <div className='profile-drop-down' ref={profileDropdown}>
              <p>Sign out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
