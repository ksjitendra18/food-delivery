import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminItems from "../../../components/admin/adminItems";
export default function AllItems() {
  return (
    <section className="md:my-7  md:px-11  p-4">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="flex mb-16 gap-10 justify-between md:justify-start items-center">
        <h2 className="text-primary text-3xl font-bold ">All Items</h2>
        <button className="bg-primary px-4 py-2 md:px-7 md:py-3 text-white font-bold rounded-lg">
          <Link href="/admin/items/add">Add Item</Link>
        </button>
      </div>

      <AdminItems />
    </section>
  );
}
