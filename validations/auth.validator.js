import { body, validationResult } from "express-validator";

export const authValidationRules = () => {
  return [
    body("token").trim().isJWT().withMessage("Invalid token"),
    body("name")
      .trim()
      .isString()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
  ];
};

export const authValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  next();
};
