import React from 'react';

const ProgressTimeline = () => {
  let a=1;

  return (
    <div className="flex justify-center ">
    <div >
      
        <div  className="flex gap-x-3 ">
          <div className="w-16 text-end">
            <span className="text-xs text-gray-500 dark:text-neutral-400">24/12/2023</span>
          </div>
          <div className={`relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-[3px] after:-translate-x-[0.5px] after:bg-gray-200 ${ a === 1 || a === 2 || a === 3 ||a ===4 ? ' dark:after:bg-[#eb7323]' : 'dark:after:bg-neutral-700'}`}>
            <div className="relative z-10 size-7 flex justify-center items-center">
              <div className={`size-2  ring-[3px]  ${a === 0 || a === 1 || a === 2 || a === 3 ||a ===4 ? 'ring-[#eb7323]' : 'ring-neutral-600'} rounded-full bg-gray-400 dark:bg-neutral-600`}></div>
            </div>
          </div>
          <div className="grow pt-0.5 pb-8">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
            Invitation sent
            </h3>
            <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
            </button>
          </div>
        </div>

        <div  className="flex gap-x-3 ">
          <div className="w-16 text-end">
            <span className="text-xs text-gray-500 dark:text-neutral-400">25/12/2023</span>
          </div>
          <div className={`relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-[3px] after:-translate-x-[0.5px] after:bg-gray-200 ${ a === 2 || a === 3 ||a ===4 ? ' dark:after:bg-[#eb7323]' : 'dark:after:bg-neutral-700'}`}>
            <div className="relative z-10 size-7 flex justify-center items-center">
              <div className={`size-2  ring-[3px]  ${a === 1 || a === 2 || a === 3 || a===4 ? 'ring-[#eb7323]' : 'ring-neutral-600'} rounded-full bg-gray-400 dark:bg-neutral-600`}></div>
            </div>
          </div>
          <div className="grow pt-0.5 pb-8">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
            Follow up sent
            </h3>
            <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
            </button>
          </div>
        </div>
        <div  className="flex gap-x-3 ">
          <div className="w-16 text-end">
            <span className="text-xs text-gray-500 dark:text-neutral-400">27/12/2023</span>
          </div>
          <div className={`relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-[3px] after:-translate-x-[0.5px] after:bg-gray-200 ${ a === 3 || a===4 ? ' dark:after:bg-[#eb7323]' : 'dark:after:bg-neutral-700'}`}>
            <div className="relative z-10 size-7 flex justify-center items-center">
              <div className={`size-2  ring-[3px]  ${a === 2 || a === 3 || a===4 ? 'ring-[#eb7323]' : 'ring-neutral-600'} rounded-full bg-gray-400 dark:bg-neutral-600`}></div>
            </div>
          </div>
          <div className="grow pt-0.5 pb-8">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
            Interview scheduled
            </h3>
            <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
            </button>
          </div>
        </div>
        <div  className="flex gap-x-3 ">
          <div className="w-16 text-end">
          </div>
          <div className={`relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-[3px] after:-translate-x-[0.5px] after:bg-gray-200 ${a ===4  ? ' dark:after:bg-[#eb7323]' : 'dark:after:bg-neutral-700'}`}>
            <div className="relative z-10 size-7 flex justify-center items-center">
              <div className={`size-2  ring-[3px]  ${a === 3 ||a ===4  ? 'ring-[#eb7323]' : 'ring-neutral-600'} rounded-full bg-gray-400 dark:bg-neutral-600`}></div>
            </div>
          </div>
          <div className="grow pt-0.5 pb-8">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
            Faced Interview
            </h3>
            <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700">
            </button>
          </div>
        </div>
        <div  className="flex gap-x-3 ">
          <div className="w-16 text-end">
           
          </div>
          <div className="relative last:after:hidden  dark:after:bg-neutral-700">
            <div className="relative z-10 size-7 flex justify-center items-center">
              <div className={`size-2  ring-[3px]  ${a === 4 ? 'ring-[#eb7323]' : 'ring-neutral-600'} rounded-full bg-gray-400 dark:bg-neutral-600`}></div>
            </div>
          </div>
          <div className="grow pt-0.5 pb-8">
            <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
            Waiting for feedback
            </h3>
           
          </div>
        </div>
      
    </div>
    </div>
  );
};

export default ProgressTimeline;