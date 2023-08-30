import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

function Footer() {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteData = async () => {
    try {
      const responseMontevideo = await axios.delete(
        "http://localhost:3333/salesMontevideo/delete"
      );
      console.log("Response from Montevideo:", responseMontevideo.data);

      const responseInterior = await axios.delete(
        "http://localhost:3333/salesInterior/delete"
      );
      console.log("Response from Interior:", responseInterior.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <footer className=" bg-black sticky bottom-0 py-4">
      <div className="flex items-center justify-center ">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-gray-700 m-4 focus:outline-none text-white hover:bg-green-700 2xl:w-40 xl:w-36 btn2 lg:w-28 w-24 rounded-md 2xl:text-xl xl:text-lg lg:text-md text-sm py-3"
        >
          Subir Datos
        </button>
        <button
          onClick={handleDeleteData}
          className="bg-gray-700 m-4 focus:outline-none text-white hover:bg-red-700 2xl:w-40 xl:w-36 btn2 lg:w-28 w-24 rounded-md 2xl:text-xl xl:text-lg lg:text-md text-sm py-3"
        >
          Eliminar Datos
        </button>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
    </footer>
  );
}

export default Footer;
