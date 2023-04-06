import React, { useEffect, useState } from "react";
import { getAllJobs } from "@/firebase";
import { Navbar, JobCard } from "@/components";
import Head from "next/head";

const Jobs = (props) => {
  const [allJobs, setAllJobs] = useState([]);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobData = await getAllJobs();
        setAllJobs(jobData);
      } catch (error) {
        setLoadingError(error.message);
      }
    };
    getJobs();
  }, []);

  return (
    <>
      <Head>
        <title>All Jobs | Job Listing</title>
        <meta
          name="description"
          content="All available job listings and opportunities from top companies in your desired field. Apply now"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-200 h-[100vh]">
        <Navbar />
        <div className="m-4">
          {loadingError && <div>{loadingError}</div>}
          <div className="flex gap-2 flex-wrap">
            {allJobs.length > 0 &&
              allJobs.map((item) => <JobCard key={item.id} jobDetail={item} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
