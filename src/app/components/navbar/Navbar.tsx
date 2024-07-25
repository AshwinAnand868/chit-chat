"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMenu,
} from "react-icons/ai";
import { Icons } from "../Icons";
// import "@/app/privacypolicy/policy.html"

type NavbarLink = {
  id: number;
  name: string;
  href: string;
};

const navbarLinks: NavbarLink[] = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "Features",
    href: "/features",
  },
  {
    id: 2,
    name: "How it works?",
    href: "/howitworks",
  },
  {
    id: 3,
    name: "Why us?",
    href: "/whyus",
  },
  {
    id: 4,
    name: "Testimonials",
    href: "/testimonials",
  },
  {
    id: 5,
    name: "Privacy Policy",
    href: "/privacypolicy"
  },
  {
    id: 6,
    name: "",
    href: "",
  },
];

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full bg-red-500 h-[4.5rem] shadow-xl sticky top-0">
      <div className="flex justify-between items-center h-[70px] w-full px-4 2xl:px-16">
        <Link href="/dashboard">
          <Icons.Logo className="h-8 w-auto text-indigo-600" />
        </Link>

        <div className="hidden sm:flex">
          <ul className="flex">
            {navbarLinks.map((option) => {
              return option.id < 6 ? (
                <li
                  key={option.id}
                  className="ml-10 text-white hover:border-b transition"
                >
                  <Link href={option.href}>{option.name}</Link>
                </li>
              ) : (
                <li
                  key={option.id}
                  className="ml-10 text-white hover:border-b transition"
                >
                  {session ? <Link href={'/dashboard'}>Dashboard</Link> : 
                    <Link href={'/login'}>Sign In</ Link>}
                </li>
              );
            })}
          </ul>
        </div>

        <div
          onClick={handleNav}
          className="flex sm:hidden cursor-pointer pl-24"
        >
          <AiOutlineMenu size={25} />
          {/* {
            <p className="text-[16px] px-3">
              {session?.user.name?.split(" ")[0]}
            </p>
          } */}
        </div>
      </div>

      <div
        className={
          menuOpen
            ? "fixed left-0 top-0 w-[65%] h-screen sm:hidden bg-red-500 p-10 ease-in duration-500"
            : "fixed left-[-100%] top-0 p-10 ease-in duration-500 h-screen w-[65%]"
        }
      >
        <div className="flex items-center justify-end">
          <div onClick={handleNav} className="cursor-pointer">
            <AiOutlineClose />
          </div>
        </div>
        <div className="flex flex-col py-4">
          <ul>
            {navbarLinks.map((option) => {
              return option.id < 6 ? (
                <li
                  key={option.id}
                  onClick={() => setMenuOpen(false)}
                  className="py-4 cursor-pointer"
                >
                  <Link href={option.href}>{option.name}</Link>
                </li>
              ) : (
                <li
                  key={option.id}
                  onClick={() => setMenuOpen(false)}
                  className="py-4 cursor-pointer"
                >
                  {session ? <Link href={'/dashboard'}>Dashboard</Link> : 
                    <Link href={'/login'}>Sign In</ Link>}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-row justify-around pt-10 items-center">
          <Link
            href="https://www.linkedin.com/in/anand-ashwin/"
            target="_blank"
          >
            <AiOutlineLinkedin size={30} className="cursor-pointer" />
          </Link>
          <Link href="https://github.com/AshwinAnand868/">
            <AiOutlineGithub
              size={30}
              className="cursor-pointer"
              target="_blank"
            />
          </Link>
          <Link href="https://www.instagram.com/ashwin_anand_/">
            <AiOutlineInstagram
              size={30}
              className="cursor-pointer"
              target="_blank"
            />
          </Link>
        </div>

        <Link href="/" className="pt-6 flex gap-6 justify-center items-center">
          <span className="text-xl font-bold">Chit Chat</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
