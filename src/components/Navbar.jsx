import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-1 bg-black sticky top-0">
      <div className="flex justify-center items-center h-16">
        <Link className="h-full " to="/">
          <img className="h-full " src="/image/logodavos.png" alt="logo" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
