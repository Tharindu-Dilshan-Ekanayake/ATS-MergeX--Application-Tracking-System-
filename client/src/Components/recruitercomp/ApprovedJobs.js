import React, { useState, useEffect } from 'react';
import { PiBriefcase } from 'react-icons/pi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import Card from './Card';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ApprovedJobs() {
    const [jobPostings, setJobPostings] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);


    useEffect(() => {      
        axios.get('/job/getAllApprovedJobPostings')
            .then(response => {
                setJobPostings(response.data);
            })
            .catch(error => {
                console.log('Error fetching approved job postings:', error);
            });
    }, []);

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

        } catch (error) {
            toast.error('Failed to update expired status.');
        }
    };
    

    const handleJobBarClick = (job) => {
        setSelectedJob(job);
    };

    return (
        <div style={{ width: '100%', display: 'flex', textAlign: 'left', maxHeight:"600px" }}>
            <div style={{ width: '32.5%', margin: 0 }}>
                <div style={{ width: '100%', margin: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '95%', margin: 0 }}>
                        {jobPostings.map(job => (
                            <div key={job._id} className="meeting_container" style={{ width: '100%', display: 'flex', cursor:'pointer', borderBottom:'1px solid white', padding:'10px' }}>
                                <div className="title" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                                    <div className='flex'>
                                        <PiBriefcase size={25} className='text-white opacity-25' />
                                        <p style={{ fontSize: 14 }}>{job.jobTitle}</p>
                                    </div>
                                    <div className='flex'>
                                        <div><MdOutlineRemoveRedEye size={25} className='text-white opacity-25 cursor-pointer' onClick={() => handleJobBarClick(job)}/></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div style={{ width: '67.5%', padding: '1em', borderLeft: '1px solid rgb(234, 113, 34, 0.25) ' }}>
                {selectedJob && (
                    <>
                        <div style={{ width: '100%' }}>
                            <div style={{ width: '100%', display: 'flex' }}>
                                <div style={{ width: '50%', color: '#fff', opacity: '0.25' }}>Job Title</div>
                                <div style={{ width: '5%', color: '#fff', opacity: '0.25' }}>-</div>
                                <div style={{ width: '45%', color: '#fff' }}>{selectedJob.jobTitle}</div>
                            </div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <div style={{ width: '100%', display: 'flex' }}>
                                <div style={{ width: '50%', color: '#fff', opacity: '0.25' }}>Required Experience (Years)</div>
                                <div style={{ width: '5%', color: '#fff', opacity: '0.25' }}>-</div>
                                <div style={{ width: '45%', color: '#fff' }}>{selectedJob.requiredExperience}</div>
                            </div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <div style={{ width: '100%', display: 'flex' }}>
                                <div style={{ width: '50%', color: '#fff', opacity: '0.25' }}>Required Skills</div>
                                <div style={{ width: '5%', color: '#fff', opacity: '0.25' }}>-</div>
                                <div style={{ width: '45%', color: '#fff' }}>{selectedJob.requiredSkills.join(', ')}</div>
                            </div>
                        </div>

                        <div style={{ width: '100%', textAlign: 'center', justifyContent: 'center', padding: '2em' }}>
                            {selectedJob.description}
                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <Card title="Vacancies" value={"0" + selectedJob.vacancies} />
                            <Card title="Selected Candidates" value="01" />
                            <Card title="Now Available Vacancies" value={"0" + Math.max(selectedJob.vacancies - 1, 0)} />
                        </div>


                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', justifyContent:'center' }}>
                            <label htmlFor="expiredCheckbox" style={{ marginRight:"2px" }}>Expired:</label>
                            <input type="checkbox" id="expired" checked={selectedJob.expired} onChange={(e) => handleExpiredChange(selectedJob._id, e.target.checked)} />
                        </div>

                    </>
                )}
            </div>
        </div>
    )
}
