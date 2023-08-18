import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
const ProductsModify = () => {
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
  const [categoriesList, setCategoriesList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState("false");
  //const navigate = useNavigate();
  const location = useLocation();
  const { data } = useFetch(`${process.env.REACT_APP_API_URL}/categories`);
  useEffect(() => {
    setCategoriesList(data);
  }, [data]);

  const handleSendModify = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("featured", featured);
    formData.append("category", category);
    for (let index = 0; index < media.length; index++) {
      formData.append("media", media[index]);
    }
    const response = await axios({
      url: `http://localhost:8000/products/${location.state.id}`,
      method: "PATCH",
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
    <>
      <div className="container">
        <h3 className="my-3 text-center">
          Ingrese Datos a Modifdicar de Products
        </h3>
        <div>
          <form onSubmit={handleSendModify} method="POST">
            <div className="mb-3 ">
              <label htmlFor="id" className="form-label">
                ID:
              </label>
              <input
                type="text"
                className="form-control w-25"
                disabled
                value={location.state.id}
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="id" className="form-label">
                Name:
              </label>
              <input
                className="form-control w-25"
                name="productName"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                className="form-control w-50"
                placeholder="Leave a description here"
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
            <div className="mb-3 ">
              <label htmlFor="Media" className="form-label">
                Media
              </label>
            </div>
            <input
              type="file"
              className="form-control w-50"
              name="media"
              multiple
              onChange={(event) => setMedia(event.target.files)}
            />
            <div className="my-3 ">
              <label htmlFor="id" className="form-label">
                Price:
              </label>
              <input
                className="form-control w-25"
                name="price"
                type="text"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="id" className="form-label">
                Stock:
              </label>
              <input
                className="form-control w-25"
                name="stock"
                type="number"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label" htmlFor="featured">
                Featured
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="featured"
                  value="true"
                  onChange={(event) => setFeatured(event.target.value)}
                />
                <label className="form-check-label" htmlFor="featured">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="featured"
                  value="false"
                  onChange={(event) => setFeatured(event.target.value)}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Category">
                Category
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="none" selected>
                  Open this select menu
                </option>
                {categoriesList &&
                  categoriesList.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductsModify;
