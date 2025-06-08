import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-Poppins">
        <div className="py-6 px-6">
        <h1 className="text-4xl font-bold mb-6">Tentang Kami</h1>
        <div className='bg-orange-100 p-2 rounded-lg'>
        <p className="text-lg leading-relaxed mb-4">
            Kami adalah tim pengembang aplikasi yang berfokus pada penyediaan solusi digital untuk kebutuhan statistik dan pemantauan data lapangan. Dengan semangat inovasi dan akurasi, kami berupaya menghadirkan aplikasi yang andal dan mudah digunakan untuk membantu berbagai pihak dalam pengambilan keputusan berbasis data.
        </p>
        <p className="text-lg leading-relaxed mb-4">
            Aplikasi ini dirancang untuk memudahkan pengawasan kinerja petugas lapangan, manajemen kegiatan survei, serta penyampaian laporan yang efisien. Kami terus mengembangkan fitur dan memperbaiki sistem agar dapat menjawab kebutuhan yang terus berkembang.
        </p>
        <p className="text-lg leading-relaxed">
            Terima kasih atas kepercayaan Anda menggunakan aplikasi kami.
        </p>
        </div>
        </div>
    </div>
  )
}

export default About