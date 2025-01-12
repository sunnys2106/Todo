import { useState, useEffect } from "react";

function ModalForm({ isOpen, onClose, mode, onSubmit, clientData }) {
    const [rate, setRate] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
    const [status, setStatus] = useState(false);
    const [id, setId] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email))
            newErrors.email = "Invalid email format.";
        if (!job.trim()) newErrors.job = "Job is required.";
        if (!rate || isNaN(rate) || rate <= 0)
            newErrors.rate = "Rate must be a positive number.";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        console.log(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        try {
            const clientData = {
                name,
                email,
                job,
                rate: Number(rate),
                isactive: status,
            };
            await onSubmit(clientData, id);
        } catch (err) {
            console.error("Error submitting data", err);
        }
        onClose();
    };

    useEffect(() => {
        if (mode === "edit" && clientData) {
            setId(clientData.id);
            setName(clientData.name);
            setEmail(clientData.email);
            setJob(clientData.job);
            setRate(clientData.rate);
            setStatus(clientData.isactive);
        } else {
            setName("");
            setEmail("");
            setJob("");
            setRate("");
            setStatus(false);
        }
    }, [mode, clientData]);

    return (
        <dialog id="my_modal_3" className="modal" open={isOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg py-4">
                    {mode === "edit" ? "Edit Client" : "Add Client"}
                </h3>
                <form method="dialog" onSubmit={handleSubmit}>
                    {/* if there is a button in form, it will close the modal */}
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                    <label className="mb-4 input input-bordered flex items-center gap-2">
                        Name
                        <input
                            type="text"
                            className="grow"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </label>
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                    <label className="my-4 input input-bordered flex items-center gap-2">
                        Email
                        <input
                            type="text"
                            className="grow"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </label>
                    {errors.job && (
                        <p className="text-red-500 text-sm">{errors.job}</p>
                    )}
                    <label className="my-4 input input-bordered flex items-center gap-2">
                        Job
                        <input
                            type="text"
                            className="grow"
                            value={job}
                            onChange={(e) => {
                                setJob(e.target.value);
                            }}
                        />
                    </label>

                    {errors.rate && (
                        <p className="text-red-500 text-sm">{errors.rate}</p>
                    )}
                    <div className="my-4 flex justify-between">
                        <label className="mr-4 input input-bordered flex items-center gap-2">
                            Rate
                            <input
                                type="number"
                                className="grow"
                                value={rate}
                                onChange={(e) => {
                                    setRate(e.target.value);
                                }}
                            />
                        </label>

                        <select
                            value={status ? "Active" : "Inactive"}
                            className="select select-bordered w-full max-w-xs"
                            onChange={(e) => {
                                setStatus(e.target.value === "Active");
                            }}
                        >
                            <option>Inactive</option>
                            <option>Active</option>
                        </select>
                    </div>

                    <button className="btn btn-success">
                        {mode === "edit" ? "Save Changes" : "Add Client"}
                    </button>
                </form>
            </div>
        </dialog>
    );
}

export default ModalForm;
