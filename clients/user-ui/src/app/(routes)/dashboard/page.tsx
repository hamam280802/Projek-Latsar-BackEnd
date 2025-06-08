"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface CalendarEvent {
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean;
  id: string;
  info: string;
  surveyEvent: string;
  _id?: number;
}

function Dashboard() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currentYear = new Date().getFullYear();

  const fetchEvents = async () => {
    try {
      const res = await axios.get("../../../../api/cals", {
        headers: { "Cache-Control": "no-store" },
      });

      if (res.status !== 200) {
        throw new Error("Gagal terhubung ke database");
      }

      // Convert numeric ids to strings for FullCalendar compatibility
      const formattedEvents = res.data.cals.map((event: any) => ({
        ...event,
        id: String(event.id),
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.log("Error memuat database: ", error);
    }
  };

  const filteredEvents = events.filter((event) => {
    const isTitleMatch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isThisSurvey = event.surveyEvent
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isInfoMatch = event.info
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isTitleMatch || isThisSurvey || isInfoMatch;
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="px-8 py-4 space-y-4 font-Poppins">
      <div className="bg-orange-50 rounded-lg p-2 font-bold text-xl flex justify-between shadow-md">
        Beranda
        <button
          onClick={fetchEvents}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Kegiatan Survei
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Jadwal Kegiatan</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Keterangan</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Cari kegiatan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border focus:outline-none border-gray-300 bg-white rounded-md px-3 py-1 text-sm font-thin w-full"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(
              filteredEvents.reduce<Record<string, CalendarEvent[]>>(
                (groups, event) => {
                  const key = event.surveyEvent;
                  if (!groups[key]) groups[key] = [];
                  groups[key].push(event);
                  return groups;
                },
                {}
              )
            ).map(([surveyEvent, events]) => {
              events.sort((a, b) => {
                const dateA = new Date(a.start);
                const dateB = new Date(b.start);
                return dateA.getTime() - dateB.getTime();
              });
              return (
                <React.Fragment key={surveyEvent}>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <td
                      colSpan={4}
                      className="px-6 py-2 font-bold text-gray-800"
                    >
                      {surveyEvent}
                    </td>
                  </tr>

                  {events.map((event) => (
                    <tr
                      key={event.id}
                      className="bg-white border-b border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-12 py-2 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {event.title}
                      </th>
                      <td className="px-6 py-2">
                        {new Date(event.start).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(event.end).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-2">{event.info}</td>
                      <td className="px-6 py-2 text-right">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="space-x-4 flex justify-between items-center">
        <div className="p-2 bg-orange-50 rounded-lg shadow-md font-bold w-full">
          <h2>PROGRES PENDATAAN BULAN INI</h2>
        </div>
        <div className="p-2 bg-orange-50 rounded-lg shadow-md font-bold w-full">
          <h2>PENCAPAIAN PETUGAS</h2>
        </div>
      </div>
      <div className="space-x-4 flex justify-between items-center">
        <div className="p-2 bg-orange-50 rounded-lg shadow-md w-full">
          <p className="text-md">Petugas Aktif</p>
        </div>
        <div className="p-2 bg-orange-50 rounded-lg shadow-md w-full">
          <p className="text-md">Kendala Petugas</p>
        </div>
        <div className="p-2 bg-orange-50 rounded-lg shadow-md w-full">
          <p className="text-md">Pengumpulan ST</p>
        </div>
        <div className="p-2 bg-orange-50 rounded-lg shadow-md w-full">
          <p className="text-md">Pengajuan SPJ</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
