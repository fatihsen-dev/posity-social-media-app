import bcrypt from "bcrypt";
import { User, userValidation } from "../models/user.js";
import Joi from "joi";
import jwt from "jsonwebtoken";

export const index = async (req, res) => {
   try {
      const users = await User.find().select("name avatar");
      return res.status(200).send(users);
   } catch (err) {
      return res.status(500).send({ message: "Server Error!" });
   }
};

export const login = async (req, res) => {
   const { error } = await Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
   }).validate(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }
   try {
      const user = await User.findOne({ email: req.body.email });

      const comparedPassword = await bcrypt.compare(req.body.password, user.password);

      if (!comparedPassword) {
         return res.status(400).send({ message: "Wrong password" });
      }

      const { _id, name, email, admin, avatar } = user;

      const token = jwt.sign({ _id, name, email, admin }, process.env.jwtToken);

      await User.findByIdAndUpdate(_id, { token });

      return res.send({ _id, name, email, admin, token, avatar });
   } catch (err) {
      console.log(err);
      return res.status(404).send({ message: "User not found" });
   }
};

export const userControl = async (req, res) => {
   const { token } = req.body;
   const decoded = jwt.verify(token, "testKey", (error, decoded) => {
      if (error) {
         return { message: "Error" };
      }
      return decoded;
   });

   try {
      const user = await User.findById(decoded._id);
      if (user.token == token) {
         const user = await User.findById(decoded._id).select(
            "_id name email admin token avatar"
         );
         return res.send(user);
      } else {
         return res.status(406).send({ message: "Token invalid" });
      }
   } catch (error) {
      console.log(error);
      return res.status(406).send({ message: "Token invalid" });
   }
};

export const register = async (req, res) => {
   const { error } = userValidation(req.body);
   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }
   const { name, email, password, avatar } = req.body;

   try {
      const userControl = await User.findOne({ email: email });
      if (userControl) {
         return res.status(302).send({
            message: "There is such a member",
         });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
         name,
         email,
         password: hashedPassword,
         avatar: avatar ? avatar : null,
      });

      await user.save();
      return res.status(201).send(user);
   } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Server Error!" });
   }
};

export const getOneUser = async (req, res) => {
   const { userid } = req.params;

   try {
      const user = await User.findById(userid)
         .select("-token -admin -password -updatedAt -__v")
         .populate("posts.post", "-updatedAt -__v -owner", null, {
            sort: { createdAt: -1 },
         });
      return res.send(user);
   } catch (error) {
      console.log(error);
      return res.send({ message: "ID is invalid" });
   }
};
