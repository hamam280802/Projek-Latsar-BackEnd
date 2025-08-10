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
import useUser from "@/src/hooks/useUser";

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
    agreeState: string;
    approveDate: string;
    rejectNote: string;
    eviFieldUrl: string;
    eviSTUrl: string;
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

  const { user } = useUser();

  const [input, setInput] = useState({
    userId: "",
    subSurveyActivityId: "",
    region: "",
    submitDate: new Date().toISOString(),
    eviFieldUrl: "",
    eviSTUrl: "",
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
        !input.submitDate ||
        !input.eviFieldUrl ||
        !input.eviSTUrl
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
        eviFieldUrl: "",
        eviSTUrl: "",
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
      setIsModalOpen(false);
      toast.success("Surat Tugas berhasil diperbarui!");
      setUpdate({ id: "", status: "", rejectNote: "" });
    } catch (error) {
      toast.error("Gagal memperbarui Surat Tugas!");
      console.error(error);
    }
  };
  const getGoogleDriveFileId = (url: string | undefined) => {
    if (!url) return undefined;
    const match = url.match(/\/file\/d\/([^/]+)\//);
    return match ? match[1] : undefined;
  };
  const convertedEviFieldUrl = getGoogleDriveFileId(
    selectedJobLetter?.eviFieldUrl
  );
  const convertedEviSTUrl = getGoogleDriveFileId(selectedJobLetter?.eviSTUrl);
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
              onChange={handleFilter}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Wilayah --</option>
              <option value="Muara Enim">Muara Enim</option>
              <option value="PALI">PALI</option>
            </select>
          </div>
          <div className="w-full">
            Jenis Survei
            <select
              id="survei"
              onChange={handleFilter}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Jenis Survei --</option>
              {dataSubSurvey?.allSubSurveyActivities?.map(
                (survei: SubSurveyActivity) => (
                  <option value={survei.name} key={survei.id}>
                    {survei.name}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="w-full">
            Status Persetujuan
            <select
              id="statusPengajuan"
              onChange={handleFilter}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Status Persetujuan --</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
        </div>
      </div>
      <div className="font-bold text-xl">Daftar Petugas</div>
      <div className="relative shadow-md">
        <div className="overflow-x-auto">
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
              <th scope="col" className="px-6 py-3 uppercase text-center">
                <div className="flex items-center">Status Surat Tugas</div>
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
            {dataJobLetter?.getAllJobLetters
              ?.filter((jobletter: JobLetterWithUserNSubSurvey) => {
                if (user?.role !== "Admin" && jobletter.userId !== user?.id) {
                  return false;
                }
                const matchesRegion =
                  filter.wilayah === "" || jobletter.region === filter.wilayah;
                const matchesJenisSurvei =
                  filter.survei === "" ||
                  jobletter?.subSurveyActivity?.name?.includes(filter.survei);
                const matchesStatus =
                  filter.statusPengajuan === "" ||
                  jobletter.agreeState === filter.statusPengajuan;

                return matchesRegion && matchesJenisSurvei && matchesStatus;
              })
              .map((jobletter: JobLetterWithUserNSubSurvey) => (
                <tr
                  key={jobletter.id}
                  className="table w-full table-fixed bg-white text-black"
                >
                  <td className="px-6 py-3 font-semibold">
                    {jobletter?.user?.name}
                  </td>
                  <td className="px-6 py-3 font-semibold">
                    {jobletter?.region}
                  </td>
                  <td className="px-6 py-3 font-semibold">
                    {jobletter?.subSurveyActivity?.name}
                  </td>
                  <td className="px-6 py-3">
                    {jobletter?.submitDate ? (
                      <div>
                        <span className="inline-block px-2 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-xl">
                          Diserahkan
                        </span>
                        <br />
                        <span>{jobletter.submitDate.split("T")[0]}</span>
                      </div>
                    ) : (
                      <div>
                        <span className="inline-block px-2 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-xl">
                          Belum Diserahkan
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <div>
                      {jobletter?.agreeState === "Disetujui" ? (
                        <span className="inline-block px-2 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-xl">
                          {" "}
                          Disetujui
                        </span>
                      ) : jobletter?.agreeState === "Ditolak" ? (
                        <span className="inline-block px-2 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-xl">
                          Ditolak
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-xl">
                          Menunggu
                        </span>
                      )}
                      <br />
                      <span>{jobletter?.approveDate?.split("T")[0]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedJobLetter(jobletter);
                        setUpdate((prev) => ({ ...prev, id: jobletter.id }));
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
        </table>
        </div>
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
          <div>
            <input
              type="text"
              id="eviFieldUrl"
              value={input.eviFieldUrl}
              placeholder="Link Bukti Lapangan"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <input
              type="text"
              id="eviSTUrl"
              value={input.eviSTUrl}
              placeholder="Link Bukti ST"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
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
      {isModalOpen && selectedJobLetter && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 font-Poppins overflow-y-auto py-6">
          <div className="bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg max-h-[90vh] flex flex-col">
            {/* Header Modal */}
            <div className="flex justify-between items-center px-6 py-4 border-b shrink-0">
              <h2 className="text-xl font-bold text-gray-800">
                Detail Pengajuan Surat Tugas
              </h2>
            </div>

            {/* Body: ini yang di-scroll */}
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <p>
                  <strong>Nama Petugas:</strong>{" "}
                  {selectedJobLetter.user?.name || "-"}
                </p>
                <p>
                  <strong>Jenis Survei:</strong>{" "}
                  {selectedJobLetter.subSurveyActivity?.name || "-"}
                </p>
                <p>
                  <strong>Catatan:</strong>{" "}
                  {selectedJobLetter.rejectNote || "-"}
                </p>
              </div>

              {/* Gambar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {convertedEviFieldUrl && (
                  <iframe
                    src={`https://drive.google.com/file/d/${convertedEviFieldUrl}/preview`}
                    className="w-full h-72 rounded-md border"
                  />
                )}
                {convertedEviSTUrl && (
                  <iframe
                    src={`https://drive.google.com/file/d/${convertedEviSTUrl}/preview`}
                    className="w-full h-72 rounded-md border"
                  />
                )}
              </div>

              {/* Status Persetujuan */}
              <div className="pt-2">
                <p className="mb-1">
                  <strong>Status Persetujuan:</strong>
                </p>
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    selectedJobLetter.agreeState === "Disetujui"
                      ? "bg-green-100 text-green-700"
                      : selectedJobLetter.agreeState === "Ditolak"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {selectedJobLetter.agreeState}
                </span>
              </div>

              {/* Form Update Status */}
              {user?.role === "Admin" && (
                <form
                  onSubmit={handleUpdate}
                  className="space-y-3 pt-4 border-t mt-4"
                >
                  <input
                    type="hidden"
                    id="id"
                    onChange={handleChangeUpdate}
                    value={update.id}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ubah Status Persetujuan
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catatan
                    </label>
                    <input
                      type="text"
                      id="rejectNote"
                      value={update.rejectNote}
                      onChange={handleChangeUpdate}
                      placeholder="Catatan jika ditolak atau alasan lainnya"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loadingUpdate}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      {loadingUpdate ? "Menyimpan..." : "Update Status"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end px-6 py-4 border-t shrink-0">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedJobLetter(null);
                  setUpdate({ id: "", status: "Disetujui", rejectNote: "" });
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
