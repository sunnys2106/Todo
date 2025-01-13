import { useState, useEffect } from "react";

function ModalForm({ isOpen, onClose, mode, onSubmit, noteData }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duedate, setDuedate] = useState("");
    const [id, setId] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required.";

        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        if (!dateRegex.test(duedate)) {
            newErrors.duedate = "Date must be in YYYY-MM-DD format.";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        try {
            const noteData = {
                name,
                description,
                duedate,
            };
            await onSubmit(noteData, id);
        } catch (err) {
            console.error("Error submitting data", err);
        }
        onClose();
    };

    useEffect(() => {
        if (mode === "edit" && noteData) {
            setId(noteData.id);
            setName(noteData.name);
            setDescription(noteData.description);
            setDuedate(noteData.due_date);
        } else {
            setName("");
            setDescription("");
            setDuedate("");
        }
    }, [mode, noteData]);

    const closeForm = () => {
        setErrors({});
        onClose();
    };

    return (
        <dialog id="my_modal_3" className="modal" open={isOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg py-4">
                    {mode === "edit" ? "Edit Task" : "Add Task"}
                </h3>
                <form method="dialog" onSubmit={handleSubmit}>
                    {/* if there is a button in form, it will close the modal */}
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={closeForm}
                    >
                        ✕
                    </button>

                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered h-12"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        ></textarea>
                    </label>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered h-24"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        ></textarea>
                    </label>

                    {errors.duedate && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.duedate}
                        </p>
                    )}
                    <label className="my-4 input input-bordered flex items-center gap-2">
                        Due Date
                        <input
                            type="text"
                            className="grow"
                            value={duedate}
                            onChange={(e) => {
                                setDuedate(e.target.value);
                            }}
                            placeholder="YYYY-MM-DD"
                        />
                    </label>
                    <div className="mt-4 w-full flex justify-center">
                        <button className="btn btn-wide btn-outline btn-success">
                            {mode === "edit" ? "Save Changes" : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default ModalForm;
