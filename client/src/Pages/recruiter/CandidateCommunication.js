import { useState } from "react";
import React from "react";
import StatusUpdate from "../../Components/recruitercomp/StatusUpdate";
import SendJobInvitation from "../../Components/recruitercomp/SendJobInvitation";

export default function CandidateCommunication() {
  const [state, setState] = useState(1);

  const action = (index) => {
    setState(index);
  };

  return (
    <div className="ml-[320px] bg-[#191919] pl-5 pr-5">
      <div className="w-full mt-2 bg-[#525252] h-200 rounded-[30px]">
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
                ? "bg-[#2B2B2B] text-white h-full flex items-center justify-center rounded-tr-[30px]"
                : "text-white opacity-25"
            }`}
          >
            Send job invitation
          </div>
        </div>

        <div>
          <div
            className={` ${
              state === 1
                ? "bg-[#2B2B2B] text-white rounded-b-[30px] h-full"
                : "hidden"
            }`}
          >
            <StatusUpdate />
          </div>
          <div
            className={`  ${
              state === 2
                ? "bg-[#2B2B2B] text-white rounded-b-[30px] h-full"
                : "hidden"
            }`}
          >
            <SendJobInvitation />
          </div>
        </div>
      </div>
    </div>
  );
}
