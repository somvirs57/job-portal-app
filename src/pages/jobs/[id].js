import { Navbar } from "@/components";
import { getAllJobs, getJobById } from "@/firebase";
import { JobForm } from "@/components";

export async function getStaticPaths() {
  const allJobs = await getAllJobs();
  return {
    paths: allJobs.map((job) => {
      return {
        params: {
          id: job.id,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const jobDetails = await getJobById(params.id);
  return {
    props: {
      jobId: params.id,
      jobDetails: jobDetails.data(),
    },
  };
}

const JobDetail = (props) => {
  const { jobDetails, jobId } = props;
  return (
    <main className="flex flex-col items-center w-full bg-gray-200">
      <Navbar />
      <div className="m-20 w-[50%] flex justify-center">
        <JobForm jobData={{ ...jobDetails, jobId }} updateRequired />
      </div>
    </main>
  );
};

export default JobDetail;
