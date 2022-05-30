//require express
const express = require("express");

const router = express.Router();

//require registerController
const registerController = require("../controllers/registerController");

router.post("/", registerController.handleNewUser);

module.exports = router;
