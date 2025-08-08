"use client";

import useUser from "@/src/hooks/useUser";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { UPDATE_PROFILE } from "@/src/graphql/actions/update-user.action";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "@/src/utils/style";
import { UPDATE_USER_PROGRESS } from "@/src/graphql/actions/update-userprogress.action";
import { GET_USER_PROGRESS_BY_USER_ID } from "@/src/graphql/actions/find-usersurveyprogressbyuser.action";

function Profile() {
  const { user } = useUser();
  const { data } = useSession();
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE);
  const [formState, setFormState] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    address: user?.address || "",
    role: user?.role || "",
  });

  useEffect(() => {
    if (user) {
      setFormState({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const input = {
        ...formState,
        role: formState.role,
      };

      const { data } = await updateProfile({ variables: { input } });
      console.log("✅ Profil diperbarui:", data);
      toast.success("Profil berhasil diperbarui!");
    } catch (err) {
      console.error("❌ Gagal update:", err);
      toast.error("Gagal memperbarui profil.");
    }
  };

  // State untuk update user progress
  const [updateUserProgressForm, setUpdateUserProgressForm] = useState({
    userProgressId: "",
    subSurveyActivityId: "",
    totalAssigned: 0,
    submitCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    lastUpdated: "",
  });

  const [fetchUserProgress, { data: userProgressData, loading: upLoading }] =
    useLazyQuery(GET_USER_PROGRESS_BY_USER_ID, {
      fetchPolicy: "network-only",
    });
  const [updateUserSurveyProgress] = useMutation(UPDATE_USER_PROGRESS);

  // Fetch user progress ketika pilih kegiatan survei
  useEffect(() => {
    if (user?.id) {
      fetchUserProgress({ variables: { userId: user.id } });
    }
  }, [user?.id, fetchUserProgress]);

  const subSurveyOptions = React.useMemo(() => {
    const rows = userProgressData?.userProgressSurveyByUserId ?? [];
    // ambil yang punya subSurveyActivity
    const pairs = rows
      .filter((up: any) => up?.subSurveyActivity?.id)
      .map(
        (up: any) => [up.subSurveyActivity.id, up.subSurveyActivity] as const
      );

    // dedup by id
    return Array.from(new Map(pairs).values());
  }, [userProgressData]);

  const handleChangeUpdateUserProgress = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdateUserProgressForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleUpdateUserProgress = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await updateUserSurveyProgress({
        variables: {
          userProgressId: userProgressData?.userProgressSurveyByUserId[0].id,
          input: {
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
      setUpdateUserProgressForm({
        userProgressId: "",
        subSurveyActivityId: "",
        totalAssigned: 0,
        submitCount: 0,
        approvedCount: 0,
        rejectedCount: 0,
        lastUpdated: "",
      })
      toast.success("UserProgress berhasil diupdate!");
    } catch (err) {
      toast.error("Gagal update user progress");
      console.error(err);
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
                value={formState.name}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, name: e.target.value }))
                }
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
                value={formState.email}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, email: e.target.value }))
                }
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
                value={formState.phone_number}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    phone_number: e.target.value,
                  }))
                }
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
                value={formState.address}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, address: e.target.value }))
                }
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
                value={formState.role}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, role: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className={`${styles.button} my-2 text-white`}
            >
              {loading ? "Menyimpan..." : "Perbarui"}
            </button>
            {loading && (
              <p className="text-sm text-gray-500 italic">
                Menyimpan perubahan...
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="bg-blue-100 rounded-lg p-4 shadow-md">
        <form onSubmit={handleUpdateUserProgress} className="space-y-3">
          <h3 className="text-lg font-bold">Update UserProgress</h3>

          <div>
            <label
              htmlFor="subSurveyActivityId"
              className="block text-sm font-bold mb-2"
            >
              Kegiatan Survei
            </label>
            <select
              id="subSurveyActivityId" // <- PENTING: id harus 'subSurveyActivityId'
              value={updateUserProgressForm.subSurveyActivityId}
              onChange={handleChangeUpdateUserProgress}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">
                {upLoading ? "Memuat..." : "-- Pilih Kegiatan --"}
              </option>
              {subSurveyOptions.map((sa: any) => (
                <option key={sa.id} value={sa.id}>
                  {sa.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="totalAssigned"
              className="block text-sm font-bold mb-2"
            >
              Total Assigned
            </label>
            <input
              type="number"
              id="totalAssigned"
              value={updateUserProgressForm.totalAssigned}
              onChange={handleChangeUpdateUserProgress}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="submitCount"
              className="block text-sm font-bold mb-2"
            >
              Submit Count
            </label>
            <input
              type="number"
              id="submitCount"
              value={updateUserProgressForm.submitCount}
              onChange={handleChangeUpdateUserProgress}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="approvedCount"
              className="block text-sm font-bold mb-2"
            >
              Approved Count
            </label>
            <input
              type="number"
              id="approvedCount"
              value={updateUserProgressForm.approvedCount}
              onChange={handleChangeUpdateUserProgress}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="rejectedCount"
              className="block text-sm font-bold mb-2"
            >
              Rejected Count
            </label>
            <input
              type="number"
              id="rejectedCount"
              value={updateUserProgressForm.rejectedCount}
              onChange={handleChangeUpdateUserProgress}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="lastUpdated"
              className="block text-sm font-bold mb-2"
            >
              Last Updated
            </label>
            <input
              type="date"
              id="lastUpdated"
              value={updateUserProgressForm.lastUpdated}
              onChange={handleChangeUpdateUserProgress}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <button type="submit" className={`${styles.button} my-2 text-white`}>
            Update Progress
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
