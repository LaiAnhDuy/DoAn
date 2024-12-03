const CouponRepo = require("../repository/couponRepo.js");

const createCoupon = async (req, res, next) => {
  try {
    const createCoupon = await CouponRepo.createCoupon(req.body);
    res.status(201).json({ message: "Coupon created", data: createCoupon });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getCoupons = async (req, res, next) => {
  try {
    const coupons = await CouponRepo.getAllCoupons(req.payload._id);
    res.status(200).json({ coupons });
  } catch (error) {
    next(error);
  }
};

const useCoupons = async (req, res, next) => {
  try {
    const { modifiedCount } = await CouponRepo.useCoupon(
      req.payload._id,
      req.body.couponId
    );
    if (modifiedCount === 0)
      return res.status(400).json("you already used this coupon ");
    res.status(200).json({
      message: "Use coupon success",
    });
  } catch (error) {
    next(error);
  }
};
const deleteCoupon = async (req, res, next) => {
  try {
    const deleteCoupon = await CouponRepo.deleteCoupon(req.params.id);
    res.status(200).json({ message: "Coupon deleted", data: deleteCoupon });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCoupon,
  useCoupons,
  getCoupons,
  deleteCoupon,
};
