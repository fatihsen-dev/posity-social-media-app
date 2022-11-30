import { Post, postValidation, likeValidation, postidValidate } from "../models/post.js";
import { User } from "../models/user.js";
import multer from "multer";
import { Comment, commentValidation } from "../models/comment.js";
import Joi from "joi";
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
      const posts = await Post.find()
         .sort({ createdAt: -1 })
         .select("likes comments text image owner createdAt")
         .populate("comments.comment", "-post -_id");

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
            await User.findByIdAndUpdate(user._id, {
               posts: {
                  count: user.posts.count + 1,
                  post: [...user.posts.post, post._id],
               },
            });
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

export const like = async (req, res) => {
   const { error } = likeValidation(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }

   const { user, post } = req.body;

   try {
      const getPost = await Post.findById(post);

      try {
         await Post.findById(user);

         const filtered = getPost.likes.users.filter((u) => String(u._id) === user);
         if (filtered.length > 0) {
            const updatedPost = await Post.findByIdAndUpdate(getPost._id, {
               likes: {
                  count: getPost.likes.count - 1,
                  users: getPost.likes.users.filter((u) => String(u._id) !== user),
               },
            });
            return res.send(
               await Post.find()
                  .sort({ createdAt: -1 })
                  .select("likes comments text image owner createdAt")
                  .populate("comments.comment", "-post -_id")
            );
         }

         const updatedPost = await Post.findByIdAndUpdate(getPost._id, {
            likes: {
               count: getPost.likes.count + 1,
               users: [...getPost.likes.users, user],
            },
         });
         return res.send(
            await Post.find()
               .sort({ createdAt: -1 })
               .select("likes comments text image owner createdAt")
               .populate("comments.comment", "-post -_id")
         );
      } catch (error) {
         res.status(404).send({ message: "User not found" });
      }
   } catch (error) {
      console.log(error);
      res.status(404).send({ message: "Post not found" });
   }
};

export const getOnePost = async (req, res) => {
   const { postid } = req.params;

   if (postid.length !== 24 && typeof postid !== String) {
      return res.status(404).send({ message: "Post not found" });
   }
   try {
      const post = await Post.findById(postid)
         .select("-updatedAt")
         .populate("comments.comment")
         .populate("owner", "-password -updatedAt -__v -token -admin");

      if (post) {
         return res.send(post);
      }
      return res.status(404).send({ message: "Post not found" });
   } catch (error) {
      return res.status(500).send({ message: "Server error" });
   }
};

export const comment = async (req, res) => {
   try {
      return res.send(await Comment.find());
   } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Server error" });
   }
};

export const createComment = async (req, res) => {
   const { error } = commentValidation(req.body);
   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }
   const { user, post, text } = req.body;

   try {
      const getPost = await Post.findById(post);

      try {
         await User.findById(user);

         if (getPost.comments.count > 0) {
            try {
               const comment = await Comment.findById(getPost.comments.comment);
               const updatedComment = await Comment.findByIdAndUpdate(comment._id, {
                  comments: [
                     ...comment.comments,
                     {
                        user,
                        text,
                     },
                  ],
               });

               await Post.findByIdAndUpdate(getPost._id, {
                  comments: {
                     count: getPost.comments.count + 1,
                     comment: updatedComment._id,
                  },
               });

               return res.send(
                  await Post.find()
                     .sort({ createdAt: -1 })
                     .select("likes comments text image owner createdAt")
                     .populate("comments.comment", "-post -_id")
               );
            } catch (error) {
               return res.status(400).send({ message: "Comment not sended" });
            }
         }
         const comment = await Comment({
            post,
            comments: [{ user, text }],
         });
         await comment.save();
         await Post.findByIdAndUpdate(getPost._id, {
            comments: {
               count: 1,
               comment: comment._id,
            },
         });
         return res.send(
            await Post.find()
               .sort({ createdAt: -1 })
               .select("likes comments text image owner createdAt")
               .populate("comments.comment", "-post -_id")
         );
      } catch (error) {
         return res.status(404).send({ message: "User not found" });
      }
   } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Post not found" });
   }
};
