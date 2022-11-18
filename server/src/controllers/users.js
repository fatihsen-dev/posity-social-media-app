import bcrypt from "bcrypt";
import { User, userValidation } from "../models/user.js";
import Joi from "joi";

export const index = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: "Server Error!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = await Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  try {
    const user = await User.findOne({ email });

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      return res.send({ message: "Wrong password" });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "User not found" });
  }
};

export const register = async (req, res) => {
  const { error } = userValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const { name, email, password } = req.body;

  try {
    const userControl = await User.findOne({ email: email });
    console.log(userControl);
    if (userControl) {
      return res.status(302).send({
        message: "There is a registered member with this email address.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server Error!" });
  }
};
