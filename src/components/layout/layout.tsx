import Header from "./header";
import Footer from "./footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Sora } from "@next/font/google";
import ConfirmEmail from "../Banner/confirmEmail";
import { useUser } from "@auth0/nextjs-auth0/client";

const sora = Sora({ subsets: ["latin"] });
interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  const user = useUser();

  return (
    <>
      {user && user.user !== undefined && <ConfirmEmail />}
      <Header />
      {/* <main className="p-6 md:p-9 md:px-11">{children}</main> */}
      {/* <main className={` ${sora.className} p-6 md:p-9 md:px-11`}> */}
      <main className={` ${sora.className}`}>
        {/* <main> */}
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          // pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
