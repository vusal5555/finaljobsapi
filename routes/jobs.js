const express = require("express");
const {
  getAllJobs,
  getJob,
  updateJob,
  createJob,
  deleteJob,
} = require("../controllers/jobs");

const jobsRouter = express.Router();

jobsRouter.route("/").get(getAllJobs).post(createJob);
jobsRouter.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = jobsRouter;
