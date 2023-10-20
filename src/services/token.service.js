import { sign, verify } from "../utils/token.util.js";

export const generateToken = async (payload, expiresIn, secret) => {
  let token = await sign(payload, expiresIn, secret);
  return token;
};

export const verifyToken = async (token, secret) => {
  let check = await verify(token, secret);
  return check;
<<<<<<< HEAD
};
=======
<<<<<<< HEAD
};
=======
};
>>>>>>> f440f48a3ba2ee988c193c7738084f498ac617a8
>>>>>>> 8664761b40bd62b36dcef7017fd10c7aca2ed595
