import { Post, postValidation } from "../models/post.js";
import { User } from "../models/user.js";

export const index = async (req, res) => {
   try {
      const posts = await Post.find();
      return res.status(200).send(posts);
   } catch (err) {
      return res.status(404).send({ message: "Error!" });
   }
};

export const create = async (req, res) => {
   const { error } = postValidation(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }

   const { text, image, owner } = req.body;

   try {
      const user = await User.findById(owner);
      if (user) {
         if (image !== undefined) {
            const post = await Post.create({ text, image, owner });
            return res.send(post);
         } else {
            const post = await Post.create({ text, owner });
            return res.send(post);
         }
      } else {
         return res.status(500).send({ message: "Post create error" });
      }
   } catch (error) {
      return res.status(404).send({ message: "User not found" });
   }
};
