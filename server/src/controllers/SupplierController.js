const SupplierRepo = require("../repository/supplierRepo");

const createSupplier = async (req, res, next) => {
  try {
    const supplier = await SupplierRepo.createSupplier({
      ...req.body,
      image: req.file?.filename,
    });
    res.status(201).json(supplier);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const getAllSuppliers = async (req, res, next) => {
  try {
    const { supplierId } = req.query;
    const suppliers = await SupplierRepo.getSuppliers(supplierId);
    res.status(200).json(suppliers);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deleteSupplier = async (req, res, next) => {
  try {
    const deleteSupplier = await SupplierRepo.deleteSupplier(req.params.id);
    res.status(200).json(deleteSupplier);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = {
  createSupplier,
  getAllSuppliers,
  deleteSupplier,
};
