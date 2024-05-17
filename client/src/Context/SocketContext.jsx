import { createContext, useEffect, useState, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => { // inside this custom hook we can access the SocketContext global states
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {

  const[socket, setSocket] = useState(null);
  const[onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {

    if(authUser) {
      // This will creates connection with backend server
      const socket = io("http://localhost:8000", {
        query: {
          userId: authUser._id,
        }
      });
      // io function returns a Socket object representing the connection to the specified server URL (http://localhost:8000).
      // This Socket object allows you to send and receive events in real-time between the client and the server using Socket.IO.
      setSocket(socket);
      // socket.on is used to listen to the events. can be used both on client and server side 
      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close(); // clean up Function

    } else {
      if(socket) {
      socket.close();
      setSocket(null);
      }
    }

  }, [authUser]);

  return (
    <SocketContext.Provider value={{socket, onlineUsers}}>
      {children}
    </SocketContext.Provider>
  )
}