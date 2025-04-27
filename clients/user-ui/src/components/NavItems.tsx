import Link from "next/link"

const navItems = [
    {
        title: 'Beranda',
        url: '/',
    },
    {
        title: 'Progres',
        url: '/progress',
    },
    {
        title: 'Monitoring Petugas',
        url: '/monitoringstaff',
    },
    {
        title: 'Kendala',
        url: '/issue',
    },
    {
        title: 'Daftar Mitra',
        url: '/partners',
    },
    {
        title: 'Tentang Kami',
        url: '/about',
    },
]

const NavItems = ({activeItem = 0}:{activeItem?:number}) => {
  return (
    <div className='flex flex-col space-y-2'>
        {
            navItems.map((item, index) => (
                <Link
                key={item.url}
                href={item.url}
                className={
                    `px-5 text-[15px] font-Poppins font-[500] block py-2 hover:font-semibold ${
                        activeItem === index && 'bg-[#ffffff2a] font-bold' //active item based on url
                    }`
                }
                >
                    {item.title}
                </Link>
            ))

        }
    </div>
  )
}

export default NavItems;