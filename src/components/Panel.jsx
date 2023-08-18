import React from "react";
import "./Panel.css";
import { FaUserAstronaut, FaUserSecret } from "react-icons/fa";
import { AiFillDashboard, AiFillGift } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { GiSkateboard } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeToken } from "../redux/UserSlice";

const Panel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/login");
  };
  return (
    <>
      <div className="">
        <div className="text-center  my-3 fs-4 fw-bold text-dark  text-uppercase ">
          <i className="me-2">
            <FaUserSecret />
          </i>
          Panel Admin
        </div>
        <hr className="border-bottom  my-0 " />
        <div className="container d-flex justify-content-around">
          <div>
            <Link
              className="d-flex list-group-item list-group-item-action bg-transparent fw-bold"
              to={"/"}
            >
              <i className="me-2">
                <AiFillDashboard />
              </i>
              <p>Dashboard</p>
            </Link>
          </div>
          <hr className="border-bottom  my-0 py-0" />
          <div>
            <Link
              className="d-flex list-group-item list-group-item-action bg-transparent  fw-bold"
              to={"/categories"}
            >
              <i className="me-2">
                <MdCategory />
              </i>
              <p>Categories</p>
            </Link>
          </div>
          <hr className="border-bottom  my-0 py-0" />
          <div>
            <Link
              className="d-flex list-group-item list-group-item-action bg-transparent  fw-bold"
              to={"/products"}
            >
              <i className="me-2">
                <GiSkateboard />
              </i>
              <p>Products</p>
            </Link>
          </div>
          <hr className="border-bottom  my-0 py-0" />
          <div>
            <Link
              className="d-flex list-group-item list-group-item-action bg-transparent  fw-bold"
              to={"/users"}
            >
              <i className="me-2">
                <FaUserAstronaut />
              </i>
              <p>Users</p>
            </Link>
          </div>
          <hr className="border-bottom  my-0 py-0" />
          <div>
            <Link
              className="d-flex list-group-item list-group-item-action bg-transparent  fw-bold"
              to={"/orders"}
            >
              <i className="me-2">
                <AiFillGift />
              </i>
              <p>Orders</p>
            </Link>
          </div>
          <hr className="border-bottom  my-0 py-0" />
          <div>
            <Link
              className="d-flex list-group-item list-group-item-action bg-transparent text-danger fw-bold"
              onClick={handleLogout}
            >
              <i className="me-2">
                <ImExit />
              </i>
              <p>Logout</p>
            </Link>
          </div>
        </div>
        <hr className="border-bottom  my-0 py-0" />

        <div className="container d-flex justify-content-center">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Panel;
