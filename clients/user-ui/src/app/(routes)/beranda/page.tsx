'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface CalendarEvent {
    title: string;
    start: Date | string;
    end: Date | string;
    allDay: boolean;
    id: string;
    _id?: number;
  }

function Dashboard() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    const fetchEvents = async () => {
    try {
        const res = await axios.get('../../../../api/cals', { 
        headers: { 'Cache-Control': 'no-store' } 
        });
        
        if (res.status !== 200) {
        throw new Error("Gagal terhubung ke database")
        }
        
        // Convert numeric ids to strings for FullCalendar compatibility
        const formattedEvents = res.data.cals.map((event: any) => ({
        ...event,
        id: String(event.id)
        }));
        
        setEvents(formattedEvents);
    } catch (error) {
        console.log("Error memuat database: ", error);
    }
    }

    useEffect(() => {
        fetchEvents();
    }, [])
    
  return (
    <div className='px-8 py-4 space-y-4 font-Poppins'>
        <div className='bg-orange-50 rounded-lg p-2 font-bold text-xl flex justify-between shadow-md'>
            Beranda
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Kegiatan Survei
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Jadwal Kegiatan
                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
        </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Keterangan
                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
        </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id} className="bg-white border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {event.title}
                            </th>
                            <td className="px-6 py-4">
                                {new Date(event.start).toLocaleDateString()} - {new Date(event.end).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {event.allDay ? "All Day" : "Partial"}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Dashboard