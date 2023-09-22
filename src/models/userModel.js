import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor proporcione su nombre"],
    },
    email:{
        type: String,
        required: [true, "Por favor proporcione su dirección de correo electrónico"],
        unique: [true, "Este correo ya existe"],
        lowercase: true,
        validate:[validator.isEmail, "Porfavor proporcione si su direccion de correo electronico es valido"],
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    status: {
        type: String,
        default: "¡Hola! Estoy usando proyecto"
    },
    password: {
        type: String,
        required: [true, "Porfavor proporcione la contraseña"],
        minLenght: [
            6,
            "Asegúrese de que su contraseña tenga al menos 6 caracteres",
        ],
        maxLenght: [
            128,
            "Asegúrese de que su contraseña tenga al menos 128 caracteres",
        ],
    },
},{
    collection: "users",
    timestamps: true,
}
);

userSchema.pre("save", async function(next){
    try {
        if(this.isNew){
            const salt=await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    }catch (error) {
        next(error);
    }
});

const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;