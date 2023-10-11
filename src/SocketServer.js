let onlineUsers = [];
export default function (socket, io) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 086b69ca9e5198a71a22809a34597933b79ca580
  //user joins or opens the application
  socket.on("join", (user) => {
    socket.join(user);
    //add joined user to online users
    if (!onlineUsers.some((u) => u.userId === user)) {
      onlineUsers.push({ userId: user, socketId: socket.id });
    }
    //send online users to frontend
    io.emit("get-online-users", onlineUsers);
    //send socket id
    io.emit("setup socket", socket.id);
  });
<<<<<<< HEAD
=======
=======
    //user joins or opens the application
    socket.on("join", (user) => {
        console.log("user has joined : ", user);
        socket.join(user);
        //add joined user to online users
        if(!onlineUsers.some((u) =>u.userId===user)){
            onlineUsers.push({userId: user, socketId: socket.id});
        }
        //send online users to frontend
        io.emit("get-online-users", onlineUsers);
        //send socket id
        io.emit("setup socket", socket._id);
    });
>>>>>>> 47d96b882d4fc10b21160352bdbcb157d8762321
>>>>>>> 086b69ca9e5198a71a22809a34597933b79ca580

  //socket disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-online-users", onlineUsers);
  });
<<<<<<< HEAD

  //join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
  });

  //send and receive message
  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("receive message", message);
    });
  });

  //typing
  socket.on("typing", (conversation) => {
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation) => {
    socket.in(conversation).emit("stop typing");
  });

=======

  //join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
  });

  //send and receive message
  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("receive message", message);
    });
  });

  //typing
  socket.on("typing", (conversation) => {
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation) => {
    socket.in(conversation).emit("stop typing");
  });

>>>>>>> 086b69ca9e5198a71a22809a34597933b79ca580
  //call
  //---call user
  socket.on("call user", (data) => {
    let userId = data.userToCall;
    let userSocketId = onlineUsers.find((user) => user.userId == userId);
    io.to(userSocketId.socketId).emit("call user", {
      signal: data.signal,
      from: data.from,
      name: data.name,
      picture: data.picture,
    });
  });
  //---answer call
  socket.on("answer call", (data) => {
    io.to(data.to).emit("call accepted", data.signal);
  });

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 086b69ca9e5198a71a22809a34597933b79ca580
  //---end call
  socket.on("end call", (id) => {
    io.to(id).emit("end call");
  });
}
<<<<<<< HEAD
=======
=======
    //typing
    socket.on("typing", (conversation)=> {
        socket.in(conversation).emit("typing", conversation);
    });
    socket.on("stop typing", (conversation)=> {
        socket.in(conversation).emit("stop typing");
    });

    //call
    //---call user
    socket.on("call user",(data)=>{
        let userId = data.userToCall;
        let userSocketId = onlineUsers.find((user) => user.userId == userId);
        io.to(userSocketId.socketId).emit("call user", {
            signal: data.signal,
            from: data.from,
            name: data.name,
            picture: data.picture,
        });
    });
    //---answer call
    socket.on("answer call", (data) => {
        io.to(data.to).emit("call accepted", data.signal);
    });

    //---end call
    socket.on("end call", (id) => {
        io.to(id).emit("end call");
    });
}
>>>>>>> 47d96b882d4fc10b21160352bdbcb157d8762321
>>>>>>> 086b69ca9e5198a71a22809a34597933b79ca580
