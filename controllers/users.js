import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import user from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "user does'nt exists" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "Subhendu",
      { expiresIn: "1d" }
    );
    res.status(200).json({ success: true, result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "password must be matched with confirm password field",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await user.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      "Subhendu",
      { expiresIn: "1d" }
    );
    res.status(200).json({ success: true, result, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};
