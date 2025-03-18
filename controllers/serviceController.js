const Service = require("../models/Service");
const User = require("../models/User");

const serviceController = {
  // Create a new service listing
  createService: async (req, res) => {
    const {
      title,
      description,
      price,
      category,
      availability,
      workSamples,
      skills,
    } = req.body;

    try {
      const service = new Service({
        freelancerID: req.user.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        availability: req.body.availability,
        workSamples: req.body.workSamples || [],
        skills: req.body.skills || [],
      });

      await service.save();
      res
        .status(201)
        .json({ message: "Service created successfully", service });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all services
  getAllServices: async (req, res) => {
    try {
      const services = await Service.find().populate(
        "freelancerID",
        "username"
      );
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get services by freelancer ID
  getServicesByfreelancerID: async (req, res) => {
    const freelancerID = req.user.id;
    // console.log("Freelancer ID:", freelancerID);
    try {
      const services = await Service.find({
        freelancerID,
      }).populate("freelancerID", "username");
      // console.log("Services found:", services);
      if (services.length === 0) {
        return res
          .status(404)
          .json({ message: "No services found for this freelancer" });
      }
      res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Get all services with search and filter
  filterServices: async (req, res) => {
    const { search, category, minPrice, maxPrice } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }
    if (category) {
      query.category = category;
    }
    if (minPrice) {
      query.price = { $gte: minPrice };
    }
    if (maxPrice) {
      query.price = query.price
        ? { ...query.price, $lte: maxPrice }
        : { $lte: maxPrice };
    }

    try {
      const services = await Service.find(query).populate(
        "freelancerID",
        "username"
      );
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a service listing
  updateService: async (req, res) => {
    const { serviceId } = req.params;
    const freelancerID = req.user.id;
    const updatedData = req.body;
    try {
      const service = await Service.findById(serviceId);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      if (service.freelancerID.toString() !== freelancerID) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this service" });
      }

      const updatedService = await Service.findByIdAndUpdate(
        serviceId,
        updatedData,
        { new: true }
      );

      await updatedService.save();
      res
        .status(200)
        .json({ message: "Service updated successfully", service });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a service listing
  deleteService: async (req, res) => {
    const { serviceId } = req.params;
    const freelancerID = req.user.id;
    try {
      const service = await Service.findById(serviceId);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      if (service.freelancerID.toString() !== freelancerID) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this service" });
      }

      await Service.deleteOne({ _id: serviceId });
      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = serviceController;
