import React, { useState } from "react";
import modal from "../imgModal.jpg";
import axios from "axios";

const Modal = ({ open, onClose }) => {
  const [files, setFiles] = useState({
    fileMontevideo: null,
    fileInterior: null,
    fileArticles: null,
    fileClient: null,
  });

  const [selectedFileNames, setSelectedFileNames] = useState({
    fileMontevideo: "",
    fileInterior: "",
    fileArticles: "",
    fileClient: "",
  });

  const handleFileChange = (e, fileType) => {
    const fileName = e.target.files[0]?.name || "";
    setSelectedFileNames((prevFileNames) => ({
      ...prevFileNames,
      [fileType]: fileName,
    }));
    setFiles({
      ...files,
      [fileType]: e.target.files[0],
    });
  };

  const handleUpload = async () => {
    try {
      onClose();
      for (const [key, file] of Object.entries(files)) {
        if (file) {
          const formData = new FormData();
          formData.append("table", file);

          const url = `http://localhost:3333/${
            key === "fileMontevideo"
              ? "salesMontevideo"
              : key === "fileInterior"
              ? "salesInterior"
              : key === "fileArticles"
              ? "articles"
              : "client"
          }/populate`;

          const response = await axios.post(url, formData);
          console.log(`Response from ${key}:`, response.data);
        }
      }
      window.location.reload();
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="modalContainer bg-white rounded-lg shadow-lg  max-w-md">
        <img src={modal} alt="/" className="imgModal" />
        <form onSubmit={(e) => e.preventDefault()} className="content">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="mb-2 grid grid-cols-2">
              <label className="font-extrabold">Ventas Montevideo:</label>
              <input
                type="file"
                id="fileMontevideo"
                className="inputFile mt-1"
                onChange={(e) => handleFileChange(e, "fileMontevideo")}
              />
              <label htmlFor="fileMontevideo" className="labelFile mt-1">
                {selectedFileNames.fileMontevideo
                  ? selectedFileNames.fileMontevideo
                  : "Seleccionar archivo"}
              </label>
            </div>
            <div className="mb-2 grid grid-cols-2">
              <label className="font-extrabold">Ventas Interior:</label>
              <input
                type="file"
                id="fileInterior"
                className="inputFile mt-1"
                onChange={(e) => handleFileChange(e, "fileInterior")}
              />
              <label htmlFor="fileInterior" className="labelFile mt-1">
                {selectedFileNames.fileInterior
                  ? selectedFileNames.fileInterior
                  : "Seleccionar archivo"}
              </label>
            </div>
            <div className="mb-2 grid grid-cols-2">
              <label className="font-extrabold">Artículos:</label>
              <input
                type="file"
                id="fileArticles"
                className="inputFile mt-1"
                onChange={(e) => handleFileChange(e, "fileArticles")}
              />
              <label htmlFor="fileArticles" className="labelFile mt-1">
                {selectedFileNames.fileArticles
                  ? selectedFileNames.fileArticles
                  : "Seleccionar archivo"}
              </label>
            </div>
            <div className="mb-2 grid grid-cols-2">
              <label className="font-extrabold">Clientes:</label>
              <input
                type="file"
                id="fileClient"
                className="inputFile mt-1"
                onChange={(e) => handleFileChange(e, "fileClient")}
              />
              <label htmlFor="fileClient" className="labelFile mt-1">
                {selectedFileNames.fileClient
                  ? selectedFileNames.fileClient
                  : "Seleccionar archivo"}
              </label>
            </div>
          </div>
          <p
            className="closeBtn cursor-pointer text-center me-2"
            onClick={onClose}
          >
            x
          </p>
          <button
            className="bg-gray-700 w-full m-auto text-white py-2 px-4 rounded-full text-center hover:bg-gray-800 transition duration-300"
            onClick={handleUpload}
          >
            Subir Archivos
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
