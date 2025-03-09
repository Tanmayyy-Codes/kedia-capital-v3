import express from "express";

import {
  createNew,
  deleteNew,
  getNews,
  getNewsById,
  updateNew,
} from "../controller/news.controller.js";

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getNewsById)
router.post("/", createNew);
router.put("/:id", updateNew);
router.delete("/:id", deleteNew);

export default router;
