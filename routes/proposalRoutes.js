const express = require("express");
const proposalRouter = express.Router();
const proposalController = require("../controllers/proposalController");
const auth = require("../middleware/auth");

// Freelancer sends a proposal
proposalRouter.post("/create", auth.checkAuth, proposalController.sendProposal);

// Client views proposals
proposalRouter.get(
  "/client",
  auth.checkAuth,
  auth.allowRoles(["client"]),
  proposalController.getProposals
);

// Client accepts a proposal
proposalRouter.put(
  "/accept/:proposalId",
  auth.checkAuth,
  auth.allowRoles(["client"]),
  proposalController.acceptProposal
);

// Client rejects a proposal
proposalRouter.put(
  "/reject/:proposalId",
  auth.checkAuth,
  auth.allowRoles(["client"]),
  proposalController.rejectProposal
);

module.exports = proposalRouter;
