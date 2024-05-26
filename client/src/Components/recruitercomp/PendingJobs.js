import React, { useState, useEffect } from "react";
import axios from "axios";
import { PiBriefcase } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-hot-toast";

export default function PendingJobs({ jobPostings, setJobPostings, fetchPendingJobPostings}) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [editModeJobs, setEditModeJobs] = useState({});

  useEffect(() => {
    axios.get("/job/getAllPendingJobPostings")
      .then((response) => {
        setJobPostings(response.data);
      })
      .catch((error) => {
        console.log("Error fetching pending job postings:", error);
      });
  }, [setJobPostings]);

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
    console.log("Clicked");
    const { jobTitle, vacancies, description, salary, requiredExperience } =
      selectedJob;

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
      axios
        .put(`/job/updateJobPosting/${selectedJob._id}`, selectedJob)
        .then((response) => {
          console.log(response.data);
          setJobPostings((prevState) => {
            var updatedJobPostings = prevState.map((job) => {
              if (job._id === selectedJob._id) {
                return response.data;
              }
              return job;
            });
            console.log(updatedJobPostings);
            return updatedJobPostings;
          });
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
        toast.error('Failed to delete job psot. Please try again later.');
      });
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        margin: 0,
        textAlign: "left",
        maxHeight: "600px",
      }}
    >
      <div style={{ width: "32.5%", margin: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", width: "95%" }}>
          {jobPostings.map((job) => (
            <div
              key={job._id}
              className="meeting_container"
              style={{
                width: "100%",
                display: "flex",
                padding: "10px",
                borderBottom: "1px solid white",
                cursor: "pointer",
              }}
            >
              <div
                className="title"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex">
                  <PiBriefcase
                    size={25}
                    className={`text-white ${
                      editModeJobs[job._id] ? "1" : "opacity-25"
                    }`}
                  />
                  <p
                    style={{ fontSize: 14 }}
                    className={`text-white ${
                      editModeJobs[job._id] ? "1" : "opacity-25"
                    }`}
                    onClick={() => handleJobBarClick(job)}
                  >
                    {job.jobTitle}
                  </p>
                </div>
                <div className="flex">
                {selectedJob &&  selectedJob._id === job._id && (
                  <>
                  <div>
                    <FaRegEdit
                      size={25}
                      style={{ opacity: editModeJobs[job._id] ? 1 : 0.25 }}
                      className={`text-white cursor-pointer`}
                      onClick={() => toggleEditMode(job._id)}
                    />
                  </div>

                  <div>
                      <RiDeleteBinLine
                          size={25}
                          className="text-white opacity-25 cursor-pointer"
                          onClick={handleDeleteClick}
                      />
                  </div>
                </>
                )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          width: "67.5%",
          borderLeft: "1px solid rgb(234, 113, 34, 0.25) ",
        }}
      >
        {selectedJob && (
          <div>
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
                    className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]`}
                    style={{
                      opacity: editModeJobs[selectedJob._id] ? 1 : 0.25,
                    }}
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
                    className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]`}
                    style={{
                      opacity: editModeJobs[selectedJob._id] ? 1 : 0.25,
                    }}
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
                  className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[90%]`}
                  style={{ opacity: editModeJobs[selectedJob._id] ? 1 : 0.25 }}
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
                    className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]`}
                    style={{
                      opacity: editModeJobs[selectedJob._id] ? 1 : 0.25,
                    }}
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
                    className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]`}
                    style={{
                      opacity: editModeJobs[selectedJob._id] ? 1 : 0.25,
                    }}
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
                  className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[90%]`}
                  style={{ opacity: editModeJobs[selectedJob._id] ? 1 : 0.25 }}
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
