const SupplierModel = require("../models/SupplierModel");

const getSuppliers = async (supplierId) => {
  const suppliers = await SupplierModel.find({
    ...(supplierId ? { _id: supplierId } : {}),
}).populate("brands");
  return suppliers;
};
const createSupplier = async (supplier) => {
  const newSupplier = new SupplierModel(supplier);
  await newSupplier.save();
  return newSupplier;
};
const updateSupplier = async (supplier) => {
  await SupplierModel.findOneAndUpdate({ _id: supplier._id }, supplier);
  return supplier;
};
const deleteSupplier = async (supplierId) => {
  await SupplierModel.findOneAndDelete({ _id: supplierId });
  return supplierId;
};
module.exports = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
