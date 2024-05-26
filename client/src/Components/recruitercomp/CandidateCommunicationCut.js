import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrAnnounce } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { FaFileAlt } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaLink } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { TbBulb } from "react-icons/tb";
import { SlBadge } from "react-icons/sl";
// import axios from 'axios';
import Dropzone from "react-dropzone";

export default function CandidateCommunication() {
  //   const[files,setFiles] = useState([]);
  //   const [uploadedFiles, setUploadedFiles] = useState([]);
  //   const [showProgress, setShowProgress] = useState([false]);
  //   const fileInputRef = useRef(null);

  //   const handleInputClick = () => {

  // fileInputRef.current.click();
  //   }
  const [state, setState] = useState(1);

  const [file, setFile] = useState();

  const action = (index) => {
    setState(index);
  };

  const [showAddStatus, setShowAddStatus] = useState(false);
  const handleAddStatus = () => {
    setShowAddStatus(true);
  };

  const handleAddStatusClose = () => {
    setShowAddStatus(false);
  };

  const [showAddAnnoucement, setShowAddAnnoucement] = useState(false);
  const handleAddAnnoucement = () => {
    setShowAddAnnoucement(true);
  };

  const handleAddAnnoucementClose = () => {
    setShowAddAnnoucement(false);
  };

  const [showSendInvitation, setShowSendInvitation] = useState(false);
  const handleSendInvitation = () => {
    setShowSendInvitation(true);
  };

  const handleSendInvitationClose = () => {
    setShowSendInvitation(false);
  };

  return (
    <div className="w-full bg-[#191919] pl-5 pr-5 pb-5">
      <div className="w-full bg-[#525252] h-200 rounded-[30px]">
        <div className="flex items-center justify-between bg-[#2B2B2B] bg-opacity-90 w-full h-20 rounded-t-[30px] text-center text-[18px]">
          <div
            onClick={() => action(1)}
            className={`text-center flex-1 cursor-pointer ${
              state === 1
                ? "bg-[#2B2B2B] text-white h-full flex items-center justify-center rounded-tl-[30px]"
                : "text-white opacity-25"
            }`}
          >
            Status Update
          </div>
          <div
            onClick={() => action(2)}
            className={`text-center flex-1 cursor-pointer ${
              state === 2
                ? "bg-[#2B2B2B] text-white h-full flex items-center justify-center"
                : "text-white opacity-25"
            }`}
          >
            Job Invitation
          </div>
        </div>

        <div>
          <div
            className={`pl-5 pr-5 pb-5 ${
              state === 1
                ? "bg-[#2B2B2B] text-white rounded-b-[30px]"
                : "hidden"
            }`}
          >
            <StatusBar
              handleAddStatus={handleAddStatus}
              handleAddAnnoucement={handleAddAnnoucement}
            />
          </div>
          <div
            className={`p-5  ${
              state === 2
                ? "bg-[#2B2B2B] text-white rounded-b-[30px]"
                : "hidden"
            }`}
          >
            <JobInvitation handleSendInvitation={handleSendInvitation} />
          </div>
        </div>
      </div>

      {showAddStatus && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 "
          style={{ overflowY: "scroll"}}
        >
          <div
            className="bg-[#2B2B2B] bg-opacity-90 rounded-lg w-[60%]"
            style={{
              padding: "2em",
              border: "1px solid rgb(234, 113, 34,0.53)",
              overflowY: "scroll",
              WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none', '&::-webkit-scrollbar': { display: 'none' },
              maxHeight: "90%",
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ width: "95%" }}>
                <div
                  style={{
                    color: "white",
                    fontSize: "23px",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Status Update
                </div>
              </div>

              <RxCross2
                onClick={handleAddStatusClose}
                size={30}
                style={{
                  color: "white",
                  alignItems: "end",
                  width: "5%",
                  cursor: "pointer",
                }}
              />
            </div>
            <div
              style={{
                background:
                  "linear-gradient(to bottom, #2B2B2B , #2B2B2B 5%, #1A1A1A 75%, #1A1A1A 75%) ",
                borderRadius: "10px",
                marginTop: "1.5em",
                position: "relative",
              }}
            >
              <div style={{ padding: "2em" }}>
                <div style={{ color: "white", fontSize: "15px" }}>
                  Upload Image or Video
                </div>
                <div style={{ position: "relative", marginTop: "1em" }}>
                  <input
                    type="text"
                    placeholder="Choose File"
                    className="rounded-[10px] px-4 py-2 bg-[#272727] w-full text-white"
                  />
                  <button
                    style={{
                      position: "absolute",
                      right: "1px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgb(234, 113, 34,0.20)",
                      color: "white",
                      borderRadius: "10px",
                    }}
                    className="w-[100px] h-[40px]"
                  >
                    Browse File
                  </button>
                </div>
                <div
                  style={{
                    border: "2px dashed rgb(234, 113, 34)",
                    marginTop: "1em",
                  }}
                >
                  <Dropzone
                    accept={{ "image/*": [], "video/*": [] }}
                    onDrop={(acceptedFiles) => {
                      console.log(acceptedFiles);
                      setFile(URL.createObjectURL(acceptedFiles[0]));
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div
                          {...getRootProps()}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {file ? (
                            <img
                              src={file}
                              alt=""
                              sx={{
                                width: "100%",
                                height: "100%",
                                maxHeight: "200px",
                              }}
                            />
                          ) : (
                            <>
                              <input {...getInputProps()} />
                              <div className="text-white opacity-25 ">
                                <FaCloudUploadAlt size={100} />
                              </div>
                              <p className="text-white opacity-25 ">
                                Drag and drop files here
                              </p>
                            </>
                          )}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  {/* <form>
                                        <input className="file-input" type="file" name="file" hidden />
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <div className="text-white opacity-25 ">
                                                <FaCloudUploadAlt size={100} />
                                            </div>
                                            <p className="text-white opacity-25 ">Drag and drop files here</p>
                                        </div>
                                    </form> */}
                </div>

                <div style={{ width: "100%", marginTop: "1em" }}>
                  {/* Test */}
                  <div style={{ width: "50%", color: "#fff" }}>
                    <div
                      style={{ width: "100%", height: "80px", display: "flex" }}
                    >
                      <div
                        style={{
                          width: "20%",
                          fontSize: "2em",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaFileAlt />
                      </div>
                      <div
                        style={{
                          width: "80%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ width: "100%", height: "60%" }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              height: "50%",
                              alignItems: "center",
                            }}
                          >
                            {/* <div style={{ width: '25%' }}>image.jpg</div>
                                                        <div
                                                            style={{ width: '50%', textAlign: 'center', color: 'grey' }}
                                                        >
                                                            (2MB)
                                                        </div>
                                                        <div style={{ width: '25%', textAlign: 'right' }}>0%</div> */}
                          </div>

                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              height: "50%",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                height: "5px",
                                backgroundColor: "grey",
                                borderRadius: "5px",
                              }}
                            >
                              <div
                                style={{
                                  width: "15%",
                                  height: "5px",
                                  // backgroundColor: 'blue',
                                  borderRadius: "5px",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", marginTop: "1em" }}>
                  <div
                    style={{
                      color: "white",
                      fontSize: "15px",
                      marginBottom: "1em",
                    }}
                  >
                    Description
                  </div>
                  <div style={{ width: "100%" }}>
                    <textarea
                      rows={3}
                      placeholder="Type Here"
                      style={{
                        width: "100%",
                        backgroundColor: "#1b1b1b",
                        border: "2px dashed rgb(234, 113, 34)",
                        borderRadius: "10px",
                        color: "#fff",
                        padding: "1em",
                        outline: "none",
                      }}
                    ></textarea>
                  </div>
                </div>

                <div
                  className="flex justify-center w-[100%]"
                  style={{ marginTop: "1em" }}
                >
                  <button
                    className="w-[100px] h-[50px] rounded-[10px] mr-5"
                    style={{ backgroundColor: "rgb(234, 113, 34,0.16)" }}
                  >
                    Clear
                  </button>
                  <button className="bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] mr-5">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddAnnoucement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 "
          style={{}}
        >
          <div
            className="bg-[#2B2B2B] bg-opacity-90 rounded-lg w-[60%]"
            style={{
              padding: "2em",
              border: "1px solid rgb(234, 113, 34,0.53)",
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ width: "95%" }}>
                <div
                  style={{
                    color: "white",
                    fontSize: "23px",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Annoucement
                </div>
              </div>

              <RxCross2
                onClick={handleAddAnnoucementClose}
                size={30}
                style={{
                  color: "white",
                  alignItems: "end",
                  width: "5%",
                  cursor: "pointer",
                }}
              />
            </div>
            <div
              style={{
                background:
                  "linear-gradient(to bottom, #2B2B2B , #2B2B2B 5%, #1A1A1A 75%, #1A1A1A 75%) ",
                borderRadius: "10px",
                marginTop: "1.5em",
                position: "relative",
              }}
            >
              <div style={{ padding: "2em" }}>
                <div style={{ width: "100%", marginTop: "1em" }}>
                  <div
                    style={{
                      color: "white",
                      fontSize: "15px",
                      marginBottom: "1em",
                    }}
                  >
                    Description
                  </div>
                  <div style={{ width: "100%" }}>
                    <textarea
                      rows={3}
                      placeholder="Type Here"
                      style={{
                        width: "100%",
                        backgroundColor: "#1b1b1b",
                        border: "2px dashed rgb(234, 113, 34)",
                        borderRadius: "10px",
                        color: "#fff",
                        padding: "1em",
                        outline: "none",
                      }}
                    ></textarea>
                  </div>
                </div>

                <div style={{ color: "white", fontSize: "15px" }}>
                  Attach Document
                </div>
                <div style={{ position: "relative", marginTop: "1em" }}>
                  <input
                    type="text"
                    placeholder="Choose File"
                    className="rounded-[10px] px-4 py-2 bg-[#272727] w-full text-white"
                  />
                  <button
                    style={{
                      position: "absolute",
                      right: "1px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgb(234, 113, 34,0.20)",
                      color: "white",
                      borderRadius: "10px",
                    }}
                    className="w-[100px] h-[40px]"
                  >
                    Browse File
                  </button>
                </div>
                <div
                  style={{
                    border: "2px dashed rgb(234, 113, 34)",
                    marginTop: "1em",
                  }}
                >
                  <form>
                    <input
                      className="file-input"
                      type="file"
                      name="file"
                      hidden
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="text-white opacity-25 ">
                        <FaCloudUploadAlt size={100} />
                      </div>
                      <p className="text-white opacity-25 ">
                        Drag and drop files here
                      </p>
                    </div>
                  </form>
                </div>

                <div style={{ width: "100%", marginTop: "1em" }}>
                  {/* Test */}
                  <div style={{ width: "50%", color: "#fff" }}>
                    <div
                      style={{ width: "100%", height: "80px", display: "flex" }}
                    >
                      <div
                        style={{
                          width: "20%",
                          fontSize: "2em",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaFileAlt />
                      </div>
                      <div
                        style={{
                          width: "80%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ width: "100%", height: "60%" }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              height: "50%",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ width: "25%" }}>image.jpg</div>
                            <div
                              style={{
                                width: "50%",
                                textAlign: "center",
                                color: "grey",
                              }}
                            >
                              (2MB)
                            </div>
                            <div style={{ width: "25%", textAlign: "right" }}>
                              15%
                            </div>
                          </div>

                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              height: "50%",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                height: "5px",
                                backgroundColor: "grey",
                                borderRadius: "5px",
                              }}
                            >
                              <div
                                style={{
                                  width: "15%",
                                  height: "5px",
                                  backgroundColor: "blue",
                                  borderRadius: "5px",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex justify-center w-[100%]"
                  style={{ marginTop: "1em" }}
                >
                  <button
                    className="w-[100px] h-[50px] rounded-[10px] mr-5"
                    style={{ backgroundColor: "rgb(234, 113, 34,0.16)" }}
                  >
                    Clear
                  </button>
                  <button className="bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] mr-5">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSendInvitation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 "
          style={{}}
        >
          <div
            className="bg-[#2B2B2B] bg-opacity-90 rounded-lg w-[60%]"
            style={{
              padding: "2em",
              border: "1px solid rgb(234, 113, 34,0.53)",
              color: "white",
              height: "700px",
              overflow: "scroll",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ width: "95%" }}>
                <div
                  style={{
                    color: "white",
                    fontSize: "23px",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Send Interview Invitation
                </div>
              </div>

              <RxCross2
                onClick={handleSendInvitationClose}
                size={30}
                style={{
                  color: "white",
                  alignItems: "end",
                  width: "5%",
                  cursor: "pointer",
                }}
              />
            </div>

            <div style={{ color: "white" }}>
              Software Engineer Job Interview Invitation
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              <div style={{ width: "80%" }}>
                <div style={{ width: "100%", display: "flex" }}>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "center",
                      padding: "1em",
                    }}
                  >
                    <SlCalender size={20} />
                    <div style={{ fontSize: "15px", marginRight: "0.8em" }}>
                      12-01-2024
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "center",
                    }}
                  >
                    <FaLink size={20} />
                    <div style={{ fontSize: "15px", marginRight: "0.8em" }}>
                      www.zoom.com
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", display: "flex" }}>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "center",
                      padding: "1em",
                    }}
                  >
                    <FaRegClock size={20} />
                    <div style={{ fontSize: "15px", marginRight: "0.8em" }}>
                      9.00-10.00AM
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "center",
                    }}
                  >
                    <FaKey size={20} />
                    <div style={{ fontSize: "15px", marginRight: "0.8em" }}>
                      1234DWQ
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", display: "flex" }}>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "center",
                      padding: "1em",
                    }}
                  >
                    <TbBulb size={20} />
                    <div style={{ fontSize: "15px", marginRight: "0.8em" }}>
                      1 year experience
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "center",
                    }}
                  >
                    <SlBadge size={20} />
                    <div style={{ fontSize: "15px", marginRight: "0.8em" }}>
                      python etc.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p
              style={{
                textAlign: "justify",
                height: "300px",
                overflow: "scroll",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              We hope this message finds you well. After reviewing your
              impressive profile, we are excited to extend an invitation for you
              to apply for the Senior Software Engineer position at [Company
              Name]. Your proven expertise aligns perfectly with our current
              needs, and we believe your skills will contribute significantly to
              our dynamic team. <br />
              <br />
              About Us: [Company Name] is a [industry/sector] leader known for
              [brief description of the company's mission, values, and key
              projects]. We are committed to innovation and excellence, and our
              work environment encourages collaboration and continuous learning.{" "}
              <br />
              <br />
              Position Overview: As a Senior Software Engineer at [Company
              Name], you will play a crucial role in designing, developing, and
              maintaining our cutting-edge software solutions. Your
              responsibilities will include [mention key responsibilities such
              as software architecture, coding, testing, and collaboration with
              cross-functional teams]. This role provides an opportunity to lead
              and mentor junior engineers, contribute to the strategic direction
              of projects, and work on high-impact initiatives. <br />
              <br />
              Requirements: <br />
              <br />
              [List specific technical skills, programming languages, and tools
              relevant to the position] <br />
              [Highlight any additional qualifications or experience desired]{" "}
              <br />
              What We Offer: <br />
              <br />
              Competitive salary and benefits package <br />
              Professional development opportunities <br />
              Collaborative and inclusive work culture <br />
              [Any additional perks or unique aspects of your company]
            </p>

            <div
              style={{
                marginTop: "2em",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleSendInvitation}
                className="bg-[#EA7122] w-[120px] h-[40px] rounded-[10px]"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBar({ handleAddStatus, handleAddAnnoucement }) {
  return (
    <div>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "50%", margin: 0 }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "10em",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "65px",
                    height: "65px",
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D')",
                    backgroundSize: "cover",
                    borderRadius: "100px",
                  }}
                ></div>
              </div>

              <div
                style={{ fontSize: "18px", textAlign: "center" }}
                className="text-white opacity-25 "
              >
                My Status
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  onClick={handleAddStatus}
                  className="AddIcon"
                  style={{
                    width: "65px",
                    height: "65px",
                    backgroundImage:
                      "url('https://cdn-icons-png.freepik.com/512/4720/4720413.png')",
                    backgroundSize: "cover",
                    borderRadius: "100px",
                    cursor: "pointer",
                  }}
                ></div>
              </div>

              <div
                style={{ fontSize: "18px", textAlign: "center" }}
                className="text-white opacity-25 "
              >
                Add Status
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "1em",
            }}
          >
            <div
              style={{
                width: "80%",
                height: "500px",
                overflow: "scroll",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
                borderImage:
                  "linear-gradient(to bottom, rgb(234, 113, 34),#2B2B2B) 1",
                borderStyle: "solid",
                borderWidth: "1px 1px 0px 1px",
              }}
            >
              <SingleStatus
                imageUrl="https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png"
                timeAgo="5 mins ago"
                views={20}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: "50%",
            margin: 0,
            borderLeft: "1px solid rgb(234, 113, 34, 0.25) ",
          }}
        >
          <div
            style={{
              marginTop: "1em",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleAddAnnoucement}
              className="bg-[#EA7122] w-[150px] h-[50px] rounded-[10px] "
            >
              Send Annoucement
            </button>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "2.5em",
            }}
          >
            <div
              style={{
                width: "80%",
                height: "300px",
                overflow: "scroll",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
                borderImage:
                  "linear-gradient(to bottom, rgb(234, 113, 34),#2B2B2B) 1",
                borderStyle: "solid",
                borderWidth: "1px 1px 0px 1px",
              }}
            >
              <SingleAnnoucement annoucement="All the candidates should upload..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SingleStatus({ imageUrl, timeAgo, views }) {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "70px",
          display: "flex",
          padding: "0.3em",
          background:
            "linear-gradient(to bottom, rgb(234, 113, 34,0.03), rgb(234, 113, 34,0.03) 5%, #2B2B2B 75%, #2B2B2B 75%)",
        }}
      >
        <div style={{ width: "25%" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              borderRadius: "100px",
            }}
          ></div>
        </div>
        <div
          style={{
            width: "50%",
            textAlign: "center",
            fontSize: "1em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            opacity: "0.25",
          }}
        >
          {timeAgo}
        </div>
        <div
          style={{
            width: "25%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <MdOutlineRemoveRedEye
                size={25}
                style={{ color: "white", opacity: "0.25", cursor: "pointer" }}
              />
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "0.8em",
                color: "white",
                opacity: "0.25",
              }}
            >
              {views} VIEWS
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RiDeleteBinLine
              size={25}
              style={{ color: "white", opacity: "0.25", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function SingleAnnoucement({ annoucement }) {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "70px",
          display: "flex",
          padding: "1em",
          background:
            "linear-gradient(to bottom, rgb(234, 113, 34,0.03), rgb(234, 113, 34,0.03) 5%, #2B2B2B 75%, #2B2B2B 75%)",
        }}
      >
        <div style={{ width: "25%" }}>
          <GrAnnounce
            size={30}
            style={{
              color: "white",
              opacity: "0.25",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "0.8em",
              color: "white",
              opacity: "0.25",
            }}
          >
            ANNOUCEMENT
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "0.8em",
              color: "white",
            }}
          >
            {annoucement}
          </div>
        </div>
        <div
          style={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <RiDeleteBinLine
            size={30}
            style={{ color: "white", opacity: "0.25", cursor: "pointer" }}
          />
        </div>
      </div>
    </>
  );
}

