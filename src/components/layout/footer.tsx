import Link from "next/link";
const Footer = () => {
  // const currentYear = new Date().getFullYear()
  const currentYear = new Date().getUTCFullYear();
  return (
    <footer className="bg-primary w-full h-[80px] flex items-center text-white p-6 md:p-9 md:px-11 mt-auto">
      <p className="w-full text-center">
        &copy;{currentYear} <Link href="/">Food Express</Link>
      </p>
    </footer>
  );
};

export default Footer;
