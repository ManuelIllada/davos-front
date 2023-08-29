import React, { useState } from "react";
import modal from "../modal.jpg";
import axios from "axios";

const Modal = ({ open, onClose }) => {
  const [fileMontevideo, setFileMontevideo] = useState(null);
  const [fileInterior, setFileInterior] = useState(null);

  const handleMontevideoFileChange = (e) => {
    setFileMontevideo(e.target.files[0]);
  };

  const handleInteriorFileChange = (e) => {
    setFileInterior(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formDataMontevideo = new FormData();
      formDataMontevideo.append("file", fileMontevideo);

      const formDataInterior = new FormData();
      formDataInterior.append("file", fileInterior);

      const responseMontevideo = await axios.post(
        "http://localhost:3333/salesMontevideo/populate",
        formDataMontevideo
      );
      console.log("Response from Montevideo:", responseMontevideo.data);

      const responseInterior = await axios.post(
        "http://localhost:3333/salesInterior/populate",
        formDataInterior
      );
      console.log("Response from Interior:", responseInterior.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <img src={modal} alt="/" className="imgModal" />
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content max-w-md mx-auto">
            <div className=" ">
              <label
                htmlFor="fileMontevideo"
                className="block font-medium mb-2"
              >
                Archivo Montevideo:
              </label>
              <input
                type="file"
                id="fileMontevideo"
                accept=".xlsx"
                onChange={handleMontevideoFileChange}
              />
            </div>
            <div className="">
              <label htmlFor="fileInterior" className="block font-medium mb-2">
                Archivo Interior:
              </label>
              <input
                type="file"
                id="fileInterior"
                accept=".xlsx"
                onChange={handleInteriorFileChange}
              />
            </div>
            <div className="btnContainer">
              <button
                onClick={handleUpload}
                className="bg-gray-700 m-4 text-white hover:bg-green-700 2xl:w-40 xl:w-36 btn2 lg:w-28 w-24 rounded-md 2xl:text-xl xl:text-lg lg:text-md text-sm py-3"
              >
                Subir Archivos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
