import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js";

function encryptConversationsData(encryptedValue,key){
  //encryptMessageData=atob (encryptedValue);
  let encryptedValueData="";
  for(let i=0;i<encryptedValue.length;i++){
      encryptedValueData+=String.fromCharCode(encryptedValue.charCodeAt(i)^key.charCodeAt(i%key.length));
    }
    //console.log(encryptedValueData);
    return btoa(encryptedValueData);
    //console.log("Hello world");
};

function decryptConversationsData(encryptedValue,key){
  encryptedValue=atob(encryptedValue);
  let decryptValueData="";
  for(let i=0;i<encryptedValue.length;i++){
    decryptValueData+=String.fromCharCode(encryptedValue.charCodeAt(i)^key.charCodeAt(i%key.length));
  }
  return decryptValueData;
};


export const doesConversationExist = async (
  sender_id,
  receiver_id,
  isGroup
) => {
  if (isGroup === false) {
    let convos = await ConversationModel.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: sender_id } } },
        { users: { $elemMatch: { $eq: receiver_id } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (!convos)
      throw createHttpError.BadRequest("Oops...Something went wrong !");

    //populate message model
    convos = await UserModel.populate(convos, {
      path: "latestMessage.sender",
      select: "name email picture status",
    });

    return convos[0];
  } else {
    //it's a group chat
    let convo = await ConversationModel.findById(isGroup)
      .populate("users admin", "-password")
      .populate("latestMessage");

    if (!convo)
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    //populate message model
    convo = await UserModel.populate(convo, {
      path: "latestMessage.sender",
      select: "name email picture status",
    });

    return convo;
  }
};

export const createConversation = async (data) => {
  const newConvo = await ConversationModel.create(data);
  if (!newConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  return newConvo;
};

export const populateConversation = async (
  id,
  fieldToPopulate,
  fieldsToRemove
) => {
  const populatedConvo = await ConversationModel.findOne({ _id: id }).populate(
    fieldToPopulate,
    fieldsToRemove
  );
  if (!populatedConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  return populatedConvo;
};
export const getUserConversations = async (user_id) => {
  let conversations;
  await ConversationModel.find({
    users: { $elemMatch: { $eq: user_id } },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      conversations = results;
    })
    .catch((err) => {
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    });

    let Message100="Buenos dias";
  let Key100="Akaza";
  let encryptionKey="wpLCVzicowZVGnFh";
  let decryptionKey="wpLCVzicowZVGnFh";//cambiarle esta nada mas
  let conversationsString=conversations.toString();
  let encryptedConversations=encryptConversationsData(conversationsString,encryptionKey);
  let resultString = decryptConversationsData(encryptedConversations, decryptionKey);
 
      if(conversationsString<resultString||resultString<conversationsString){
        return null;
  }
  console.log("////// String resultante: ");
  console.log(resultString);
  return conversations;
};

export const updateLatestMessage = async (convo_id, msg) => {
  const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
    latestMessage: msg,
  });
  if (!updatedConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");

  return updatedConvo;
};