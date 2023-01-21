import Link from "next/link";
import { useState } from "react";
import { Sora } from "@next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";

const sora = Sora({ subsets: ["latin"] });
const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const user = useUser();
  console.log("user info is", user);
  console.log("open nav is", openNav);
  return (
    <header
      className={`${sora.className} bg-primary text-[18px] text-white h-[50px] md:h-[80px] `}
    >
      <div className="header relative  py-2 md:py-4 px-5 md:px-11 flex justify-between items-center">
        {/* <h1 className={`${dmSans.className} font-bold text-3xl`}> */}
        <h1 className="font-bold text-2xl md:text-3xl">
          <Link href="/">Food Express</Link>
        </h1>

        <div className="hidden md:flex items-center gap-20 ">
          <ul className="text-[20px] flex items-center gap-5 ">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/features">All Items</Link>
            </li>
          </ul>

          <div className="cta flex items-center flex-col md:flex-row justify-center gap-5 md:gap-7">
            <Link href="/api/auth/login">
              <p>Login</p>
            </Link>
            <Link href="/api/auth/login">
              <button className="bg-white text-primary font-bold px-6 py-2 rounded-lg">
                Signup
              </button>
            </Link>
          </div>
        </div>
        <div
          className={`${
            openNav ? "active" : ""
          } hamburger  block md:hidden mt-1 cursor-pointer`}
          onClick={() => {
            setOpenNav((prev) => !prev);
          }}
        >
          <span className="bar block w-[30px] h-[4px] bg-white "></span>
          <span className="bar block w-[30px] mt-1 h-[4px] bg-white "></span>
          <span className="bar block w-[30px] mt-1 h-[4px] bg-white "></span>
        </div>
      </div>

      {openNav && (
        <nav className="top-12 right-0 w-[100%] text-white absolute flex flex-col justify-center h-[300px] bg-primary items-center md:hidden">
          <ul className="flex flex-col items-center gap-5 ">
            <li onClick={() => setOpenNav(false)}>
              <Link href="/">Home</Link>
            </li>
            <li onClick={() => setOpenNav(false)}>About</li>
          </ul>

          <div className="cta mt-10 flex flex-col items-center">
            <Link href="/login" onClick={() => setOpenNav(false)}>
              <p>Login</p>
            </Link>
            <Link href="/signup" onClick={() => setOpenNav(false)}>
              <button className=" bg-white text-primary font-bold px-8 py-2 rounded-lg mt-4 ">
                Signup
              </button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
