import { MiniButton } from "./General/Button.jsx";
import React, { useState } from "react";
import {
  FaShopee,
  FaInstagram,
  FaLink,
  FaTwitter,
  FaWhatsapp,
  FaWhatsappSquare,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const SupportModal = ({ onClose, artwork }) => {
  const [showModal, setShowModal] = useState(true);
  const [supportData, setSupportData] = useState({
    amount: "",
    method: "", // New state for payment method
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const user = localStorage.getItem("userId");

  const handleSupportClick = () => {
    const amountValue = parseFloat(supportData.amount);
    if (isNaN(amountValue) || amountValue < 10000) {
      setError("Please enter a valid amount of at least 10000");
      return;
    }

    const paymentPagePath = `/support-artwork/${artwork.id}`;

    const dataToSend = {
      artworkData: artwork,
      userData: user,
      ...supportData,
    };

    navigate(paymentPagePath, { state: dataToSend });
  };

  const handleClose = () => {
    setShowModal(false);
    if (onClose) {
      onClose();
    }
  };

  const handleAmountChange = (e) => {
    setSupportData((prevData) => ({
      ...prevData,
      amount: e.target.value,
    }));
  };

  const handleMethodChange = (e) => {
    setSupportData((prevData) => ({
      ...prevData,
      method: e.target.value,
    }));
  };

  return (
    <div className="fixed  left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div
        className="bg-white rounded-lg overflow-hidden flex flex-col items-center "
        style={{ width: 800, height: 500 }}
      >
        <div className="flex justify-between p-4 items-center w-full">
          <div className="text-2xl font-bold text-center">
            Support Our Artist
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-grow items-center">
          <div className="box w-full">
            <div
              className="rectangle border-dashed border-2 border-gray-700 m-3 rounded-lg flex items-center justify-center"
              style={{ width: 700, height: 350 }}
            >
              <div className="flex flex-col items-center my-10 mx-24">
                <h4 className="text-xl mb-5">
                  Support{" "}
                  <span className="text-red-400 font-bold">
                    @{artwork.user_username}
                  </span>{" "}
                  with an additional contribution
                </h4>
                <div className="flex text-center font-roboto text-24px">
                  <h6 className="mt-3 mr-2 font-bold">Amount:</h6>
                  <input
                    type="text"
                    placeholder="Enter commission amount"
                    className="h-12 w-full px-12 rounded-lg bg-red-50 border-none outline-none"
                    name="amount"
                    value={supportData.amount}
                    onChange={handleAmountChange}
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="text-center font-roboto   mt-5">
                  <h6 className="mr-2 font-bold">Payment Method:</h6>
                  <input
                    type="radio"
                    value="ShopeePay"
                    checked={supportData.method === "ShopeePay"}
                    onChange={handleMethodChange}
                  />
                  <label className="mx-2">ShopeePay</label>
                  <input
                    type="radio"
                    value="GoPay"
                    checked={supportData.method === "GoPay"}
                    onChange={handleMethodChange}
                  />
                  <label className="mx-2">GoPay</label>
                  <input
                    type="radio"
                    value="BankTransfer"
                    checked={supportData.method === "BankTransfer"}
                    onChange={handleMethodChange}
                  />
                  <label className="mx-2">Bank Transfer</label>
                </div>
                <div className="mt-3 ml-2">
                  <Button
                    className="btn btn-danger"
                    onClick={handleSupportClick}
                  >
                    Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