function JobInvitation({ handleSendInvitation }) {
  return (
    <div style={{ marginLeft: "1em", marginRight: "1em" }}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "50%",
            background:
              "linear-gradient(to bottom, rgb(0, 0, 0,0.2), rgb(0, 0, 0,0.2) 5%, rgb(217, 217, 217,0) 75%, rgb(217, 217, 217,0) 75%)",
            borderRadius: "10px",
            padding: "1em",
            marginRight: "0.2em",
          }}
        >
          <div style={{ textAlign: "center", fontSize: "15px" }}>
            Upcoming Interview Scheduling
          </div>

          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                width: "90%",
                height: "500px",
                overflow: "scroll",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
                marginTop: "1em",
              }}
            >
              <SingleInvitation
                timeSlot="9.00-10.00 AM"
                date="12-01-2024"
                position="Software Engineer"
                handleSendInvitation={handleSendInvitation}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: "50%",
            background:
              "linear-gradient(to bottom, rgb(0, 0, 0,0.2), rgb(0, 0, 0,0.2) 5%, rgb(217, 217, 217,0) 75%, rgb(217, 217, 217,0) 75%)",
            borderRadius: "10px",
            padding: "1em",
            marginRight: "0.2em",
          }}
        >
          <div style={{ textAlign: "center", fontSize: "15px" }}>
            Sent Interview Invitation List
          </div>

          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                width: "90%",
                height: "500px",
                overflow: "scroll",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
                marginTop: "1em",
              }}
            >
              <SentInvitation
                timeSlot="9.00-10.00 AM"
                date="12-01-2024"
                position="Software Engineer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SingleInvitation({ timeSlot, date, position, handleSendInvitation }) {
  return (
    <div
      style={{
        padding: "0.5em",
        borderImage: "linear-gradient(to bottom, #383838,rgb(56, 56, 56,0)) 1",
        borderStyle: "solid",
        borderWidth: "1px 1px 0px 1px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "70%",
          color: "white",
          opacity: "25%",
        }}
      >
        <div style={{ width: "35%", fontSize: "12px" }}>{timeSlot}</div>
        <div style={{ width: "35%", fontSize: "12px" }}>{date}</div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "15%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            opacity: "25%",
          }}
        >
          <SlCalender size={20} />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
          }}
        >
          {position} Interview
        </div>
        <div
          style={{
            width: "35%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleSendInvitation}
            className="bg-[#EA7122] w-[120px] h-[40px] rounded-[10px]"
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
}

function SentInvitation({ timeSlot, date, position }) {
  return (
    <div
      style={{
        padding: "0.5em",
        borderImage: "linear-gradient(to bottom, #383838,rgb(56, 56, 56,0)) 1",
        borderStyle: "solid",
        borderWidth: "1px 1px 0px 1px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "70%",
          color: "white",
          opacity: "25%",
        }}
      >
        <div style={{ width: "35%", fontSize: "12px" }}>{timeSlot}</div>
        <div style={{ width: "35%", fontSize: "12px" }}>{date}</div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "15%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            opacity: "25%",
          }}
        >
          <SlCalender size={20} />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
          }}
        >
          {position} Interview
        </div>
        <div
          style={{
            width: "35%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            className="w-[120px] h-[40px] rounded-[10px]"
            style={{ backgroundColor: "rgb(234, 113, 34,0.16)" }}
          >
            Sent
          </button>
        </div>
      </div>
    </div>
  );
}
