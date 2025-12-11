import { Router } from "express";
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord
} from "../controllers/posterController";

import { authenticateToken } from "../middleware/authenticateToken";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.get("/", getRecords);
router.get("/:id", getRecord);
router.post("/", authenticateToken, isAdmin, createRecord);
router.put("/:id", authenticateToken, isAdmin, updateRecord);
router.delete("/:id", authenticateToken, isAdmin, deleteRecord);

export default router;