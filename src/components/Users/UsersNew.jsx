import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UsersNew = () => {
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

  const handleNewUser = async (event) => {
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
      url: "http://localhost:8000/users",
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
      <h3 className="my-3 text-center">Enter Data for a new User</h3>
      <form method="POST" onSubmit={handleNewUser}>
        <div className="d-flex justify-content-around text-center">
          <div className="mb-3 d-flex align-items-center ">
            <input
              type="text"
              className="form-control m-2"
              placeholder="Firstname"
              onChange={(event) => setFirstname(event.target.value)}
            />
          </div>
          <div className="mb-3 d-flex align-items-center ">
            <input
              type="text"
              className="form-control m-2"
              placeholder="Lastname"
              onChange={(event) => setLastname(event.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-around text-center">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-around text-center">
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-around text-center">
          <div className="mb-3 ">
            <input
              type="file"
              name="avatar"
              className="form-control "
              placeholder="Avatar"
              onChange={(event) => setAvatar(event.target.files[0])}
            />
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UsersNew;
