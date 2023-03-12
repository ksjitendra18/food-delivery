import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Sora } from "@next/font/google";
import { Inter } from "@next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSelector } from "react-redux";
import Item from "../../types/ItemType";
import { RootState } from "../../store/store";

const sora = Sora({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const user = useUser();

  const [cartCount, setCartCount] = useState(0);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const cartItem = useSelector((state: RootState) => state.cartReducer.cart);

  const total = useMemo(() => {
    if (cartItem?.length > 0) {
      return cartItem.map((item: Item) => item.quantity);
    } else {
      return [];
    }
  }, [cartItem]);

  useEffect(() => {
    // to fix the type error,
    // although could not be the best solution but by design we are acertain than there will default quantity value of 1.

    sumOfItems(total as number[]);

    // temp for dev purpose only
    if (user.user && user.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      setUserIsAdmin(true);
    }
  }, [cartItem, total, user]);

  const sumOfItems = (array: number[]) => {
    let sum = 0;

    Array.from(array).forEach((item) => {
      sum += item;
    });

    setCartCount(sum);

    return sum;
  };

  // console.log(userIsAdmin);

  return (
    <header
      className={`${inter.className} bg-primary text-[18px] text-white h-[50px] md:h-[80px] sticky `}
    >
      <div className="header relative  py-2 md:py-4 px-5 md:px-11 flex justify-between items-center">
        {/* <h1 className={`${dmSans.className} font-bold text-3xl`}> */}
        <h1 className="font-bold text-2xl md:text-3xl">
          <Link href="/">Food Ordering</Link>
        </h1>

        <div className="hidden md:flex items-center gap-20 ">
          <ul className="text-[20px] flex items-center gap-5 ">
            <li>
              <Link href="/">Home</Link>
            </li>
            {!userIsAdmin ? (
              <li>
                <Link href="/order">All Items</Link>
              </li>
            ) : null}
            {user.user && !userIsAdmin ? (
              <li>
                <Link href="/myorders">My Orders</Link>
              </li>
            ) : null}

            {user.user && userIsAdmin ? (
              <>
                <li>
                  <Link href="/admin/items">All Items</Link>
                </li>
                <li>
                  <Link href="/admin/orders">All Orders</Link>
                </li>
              </>
            ) : null}

            {!userIsAdmin && (
              <li className="">
                <Link href="/cart">
                  <div className="bg-white text-black py-2 px-5 rounded-lg text-[17px] flex items-center">
                    Cart
                    {cartCount !== 0 ? (
                      <span className="ml-2 py-[3px] px-[9px] text-white text-sm font-bold rounded-full bg-primary">
                        {cartCount}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
              </li>
            )}
          </ul>

          {user.isLoading ? (
            <div>loading...</div>
          ) : user?.user ? (
            <div className="cta flex items-center flex-col md:flex-row justify-center gap-5 md:gap-7">
              <Link href="/api/auth/logout">
                <button className="bg-white text-primary font-bold px-6 py-2 rounded-lg">
                  Logout
                </button>
              </Link>
            </div>
          ) : (
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
          )}
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
        <nav className="top-10 right-0 py-5 shadow-md w-[100%] text-white absolute flex flex-col justify-center h-auto bg-primary items-center md:hidden">
          <ul className="flex flex-col items-center gap-5 ">
            <li onClick={() => setOpenNav(false)}>
              <Link href="/">Home</Link>
            </li>
            <li onClick={() => setOpenNav(false)}>About</li>

            <li onClick={() => setOpenNav(false)}>
              <Link href="/order">All Items</Link>
            </li>
            <li onClick={() => setOpenNav(false)}>
              <Link href="/myorders">My Orders</Link>
            </li>

            <li className="" onClick={() => setOpenNav(false)}>
              <Link href="/cart">
                <div className="bg-white text-black py-2 px-5 rounded-full text-[17px] flex items-center">
                  Cart
                  {cartCount !== 0 ? (
                    <span className="ml-2 py-[3px] px-[9px] text-white text-sm font-bold rounded-full bg-primary">
                      {cartCount}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </Link>
            </li>
          </ul>

          <div className="cta mt-10 flex flex-col items-center">
            {user.isLoading ? (
              <div>loading...</div>
            ) : user?.user ? (
              <div className="cta flex items-center flex-col md:flex-row justify-center gap-5 md:gap-7">
                <Link href="/api/auth/logout">
                  <button className="bg-white text-primary font-bold px-6 py-2 rounded-lg">
                    Logout
                  </button>
                </Link>
              </div>
            ) : (
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
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
