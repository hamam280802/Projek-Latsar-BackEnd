'use client'
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from '@heroui/react'
import { Avatar } from '@heroui/avatar'
import { useState } from 'react'
import AuthScreen from '../screens/AuthScreen'

const ProfileDropDown = () => {
  const [signedIn, setsignedIn] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className='flex items-center gap-4'>
        {
            signedIn ? (
                <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                        <Avatar
                        as='button'
                        className='transition-transform'
                        src=""
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Profile Actions' variant='flat' className='border rounded-lg bg-white shadow-md text-black'>
                        <DropdownItem key="profile" className='h-14 gap-2'>
                            <p className='font-semibold'>
                                Nama Petugas
                            </p>
                            <p className='font-semibold'>
                                qwerty@gmail.com
                            </p>
                        </DropdownItem>
                        <DropdownItem key="settings">Profil Saya</DropdownItem>
                        <DropdownItem key="achievement">Notifikasi</DropdownItem>
                        <DropdownItem key="logout">Log Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <Avatar
                    as='button'
                    className='transition-transform'
                    onClick={() => setOpen(!open)}
                />
            )
        }
        {
            open && (
                <AuthScreen />
            )
        }
    </div>
  )
}

export default ProfileDropDown