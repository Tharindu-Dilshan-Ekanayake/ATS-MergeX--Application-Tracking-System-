import React, { useState, useEffect } from "react";
import axios from "axios";
import { PiBriefcase } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-hot-toast";

export default function PendingJobs({ pendingJobs, setPendingJobs, fetchPendingJobPostings }) {
  // const [pendingJobs, setPendingJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editModeJobs, setEditModeJobs] = useState({});

  useEffect(() => {
    axios.get("/job/getAllPendingJobPostings")
      .then((response) => {
        setPendingJobs(response.data);
      })
      .catch((error) => {
        console.log("Error fetching pending job postings:", error);
      });

    axios.get("/job/getAllRejectedJobPostings")
      .then((response) => {
        setRejectedJobs(response.data);
      })
      .catch((error) => {
        console.log("Error fetching rejected job postings:", error);
      });
  }, [setPendingJobs, setRejectedJobs]);

  const toggleEditMode = (jobId) => {
    setEditModeJobs((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };

  const handleJobBarClick = (job) => {
    setSelectedJob(job);
    setEditModeJobs({});
  };

  const handleInputChange = (e, field) => {
    if (field === "requiredSkills") {
      const skillsArray = e.target.value.split("\n");
      setSelectedJob((prevState) => ({ ...prevState, [field]: skillsArray }));
    } else {
      setSelectedJob((prevState) => ({
        ...prevState,
        [field]: e.target.value,
      }));
    }
  };

  const handleSaveClick = () => {
    const { jobTitle, vacancies, description, salary, requiredExperience } = selectedJob;
  
    if (!jobTitle) {
      toast.error("Please fill in the Job Title field.");
    } else if (!vacancies) {
      toast.error("Please fill in the Available Vacancies field.");
    } else if (!description) {
      toast.error("Please fill in the description field.");
    } else if (!salary) {
      toast.error("Please fill in the Salary Package field.");
    } else if (!requiredExperience) {
      toast.error("Please fill in the Required Experience (Years) field.");
    } else if (vacancies < 0 || salary < 0 || requiredExperience < 0) {
      toast.error("Number fields cannot have negative values.");
    } else {
      const updatedJob = {
        ...selectedJob,
        pending: true,
        rejected: false,
        improvements: ""
      };
  
      axios
        .put(`/job/updateJobPosting/${selectedJob._id}`, updatedJob)
        .then((response) => {
          fetchPendingJobPostings();
          if (selectedJob.pending) {
            setPendingJobs((prevState) => {
              const updatedJobPostings = prevState.map((job) => {
                if (job._id === selectedJob._id) {
                  return response.data;
                }
                return job;
              });
              return updatedJobPostings;
            });
          } else {
            setRejectedJobs((prevState) => {
              const updatedRejectedJobPostings = prevState.filter((job) => job._id !== selectedJob._id);
              setPendingJobs((prevState) => [...prevState, response.data]);
              return updatedRejectedJobPostings;
            });
          }
          setSelectedJob(null);
          setEditModeJobs({});
          toast.success("Job Post updated successfully!");
        })
        .catch((error) => {
          console.log("Error updating job post:", error);
          toast.error("Failed to update job post. Please try again later.");
        });
    }
  };
  
  const handleCancelClick = () => {
    setSelectedJob(null);
    setEditModeJobs({});
  };

  const handleDeleteClick = () => {
    axios.delete(`/job/deleteJobPosting/${selectedJob._id}`)
      .then(() => {
        fetchPendingJobPostings();
        toast.success('Job Post deleted successfully!');
        setSelectedJob(null);
        setEditModeJobs({});
      })
      .catch((error) => {
        console.log('Error deleting job post:', error);
        toast.error('Failed to delete job post. Please try again later.');
      });
  };

  return (
    <div className="flex w-full h-full m-0 text-left">
      <div className="flex flex-col w-[32.5%]">
        <div className="flex flex-col w-[95%] h-[60%] max-h-[60%] overflow-y-scroll pr-2">
          <h2 className="text-white text-lg mb-4">Pending Jobs</h2>
          {pendingJobs.map((job) => (
            <div
              key={job._id}
              className={`meeting_container w-full flex cursor-pointer border-b border-gray-500 hover:bg-gray-100 hover:bg-opacity-10 p-[10px] ${
                selectedJob && selectedJob._id === job._id ? 'bg-[#BABABA] bg-opacity-20 opacity-100' : 'hover:bg-gray-300'
              }`}
              onClick={() => handleJobBarClick(job)}
            >
              <div className="title w-full flex justify-between">
                <div className="flex">
                  <PiBriefcase
                    size={25}
                    className={`text-white ${
                      selectedJob && selectedJob._id === job._id ? "opacity-100" : "opacity-25"
                    }`}
                  />
                  <p
                    className={`text-[14px] text-white ${
                      selectedJob && selectedJob._id === job._id ? "opacity-100" : "opacity-25"
                    }`}
                  >
                    {job.jobTitle}
                  </p>
                </div>
                <div className="flex">
                  {selectedJob && selectedJob._id === job._id && (
                    <>
                      <div>
                        <FaRegEdit
                          size={25}
                          className={`text-white cursor-pointer ${
                            editModeJobs[job._id] ? "opacity-100" : "opacity-25"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleEditMode(job._id);
                          }}
                        />
                      </div>
                      <div>
                        <RiDeleteBinLine
                          size={25}
                          className="text-white cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick();
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {pendingJobs.length === 0 && (
            <p className="text-white opacity-25 text-center mt-4">No pending jobs found</p>
          )}
        </div >
        <div className="flex flex-col w-[95%] h-[40%] max-h-[40%] overflow-y-scroll pr-2 mt-5">  
          <h2 className="text-white text-lg mb-4 mt-8">Rejected Jobs</h2>
          {rejectedJobs.map((job) => (
            <div
              key={job._id}
              className={`meeting_container w-full flex cursor-pointer border-b border-gray-500 hover:bg-gray-100 hover:bg-opacity-10 p-[10px] ${
                selectedJob && selectedJob._id === job._id ? 'bg-[#BABABA] bg-opacity-20 opacity-100' : 'hover:bg-gray-300'
              }`}
              onClick={() => handleJobBarClick(job)}
            >
              <div className="title w-full flex justify-between">
                <div className="flex">
                  <PiBriefcase
                    size={25}
                    className={`text-white ${
                      selectedJob && selectedJob._id === job._id ? "opacity-100" : "opacity-25"
                    }`}
                  />
                  <p
                    className={`text-[14px] text-white ${
                      selectedJob && selectedJob._id === job._id ? "opacity-100" : "opacity-25"
                    }`}
                  >
                    {job.jobTitle}
                  </p>
                </div>
                <div className="flex">
                  {selectedJob && selectedJob._id === job._id && (
                    <>
                      <div>
                        <FaRegEdit
                          size={25}
                          className={`text-white cursor-pointer ${
                            editModeJobs[job._id] ? "opacity-100" : "opacity-25"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleEditMode(job._id);
                          }}
                        />
                      </div>
                      <div>
                        <RiDeleteBinLine
                          size={25}
                          className="text-white cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick();
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {rejectedJobs.length === 0 && (
            <p className="text-white opacity-25 text-center mt-4">No rejected jobs found</p>
          )}
        </div>
      </div>

      <div className="w-[67.5%] h-full max-h-full overflow-y-scroll pr-2 ">
        {selectedJob && (
          <div>
            {selectedJob.rejected && (
              <div className="w-full p-4">
                <div className="mb-3">
                  <label>Improvements</label>
                </div>
                <div>
                  <textarea
                    value={selectedJob.improvements}
                    readOnly
                    className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[90%] ${
                      editModeJobs[selectedJob._id] ? "opacity-25" : "opacity-100"
                    }`}
                  />
                </div>
              </div>
            )}
            <div className="flex w-full p-4">
              <div className="w-[50%]">
                <div className="mb-3">
                  <label>Job Title</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={selectedJob.jobTitle}
                    onChange={(e) => handleInputChange(e, "jobTitle")}
                    className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%] ${
                      editModeJobs[selectedJob._id] ? "opacity-100" : "opacity-25"
                    }`}
                    disabled={!editModeJobs[selectedJob._id]}
                  />
                </div>
              </div>
              <div className="w-[50%]">
                <div className="mb-3">
                  <label>Available Vacancies</label>
                </div>
                <div>
                  <input
                    type="number"
                    value={selectedJob.vacancies}
                    onChange={(e) => handleInputChange(e, "vacancies")}
                    className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%] ${
                      editModeJobs[selectedJob._id] ? "opacity-100" : "opacity-25"
                    }`}
                    disabled={!editModeJobs[selectedJob._id]}
                    min="0"
                  />
                </div>
              </div>
            </div>
            <div className="w-full p-4">
              <div className="mb-3">
                <label>Job Description</label>
              </div>
              <div>
                <textarea
                  value={selectedJob.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[90%] ${
                    editModeJobs[selectedJob._id] ? "opacity-100" : "opacity-25"
                  }`}
                  disabled={!editModeJobs[selectedJob._id]}
                />
              </div>
            </div>
            <div className="flex w-full p-4 ">
              <div className="w-[50%]">
                <div className="mb-3">
                  <label>Salary Package</label>
                </div>
                <div>
                  <input
                    type="number"
                    value={selectedJob.salary}
                    onChange={(e) => handleInputChange(e, "salary")}
                    className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%] ${
                      editModeJobs[selectedJob._id] ? "opacity-100" : "opacity-25"
                    }`}
                    disabled={!editModeJobs[selectedJob._id]}
                    min="0"
                  />
                </div>
              </div>
              <div className="w-[50%]">
                <div className="mb-3">
                  <label>Required Experience (Years)</label>
                </div>
                <div>
                  <input
                    type="number"
                    value={selectedJob.requiredExperience}
                    onChange={(e) => handleInputChange(e, "requiredExperience")}
                    className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%] ${
                      editModeJobs[selectedJob._id] ? "opacity-100" : "opacity-25"
                    }`}
                    disabled={!editModeJobs[selectedJob._id]}
                    min="0"
                  />
                </div>
              </div>
            </div>
            <div className="w-full p-4">
              <div className="mb-3">
                <label>Required Skills</label>
              </div>
              <div>
                <textarea
                  rows="5"
                  value={selectedJob.requiredSkills.join("\n")}
                  onChange={(e) => handleInputChange(e, "requiredSkills")}
                  className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[90%] ${
                    editModeJobs[selectedJob._id] ? "opacity-100" : "opacity-25"
                  }`}
                  disabled={!editModeJobs[selectedJob._id]}
                />
              </div>
            </div>
            {editModeJobs[selectedJob._id] && (
              <div className="flex justify-center w-[100%] ">
                <button
                  onClick={handleSaveClick}
                  className="bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] mr-5"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] mr-5"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
