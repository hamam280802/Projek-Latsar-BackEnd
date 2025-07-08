'use client'
import { ReactNode, useEffect, useState } from 'react'
import Header from '@/src/components/Layout/Header'

export default function RouteLayout({ children }: { children: ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const value = sessionStorage.getItem('isMinimized');
    if (value) {setIsMinimized(value === 'true')}
    
    const handler = (event: Event) => {
      const custom = event as CustomEvent
      setIsMinimized(custom.detail) // Update state saat sidebar toggle
    }

    window.addEventListener('sidebar-toggle', handler)
    return () => window.removeEventListener('sidebar-toggle', handler)
  }, [])

  return (
    <>
      <Header/>
      <main className={`pt-[60px] ${isMinimized ? 'pl-[60px]' : 'pl-[250px]'} min-h-screen w-full`}>
        {children}
      </main>
    </>
  )
}
