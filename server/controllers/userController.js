import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude hashed password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching users" });
  }
};

export const getSingleUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("-password"); // omit password field

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
};
