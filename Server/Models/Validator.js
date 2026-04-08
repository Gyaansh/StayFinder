import joi from "joi";
import ExpressError from "../Utils/ExpressError.js";
import mongoose from "mongoose";
const validSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().min(1).required(),
  URL: joi.array().items(joi.string().uri()).min(1).required(),
  location: joi.string().required(),
  country: joi.string().required(),
  owner: joi
    .string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
});
export const schemaValidator = (req, res, next) => {
  let { error } = validSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, err.message);
  } else {
    next();
  }
};

// Define validation schema for incoming review data constraints
const validReviewSchema = joi.object({
  content: joi.string().min(10).max(500).required(),
  rating: joi.number().min(1).max(5).required(),
  createdBy: joi
    .string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })  
    .required(),
});

// Middleware to enforce review schema rules before processing request
export const reviewValidator = (req, res, next) => {
  let { err } = validReviewSchema.validate(req.body);
  if (err) {
    throw new ExpressError(404, err.message);
  } else {
    next();
  }
};

const userSchema = joi.object({
  username: joi.string().min(3).required(),

  email: joi.string().email().required(),

  password: joi
    .string()
    .min(8)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[a-z]/, "lowercase")
    .pattern(/[0-9]/, "number")
    .pattern(/[!@#$%^&*]/, "special character")
    .pattern(/^\S+$/, "no spaces")
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.name": "Password must contain at least one {#name}",
      "string.empty": "Password is required",
    }),
});

export const userValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      field: "validation",
      message: error.details.map((err) => err.message),
    });
  }

  next();
};
