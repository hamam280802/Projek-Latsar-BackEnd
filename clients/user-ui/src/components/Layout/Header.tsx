import React from 'react'
import ProfileDropDown from '../ProfileDropDown'
import { SideBar } from './SideBar'
import Calendar from './Calendar'
import useUser from '@/src/hooks/useUser'

export const Header = () => {
  const { user } = useUser();
  return (
    <header className='fixed top-0 left-0 right-0 h-[60px] bg-orange-500 flex items-center justify-end z-30 pl-[250px]'>
        <div className="w-[90%] m-auto flex items-center justify-end">
            <ProfileDropDown />
            <SideBar/>
            {user?.role === 'Admin' && <Calendar/>}
        </div>
    </header>
  )
}

export default Header

//#0F1524