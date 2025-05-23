const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasksIn = async (req, res) => {
  const tasks = await Task.find({});
  //  desc: ["icici7003", "idfc1410"]
  return res.status(200).json({ tasks });
};
const getAllTasks = asyncWrapper(getAllTasksIn);

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate(
    { _id: taskID },
    req.body,
    { ...req.body, updatedAt: new Date() },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  task.set(req.body);
  await task.save();
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  // getAlldynamic,
};
