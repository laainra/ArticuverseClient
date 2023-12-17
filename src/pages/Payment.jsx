import React, { useState } from "react";
import Navi from "../components/General/Navbar.jsx";
import Footer from "../components/General/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";


export default function Payment() {
  const location = useLocation();
  const { artworkData, userData, amount, method } = location.state || {};

  const [paymentProof, setPaymentProof] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [paymentCode, setPaymentCode] = useState(generateRandomCode());

  const getPaymentInstructions = () => {
    if (method === 'ShopeePay') {
      return 'Transfer in this Shopee Number: 081239640530';
    } else if (method === 'GoPay') {
      return 'Transfer in this Gopay Number: 081239640530';
    } else if (method === 'BankTransfer') {
      return 'Transfer in this Bank Account Number: 388601037851536 (BRI)';
    } else {
      return 'Payment instructions not available for this method.';
    }
  };
  

  const handleModalClose = () => {
    setShowModal(false);
    // Additional actions you may want to perform when closing the modal
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPaymentProof(file);
    setUploadError("");
  };
  const handleModalShow = () => setShowModal(true);

  const handleSubmit = async () => {
    if (!paymentProof) {
      setUploadError("Please upload the payment proof");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("user_id", userData);
      formData.append("artwork_id", artworkData.id);
      formData.append("amount", amount);
      formData.append("method", method);
      formData.append("proof", paymentProof);
  
      // Assuming you have the correct endpoint for your API
      const response = await axios.post("http://localhost:8080/insert-support", formData);
  
      if (response.status === 201) {
        handleModalShow();
      } else {
        console.error("Error submitting payment. Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };
  

  return (
    <div>
      <Navi />
      <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col mt-5 text-center items-center">
        <img
                            width="100px"
                            height="100px"
          src="https://cdn1.iconfinder.com/data/icons/ui-navigation-1/152/confirm-512.png"
          alt="Success"
          className="success-image mb-5"
        />
        <p>Payment submitted successfully!</p>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => navigate("/explore")}>
          Back to Explore
        </Button>
      </Modal.Footer>
    </Modal>
      <div className="container mt-20 text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-5">Detail Support</h1>

        {/* Display user, artwork, amount, method details */}
        <div className="flex flex-col items-center mb-5 mx-auto">
        <img
                          src={`http://localhost:8080/uploads/${artworkData.media}`}
                          alt={artworkData.title}
                          width="300px"
                          height="200px"
                          className="mb-3"
                        />
          <DetailItem label="Artwork" value={artworkData.title} />
          <DetailItem label="Artist" value={artworkData.artist} />
          <DetailItem label="Owner" value={artworkData.user_username} />
          <DetailItem label="Amount"value={formatCurrency(amount)} />
          <DetailItem label="Method" value={method} />

          <div className="border p-3 mt-5 bg-pink-50">
          <h4 className="font-bold">Payment Instructions:</h4>
            <h5>{getPaymentInstructions()}</h5>
          </div>

          {/* Input for uploading payment proof */}
          <div className="my-5 flex-col">
            <label htmlFor="paymentProof" className="form-label font-bold">
              Upload Payment Proof
            </label>
            <MDBBtn
              tag="label"
              color="danger"
              rounded
              size="xl"
              htmlFor="proofFile"
              className=" mt-3 ml-5"
            >
              Select File
              <input
                type="file"
                onChange={handleFileChange}
                id="proofFile"
                style={{ display: "none" }}
                accept=".jpg, .jpeg, .png"
             
              />
            </MDBBtn>
          </div>

            <h5 className="text-sm ml-44 mt-2 text-red-500">
              {paymentProof ? `Selected avatar: ${paymentProof.name}` : ""}
            </h5>

          {uploadError && <p className="text-red-500 mt-3">{uploadError}</p>}

          <button className="btn btn-danger mt-3" onClick={handleSubmit}>
            Submit Payment
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {successModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSuccessModal(false)}>
              &times;
            </span>
            <img
              src="https://cdn1.iconfinder.com/data/icons/ui-navigation-1/152/confirm-512.png"
              alt="Success"
              className="success-image"
            />
            <p>Payment submitted successfully!</p>
            <p>Your support will be immediately validated and sent to the artist!</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}


// Helper component for displaying label and value
const DetailItem = ({ label, value }) => (
  <div className="flex justify-between">
    <div>
      <h5>{label}: </h5>
    </div>
    <div>
      <h5 className="font-bold"> {value ? value : "N/A"}</h5>
    </div>
  </div>
);
const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
};

const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 20;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const PaymentSuccess = () => {
  const navigate = useNavigate();
  
  // Check if the state includes the success status
  const isSuccess = navigate?.location?.state?.success;
  const artworkData = navigate?.location?.state?.artworkData;

  return (
    
    <div className="container mt-20 text-center">
      <Navi/>
      <h1 className="text-4xl font-bold mb-5">Payment Successful</h1>

      {isSuccess ? (
        <>
                    <img
                    width="100px"
                    height="100px"
              src="https://cdn1.iconfinder.com/data/icons/ui-navigation-1/152/confirm-512.png"
              alt="Success"
              className="success-image"
            />
          <p>Payment submitted successfully!</p>
          <p>Your support will be immediately validated and sent to the artist!</p>
          <button className="btn btn-danger mt-3" onClick={() => navigate("/explore")}>
            Explore
          </button>
          <Footer/>
        </>
      ) : (
        <p>Oops! Something went wrong. Please try again later.</p>
        )}
        </div>
        );
        };

        
export {Payment,PaymentSuccess}

