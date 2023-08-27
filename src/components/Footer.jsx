import React from "react";

function Footer() {
  return (
    <footer className=" bg-black sticky bottom-0 py-4">
      <div className="flex items-center justify-center ">
        <button className="bg-gray-700 m-4 focus:outline-none text-white hover:bg-green-700 2xl:w-40 xl:w-36 btn2 lg:w-28 w-24 rounded-md 2xl:text-xl xl:text-lg lg:text-md text-sm py-3">
          Subir Datos
        </button>
        <button className="bg-gray-700 m-4 focus:outline-none text-white hover:bg-red-700 2xl:w-40 xl:w-36 btn2 lg:w-28 w-24 rounded-md 2xl:text-xl xl:text-lg lg:text-md text-sm py-3">
          Eliminar Datos
        </button>
      </div>
    </footer>
  );
}

export default Footer;
