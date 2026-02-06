import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center shadow-sm sticky top-0 z-50">
            <Link to="/" className="text-xl font-bold text-primary hover:text-blue-700 transition">Career Quest</Link>

            <div className="ml-8 flex gap-6">
                <Link to="/jobs" className="text-secondary hover:text-primary transition font-medium">Jobs</Link>
                {user && <Link to="/applications" className="text-secondary hover:text-primary transition font-medium">My Applications</Link>}
            </div>

            <div className="ml-auto flex gap-4 items-center">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = `/search?q=${e.target.search.value}`;
                }} className="relative">
                    <input
                        name="search"
                        type="text"
                        placeholder="Search jobs..."
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-64 p-2.5"
                    />
                </form>

                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700 font-medium">Hello, {user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link
                            to="/login"
                            className="text-primary hover:text-blue-700 font-medium px-4 py-2"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-md"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
