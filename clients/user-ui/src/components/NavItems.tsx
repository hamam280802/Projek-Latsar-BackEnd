'use client'

import Link from "next/link"
import { ChartNoAxesCombined, ChevronDown, ChevronRight, Contact, FileText, House, LucideIcon, MonitorCheck, TriangleAlert, Users } from "lucide-react"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems: {
    title: string;
    url: string;
    style?: string;
    hovertitle?: string;
    unhover?: boolean;
    dataprogress?: { title: string; url: string }[];
    logo?: LucideIcon;
}[] = [
    {
        title: 'Beranda',
        hovertitle: 'Beranda',
        url: '/beranda',
        style: 'border-b-2 border-t-2 border-white py-2',
        logo: House,
    },
    {
        title: 'KEGIATAN LAPANGAN',
        url: '#kegiatanlapangan',
        unhover: true,
    },
    {
        title: 'Progres',
        url: '/progres',
        hovertitle: 'Progres',
        logo: ChartNoAxesCombined,
        dataprogress: [
            {
                title: 'Industri & PEK',
                url: '/progress/industri',
            },
            {
                title: 'Kesra & Hansos',
                url: '/progress/kesra',
            },
            {
                title: 'IPD & JRS',
                url: '/progress/ipd',
            },
            {
                title: 'Duknaker',
                url: '/progress/duknaker',
            },
            {
                title: 'Pertanian',
                url: '/progress/pertanian',
            },
            {
                title: 'Distribusi',
                url: '/progress/distribusi',
            },
            {
                title: 'Neraca',
                url: '/progress/neraca',
            },
            {
                title: 'Harga',
                url: '/progress/harga',
            },
            {
                title: 'KTIP',
                url: '/progress/ktip',
            },
            {
                title: 'DLS',
                url: '/progress/dls',
            }
        ],
    },
    {
        title: 'Monitoring Petugas',
        url: '/monitoringstaff',
        hovertitle: 'Monitoring Petugas',
        logo: MonitorCheck,
    },
    {
        title: 'Kendala',
        url: '/issue',
        hovertitle: 'Kendala',
        style: 'border-b-2 border-white pb-2',
        logo: TriangleAlert,
    },
    {
        title: 'ADMINISTRASI',
        url: '#administrasi',
        unhover: true,
    },
    {
        title: 'ST Petugas',
        url: '/partners',
        hovertitle: 'ST Petugas',
        logo: Users,
    },
    {
        title: 'Pengajuan SPJ',
        url: '/spj',
        hovertitle: 'Pengajuan SPJ',
        logo: FileText,
    },
    {
        title: 'Tentang Kami',
        url: '/about',
        hovertitle: 'Tentang Kami',
        logo: Contact
    },
]

const NavItems = ({activeItem = 0, isMinimized = false}:{activeItem?:number, isMinimized?: boolean}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openMinDropdown, setOpenMinDropdown] = useState<number | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="h-screen overflow-y-auto pb-6">
        <div className='flex flex-col space-y-2'>
            {
                navItems.map((item, index) => (
                    <div key={item.url} className={`${!isMinimized && item.style}`}>
                    {item.dataprogress ? (
                        <button
                        onClick={() => toggleDropdown(index)}
                        className={`w-full text-left px-5 text-[15px] font-Poppins font-[500] flex items-center justify-between py-2 hover:font-semibold 
                            ${activeItem === index && 'bg-[#ffffff2a] font-bold'}
                        `}
                        >
                        {isMinimized ? (
                            <div className="items-center" title={item.hovertitle}>{item.logo && <item.logo size={20} className="text-white"/>}</div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                {item.logo && <item.logo size={20} className="text-white"/>} <span className="mt-1 text-white">{item.title}</span>
                            </div>
                        )}
                        {!isMinimized && (openDropdown === index ? <ChevronDown size={16} className="mt-1 text-white"/> : <ChevronRight size={16} className="mt-1 text-white"/>)}
                        </button>
                    ) : (
                        <Link
                        href={item.url}
                        className={`px-5 text-[15px] font-Poppins font-[500] block 
                            ${!item.unhover ? 'hover:font-semibold py-2' : 'font-bold cursor-default'} 
                            ${activeItem === index && 'bg-[#ffffff2a] font-bold'}
                        `}
                        >
                        {isMinimized ? (
                            <div className="items-center" title={item.hovertitle}>{item.logo && <item.logo size={20} className="text-white"/>}</div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                {item.logo && <item.logo size={20} className="text-white"/>} <span className="mt-1 text-white">{item.title}</span>
                            </div>
                        )}
                        </Link>
                    )}

                    <AnimatePresence>
                    {!isMinimized && item.dataprogress && openDropdown === index && (
                        <motion.div
                        className="ml-6 mt-1 space-y-1"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        >
                        {item.dataprogress.map((sub, subIndex) => (
                            <Link
                            key={sub.url}
                            href={sub.url}
                            className={`block text-sm px-2 py-1 hover:font-semibold text-white ${activeSubItem === subIndex && 'font-bold'}`}
                            onClick={() => setActiveSubItem(subIndex)}
                            >
                            {activeSubItem === subIndex ? '>' : '•'} {sub.title}
                            </Link>
                        ))}
                        </motion.div>
                    )}
                    </AnimatePresence>
                    </div>
                ))
            }
            { isMinimized && (
                <AnimatePresence>
                    {openDropdown && navItems[2].dataprogress && (
                        <div onMouseLeave={() => setOpenDropdown(null)} className="absolute bg-orange-800 p-2 w-[150px] ml-[65px] top-[100px] rounded-md shadow-lg z-10">
                        <motion.div
                        className="space-y-1"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        >
                        {navItems[2].dataprogress.map((sub, subIndex) => (
                            <Link
                            key={sub.url}
                            href={sub.url}
                            className={`block text-sm px-2 py-1 hover:font-semibold text-white ${activeSubItem === subIndex && 'font-bold'}`}
                            onClick={() => setActiveSubItem(subIndex)}
                            >
                            {activeSubItem === subIndex ? '>' : '•'} {sub.title}
                            </Link>
                        ))}
                        </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            )}
        </div>
    </div>
  )
}

export default NavItems;