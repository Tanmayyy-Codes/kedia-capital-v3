import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageurl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    keyHighlights: {
      type: [String],
      default: [],
    },
    action: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("News", newsSchema);
