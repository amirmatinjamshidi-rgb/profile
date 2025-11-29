"use client"
import Link from 'next/link'
import Image from 'next/image'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useState } from 'react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuItems = ["Home", "About", "Projects", "Services"]

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto max-w-5xl bg-black shadow-lg shadow-indigo-500/50 backdrop-blur-lg py-2 md:top-6 md:rounded-3xl">
      <div className="px-4 flex items-center justify-between">
        <Link href="/me" className="flex items-center gap-2">
          <Image
            src="/batman-icon.svg"
            alt="Batman Icon"
            width={30}
            height={30}
            className="rounded-full shadow-lg shadow-yellow-400"
          />
          <span className="sr-only">BATMANS LAYER</span>
        </Link>

        <div className="hidden md:flex gap-4">
          {menuItems.map(item => (
            <button
              key={item}
              className="bg-linear-to-r from-green-400 via-green-500 to-green-600 text-white rounded px-4 py-2 flex flex-col items-center group overflow-hidden relative transition-all duration-300 hover:from-purple-500 hover:via-pink-500 hover:to-red-500"
            >
              <span className="group-hover:-translate-y-5 transition-all duration-300 group-hover:invisible">{item}</span>
              <span className="absolute translate-y-5 group-hover:translate-y-0 transition-all duration-300 invisible group-hover:visible">{item}</span>
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 border rounded-md"
          >
            <MenuRoundedIcon className="text-white" />
          </button>
        </div>
      </div>

   
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-700 p-3 flex flex-col gap-2">
          {menuItems.map(item => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-white px-3 py-2 rounded hover:bg-gray-800"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Navbar
