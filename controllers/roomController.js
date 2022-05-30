const Room = require("../models/Rooms");
const Hotel = require("../models/Hotels");

const createRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    const hotel = await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });
    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;
  const hotelId = req.params.hotelId;

  try {
    await Room.findByIdAndDelete(id);
    try {
      await Hotel.findByIdAndUpdate(
        hotelId,
        { $pull: { rooms: req.params.id } },
        { new: true }
      );
      res.status(200).json({ message: "Room deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await rooms.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: "No rooms found" });
  }
};

const getRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ message: "room not found" });
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,
  getRoom,
};
