"use client";

import useUser from "@/src/hooks/useUser";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { UPDATE_PROFILE } from "@/src/graphql/actions/update-user.action";
import React from "react";

function Profile() {
  const { user } = useUser();
  const { data } = useSession();
  const [updateProfile] = useMutation(UPDATE_PROFILE);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const input = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone_number: formData.get("phone"),
      address: formData.get("address"),
      role: formData.get("role"),
      region: formData.get("region"),
    };

    try {
      await updateProfile({ variables: { input } });
      alert("Profil berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui profil.");
    }
  };

  return (
    <div className="px-8 py-4 space-y-4 font-Poppins">
      <div className="bg-orange-50 rounded-lg p-2 font-bold text-xl flex justify-between shadow-md">
        Profil Diri
      </div>
      <div className="bg-orange-50 rounded-lg p-4 shadow-md space-y-8">
        <div className="flex items-center gap-4">
          <img
            src={data?.user ? data.user.image : user?.image}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {data?.user ? data.user.name : user?.name}
            </h2>
            <p className="text-sm text-gray-600">
              {data?.user ? data.user.email : user?.email}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Nomor Telepon:</strong> {user?.phone_number}
          </p>
          <p>
            <strong>Alamat:</strong> {user?.address}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
          <p>
            <strong>Region:</strong> {user?.region}
          </p>
        </div>
      </div>
      <div className="bg-orange-50 rounded-lg p-2 shadow-md space-y-4">
        <div className="text-xl">
          <strong>Perbarui profil diri</strong>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Nama
              </label>
              <input
                type="text"
                id="name"
                defaultValue={user?.name}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user?.email}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="phone">
                Nomor Telepon
              </label>
              <input
                type="tel"
                id="phone"
                defaultValue={user?.phone_number}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="address">
                Alamat
              </label>
              <input
                type="text"
                id="address"
                defaultValue={user?.address}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <input
                type="text"
                id="role"
                defaultValue={user?.role}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="region">
                Region
              </label>
              <input
                type="text"
                id="region"
                defaultValue={user?.region}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Perbarui
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
