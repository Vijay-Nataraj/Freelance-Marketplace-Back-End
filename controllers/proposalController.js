const Proposal = require("../models/proposalModel");
const Job = require("../models/Job");
const Contract = require("../models/contractModel");

exports.sendProposal = async (req, res) => {
  const { jobId, description, budget } = req.body;
  const freelancerId = req.user._id;

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.clientID.toString() === freelancerId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot apply for your own job" });
    }

    const proposal = new Proposal({
      jobId,
      freelancerId,
      description,
      budget,
    });

    await proposal.save();
    res.status(201).json({ message: "Proposal sent successfully", proposal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending proposal" });
  }
};

// Client viewing proposals
exports.getProposals = async (req, res) => {
  const clientId = req.user._id;

  try {
    const proposals = await Proposal.find({ jobId: { $in: clientId } })
      .populate("freelancerId")
      .populate("jobId");

    res.status(200).json(proposals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching proposals" });
  }
};

exports.acceptProposal = async (req, res) => {
  const { proposalId } = req.params;
  const clientId = req.user._id;

  try {
    const proposal = await Proposal.findById(proposalId);
    if (!proposal)
      return res.status(404).json({ message: "Proposal not found" });

    if (proposal.status !== "pending")
      return res
        .status(400)
        .json({ message: "Proposal already accepted or rejected" });

    if (proposal.jobId.clientID.toString() !== clientId.toString()) {
      return res
        .status(403)
        .json({ message: "Only the job owner can accept proposals" });
    }

    proposal.status = "accepted";
    await proposal.save();

    // Create a contract
    const contract = new Contract({
      proposalId,
      freelancerId: proposal.freelancerId,
      clientId,
      jobId: proposal.jobId,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Example: one-month contract
      contractDetails: "Detailed contract agreement goes here",
    });

    await contract.save();

    res
      .status(200)
      .json({ message: "Proposal accepted, and contract created", contract });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error accepting proposal" });
  }
};

// Client rejecting a proposal
exports.rejectProposal = async (req, res) => {
  const { proposalId } = req.params;
  const clientId = req.user._id;

  try {
    const proposal = await Proposal.findById(proposalId);
    if (!proposal)
      return res.status(404).json({ message: "Proposal not found" });

    if (proposal.status !== "pending")
      return res
        .status(400)
        .json({ message: "Proposal already accepted or rejected" });

    if (proposal.jobId.clientID.toString() !== clientId.toString()) {
      return res
        .status(403)
        .json({ message: "Only the job owner can reject proposals" });
    }

    proposal.status = "rejected";
    await proposal.save();

    res.status(200).json({ message: "Proposal rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error rejecting proposal" });
  }
};
