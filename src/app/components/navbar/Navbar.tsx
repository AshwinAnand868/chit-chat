"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Icons } from "../Icons";

type NavbarLink = {
    id: number,
    name: string,
    href: string,
}

const navbarLinks: NavbarLink[] = [
    {
        id: 1,
        name: 'Features',
        href: '/'
    },
    {
        id: 2,
        name: 'How it works?',
        href: '/howitworks'
    },
    {
        id: 3,
        name: 'Why us?',
        href: '/whyus',
    },
    {
        id: 4,
        name: 'Testimonials',
        href: '/testimonials',
    },
    {
        id: 5,
        name: 'Sign Up',
        href: '/login'
    }
]

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);


    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

  return (
    <div className="w-full bg-red-500 h-[4.5rem] shadow-xl">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16 sticky top-0">
        <Link href="/">
          <Icons.Logo className="h-8 w-auto text-indigo-600" />
        </Link>

        <div className="hidden sm:flex">
            <ul className="flex">
                {navbarLinks.map((option) => {
                    return (
                        <li key={option.id} className="ml-10 text-black hover:border-b transition">
                            <Link href={option.href}>
                                {option.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>

        </div>

        <div onClick={handleNav} className="flex sm:hidden cursor-pointer pl-24">
            <AiOutlineMenu size={25} />
        </div>
      </div>

      <div className={
        menuOpen
        ? "fixed left-0 top-0 w-[65%] h-screen sm:hidden bg-[#ecf0f3] p-10 ease-in duration-500"
        : "fixed left-[-100%] top-0 p-10 easy-in duration-1000"
      }>

      </div>
    </div>
  );
};

export default Navbar;
