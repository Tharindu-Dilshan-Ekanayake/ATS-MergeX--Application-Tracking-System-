import React from "react";
// import notification from "../../Images/notification.png";
// import recruiter from "../../Images/recruiter.png";

const RecruiterHeader = () => {
  const currentTime = new Date().getHours();

  const getGreeting = () => {
    const ampm = currentTime >= 12 ? "PM" : "AM";
    if (
      (currentTime >= 5 && currentTime < 12) ||
      (currentTime === 12 && ampm === "AM")
    ) {
      return "Good Morning";
    } else if (currentTime === 12 || (currentTime === 12 && ampm === "PM")) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="flex pb-5">
      <div className="header">
        <p>
          {getGreeting()}, <span>Pramudi</span>
        </p>
      </div>

      <header>
        {/* <div>
          <img src={notification} alt="" />
        </div>
        <div className="user">
          <div className="user-img">
            <img src={recruiter} alt="" />
          </div>

          <div className="user-txt">
            <h3>Pramudi</h3>
            <p>Recruiter</p>
          </div>
        </div> */}
      </header>
    </div>
  );
};

export default RecruiterHeader;
