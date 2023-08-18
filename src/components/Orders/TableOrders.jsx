import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { CiEdit } from "react-icons/ci";
import { AiOutlineCheckCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
const TableOrders = () => {
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
  const { data } = useFetch(`${process.env.REACT_APP_API_URL}/order`);
  const { data: statusData } = useFetch(
    `${process.env.REACT_APP_API_URL}/status`
  );
  const [ordersList, setOrdersList] = useState(null);
  const [statusList, setStatusList] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isClicked, setIsClicked] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  useEffect(() => {
    setOrdersList(data);
    setStatusList(statusData);
  }, [data]);

  const handleChangeStatus = async (orderId) => {
    const response = await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API_URL}/order/${orderId}`,
      data: { newStatus, orderId },
    });
    response.data.message
      ? notifySuccess(response.data.message)
      : notifyError(response.data.error);
  };
  return (
    <>
      <div className="container">
        <div className="row m-3">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h3>Orders</h3>
          </div>
        </div>
        <div className="col border rounded shadow bg-opacity-75">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {ordersList &&
                ordersList.map((order) => (
                  <tr key={order.id} className="text-center">
                    <th scope="row">{order.id}</th>
                    <td>
                      <span className="fw-bold">
                        {order.user.firstname} {"-"} {order.user.lastname}
                      </span>
                      <p>
                        {"("}
                        {order.user.email}
                        {")"}
                      </p>
                    </td>
                    <td>USD Total</td>
                    <td>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue={String(order.statusId)}
                        disabled={isDisabled}
                        onChange={(event) => setNewStatus(event.target.value)}
                      >
                        {statusList &&
                          statusList.map((s) => (
                            <option value={String(s.id)} key={s.id}>
                              {s.name}
                            </option>
                          ))}
                      </select>
                    </td>

                    <td>
                      {isClicked ? (
                        <CiEdit
                          className="text-warning"
                          size={32}
                          onClick={() => {
                            setIsDisabled(false);
                            setIsClicked(false);
                          }}
                        />
                      ) : (
                        <AiOutlineCheckCircle
                          color="green"
                          size={32}
                          onClick={(event) => handleChangeStatus(order.id)}
                        />
                      )}
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

export default TableOrders;
