import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
  title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const DiaryEntry = mongoose.model("DiaryEntry", diarySchema);
export default DiaryEntry;
