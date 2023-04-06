import React, { useEffect, useState } from "react";
import { getAllJobs } from "@/firebase";
import { Navbar, JobCard } from "@/components";

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
    <div className="bg-gray-200 ">
      <Navbar />
      <div className="m-4">
        {loadingError && <div>{loadingError}</div>}
        <div className="flex gap-2 flex-wrap">
          {allJobs.length > 0 &&
            allJobs.map((item) => <JobCard key={item.id} jobDetail={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
