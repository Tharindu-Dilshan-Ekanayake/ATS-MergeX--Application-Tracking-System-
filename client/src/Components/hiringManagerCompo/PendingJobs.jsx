import React, { useState } from "react";
import { IoBagHandleSharp, IoClose } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PendingJobs(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [improvements, setImprovements] = useState('');

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenRejectPopup = () => {
    setIsRejectPopupOpen(true);
  };

  const handleCloseRejectPopup = () => {
    setIsRejectPopupOpen(false);
  };

  const handleImprovementsChange = (e) => {
    setImprovements(e.target.value);
  };

  const handleRejectSubmit = async () => {
    if (!props.id) {
      console.error('Job ID is undefined');
      toast.error('Unable to reject job: Invalid job ID');
      return;
    }

    if (!improvements || improvements.trim() === "") {
      toast.error('Improvements field cannot be empty');
      return;
    }

    try {
      const response = await axios.put(`/job/rejectJobPosting/${props.id}`, {
        rejected: true,
        improvements: improvements
      });
      console.log('API Response:', response.data); // Debug log
      console.log('Job rejected successfully');
      toast.success('Job rejected successfully!');
      handleCloseRejectPopup();
      // You might want to update the UI or trigger a re-fetch of jobs here
      if (props.onJobRejected) {
        props.onJobRejected(props.id);
      }
    } catch (error) {
      console.error('Error rejecting job:', error.response ? error.response.data : error.message);
      toast.error('Failed to reject job. Please try again.');
    }
  };

  const handleStatus = () => {
    toast('Current status: Pending', { icon: '🕒' });
    // Implement status check logic here
  };

  const approvedJob = async () => {
    if (!props.id) {
      console.error('Job ID is undefined');
      toast.error('Unable to approve job: Invalid job ID');
      return;
    }

    try {
      const response = await axios.put(`/job/approveJobPosting/${props.id}`, { 
        pending: false, 
        approved: true,
        rejected: false 
      });
      console.log('API Response:', response.data); // Debug log
      console.log('Job approved successfully');
      toast.success('Job approved successfully!');
      handleClosePopup();
      // You might want to update the UI or trigger a re-fetch of jobs here
      if (props.onJobApproved) {
        props.onJobApproved(props.id);
      }
    } catch (error) {
      console.error('Error approving job:', error.response ? error.response.data : error.message);
      toast.error('Failed to approve job. Please try again.');
    }
  };


  return (
    <div>
      <div className="bg-[linear-gradient(180deg,_rgba(98,_92,_88,_0.136)_0%,_rgba(48,_48,_48,_0.2)_100%)] p-[10px] rounded-[25px] mb-[10px] 320px:text-[0.5rem] 450px:text-[0.8rem] sm:text-[0.9rem] 900px:text-[1.1rem] 1010px:text-[1.2rem]">
        <div className="JobPostCover flex flex-row items-center justify-evenly mx-[25px] my-0 px-[25px] py-0">
          <IoBagHandleSharp className="esm:w-[40px] esm:h-[40px] 350px:w-[50px] 500px:w-[60px] 500px:h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] 1010px:w-[90px] 1010px:h-[90px] 1300px:w-[100px] 1300px:h-[100px] xl:w-[110px] xl:h-[110px] mr-[20px] text-[rgb(238,_231,_231)]" />
          <div>
            <p className="text-[white] esm:mb-[2px] 300px:mb-[3px] 450px:mb-[4px] sm:mb-[6px] md:mb-[8px] 1010px:mb-[10px] 1300px:mb-[15px]">
              {props.post}
            </p>
            <p className="text-[rgba(255,_255,_255,_0.25)]">
              Published on {props.date}
            </p>
            <p className="text-[rgba(255,_255,_255,_0.25)]">
              Salary LKR {props.sallary}
            </p>
          </div>
          <div className="DecisionCover flex flex-row items-center esm:gap-0.5 350px:gap-2 500px:gap-2 sm:gap-4 md:gap-7 1010px:gap-16">
            <MdRemoveRedEye
              onClick={handleOpenPopup}
              className="esm:w-[30px] esm:h-[30px] 350px:w-[35px] 500px:w-[40px] 500px:h-[40px] sm:w-[45px] sm:h-[45px] md:w-[55px] md:h-[55px] 1010px:w-[60px] 1010px:h-[60px] 1300px:w-[65px] 1300px:h-[65px] xl:w-[70px] xl:h-[70px] text-[rgba(255,_255,_255,_0.25)] cursor-pointer"
            />
            <div className="flex flex-col Decision">
              <button 
                onClick={handleOpenRejectPopup}
                className="bg-[#EA7122] mx-[auto] my-[10px] flex items-center justify-center esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] text-[rgb(225,_215,_215)] border-[none]"
              >
                Reject
              </button>
              <button 
                onClick={approvedJob}
                className="bg-[#EA7122] mx-[auto] my-[10px] flex items-center justify-center esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] text-[rgb(225,_215,_215)] border-[none]"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          isPopupOpen ? "block" : "hidden"
        } fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50`}
      ></div>
      {isPopupOpen && (
        <div>
          <div className="popup p-[30px] bg-[rgba(43,43,43)] border-[1px] border-[solid] border-[#EA7122] w-[800px] rounded-[30px] mt-[20px] mb-[20px] z-50 fixed top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute w-full">
              <IoClose
                onClick={handleClosePopup}
                className="relative top-[0px] left-[720px] cursor-pointer"
              />
            </div>
            <div className="flex justify-center">
              <table className="border-separate border-spacing-[10px]">
                <tbody>
                  <tr className="border-spacing-[0_10px]">
                    <td className="text-[rgba(255,255,255,0.75)]">Job title</td>
                    <td className="text-[rgba(255,255,255,0.75)]">-</td>
                    <td className="text-[rgba(255,255,255,0.75)]">
                      {props.post}
                    </td>
                  </tr>
                  <tr className="border-spacing-[0_10px]">
                    <td className="text-[rgba(255,255,255,0.75)]">
                      Required experience in years
                    </td>
                    <td className="text-[rgba(255,255,255,0.75)]">-</td>
                    <td className="text-[rgba(255,255,255,0.75)]">
                      {props.requiredExperience}
                    </td>
                  </tr>
                  <tr className="border-spacing-[0_10px]">
                    <td className="text-[rgba(255,255,255,0.75)]">
                      Required skills
                    </td>
                    <td className="text-[rgba(255,255,255,0.75)]">-</td>
                    <td className="text-[rgba(255,255,255,0.75)]">
                      {props.requiredSkills && props.requiredSkills.map((item) => (
                        <span key={item} className="inline-block mr-1">
                          {item} /
                        </span>
                      ))}
                    </td>
                  </tr>
                  <tr className="border-spacing-[0_10px]">
                    <td className="text-[rgba(255,255,255,0.75)]">Vacancies</td>
                    <td className="text-[rgba(255,255,255,0.75)]">-</td>
                    <td className="text-[rgba(255,255,255,0.75)]">
                      {props.vacancies}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[rgba(255,255,255)] text-center">
              {props.description}
            </p>
            <div className="flex flex-col gap-[15px] mt-[30px] items-center">
              <button
                onClick={handleOpenRejectPopup}
                className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px]"
              >
                Reject
              </button>
              <button
                onClick={handleStatus}
                className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px]"
              >
                Status
              </button>
              <button
                onClick={approvedJob}
                className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px]"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${
          isRejectPopupOpen ? "block" : "hidden"
        } fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50`}
      ></div>
      {isRejectPopupOpen && (
        <div>
          <div className="popup p-[30px] bg-[rgba(43,43,43)] border-[1px] border-[solid] border-[#EA7122] w-[600px] rounded-[30px] mt-[20px] mb-[20px] z-50 fixed top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute w-full">
              <IoClose
                onClick={handleCloseRejectPopup}
                className="relative top-[0px] left-[520px] cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-[15px] mt-[30px] items-center">
              <textarea
                value={improvements}
                onChange={handleImprovementsChange}
                placeholder="Enter improvements needed"
                className="w-full p-[10px] rounded-[10px] border-[1px] border-[#EA7122] bg-[rgba(43,43,43)] text-[rgba(255,255,255,0.75)]"
              />
              <button
                onClick={handleRejectSubmit}
                className="bg-[#EA7122] w-[100px] h-[30px] rounded-[30px] text-[rgb(225,215,215)] border-[none]"
              >
                Submit
              </button>
              <button
                onClick={() => setImprovements('')}
                className="bg-[#EA7122] w-[100px] h-[30px] rounded-[30px] text-[rgb(225,215,215)] border-[none]"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
