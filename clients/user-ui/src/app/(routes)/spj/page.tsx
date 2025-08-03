"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SPJ } from "@/src/graphql/actions/add-spj.action";
import { GET_ALL_SPJ } from "@/src/graphql/actions/find-allspj.action";
import { UPDATE_SPJ_STATUS } from "@/src/graphql/actions/update-spjstatus.action";
import styles from "@/src/utils/style";
import { GET_ALL_USERS } from "@/src/graphql/actions/find-allusers.action";
import { GET_ALL_OF_SUB_SURVEY_ACTIVITIES } from "@/src/graphql/actions/find-realallsubsurvey.action";
import toast from "react-hot-toast";

function SPJ() {
  type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    address: string;
    phone_number: string;
    updatedAt: string;
  };

  type SubSurveyActivity = {
    id: string;
    name: string;
    slug: string;
    surveyActivityId: string;
    startDate: string;
    endDate: string;
    targetSample: number;
  };

  type SPJ = {
    id: string;
    userId: string;
    subSurveyActivityId: string;
    startDate: string;
    endDate: string;
    submitState: string;
    submitDate: string;
    eviDocumentUrl: string;
    verifyNote: string;
    user: User;
    subSurveyActivity: SubSurveyActivity;
  };

  const [input, setInput] = useState({
    userId: "",
    subSurveyActivityId: "",
    startDate: "",
    endDate: "",
    eviDocumentUrl: "",
  });

  const [update, setUpdate] = useState({
    id: "",
    status: "Disetujui",
    verifyNote: "",
  });

  const [createSPJ, { loading, data, error }] = useMutation(ADD_SPJ);
  const [
    updateStatus,
    { loading: newloading, data: newData, error: newError },
  ] = useMutation(UPDATE_SPJ_STATUS);
  const { data: userData } = useQuery(GET_ALL_USERS);
  const { data: subSurveyData } = useQuery(GET_ALL_OF_SUB_SURVEY_ACTIVITIES);
  const { data: SPJData, loading: SPJLoading, error: SPJError } = useQuery(GET_ALL_SPJ);
  
console.log("SPJData:", SPJData);
console.log("SPJ loading:", SPJLoading);
console.log("SPJ error:", SPJError);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleChangeUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdate({ ...update, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !input.userId ||
        !input.subSurveyActivityId ||
        !input.startDate ||
        !input.endDate
      ) {
        toast.error("Semua field wajib diisi!");
        return;
      }
      const { data } = await createSPJ({ variables: { input } });
      toast.success("SPJ berhasil ditambahkan!");
      setInput({
        userId: "",
        subSurveyActivityId: "",
        startDate: "",
        endDate: "",
        eviDocumentUrl: "",
      });
    } catch (error) {
      toast.error("Gagal menambahkan SPJ!");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!update.id || !update.status || !update.verifyNote) {
        toast.error("Semua field wajib diisi!");
        return;
      }

      await updateStatus({ variables: { input } });
      toast.success("SPJ berhasil diperbarui!");
    } catch (error) {
      toast.error("Gagal memperbarui SPJ!");
    }
  };

  return (
    <div className="px-8 py-4 space-y-4 font-Poppins">
      <div className="bg-orange-50 rounded-lg p-2 font-bold text-xl flex justify-between shadow-md">
        Pengajuan Surat Perintah Jalan (SPJ)
      </div>
      <div className="bg-orange-50 rounded-lg p-2 font-bold text-xl shadow-md space-y-5">
        <div>Filter SPJ</div>
        <div className="flex justify-between space-x-14 text-sm">
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
            Status Pengajuan
            <select
              id="statusPengajuan"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            ></select>
          </div>
        </div>
      </div>
      <div className="font-bold text-xl">Monitoring Pengajuan SPJ</div>
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
                <div className="flex items-center">Status Pengajuan</div>
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
                  <button className="flex items-center px-2 bg-gray-900 rounded-md border-gray-900 border-2">
                    <p className="text-sm font-bold text-white">Tutup Jadwal</p>
                    <div className="pl-1 pb-1"></div>
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Form Pengajuan SPJ */}
      <div className="bg-orange-50 rounded-lg p-4 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Form Pengajuan SPJ</h1>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <select
              id="userId"
              value={input.userId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Pengguna --</option>
              {userData?.getUsers?.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              id="subSurveyActivityId"
              value={input.subSurveyActivityId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Kegiatan --</option>
              {subSurveyData?.allSubSurveyActivities?.map(
                (sub: SubSurveyActivity) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <input
              type="date"
              id="startDate"
              value={input.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <input
              type="date"
              id="endDate"
              value={input.endDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <input
              type="text"
              id="eviDocumentUrl"
              placeholder="Link Bukti Pengeluaran"
              value={input.eviDocumentUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`${styles.button} my-2 text-white`}
          >
            {loading ? "Mengirim..." : "Ajukan SPJ"}
          </button>
        </form>
      </div>
      {/* Form Status SPJ */}
      <div className="bg-orange-50 rounded-lg p-4 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Form Status SPJ</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <select
              id="id"
              value={update.id}
              onChange={handleChangeUpdate}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih SPJ --</option>
              {SPJData?.getAllSPJ?.map((spj: SPJ) => (
                <option key={spj.id} value={spj.id}>
                  {spj?.user?.name}-{spj?.subSurveyActivity?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              id="status"
              value={update.status}
              onChange={(e) => setUpdate({ ...update, status: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="Menunggu">Menunggu</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              id="verifyNote"
              placeholder="Catatan"
              value={update.verifyNote}
              onChange={(e) =>
                setUpdate({ ...update, verifyNote: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={newloading}
            className={`${styles.button} my-2 text-white`}
          >
            {newloading ? "Mengirim..." : "Ubah Status SPJ"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SPJ;
