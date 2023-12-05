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

function UserTable() {
  const [userData, setUserData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user");
      if (Array.isArray(response.data.data)) {
        setUserData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteUser = async (event) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete-user/${id}`
      );

      if (response.status === 200) {
        alert("User deleted successfully");
        window.location.replace("http://localhost:3000/admin/users");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("An error occurred while deleting user:", error);
      alert("An error occurred while deleting user");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const showModalDelete = (data) => {
    setId(data.id);
    setName(data.name);
    setEmail(data.email);

    setShowDelete(true);
  };

  const closeModalDelete = () => {
    setId("");
    setName("");
    setEmail("");
    setShowDelete(false);
  };

  return (
    <div className="container flex">
      <Sidebar />
      <div className="flex">
        <div className=" p-5">
                  <Modal show={showDelete} onHide={closeModalDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure to delete this data?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Detail Data</h5>
                    <div className="row">
                      <p className="col-4 card-text">User Name</p>
                      <p className="col-6 card-text">: {name}</p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">Email</p>
                      <p className="col-6 card-text">: {email}</p>
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
                onClick={() => deleteUser(id)}
              >
                Hapus Data
              </Button>
              <Button variant="danger" onClick={closeModalDelete}>
                Batal
              </Button>
            </Modal.Footer>
          </Modal>
          <h1 className="py-1">User Data</h1>
          <CCard className="mx-auto">
            <CCardHeader>
              <strong>User Table</strong>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis small">
                This table displays user data.
              </p>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableDataCell className="text-center">
                      <strong>NO</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Name</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Username</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Email</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Role</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Action</strong>
                    </CTableDataCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {userData.map((user, index) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell className="text-center">
                        {index + 1}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {user.name}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {user.username}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {user.email}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {user.role}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <Button
                          variant="danger"
                          onClick={() => showModalDelete(user)}
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

export default UserTable;
