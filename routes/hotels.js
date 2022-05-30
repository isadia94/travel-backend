const express = require("express");
const hotelController = require("../controllers/hotelController");
const verifyJWT = require("../middleware/verifyJWT");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const router = express.Router();
router.post(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  hotelController.handleCreate
);

// update
router.put(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  hotelController.handleUpdate
);

// delete
router.delete(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  hotelController.handleDelete
);

// get all
router.get("/", hotelController.handleGetAll);

// get one
router.get("/find/:id", hotelController.handleGetOne);

// queried routes
router.get("/countByCity", hotelController.countByCity);

module.exports = router;
