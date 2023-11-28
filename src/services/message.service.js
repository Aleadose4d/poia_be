import createHttpError from "http-errors";
import { MessageModel } from "../models/index.js";
function encryptMessageData(encryptedValue,key){
  //encryptMessageData=atob (encryptedValue);
  let encryptedValueData="";
  for(let i=0;i<encryptedValue.length;i++){
      encryptedValueData+=String.fromCharCode(encryptedValue.charCodeAt(i)^key.charCodeAt(i%key.length));
    }
    //console.log(encryptedValueData);
    return btoa(encryptedValueData);
    //console.log("Hello world");
};

function decryptMessageData(encryptedValue,key){
  encryptedValue=atob(encryptedValue);
  let decryptValueData="";
  for(let i=0;i<encryptedValue.length;i++){
    decryptValueData+=String.fromCharCode(encryptedValue.charCodeAt(i)^key.charCodeAt(i%key.length));
  }
  return decryptValueData;
};

export const createMessage = async (data) => {
  let newMessage = await MessageModel.create(data);
  if (!newMessage)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  return newMessage;
};

export const populateMessage = async (id) => {
  let msg = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name picture isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });
  if (!msg) throw createHttpError.BadRequest("Oops...Something went wrong !");
  let Message100="Buenos dias";
  let Key100="Akaza";
  let encryptionKey=msg["sender"]["name"];
  let decryptionKey=msg["sender"]["name"];
  let msgString=msg.toString();
  let encryptedMsg=encryptMessageData(msgString,encryptionKey);
  let resultString = decryptMessageData(encryptedMsg, decryptionKey);
  console.log("Mensaje encriptado \n");
  console.log(encryptedMsg);
  console.log("Mensaje desencriptado \n");
  console.log(resultString);
  console.log("Nombre: " + msg["sender"]["name"]);

      if(msgString<resultString||resultString<msgString){
        return null;
  }
  //console.log("Hola mundo");
  //console.log("Mensaje original: " + Message100);
  //console.log("Mensaje encriptado: " + encryptedMessage);
  //console.log("Llave esperada: " + Key100);
  //let llaveProporcinada="Carla";
  //console.log("llaveProporcionada: " + llaveProporcinada);
  //console.log("Mensaje desencriptado: "+ decryptMessageData(encryptedMessage,llaveProporcinada));
  return msg;
};

export const getConvoMessages = async (convo_id) => {
  const messages = await MessageModel.find({ conversation: convo_id })
    .populate("sender", "name picture email status")
    .populate("conversation");
  if (!messages) {
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }
  return messages;
};