import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const loadHistory = () => {
    axios
      .get(`http://localhost:8000/api/bookings/history/${user.user_id}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Gagal ambil history:", err));
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handlePay = (bookingId) => {
    axios
      .post(`http://localhost:8000/api/bookings/${bookingId}/pay`)
      .then(() => {
        alert("Pembayaran berhasil!");
        loadHistory();
      })
      .catch((err) => alert(err.response?.data?.message || "Gagal bayar"));
  };

  const handleRefund = (bookingId) => {
    axios
      .post(`http://localhost:8000/api/bookings/${bookingId}/refund`)
      .then(() => {
        alert("Refund berhasil!");
        loadHistory();
      })
      .catch((err) => alert(err.response?.data?.message || "Gagal refund"));
  };

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Riwayat Booking</h2>
      {bookings.length === 0 ? (
        <p>Belum ada booking.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li key={b.booking_id} className="border p-4 rounded">
              <p className="font-semibold">
                Booking #{b.booking_id} — {b.status}
              </p>
              <p>Total: Rp {Number(b.total_amount).toLocaleString()}</p>
              <ul className="text-sm text-gray-600">
                {b.booking_items?.map((item) => (
                  <li key={item.booking_item_id}>
                    Seat: {item.ticket.seat?.seat_code} —{" "}
                    {item.ticket.event.organizer}
                  </li>
                ))}
              </ul>
              <div className="mt-2 space-x-2">
                {b.status === "pending" && (
                  <button
                    onClick={() => handlePay(b.booking_id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Bayar
                  </button>
                )}
                {b.status === "paid" && (
                  <button
                    onClick={() => handleRefund(b.booking_id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Refund
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
