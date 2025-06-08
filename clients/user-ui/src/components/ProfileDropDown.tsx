'use client';
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from '@heroui/react'
import { Avatar } from '@heroui/avatar'
import { useEffect, useState } from 'react'
import useUser from '../hooks/useUser'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { signOut, useSession } from 'next-auth/react'
import { registerUser } from '../actions/register-user'

const ProfileDropDown = () => {
  const [signedIn, setsignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const {user, loading} = useUser();
  const { data } = useSession();

  useEffect(() => {
    if (!loading) {
        setsignedIn(!!user);
    }
    if (data?.user) {
        setsignedIn(true);
        addUser(data?.user);
    }
  }, [loading, user, open, data]);

  const handleLogOut = () => {
    if (data?.user) {
        signOut();
    } else {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/';
        toast.success('Logout Berhasil!');
    }
  };

  const addUser = async (user: any) => {
    await registerUser(user);
  };

  return (
    <div className='flex items-center gap-4'>
        { signedIn && (
            <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                    <Avatar
                    as='button'
                    className='transition-transform text-white'
                    src={data?.user ? data.user.image : user.image}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat' className='border rounded-lg bg-white shadow-md text-black'>
                    <DropdownItem key="profile" className='h-14 gap-2'>
                        <p className='font-semibold'>
                            Nama Petugas
                        </p>
                        <p className='font-semibold'>
                            {data?.user ? data.user.name : user.name}
                        </p>
                    </DropdownItem>
                    <DropdownItem key="settings">Profil Saya</DropdownItem>
                    <DropdownItem key="achievement">Notifikasi</DropdownItem>
                    <DropdownItem key="logout" onClick={()=>handleLogOut()}>Log Out</DropdownItem>
                </DropdownMenu>
            </Dropdown>)
        }
    </div>
  )
}

export default ProfileDropDown