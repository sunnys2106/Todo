import { body } from "express-validator";

const validateNoteData = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .trim()
        .escape()
        .isLength({ min: 1, max: 300 })
        .withMessage("Name must be between 1 and 300 characters")
        .notEmpty()
        .withMessage("Name is required"),
    body("description")
        .isString()
        .withMessage("Description must be a string")
        .trim()
        .escape()
        .isLength({ max: 300 })
        .withMessage("Description cannot be over 300 characters"),
    body("duedate").isISO8601().withMessage("Due date must be a valid date"),
];

export default validateNoteData;
