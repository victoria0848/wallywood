import { Router } from "express";
import {
  getRecords,
  getRecord,
  createRecord,
  deleteRecord
} from "../controllers/genrePosterRelController";

import { authenticateToken } from "../middleware/authenticateToken";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.get("/", getRecords);
router.get("/:genreId/:posterId", getRecord);
router.post("/", authenticateToken, isAdmin, createRecord);
router.delete("/:genreId/:posterId", authenticateToken, isAdmin, deleteRecord);

export default router;
