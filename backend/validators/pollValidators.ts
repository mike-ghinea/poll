import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validatePollBody = [
  body("question")
    .notEmpty()
    .withMessage("Please provide a question for the poll."),
  body("pollOptions")
    .notEmpty()
    .custom((value: any[]) => {
      if (!value.every((item) => typeof item === "string")) {
        return false;
      }
      return true;
    })
    .withMessage("Every element in the array must be a string."),
  body("pollOptions")
    .notEmpty()
    .isArray({ min: 2, max: 7 })
    .withMessage("Please provide between two and seven options for your poll."),

  handleValidationErrors,
];

const validPollId = param("poll_id")
  .exists()
  .isUUID()
  .withMessage("Please provide a valid poll id. Ids are UUIDs.");

const validPollOptionId = param("poll_option_id")
  .exists()
  .isUUID()
  .withMessage("Please provide a valid poll option id. Ids are UUIDs.");

export const validatePollId = [validPollId, handleValidationErrors];

export const validatePollAndPollOptionId = [
  validPollId,
  validPollOptionId,
  handleValidationErrors,
];
