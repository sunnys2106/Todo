import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Table from "./components/Table.jsx";
import ModalForm from "./components/ModalForm.jsx";
import Alert from "./components/Alert.jsx";
import { useState, useEffect } from "react";
import axios from "./api/axios.js";

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [searchTerm, setSearchTerm] = useState("");
    const [note, setNote] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState({
        visible: false,
        type: "",
        message: "",
    });

    const handleModalOpen = (mode, noteData) => {
        setModalOpen(true);
        setModalMode(mode);
        setNote(noteData);
    };

    const handleSubmit = async (noteData, id) => {
        if (modalMode === "add") {
            try {
                console.log("here", noteData);

                await axios.post("/api/notes", noteData);
                setAlert({
                    visible: true,
                    type: "alert-success",
                    message: "Note added successfully",
                });
            } catch (err) {
                setAlert({
                    visible: true,
                    type: "alert-error",
                    message: "Error adding note",
                });
                console.log("error adding note frontend: ", err);
            } finally {
                fetchData();
            }
        } else {
            try {
                console.log("here", noteData);
                await axios.put(`/api/notes/${id}`, noteData);
                setAlert({
                    visible: true,
                    type: "alert-success",
                    message: "Note updated successfully",
                });
            } catch (err) {
                setAlert({
                    visible: true,
                    type: "alert-error",
                    message: "Error updating note",
                });
                console.log("error updating note frontend: ", err);
            } finally {
                fetchData();
            }
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );
        if (confirmDelete) {
            try {
                await axios.delete(`/api/notes/${id}`);
                // setTableData((prevData) => {
                //     return prevData.filter((note) => note.id !== id);
                // });
                setAlert({
                    visible: true,
                    type: "alert-success",
                    message: "Note deleted successfully",
                });
                fetchData();
            } catch (err) {
                setAlert({
                    visible: true,
                    type: "alert-error",
                    message: "Error deleting note",
                });
                setError(err);
            }
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const fetchData = async () => {
        try {
            if (searchTerm) {
                const response = await axios.get(
                    `/api/notes/search?q=${searchTerm}`
                );
                response.data.map((note) => {
                    const dateObj = new Date(note.due_date);
                    note.due_date = formatDate(dateObj);
                });
                setTableData(response.data);
            } else {
                const response = await axios.get("/api/notes");
                response.data.map((note) => {
                    const dateObj = new Date(note.due_date);
                    note.due_date = formatDate(dateObj);
                });
                setTableData(response.data);
            }
        } catch (err) {
            setAlert({
                visible: true,
                type: "alert-error",
                message: "Error retrieving notes",
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
                noteData={note}
            />
        </>
    );
}

export default App;
