const express = require("express");
const auth = require("../middleware/auth");
const jobController = require("../controllers/JobController");

const jobRouter = express.Router();

// Routes for job listings
jobRouter.get(
  "/all",
  auth.checkAuth,
  auth.allowRoles(["client"]),
  jobController.getAllJobs
);

jobRouter.get(
  "/available",
  auth.checkAuth,
  auth.allowRoles(["freelancer"]),
  jobController.getAvailableJobs
);

jobRouter.post(
  "/create",
  auth.checkAuth,
  auth.allowRoles(["client"]),
  jobController.createJob
);

jobRouter.put(
  "/update/:jobId",
  auth.checkAuth,
  auth.allowRoles(["client"]),
  jobController.updateJob
);

jobRouter.delete(
  "/:jobId",
  auth.checkAuth,
  auth.allowRoles(["client"]),
  jobController.deleteJob
);

jobRouter.search(
  "/searchFreelancers",
  auth.checkAuth,
  auth.allowRoles(["client"]),
  jobController.searchFreelancers
);

module.exports = jobRouter;
