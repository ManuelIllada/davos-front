import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const TableCategories = () => {
  const notifySuccess = (message) =>
    toast.success(message, {
      duration: 2000,
      position: "bottom-right",
    });
  const notifyError = (error) =>
    toast.error(error, {
      duration: 2000,
      position: "bottom-right",
    });

  const notifyisDenied = ({ message }) =>
    toast(message, {
      duration: 2000,
      position: "bottom-right",
    });

  const { data } = useFetch(`${process.env.REACT_APP_API_URL}/categories`);
  const [categoriesList, setCategoriesList] = useState(null);

  useEffect(() => {
    setCategoriesList(data);
  }, [data]);

  const handleDelete = async (event, cat) => {
    event.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/categories/${cat.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.json());
    if (response.message) {
      notifySuccess(response.message);
      setCategoriesList(
        categoriesList.filter((category) => category.id !== cat.id)
      );
    } else {
      notifyError(response.error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row m-3">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h3>Categorias</h3>
            <Link to="/categories/create">
              <button className="btn btn-warning ">New</button>
            </Link>
          </div>
        </div>
        <div className="col border rounded shadow bg-opacity-75">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList &&
                categoriesList.map((cat) => (
                  <tr key={cat.id} className="text-center">
                    <th scope="row">{cat.id}</th>
                    <td>{cat.name}</td>
                    <td>
                      <Link className="me-4" to="/categories/edit" state={cat}>
                        <AiFillEdit className="text-primary" data={cat} />
                      </Link>
                      <Link>
                        <BsFillTrashFill
                          className="text-danger"
                          onClick={(event) =>
                            Swal.fire({
                              text:
                                "Are you sure you want to delete this category?",
                              icon: "error",
                              showDenyButton: true,
                              denyButtonText: "No",
                              confirmButtonText: "Si",
                            }).then((response) => {
                              if (response.isDenied) {
                                notifyisDenied({
                                  message: "ℹ️ Action denied by user",
                                  type: "",
                                });
                              } else {
                                handleDelete(event, cat);
                              }
                            })
                          }
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableCategories;
