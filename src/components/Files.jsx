import React, { useState } from "react";
import axios from "axios";

const FileUploadForm = () => {
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

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="fileMontevideo" className="block font-medium mb-2">
          Archivo Montevideo:
        </label>
        <input
          type="file"
          id="fileMontevideo"
          accept=".xlsx"
          onChange={handleMontevideoFileChange}
        />
      </div>
      <div className="mb-4">
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
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Subir Archivos
      </button>
    </div>
  );
};

export default FileUploadForm;
