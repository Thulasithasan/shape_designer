import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      {/* <h1 className="text-xl font-bold">Shape Designer 🎨</h1> */}
      <Link to="/" className="text-xl font-bold text-white transform transition-transform duration-200 hover:scale-105">
        Shape Designer 🎨
      </Link>
      <div className="flex gap-4">
        <Link
          to="/shape"
          className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-200"
        >
          Create Shape
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
