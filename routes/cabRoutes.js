import express from 'express';
import { bookCab, checkCabs, listPastBookings } from "../controllers/bookCabController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, bookCab)
router.post("/checkavailablecabs", protect, checkCabs)
router.post("/pastBookings", protect, listPastBookings)

export default router;
