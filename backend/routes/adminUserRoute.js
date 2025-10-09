const express = require("express");
const router = express.Router();
const { getUsers } = require("../controller/users/userController");
const restricTocreateProduct = require("../middleware/restrictTocreate");

router
  .route("/user")
  .get(isAuthenticated, restricTocreateProduct("admin"), getUsers);

module.exports = router;
