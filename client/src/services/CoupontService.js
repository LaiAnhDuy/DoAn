import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllCoupon = async (access_token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/coupon`,

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

export const getAllCouponAdmin = async (access_token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/coupon/admin`,

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

export const createCoupon = async (data, access_token) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/coupon`,
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

export const updateCoupon = async (data, access_token) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/coupon/${data.id}`,
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

export const usedCoupon = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_URL}/coupon/used`,
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
export const deleteCoupon = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(
      `${process.env.REACT_APP_API_URL}/coupon/${id}`,
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
