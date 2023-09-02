import React, { useState } from "react";
import axios from "axios";
import modal from "../imgModal.jpg"; // Importa tu imagen modal aquí

const Modal = ({ open, onClose }) => {
  const [files, setFiles] = useState({
    fileMontevideo: null,
    fileInterior: null,
    fileArticles: null,
    fileClient: null,
  });

  const handleFileChange = (e, fileType) => {
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
      <div className="modalContainer bg-white rounded-lg shadow-lg max-w-md">
        <img src={modal} alt="/" className="imgModal" />
        <form onSubmit={(e) => e.preventDefault()} className="content">
          {Object.entries(files).map(([fileType, file], index) => (
            <div key={index} className="mb-1">
              <label className="font-extrabold">
                {fileType === "fileMontevideo"
                  ? "Ventas Montevideo:"
                  : fileType === "fileInterior"
                  ? "Ventas Interior:"
                  : fileType === "fileArticles"
                  ? "Artículos:"
                  : "Clientes:"}
              </label>
              <div className="flex">
                <input
                  type="file"
                  id={`file${fileType}`}
                  accept=".xlsx"
                  className="inputFile mt-1 hidden"
                  onChange={(e) => handleFileChange(e, fileType)}
                />
                {!file ? (
                  <label
                    htmlFor={`file${fileType}`}
                    className="selectFileButton cursor-pointer bg-gray-300 py-1 px-3 rounded-lg mt-1 ml-2 hover:bg-gray-400"
                  >
                    Seleccionar archivo
                  </label>
                ) : (
                  <p className="selectedFile  text-red-500 font-bold">
                    {file.name}
                  </p>
                )}
              </div>
            </div>
          ))}

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
