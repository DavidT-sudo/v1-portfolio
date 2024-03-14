"use client";
import React, {useState} from 'react'
import Link from 'next/link'
import NavLink from './Navlink'
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid"
import MenuOverlay from './MenuOverlay';


const navLinks = [
    {
      title: "About",
      path: "#about"
    },
    {
      title: "Projects",
      path: "#projects"
    }, 
    {
      title: "Contact",
      path: "#contact"
    }
]


const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);  

  return (
    <nav className="fixed top-0 right-0 left-0 z-10 bg-[#050000] bg-opacity-100">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link href='/' className="text-2xl md:text-5xl text-white font-semibold">
            LOGO
        </Link>
        <div className="mobile-menu block md:hidden">
          {
            !navbarOpen ? (
              <button onClick={() => setNavbarOpen(true)} className="flex items-center text-slate-200 px-3 py-2 border border-slate-200 hover:border-white">
                <Bars3Icon className="h-5 w-5"/>
              </button>
            ) : (
              <button onClick={() => setNavbarOpen(false)} className="flex items-center text-slate-200 px-3 py-2 border border-slate-200 hover:border-white">
                <XMarkIcon className="h-5 w-5"/>
              </button>
            )
          }
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <menu className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {
              navLinks.map((link, index) => (
                <li key={index}>
                    <NavLink href={link.path} title={link.title} />
                </li>
              ))
            }
          </menu>
        </div>
      </div>
      {
        navbarOpen ?
          <MenuOverlay links={navLinks}/> :
          null
      }
    </nav>
  )
}

export default Navbar
