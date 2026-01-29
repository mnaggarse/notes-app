import jwt from "jsonwebtoken";

const createJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

export default createJwtToken;
