const { Server } = require("socket.io");

const io = new Server({
  cors: "http://localhost:5173",
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("addNewUser", (userId) => {
    // Check if the user is already in the onlineUsers array
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });

      // Acknowledge the successful addition of the new user
      socket.emit("newUserAdded", { userId, socketId: socket.id });
    }

    // console.log("online users", onlineUsers);

    // Emit the updated list of online users to all clients
    io.emit("getOnlineUsers", onlineUsers);

    socket.on("sendMessage", (message) => {
      const user = onlineUsers.find(
        (user) => user.userId === message.recipientId
      );

      if (user) {
        io.to(user.socketId).emit("getMessage", message);
        io.to(user.socketId).emit("getNotification", {
          senderId: message.senderId,
          date: new Date(),
          isRead: false,
        });
        console.log(message);
      }
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      io.emit("getOnlineUsers", onlineUsers);
    });
  });
});

io.listen(5000);
