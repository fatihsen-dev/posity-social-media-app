import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const userValidation = (user) => {
  return Joi.object({
    name: Joi.string().min(6).max(60).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(60).required(),
    avatar: Joi.string().max(300),
  }).validate(user);
};

export const User = mongoose.model("User", userSchema);
