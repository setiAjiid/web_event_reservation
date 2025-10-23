import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/feedback", {
        message,
      });
      setStatus("success");
      setMessage("");
    } catch (err) {
      console.error(err.response?.data || err);
      setStatus("error");
    }
  };

  return (
    <div className="pt-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis feedback Anda..."
          required
          rows="5"
          className="w-full border px-4 py-2 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Kirim Feedback
        </button>
      </form>
      {status === "success" && (
        <p className="mt-4 text-green-600">Feedback berhasil dikirim!</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600">Gagal mengirim feedback.</p>
      )}
    </div>
  );
};

export default ContactUs;
