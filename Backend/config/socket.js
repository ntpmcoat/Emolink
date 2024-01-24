import {Server} from "socket.io"

const setupSocketIO = (server) => {
    const io = new Server(server);
  
    io.on('connection', (socket) => {
      console.log('A user connected');
  
      // Handle events (chat messages, user connections, etc.) here
  
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
  
      // Handle incoming chat messages
      socket.on('message', (message) => {
        // Broadcast the message to all connected clients
        io.emit('message', message);
      });
    });
  
    return io;
  };
  
  export default setupSocketIO;
  