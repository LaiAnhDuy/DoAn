const Coupon = require("../models/CouponModel.js");

const createCoupon = async (data) => {
  const newCoupon = new Coupon(data);
  return await newCoupon.save();
};
const getAllCoupons = async (userId) => {
  const coupons = await Coupon.find({
    startDate: {
      $lte: new Date(),
    },
    expiredDate: {
      $gte: new Date(),
    },
    used: { $ne: userId },
  });
  return coupons;
};
const useCoupon = async (userId, couponId) => {
  return Coupon.findOneAndUpdate(
    { _id: couponId },
    {
      $addToSet: {
        used: userId,
      },
    }
  );
};
const deleteCoupon = async (couponId) => {
  return await Coupon.findByIdAndDelete(couponId);
};
module.exports = {
  createCoupon,
  getAllCoupons,
  useCoupon,
  deleteCoupon,
};
