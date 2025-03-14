const Coupon = require("../models/CouponModel.js");

const createCoupon = async (data) => {
  const newCoupon = new Coupon(data);
  return await newCoupon.save();
};

const updateCoupon = async (id, data) => {
  return Coupon.findByIdAndUpdate(id, data);
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
const getAdminAllCoupons = async () => {
  const coupons = await Coupon.find({
    expiredDate: {
      $gte: new Date(),
    },
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
  getAdminAllCoupons,
  useCoupon,
  deleteCoupon,
  updateCoupon,
};
