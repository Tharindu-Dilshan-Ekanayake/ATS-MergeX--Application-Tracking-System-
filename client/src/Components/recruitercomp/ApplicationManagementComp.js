import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { FaRegFilePdf } from "react-icons/fa6";

export default function ApplicationManagementComp() {
  const { user, users } = useContext(UserContext);
  const [jobGroups, setJobGroups] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCv, setShowCv] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleModalClose = () => {
    setShowCv(false);
    setSelectedApplication(null);
  };

  const handleApplicationClick = (app) => {
    setSelectedApplication(app);
    setShowCv(true);
    
  };

  const getJobs = async () => {
    try {
      const response = await axios.get('/job/getAllApprovedJobPostings');
      setJobDetails(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const getJobGroups = async () => {
    try {
      const response = await axios.get('/cv/getjobgroup');
      setJobGroups(response.data);
      handleModalClose()
    } catch (error) {
      console.error('Error fetching job groups:', error);
    }
  };

  const approveApplication = async (id) => {
    try {
      await axios.put(`/cv/approveapplication/${id}`, { approval: true });
      console.log('Application approved');
      // After approval, fetch updated job groups
      getJobGroups();
      handleModalClose();
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  const rejectApplication = async (id) => {
    try {
      await axios.put(`/cv/rejectapplication/${id}`, { approval: false });
      console.log('Application rejected');
      // After approval, fetch updated job groups
      getJobGroups();
      handleModalClose();
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  useEffect(() => {
    getJobGroups();
    getJobs();
  }, []);

  const handleJobClick = (job_id) => {
    setSelectedJob(prevSelectedJob => prevSelectedJob === job_id ? null : job_id);
  };

  const renderApplications = (applications, type) => {
    const filteredApps = applications.filter(app => {
      if (type === 'new') return !app.approval && !app.rejected;
      if (type === 'rejected') return app.rejected;
      if (type === 'accepted') return app.approval && !app.rejected;
      return false;
    });

    return filteredApps.map(app => {
      const matchedUser = users.find(u => u._id === app.user_id);
      return (
        <div
          key={app._id}
          className="flex  items-center justify-center pt-2 pb-2 mt-1 mb-2 cursor-pointer"
          onClick={() => handleApplicationClick(app)}
        >
          <div className='flex items-center bg-[#1e1e1e] rounded-2xl w-[250px] justify-center pt-2 pb-2'>
            {matchedUser && matchedUser.image && (
              <img 
                src={matchedUser.image} 
                alt={`${matchedUser.fname} ${matchedUser.lname}`} 
                className="w-12 h-12 mr-2 border-2 border-orange-500 rounded-full"
              />
            )}
            <div>
              <h1 className='text-left'>
                {matchedUser && `  ${matchedUser.fname} `}
              </h1>
              <h1 className='text-[13px] opacity-40'>
                {app.user_email}
              </h1>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className='w-full bg-[#191919] pl-5 pr-5' >
        <div className='w-full bg-[#525252] h-200 rounded-[30px]'>
          <div className='flex'>

        {/* Job List Column */}
        <div className='w-1/4  border-solid border-r-[3px]' style={{borderImage: 'linear-gradient(to bottom, #383838,rgb(56, 56, 56,0)) 1'}} >
          <div className='h-[60px] bg-[#1b1b1b] rounded-tl-[30px] flex items-center justify-center'>
            <h1>Job List</h1>
          </div>
          <div className='bg-[#1b1b1b] rounded-bl-[30px] h-[730px] overflow-y-auto pr-3'>
            {jobGroups.map((jobGroup) => {
              const jobDetail = jobDetails.find(job => job._id === jobGroup.job_id);
              const isSelected = selectedJob === jobGroup.job_id;
              return (
                <div
                  key={jobGroup.job_id}
                  className={`p-2 cursor-pointer border-b border-gray-500 ${isSelected ? 'bg-[#272727]' : 'hover:bg-[#27272767]'}`}
                  onClick={() => handleJobClick(jobGroup.job_id)}
                >
                  <p className={`${isSelected ? 'opacity-100 text-[18px]' : 'opacity-50 text-[18px] '}`}>
                    {jobDetail ? jobDetail.jobTitle : jobGroup.job_id}
                  </p>
                  <p className={`${isSelected ? 'opacity-50' : 'opacity-20 '}`}>
                    applications: {jobGroup.count}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* New Applications Column */}
        <div className='w-1/4 bg-[#2B2B2B] border-solid border-r-[3px]' style={{borderImage: 'linear-gradient(to bottom, #383838,rgb(56, 56, 56,0)) 1'}}>
          <div className='h-[60px] bg-[#1b1b1b] flex items-center justify-center'>
            <h1>New</h1>
          </div>
          <div className='h-[730px]'>
            <div className=' h-[650px] overflow-y-auto'>
              {selectedJob && renderApplications(
                jobGroups.find(jg => jg.job_id === selectedJob).applications,
                'new'
              )}
            </div>
          </div>
          
        </div>

        {/* Rejected Applications Column */}
        <div className='w-1/4 bg-[#2B2B2B] border-solid border-r-[3px]' style={{borderImage: 'linear-gradient(to bottom, #383838,rgb(56, 56, 56,0)) 1'}}>
          <div className='h-[60px] bg-[#1b1b1b] flex items-center justify-center'>
            <h1>Rejected</h1>
          </div>
          <div className='h-[650px] overflow-y-auto'>
            {selectedJob && renderApplications(
              jobGroups.find(jg => jg.job_id === selectedJob).applications,
              'rejected'
            )}
          </div>
        </div>

        {/* Accepted Applications Column */}
        <div className='w-1/4 bg-[#2B2B2B] rounded-tr-[30px] rounded-br-[30px]'>
          <div className='h-[60px] bg-[#1b1b1b] rounded-tr-[30px] flex items-center justify-center'>
            <h1>Accepted</h1>
          </div>
          <div className='h-[650px] overflow-y-auto'>
            {selectedJob && renderApplications(
              jobGroups.find(jg => jg.job_id === selectedJob).applications,
              'accepted'
            )}
          </div>
        </div>

        {/* Modal for Application Details */}
        {showCv && selectedApplication && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[500px] w-[700px] border-orange-700 border-[1px]">
              <button
                className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                onClick={handleModalClose}
              >
                <IoMdClose className="text-white hover:text-red-700" />
              </button>
              <div>
                <h2 className="mb-4 text-2xl">Application Details</h2>
              </div>
              <div className='flex justify-center  bg-gradient-to-r from-[#272727] to-[#19191b] rounded-lg'>
                {selectedApplication.user_id && (
                  <>
                    
                    <div className=''>
                    {users.filter(u => u._id === selectedApplication.user_id).map(matchedUser => (
                      <div key={matchedUser._id} className='flex items-center text-left '>
                        <div className='pr-2'>
                          {matchedUser.image && <img src={matchedUser.image} alt="UserImage" className=" border-2 border-orange-500 rounded-full size-[150px]" />}
                        </div>
                        
                        <div className='pl-2'>
                          <div className='flex'>
                            <p className='opacity-60'>Name </p>
                            <p className=''>: {matchedUser.fname} {matchedUser.lname}</p>
                          </div>
                          
                          <div>
                            
                            <p className='opacity-60'>Contact : </p>
                            <p className='pl-6 opacity-50'>{matchedUser.email}</p>
                            <p className='pl-6 opacity-50'>{matchedUser.phone_number}</p>
                          </div>
                          
                        </div>
                      </div>
                    ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className='flex justify-end mt-12 '>
                
                <div className=' w-[150px] justify-center  bg-[#2a2a2a] h-[120px] rounded-lg '>
                  <div className='pt-2 pb-4'>
                    <h1 className='text-orange-500'>Download CV </h1>
                  </div>
                  <div className='flex justify-center'>
                    <a href={selectedApplication.cv} download={selectedApplication.cv} className=""><FaRegFilePdf className='size-[50px] hover:text-orange-500 ' /></a>
                  </div>
                </div>   
              </div>

              <div className='flex justify-center pt-5'>
                {/* Conditionally render buttons based on application status */}
                {selectedApplication && (
                  <div className='px-4'>
                    {!selectedApplication.approval && !selectedApplication.rejected && (
                      <>
                        <button
                          className='h-12 bg-orange-500 w-[150px] rounded-lg hover:bg-slate-400'
                          onClick={() => approveApplication(selectedApplication._id)}
                        >
                          Accept
                        </button>
                        <button
                          className='ml-4 h-12 bg-orange-500 w-[150px] rounded-lg hover:bg-slate-400'
                          onClick={() => rejectApplication(selectedApplication._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {selectedApplication.approval && !selectedApplication.rejected && (
                      <button
                        className='h-12 bg-orange-500 w-[150px] rounded-lg hover:bg-slate-400'
                        onClick={() => rejectApplication(selectedApplication._id)}
                      >
                        Reject
                      </button>
                    )}
                    {!selectedApplication.approval && selectedApplication.rejected && (
                      <button
                        className='h-12 bg-orange-500 w-[150px] rounded-lg hover:bg-slate-400'
                        onClick={() => approveApplication(selectedApplication._id)}
                      >
                        Accept
                      </button>
                    )}
                  </div>
  )}
</div>

              
              
            </div>
          </div>
        )}

</div>
        </div>
      </div>
    </div>
  );
}
