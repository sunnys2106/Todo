const formatToReadableDate = (date) => {
    const dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() + 1);
    dateObj.setHours(0, 0, 0, 0);
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(dateObj);
};

function Table({ handleOpen, onDelete, tableData, error }) {
    let counter = 1;
    return (
        <>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Update Task</th>
                            <th>Delete Task</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((note) => (
                            <tr key={note.id} className="hover">
                                <td>{counter}</td>
                                {counter++ && null}
                                <td>{note.name}</td>
                                <td>{note.description}</td>
                                <td>{formatToReadableDate(note.due_date)}</td>
                                <td>
                                    <button
                                        className="btn btn-outline btn-warning"
                                        onClick={() => handleOpen("edit", note)}
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline btn-error"
                                        onClick={() => onDelete(note.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;
