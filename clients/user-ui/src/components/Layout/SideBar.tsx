import React from 'react'
import NavItems from '../NavItems'
import styles from '@/src/utils/style'

export const SideBar = () => {
  return (
    <aside className='py-4 bg-orange-900 w-[250px] fixed top-0 left-0 h-screen flex-col z-30'>
        <h1 className={`w-[90%] m-auto h-[45px] flex px-16 pb-4 text-2xl ${styles.logo}`}>
                SiCepat
        </h1>
        <NavItems />
    </aside>
  )
}

//#16A34A