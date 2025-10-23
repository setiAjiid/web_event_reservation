import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = window.prompt("Cari event (genre, kota, organizer, venue):");
    if (q && q.trim()) {
      navigate(`/events?q=${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md::px-16 lg:px-36 py-5">
      <div>
        <Link to="/" className="flex items-center gap-2">
          <img
            src={assets.logo}
            alt="Logo"
            className="max-h-10 w-auto object-contain rounded-full"
          />
          <span className="text-xl font-semibold text-white-800">FSD</span>
        </Link>
      </div>
      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 md:px-8 py-3 max-md:h-screen md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer "
          onClick={() => setIsOpen(!isOpen)}
        />

        <Link
          onClick={() => {
            scrollTo(0, 0), setIsOpen(false);
          }}
          to="/places"
        >
          Places
        </Link>

        <Link
          onClick={() => {
            scrollTo(0, 0), setIsOpen(false);
          }}
          to="/events"
        >
          Events
        </Link>

        <Link
          onClick={() => {
            scrollTo(0, 0), setIsOpen(false);
          }}
          to="/history"
        >
          Booking History
        </Link>

        <Link
          onClick={() => {
            scrollTo(0, 0), setIsOpen(false);
          }}
          to="/contact-us"
        >
          Contact Us
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <SearchIcon
          className="max-md:hidden w-6 h-6 cursor-pointer"
          onClick={handleSearch}
          title="Cari event"
        />
        {user ? (
          <div className="flex items-center gap-4">
            <span className="font-medium">Hi, {user.first_name}</span>
            <Link to="/profile">
              <button className="px-4 py-1 sm:px-7 sm:py-2 bg-blue-400 hover:bg-blue-500 text-white transition rounded-full font-medium cursor-pointer">
                Profile
              </button>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setUser(null);
              }}
              className="px-4 py-1 sm:px-7 sm:py-2 bg-red-600 hover:bg-red-700 text-white transition rounded-full font-medium cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="px-4 py-1 sm:px-7 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white transition rounded-full font-medium cursor-pointer">
              Login
            </button>
          </Link>
        )}
      </div>

      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Navbar;
