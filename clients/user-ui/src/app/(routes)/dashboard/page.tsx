"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isMinimized, setIsMinimized] = useState<Record<string, boolean>>({});
  const [isCloseTable, setIsCloseTable] = useState(false);

  const toggleTable = (index: string) => {
    setIsMinimized((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleAllTables = (close: boolean) => {
    const newState: Record<string, boolean> = {};
    Object.keys(
      filteredEvents.reduce<Record<string, CalendarEvent[]>>(
        (groups, event) => {
          const key = event.surveyEvent;
          if (!groups[key]) groups[key] = [];
          groups[key].push(event);
          return groups;
        },
        {}
      )
    ).forEach((key) => {
      newState[key] = close;
    });

    setIsMinimized(newState);
  };

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
    const groupedEvents = filteredEvents.reduce<
      Record<string, CalendarEvent[]>
    >((groups, event) => {
      const key = event.surveyEvent;
      if (!groups[key]) groups[key] = [];
      groups[key].push(event);
      return groups;
    }, {});

    const allClosed = Object.keys(groupedEvents).every(
      (surveyEvent) => isMinimized[surveyEvent] === true
    );

    setIsCloseTable(allClosed);
  }, [isMinimized, filteredEvents]);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="px-8 py-4 space-y-4 font-Poppins">
      <div className="bg-orange-50 rounded-lg p-2 font-bold text-xl flex justify-between shadow-md">
        Beranda
        <button
          onClick={fetchEvents}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition font-semibold"
        >
          Refresh
        </button>
      </div>
      <div className="relative shadow-md">
        <table className="table-fixed w-full text-sm text-left text-gray-500">
          <thead className="text-gray-700 bg-gray-200 block w-full sm:rounded-t-lg">
            <tr className="table w-full table-fixed">
              <th scope="col" className="px-6 py-3 uppercase">
                Kegiatan Survei
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                <div className="flex items-center">Jadwal Kegiatan</div>
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
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
          <tbody className="block max-h-96 overflow-y-auto w-full">
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
              events.sort(
                (a, b) =>
                  new Date(a.start).getTime() - new Date(b.start).getTime()
              );
              const minimized = isMinimized[surveyEvent] ?? false;
              return (
                <React.Fragment key={surveyEvent}>
                  <tr className="bg-gray-100 border-b border-gray-300 table w-full table-fixed">
                    <td
                      colSpan={3}
                      className="px-6 py-2 font-bold text-gray-800"
                    >
                      {surveyEvent}
                    </td>
                    <td className="px-6 py-2 text-gray-600">
                      <div className="flex justify-end">
                        <button onClick={() => toggleTable(surveyEvent)}>
                          {minimized || isCloseTable ? (
                            <ChevronUp size={16} className="mt-1" />
                          ) : (
                            <ChevronDown size={16} className="mt-1" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                  <AnimatePresence>
                    {minimized || isCloseTable
                      ? null
                      : events.map((event) => (
                          <tr
                            key={event.id}
                            className="bg-white border-b border-gray-200 table w-full table-fixed"
                          >
                            <td
                              scope="row"
                              className="px-12 py-2 font-medium text-gray-900 whitespace-nowrap"
                            >
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.1 }}
                              >
                                {event.title}
                              </motion.div>
                            </td>
                            <td className="px-6 py-2">
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.1 }}
                              >
                                {new Date(event.start).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}{" "}
                                -{" "}
                                {new Date(event.end).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </motion.div>
                            </td>
                            <td className="px-6 py-2">
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.1 }}
                              >
                                {event.info}
                              </motion.div>
                            </td>
                            <td className="px-6 py-2 text-right">
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.1 }}
                              >
                                <a
                                  href="#"
                                  className="font-medium text-blue-600 hover:underline"
                                >
                                  Edit
                                </a>
                              </motion.div>
                            </td>
                          </tr>
                        ))}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot className="block w-full rounded-b-lg">
            <tr className="text-gray-700 bg-gray-200 table w-full table-fixed">
              <td colSpan={4} className="px-6 py-2">
                <div className="flex justify-end items-center">
                  {isCloseTable ? (
                    <button
                      onClick={() => toggleAllTables(false)}
                      className="flex items-center px-2 bg-gray-900 rounded-md border-gray-900 border-2"
                    >
                      <p className="text-sm font-bold text-white">
                        Buka Jadwal
                      </p>
                      <div className="pl-1 pb-1">
                        <ChevronDown size={16} className="mt-1 text-white" />
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleAllTables(true)}
                      className="flex items-center px-2 bg-gray-900 rounded-md border-gray-900 border-2"
                    >
                      <p className="text-sm font-bold text-white">
                        Tutup Jadwal
                      </p>
                      <div className="pl-1 pb-1">
                        <ChevronUp size={16} className="mt-1 text-white" />
                      </div>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          </tfoot>
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
