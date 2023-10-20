import mongoose from "mongoose";
<<<<<<< HEAD
import { Server } from "socket.io";
import app from "./app.js";
import logger from "./configs/logger.config.js";
import SocketServer from "./SocketServer.js";
=======
<<<<<<< HEAD
import { Server } from "socket.io";
import app from "./app.js";
import logger from "./configs/logger.config.js";
import SocketServer from "./SocketServer.js";
=======
<<<<<<< HEAD
import { Server, Socket } from "socket.io";
import app from "./app.js";
import logger from "./configs/logger.config.js";
import SocketServer from "./SocketServer.js";

=======
import { Server } from "socket.io";
import app from "./app.js";
import logger from "./configs/logger.config.js";
import SocketServer from "./SocketServer.js";
>>>>>>> 305e09d8f9fb2b28804d6cb0a0ebfd490a1b1590
>>>>>>> f440f48a3ba2ee988c193c7738084f498ac617a8
>>>>>>> 8664761b40bd62b36dcef7017fd10c7aca2ed595
//env variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

//exit on mognodb error
mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error : ${err}`);
  process.exit(1);
});

//mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

//mongodb connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to Mongodb.");
  });
let server;

server = app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}.`);
});

//socket io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT,
  },
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
});
io.on("connection", (socket) => {
  logger.info("socket io connected successfully.");
  SocketServer(socket, io);
});

<<<<<<< HEAD
//socket io
const io = new Server (server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CLIENT_ENDPOINT,
    },
>>>>>>> f440f48a3ba2ee988c193c7738084f498ac617a8
>>>>>>> 8664761b40bd62b36dcef7017fd10c7aca2ed595
});
io.on("connection", (socket) => {
  logger.info("socket io connected successfully.");
  SocketServer(socket, io);
});

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======


=======
>>>>>>> 305e09d8f9fb2b28804d6cb0a0ebfd490a1b1590
>>>>>>> f440f48a3ba2ee988c193c7738084f498ac617a8
>>>>>>> 8664761b40bd62b36dcef7017fd10c7aca2ed595
//handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
<<<<<<< HEAD
});
=======
<<<<<<< HEAD
});
=======
});
>>>>>>> f440f48a3ba2ee988c193c7738084f498ac617a8
>>>>>>> 8664761b40bd62b36dcef7017fd10c7aca2ed595
