'use client'
import React, { useEffect, useState } from 'react'
import NavItems from '../NavItems'
import styles from '@/src/utils/style'
import { AlignJustify, ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const SideBar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('isMinimized', isMinimized.toString())

    const event = new CustomEvent('sidebar-toggle', {
      detail: isMinimized
    });
    window.dispatchEvent(event);
  }, [isMinimized])

  return (
    <AnimatePresence>
    <motion.aside
      initial={{ width: 0 }}
      animate={{ width: isMinimized ? 60 : 250 }}
      exit={{ width: 0 }}
      transition={{ duration: 0.2 }}
    className={`py-4 bg-orange-900 ${isMinimized ? 'w-[60px]' : 'w-[250px]'} fixed top-0 left-0 h-screen flex-col z-30`}>
      {!isMinimized && (
        <button
          className="absolute top-4 right-[-12px] bg-orange-700 hover:bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
          onClick={() => setIsMinimized(true)}
          title='Collapse Sidebar'
        >
          <ChevronLeft size={16} />
        </button>
      )}
        {isMinimized ? (
          <div className={`w-[90%] m-auto h-[44px] flex items-center justify-center text-sm pb-4 ${styles.logo}`}>
            <button onClick={() => setIsMinimized(false)} title='Expand Sidebar'>
              <AlignJustify size={20} className="text-white" />
            </button>
          </div>
        ) : (
          <h1 className={`w-[90%] m-auto h-[44px] flex px-16 pb-4 text-2xl text-white ${styles.logo}`}>
                SIMANIS
          </h1>
        )}
        <NavItems isMinimized={isMinimized}/>
    </motion.aside>
    </AnimatePresence>
  )
}

//#16A34A