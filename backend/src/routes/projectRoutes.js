const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProjectStatus,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createProject);

router.get("/", protect, getProjects);

router.get("/:id", protect, getProjectById);

router.patch("/:id/status", protect, updateProjectStatus);

module.exports = router;