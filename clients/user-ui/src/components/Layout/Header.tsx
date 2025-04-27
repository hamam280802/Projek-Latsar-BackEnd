import React from 'react'
import ProfileDropDown from '../ProfileDropDown'
import { SideBar } from './SideBar'

export const Header = () => {
  return (
    <header className='absolute top-0 left-0 right-0 h-[60px] bg-orange-500 flex items-center justify-end z-30 pl-[250px]'>
        <div className="w-[90%] m-auto flex items-center justify-end">
            <ProfileDropDown />
            <SideBar/>
        </div>
    </header>
  )
}

export default Header

//#0F1524