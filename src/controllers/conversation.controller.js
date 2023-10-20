import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import {
  createConversation,
  doesConversationExist,
  getUserConversations,
  populateConversation,
} from "../services/conversation.service.js";

export const create_open_conversation = async (req, res, next) => {
  console.log(req.body);
  try {
    const sender_id = req.user.userId;
    const { receiver_id, isGroup } = req.body;
<<<<<<< HEAD
    if (isGroup === false) {
=======
    if (isGroup == false) {
>>>>>>> 8664761b40bd62b36dcef7017fd10c7aca2ed595
      //check if receiver_id is provided
      if (!receiver_id) {
        logger.error(
          "please provide the user id you wanna start a conversation with !"
        );
        throw createHttpError.BadGateway("Oops...Something went wrong !");
      }
      //check if chat exists
      const existed_conversation = await doesConversationExist(
        sender_id,
        receiver_id,
        false
      );
      if (existed_conversation) {
        res.json(existed_conversation);
<<<<<<< HEAD
      } else {
        // let receiver_user = await findUser(receiver_id);
        let convoData = {
=======
<<<<<<< HEAD
      } else {
        // let receiver_user = await findUser(receiver_id);
        let convoData = {
=======
<<<<<<< HEAD
    }else {
        //let receiver_user = await findUser(receiver_id);
        let convoData = {
            name: "conversation name",
            picture: "conversation picture",
            isGroup: false,
            users: [sender_id, receiver_id],
=======
      } else {
        // let receiver_user = await findUser(receiver_id);
        let convoData = {
>>>>>>> f440f48a3ba2ee988c193c7738084f498ac617a8
>>>>>>> 8664761b40bd62b36dcef7017fd10c7aca2ed595
          name: "conversation name",
          picture: "conversation picture",
          isGroup: false,
          users: [sender_id, receiver_id],
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 305e09d8f9fb2b28804d6cb0a0ebfd490a1b1590
>>>>>>> f440f48a3ba2ee988c193c7738084f498ac617a8
>>>>>>> 8664761b40bd62b36dcef7017fd10c7aca2ed595
        };
        const newConvo = await createConversation(convoData);
        const populatedConvo = await populateConversation(
          newConvo._id,
          "users",
          "-password"
        );
        res.status(200).json(populatedConvo);
      }
    } else {
      console.log("hnaaaaaaaaaa");
      //it's a group chat
      //check if group chat exists
      const existed_group_conversation = await doesConversationExist(
        "",
        "",
        isGroup
      );
      res.status(200).json(existed_group_conversation);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const conversations = await getUserConversations(user_id);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
export const createGroup = async (req, res, next) => {
  const { name, users } = req.body;
  //add current user to users
  users.push(req.user.userId);
  if (!name || !users) {
    throw createHttpError.BadRequest("Please fill all fields.");
  }
  if (users.length < 2) {
    throw createHttpError.BadRequest(
      "Atleast 2 users are required to start a group chat."
    );
  }
  let convoData = {
    name,
    users,
    isGroup: true,
    admin: req.user.userId,
    picture: process.env.DEFAULT_GROUP_PICTURE,
  };
  try {
    const newConvo = await createConversation(convoData);
    const populatedConvo = await populateConversation(
      newConvo._id,
      "users admin",
      "-password"
    );
    res.status(200).json(populatedConvo);
  } catch (error) {
    next(error);
  }
<<<<<<< HEAD
};
=======
<<<<<<< HEAD
};
=======
};
>>>>>>> f440f48a3ba2ee988c193c7738084f498ac617a8
>>>>>>> 8664761b40bd62b36dcef7017fd10c7aca2ed595
