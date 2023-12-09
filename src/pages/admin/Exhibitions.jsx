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
import { Modal, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/General/Sidebar";

function ExhibitionTable() {
  const [exhibitionData, setExhibitionData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [poster, setPoster] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [showInsert, setShowInsert] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);


  const fetchExhibitionData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/exhibition");
      if (Array.isArray(response.data.data)) {
        setExhibitionData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchExhibitionData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
  };

  const UpdateDataExhibition = async (event) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("location", location);
    // formData.append("start_date", start_date);
    // formData.append("end_date", end_date);
    // if (poster) {
    //   formData.append("poster", poster);
    // }
    try {
      const response = await axios.put(
        `http://localhost:8080/update-exhibition/${id}`,
        {name,description,location,poster,start_date,end_date},
      );

      if (response.status === 200) {
        alert("Data berhasil diubah");
        window.location.replace("http://localhost:3000/admin/exhibitions");
      } else {
        alert("Failed to update data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting data");
    }
  };

  const InsertDataExhibition = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    if (poster) {
      formData.append("poster", poster);
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/insert-exhibition",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Data berhasil ditambahkan");
        closeModal(); 
        fetchExhibitionData();
      } else {
        alert("Failed to insert data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting data");
    }
  };
  const deleteExhibition = async (event) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete-exhibition/${id}`
      );

      if (response.status === 200) {
        alert("Exhibition deleted successfully");
        closeModalDelete(); 
        fetchExhibitionData();
      } else {
        alert("Failed to delete exhibition");
      }
    } catch (error) {
      console.error("An error occurred while deleting exhibition:", error);
      alert("An error occurred while deleting exhibition");
    }
  };

  const showModalUpdate = (data) => {
    setId(data.id);
    setName(data.name);
    setDescription(data.description);
    setLocation(data.location);
    setPoster(data.poster);
    setStartDate(data.start_date);
    setEndDate(data.end_date);
    setShowInsert(false);
    setShowUpdate(true);

    // Log existing data for verification
    console.log("Existing Data:", data);
  };

  const closeModal = () => {
    setId("");
    setName("");
    setDescription("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setShowInsert(false);
    setShowUpdate(false);
  };
  const showModalInsert = () => {
    setId("");
    setName("");
    setDescription("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setShowInsert(true);
    setShowUpdate(false);
  };

  const showModalDelete = (data) => {
    setId(data.id);
    setName(data.name);
    setDescription(data.description);

    setShowDelete(true);
  };

  const closeModalDelete = () => {
    setId("");
    setName("");
    setDescription("");
    setShowDelete(false);
  };

  return (
    <div className="container flex">
      <Sidebar />
      <div className="flex">
        <div className="p-5">
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
                      <p className="col-4 card-text">Exhibition Name</p>
                      <p className="col-6 card-text">: {name}</p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">Description</p>
                      <p className="col-6 card-text">: {description}</p>
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
                onClick={() => deleteExhibition(id)}
              >
                Hapus Data
              </Button>
              <Button variant="danger" onClick={closeModalDelete}>
                Batal
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showInsert} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Form Insert Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={InsertDataExhibition}
                encType="multipart/form-data"
              >
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                ></Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Poster</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    autoFocus
                    onChange={(e) => setStartDate(e.target.value)}
                    value={start_date}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    autoFocus
                    onChange={(e) => setEndDate(e.target.value)}
                    value={end_date}
                  />
                </Form.Group>
                <Button type="submit" color="primary" className="px-4">
                  Insert
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showUpdate} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Form Update Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={UpdateDataExhibition}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                ></Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>location</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Poster</Form.Label>
                  <Form.Control
                    // onChange={handleFileChange}
                    type="text"
                    onChange={(e) =>setPoster(e.target.value)}
                    // accept=".jpg, .jpeg, .png"
                    value={poster}
                    disabled
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    autoFocus
                    onChange={(e) => setStartDate(e.target.value)}
                    value={start_date}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    autoFocus
                    onChange={(e) => setEndDate(e.target.value)}
                    value={end_date}
                  />
                </Form.Group>
                <Button type="submit" color="primary" className="px-4">
                  Update
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <h1 className="py-1">Exhibition Data</h1>
          <CCard className="mb-4 mx-auto">
            <CCardHeader>
              <strong>Exhibition Table</strong>
            </CCardHeader>
            <CButton
              className="btn btn-default text-white center"
              onClick={showModalInsert}
            >
              Add Exhibition
            </CButton>
            <CCardBody>
              <p className="text-medium-emphasis small">
                This table displays exhibition data.
              </p>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableDataCell className="text-center">
                      <strong>Name</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Description</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Location</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Poster</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Start Date</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>End Date</strong>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <strong>Action</strong>
                    </CTableDataCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {exhibitionData.map((exhibition) => (
                    <CTableRow key={exhibition.id}>
                      <CTableDataCell className="text-center">
                        {exhibition.name}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {exhibition.description}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {exhibition.location}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <img
                          src={`http://localhost:8080/uploads/${exhibition.poster}`}
                          alt={exhibition.name}
                          width="300px"
                          height="200px"
                        />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {exhibition.start_date}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {exhibition.end_date}
                      </CTableDataCell>
                      <CTableDataCell className="text-center ">
                        <Button
                          className="mb-3"
                          variant="primary"
                          onClick={() => showModalUpdate(exhibition)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => showModalDelete(exhibition)}
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

export default ExhibitionTable;
