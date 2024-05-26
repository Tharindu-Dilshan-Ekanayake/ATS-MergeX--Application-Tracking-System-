import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import StatusUpdatePopup from '../recruitercomp/StatusUpdatePopup';
import { MdDeleteForever } from "react-icons/md";
import moment from 'moment';

export default function StatusUpdate() {
  const { user } = useContext(UserContext);
  const [showModalStatus, setShowModalStatus] = useState(false);
  const [statusData, setStatusData] = useState([]);

  const handleStatusUpdate = () => {
    setShowModalStatus(true);
  };

  const handleModalstatusClose = () => {
    setShowModalStatus(false);

    axios.get('/status/getstatus')
        .then(response => {
            setStatusData(response.data);
        })
        .catch(error => {
            console.error('Error fetching status:', error);
        });
};

  const getStatus = async () => {
    try {
      const response = await axios.get('/status/getstatus');
      setStatusData(response.data); // Assuming the response contains an array of status data
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  useEffect(() => {
    // Fetch status data when component mounts or user changes
    getStatus();
  }, [user]);

  // Check if the user object is available before rendering the StatusUpdatePopup
  if (!user) {
    return null; // or return a loading state
  }

  return (
    <div>
      <div className='flex pt-12'>
        <div className='w-[700px] border-r-2 border-orange-500'>
          <div className='ml-12 mr-12 text-center'>
            <button onClick={handleStatusUpdate} className='h-10 bg-orange-600 w-[150px] rounded-md'>
              Update Status
            </button>
          </div>

          <div className='pt-10'>
            <div>
                <h1 className='text-2xl opacity-45'>Your status</h1>
            <div className='flex justify-center pt-2 '>
                    <hr className='w-[200px] justify-center opacity-25'></hr> 
            </div>
            
            </div>
            <div className='flex justify-center pt-10  overflow-y-scroll max-h-[500px] scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-thumb-hover-gray-700'>

            <table className=''>
                <tbody>
                    {statusData
                        .filter((status) => status.user_email === user.email) // Filter status posts by user_id
                        .slice()
                        .reverse()
                        .map((status, index) => {
                            const statusTime = moment(status.time, 'HH:mm:ss'); // Parse the time string using moment

                            if (!statusTime.isValid()) {
                                console.error('Invalid time format:', status.time);
                                return null; // Skip rendering if the time format is invalid
                            }

                            const timeAgo = statusTime.fromNow();
                            const formattedTimeAgo = timeAgo.includes('seconds') ? timeAgo.replace('seconds', 'secs') : timeAgo;

                            return (
                                // Reverse the array before mapping
                                <tr key={index} 
                                className="border-b border-gray-500 h-[100px] bg-gradient-to-b from-[#2B2B2B] to-[#333333] " >
                                    <td >
                                        <div className="h-[75px] w-[75px] rounded-full overflow-hidden ml-8">
                                            <img src={status.image} alt='status' className='object-cover w-full h-full' />
                                        </div>
                                    </td>
                                    <td className='w-[50px]'></td>
                                    <td className='w-[300px] text-left'>
                                        {status.description}
                                        <div className='text-sm text-gray-400'>
                                            {formattedTimeAgo}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='mr-8'>
                                            <button>
                                                <h1 className='text-red-500'>
                                                    <MdDeleteForever className="size-[35px]  hover:size-[35px] hover:opacity-35" />
                                                </h1>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>

          </div>

          </div>

        </div>
        <div className='w-[700px]'>
          <div>
            <button className='h-10 bg-orange-600 w-[250px] rounded-md'>Update Announcements</button>
          </div>
        </div>
      </div>
      <StatusUpdatePopup visible={showModalStatus} onClose={handleModalstatusClose} />
    </div>
  );
}