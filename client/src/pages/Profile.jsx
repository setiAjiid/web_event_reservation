import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8000/api/customers/${user.user_id}`)
        .then((res) => {
          setCustomer(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err.response?.data || err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-start justify-center pt-24 px-6">
        <div className="max-w-xl w-full bg-slate-800/60 border border-slate-700 rounded-xl p-8 shadow-md backdrop-blur">
          <p className="text-center text-gray-200">
            Silakan login dulu untuk melihat profil.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-start justify-center pt-24 px-6">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-blue-400"></div>
          <p className="mt-3 text-sm text-slate-300">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 pt-24">
        <div className="max-w-xl w-full bg-slate-800/60 border border-slate-700 rounded-xl p-8 shadow-md backdrop-blur">
          <p className="text-center p-6 text-red-400">
            Gagal memuat data profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">Profil Saya</h2>
        </div>

        <div className="bg-black/80 border border-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* top area with avatar */}
          <div className="p-6 flex items-center gap-4 bg-black/90">
            <div className="h-20 w-20 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 14a4 4 0 10-8 0v2h8v-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <p className="text-lg font-semibold">
                {(customer.first_name || "").trim()}{" "}
                {(customer.last_name || "").trim()}
              </p>
              <p className="text-sm text-gray-400">{customer.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-1 sm:px-5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium">
                Edit
              </button>
            </div>
          </div>

          {/* body fields */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-black/60 border border-gray-800 rounded-lg p-4">
                  <p className="text-xs uppercase text-gray-400">NIK</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {customer.nik || "-"}
                  </p>
                </div>

                <div className="bg-black/60 border border-gray-800 rounded-lg p-4">
                  <p className="text-xs uppercase text-gray-400">Nama Depan</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {customer.first_name}
                  </p>
                </div>

                <div className="bg-black/60 border border-gray-800 rounded-lg p-4">
                  <p className="text-xs uppercase text-gray-400">
                    Tanggal Lahir
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {customer.birth_of_date
                      ? new Date(customer.birth_of_date).toLocaleDateString(
                          "id-ID"
                        )
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-black/60 border border-gray-800 rounded-lg p-4">
                  <p className="text-xs uppercase text-gray-400">Email</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {customer.email}
                  </p>
                </div>

                <div className="bg-black/60 border border-gray-800 rounded-lg p-4">
                  <p className="text-xs uppercase text-gray-400">
                    Nama Belakang
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {customer.last_name}
                  </p>
                </div>

                <div className="bg-black/60 border border-gray-800 rounded-lg p-4">
                  <p className="text-xs uppercase text-gray-400">
                    Nomor Telepon
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {customer.phone_number || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500 text-center">
              <p>
                Informasi di atas hanya dapat diubah melalui pengaturan akun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
