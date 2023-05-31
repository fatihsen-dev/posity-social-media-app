import bcrypt from "bcrypt";
import { User, userValidation } from "../models/user.js";
import Joi from "joi";
import jwt from "jsonwebtoken";

export const index = async (req, res) => {
   try {
      const users = await User.find().sort({ createdAt: 1 }).select("-token -updatedAt -__v -password");
      return res.status(200).send(users);
   } catch (error) {
      console.log(error);
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
   } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "User not found" });
   }
};

export const userControl = async (req, res) => {
   const { token } = req.body;
   const decoded = jwt.verify(token, process.env.jwtToken, (error, decoded) => {
      if (error) {
         return { message: "Error" };
      }
      return decoded;
   });

   try {
      const user = await User.findById(decoded._id);
      if (user.token == token) {
         const user = await User.findById(decoded._id).select("_id name email admin token avatar");
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
   const found = name.match(/^([a-zA-ZıİşŞüÜğĞçÇöÖ]+\s)*[a-zA-ZıİşŞüÜğĞçÇöÖ]+$/g);

   if (found === null) {
      return res.status(417).send({
         message: "Invalid Full Name",
      });
   }

   try {
      const userControl = await User.findOne({ email: email });
      if (userControl) {
         return res.status(302).send({
            message: "This email is already in use",
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
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Server Error!" });
   }
};

export const getOneUser = async (req, res) => {
   const { userid } = req.params;

   try {
      const user = await User.findById(userid)
         .select("-token -password -updatedAt -__v")
         .populate({
            path: "posts.post",
            select: "-updatedAt -__v",
            options: { sort: { createdAt: -1 } },
            populate: { path: "shared" },
         });
      return res.send(user);
   } catch (error) {
      console.log(error);
      return res.send({ message: "ID is invalid" });
   }
};
