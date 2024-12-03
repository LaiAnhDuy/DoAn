import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllSupplier = async (supplierID, access_token) => {
  try {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/supplier`, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
      // params: { supplierID: supplierID },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createSupplier = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_URL}/supplier`,
      data,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllBrandsProduct = async (data, access_token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/supplier`, {
      params: data,
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteSupplier = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(
      `${process.env.REACT_APP_API_URL}/supplier/${id}`,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
