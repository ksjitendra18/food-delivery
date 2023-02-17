import Head from "next/head";

import Features from "../components/homepage/features";
import HeroSection from "../components/homepage/heroSection";
import Trending from "../components/homepage/trending";

export default function Home() {
  return (
    <>
      <Head>
        <title>Food Ordering App</title>
        <meta name="description" content="Order fresh food online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection />
      <Features />
      <Trending />
    </>
  );
}
