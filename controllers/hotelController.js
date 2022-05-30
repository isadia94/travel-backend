const Hotel = require("../models/Hotels");

// Create a new hotel

const handleCreate = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    throw error;
  }
};

// update a hotel

const handleUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

const handleDelete = async (req, res) => {
  const { id } = req.params;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: "Hotel deleted" });
  } catch (error) {
    res.status(404).json({ message: "Hotel not found" });
  }
};

const handleGetAll = async (req, res) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 400 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(404).json({ message: "No hotels found" });
  }
};

const handleGetOne = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(404).json({ message: "Hotel not found" });
  }
};

const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => Hotel.countDocuments({ city }))
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(404).json({ message: "No hotels found" });
  }
};

module.exports = {
  handleCreate,
  handleUpdate,
  handleDelete,
  handleGetAll,
  handleGetOne,
  countByCity,
};
