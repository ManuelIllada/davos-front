import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import ReconfirmationModal from "./ReconfirmationModal";

function Footer() {
  const [openModal, setOpenModal] = useState(false);
  const [openReconfirmationModal, setOpenReconfirmationModal] = useState(false);

  const handleDeleteData = async () => {
    setOpenReconfirmationModal(true);
  };

  const handleConfirmDeleteData = async () => {
    try {
      const responseMontevideo = await axios.delete(
        "http://localhost:3333/salesMontevideo/delete"
      );
      console.log("Response from Montevideo:", responseMontevideo.data);

      const responseInterior = await axios.delete(
        "http://localhost:3333/salesInterior/delete"
      );
      console.log("Response from Interior:", responseInterior.data);

      setOpenReconfirmationModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCancelDeleteData = () => {
    setOpenReconfirmationModal(false);
  };

  return (
    <footer className=" bg-black sticky bottom-0 py-4">
      <div className="flex items-center justify-center">
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
      <div className="text-right text-gray-200 pr-6 syncored">
        Hecho por{" "}
        <a href="https://www.syncored.com/" class="font-semibold">
          Syncored
        </a>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)} />
      <ReconfirmationModal
        open={openReconfirmationModal}
        onCancel={handleCancelDeleteData}
        onConfirm={handleConfirmDeleteData}
      />
    </footer>
  );
}

export default Footer;
