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
    approveDate: string;
    eviDocumentUrl: string;
    verifyNote: string;
  };

  type SPJWithUserNSubSurvey = SPJ & {
    user?: {
      id: string;
      name: string;
    };
    subSurveyActivity?: {
      id: string;
      name: string;
    };
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

  const [filter, setFilter] = useState({
    jenisSurvei: "",
    statusSuratTugas: "",
    statusPengajuan: "",
  });

  const [selectedSPJ, setSelectedSPJ] = useState<SPJWithUserNSubSurvey | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createSPJ, { loading, data, error }] = useMutation(ADD_SPJ);
  const [
    updateStatus,
    { loading: newloading, data: newData, error: newError },
  ] = useMutation(UPDATE_SPJ_STATUS);
  const { data: userData } = useQuery(GET_ALL_USERS);
  const { data: subSurveyData } = useQuery(GET_ALL_OF_SUB_SURVEY_ACTIVITIES);
  const { data: SPJData } = useQuery(GET_ALL_SPJ);

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

      await updateStatus({ variables: { input: update } });
      toast.success("SPJ berhasil diperbarui!");
    } catch (error) {
      toast.error("Gagal memperbarui SPJ!");
      console.error(error);
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
              onChange={(e) =>
                setFilter({ ...filter, jenisSurvei: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            ></select>
          </div>
          <div className="w-full">
            Status Surat Tugas
            <select
              id="statusSuratTugas"
              onChange={(e) =>
                setFilter({ ...filter, statusSuratTugas: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            ></select>
          </div>
          <div className="w-full">
            Status Pengajuan
            <select
              id="statusPengajuan"
              onChange={(e) =>
                setFilter({ ...filter, statusPengajuan: e.target.value })
              }
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
          <tbody className="block max-h-96 overflow-y-auto w-full">
            {SPJData?.getAllSPJ
              ?.filter((spj: SPJWithUserNSubSurvey) => {
                const matchesJenis =
                  filter.jenisSurvei === "" ||
                  spj.subSurveyActivity?.name?.includes(filter.jenisSurvei);
                const matchesPengajuan =
                  filter.statusPengajuan === "" ||
                  spj.submitState === filter.statusPengajuan;
                // StatusSuratTugas logic bisa disesuaikan kalau punya field-nya
                return matchesJenis && matchesPengajuan;
              })
              .map((spj: SPJWithUserNSubSurvey) => (
                <tr
                  key={spj.id}
                  className="table w-full table-fixed bg-white border-b"
                >
                  <td className="px-6 py-4">{spj?.user?.name || "-"}</td>
                  {/* Ganti sesuai field "wilayah" jika ada */}
                  <td className="px-6 py-4">
                    {spj?.subSurveyActivity?.name || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {spj?.submitDate
                      ? "Diserahkan Pada " + spj?.submitDate
                      : "Menunggu Pengajuan"}
                  </td>
                  <td className="px-6 py-4">{spj?.submitState}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedSPJ(spj);
                        setIsModalOpen(true);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
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
              {SPJData?.getAllSPJ?.map((spj: SPJWithUserNSubSurvey) => (
                <option key={spj.id} value={spj.id}>
                  {spj?.user?.name}-{spj?.subSurveyActivity?.name}-
                  {spj.submitState}
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
      {isModalOpen && selectedSPJ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg space-y-2">
            <h2 className="text-xl font-bold mb-4">Detail SPJ</h2>
            <p>
              <strong>Nama Petugas:</strong> {selectedSPJ.user?.name || "-"}
            </p>
            <p>
              <strong>Jenis Survei:</strong>{" "}
              {selectedSPJ.subSurveyActivity?.name || "-"}
            </p>
            <p>
              <strong>Mulai:</strong> {selectedSPJ.startDate}
            </p>
            <p>
              <strong>Selesai:</strong> {selectedSPJ.endDate}
            </p>
            <p>
              <strong>Submit State:</strong> {selectedSPJ.submitState}
            </p>
            <p>
              <strong>Submit Date:</strong> {selectedSPJ.submitDate || "-"}
            </p>
            <p>
              <strong>Approve Date:</strong> {selectedSPJ.approveDate || "-"}
            </p>
            <p>
              <strong>Catatan:</strong> {selectedSPJ.verifyNote || "-"}
            </p>
            <p>
              <a target="_blank" href={selectedSPJ.eviDocumentUrl} className="bg-blue-500 p-1 rounded-md">Lihat Bukti</a>
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedSPJ(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SPJ;
