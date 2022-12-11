import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const postSchema = new Schema(
   {
      text: { type: String, required: true },
      image: { type: String },
      owner: { type: Schema.Types.ObjectId, ref: "User" },
      likes: {
         count: { type: Number, default: 0 },
         users: [{ type: Schema.Types.ObjectId, ref: "User" }],
      },
      comments: {
         count: { type: Number, default: 0 },
         comment: { type: Schema.Types.ObjectId, ref: "Comment" },
      },
   },
   { timestamps: true }
);

export const postValidation = (post) => {
   return Joi.object({
      text: Joi.string().min(8).max(600).required(),
      image: Joi.string().max(255),
      owner: Joi.string().required(),
   }).validate(post);
};

export const likeValidation = (post) => {
   return Joi.object({
      user: Joi.string().min(24).max(24).required(),
      post: Joi.string().min(24).max(24).required(),
   }).validate(post);
};

export const Post = mongoose.model("Post", postSchema);
