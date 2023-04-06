import Image from "next/image";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "next/router";

dayjs.extend(customParseFormat);

const JobCard = (props) => {
  const router = useRouter();

  const {
    id,
    jobTitle,
    jobFunction,
    jobType,
    experience,
    salary,
    jobExpiresIn,
    createdAt,
    expiringAt,
    skills,
    companyLogo,
    location,
  } = props.jobDetail;

  const allSkills = skills.split(",") || skills;

  const remainingDays = dayjs(expiringAt, "DD-MM-YYYY").diff(
    dayjs(createdAt, "DD-MM-YYYY"),
    "day"
  );

  const goToJobDetail = () => {
    router.push(`jobs/${id}`);
  };

  return (
    <div
      onClick={goToJobDetail}
      className="p-6 bg-white flex flex-col items-center hover:bg-gray-100 hover:cursor-pointer hover:drop-shadow-lg w-[400px] min-w-[400px]"
    >
      <div className="w-full flex justify-between">
        <div className="border rounded-full h-fit bg-green-600 text-white pr-2 pl-2">
          {jobType}
        </div>
        <div className="flex flex-col items-end">
          <div>{expiringAt}</div>
          <span className="text-[12px]">{`${remainingDays} days left`}</span>
        </div>
      </div>
      <Image src={companyLogo} alt={jobTitle} height={100} width={100} />
      <div className="font-bold text-lg">{jobTitle}</div>
      <div className="text-sm text-cyan-600">{location}</div>
      <div className="flex justify-center text-center mt-3 mb-2 text-gray-600">
        {jobFunction}
      </div>
      <div className="flex gap-2 mt-2 mb-2">
        {allSkills.map((item, i) => (
          <div
            key={i}
            className="w-fit pl-3 pr-3 border-black border-2 rounded-full"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="w-full flex justify-between mt-3">
        <div className="rounded-sm pl-3 pr-3 bg-gray-300">{`${experience} years`}</div>
        <div className="rounded-sm pl-3 pr-3 bg-gray-300">{`${salary} LPA`}</div>
      </div>
    </div>
  );
};

export { JobCard };
