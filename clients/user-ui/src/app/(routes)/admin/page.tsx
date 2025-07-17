"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { ADD_SURVEY_ACTIVITY } from "@/src/graphql/actions/add-surveyact.action";
import { ADD_SUBSURVEY_ACTIVITY } from "@/src/graphql/actions/add-subsurveyact.action";
import { GET_ALL_SURVEY_ACTIVITIES } from "@/src/graphql/actions/find-allsurveyact.action";
import styles from "@/src/utils/style";

type SurveyActivity = {
  id: string;
  name: string;
  slug: string;
};

function Admin() {
  const [formStateF1, setFormStateF1] = useState({
    name: "",
    slug: "",
  });

  const [formStateF2, setFormStateF2] = useState({
    name: "",
    slug: "",
    surveyActivityId: "",
  });

  const { data, loading, refetch } = useQuery(GET_ALL_SURVEY_ACTIVITIES);


  const [addSurveyActivity, { loading: loading1 }] =
    useMutation(ADD_SURVEY_ACTIVITY);
  const [addSubSurveyActivity, { loading: loading2 }] = useMutation(
    ADD_SUBSURVEY_ACTIVITY
  );

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
        !formStateF2.surveyActivityId
      ) {
        toast.error("Nama dan slug wajib diisi!");
        return;
      }
      const { data } = await addSubSurveyActivity({
        variables: {
          input: { ...formStateF2 },
        },
      });
      toast.success("Kegiatan Survey berhasil ditambahkan!");
      setFormStateF2({ name: "", slug: "", surveyActivityId: "" });
    } catch (err: any) {
      toast.error("Gagal menambah Kegiatan Survey.");
      console.error("❌ Error create:", err);
    }
  };

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
          <button
            disabled={loading2}
            type="submit"
            className={`${styles.button} my-2 text-white`}
          >
            {loading2 ? "Menyimpan..." : "Tambah"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
