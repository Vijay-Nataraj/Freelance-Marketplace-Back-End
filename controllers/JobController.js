const Job = require("../models/Job");

const jobController = {
  // Create a new job listing
  createJob: async (req, res) => {
    const { title, description, budget, category, deadline } = req.body;

    try {
      const job = new Job({
        clientID: req.user.id,
        title,
        description,
        budget,
        category,
        deadline,
      });

      await job.save();
      res.status(201).json({ message: "Job created successfully", job });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all jobs posted by the client
  getAllJobs: async (req, res) => {
    try {
      const jobs = await Job.find({ clientID: req.user.id }).populate(
        "clientID",
        "username"
      );
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all available jobs for freelancers
  getAvailableJobs: async (req, res) => {
    try {
      const jobs = await Job.find({ status: "Open" }).populate(
        "clientID",
        "username"
      );
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a job listing
  updateJob: async (req, res) => {
    const { jobId } = req.params;
    const clientID = req.user.id;
    const updatedData = req.body;

    try {
      const job = await Job.findById(jobId);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (job.clientID.toString() !== clientID) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this job" });
      }

      const updatedJob = await Job.findByIdAndUpdate(jobId, updatedData, {
        new: true,
      });

      res.status(200).json({ message: "Job updated successfully", updatedJob });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a job listing
  deleteJob: async (req, res) => {
    const { jobId } = req.params;
    const clientID = req.user.id;

    try {
      const job = await Job.findById(jobId);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (job.clientID.toString() !== clientID) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this job" });
      }

      await Job.deleteOne({ _id: jobId });
      res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  searchFreelancers: async (req, res) => {
    try {
      const { skill, rating, minBudget, maxBudget } = req.query;

      let filter = {};

      if (skill) {
        filter.skills = { $in: skill.split(",") };
      }
      if (rating) {
        filter.rating = { $gte: parseFloat(rating) };
      }
      if (minBudget || maxBudget) {
        filter.budget = {};
        if (minBudget) filter.budget.$gte = parseFloat(minBudget);
        if (maxBudget) filter.budget.$lte = parseFloat(maxBudget);
      }

      const freelancers = await Freelancer.find(filter); // Query database with filters
      res.json(freelancers);
    } catch (error) {
      res.status(500).send("Error fetching freelancers");
    }
  },
};

module.exports = jobController;
