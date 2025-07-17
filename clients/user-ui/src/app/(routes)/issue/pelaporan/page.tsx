"use client";
import React, { useState } from "react";
import {Funnel} from "lucide-react";

const Issue = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="px-8 py-4 space-y-4 font-Poppins">
      <div className="bg-orange-50 rounded-lg p-2 font-bold text-xl flex justify-between shadow-md">
        Pelaporan
      </div>
      <div className="bg-orange-50 rounded-lg p-4 shadow-md space-y-8">
        <h2 className="font-bold text-xl">Filter Petugas</h2>
        <div className="flex justify-between space-x-4">
          <div className="space-y-2 w-[20%] font-semibold text-sm">
            <label htmlFor="wilayah">Wilayah</label>
            <br />
            <select
              name="wilayah"
              id="wilayah"
              className="w-full border focus:border-1 p-2 rounded-md bg-white shadow-md"
            ></select>
          </div>
          <div className="space-y-2 w-[20%] font-semibold text-sm">
            <label htmlFor="survei">Jenis Survei</label>
            <br />
            <select
              name="survei"
              id="survei"
              className="w-full border focus:border-1 p-2 rounded-md bg-white shadow-md"
            ></select>
          </div>
          <div className="space-y-2 w-[20%] font-semibold text-sm">
            <label htmlFor="status">Status Kendala</label>
            <br />
            <select
              name="status"
              id="status"
              className="w-full border focus:border-1 p-2 rounded-md bg-white shadow-md"
            ></select>
          </div>
          <div className="space-y-2 w-[20%] font-semibold text-sm">
            <label htmlFor="jenis">Jenis Kendala</label>
            <br />
            <select
              name="jenis"
              id="jenis"
              className="w-full border focus:border-1 p-2 rounded-md bg-white shadow-md"
            ></select>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-orange-700 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition">
            <Funnel className="inline mr-2" size={16} />
            Terapkan Filter
          </button>
        </div>
      </div>
      <div className="py-10 space-y-2">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Daftar Petugas</h1>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-orange-50 hover:bg-orange-100 focus:ring-4 focus:ring-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center shadow-md"
            >
              Ekspor
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-28">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      CSV
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Excel
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      JSON
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-md text-center text-gray-500">
            <thead className="rounded-lg bg-orange-50 text-gray-700 uppercase">
              <tr>
                <th scope="col" className="py-3 px-6">
                  NAMA PETUGAS
                </th>
                <th scope="col" className="py-3 px-6">
                  WILAYAH
                </th>
                <th scope="col" className="py-3 px-6">
                  JENIS SURVEI
                </th>
                <th scope="col" className="py-3 px-6">
                  STATUS
                </th>
                <th scope="col" className="py-3 px-6">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Issue;
