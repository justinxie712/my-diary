import DiaryEntry from "../models/DiaryEntry.js";

export const createEntry = async (req, res) => {
  try {
    const entry = await DiaryEntry.create({ ...req.body, user: req.user.id });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ msg: "Failed to create entry", error: err.message });
  }
};

export const getEntries = async (req, res) => {
  try {
    const entries = await DiaryEntry.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(entries);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to fetch entries", error: err.message });
  }
};
