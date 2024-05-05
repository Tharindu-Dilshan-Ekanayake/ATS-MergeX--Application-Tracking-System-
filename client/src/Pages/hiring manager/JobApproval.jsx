import React, { useState, useEffect } from "react";
import Navbar from "../../Components/hiringManagerComp/Navbar.jsx";
import Topbar from "../../Components/hiringManagerComp/Topbar.jsx";
import PendingJobs from "../../Components/hiringManagerComp/PendingJobs.jsx";
import axios from "axios";

export default function JobApproval() {
  const name = "Kavindrika Piyushan";
  const post = "Hiring Manager";
  const { jsxNavbar, isOpened } = Navbar({ name, post });
  const [jobpostings, setJobPostings] = useState([]);



  useEffect(() => {
    axios
      .get("/job/getAllPendingJobPostings")
      .then((response) => {
        setJobPostings(response.data);
        console.log("Pending job postings:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching pending job postings:", error);
      });
  }, []);

  return (
    <div>
      <div className="bg-[rgb(26,26,26)]">
        <div className="dashboardCover flex flex-row">
          {jsxNavbar}
          <div
            className={` w-[100%] lg:w-[81%] lg:ml-[20%] 2xl:ml-[20%]  xl:w-[100%]   ${
              isOpened
                ? "opacity-[30%] 1300px:opacity-[100%]"
                : "opacity-[100%]"
            } `}
          >
            <Topbar
              msg="Job Approval"
              name="Piyushan"
              post="Hiring Manager"
            ></Topbar>
            <div className="content text-white p-[30px] bg-[linear-gradient(180deg,_rgba(43,_43,_43,_0.5)_0%,_rgba(43,_43,_43,_0)_100%)] m-[30px] h-fit rounded-[30px] ">
              <p className="pb-[20px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem] ">
                Pending jobs
              </p>
              <div>
                <div>
                  {jobpostings.map((jobposting) => (
                    <PendingJobs
                      key={jobposting._id}
                      post={jobposting.jobTitle}
                      date={jobposting.updatedAt}
                      sallary={jobposting.salary}
                      requiredExperience={jobposting.requiredExperience}
                      requiredSkills={jobposting.requiredSkills}
                      vacancies={jobposting.vacancies}
                      description={jobposting.description}
                 
                    ></PendingJobs>
                  ))}
                  {/* <PendingJobs post='Software Engineer' date='2024-06-03' recruiter='Pramudi'></PendingJobs> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden p-[30px] bg-[rgba(43,43,43)] border-[1px] border-[solid] border-[#EA7122] w-[800px] rounded-[30px] mt-[20px] mb-[20px] z-50 fixed top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col  ">
          <div className="flex justify-center">
            <table className="border-separate [border-spacing:10px]">
              <tr className="[border-spacing:0_10px]">
                <td className="text-[rgba(255,255,255,0.75)]">Job title</td>
                <td className="text-[rgba(255,255,255,0.75)]">-</td>
                <td className="text-[rgba(255,255,255,0.75)]">
                  Software Engineer
                </td>
              </tr>
              <tr className="[border-spacing:0_10px]">
                <td className="text-[rgba(255,255,255,0.75)] ">
                  Required experience in years
                </td>
                <td className="text-[rgba(255,255,255,0.75)] ">-</td>
                <td className="text-[rgba(255,255,255,0.75)] ">01</td>
              </tr>
              <tr className="[border-spacing:0_10px]">
                <td className="text-[rgba(255,255,255,0.75)] ">
                  Required skills
                </td>
                <td className="text-[rgba(255,255,255,0.75)] ">-</td>
                <td className="text-[rgba(255,255,255,0.75)] ">Python</td>
              </tr>
              <tr className="[border-spacing:0_10px]">
                <td className="text-[rgba(255,255,255,0.75)] ">Vacancies</td>
                <td className="text-[rgba(255,255,255,0.75)] ">-</td>
                <td className="text-[rgba(255,255,255,0.75)] ">04</td>
              </tr>
            </table>
          </div>
        </div>

        <p className="text-[rgba(255,255,255)] text-center">
          A software engineer is a professional who designs, develops, and
          maintains software applications, systems, and programs. They possess
          expertise in programming languages, algorithms, and problem-solving
          techniques to create efficient and functional software solutions.
          Software engineers collaborate with cross-functional teams, including
          designers and product managers, to understand requirements and deliver
          high-quality software products. They are adept at debugging and
          troubleshooting issues, ensuring the smooth functioning of the
          software throughout its lifecycle. Continuous learning and staying
          updated with emerging technologies are integral aspects of a software
          engineer's role to adapt to the dynamic and evolving landscape of the
          tech industry.
        </p>

        <div className="flex flex-col gap-[15px] mt-[30px] items-center">
          <button
            type="submit"
            className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
          >
            Reject
          </button>
          <button
            type="submit"
            className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
