import React, { useEffect, useState, useMemo } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DeliveredOrders from "./DeliveredOrders";
import CurrentOrders from "./CurrentOrders";
import axios from "axios";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const navigate = useNavigate();

  const [cuurent, setCurrent] = useState([]);

  const [id, setId] = useState([]);

  var token = localStorage.getItem("token");
  token = JSON.parse(token);
  // console.log(token);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // http://localhost:3000/profile/orders

    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/order/getmyorders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.reqOrder);
        setOrders(response.data.reqOrder);
        // filterOrders();
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

    // function filterOrders() {
    //   const delivered = orders.filter((order) => {
    //     return order.isDelivered === true;
    //   });

    //   const current = orders.filter((order) => {
    //     return order.isDelivered === false;
    //   });

    //   console.log(delivered);
    //   console.log(current);

    //   setDeliveredOrders(delivered);
    //   setCurrentOrders(current);
    // }
  }, []);

  useEffect(() => {
    // Your initial data fetching or setting orders...

    filterOrders();
  }, [orders]); // You might have a dependency array with values here
  const filterOrders = () => {
    const delivered = orders.filter((order) => order.isDelivered);
    const current = orders.filter((order) => !order.isDelivered);
    setDeliveredOrders(delivered);
    setCurrentOrders(current);

    console.log(delivered);
    console.log(current);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Delivered Orders">
          {/* Delivered Orders */}

          {deliveredOrders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <>
              {/* Render your cards for deliveredOrders and currentOrders */}
              <div className="grid grid-cols-1 gap-4">
                {deliveredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-lg shadow-md p-4 mt-3"
                  >
                    <h2 className="text-2xl font-bold mb-3">
                      Order - # {order._id?.trim()?.substring(0, 8)}
                    </h2>
                    <div className="bg-gray-100 rounded-md p-3 mb-3">
                      <p className="font-semibold">Ordered At:</p>
                      <p>
                        {order.orderedAt
                          ? order.orderedAt.substring(0, 10)
                          : "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-md p-3 mb-3">
                      <p className="font-semibold">Total Items:</p>
                      <p>{order.totalItems}</p>
                    </div>
                    <div className="bg-gray-100 rounded-md p-3 mb-3">
                      <p className="font-semibold">Total Amount:</p>
                      <p>${order.totalAmount}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {order.isDelivered ? (
                          <AiOutlineCheckCircle
                            className="text-green-600 mr-2"
                            size={20}
                          />
                        ) : (
                          <AiOutlineCloseCircle
                            className="text-red-600 mr-2"
                            size={20}
                          />
                        )}
                        <span
                          className={`font-semibold ${
                            order.isDelivered
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {order.isDelivered ? "Delivered" : "Not Delivered"}
                        </span>
                      </div>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        onClick={() => {
                          setId(order._id);
                          setCurrent(order);
                          handleShow();
                        }}
                      >
                        See Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* <DeliveredOrders /> */}
        </Tab>
        <Tab eventKey="profile" title="Current Orders">
          {/* Current Orders */}

          {currentOrders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <>
              {currentOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-lg shadow-md p-4 mt-3"
                >
                  <h2 className="text-2xl font-bold mb-3">
                    Order - # {order._id?.trim()?.substring(0, 8)}
                  </h2>
                  <div className="bg-gray-100 rounded-md p-3 mb-3">
                    <p className="font-semibold">Ordered At:</p>
                    <p>
                      {order.orderedAt
                        ? order.orderedAt.substring(0, 10)
                        : "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-100 rounded-md p-3 mb-3">
                    <p className="font-semibold">Total Items:</p>
                    <p>{order.totalItems}</p>
                  </div>
                  <div className="bg-gray-100 rounded-md p-3 mb-3">
                    <p className="font-semibold">Total Amount:</p>
                    <p>${order.totalAmount}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {order.isDelivered ? (
                        <AiOutlineCheckCircle
                          className="text-green-600 mr-2"
                          size={20}
                        />
                      ) : (
                        <AiOutlineCloseCircle
                          className="text-red-600 mr-2"
                          size={20}
                        />
                      )}
                      <span
                        className={`font-semibold ${
                          order.isDelivered ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Not Delivered"}
                      </span>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => {
                        setId(order._id);
                        setCurrent(order);
                        handleShow();
                      }}
                    >
                      See Details
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* <CurrentOrders /> */}
        </Tab>
      </Tabs>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>#{cuurent?._id?.trim().substring(0, 8)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="table w-full mb-4">
              <div className="table-row font-bold">
                <div className="table-cell">Image</div>
                <div className="table-cell">Name</div>
                <div className="table-cell">Quantity</div>
                <div className="table-cell">Price</div>
                <div className="table-cell">Total</div>
              </div>
              {cuurent?.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className={`table-row ${
                    index !== cuurent.orderItems.length - 1
                      ? "border-b border-gray-300"
                      : ""
                  }`}
                >
                  <div className="table-cell">
                    <img
                      src={item?.product?.image ?? "placeholder_url"}
                      alt="Product"
                      className="w-16 h-16 object-contain"
                      onClick={() => {
                        navigate(`/product/${item?.product?._id}`);
                      }}
                    />
                  </div>
                  <div className="table-cell align-middle">
                    {item?.product?.name ?? "N/A"}
                  </div>
                  <div className="table-cell align-middle">
                    {item?.quantity ?? "N/A"}
                  </div>
                  <div className="table-cell align-middle">
                    ${item?.product?.price ?? "N/A"}
                  </div>
                  <div className="table-cell align-middle">
                    ${item?.quantity * item?.product?.price ?? "N/A"}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 py-3 mb-3">
              <div className="flex justify-between">
                <p className="font-semibold">Total Items:</p>
                <p>{cuurent?.totalItems ?? "N/A"}</p>
              </div>
            </div>
            <div className="border-t border-gray-300 py-3 mb-3">
              <div className="flex justify-between">
                <p className="font-semibold">Total Order Value:</p>
                <p>${cuurent?.totalAmount ?? "N/A"}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {cuurent?.isDelivered ? (
                  <AiOutlineCheckCircle
                    className="text-green-600 mr-2"
                    size={20}
                  />
                ) : (
                  <AiOutlineCloseCircle
                    className="text-red-600 mr-2"
                    size={20}
                  />
                )}
                <span
                  className={`font-semibold ${
                    cuurent?.isDelivered ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {cuurent?.isDelivered ? "Delivered" : "Not Delivered"}
                </span>
              </div>
              {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Track Order
              </button> */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button
            variant="primary"
            onClick={handleClose}
            className="bg-slate-500 text-black"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Order;
