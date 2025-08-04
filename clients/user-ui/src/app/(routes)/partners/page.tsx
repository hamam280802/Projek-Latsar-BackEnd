"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_JOB_LETTER } from "@/src/graphql/actions/add-jobletter.action";
import { GET_ALL_JOB_LETTERS } from "@/src/graphql/actions/find-alljobletter.action";
import { UPDATE_JOB_LETTER_STATUS } from "@/src/graphql/actions/update-jobletterstatus.action";
import toast from "react-hot-toast";
import styles from "@/src/utils/style";
import { GET_ALL_USERS } from "@/src/graphql/actions/find-allusers.action";
import { GET_ALL_OF_SUB_SURVEY_ACTIVITIES } from "@/src/graphql/actions/find-realallsubsurvey.action";
import { set } from "mongoose";

function Partners() {
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

  type JobLetter = {
    id: string;
    userId: string;
    subSurveyActivityId: string;
    region: string;
    submitDate: string;
    jobLetterState: string;
    agreeState: string;
    approveDate: string;
    rejectNote: string;
  };

  type JobLetterWithUserNSubSurvey = JobLetter & {
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
    region: "",
    submitDate: new Date().toISOString(),
  });

  const [update, setUpdate] = useState({
    id: "",
    status: "Menunggu",
    rejectNote: "",
  });

  const [filter, setFilter] = useState({
    wilayah: "",
    survei: "",
    statusSuratTugas: "",
    statusPengajuan: "",
  });

  const [selectedJobLetter, setSelectedJobLetter] =
    useState<JobLetterWithUserNSubSurvey | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createJobLetter, { data, loading, error }] =
    useMutation(ADD_JOB_LETTER);

  const [
    updateJobLetterStatus,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_JOB_LETTER_STATUS);

  const {
    data: dataUser,
    loading: loadingUser,
    error: errorUser,
  } = useQuery(GET_ALL_USERS);
  const {
    data: dataSubSurvey,
    loading: loadingSubSurvey,
    error: errorSubSurvey,
  } = useQuery(GET_ALL_OF_SUB_SURVEY_ACTIVITIES);
  const {
    data: dataJobLetter,
    loading: loadingJobLetter,
    error: errorJobLetter,
  } = useQuery(GET_ALL_JOB_LETTERS);

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

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter({ ...filter, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !input.userId ||
        !input.subSurveyActivityId ||
        !input.region ||
        !input.submitDate
      ) {
        toast.error("Semua field wajib diisi!");
        return;
      }
      const { data } = await createJobLetter({ variables: { input } });
      toast.success("Surat Tugas berhasil ditambahkan!");
      setInput({
        userId: "",
        subSurveyActivityId: "",
        region: "",
        submitDate: "",
      });
    } catch (error: any) {
      toast.error("Gagal menambahkan Surat Tugas!");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!update.id || !update.status || !update.rejectNote) {
        toast.error("Semua field wajib diisi!");
        return;
      }
      await updateJobLetterStatus({ variables: { input: update } });
      toast.success("Surat Tugas berhasil diperbarui!");
      setUpdate({ id: "", status: "", rejectNote: "" });
    } catch (error) {
      toast.error("Gagal memperbarui Surat Tugas!");
      console.error(error);
    }
  };
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
          <tbody className="block max-h-96 overflow-y-auto w-full">
            {dataJobLetter?.getAllJobLetters?.filter((jobletter: JobLetterWithUserNSubSurvey) => {
              const matchesRegion = filter.wilayah === "" || jobletter.region === filter.wilayah;
              const matchesJenisSurvei = filter.survei === "" || jobletter?.subSurveyActivity?.name?.includes(filter.survei);
              const matchesStatus = filter.statusPengajuan === "" || jobletter.agreeState === filter.statusPengajuan;
              const matchesStatusPersetujuan = filter.statusSuratTugas === "" || jobletter.agreeState === filter.statusSuratTugas;
              return matchesRegion && matchesJenisSurvei && matchesStatus && matchesStatusPersetujuan;
            }).map((jobletter: JobLetterWithUserNSubSurvey) => (
              <tr
                key={jobletter.id}
                className="table w-full table-fixed bg-white border-"
              >
                <td className="px-6 py-3">{jobletter?.user?.name}</td>
                <td className="px-6 py-3">{jobletter?.region}</td>
                <td className="px-6 py-3">{jobletter?.subSurveyActivity?.name}</td>
                <td className="px-6 py-3">{jobletter.submitDate ? "Sudah Diserahkan Pada Tanggal " + jobletter.submitDate : "Belum Diserahkan"}</td>
                <td className="px-6 py-3">{jobletter?.agreeState}</td>
                <td className="px-6 py-3 flex justify-end">
                  <button onClick={() => {
                    setSelectedJobLetter(jobletter)
                    setIsModalOpen(true)
                  }} className="flex items-center px-2 bg-gray-900 rounded-md border-gray-900 border-2">
                    <p className="text-sm font-bold text-white">Detail</p>
                    <div className="pl-1 pb-1"></div>
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
      {/* Form Pengajuan Surat Tugas */}
      <div className="bg-orange-50 rounded-lg p-4 shadow-md">
        <h1 className="font-bold text-2xl mb-4">Form Pengajuan Surat Tugas</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <select
              id="userId"
              value={input.userId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Petugas --</option>
              {dataUser?.getUsers?.map((user: User) => (
                <option value={user.id} key={user.id}>
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
              <option value="">-- Pilih Jenis Survei --</option>
              {dataSubSurvey?.allSubSurveyActivities?.map(
                (survei: SubSurveyActivity) => (
                  <option value={survei.id} key={survei.id}>
                    {survei.name}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <select
              id="region"
              value={input.region}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Wilayah --</option>
              <option value="Muara Enim">Muara Enim</option>
              <option value="PALI">PALI</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`${styles.button} my-2 text-white`}
          >
            {loading ? "Mengirim..." : "Ajukan Surat Tugas"}
          </button>
        </form>
      </div>
      {/* Form Status Surat Tugas */}
      <div className="bg-orange-50 rounded-lg p-4 shadow-md">
        <h1 className="font-bold text-2xl mb-4">Form Status Surat Tugas</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <select
              id="id"
              value={update.id}
              onChange={handleChangeUpdate}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Surat Tugas --</option>
              {dataJobLetter?.getAllJobLetters?.map(
                (jobLetter: JobLetterWithUserNSubSurvey) => (
                  <option key={jobLetter.id} value={jobLetter.id}>
                    {jobLetter?.user?.name} -{" "}
                    {jobLetter?.subSurveyActivity?.name} - {jobLetter.region} -{" "}
                    {jobLetter.agreeState}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <select
              id="status"
              value={update.status}
              onChange={handleChangeUpdate}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Status --</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              id="rejectNote"
              placeholder="Catatan Persetujuan"
              value={update.rejectNote}
              onChange={handleChangeUpdate}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={loadingUpdate}
            className={`${styles.button} my-2 text-white`}
          >
            {loadingUpdate ? "Mengirim..." : "Update Status Surat Tugas"}
          </button>
        </form>
      </div>
      {isModalOpen && selectedJobLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg space-y-2">
            <h2 className="text-xl font-bold mb-4">Detail SPJ</h2>
            <p>
              <strong>Nama Petugas:</strong> {selectedJobLetter.user?.name || "-"}
            </p>
            <p>
              <strong>Jenis Survei:</strong>{" "}
              {selectedJobLetter.subSurveyActivity?.name || "-"}
            </p>
            <p>
              <strong>Submit State:</strong> {selectedJobLetter.agreeState}
            </p>
            <p>
              <strong>Submit Date:</strong> {selectedJobLetter.submitDate || "-"}
            </p>
            <p>
              <strong>Approve Date:</strong> {selectedJobLetter.approveDate || "-"}
            </p>
            <p>
              <strong>Catatan:</strong> {selectedJobLetter.rejectNote || "-"}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedJobLetter(null);
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

export default Partners;
