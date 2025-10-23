import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();

  // ambil query string dari URL
  const params = new URLSearchParams(search);
  const q = params.get("q");
  const min_price = params.get("min_price");
  const max_price = params.get("max_price");
  const start_date = params.get("start_date");
  const end_date = params.get("end_date");

  useEffect(() => {
    let url = "http://localhost:8000/api/events";

    if (q) {
      url = `http://localhost:8000/api/events/search?q=${encodeURIComponent(
        q
      )}`;
    } else if (min_price || max_price || start_date || end_date) {
      // kalau ada filter, pakai endpoint filter
      const query = new URLSearchParams({
        ...(min_price && { min_price }),
        ...(max_price && { max_price }),
        ...(start_date && { start_date }),
        ...(end_date && { end_date }),
      }).toString();

      url = `http://localhost:8000/api/events/filter?${query}`;
    }

    axios
      .get(url)
      .then((res) => {
        setEvents(res.data.data || res.data);
      })
      .catch((err) => console.error("Gagal ambil event:", err));
  }, [q, min_price, max_price, start_date, end_date]);

  // handler untuk submit filter
  const handleFilter = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = new URLSearchParams({
      ...(form.min_price.value && { min_price: form.min_price.value }),
      ...(form.max_price.value && { max_price: form.max_price.value }),
      ...(form.start_date.value && { start_date: form.start_date.value }),
      ...(form.end_date.value && { end_date: form.end_date.value }),
    }).toString();

    navigate(`/events?${query}`);
  };

  return (
    <div className="pt-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">
        {q ? `Hasil pencarian untuk "${q}"` : "Daftar Event"}
      </h2>

      {/* Filter Form */}
      <form
        onSubmit={handleFilter}
        className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <input
          type="number"
          name="min_price"
          placeholder="Min Price"
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          name="max_price"
          placeholder="Max Price"
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          name="start_date"
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          name="end_date"
          className="border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="col-span-2 md:col-span-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Terapkan Filter
        </button>
      </form>

      {events.length === 0 ? (
        <p className="text-gray-500">Belum ada event tersedia.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.event_id}
              className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg mb-2">{event.organizer}</h3>
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
    </div>
  );
};

export default EventList;
