// import React from "react";

const NavBar = () => {
  return (
    <nav className="flex justify-between bg-purple-800 text-white py-2 sticky top-0">
      <div className="logo">
        <span className="font-extrabold text-2xl mx-8">TaskNest</span>
      </div>
      <ul className="flex gap-8 mx-8 text-xl">
        <li className="cursor-pointer hover:border-b-4 transition-all">Home</li>
        <li className="cursor-pointer hover:border-b-4 transition-all">
          About
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
