import React, { useState, useEffect } from 'react';
import { PiBriefcase } from 'react-icons/pi';
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import Card from './Card';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ApprovedJobs() {
    const [jobPostings, setJobPostings] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [hiredCandidatesCount, setHiredCandidatesCount] = useState(0); // State to hold the count

    useEffect(() => {
        fetchJobPostings();
    }, []);

    useEffect(() => {
        if (selectedJob) {
            fetchHiredCandidatesCount(selectedJob._id);
        }
    }, [selectedJob]);

    const fetchJobPostings = () => {
        axios.get('/job/getAllApprovedJobPostings')
            .then(response => {
                setJobPostings(response.data);
            })
            .catch(error => {
                console.log('Error fetching approved job postings:', error);
            });
    };

    const fetchHiredCandidatesCount = (jobId) => {
        axios.get(`/evaluation/getHiredCandidatesCount/${jobId}`)
            .then(response => {
                setHiredCandidatesCount(response.data.count);
            })
            .catch(error => {
                console.log('Error fetching hired candidates count:', error);
            });
    };

    const handleExpiredChange = async (jobId, newExpiredValue) => {
        try {
            await axios.put(`/job/updateExpiredStatus/${jobId}`, { expired: newExpiredValue });
            

            if (selectedJob && selectedJob._id === jobId) {
                setSelectedJob(prevSelectedJob => ({ ...prevSelectedJob, expired: newExpiredValue }));
            }

            if (newExpiredValue) {
                toast.success('Job post marked as expired.');
            } else {
                toast.success('Job post marked as active.');
            }

            fetchJobPostings();
        } catch (error) {
            toast.error('Failed to update expired status.');
        }
    };

    const handleJobBarClick = (job) => {
        setSelectedJob(selectedJob && selectedJob._id === job._id ? null : job);
        if (job._id) {
            fetchHiredCandidatesCount(job._id); // Fetch hired candidates count when job is selected
        }
    };

    return (
        <div className="w-full flex text-left">
            <div className="w-[32.5%] m-0">
                <div className="w-full m-0">
                    <div className="flex flex-col w-[95%] m-0 max-h-[700px] overflow-y-auto pr-2">
                        {jobPostings.map(job => (
                            <div 
                                key={job._id} 
                                className={`meeting_container w-full flex cursor-pointer border-b border-gray-500 hover:bg-gray-100 hover:bg-opacity-10 p-[10px] ${
                                    selectedJob && selectedJob._id === job._id ? 'bg-[#BABABA] bg-opacity-20 opacity-100' : 'hover:bg-gray-300'
                                }`}
                                onClick={() => handleJobBarClick(job)}
                            >
                                <div className="title w-full flex justify-between">
                                    <div className='flex'>
                                        <PiBriefcase 
                                            size={25} 
                                            className={`${
                                                selectedJob && selectedJob._id === job._id ? 'text-white' : 'text-white opacity-25'
                                            }`} 
                                        />
                                        <p className={`text-[14px] text-white ${
                                            selectedJob && selectedJob._id === job._id ? 'opacity-100' : 'opacity-25'
                                        }`}>{job.jobTitle}</p>
                                    </div>
                                    <div className='flex'>
                                        {selectedJob && selectedJob._id === job._id ? (
                                            <GrFormView 
                                                size={35} 
                                                className="text-white cursor-pointer"
                                                onClick={() => handleJobBarClick(job)}
                                            />
                                        ) : (
                                            <GrFormViewHide 
                                                size={35} 
                                                className="text-white opacity-25 cursor-pointer"
                                                onClick={() => handleJobBarClick(job)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {jobPostings.length === 0 && (
                            <p className="text-white opacity-25 text-center mt-4">No approved jobs found</p>
                        )}                       
                    </div>
                </div>
            </div>

            <div className='w-[67.5%] p-[1em] max-h-[700px] overflow-y-scroll'>
                {selectedJob && (
                    <>
                        <div className='w-full'>
                            <div className="w-full flex">
                                <div className="w-1/2 text-white opacity-25">Job Title</div>
                                <div className="w-[5%] text-white opacity-25">-</div>
                                <div className="w-[45%] text-white">{selectedJob.jobTitle}</div>
                            </div>
                        </div>

                        <div className='w-full'>
                            <div className="w-full flex">
                                <div className="w-1/2 text-white opacity-25">Required Experience (Years)</div>
                                <div className="w-[5%] text-white opacity-25">-</div>
                                <div className="w-[45%] text-white">{selectedJob.requiredExperience}</div>
                            </div>
                        </div>

                        <div className='w-full'>
                            <div className="w-full flex">
                                <div className="w-1/2 text-white opacity-25">Required Skills</div>
                                <div className="w-[5%] text-white opacity-25">-</div>
                                <div className="w-[45%] text-white">
                                    <ul className="list-none pl-0">
                                        {selectedJob.requiredSkills.map((skill, index) => (
                                            <li key={index} className="mb-1">
                                                <span className="inline-block before:content-['▪'] before:inline-block before:mr-1">{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div className="w-full text-center justify-center p-8">
                            {selectedJob.description}
                        </div>

                        <div className="w-full flex justify-between font-bold">
                            <Card title="Vacancies" value={"0" + selectedJob.vacancies} />
                            <Card title="Selected Candidates" value={"0" + hiredCandidatesCount} />
                            <Card title="Now Available Vacancies" value={"0" + Math.max(selectedJob.vacancies - hiredCandidatesCount, 0)} />
                        </div>

                        <div className="flex items-center mt-4 justify-center">
                            <label htmlFor="expiredCheckbox" className="mr-[2px]">Expired:</label>
                            <input 
                                type="checkbox" 
                                id="expired" 
                                checked={selectedJob.expired} 
                                onChange={(e) => handleExpiredChange(selectedJob._id, e.target.checked)} 
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
