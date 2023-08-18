import React, { useState } from "react";
//import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryModif = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");

  const handleSendModify = async (event) => {
    /*  const notifyEditCagetgory = () =>
      toast.info("Ingresa Nuevo Nombre de Categoria", {
        duration: 2000,
        position: "bottom-right",
      }); */
    event.preventDefault();
    await fetch(
      `${process.env.REACT_APP_API_URL}/categories/${location.state.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: location.state.id, name: inputValue }),
      }
    ).then((response) => response.json());
    navigate(-1);
  };
  return (
    <>
      <div className="container">
        <h3 className="text-center my-3">Enter New Category Name</h3>
        <div className=" d-flex justify-content-around">
          <form onSubmit={handleSendModify}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                ID:
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                disabled
                value={location.state.id}
              />
            </div>

            <div className="mb-3 ">
              <label htmlFor="newName" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control form-control form-control-lg"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={location.state.name}
              />
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

export default CategoryModif;
