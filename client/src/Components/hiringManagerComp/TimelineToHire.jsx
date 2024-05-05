export default function TimelineToHire(props) {
    return (
      <div className='flex flex-row'>
        <div className='day1 flex flex-col bg-[#474747]'>
          <div className='day1 h-[70px] rounded-[7px] bg-[#ed8240] box-border'></div>
          <div className='bg-[#2b2b2b] h-[90px] text-[11px]'>
            <p className='text-center'>Application</p>
            <p className='pl-[20px] text-[#cc6623] text-right'>{props.day1} days</p>
          </div>
        </div>
        <div className='day2c flex flex-col bg-[#474747]'>
          <div className='day2 h-[70px] rounded-[7px] ml-[3px] bg-[#e08851] box-border'></div>
          <div className='bg-[#2b2b2b] h-[90px] text-[11px]'>
            <p className='text-center'>Phone Screen</p>
            <p className='pl-[20px] text-[#cc6623] text-right'>{props.day2} days</p>
          </div>
        </div>
        <div className='day3c flex flex-col bg-[#474747]'>
          <div className='day3 h-[70px] rounded-[7px] bg-[#f09b62] ml-[3px]'></div>
          <div className='bg-[#2b2b2b] h-[90px] text-[11px]'>
            <p className='text-center'>Interview</p>
            <p className='pl-[20px] text-[#cc6623] text-right'>{props.day3} days</p>
          </div>
        </div>
        <div className='day4c flex flex-col bg-[#474747]'>
          <div className='day4 h-[70px] rounded-[7px] bg-[#dea985] ml-[3px]'></div>
          <div className='bg-[#2b2b2b] h-[90px] text-[11px]'>
            <p className='text-center'>Offer</p>
            <p className='pl-[20px] text-[#cc6623] text-right'>{props.day4} days</p>
          </div>
        </div>
        <div className='day5c flex flex-col bg-[#474747]'>
          <div className='day5 h-[70px] rounded-[7px] bg-[#edc8af] ml-[3px]'></div>
          <div className='bg-[#2b2b2b] h-[90px] text-[11px]'>
            <p className='text-center'>Hire</p>
            <p className='pl-[20px] text-[#cc6623] text-right'>{props.day5} days</p>
          </div>
        </div>
        <style>
          {`
          .day1 {
            width: ${22 * props.day1}px !important;
            transition: width 0.15s ease;
          }
          .day2 {
            width: ${22 * props.day2}px !important;
            transition: width 0.15s ease;
          }
          .day3 {
            width: ${22 * props.day3}px !important;
            transition: width 0.15s ease;
          }
          .day4 {
            width: ${22 * props.day4}px !important;
            transition: width 0.15s ease;
          }
          .day5 {
            width: ${22 * props.day5}px !important;
            transition: width 0.15s ease;
          }
          .day2c {
            width: ${22 * props.day2 + 3}px !important;
            transition: width 0.15s ease;
          }
          .day3c {
            width: ${22 * props.day3 + 3}px !important;
            transition: width 0.15s ease;
          }
          .day4c {
            width: ${22 * props.day4 + 3}px !important;
            transition: width 0.15s ease;
          }
          .day5c {
            width: ${22 * props.day5 + 3}px !important;
            transition: width 0.15s ease;
          }
          `}
        </style>
      </div>
    );
  }
  