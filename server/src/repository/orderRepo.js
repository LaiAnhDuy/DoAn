const Order = require("../models/OrderModel");

const findOrder = async (filters) => {
  return await Order.findOne(filters);
};

const getAllOrders = async (filters) => {
  return await Order.find(filters);
  // .populate({
  //   path: "orderItem.product", // Path to the `product` field in `orderItem`
  //   model: "Product", // Reference to the `Product` model
  // });
};

const createOrder = async (order, session) => {
  const newOrder = new Order(order);
  return await newOrder.save({ session });
};

const updateOrder = async (orderId, status) => {
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: orderId },
    { status },
    {
      new: true,
    }
  );
  return updatedOrder;
};

const deleteOrder = async (orderId) => {
  return await Order.deleteOne({ _id: orderId });
};
const cancelOrder = async (orderId) => {
  return await Order.findOneAndUpdate(
    { _id: orderId },
    { status: "cancel" },
    { new: true }
  );
};

module.exports = {
  findOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  cancelOrder,
};
