'use client'

import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    {
        title: 'Beranda',
        url: '/',
        style: 'border-b-2 border-t-2 border-white py-2',
    },
    {
        title: 'KEGIATAN LAPANGAN',
        url: '/',
        unhover: true,
    },
    {
        title: 'Progres',
        url: '/',
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
    },
    {
        title: 'Kendala',
        url: '/issue',
        style: 'border-b-2 border-white pb-2',
    },
    {
        title: 'ADMINISTRASI',
        url: '/',
        unhover: true,
    },
    {
        title: 'ST Petugas',
        url: '/partners',
    },
    {
        title: 'Pengajuan SPJ',
        url: '/spj',
    },
    {
        title: 'Tentang Kami',
        url: '/about',
    },
]

const NavItems = ({activeItem = 0}:{activeItem?:number}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  return (
    <div className='flex flex-col space-y-2'>
        {
            navItems.map((item, index) => (
                <div key={item.url} className={item.style}>
                {item.dataprogress ? (
                    <button
                    onClick={() => toggleDropdown(index)}
                    className={`w-full text-left px-5 text-[15px] font-Poppins font-[500] flex items-center justify-between py-2 hover:font-semibold ${
                        activeItem === index && 'bg-[#ffffff2a] font-bold'
                    }`}
                    >
                    <span>{item.title}</span>
                    {openDropdown === index ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                ) : (
                    <Link
                    href={item.url}
                    className={`px-5 text-[15px] font-Poppins font-[500] block ${
                        !item.unhover ? 'hover:font-semibold py-2' : 'font-bold cursor-default'
                    } ${activeItem === index && 'bg-[#ffffff2a] font-bold'}`}
                    >
                    {item.title}
                    </Link>
                )}

                <AnimatePresence>
                {item.dataprogress && openDropdown === index && (
                    <motion.div
                    className="ml-6 mt-1 space-y-1"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    >
                    {item.dataprogress.map((sub) => (
                        <Link
                        key={sub.url}
                        href={sub.url}
                        className="block text-sm px-2 py-1 hover:font-semibold text-gray-300"
                        >
                        • {sub.title}
                        </Link>
                    ))}
                    </motion.div>
                )}
                </AnimatePresence>
                </div>
            ))

        }
    </div>
  )
}

export default NavItems;