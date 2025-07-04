import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude hashed password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching users" });
  }
};
