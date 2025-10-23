import { useEffect, useState } from "react";
import axios from "axios";

export default function Places() {
  const [venues, setVenues] = useState([]);
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/venues-with-events")
      .then((res) => setVenues(res.data.data || res.data))
      .catch((err) => console.error("Gagal ambil data venue:", err));
  }, []);

  return (
    <div className="pt-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Daftar Venue 📍</h2>
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Cari kota..."
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border px-4 py-2 rounded w-full max-w-sm"
        />
      </div>
      {venues.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada venue tersedia.</p>
      ) : (
        <ul className="space-y-4">
          {venues
            .filter((v) =>
              v.city.toLowerCase().includes(cityFilter.toLowerCase())
            )
            .map((v) => (
              <li
                key={v.venue_id}
                className="border p-4 rounded shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold">{v.venue_name}</h3>
                <p className="text-gray-600">Kota: {v.city}</p>
                <p className="text-gray-600">Jumlah Event: {v.events_count}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
