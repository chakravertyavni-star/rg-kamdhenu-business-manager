const express = require("express");

const router = express.Router();

const auth =
  require("../middleware/auth");

const {
  getRevenue,
  createRevenue,
  deleteRevenue,
} = require(
  "../controllers/revenueController"
);

router.get(
  "/",
  auth,
  getRevenue
);

router.post(
  "/",
  auth,
  createRevenue
);

router.delete(
  "/:id",
  auth,
  deleteRevenue
);

module.exports = router;