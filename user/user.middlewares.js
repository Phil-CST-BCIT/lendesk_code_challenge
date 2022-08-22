import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @description - This function is used to hash a password before saving it to the database
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @param {*} next - Next middleware
 */
export const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const SALT_ROUNDS = 7;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    req.body.password = hashedPassword;
    next();
  } catch (err) {
    res.status(400).send({ err, message: err.message });
  }
};

/**
 * @description - This function is used to verify the password before logging in a user
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @param {*} next - Next middleware
 * @returns void
 */
export const verifyPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { user } = res.locals;
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send({ message: "Password is incorrect" });
    }

    next();
  } catch (err) {
    res.status(400).send({ err, message: err.message });
  }
};

/**
 * @description - This function is used to generate a token for a user
 * @param {*} _req  - Request object
 * @param {*} res - Response object
 * @returns { token: string } - Returns a token for the user
 */
export const generateAuthToken = (_req, res) => {
  try {
    const { user } = res.locals;
    console.log(
      "inside user.middlewares.js",
      user?.entityId,
      process.env.JWT_SECRET
    );
    const ONE_DAY = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
    const token = jwt.sign(
      {
        id: user?.entityId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: ONE_DAY,
      }
    );
    res.status(200).send({ token });
  } catch (err) {
    res.status(400).send({ err, message: err.message });
  }
};
