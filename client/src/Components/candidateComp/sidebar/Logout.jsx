import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../../hooks/useLogout'; 

export default function Logout() {
  const { loading, logout } = useLogout();
  
  return (
    <div className='mb-7'>
      <button 
        className='flex justify-between items-center h-12 w-28 bg-amber-800 rounded-xl text-white mx-3 px-4 font-semibold hover:bg-amber-700'
        onClick={logout}
      >
        <BiLogOut className="text-xl" /> 
        Logout
      </button>
    </div>
  );
}

