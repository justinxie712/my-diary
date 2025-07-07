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

export const getSingleDiaryEntry = async (req, res) => {
  const { entryId } = req.params;

  try {
    const entry = await DiaryEntry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ error: "Diary entry not found" });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error("Error fetching diary entry:", error);
    res.status(500).json({ error: "Failed to get diary entry" });
  }
};

export const deleteDiaryEntry = async (req, res) => {
  const { entryId } = req.params;

  try {
    const deletedEntry = await DiaryEntry.findByIdAndDelete(entryId);

    if (!deletedEntry) {
      return res.status(404).json({ error: "Diary entry not found" });
    }

    res.status(200).json({ message: "Diary entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ error: "Failed to delete entry" });
  }
};

export const deleteAllDiaryEntries = async (req, res) => {
  try {
    const result = await DiaryEntry.deleteMany({});
    res.status(200).json({
      message: "All diary entries deleted",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all diary entries:", error);
    res.status(500).json({ error: "Failed to delete diary entries" });
  }
};

export const updateDiaryEntry = async (req, res) => {
  const { entryId } = req.params;
  const { title, content } = req.body;

  try {
    const updatedEntry = await DiaryEntry.findByIdAndUpdate(
      entryId,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ error: "Diary entry not found" });
    }

    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({ error: "Failed to update entry" });
  }
};
