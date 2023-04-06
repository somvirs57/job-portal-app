import React, { useEffect } from "react";
import Head from "next/head";
import { JobForm, Navbar } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create New Job | Job Listing</title>
        <meta
          name="description"
          content="Discover the latest job listings and opportunities from top companies in your desired field. Apply now and take the next step in your career."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center w-full h-full bg-gray-200">
        <Navbar />
        <div className="m-20 w-[50%] flex justify-center">
          <JobForm />
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </main>
    </>
  );
}
