import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/events/${id}`)
      .then((res) => {
        setEvent(res.data.data || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal ambil detail event:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBook = (ticketId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .post("http://localhost:8000/api/bookings", {
        user_id: user.user_id, // ambil dari login
        ticket_ids: [ticketId], // array sesuai controller
        payment_method: "Cash", // bisa pilih dari UI
      })
      .then((res) => {
        alert("Tiket berhasil dipesan!");
        return axios.get(`http://localhost:8000/api/events/${id}`);
      })
      .then((res) => setEvent(res.data.data || res.data))
      .catch((err) => {
        console.error("Error detail:", err.response?.data || err);
        alert(err.response?.data?.message || "Pesan tiket gagal");
      });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!event)
    return <p className="text-center mt-10">Event tidak ditemukan.</p>;

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{event.organizer}</h2>
      <p className="text-gray-600 mb-2">Genre: {event.genre}</p>
      <p className="text-gray-600 mb-2">
        Tanggal: {new Date(event.date_time).toLocaleString()}
      </p>
      <p className="text-gray-600 mb-2">
        Lokasi: {event.venue?.venue_name}, {event.venue?.city}
      </p>
      <p className="text-lg font-semibold text-blue-600 mb-6">
        Harga: Rp {event.price.toLocaleString()}
      </p>

      <h3 className="text-xl font-bold mb-2">Pilih Kursi</h3>
      <ul className="mb-6">
        {event.tickets?.map((ticket) => (
          <li
            key={ticket.ticket_id}
            className="border-b py-2 flex justify-between items-center"
          >
            <span>
              Seat: {ticket.seat?.seat_code || ticket.seat_id} —{" "}
              <span
                className={
                  ticket.status === "available"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {ticket.status}
              </span>
            </span>
            {ticket.status === "available" && (
              <button
                onClick={() => handleBook(ticket.ticket_id)}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Pesan
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetail;
