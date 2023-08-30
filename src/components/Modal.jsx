import React, { useState } from "react";
import modal from "../imgModal.jpg";
import axios from "axios";

const Modal = ({ open, onClose }) => {
  const [fileMontevideo, setFileMontevideo] = useState(null);
  const [fileInterior, setFileInterior] = useState(null);
  const [fileArticles, setFileArticles] = useState(null);
  const [fileClient, setFileClient] = useState(null);

  const handleMontevideoFileChange = (e) => {
    setFileMontevideo(e.target.files[0]);
  };

  const handleInteriorFileChange = (e) => {
    setFileInterior(e.target.files[0]);
  };

  const handleArticlesFileChange = (e) => {
    setFileArticles(e.target.files[0]);
  };

  const handleClientFileChange = (e) => {
    setFileClient(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formDataMontevideo = new FormData();
      formDataMontevideo.append("table", fileMontevideo);

      const responseMontevideo = await axios.post(
        "http://localhost:3333/salesMontevideo/populate",
        formDataMontevideo
      );
      console.log("Response from Montevideo:", responseMontevideo.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleUploadInt = async () => {
    try {
      const formDataInterior = new FormData();
      formDataInterior.append("table", fileInterior);

      const responseInterior = await axios.post(
        "http://localhost:3333/salesInterior/populate",
        formDataInterior
      );

      console.log("Response from Interior:", responseInterior.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleUploadArt = async () => {
    try {
      const formDataArticles = new FormData();
      formDataArticles.append("table", fileArticles);

      const responseArticles = await axios.post(
        "http://localhost:3333/articles/populate",
        formDataArticles
      );

      console.log("Response from Articles:", responseArticles.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleUploadClt = async () => {
    try {
      const formDataClient = new FormData();
      formDataClient.append("table", fileClient);

      const responseClient = await axios.post(
        "http://localhost:3333/client/populate",
        formDataClient
      );

      console.log("Response from Client:", responseClient.data);
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
          <div className="content ">
            <form onSubmit={handleUpload}>
              <div className=" ">
                <label className="block font-medium mb-2">
                  Archivo Montevideo:
                </label>
                <input
                  type="file"
                  id="fileMontevideo"
                  onChange={handleMontevideoFileChange}
                />
              </div>

              <div className="">
                <button className=" text-white bg-black border-2">
                  Subir Archivos
                </button>
              </div>
            </form>
            <form onSubmit={handleUploadInt}>
              <div className="">
                <label className="block font-medium mb-2">
                  Archivo Interior:
                </label>
                <input
                  type="file"
                  id="fileInterior"
                  onChange={handleInteriorFileChange}
                />
              </div>
              <div className="">
                <button className=" text-white bg-black border-2">
                  Subir Archivos
                </button>
              </div>
            </form>
            <form onSubmit={handleUploadArt}>
              <div className="">
                <label className="block font-medium mb-2">
                  Archivo Artículos:
                </label>
                <input
                  type="file"
                  id="fileArticles"
                  onChange={handleArticlesFileChange}
                />
              </div>
              <div className="">
                <button className=" text-white bg-black border-2">
                  Subir Archivos
                </button>
              </div>
            </form>
            <form onSubmit={handleUploadClt}>
              <div className="">
                <label className="block font-medium mb-2">
                  Archivo Clientes:
                </label>
                <input
                  type="file"
                  id="fileClient"
                  onChange={handleClientFileChange}
                />
              </div>
              <div className="">
                <button className=" text-white bg-black border-2">
                  Subir Archivos
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
