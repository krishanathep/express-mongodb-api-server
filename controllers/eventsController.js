const Events = require('../models/events');

exports.create = async (req, res) => {
  try {
    const newEvents = await new Events(req.body).save();
    console.log(newEvents);
    res.status(200).send(newEvents);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Create is Error!!");
  }
};

exports.list = async (req, res) => {
  try {
    const listEvents = await Events.find({}).exec();
    console.log(listEvents);
    res.status(200).send(listEvents);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server List is Error!!");
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const readEvent = await Events.findById(id);
    console.log(readEvent);
    res.json(readEvent);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Read is Error!!");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const option = { new: true };
    const updateEvent = await Events.findByIdAndUpdate(
      id,
      updateData,
      option
    ).exec();
    console.log(updateEvent);
    res.status(200).send(updateEvent);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Update is Error!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteEvent = await Events.findByIdAndDelete(id).exec();
    console.log(deleteEvent)
    res.status(200).send(deleteEvent)
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Delete is Error!!");
  }
};