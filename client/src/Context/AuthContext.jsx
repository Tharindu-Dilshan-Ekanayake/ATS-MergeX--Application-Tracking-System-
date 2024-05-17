import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(); // creating global state / custom context


export const useAuthContext = () => {
  return useContext(AuthContext);  // We created this useAuthContext hook for to use AuthContext, it will return authUser & setAuthUser
}

export const AuthContextProvider = ({ children }) => { // This is just component

  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || 'dummyValue'); // useState 

  return (
    <AuthContext.Provider value={{authUser, setAuthUser}}>
      {children} 
    </AuthContext.Provider>
  )
}