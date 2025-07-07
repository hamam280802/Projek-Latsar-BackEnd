"use client";

import useUser from "@/src/hooks/useUser";
import { useSession } from "next-auth/react";
import React from "react";

function Profile() {
  const { user } = useUser();
  const { data } = useSession();

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
          <p><strong>Nomor Telepon:</strong> {user?.phone_number}</p>
          <p><strong>Alamat:</strong> {user?.address}</p>
        </div>
      </div>
    </div>
);
}

export default Profile;
