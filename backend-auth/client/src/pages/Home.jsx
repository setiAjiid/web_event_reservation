import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/events/recommendations")
      .then((res) => {
        setRecommended(res.data.data || res.data);
      })
      .catch((err) => console.error("Gagal ambil rekomendasi:", err));
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Selamat Datang di Event Reservation
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Temukan konser, film, dan acara favoritmu. Pesan tiket dengan mudah
            dan cepat!
          </p>
          <Link to="/events">
            <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow hover:bg-gray-100 transition">
              Lihat Semua Event
            </button>
          </Link>
        </div>
      </section>

      {/* Rekomendasi Event */}
      <section className="py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Event Populer 🔥
        </h2>
        {recommended.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada rekomendasi event.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {recommended.map((event) => (
              <div
                key={event.event_id}
                className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {event.organizer}
                </h3>
                <p className="text-gray-600">{event.genre}</p>
                <p className="text-sm text-gray-500">
                  {new Date(event.date_time).toLocaleDateString()} @{" "}
                  {event.venue?.venue_name}
                </p>
                <p className="mt-2 font-bold text-blue-600">
                  Rp {event.price.toLocaleString()}
                </p>
                <Link to={`/event/${event.event_id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                    Lihat Detail
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
