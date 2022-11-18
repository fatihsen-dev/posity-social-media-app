import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const postSchema = new Schema(
  {
    text: { type: String, required: true },
    image: { type: String },
    owner: { type: String, required: true },
  },
  { timestamps: true }
);

export const postValidation = (post) => {
  return Joi.object({
    text: Joi.string().min(8).max(200).required(),
    image: Joi.string().max(255),
    owner: Joi.string().required(),
  }).validate(post);
};

export const Post = mongoose.model("Post", postSchema);
