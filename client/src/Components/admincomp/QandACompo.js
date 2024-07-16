import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-hot-toast';
import { BsFillReplyFill } from "react-icons/bs";

export default function QandACompo() {
  const [getQandA, setGetQandA] = useState([]);
  const [sendtruegetQandA, setSendtruegetQanda] = useState([]);
  const [messageShowModel, setMessageShowModel] = useState(false);
  const [repliedShowModel, setReplyShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState();

  // get q and a
  const getQandAsapi = async () => {
    try {
      const response = await axios.get("/qanda/getsendfalsemessage");
      setGetQandA(response.data.QandAs);
    } catch (error) {
      console.error("error fetching Q and A data: ", error);
    }
  };

  //get true send q and a 
  const getQandAsapisenttrue = async () =>{
    try {
      const response = await axios.get("/qanda/getsendtruemessage");
      setSendtruegetQanda(response.data.QandAs);
    } catch (error) {
      console.error("error fetching Q and A data: ", error);
    }
  }

  //handle view send is false
  const handleview = (message) => {
    setMessageShowModel(true);
    setSelectedMessage(message)
  }

  //handle view send is true
  const handleviewReply = (reply) => {
    setReplyShowModal(true);
    setSelectedMessage(reply);
    
  }

  //handle close
  const handleModalClose = () =>{
    setMessageShowModel(false);
    setSelectedMessage(null);
    setReplyShowModal(false);
  }

  //handle reply submission
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!selectedMessage || !reply.trim()) return;

    try {
      const response = await axios.put(`/qanda/putreply/${selectedMessage._id}`, { reply });
      if (response.status === 200) {
        // Update local state
        setGetQandA(prevQandA => prevQandA.filter(qa => qa._id !== selectedMessage._id));
        setSendtruegetQanda(prevQandA => [...prevQandA, response.data.qanda]);
        handleModalClose();
        // Optionally, show a success message
      }
      toast.success( 'Sent reply Successsfully')
    } catch (error) {
      console.error("Error sending reply:", error);
      // Optionally, show an error message
    }
  };

  // New function to handle marking a message as read
  const handleMarkAsRead = async (id) => {
    try {
      const response = await axios.put(`/qanda/putreadtrue/${id}`);
      if (response.status === 200) {
        // Update the local state to reflect the change
        setGetQandA(prevQandA => 
          prevQandA.map(qa => 
            qa._id === id ? { ...qa, read: true } : qa
          )
        );
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  //handke delete
  const handleDelete = async (id) =>{
    try {
      const response = await axios.delete(`/qanda/deletemessage/${id}`);
      if (response.status === 200) {
          // Remove the deleted item from both state arrays
          setGetQandA(prevQandA => prevQandA.filter(qa => qa._id !== id));
          setSendtruegetQanda(prevQandA => prevQandA.filter(qa => qa._id !== id));
          // Optionally, show a success message
          
      }
      toast.success( 'Deleted Successsfully')
  } catch (error) {
      console.error("Error deleting Q&A entry:", error);
      // Optionally, show an error message
  }
  }

   // Handle reply text change
   const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  // Handle reply clear
  const handleReplyClear = () => {
    setReply('');
  };

  useEffect(() => {
    getQandAsapi();
    getQandAsapisenttrue();
  }, []); // Added empty dependency array to prevent infinite loop

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return { date: formattedDate, time: formattedTime };
  };

  

  return (
    <div className=''>
      
      
      <div className='flex pt-8 mx-8'>
        <div className='w-2/3 border-r-2 border-orange-500'>
          <h1 className='pb-2 text-3xl text-orange-500 text-bold'>New Qs</h1>
          <div className='flex justify-center pb-12'>
            <div className='w-[400px]'>
              <hr className='border-2 border-orange-500 border-opacity-35'></hr>
            </div>
            
          </div>
          <div className='mx-4  h-[600px] overflow-y-auto'>
            <div >
              {getQandA.map((qa, index) => {
                const { date, time } = formatDateTime(qa.createdAt);
                return (
                  <div key={index} className='p-2 border-b border-gray-500 bg-gradient-to-b from-[#2B2B2B] to-[#333333]'>
                    <div className='flex items-center'>
                      <div className='relative ml-3'>
                        <FaRegQuestionCircle className='size-[40px] opacity-50'/>
                        {!qa.read && (
                          <div className='absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full'></div>
                        )}
                      </div>
                      <div className='flex-grow ml-3'>
                        
                        <div className='pl-8  w-[650px]'> 
                          <div className='flex text-left'> 
                            <p className='opacity-80'> <strong>{qa.useremail}</strong></p>
                            <p className='text-orange-400 text-[14px] pl-6'>{date} at {time}</p>
                          </div> 
                          <div className='flex text-left'>
                            <div>
                              <p><span className='opacity-50'>{qa.message.slice(0, 100)}...</span><span className='opacity-30'>see more</span></p>
                              
                            </div>
                          </div>
                        </div>
                        
                        
                      </div>
                      <div className='ml-3'>
                        <button 
                        onClick={() => {
                          handleview(qa);
                          if (!qa.read) {
                            handleMarkAsRead(qa._id);
                          }
                        }}
                        className='px-3 py-1 text-white hover:text-opacity-40 '><FaRegEye className='size-[30px]' /></button>
                      </div>
                      <div className='ml-3'>
                        <button 
                        onClick={() => handleDelete(qa._id)}
                        className='px-3 py-1 text-red-600 hover:text-opacity-40'><MdDeleteForever className='size-[30px]' /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className='w-1/3 '>
          <h1 className='pb-2 text-3xl text-orange-500 text-bold'>Replied As</h1>

          <div className='flex justify-center pb-12'>
            <div className='w-[300px]'>
              <hr className='border-2 border-orange-500 border-opacity-35'></hr>
            </div>
            
          </div>
          
          <div  className='mx-4  h-[600px] overflow-y-auto'>
          <div>
  {sendtruegetQandA
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((qa, index) => {
      const { date, time } = formatDateTime(qa.createdAt);
      return (
        <div key={index} className='p-2 border-b border-gray-500 bg-gradient-to-b from-[#2B2B2B] to-[#333333]'>
          <div className='flex items-center'>
            <div className='relative ml-3'>
              <BsFillReplyFill className='size-[40px] opacity-50'/>
            </div>
            <div className='flex-grow ml-3'>
              <p>{qa.useremail}</p>
              <div className='flex justify-center'>
                <p>
                  <span className='opacity-50'>{qa.reply.slice(0, 30)}...</span>
                  <span className='opacity-30'>see more</span>
                </p>
              </div>
            </div>
            <div className='ml-3'>
              <button
                onClick={() => handleviewReply(qa)}
                className='px-3 py-1 text-white hover:text-opacity-40 '>
                <FaRegEye className='size-[30px]' />
              </button>
            </div>
            <div className='ml-3'>
              <button
                onClick={() => handleDelete(qa._id)}
                className='px-3 py-1 text-red-600 hover:text-opacity-40'>
                <MdDeleteForever className='size-[30px]' />
              </button>
            </div>
          </div>
        </div>
      );
    })}
</div>
          </div>
        </div>
      </div>
      {messageShowModel && selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
          <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-auto w-[900px] border-orange-700 border-[1px] relative">
              <button onClick={handleModalClose} className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12">
                <IoMdClose className="text-white hover:text-red-700" />
              </button>

            <div>
            <h2 className='text-xl font-bold text-orange-500'>Message</h2>
            <div className='pt-5 text-left '>
              <div className='flex'>
                <p>{selectedMessage.useremail} </p>
                <p className='text-orange-400 text-[14px] pl-4'> {formatDateTime(selectedMessage.createdAt).date} at {formatDateTime(selectedMessage.createdAt).time} </p>
              </div>
              <p className=' text-left opacity-50 text-[14px]'> {selectedMessage.username}</p>
              <p className='pb-2 opacity-50'>to me,</p>
            </div>
            <div className=''>
               <p className='mx-12 text-left opacity-70'> {selectedMessage.message}</p>
            </div>
             
              
              <div className='flex justify-center pt-8 pb-10'>
                <div><hr className='w-[420px]' ></hr ></div>
                
              </div>

              <div>
                <form onSubmit={handleReplySubmit}>
                  <div>
                    <textarea 
                      className='w-full p-2 mt-4 text-white border rounded bg-[#2a2a2b]'
                      value={reply}
                      onChange={handleReplyChange}
                      placeholder="Type your reply here..."
                      rows="4"
                    ></textarea>
                  </div>
                  <div className='flex justify-center mt-4 space-x-4'>
                    <button 
                      type="submit"
                      className='px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-700'
                    >
                      Send
                    </button>
                    <button 
                      type="button"
                      onClick={handleReplyClear}
                      className='px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700'
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

{repliedShowModel && selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
          <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-auto w-[900px] border-orange-700 border-[1px] relative">
              <button onClick={handleModalClose} className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12">
                <IoMdClose className="text-white hover:text-red-700" />
              </button>

            <div>
            <h2 className='text-xl font-bold text-orange-500'>Message</h2>
            <div className='pt-5 text-left '>
              <div className='flex'>
                <p>{selectedMessage.useremail} </p>
                <p className='text-orange-400 text-[14px] pl-4'> {formatDateTime(selectedMessage.createdAt).date} at {formatDateTime(selectedMessage.createdAt).time} </p>
              </div>
              <p className=' text-left opacity-50 text-[14px]'> {selectedMessage.username}</p>
              <p className='pb-2 opacity-50'>to me,</p>
            </div>
            <div className=''>
               <p className='mx-12 text-left opacity-70'> {selectedMessage.message}</p>
            </div>
             
              
              <div className='flex justify-center pt-8 pb-10'>
                <div><hr className='w-[420px]' ></hr ></div>
                
              </div>
              <h2 className='text-xl font-bold text-orange-500 '>Reply</h2>
              <div className='pt-5'>
                <div className='flex '>
                  <p>Admin </p>
                  <p className='text-orange-400 text-[14px] pl-4'>{formatDateTime(selectedMessage.updatedAt).date} at {formatDateTime(selectedMessage.updatedAt).time}</p>
                </div>
                <p className='pb-2 text-left text-[14px] opacity-50'>to {selectedMessage.username},</p>
                <p className='mx-12 text-left opacity-70'>{selectedMessage.reply}</p>
                
              </div>
              

              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}