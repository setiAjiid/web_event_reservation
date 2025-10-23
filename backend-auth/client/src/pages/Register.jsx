import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nik, setNik] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register", {
        first_name: firstName,
        last_name: lastName,
        nik,
        birth_of_date: birthDate,
        email,
        phone_number: phoneNumber,
        password,
      });

      setMessage("Registrasi berhasil!");
      setTimeout(() => navigate("/login"), 1500); // redirect setelah 1.5 detik
    } catch (error) {
      setMessage("Registrasi gagal. Coba lagi.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-6">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-black"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        <input
          type="text"
          placeholder="Nama Depan"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded "
        />
        <input
          type="text"
          placeholder="Nama Belakang"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="NIK"
          value={nik}
          onChange={(e) => setNik(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded"
        />
        <input
          type="date"
          placeholder="Tanggal Lahir"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Nomor HP"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Daftar
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login di sini
          </Link>
        </p>

        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
}
