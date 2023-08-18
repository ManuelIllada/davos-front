import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const TableProducts = () => {
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
  const { data } = useFetch(`${process.env.REACT_APP_API_URL}/products`);
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    setProductList(data);
  }, [data]);

  const handleDelete = async (event, product) => {
    event.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/products/${product.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.json());
    if (response.message) {
      notifySuccess(response.message);
      setProductList(productList.filter((p) => p.id !== product.id));
    } else {
      notifyError(response.error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row m-3">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h3>Productos</h3>
            <Link to="/products/create">
              <button className="btn btn-warning ">New</button>
            </Link>
          </div>
        </div>
        <div className="col border rounded shadow bg-opacity-75">
          <table className="table border rounded">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList &&
                productList.map((product) => (
                  <tr key={product.id}>
                    <strong>
                      <td>{product.id}</td>
                    </strong>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td className="d-flex justify-content-around align-items-center">
                      <Link to="/products/edit" state={product}>
                        <AiFillEdit className="text-primary" />
                      </Link>
                      <Link>
                        <BsFillTrashFill
                          className="text-danger"
                          onClick={(event) =>
                            Swal.fire({
                              text:
                                "Esta seguro que desea eliminar esta categoria?",
                              icon: "error",
                              showDenyButton: true,
                              denyButtonText: "No",
                              confirmButtonText: "Si",
                            }).then((response) => {
                              if (response.isDenied) {
                                notifyisDenied({
                                  message: "ℹ️ Accion negada por el usuario",
                                  type: "",
                                });
                              } else {
                                handleDelete(event, product);
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

export default TableProducts;
