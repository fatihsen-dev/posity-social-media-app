import { Post, postValidation } from "../models/post.js";
import { User } from "../models/user.js";
import multer from "multer";
let lastFileName = "";

// multer settings
export const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "./src/public/images/post-images");
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
      lastFileName = file.fieldname + "-" + uniqueSuffix;
      cb(null, file.fieldname + "-" + uniqueSuffix);
   },
});

export const index = async (req, res) => {
   try {
      const posts = await Post.find().sort({ createdAt: -1 });
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
   const { text, owner } = req.body;
   try {
      const user = await User.findById(owner);
      if (user) {
         if (lastFileName.length > 0) {
            const post = await Post.create({
               text,
               image: "/images/post-images/" + lastFileName,
               owner,
            });
            lastFileName = "";
            return res.send(post);
         } else {
            const post = await Post.create({ text, owner });
            return res.send(post);
         }
      } else {
         return res.status(500).send({ message: "Post create error" });
      }
   } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Server error" });
   }
};
