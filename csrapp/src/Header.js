import React from 'react';
//import './Header.css';
import reymon from './reymon.png'

function Header () {

  const imageStyle = {
    height: '300px',
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }



  return (
    <div>
      <img src={reymon} style={imageStyle}></img>
    </div>
  )
}

export default Header