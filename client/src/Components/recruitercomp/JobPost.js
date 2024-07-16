import React, { useContext,useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";


export default function JobPost({ fetchPendingJobPostings }) {
  const { user } = useContext(UserContext);
  const [jobCreatorId, setJobCreatorId] = useState();
  const [jobcreatorEmail, setJobcreatorEmail] = useState();
  const [jobTitle, setJobTitle] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [requiredExperience, setRequiredExperience] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [error, setError] = useState("");
  
  //access check
  const [accessCreateJobPost, setAccessCreateJobPost] = useState(false);

  useEffect(() => {
    // Fetch the current state of create_user_account from the backend
    const fetchCreateJobPostAccess = async () => {
      try {
        const response = await axios.get('/access/getcreatejobpostaccess');
        setAccessCreateJobPost(response.data.create_job_post);
      } catch (error) {
        console.error('Error fetching create user account state:', error);
      }
    };

    fetchCreateJobPostAccess();
  }, []);

  useEffect(() => {
    if (user && user.email) {
      setJobcreatorEmail(user.email);
      setJobCreatorId(user._id);
    }
  }, [user]);
  

  const clearForm = () => {
    setJobTitle("");
    setVacancies("");
    setDescription("");
    setSalary("");
    setRequiredExperience("");
    setRequiredSkills("");
  };

  const jobposting = async (e) => {
    e.preventDefault();

    //recruiter access
    if (!accessCreateJobPost) {
      toast.error('Admin blocked temporarily');
      return;
    }
    
    try {
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
      }else{
        
      // Split required skills by comma to create an array
      const skillsArray = requiredSkills.split(",");

      const formData = {
        jobCreatorId,
        jobcreatorEmail,
        jobTitle,
        vacancies,
        description,
        salary,
        requiredExperience,
        requiredSkills: skillsArray, // Use the array of skills
      };

      await axios.post("/job/createJobPosting", formData);
      console.log("Form data submitted successfully");
      toast.success('Form data submitted successfully');
      fetchPendingJobPostings();
      clearForm();
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      setError(
        error.response.data.error ||
          "An error occurred while submitting the form"
      );
    }
  };

  // Basic validation check
  const isFormValid =
    jobTitle &&
    vacancies &&
    description &&
    salary &&
    requiredExperience &&
    requiredSkills;

    

  return (
    <div>
      <div className="text-left pl-[6%]">
        <form onSubmit={jobposting}>
          <div className="flex w-full p-4">
            <div className="w-[50%]">
              <div className="mb-3">
                <label htmlFor="jobTitle">Job Title</label>
              </div>
              <input
                type="text"
                id="jobTitle"
                placeholder="Type here..."
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]"
              />
            </div>
            <div className="w-[50%]">
              <div className="mb-3">
                <label htmlFor="vacancies">Available Vacancies</label>
              </div>
              <input
                type="number"
                id="vacancies"
                placeholder="Type here..."
                value={vacancies}
                onChange={(e) => setVacancies(e.target.value)}
                className="rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]"
              />
            </div>
          </div>
          <div className=" p-4">
            <div className="mb-3">
              <label htmlFor="description">Job Description</label>
            </div>
            <textarea
              id="description"
              cols="160"
              rows="5"
              placeholder="Type here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-[10px] px-4 py-2 bg-white bg-opacity-5"
            ></textarea>
          </div>
          <div className="flex p-4 ">
            <div className="w-[50%]">
              <div className="mb-3">
                <label htmlFor="salary">Salary Package</label>
              </div>
              <input
                type="number"
                id="salary"
                placeholder="Type here..."
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]"
              />
            </div>
            <div className="w-[50%]">
              <div className="mb-3">
                <label htmlFor="requiredExperience">
                  Required Experience (Years)
                </label>
              </div>
              <input
                type="number"
                id="requiredExperience"
                placeholder="Type here..."
                value={requiredExperience}
                onChange={(e) => setRequiredExperience(e.target.value)}
                className="rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]"
              />
            </div>
          </div>
          <div className=" p-4">
            <div className="mb-3">
              <label htmlFor="requiredSkills">
                Required Skills (comma separated)
              </label>
            </div>
            <textarea
              id="requiredSkills"
              cols="160"
              rows="5"
              placeholder="Type here..."
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              className="rounded-[10px] w-fit px-4 py-2 bg-white bg-opacity-5"
            ></textarea>{" "}
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="button"
              onClick={clearForm}
              className="bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] mr-5 "
            >
              Clear
            </button>
            <button
              type="submit"
              className={`bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] ${
                isFormValid ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Submit
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
