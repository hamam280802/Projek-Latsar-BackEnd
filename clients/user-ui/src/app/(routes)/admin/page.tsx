"use client";

import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import styles from "@/src/utils/style";
import { ADD_SURVEY_ACTIVITY } from "@/src/graphql/actions/add-surveyact.action";
import { ADD_SUBSURVEY_ACTIVITY } from "@/src/graphql/actions/add-subsurveyact.action";
import { GET_ALL_SURVEY_ACTIVITIES } from "@/src/graphql/actions/find-allsurveyact.action";
import { UPDATE_SURVEY_ACTIVITY } from "@/src/graphql/actions/update-survey.action";
import { UPDATE_SUB_SURVEY_ACTIVITY } from "@/src/graphql/actions/update-subsurvey.action";
import { GET_ALL_SUB_SURVEY_ACTIVITIES } from "@/src/graphql/actions/find-allsubsurveyact.action";
import { CREATE_USER_PROGRESS } from "@/src/graphql/actions/create-userprogress.action";
import { UPDATE_USER_PROGRESS } from "@/src/graphql/actions/update-userprogress.action";
import { GET_ALL_USERS } from "@/src/graphql/actions/find-allusers.action";

type SurveyActivity = {
  id: string;
  name: string;
  slug: string;
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

type UserProgress = {
  id: string;
  userId: string;
  subSurveyActivityId: string;
  totalAssigned: number;
  submitCount: number;
  approvedCount: number;
  rejectedCount: number;
};

function Admin() {
  const [formStateF1, setFormStateF1] = useState({
    name: "",
    slug: "",
  });

  const [updateStateF1, setUpdateStateF1] = useState({
    surveyActivityId: "",
    name: "",
    slug: "",
  });

  const [updateStateF2, setUpdateStateF2] = useState({
    subSurveyActivityId: "",
    name: "",
    slug: "",
    surveyActivityId: "",
    startDate: "",
    endDate: "",
    targetSample: 0,
  });

  const [formStateF2, setFormStateF2] = useState({
    name: "",
    slug: "",
    surveyActivityId: "",
    startDate: "",
    endDate: "",
    targetSample: 0,
  });

  const [userProgressForm, setUserProgressForm] = useState({
    userId: "",
    subSurveyActivityId: "",
    totalAssigned: 0,
    submitCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    lastUpdated: "",
  });

  const [updateUserProgressForm, setUpdateUserProgressForm] = useState({
    surveyProgressId: "",
    subSurveyActivityId: "",
    userId: "",
    totalAssigned: 0,
    submitCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    lastUpdated: "",
  });

  const { data, loading, refetch } = useQuery(GET_ALL_SURVEY_ACTIVITIES);
  const [fetchSubSurveys, { data: subdata }] = useLazyQuery(
    GET_ALL_SUB_SURVEY_ACTIVITIES
  );
  const { data: userData } = useQuery(GET_ALL_USERS);

  const [addSurveyActivity, { loading: loading1 }] =
    useMutation(ADD_SURVEY_ACTIVITY);
  const [addSubSurveyActivity, { loading: loading2 }] = useMutation(
    ADD_SUBSURVEY_ACTIVITY
  );
  const [updateSurveyActivity] = useMutation(UPDATE_SURVEY_ACTIVITY);
  const [updateSubSurveyActivity] = useMutation(UPDATE_SUB_SURVEY_ACTIVITY);
  const [createUserProgress] = useMutation(CREATE_USER_PROGRESS);
  const [updateUserProgress] = useMutation(UPDATE_USER_PROGRESS);

  const handleChangeF1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormStateF1((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeF2 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormStateF2((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeUpdateF1 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdateStateF1((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeUpdateF2 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdateStateF2((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmitSurveyAct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formStateF1.name || !formStateF1.slug) {
        toast.error("Nama dan slug wajib diisi!");
        return;
      }
      const { data } = await addSurveyActivity({
        variables: {
          input: { ...formStateF1 },
        },
      });
      toast.success("Data Tim berhasil ditambahkan!");
      setFormStateF1({ name: "", slug: "" });
    } catch (err: any) {
      toast.error("Gagal menambah Data Tim.");
      console.error("❌ Error create:", err);
    }
  };

  const handleSubmitSubSurveyAct = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      if (
        !formStateF2.name ||
        !formStateF2.slug ||
        !formStateF2.surveyActivityId ||
        !formStateF2.startDate ||
        !formStateF2.endDate ||
        !formStateF2.targetSample
      ) {
        toast.error("Semua field wajib diisi!");
        return;
      }
      const { data } = await addSubSurveyActivity({
        variables: {
          input: {
            ...formStateF2,
            startDate: new Date(formStateF2.startDate),
            endDate: new Date(formStateF2.endDate),
            targetSample: parseInt(formStateF2.targetSample.toString(), 10),
          },
        },
      });
      toast.success("Kegiatan Survey berhasil ditambahkan!");
      setFormStateF2({
        name: "",
        slug: "",
        surveyActivityId: "",
        startDate: "",
        endDate: "",
        targetSample: 0,
      });
    } catch (err: any) {
      toast.error("Gagal menambah Kegiatan Survey.");
      console.error("❌ Error create:", err);
    }
  };

  const handleUpdateSurveyAct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { surveyActivityId, name, slug } = updateStateF1;
      if (!surveyActivityId || !name || !slug) {
        toast.error("Semua field wajib diisi!");
        return;
      }

      await updateSurveyActivity({
        variables: {
          surveyActivityId,
          input: { name, slug },
        },
      });
      toast.success("Tim berhasil diupdate!");
    } catch (err) {
      toast.error("Gagal update Tim.");
      console.error(err);
    }
  };

  const handleUpdateSubSurveyAct = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const {
        subSurveyActivityId,
        name,
        slug,
        surveyActivityId,
        startDate,
        endDate,
        targetSample,
      } = updateStateF2;
      if (
        !subSurveyActivityId ||
        !name ||
        !slug ||
        !surveyActivityId ||
        !startDate ||
        !endDate ||
        !targetSample
      ) {
        toast.error("Semua field wajib diisi!");
        return;
      }

      await updateSubSurveyActivity({
        variables: {
          subSurveyActivityId,
          input: {
            name,
            slug,
            surveyActivityId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            targetSample: parseInt(targetSample.toString(), 10),
          },
        },
      });
      toast.success("Kegiatan berhasil diupdate!");
    } catch (err) {
      toast.error("Gagal update kegiatan.");
      console.error(err);
    }
  };

  const handleChangeUserProgress = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserProgressForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeUpdateUserProgress = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdateUserProgressForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmitUserProgress = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await createUserProgress({
        variables: {
          input: {
            ...userProgressForm,
            totalAssigned: Number(userProgressForm.totalAssigned),
            submitCount: Number(userProgressForm.submitCount),
            approvedCount: Number(userProgressForm.approvedCount),
            rejectedCount: Number(userProgressForm.rejectedCount),
            lastUpdated: new Date(userProgressForm.lastUpdated).toISOString(),
          },
        },
      });
      toast.success("UserProgress berhasil ditambahkan!");
      setUserProgressForm({
        userId: "",
        subSurveyActivityId: "",
        totalAssigned: 0,
        submitCount: 0,
        approvedCount: 0,
        rejectedCount: 0,
        lastUpdated: "",
      });
    } catch (err) {
      toast.error("Gagal tambah user progress");
      console.error(err);
    }
  };

  const handleUpdateUserProgress = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await updateUserProgress({
        variables: {
          surveyProgressId: updateUserProgressForm.surveyProgressId,
          input: {
            ...updateUserProgressForm,
            totalAssigned: Number(updateUserProgressForm.totalAssigned),
            submitCount: Number(updateUserProgressForm.submitCount),
            approvedCount: Number(updateUserProgressForm.approvedCount),
            rejectedCount: Number(updateUserProgressForm.rejectedCount),
            lastUpdated: new Date(
              updateUserProgressForm.lastUpdated
            ).toISOString(),
          },
        },
      });
      toast.success("UserProgress berhasil diupdate!");
    } catch (err) {
      toast.error("Gagal update user progress");
      console.error(err);
    }
  };

  useEffect(() => {
    if (updateStateF2.surveyActivityId) {
      fetchSubSurveys({
        variables: {
          surveyActivityId: updateStateF2.surveyActivityId,
        },
      });
    }
  }, [updateStateF2.surveyActivityId, fetchSubSurveys]);

  useEffect(() => {
    setUpdateStateF2((prev) => ({
      ...prev,
      subSurveyActivityId: "", // reset sub survey saat tim berganti
    }));
  }, [updateStateF2.surveyActivityId]);

  return (
    <div className="px-8 py-4 space-y-4 font-Poppins">
      <div className="bg-orange-50 rounded-lg p-4 shadow-md">
        <form onSubmit={handleSubmitSurveyAct} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Nama Tim
            </label>
            <input
              type="text"
              id="name"
              value={formStateF1.name}
              onChange={handleChangeF1}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-bold mb-2">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              value={formStateF1.slug}
              onChange={handleChangeF1}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <button
            disabled={loading1}
            type="submit"
            className={`${styles.button} my-2 text-white`}
          >
            {loading1 ? "Menyimpan..." : "Tambah"}
          </button>
        </form>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 shadow-md">
        <form onSubmit={handleUpdateSurveyAct} className="space-y-4">
          <h3 className="text-lg font-bold">Update Tim</h3>
          <select
            id="surveyActivityId"
            value={updateStateF1.surveyActivityId}
            onChange={handleChangeUpdateF1}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">-- Pilih Tim --</option>
            {data?.allSurveyActivities.map((s: SurveyActivity) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            id="name"
            placeholder="Nama baru"
            value={updateStateF1.name}
            onChange={handleChangeUpdateF1}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input
            type="text"
            id="slug"
            placeholder="Slug baru"
            value={updateStateF1.slug}
            onChange={handleChangeUpdateF1}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button type="submit" className={`${styles.button} my-2 text-white`}>
            Update Tim
          </button>
        </form>
      </div>
      <div className="bg-orange-50 rounded-lg p-4 shadow-md">
        <form onSubmit={handleSubmitSubSurveyAct} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Nama Kegiatan
            </label>
            <input
              type="text"
              id="name"
              value={formStateF2.name}
              onChange={handleChangeF2}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-bold mb-2">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              value={formStateF2.slug}
              onChange={handleChangeF2}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <label
              htmlFor="surveyActivityId"
              className="block text-sm font-bold mb-2"
            >
              Tim
            </label>
            <select
              name="surveyActivityId"
              id="surveyActivityId"
              value={formStateF2.surveyActivityId}
              onChange={handleChangeF2}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Pilih Tim --</option>
              {data?.allSurveyActivities.map(
                (surveyActivity: SurveyActivity) => (
                  <option key={surveyActivity.id} value={surveyActivity.id}>
                    {surveyActivity.name}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-bold mb-2">
              Tanggal Mulai
            </label>
            <input
              type="date"
              id="startDate"
              value={formStateF2.startDate}
              onChange={handleChangeF2}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-bold mb-2">
              Tanggal Selesai
            </label>
            <input
              type="date"
              id="endDate"
              value={formStateF2.endDate}
              onChange={handleChangeF2}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div>
            <label
              htmlFor="targetSample"
              className="block text-sm font-bold mb-2"
            >
              Target Sampel
            </label>
            <input
              type="number"
              id="targetSample"
              value={formStateF2.targetSample}
              onChange={handleChangeF2}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <button
            disabled={loading2}
            type="submit"
            className={`${styles.button} my-2 text-white`}
          >
            {loading2 ? "Menyimpan..." : "Tambah"}
          </button>
        </form>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 shadow-md">
        <form onSubmit={handleUpdateSubSurveyAct} className="space-y-4">
          <h3 className="text-lg font-bold">Update Kegiatan</h3>
          <select
            id="surveyActivityId"
            value={updateStateF2.surveyActivityId}
            onChange={handleChangeUpdateF2}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">-- Pilih Tim --</option>
            {data?.allSurveyActivities.map((s: SurveyActivity) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            id="subSurveyActivityId"
            value={updateStateF2.subSurveyActivityId}
            onChange={handleChangeUpdateF2}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">-- Pilih Kegiatan --</option>
            {subdata?.subSurveyActivityById?.map((sub: SubSurveyActivity) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            id="name"
            placeholder="Nama baru"
            value={updateStateF2.name}
            onChange={handleChangeUpdateF2}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input
            type="text"
            id="slug"
            placeholder="Slug baru"
            value={updateStateF2.slug}
            onChange={handleChangeUpdateF2}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input
            type="date"
            id="startDate"
            value={updateStateF2.startDate}
            onChange={handleChangeUpdateF2}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input
            type="date"
            id="endDate"
            value={updateStateF2.endDate}
            onChange={handleChangeUpdateF2}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input
            type="number"
            id="targetSample"
            value={updateStateF2.targetSample}
            onChange={handleChangeUpdateF2}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button type="submit" className={`${styles.button} my-2 text-white`}>
            Update Kegiatan
          </button>
        </form>
      </div>
      <div className="bg-green-50 rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-bold">Tambah UserProgress</h3>
        <form onSubmit={handleSubmitUserProgress} className="space-y-3">
          <input
            type="text"
            id="userId"
            placeholder="User ID"
            value={userProgressForm.userId}
            onChange={handleChangeUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            id="subSurveyActivityId"
            placeholder="SubSurveyActivity ID"
            value={userProgressForm.subSurveyActivityId}
            onChange={handleChangeUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            id="totalAssigned"
            placeholder="Total Assigned"
            value={userProgressForm.totalAssigned}
            onChange={handleChangeUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            id="submitCount"
            placeholder="Submit Count"
            value={userProgressForm.submitCount}
            onChange={handleChangeUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            id="approvedCount"
            placeholder="Approved Count"
            value={userProgressForm.approvedCount}
            onChange={handleChangeUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            id="rejectedCount"
            placeholder="Rejected Count"
            value={userProgressForm.rejectedCount}
            onChange={handleChangeUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="date"
            id="lastUpdated"
            value={userProgressForm.lastUpdated}
            onChange={handleChangeUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button type="submit" className={`${styles.button} my-2 text-white`}>
            Tambah
          </button>
        </form>
      </div>
      <div className="bg-blue-100 rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-bold">Update UserProgress</h3>
        <form onSubmit={handleUpdateUserProgress} className="space-y-3">
          <input
            type="text"
            id="surveyProgressId"
            placeholder="ID UserProgress"
            value={updateUserProgressForm.surveyProgressId}
            onChange={handleChangeUpdateUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            id="userId"
            placeholder="User ID"
            value={updateUserProgressForm.userId}
            onChange={handleChangeUpdateUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <select
            id="subSurveyActivityId"
            value={updateUserProgressForm.subSurveyActivityId}
            onChange={handleChangeUpdateUserProgress}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">-- Pilih Kegiatan --</option>
            {subdata?.subSurveyActivityById?.map((sub: SubSurveyActivity) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="totalAssigned"
            placeholder="Total Assigned"
            value={updateUserProgressForm.totalAssigned}
            onChange={handleChangeUpdateUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            id="submitCount"
            placeholder="Submit Count"
            value={updateUserProgressForm.submitCount}
            onChange={handleChangeUpdateUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            id="approvedCount"
            placeholder="Approved Count"
            value={updateUserProgressForm.approvedCount}
            onChange={handleChangeUpdateUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            id="rejectedCount"
            placeholder="Rejected Count"
            value={updateUserProgressForm.rejectedCount}
            onChange={handleChangeUpdateUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="date"
            id="lastUpdated"
            value={updateUserProgressForm.lastUpdated}
            onChange={handleChangeUpdateUserProgress}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button type="submit" className={`${styles.button} my-2 text-white`}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
