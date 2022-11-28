import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const commentSchema = new Schema({
   post: { type: Schema.Types.ObjectId, ref: "Post" },
   comments: [{ user: { type: Schema.Types.ObjectId, ref: "User" }, text: String }],
});

export const commentValidation = (comment) => {
   return Joi.object({
      post: Joi.string().min(24).max(24).required(),
      user: Joi.string().min(24).max(24).required(),
      text: Joi.string().min(5).max(200).required(),
   }).validate(comment);
};

export const Comment = mongoose.model("Comment", commentSchema);
