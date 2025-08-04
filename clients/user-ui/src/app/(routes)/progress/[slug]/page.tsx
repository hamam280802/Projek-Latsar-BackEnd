"use client";

import React, { useState } from "react";
import { GET_SURVEY_ACTIVITIES_BY_SLUG } from "@/src/graphql/actions/find-surveyact.action";
import { GET_ALL_SUB_SURVEY_ACTIVITIES } from "@/src/graphql/actions/find-allsubsurveyact.action";
import { GET_ALL_SUB_SURVEY_PROGRESS } from "@/src/graphql/actions/find-allsubsurveyprogress.action";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";

const ProgressTemplate = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { slug } = useParams() as { slug: string };
  const [selectedSubSurvey, setSelectedSubSurvey] = useState<string | null>(
    null
  );

  const { data: surveyData, loading: loadingSurvey } = useQuery(
    GET_SURVEY_ACTIVITIES_BY_SLUG,
    {
      variables: { slug },
      skip: !slug,
      fetchPolicy: "network-only",
    }
  );

  const surveyActivityId = surveyData?.surveyActivityBySlug?.id;
  const { data: subSurveyDataAll, loading: loadingSubSurveyAll } = useQuery(
    GET_ALL_SUB_SURVEY_ACTIVITIES,
    {
      variables: { surveyActivityId },
      skip: !surveyActivityId,
      fetchPolicy: "network-only",
    }
  );

  const { data: subSurveyData, loading: loadingSubSurvey } = useQuery(
    GET_ALL_SUB_SURVEY_PROGRESS,
    {
      variables: { subSurveyActivityId: selectedSubSurvey },
      skip: !selectedSubSurvey,
      fetchPolicy: "network-only",
    }
  );

  const subSurveyActivities = subSurveyDataAll?.subSurveyActivityById || [];
  const progress = subSurveyData?.subSurveyProgress || null;

  if (loadingSurvey || loadingSubSurveyAll) return <div>Loading...</div>;
  if (!surveyData || !surveyData.surveyActivityBySlug) {
    return <div>Data tidak ditemukan.</div>;
  }

  return (
    <div className="px-8 py-4 space-y-4 font-Poppins">
      <div className="bg-orange-50 rounded-lg p-2 text-xl font-bold w-full shadow-md">
        <h1>Progres {surveyData.surveyActivityBySlug.name}</h1>
      </div>

      <div className="bg-orange-50 rounded-lg p-2 w-full shadow-md">
        <p className="font-semibold text-xl">Pilih Jenis Survei:</p>
        <div className="space-x-4 p-2 flex justify-start">
          {subSurveyActivities.map((subSurvey: any) => (
            <button
              key={subSurvey.id}
              onClick={() => setSelectedSubSurvey(subSurvey.id)}
              className={`p-2 rounded-md border font-semibold w-[12%] ${
                selectedSubSurvey === subSurvey.id
                  ? "bg-orange-500 text-white"
                  : "bg-slate-700 text-white hover:bg-orange-500"
              }`}
            >
              {subSurvey.name}
            </button>
          ))}
        </div>
      </div>

      {selectedSubSurvey && progress && (
        <div className="bg-orange-50 rounded-lg p-2 w-full shadow-md">
          <h1 className="text-xl font-bold">Nama Survei</h1>
          <div className="p-2 space-x-4 flex justify-between items-center">
            <div className="bg-slate-400 rounded-lg border w-full flex flex-col p-3 space-y-3 font-semibold">
              <p>Periode</p>
              <p className="text-xl">
                {new Date(progress.startDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(progress.endDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="bg-slate-400 rounded-lg border w-full flex flex-col p-3 space-y-3 font-semibold">
              <p>Target Sampel</p>
              <p className="text-xl">{progress.targetSample}</p>
            </div>
            <div className="bg-slate-400 rounded-lg border w-full flex flex-col p-2 space-y-2 font-semibold">
              <p>Wilayah</p>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center shadow-md w-full justify-between"
                >
                  Pilih Wilayah
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
                  <div className="absolute left-0 mt-2 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-full">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          CSV
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Excel
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          JSON
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 p-2">
            <p className="font-semibold text-xl">Progres Kegiatan</p>
          </div>

          <div className="p-2 space-x-4 flex justify-between items-center">
            <div className="bg-blue-300 rounded-md flex flex-col items-center space-y-2 w-full py-2">
              <p>Total Petugas</p>
              <p className="font-bold text-2xl text-blue-600">
                {progress.totalPetugas}
              </p>
            </div>
            <div className="bg-green-300 rounded-md flex flex-col items-center space-y-2 w-full py-2">
              <p>Sampel Submit</p>
              <p className="font-bold text-2xl text-green-600">
                {progress.submitCount}
              </p>
            </div>
            <div className="bg-purple-300 rounded-md flex flex-col items-center space-y-2 w-full py-2">
              <p>Sampel Approved</p>
              <p className="font-bold text-2xl text-purple-600">
                {progress.approvedCount}
              </p>
            </div>
            <div className="bg-red-300 rounded-md flex flex-col items-center space-y-2 w-full py-2">
              <p>Sampel Rejected</p>
              <p className="font-bold text-2xl text-red-600">
                {progress.rejectedCount}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTemplate;
