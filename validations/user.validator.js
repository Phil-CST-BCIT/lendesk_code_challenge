import { body, validationResult } from "express-validator";

/**
 * @description - This function is used to create a set of validation rules
 * @returns {Array} - Returns an array of validation rules
 */
export const userValidationRules = () => {
  return [
    body("name")
      .trim()
      .isString()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("password")
      .trim()
      .isString()
      .isStrongPassword()
      .withMessage(
        "Password must be at least 8 characters long and contain at least one number and one special character and one uppercase letter and one lowercase letter"
      ),
  ];
};

/**
 * @description - This function is used to validate the user router request body
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @param {*} next - Next middleware
 * @returns void
 */
export const userValidator = (req, res, next) => {
  const errors = validationResult(req);

  console.debug(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
