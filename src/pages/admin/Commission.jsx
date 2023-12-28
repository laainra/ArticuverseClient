import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/General/Sidebar";
import { Modal, Form, Button } from "react-bootstrap";

function AdminCommission() {
  const [commData, setCommData] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setamount] = useState("");
  const [artist, setartist] = useState("");
  const [user, setuser] = useState("");
  const [status, setstatus] = useState("");
  const [date, setdate] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const fetchCommData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/support");
      if (Array.isArray(response.data.data)) {
        setCommData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const validateCommission = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/validate-commission/${id}`
      );
      if (response.status === 200) {
        fetchCommData(); // Refresh the commission data after validation
      } else {
        alert("Failed to validate commission");
      }
    } catch (error) {
      console.error("An error occurred while validating commission:", error);
      alert("An error occurred while validating commission");
    }
  };

  const unvalidateCommission = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/unvalidate-commission/${id}`
      );
      if (response.status === 200) {
        fetchCommData(); // Refresh the commission data after validation
      } else {
        alert("Failed to validate commission");
      }
    } catch (error) {
      console.error("An error occurred while validating commission:", error);
      alert("An error occurred while validating commission");
    }
  };

  const deteleComm = async (event) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete-commission/${id}`
      );

      if (response.status === 200) {
        // alert("commission deleted successfully");
        closeModalDelete();
        fetchCommData();
      } else {
        alert("Failed to delete commission");
      }
    } catch (error) {
      console.error("An error occurred while deleting commission:", error);
      alert("An error occurred while deleting commission");
    }
  };

  useEffect(() => {
    fetchCommData();
  }, []);

  const showModalDelete = (data) => {
    setId(data.id);
    setTitle(data.title);
    setamount(data.amount);
    setstatus(data.status);
    setartist(data.artwork_artist);
    setuser(data.user_username);
    setdate(data.created_at);

    setShowDelete(true);
  };

  const closeModalDelete = () => {
    setId("");
    setTitle("");
    setamount("");
    setShowDelete(false);
  };

  return (
    <div className="container flex">
      <div className="flex">
        <Sidebar />
        <div className=" p-5">
          <Modal show={showDelete} onHide={closeModalDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure to delete this data?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-Name">Detail Data</h5>
                    <div className="row">
                      <p className="col-4 card-text">Title</p>
                      <p className="col-6 card-text">: {title}</p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">amount</p>
                      <p className="col-6 card-text">: {amount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                color="primary"
                className="px-4"
                onClick={() => deteleComm(id)}
              >
                Hapus Data
              </Button>
              <Button variant="danger" onClick={closeModalDelete}>
                Batal
              </Button>
            </Modal.Footer>
          </Modal>
          <h1 className="py-1">Commissions Data</h1>
          <CCard className="mx-auto">
            <CCardHeader>
              <strong>Commissions Table</strong>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis small">
                This table displays commissions data.
              </p>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableDataCell className="text-center">
                      <strong>NO</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Title</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Artist</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Amount</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Method</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>User</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Date</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Proof</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Status</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Action</strong>
                    </CTableDataCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {commData.map((comm, index) => (
                    <CTableRow key={comm.id}>
                      <CTableDataCell className="text-center">
                        {index + 1}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {comm.title}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {comm.artist}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {formatCurrency(comm.amount)}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {comm.method}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {comm.user_username}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {comm.created_at}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <img
                          src={`http://localhost:8080/uploads/${comm.proof}`}
                          alt={comm.proof}
                          width="300px"
                          height="200px"
                        />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {comm.status}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {comm.status === "validated" ? (
                          <Button
                            className="mb-2"
                            variant="primary"
                            onClick={() => unvalidateCommission(comm.id)}
                          >
                            Unvalidate
                          </Button>
                        ) : (
                          <Button
                            className="mb-2"
                            variant="primary"
                            onClick={() => validateCommission(comm.id)}
                          >
                            Validate
                          </Button>
                        )}
                        <Button
                          variant="danger"
                          onClick={() => showModalDelete(comm)}
                        >
                          Delete
                        </Button>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
}

export default AdminCommission;

const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
};
