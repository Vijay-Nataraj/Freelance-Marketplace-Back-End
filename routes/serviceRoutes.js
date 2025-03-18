const express = require("express");
const auth = require("../middleware/auth");
const serviceController = require("../controllers/serviceController");
const serviceRouter = express.Router();

serviceRouter.get(
  "/all",
  auth.checkAuth,
  auth.allowRoles(["client"]),
  serviceController.getAllServices
);

serviceRouter.post(
  "/create",
  auth.checkAuth,
  auth.allowRoles(["freelancer"]),
  serviceController.createService
);

serviceRouter.get(
  "/search",
  auth.checkAuth,
  auth.allowRoles(["freelancer"]),
  serviceController.filterServices
);

serviceRouter.get(
  `/:freelancerID`,
  auth.checkAuth,
  auth.allowRoles(["freelancer"]),
  serviceController.getServicesByfreelancerID
);

serviceRouter.put(
  "/update/:serviceId",
  auth.checkAuth,
  auth.allowRoles(["freelancer"]),
  serviceController.updateService
);

serviceRouter.delete(
  "/:serviceId",
  auth.checkAuth,
  auth.allowRoles(["freelancer"]),
  serviceController.deleteService
);

module.exports = serviceRouter;
