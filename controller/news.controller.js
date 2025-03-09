import mongoose from "mongoose";
import newsModel from "../model/news.model.js";

export const getNews = async (req, res) => {
  try {
    const news = await newsModel.find({});
    res.status(200).json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    console.log("error in fetching News:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createNew = async (req, res) => {
  const { title, imageurl, description, content, keyHighlights, action } =
    req.body; // Extract data from request body

  // Validate required fields
  if (
    !title ||
    !imageurl ||
    !description ||
    !content ||
    !keyHighlights ||
    !action
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  // Validate summary length
  // if (content.length < 30 || content.length > 250) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Summary must be between 30-250 characters",
  //   });
  // }

  try {
    // Create new New instance
    const newNew = new newsModel({
      title,
      imageurl,
      description,
      content,
      keyHighlights,
      action,
    });

    // Save to database
    await newNew.save();

    // Return response
    res.status(201).json({
      success: true,
      message: "New news created",
      data: newNew,
    });
  } catch (error) {
    console.error("Error in Create New:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getNewsById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid New Id",
    });
  }

  try {
    const news = await newsModel.findById(id);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }
    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Error in fetching News by Id:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateNew = async (req, res) => {
  const { id } = req.params;
  const New = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid New Id",
    });
  }

  try {
    const updatedNew = await newsModel.findByIdAndUpdate(id, New, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedNew });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteNew = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid New Id",
    });
  }

  try {
    await newsModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "New deleted",
    });
  } catch (error) {
    console.log("error in deleting New:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// export const createNew = async (req, res) => {
// 	const New = req.body; // user will send this data

// 	if (!New.name || !New.price || !New.image) {
// 		return res.status(400).json({ success: false, message: "Please provide all fields" });
// 	}

// 	const newNew = new New(New);

// 	try {
// 		await newNew.save();
// 		res.status(201).json({ success: true, data: newNew });
// 	} catch (error) {
// 		console.error("Error in Create New:", error.message);
// 		res.status(500).json({ success: false, message: "Server Error" });
// 	}
// };
