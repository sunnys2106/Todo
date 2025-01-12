import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Table from "./components/Table.jsx";
import ModalForm from "./components/ModalForm.jsx";
import Alert from "./components/Alert.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [searchTerm, setSearchTerm] = useState("");
    const [client, setClient] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState({
        visible: false,
        type: "",
        message: "",
    });

    const handleModalOpen = (mode, clientData) => {
        setModalOpen(true);
        setModalMode(mode);
        setClient(clientData);
    };

    const handleSubmit = async (clientData, id) => {
        if (modalMode === "add") {
            try {
                await axios.post(
                    "http://localhost:3000/api/clients",
                    clientData
                );
                setAlert({
                    visible: true,
                    type: "alert-success",
                    message: "Client added successfully",
                });
            } catch (err) {
                setAlert({
                    visible: true,
                    type: "alert-error",
                    message: "Error adding client",
                });
                console.log("error adding client frontend: ", err);
            } finally {
                fetchData();
            }
        } else {
            try {
                console.log("here", clientData);
                await axios.put(
                    `http://localhost:3000/api/clients/${id}`,
                    clientData
                );
                setAlert({
                    visible: true,
                    type: "alert-success",
                    message: "Client updated successfully",
                });
            } catch (err) {
                setAlert({
                    visible: true,
                    type: "alert-error",
                    message: "Error updating client",
                });
                console.log("error updating client frontend: ", err);
            } finally {
                fetchData();
            }
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this client?"
        );
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/clients/${id}`);
                // setTableData((prevData) => {
                //     return prevData.filter((client) => client.id !== id);
                // });
                setAlert({
                    visible: true,
                    type: "alert-success",
                    message: "Client deleted successfully",
                });
                fetchData();
            } catch (err) {
                setAlert({
                    visible: true,
                    type: "alert-error",
                    message: "Error deleting client",
                });
                setError(err);
            }
        }
    };

    const fetchData = async () => {
        try {
            if (searchTerm) {
                const response = await axios.get(
                    `http://localhost:3000/api/clients/search?q=${searchTerm}`
                );
                setTableData(response.data);
            } else {
                const response = await axios.get(
                    "http://localhost:3000/api/clients"
                );
                setTableData(response.data);
            }
        } catch (err) {
            setAlert({
                visible: true,
                type: "alert-error",
                message: "Error retrieving clients",
            });
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchTerm]);

    useEffect(() => {
        if (alert.visible) {
            const timer = setTimeout(() => {
                setAlert({ visible: false, type: "", message: "" });
            }, 4000);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [alert]);

    return (
        <>
            <Navbar handleOpen={handleModalOpen} onSearch={setSearchTerm} />
            {alert.visible && (
                <Alert type={alert.type} message={alert.message} />
            )}
            <Table
                handleOpen={handleModalOpen}
                onDelete={handleDelete}
                tableData={tableData}
                error={error}
            />
            <ModalForm
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                mode={modalMode}
                clientData={client}
            />
        </>
    );
}

export default App;
