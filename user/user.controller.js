import { findByName, userRepository } from "./user.model.js";

/**
 * @description - This function is used to sign up a new user
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @param {*} next - Next middleware
 * @returns void
 * @Note - In production environment, we probably want to record the event
 * when a user signs up
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    console.debug(name, password);

    const user = await findByName(name);

    if (user) {
      return res.status(409).send({ message: "User already exists" });
    }

    const newUser = await userRepository.createAndSave({ name, password });

    res.locals.user = newUser;
    next();
  } catch (err) {
    res.status(400).send({ err, message: err.message });
  }
};

/**
 * @description - This function is used to login a user
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @param {*} next - Next middleware
 * @returns void
 * @Note - In production environment, we might want to log the event somewhere
 * when a user logs in
 */
export const loginUser = async (req, res, next) => {
  try {
    const { name } = req.body;

    const user = await findByName(name);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.locals.user = user;
    next();
  } catch (err) {
    res.status(400).send({ err, message: err.message });
  }
};
