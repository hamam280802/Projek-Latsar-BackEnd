import React from "react";

function Partners() {
  return (
    <div className="px-8 py-4 space-y-4 font-Poppins">
      <div className="bg-orange-50 rounded-lg p-2 font-bold text-xl flex justify-between shadow-md">
        Surat Tugas Petugas
      </div>
      <div className="bg-orange-50 rounded-lg p-2 font-bold text-xl shadow-md space-y-5">
        <div>Filter Petugas</div>
        <div className="flex justify-between space-x-14 text-sm">
          <div className="w-full">
            Wilayah
            <select
              id="wilayah"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            ></select>
          </div>
          <div className="w-full">
            Jenis Survei
            <select
              id="jenisSurvei"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            ></select>
          </div>
          <div className="w-full">
            Status Surat Tugas
            <select
              id="statusSuratTugas"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            ></select>
          </div>
          <div className="w-full">
            Status Persetujuan
            <select
              id="statusPersetujuan"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            ></select>
          </div>
        </div>
      </div>
      <div className="font-bold text-xl">Daftar Petugas</div>
      <div className="relative shadow-md">
        <table className="table-fixed w-full text-sm text-left text-gray-500">
          <thead className="text-gray-700 bg-orange-50 block w-full sm:rounded-t-lg">
            <tr className="table w-full table-fixed">
              <th scope="col" className="px-6 py-3 uppercase">
                <div className="flex items-center">Nama Petugas</div>
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                <div className="flex items-center">Wilayah</div>
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                <div className="flex items-center">Jenis Survei</div>
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                <div className="flex items-center">Surat Tugas</div>
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                <div className="flex items-center">Status Persetujuan</div>
              </th>
              <th scope="col" className="px-6 py-3 uppercase flex justify-end">
                <div className="flex items-center">Aksi</div>
              </th>
            </tr>
          </thead>
          <tbody className="block max-h-96 overflow-y-auto w-full"></tbody>
          <tfoot className="block w-full rounded-b-lg">
            <tr className="text-gray-700 bg-orange-50 table w-full table-fixed">
              <td colSpan={4} className="px-6 py-2">
                <div className="flex justify-end items-center">
                  <button
                      className="flex items-center px-2 bg-gray-900 rounded-md border-gray-900 border-2"
                    >
                      <p className="text-sm font-bold text-white">
                        Tutup Jadwal
                      </p>
                      <div className="pl-1 pb-1">
                      </div>
                    </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Partners;
