import React, { useEffect, useState } from "react";

import JobPost from "../../Components/recruitercomp/JobPost";
import PendingJobs from "../../Components/recruitercomp/PendingJobs";
import ApprovedJobs from "../../Components/recruitercomp/ApprovedJobs";

import axios from "axios";

export default function JobPosting() {
  const [state, setState] = useState(1);
  const [jobPostings, setJobPostings] = useState([]);

  const fetchPendingJobPostings = async () => {
    axios
      .get("/job/getAllPendingJobPostings")
      .then((response) => {
        setJobPostings(response.data);
      })
      .catch((error) => {
        console.log("Error fetching pending job postings:", error);
      });
  };

  const action = (index) => {
    setState(index);
  };

  useEffect(() => {
    fetchPendingJobPostings();
  }, []);

  return (
    <div className="w-full bg-[#191919] pl-5 pr-5">
      <div className="w-full bg-[#525252] h-200 rounded-[30px]">
        <div className="flex items-center justify-between bg-[#2B2B2B] bg-opacity-90 w-full h-20 rounded-t-[30px] text-center text-[18px]">
          <div
            onClick={() => action(1)}
            className={`text-center flex-1 cursor-pointer ${
              state === 1
                ? "bg-[#2B2B2B] text-white h-full flex items-center justify-center rounded-tl-[30px]"
                : "text-white opacity-25"
            }`}
          >
            Job Posting
          </div>
          <div
            onClick={() => action(2)}
            className={`text-center flex-1 cursor-pointer ${
              state === 2
                ? "bg-[#2B2B2B] text-white h-full flex items-center justify-center"
                : "text-white opacity-25"
            }`}
          >
            Pending Jobs
          </div>
          <div
            onClick={() => action(3)}
            className={`text-center flex-1 cursor-pointer ${
              state === 3
                ? "bg-[#2B2B2B] text-white h-full flex items-center justify-center rounded-tr-[30px]"
                : "text-white opacity-25"
            }`}
          >
            Approved Jobs
          </div>
        </div>

        <div>
          <div
            className={`pl-5 pr-5 pb-5 ${
              state === 1
                ? "bg-[#2B2B2B] text-white rounded-b-[30px]"
                : "hidden"
            }`}
          >
            <JobPost fetchPendingJobPostings={fetchPendingJobPostings} />
          </div>
          <div
            className={`p-5  ${
              state === 2
                ? "bg-[#2B2B2B] text-white rounded-b-[30px]"
                : "hidden"
            }`}
          >
            <PendingJobs
              jobPostings={jobPostings}
              setJobPostings={setJobPostings}
              fetchPendingJobPostings={fetchPendingJobPostings}
            />
          </div>
          <div
            className={`p-5  ${
              state === 3
                ? "bg-[#2B2B2B] text-white rounded-b-[30px]"
                : "hidden"
            }`}
          >
            <ApprovedJobs />
          </div>
        </div>
      </div>

    </div>
  );
}
