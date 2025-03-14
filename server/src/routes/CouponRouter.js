const express = require("express");

const couponController = require("../controllers/CouponController");
const verify = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post(
  "/",
  verify.verifyUser,
  verify.verifyAdmin,
  couponController.createCoupon
);
router.get("/", verify.verifyUser, couponController.getCoupons);
router.post("/used", verify.verifyUser, couponController.useCoupons);
router.delete(
  "/:id",
  verify.verifyUser,
  verify.verifyAdmin,
  couponController.deleteCoupon
);
router.get(
  "/admin",
  verify.verifyUser,
  verify.verifyAdmin,
  couponController.getAdminCoupons
);
router.patch(
  "/:id",
  verify.verifyUser,
  verify.verifyAdmin,
  couponController.updateCoupon
);
module.exports = router;
