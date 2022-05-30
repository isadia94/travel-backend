const express = require("express");
const ROLES_LIST = require("../config/roles_list");
const roomController = require("../controllers/roomController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

const router = express.Router();

router.post(
  "/:hotelId",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  roomController.createRoom
);

// update
router.put(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  roomController.updateRoom
);

// delete
router.delete(
  "/:id/:hotelId",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  roomController.deleteRoom
);

// get all
router.get("/", roomController.getRooms);

//get one
router.get("/:id", roomController.getRoom);

//export router
module.exports = router;
