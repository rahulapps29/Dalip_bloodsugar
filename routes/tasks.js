const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require("../controllers/tasks");

const { getAlldynamic } = require("../controllers/dtasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/d").get(getAlldynamic);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
