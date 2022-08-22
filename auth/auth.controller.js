import { findById } from "../user/user.model.js";
import jwt from "jsonwebtoken";

/**
 * @description - This function is used to verify the auth token
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns { active: boolean } - Returns true if token is valid else false
 */
export const introspectAuthToken = async (req, res) => {
  try {
    const { name, token } = req.body;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    console.debug(`introspectAuthToken: ${id}`);

    const user = await findById(id);
    console.debug(`introspectAuthToken: ${JSON.stringify(user)}`);

    if (!user) {
      return res.status(404).send({ active: false, message: "User not found" });
    }

    if (user.name !== name) {
      return res.status(401).send({ active: false, message: "Invalid token" });
    }

    res.status(200).send({ active: true });
  } catch (err) {
    res.status(401).send({ active: false, message: "Invalid token" });
  }
};
