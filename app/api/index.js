import network from "@services/network";
import * as local from "./response";

const endPoints = {
  login: "http://semmsar.com/wp-json/jwt-auth/v1/token",
};

export const fetchLogin = (params) => {
  return local.login({ params });
};

export const fetchValid = (params) => {
  return local.validToken({ params });
};

export const getSetting = (params) => {
  return local.getSetting({ params });
};

export const signUp = (params) => {
  return local.signUp({ params });
};

export const updateProfile = (params) => {
  return local.user({ params });
};

export const getUserInfo = (params) => {
  return local.user({ params });
};

export const changePassword = (params) => {
  return local.user({ params });
};

export const getWishList = (params) => {
  return local.getWishList({ params });
};

export const getHome = (params) => {
  return local.getHome({ params });
};

export const getProductDetail = (params) => {
  return local.getProductDetail({ params });
};


export const getReview = (params) => {
  return local.getReview({ params });
};

export const saveReview = (params) => {
  return local.getReview({ params });
};

export const getCategory = (params) => {
  return local.getCategory({ params });
};

export const getListProduct = (params) => {
  return local.getList({ params });
};

export const getMessage = (params) => {
  return local.getMessage({ params });
};

export const getNotification = (params) => {
  return local.getNotification({ params });
};
