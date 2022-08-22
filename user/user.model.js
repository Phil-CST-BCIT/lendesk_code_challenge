import { Entity, Schema } from "redis-om";
import db from "../db.js";

class User extends Entity {}

const userSchema = new Schema(User, {
  name: { type: "string" },
  password: { type: "string" },
  created: { type: "date" },
});

export const userRepository = db.fetchRepository(userSchema);

await userRepository.createIndex();

/**
 * @description - Search for a user by name
 * @param {*} name - User name
 * @returns { User } - User object
 */
export const findByName = async (name) => {
  const user = await userRepository
    .search()
    .where("name")
    .equals(name)
    .return.first();
  console.debug("user.model.findByName", user);
  return user;
};

/**
 * @description - Search for a user by id
 * @param {*} id - User Entity id
 * @returns { User } - User object
 */
export const findById = async (id) => {
  const user = await userRepository.fetch(id);
  return user;
};
