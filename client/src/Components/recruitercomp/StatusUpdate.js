import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import StatusUpdatePopup from "./StatusUpdatePopup";
import { MdDeleteForever } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
//import { IoMdSettings } from "react-icons/io";
import moment from "moment";
import AnnouncementUpdatePopup from "./AnnouncementUpdatePopup";
import { toast } from "react-hot-toast";
import StatusView from "../../Components/candidateComp/StatusView";
import AnnouncementView from "../../Components/candidateComp/AnnouncementView";

export default function StatusUpdate() {
  const { user } = useContext(UserContext);
  const [showModalStatus, setShowModalStatus] = useState(false);
  const [showModalAnnouncement, setShowModalAnnoucement] = useState(false);
  const [statusData, setStatusData] = useState([]);
  const [announcementData, setAnnouncementData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  //access get status and announcement
  const [accesStatusUpdate, setAccessStatusUpdate] = useState(false);
  const [accessAnnouncement, setAccessAnnouncement] = useState(false);

  useEffect(() => {
    // Fetch the current state of status update access from the backend
    const fetchAccessStatusUpdate = async () => {
      try {
        const response = await axios.get("/access/getcreatestatusaccess");
        setAccessStatusUpdate(response.data.create_status);
      } catch (error) {
        console.error("Error fetching create status state:", error);
      }
    };

    // Fetch the current state of announcement update access from the backend
    const fetchAccessAnnouncementUpdate = async () => {
      try {
        const response = await axios.get("/access/getcreateannouncementaccess");
        setAccessAnnouncement(response.data.create_announcement);
      } catch (error) {
        console.error("Error fetching create announcement state:", error);
      }
    };

    fetchAccessStatusUpdate();
    fetchAccessAnnouncementUpdate();
  }, []);

  const handleStatusUpdate = () => {
    if (!accesStatusUpdate) {
      toast.error("Admin blocked temporarily");
      return;
    }
    setShowModalStatus(true);
  };

  const handleAnnouncementUpdate = () => {
    if (!accessAnnouncement) {
      toast.error("Admin blocked temporarily");
      return;
    }
    setShowModalAnnoucement(true);
  };

  const handleViewStatus = (status) => {
    setSelectedStatus(status);
    setShowStatus(true);
  };

  const handleViewAnnouncement = (announcements) => {
    setSelectedAnnouncement(announcements);
    setShowAnnouncement(true);
  };

  const handleModalstatusClose = () => {
    setShowModalStatus(false);
    setShowModalAnnoucement(false);
    setShowStatus(false);
    setShowAnnouncement(false);

    axios
      .get("/status/getstatus")
      .then((response) => {
        setStatusData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching status:", error);
      });

    axios
      .get("/announcement/getannouncement")
      .then((response) => {
        setAnnouncementData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching announcement:", error);
      });
  };

  const getStatus = async () => {
    try {
      const response = await axios.get("/status/getstatus");
      setStatusData(response.data); // Assuming the response contains an array of status data
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  const getAnnouncement = async () => {
    try {
      const response = await axios.get("/announcement/getannouncement");
      setAnnouncementData(response.data); // Assuming the response contains an array of status data
    } catch (error) {
      console.error("Error fetching Announcement:", error);
    }
  };

  const DeleteAnnouncement = async (announcementId) => {
    try {
      await axios.delete(`/announcement/deleteannouncement/${announcementId}`);

      console.log("deleted");
      toast.success("Deleted Successsfully");

      const response = await axios.get("/announcement/getannouncement");
      setAnnouncementData(response.data);
    } catch (error) {
      console.error("Error deleting Announcement:", error);
    }
  };

  const DeleteStatus = async (statusId) => {
    try {
      await axios.delete(`/status/deletestatus/${statusId}`);

      //after deletion, i want refresh my status list
      const response = await axios.get("/status/getstatus");
      setStatusData(response.data);

      console.log("deleted");

      toast.success("Deleted Successsfully");
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  };

  useEffect(() => {
    // Fetch status data when component mounts or user changes
    getStatus();
    getAnnouncement();
  }, [user]);

  // Check if the user object is available before rendering the StatusUpdatePopup
  if (!user) {
    return null; // or return a loading state
  }

  return (
    <div>
      <div className="flex py-8">
        <div className="w-1/2 h-[680px]">
          <div className="ml-12 mr-12 text-center">
            <button
              onClick={handleStatusUpdate}
              className="h-10 bg-orange-600 w-[150px] rounded-md"
            >
              Update Status
            </button>
          </div>

          <div className="pt-10">
            <div>
              <h1 className="text-2xl opacity-45">Your status</h1>
              <div className="flex justify-center pt-2 ">
                <hr className="w-[200px] justify-center opacity-25"></hr>
              </div>
            </div>
            <div className="h-[500px] overflow-y-scroll max-h-[500px] scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-thumb-hover-gray-700">
            <div className="flex justify-center pt-10">
              <table>
                <tbody>
                  {statusData
                    .filter((status) => status.user_email === user.email) // Filter status posts by user_id
                    .slice()
                    .reverse()
                    .map((status, index) => {
                      const statusTime = moment(status.time, "HH:mm:ss"); // Parse the time string using moment

                      if (!statusTime.isValid()) {
                        console.error("Invalid time format:", status.time);
                        return null; // Skip rendering if the time format is invalid
                      }

                      const timeAgo = statusTime.fromNow();
                      const formattedTimeAgo = timeAgo.includes("seconds")
                        ? timeAgo.replace("seconds", "secs")
                        : timeAgo;

                      return (
                        // Reverse the array before mapping
                        <tr
                          key={index}
                          className="border-b border-gray-500 h-[100px] bg-gradient-to-b from-[#2B2B2B] to-[#333333] "
                        >
                          <td>
                            <div className="h-[75px] w-[75px] rounded-full overflow-hidden ml-8">
                              <img
                                src={status.image}
                                alt="status"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </td>
                          <td className="w-[50px]"></td>
                          <td className="w-[300px] text-left">
                            {status.description}
                            <div className="text-sm text-gray-400">
                              {formattedTimeAgo}
                            </div>
                          </td>
                          <td>
                            <div className="mr-4">
                              <button onClick={() => handleViewStatus(status)}>
                                <GrFormView className="size-[50px]  hover:opacity-40" />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="mr-8">
                              <button onClick={() => DeleteStatus(status._id)}>
                                <h1 className="text-red-500">
                                  <MdDeleteForever className="size-[35px]  hover:size-[35px] hover:opacity-35" />
                                </h1>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {statusData.length === 0 && (
                        <p className="text-white opacity-25 text-center mt-4">No status found</p>
                    )}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-[680px]">
          <div>
            <button
              onClick={handleAnnouncementUpdate}
              className="h-10 bg-orange-600 w-[250px] rounded-md"
            >
              Update Announcements
            </button>
          </div>
          <div className="pt-10">
            <div>
              <h1 className="text-2xl opacity-45">Your Announcement</h1>
              <div className="flex justify-center pt-2 ">
                <hr className="w-[200px] justify-center opacity-25"></hr>
              </div>
            </div>
            <div className="h-[500px] overflow-y-scroll max-h-[500px] scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-thumb-hover-gray-700">
            <div className="flex justify-center pt-10">
              <table className="">
                <tbody>
                  {announcementData
                    .filter(
                      (announcements) => announcements.user_email === user.email
                    ) // Filter status posts by user_id
                    .slice()
                    .reverse()
                    .map((announcements, index) => {
                      const announcementsTime = moment(
                        announcements.time,
                        "HH:mm:ss"
                      ); // Parse the time string using moment

                      if (!announcementsTime.isValid()) {
                        console.error(
                          "Invalid time format:",
                          announcements.time
                        );
                        return null; // Skip rendering if the time format is invalid
                      }

                      const timeAgo = announcementsTime.fromNow();
                      const formattedTimeAgo = timeAgo.includes("seconds")
                        ? timeAgo.replace("seconds", "secs")
                        : timeAgo;

                      return (
                        // Reverse the array before mapping
                        <tr
                          key={index}
                          className="border-b border-gray-500 h-[100px] bg-gradient-to-b from-[#2B2B2B] to-[#333333] "
                        >
                          <td className="w-[50px]"></td>
                          <td className="w-[300px] text-left">
                            <h1 className="text-2xl truncate">
                              {announcements.title?.slice(0, 20)}
                            </h1>
                            <p className=" opacity-30">
                              {announcements.announce.slice(0, 35)}.....
                            </p>
                            <div className="text-sm text-gray-400">
                              {formattedTimeAgo}
                            </div>
                          </td>
                          <td>
                            <div className="mr-4">
                              <button
                                onClick={() => {
                                  handleViewAnnouncement(announcements);
                                }}
                              >
                                <GrFormView className="size-[50px]  hover:opacity-40" />
                              </button>
                            </div>
                          </td>

                          <td>
                            <div className="mr-8">
                              <button
                                onClick={() =>
                                  DeleteAnnouncement(announcements._id)
                                }
                              >
                                <h1 className="text-red-500">
                                  <MdDeleteForever className="size-[35px]   hover:opacity-35" />
                                </h1>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {announcementData.length === 0 && (
                        <p className="text-white opacity-25 text-center mt-4">No announcements found</p>
                    )}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
      </div>
      <StatusUpdatePopup
        visible={showModalStatus}
        onClose={handleModalstatusClose}
      />
      <AnnouncementUpdatePopup
        visible={showModalAnnouncement}
        onClose={handleModalstatusClose}
      />
      <div>
        <StatusView
          visible={showStatus}
          onClose={handleModalstatusClose}
          status={selectedStatus}
        />
      </div>
      <div>
        <AnnouncementView
          visible={showAnnouncement}
          onClose={handleModalstatusClose}
          announcements={selectedAnnouncement}
        />
      </div>
    </div>
  );
}
