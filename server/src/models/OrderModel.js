const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItem: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        images: [{ type: String, required: true }],
        price: { type: Number, required: true },
        product: {
          // join bảng Product
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        isReview: { type: Boolean },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: Array, required: true },
      phone: { type: Number, required: true },
      email: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // fullName: { type: String },
    status: { type: String, default: "pending" },
    totalPrice: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
