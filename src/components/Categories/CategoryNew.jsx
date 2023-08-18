import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const CategoryNew = () => {
  const notifySuccess = (message) =>
    toast.success(message, {
      duration: 2000,
      position: "bottom-right",
    });
  const notifyError = (error) =>
    toast.error(error, {
      duration: 3000,
      position: "bottom-right",
    });
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [media, setMedia] = useState("");
  const [cardImage, setCardImage] = useState("");

  const handleNewCategory = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("media", media);
    formData.append("cardImage", cardImage);

    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/categories`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    response.data.message
      ? notifySuccess(response.data.message)
      : notifyError(response.data.error);

    navigate(-1);
  };
  return (
    <div className="container">
      <h3 className="my-3 text-center">Enter Data for a new Category</h3>
      <form onSubmit={handleNewCategory}>
        <div className="my-3">
          <label htmlFor="name">Name</label>
          <input
            className="form-control w-25"
            name="categoryName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name">Media</label>
          <input
            type="file"
            className="form-control "
            name="media"
            id="media"
            onChange={(event) => setMedia(event.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cardImage">Card Image</label>
          <input
            type="file"
            className="form-control "
            name="cardImage"
            id="cardImage"
            onChange={(event) => setCardImage(event.target.files[0])}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default CategoryNew;
