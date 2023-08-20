import React from "react";

function Navbar() {
  return (
    <nav className="p-1 bg-black sticky top-0">
      <div className="flex justify-center items-center h-16">
        <img className="h-full " src="/image/logodavos.png" alt="logo" />
      </div>
    </nav>
  );
}

export default Navbar;
