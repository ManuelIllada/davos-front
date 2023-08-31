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

  const handleFileChange = (e, key) => {
    setFiles({
      ...files,
      [key]: e.target.files[0],
    });
  };

  const handleUpload = async () => {
    try {
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
          <div className="content">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="btnContainer">
                <label className="block mb-2 font-extrabold">
                  Ventas Montevideo:
                </label>
                <input
                  type="file"
                  id="fileMontevideo"
                  onChange={(e) => handleFileChange(e, "fileMontevideo")}
                />
              </div>
              <div className="btnContainer">
                <label className="block mb-2 font-extrabold">
                  Ventas Interior:
                </label>
                <input
                  type="file"
                  id="fileInterior"
                  onChange={(e) => handleFileChange(e, "fileInterior")}
                />
              </div>
              <div className="btnContainer">
                <label className="block mb-2 font-extrabold">Artículos:</label>
                <input
                  type="file"
                  id="fileArticles"
                  onChange={(e) => handleFileChange(e, "fileArticles")}
                />
              </div>
              <div className="btnContainer">
                <label className="block font-extrabold mb-2">Clientes:</label>
                <input
                  type="file"
                  id="fileClient"
                  onChange={(e) => handleFileChange(e, "fileClient")}
                />
              </div>
              <button className="btnPrimary mt-2" onClick={handleUpload}>
                Subir Archivos
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
