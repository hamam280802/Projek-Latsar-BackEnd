"use client";

import React, { useState } from "react";
import { useMutation, useQuery, ApolloError } from "@apollo/client";
import {
  CREATE_CONTENT_ISSUE,
  UPDATE_CONTENT_ISSUE,
  ADD_ISSUE_COMMENT,
  CONTENT_ISSUES,
} from "@/src/graphql/actions/issue.action";
import { GET_ALL_OF_SUB_SURVEY_ACTIVITIES } from "@/src/graphql/actions/find-realallsubsurvey.action";
import useUser from "@/src/hooks/useUser";
import toast from "react-hot-toast";

export default function ContentIssueForm() {
  type SubSurveyActivity = { id: string; name: string };
  const { user } = useUser();

  // State untuk form ContentIssue
  const [contentInput, setContentInput] = useState({
    content: "",
    issueStatus: "Waiting", // default tanpa enum FE
    subSurveyActivityId: "",
  });

  // State untuk komentar
  const [commentInput, setCommentInput] = useState({
    contentId: "",
    message: "",
    subSurveyActivityId: "",
  });

  const [createContentIssue] = useMutation(CREATE_CONTENT_ISSUE, {
    refetchQueries: [{ query: CONTENT_ISSUES }],
    awaitRefetchQueries: true,
  });
  const [updateContentIssue] = useMutation(UPDATE_CONTENT_ISSUE);
  const [addIssueComment] = useMutation(ADD_ISSUE_COMMENT, {
    refetchQueries: [{ query: CONTENT_ISSUES }],
    awaitRefetchQueries: true,
  });

  const { data: subSurveyData } = useQuery(GET_ALL_OF_SUB_SURVEY_ACTIVITIES);

  // Handler submit laporan kendala
  const handleSubmitContentIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!contentInput.content || !contentInput.subSurveyActivityId) {
        toast.error("Isi laporan dan pilih kegiatan!");
        return;
      }

      await createContentIssue({
        variables: { input: { ...contentInput, reporterId: user?.id } },
      });

      toast.success("Laporan kendala berhasil dikirim");
      setContentInput({ content: "", issueStatus: "Waiting", subSurveyActivityId: "" });
    } catch (error) {
      toast.error("Gagal membuat laporan");
      const err = error as ApolloError;
  console.log("GQL errors:", err.graphQLErrors);
  console.log("Network error:", err.networkError);
  console.log("Message:", err.message);
    }
  };

  // Handler submit komentar
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!commentInput.message || !commentInput.contentId) {
        toast.error("Pesan komentar wajib diisi!");
        return;
      }

      await addIssueComment({
        variables: { input: { ...commentInput, userId: user?.id } },
      });

      toast.success("Komentar berhasil ditambahkan");
      setCommentInput({ contentId: "", message: "", subSurveyActivityId: "" });
    } catch (error) {
      toast.error("Gagal menambahkan komentar");
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Laporan Kendala */}
      <div className="bg-orange-50 rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-bold mb-4">Form Laporan Kendala</h2>
        <form onSubmit={handleSubmitContentIssue} className="space-y-3">
          <select
            value={contentInput.subSurveyActivityId}
            onChange={(e) =>
              setContentInput({ ...contentInput, subSurveyActivityId: e.target.value })
            }
            className="w-full border px-3 py-2 rounded bg-white"
          >
            <option value="">-- Pilih Kegiatan --</option>
            {subSurveyData?.allSubSurveyActivities?.map((sub: SubSurveyActivity) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>

          <textarea
            value={contentInput.content}
            onChange={(e) => setContentInput({ ...contentInput, content: e.target.value })}
            placeholder="Tuliskan kendala..."
            className="w-full border px-3 py-2 rounded bg-white"
          />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Kirim Laporan
          </button>
        </form>
      </div>

      {/* Form Tambah Komentar */}
      <div className="bg-orange-50 rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-bold mb-4">Form Komentar Kendala</h2>
        <form onSubmit={handleSubmitComment} className="space-y-3">
          <input
            type="text"
            placeholder="ID Laporan Kendala"
            value={commentInput.contentId}
            onChange={(e) => setCommentInput({ ...commentInput, contentId: e.target.value })}
            className="w-full border px-3 py-2 rounded bg-white"
          />

          <textarea
            value={commentInput.message}
            onChange={(e) => setCommentInput({ ...commentInput, message: e.target.value })}
            placeholder="Tulis komentar..."
            className="w-full border px-3 py-2 rounded bg-white"
          />

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Kirim Komentar
          </button>
        </form>
      </div>
    </div>
  );
}
