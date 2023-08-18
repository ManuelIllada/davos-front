import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import axios from "axios";
const UsersModify = () => {
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

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const location = useLocation();

  const handleSendModify = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("avatar", avatar);

    const response = await axios({
      url: `http://localhost:8000/users/${location.state.id}`,
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
        <h3 className="my-3 text-center">Enter User Data to Modify</h3>
        <form onSubmit={handleSendModify} method="POST">
          <div className="mb-3">
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
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              Firstname:
            </label>
            <input
              className="form-control w-25"
              name="firstname"
              type="text"
              onChange={(event) => setFirstname(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Lastname:
            </label>
            <input
              className="form-control w-25"
              name="lastname"
              type="text"
              onChange={(event) => setLastname(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Email:
            </label>
            <input
              className="form-control w-25"
              name="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Address:
            </label>
            <input
              className="form-control w-25"
              name="address"
              type="text"
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Password:
            </label>
            <input
              className="form-control w-25"
              name="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Phone:
            </label>
            <input
              className="form-control w-25"
              name="phone"
              type="text"
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <input
            type="file"
            className="form-control w-50"
            name="avatar"
            onChange={(event) => setAvatar(event.target.files[0])}
          />

          <button className="btn btn-primary my-3" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default UsersModify;
