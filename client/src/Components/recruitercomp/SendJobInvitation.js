import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcInvite } from "react-icons/fc";
import { GrFormView } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-hot-toast';

export default function SendJobInvitation() {
    const [invitationsendisfalseData, setInvitationsendisfalseData] = useState([]);
    const [invitationsendistrueData, setInvitationsendistrueData] = useState([]);
    const [showInvitation, setShowInvitation] = useState(false);
    const [showsentInvitation, setShowsentInvitation] = useState(false);
    const [selectedInvitation, setSelectedInvitation] = useState(null);

    //get invitation send access
    const [accessSendInvitation,setAccessSendInvitation] = useState(false);
    
    useEffect(() => {
        // Fetch the current state of send invitation access from the backend
        const fetchAccessStatusUpdate = async () => {
          try {
            const response = await axios.get('/access/getsendinvitationaccess');
            setAccessSendInvitation(response.data.send_invitation);
          } catch (error) {
            console.error('Error fetching create status state:', error);
          }
        };
        fetchAccessStatusUpdate();
        
      }, []);
    

    const handleModalClose = () => {
        setShowInvitation(false);
        setSelectedInvitation(null);
        setShowsentInvitation(false);
    }

    const handleViewInvitation = (invitation) => {
        setSelectedInvitation(invitation);
        setShowInvitation(true);
        
    }

    const handleViewSentInvitation = (invitation) => {
        setShowsentInvitation(true);
        setSelectedInvitation(invitation);
    }

    const getinvitationsendisfalse = async () => {
        try {
            const response = await axios.get('/invitation/sendinvitation');
            console.log('new invitation get successful');
            setInvitationsendisfalseData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getinvitationsendistrue = async () => {
        try {
            const response = await axios.get('/invitation/sentinvitation');
            console.log('sent invitation get successful');
            setInvitationsendistrueData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateSendStatus = async (id) => {
        if (!accessSendInvitation) {
            toast.error('Admin blocked temporarily');
            return;
        }
        try {
            await axios.put(`/invitation/send/${id}`, { send: true });
            console.log('Invitation sent successfully');

            // Update state to move the invitation from new to sent
            setInvitationsendisfalseData(prevData => prevData.filter(invitation => invitation._id !== id));
            const sentInvitation = invitationsendisfalseData.find(invitation => invitation._id === id);
            setInvitationsendistrueData(prevData => [...prevData, sentInvitation]);

            // Close the modal if it was sent from there
            handleModalClose();
            toast.success('Sent invitation successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getinvitationsendisfalse();
        getinvitationsendistrue();
    }, []);

    return (
        <div>
            <div className='flex py-8'>
                <div className='w-1/2 h-[680px]'>
                    <div>
                        <h1 className='text-2xl opacity-40'>New Job Interview Invitation</h1>
                    </div>
                    <div className='h-[600px] mt-10 overflow-y-scroll max-h-[600px] scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-thumb-hover-gray-700'>
                        <div className='flex justify-center text-center'>
                            <table>
                                <tbody>
                                    {invitationsendisfalseData.map((interviewschedules) => (
                                        <tr key={interviewschedules._id} className='border-b border-gray-500 h-[70px] bg-gradient-to-b from-[#2B2B2B] to-[#333333]'>
                                            <td className='w-[60px] pl-4'>
                                                <FcInvite className='size-[35px] opacity-85' />
                                            </td>
                                            <td className='pl-2 w-[300px] pr-2'>
                                                <h1>{interviewschedules.jobtitle}</h1>
                                            </td>
                                            <td>
                                                <button onClick={() => handleViewInvitation(interviewschedules)}><GrFormView className='size-[50px] hover:opacity-50' /></button>
                                            </td>
                                            <td className='pr-4'>
                                                <button
                                                    className='bg-orange-500 hover:bg-gray-500 w-[100px] h-10 rounded-lg'
                                                    onClick={() => updateSendStatus(interviewschedules._id)}
                                                >
                                                    Send
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {invitationsendisfalseData.length === 0 && (
                                        <p className="text-white opacity-25 text-center mt-4">No new job invitations found</p>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='w-1/2 h-[680px]'>
                    <div>
                        <h1 className='text-2xl opacity-40'>Sent Job Interview Invitation</h1>
                    </div>
                    <div className='h-[600px] mt-10 overflow-y-scroll max-h-[600px] scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-thumb-hover-gray-700'>
                        <div className='flex justify-center text-center'>
                            <table>
                                <tbody>
                                    {invitationsendistrueData.map((interviewschedules) => (
                                        <tr key={interviewschedules._id} className='border-b border-gray-500 h-[70px] bg-gradient-to-b from-[#2B2B2B] to-[#333333]'>
                                            <td className='w-[60px] pl-4'>
                                                <FcInvite className='size-[35px] opacity-85' />
                                            </td>
                                            <td className='pl-2 w-[300px] pr-2'>
                                                <h1>{interviewschedules.jobtitle}</h1>
                                            </td>
                                            <td>
                                            <button onClick={() => handleViewSentInvitation(interviewschedules)}><GrFormView className='size-[50px] hover:opacity-50' /></button>
                                            </td>
                                            <td className='pr-4'>
                                                <div className='bg-gray-500 w-[100px] h-10 rounded-lg flex items-center justify-center'>
                                                    <h1 className='text-center'>Sent</h1>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {invitationsendistrueData.length === 0 && (
                                        <p className="text-white opacity-25 text-center mt-4">No sent job invitations found</p>
                                    )}                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showInvitation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
                    <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[550px] w-[750px] border-orange-700 border-[1px] ">
                        <button
                           className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                            onClick={handleModalClose}
                        >
                            <IoMdClose className="text-white hover:text-red-700" />
                        </button>
 
                        <div className='pt-4 p-10'>
                            <div className='flex justify-center'>
                                <div className='border-b-[2px] w-[300px] pb-1.5 border-white border-opacity-50 mb-4'>
                                    <h1 className='mb-2 text-xl font-semibold text-orange-500'>{selectedInvitation?.jobtitle}</h1>
                                </div>
                            </div>
                            <p className='mb-2 text-gray-300 text-left flex'><span className='font-semibold pr-2'>Description:</span> {selectedInvitation?.description}</p>
                            <div className='flex mt-3'>
                                <div className='w-1/2'>
                                    <p className='mb-1 text-gray-300 flex'>
                                        <span className='font-semibold'>Skills:</span>
                                        <ul className="list-none pl-2 text-left p">
                                            {selectedInvitation?.skills?.map((skill, index) => (
                                                <li key={index} className="mb-1">
                                                    <span className="inline-block mr-2 before:content-['▪'] before:inline-block before:mr-1">{skill}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </p>
                                </div>
                                <div className='w-1/2 text-left'>
                                    <p className='mb-1.5 text-gray-300'><span className='font-semibold'>Link:</span> <a href={selectedInvitation?.link} className='text-blue-500 underline'>{selectedInvitation?.link}</a></p>
                                    <p className='mb-1.5 text-gray-300'><span className='font-semibold'>Password:</span> {selectedInvitation?.password}</p>
                                    <p className='mb-1.5 text-gray-300'><span className='font-semibold'>Date:</span> {selectedInvitation?.date}</p>
                                    <p className='mb-1.5 text-gray-300'><span className='font-semibold'>Start:</span> {selectedInvitation?.start_time}</p>
                                    <p className='mb-1.5 text-gray-300'><span className='font-semibold'>End:</span> {selectedInvitation?.end_time}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button 
                                className='bg-orange-500 hover:bg-gray-500 w-[100px] h-10 rounded-lg'
                                onClick={() => updateSendStatus(selectedInvitation?._id)}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showsentInvitation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
                    <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[550px] w-[750px] border-orange-700 border-[1px] ">
                        <button
                           className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                            onClick={handleModalClose}
                        >
                            <IoMdClose className="text-white hover:text-red-700" />
                        </button>

                        <div className='pt-4 p-10'>
                            <div className='flex justify-center'>
                                <div className='border-b-[2px] w-[300px] pb-1.5 border-white border-opacity-50 mb-4'>
                                    <h1 className='mb-2 text-xl font-semibold text-orange-500'>{selectedInvitation?.jobtitle}</h1>
                                </div>
                            </div>
                            <p className='mb-2 text-gray-300 text-left flex'><span className='font-semibold pr-2'>Description:</span> {selectedInvitation?.description}</p>
                            <div className='flex mt-3'>
                                <div className='w-1/2'>
                                    <p className='mb-1 text-gray-300 flex'>
                                        <span className='font-semibold'>Skills:</span>
                                        <ul className="list-none pl-2 text-left p">
                                            {selectedInvitation?.skills?.map((skill, index) => (
                                                <li key={index} className="mb-1">
                                                    <span className="inline-block mr-2 before:content-['▪'] before:inline-block before:mr-1">{skill}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </p>
                                </div>
                                <div className='w-1/2 text-left'>
                                    <p className='mb-1.5 text-gray-300'><span className='font-semibold'>Link:</span> <a href={selectedInvitation?.link} className='text-blue-500 underline'>{selectedInvitation?.link}</a></p>
                                    <p className='mb-1.5 text-gray-300'><span className='font-semibold'>Password:</span> {selectedInvitation?.password}</p>
                                    <p className='mb-1.5 text-gray-300'><span className='font-semibold'>Date:</span> {selectedInvitation?.date}</p>
                                    <p className='mb-1.5 text-gray-300'><span className='font-semibold'>Start:</span> {selectedInvitation?.start_time}</p>
                                    <p className='mb-1.5 text-gray-300'><span className='font-semibold'>End:</span> {selectedInvitation?.end_time}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
