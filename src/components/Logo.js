import React from "react";
import { Link } from "react-router-dom";
import logoSvg from "../assets/logo1.jpg";

const Logo = () => {
  return (
    <Link
      to="/"
      className="
     absolute top-[1.5rem] left-[1.5rem] [text-decoration:none]
text-lg text-cyan flex items-center
     "
    >
      <img src={logoSvg} className="w-40 h-25 border " alt="CryptoBucks" />

    
      <span>Crypto Chain</span>
    </Link>
  );
};

export default Logo;
