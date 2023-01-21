import { Sora } from "@next/font/google";
import Head from "next/head";

const sora = Sora({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Food Ordering App</title>
        <meta name="description" content="Order fresh food online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className={`${sora.className} text-3xl font-bold`}>hello world</p>
    </>
  );
}
