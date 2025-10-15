const express = require("express");
const router = express.Router();

const isAuthenticated = require("../../middleware/isAuthenticated");
const { catchAsync } = require("../../services/catchAsync");
const {
  khaltiPayment,
  VerifyPidx,
} = require("../../controller/payment/khaltipaymentController");

router.route("").post(isAuthenticated, catchAsync(khaltiPayment));
router.route("/success").get(isAuthenticated, catchAsync(VerifyPidx));

module.exports = router;
