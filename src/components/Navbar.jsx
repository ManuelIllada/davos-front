import React from "react";

function Navbar() {
  const handleLinkClick = () => {
    window.location.href = "/";
  };

  return (
    <nav className="p-1 bg-black sticky top-0">
      <div className="flex justify-center items-center h-16">
        <button className="h-full" onClick={handleLinkClick}>
          <img className="h-full" src="/image/logodavos.png" alt="logo" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
