const notFoundError = require("../errors/not-found");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).send(jobs);
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req;
  const job = await Job.findOne({
    createdBy: userId,
    _id: id,
  });

  if (!job) {
    throw new notFoundError("No job found");
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    params: { id },
    user: { userId },
  } = req;

  const job = await Job.findByIdAndUpdate(
    { createdBy: userId, _id: id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) {
    throw new notFoundError("No job found");
  }

  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    params: { id },
    user: { userId },
  } = req;

  const job = await Job.findByIdAndRemove({ createdBy: userId, _id: id });

  if (!job) {
    throw new notFoundError("No job found");
  }

  res.status(200).send("Job deleted successfully");
};

module.exports = {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
};
