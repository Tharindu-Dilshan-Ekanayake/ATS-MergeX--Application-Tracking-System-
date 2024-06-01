import React, { useState, useEffect, useRef } from 'react';

export default function LinearBuffer(props) {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        setProgress(props.progress);
        setBuffer(props.buffer);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Calculate progress percentage
  const progressPercentage = Math.round((progress / 100) * 100);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200"><span className="absolute right-0 top-1/2 transform -translate-y-8 pr-2  inline-block mb-2 ms-[calc(25%-1.25rem)] py-0.5 px-1.5 bg-orange-50 border border-orange-200 text-xs font-bold text-orange-500 rounded-lg dark:bg-orange-800/30 dark:border-orange-800 dark:text-orange-500">{progressPercentage}%</span>
        <div style={{ width: `${progress}%` }} className=" [transition:width_0.8s_ease-in-out]
 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
        <div style={{ width: `${buffer}%` }} className="[transition:width_0.6s_ease-in-out]
 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"></div>
      </div>
      
    </div>
  );
}