import { useState } from "react";

function Navbar({ handleOpen, onSearch }) {
    const [inputValue, setInputValue] = useState("");

    return (
        <div className="navbar bg-base-100 p-4">
            <div
                className="navbar-start"
                onClick={() => {
                    onSearch("");
                }}
            >
                <a className="btn btn-ghost text-xl">Clients</a>
            </div>
            <div className="navbar-center">
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-24 md:w-auto"
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>
                <button
                    className="btn btn-ghost btn-circle"
                    onClick={() => {
                        onSearch(inputValue);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
            <div className="navbar-end">
                <a
                    className="btn btn-secondary"
                    onClick={() => handleOpen("add")}
                >
                    Add Client
                </a>
            </div>
        </div>
    );
}

export default Navbar;
