const { PrismaClient } = require("@prisma/client");
const { body, validationResult } = require("express-validator");
const fs = require("fs");

const prisma = new PrismaClient();
//1) Function to create a new event
module.exports.createSingleEvent = async (req, res) => {
  await body("name").notEmpty().withMessage("Event name is required.").run(req),
    await body("date_time")
      .notEmpty()
      .withMessage("date_time is require")
      .isISO8601()
      .toDate()
      .withMessage("Invalid date format.")
      .run(req),
    await body("category")
      .notEmpty()
      .withMessage("Event category is required.")
      .run(req),
    await body("type")
      .notEmpty()
      .withMessage("Event type is required.")
      .run(req),
    await body("description")
      .notEmpty()
      .withMessage("Event description is required.")
      .run(req),
    await body("is_paid")
      .notEmpty()
      .withMessage("is_paid is required.")
      .isBoolean()
      .withMessage("is_paid must be a boolean")
      .run(req),
    await body("booking_price")
      .notEmpty()
      .withMessage("Event booking price is required.")
      .isFloat()
      .withMessage("booking_price must be a float")
      .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const eventData = {
      name: req.body.name,
      date_time: req.body.date_time,
      location: req.body.location,
      category: req.body.category,
      type: req.body.type,
      description: req.body.description,
      is_paid: JSON.parse(req.body.is_paid),
      booking_price: parseFloat(req.body.booking_price),
      image: req.file ? req.file.filename : null,
      host_id: req.user.id, // from token
    };

    const createdEvent = await prisma.event.create({
      data: eventData,
    });

    res.status(200).json({ status: true, data: createdEvent });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create event.", errors: error.message });
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
};

//2) Function to get all events
module.exports.allSingleEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json({ status: true, data: events });
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
  }
};

// 3) function to update a an event
module.exports.updateSingleEvent = async (req, res) => {
  const eventId = parseInt(req.params.id);

  try{

  //authorization
  const existingEvent = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!existingEvent) {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(404).json({ status:false, message: "Event not found." });
  }
  if (existingEvent.host_id !== req.user.id) {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(403).json({ status: false, message: "Unauthorized to update this event." });
  }

  }catch(error){
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({status:false, message:'internal server error'});
    return;
  }
 

  //validation
  await body("name").notEmpty().withMessage("Event name is required.").run(req);
  await body("date_time")
    .notEmpty()
    .withMessage("date_time is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format.")
    .run(req);
  await body("category")
    .notEmpty()
    .withMessage("Event category is required.")
    .run(req);
  await body("type").notEmpty().withMessage("Event type is required.").run(req);
  await body("description")
    .notEmpty()
    .withMessage("Event description is required.")
    .run(req);
  await body("is_paid")
    .notEmpty()
    .withMessage("is_paid is required.")
    .isBoolean()
    .withMessage("is_paid must be a boolean")
    .run(req);
  await body("booking_price")
    .notEmpty()
    .withMessage("Event booking price is required.")
    .isFloat()
    .withMessage("booking_price must be a float")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const eventData = {
      name: req.body.name,
      date_time: req.body.date_time,
      location: req.body.location,
      category: req.body.category,
      type: req.body.type,
      description: req.body.description,
      is_paid: JSON.parse(req.body.is_paid),
      booking_price: parseFloat(req.body.booking_price),
      image: req.file ? req.file.filename : null,
      host_id: req.user.id, // from token
    };

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: eventData, 
    });

    res.status(200).json({ status: true, data: updatedEvent });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, data: error.message });
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
};

// 4) function for delete an event
module.exports.deleteSingleEvent = async (req, res) => {
  const eventId = parseInt(req.params.id);

  try {
    const eventToDelete = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!eventToDelete) {
      return res.status(404).json({ status: false, message: "Event not found." });
    }

   //authorization
    if (eventToDelete.host_id !== req.user.id) {
      return res.status(403).json({ status:false, message: "Unauthorized to delete this event." });
    }

    // Delete the event
    await prisma.event.delete({
      where: { id: eventId },
    });

    res.status(200).json({ status: true, message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ status: false, message:error.message });
  }
};

