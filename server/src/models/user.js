import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const userSchema = new Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      avatar: { type: String, default: null },
      banner: { type: String, default: null },
      posts: {
         count: { type: Number, default: 0 },
         post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      },
      admin: {
         type: Boolean,
         default: false,
      },
      token: String,
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
