const express = require("express");
const router = express.Router();
const { getUsers, deleteUser } = require("../controller/users/userController");
const restricTocreateProduct = require("../middleware/restrictTocreate");
const isAuthenticated = require("../middleware/isAuthenticated");

router
  .route("/user")
  .get(isAuthenticated, restricTocreateProduct("admin"), getUsers);
router
  .route("/user/:id")
  .delete(isAuthenticated, restricTocreateProduct("admin"), deleteUser);

module.exports = router;
