import { Post, postValidation } from "../models/post.js";

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
  console.log(text, image, owner);
  try {
    if (image !== undefined) {
      const post = await Post.create({ text, image, owner });
      return res.send(post);
    } else {
      const post = await Post.create({ text, owner });
      return res.send(post);
    }
  } catch (err) {
    console.log(err);
  }
};
