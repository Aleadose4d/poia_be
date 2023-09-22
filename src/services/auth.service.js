import createHttpError from "http-errors";
import validator from "validator";
import bcrypt from "bcrypt";
import {UserModel} from "../models/index.js";

//env variables
const {DEFAULT_PICTURE, DEFAULT_STATUS} = process.env;

export const createUser = async (userData) => {
    
    const {name, email, picture, status, password } = userData;

    //check if fields are empty
    if (!name || !email || !password) {
        throw createHttpError.BadRequest("Por favor, rellene todos los archivos.");
    }

    if(
        !validator.isLength(name, {
        min: 2,
        max: 16,
     })
     ) {
        throw createHttpError.BadRequest("Por favor, asegúrese de que su nombre tiene entre 2 y 16 caracteres."
        );
     }

     //Check status Length
    if (status && status.length > 64) {
        throw createHttpError.BadRequest(
            "Asegúrese de que su estado sea inferior a 64 caracteres."
        );
    }

    //check if email address is valid
 if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
        "Asegúrese de proporcionar una dirección de correo electrónico válida."
    );
 }

    //check if user already exist
    const checkDb = await UserModel.findOne({email});
    if (checkDb) {
        throw createHttpError.Conflict(
            "Inténtalo de nuevo con una dirección de correo electrónico diferente, este correo electrónico ya existe"
        );
    }

    //check password Length
    if(!validator.isLength(password,{
        min:6,
        max:128
    })){
        throw createHttpError.BadRequest("Please make sure your password is between 6 and 128 characters"
        );
    }


    //hash password--->to be done in the user model



    //adding user to database

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

    //check if user exist
    if (!user) throw createHttpError.NotFound("La credencial es invalido.");


    //compare passwords
    let passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) throw createHttpError.NotFound("La credencial es invalido.");

    return user;
};