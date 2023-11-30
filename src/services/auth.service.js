import createHttpError from "http-errors";
import validator from "validator";
import bcrypt from "bcrypt";
import { UserModel } from "../models/index.js";

//env variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  //Compruebe si los campos están vacíos
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields.");
  }

  //Comprobar la longitud del nombre
  if (
    !validator.isLength(name, {
      min: 2,
      max: 25,
    })
  ) {
    throw createHttpError.BadRequest(
      "Plase make sure your name is between 2 and 16 characters."
    );
  }

  //Comprobar la longitud del estado
  if (status && status.length > 64) {
    throw createHttpError.BadRequest(
      "Please make sure your status is less than 64 characters."
    );
  }

  //Compruebe si la dirección de correo electrónico es válida
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make sure to provide a valid email address."
    );
  }

  //Compruebe si el usuario ya existe
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict(
      "Please try again with a different email address, this email already exist."
    );
  }

  //Comprobar la longitud de la contraseña
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your password is between 6 and 128 characters."
    );
  }

  //hash password--->a realizar en el modelo de usuario

  //Adición de un usuario a DataBSE
  const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
    password,
  }).save();

  return user;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  //Compruebe si el usuario existe
  if (!user) throw createHttpError.NotFound("Invalid credentials.");

  //Comparar contraseñas
  let passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) throw createHttpError.NotFound("Invalid credentials.");

  return user;
};