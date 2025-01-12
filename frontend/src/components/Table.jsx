import axios from "axios";
import { useState, useEffect } from "react";

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
                            <th>Email</th>
                            <th>Job</th>
                            <th>Rate</th>
                            <th>Status</th>
                            <th>Update Client</th>
                            <th>Delete Client</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((client) => (
                            <tr key={client.id} className="hover">
                                <td>{counter}</td>
                                {counter++ && null}
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.job}</td>
                                <td>{client.rate}</td>
                                <td>
                                    <button
                                        className={`btn rounded-full w-20 ${
                                            client.isactive
                                                ? `btn-primary`
                                                : `btn-outline`
                                        }`}
                                    >
                                        {client.isactive
                                            ? "Active"
                                            : "Inactive"}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            handleOpen("edit", client)
                                        }
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-error"
                                        onClick={() => onDelete(client.id)}
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
