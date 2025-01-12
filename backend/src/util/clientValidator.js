import { body } from "express-validator";

const validateClientData = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .trim()
        .escape()
        .isLength({ min: 1, max: 100 })
        .withMessage("Name must be between 1 and 100 characters")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail()
        .isLength({ min: 1, max: 100 })
        .withMessage("Email must be between 1 and 100 characters")
        .notEmpty()
        .withMessage("Email is required"),

    body("job")
        .isString()
        .withMessage("Job must be a string")
        .trim()
        .escape()
        .isLength({ min: 1, max: 50 })
        .withMessage("Job must be between 1 and 50 characters")
        .notEmpty()
        .withMessage("Job is required"),

    body("rate")
        .isNumeric()
        .withMessage("Rate must be a number")
        .isFloat({ min: 0, max: 9999999999 })
        .withMessage("Rate cannot exceed 10 digits")
        .notEmpty()
        .withMessage("Rate is required"),

    body("isactive")
        .isBoolean()
        .withMessage("Isactive must be a boolean")
        .notEmpty()
        .withMessage("Isactive is required"),
];

export default validateClientData;
