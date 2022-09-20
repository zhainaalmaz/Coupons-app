import axios from "axios";
export const BASE_URL = "http://185.178.44.117/api/v1/";

export const getSubtitleTags = () => {
  return axios.get(BASE_URL + "tags");
};

export function getContactInfo() {
  return axios.get(BASE_URL + "info/networks");
}

export function getCoupons(num: number) {
  return axios.get(BASE_URL + "coupons/category/1/?tags=" + num);
}

export function searchCoupons(params: string) {
  return axios.get(BASE_URL + "coupons/search/?search=" + params);
}

export function getHeaderPhone() {
  return axios.get(BASE_URL + "networks");
}

export function getCategories() {
  return axios.get(BASE_URL + "categories/");
}

export function getHelpInfo() {
  return axios.get(BASE_URL + "info/faq/");
}

export const getAboutUsInfo = async () => {
  return axios.get(`http://185.178.44.117/api/v1/info/about-us`);
};

export function getConfidentials() {
  return axios.get(BASE_URL + "info/privacy-policy/");
}

export function getCouponDetails(id: string) {
  return axios.get(BASE_URL + `coupons/${id}/`);
}

export function getCompanyDetails(id: string) {
  return axios.get(BASE_URL + `company/${id}/`);
}

// Auth
export function auth(data: object) {
  return axios({
    method: "post",
    url: BASE_URL + "users/auth/",
    data: data,
  }).then((response) => {
    return response.data;
  });
}

export function confirm(data: object) {
  return axios({
    method: "post",
    url: BASE_URL + "users/login-confirm/",
    data: data,
  }).then((response) => {
    return response;
  });
}

export function login(data: object) {
  return axios({
    method: "post",
    url: BASE_URL + "users/login/",
    data: data,
  }).then((response) => {
    return response.data;
  });
}
export function checkUSer(data: object) {
  return axios({
    method: "post",
    url: BASE_URL + "users/check-user/",
    data: data,
  }).then((response) => {
    return response.data;
  });
}

export function getCarousel() {
  return axios.get(BASE_URL + "/info/image-slider/");
}

export function getMainImg() {
  return axios.get(BASE_URL + "/info/image-block/");
}

export function changePassword(data: object) {
  const token = JSON.parse(localStorage.getItem("currentUser") || "");

  return axios({
    method: "put",
    url: BASE_URL + "users/change-password/",
    data: data,
    headers: {
      Authorization: "Bearer " + token.access,
    },
  }).then((response) => {
    return response.data;
  });
}

export function changePhone(data: object) {
  const token = JSON.parse(localStorage.getItem("currentUser") || "");
  return axios({
    method: "post",
    url: BASE_URL + "users/change-old-phone/",
    data: data,
    headers: {
      Authorization: "Bearer " + token.access,
    },
  }).then((response) => {
    return response.data;
  });
}

export function recoveryPassword(data: object) {
  return axios({
    method: "put",
    url: BASE_URL + "users/recovery-password/",
    data: data,
  }).then((response) => {
    return response.data;
  });
}

export function recoveryPasswordConfirm(data: object) {
  return axios({
    method: "post",
    url: BASE_URL + "users/recovery-password-confirm/",
    data: data,
  }).then((response) => {
    return response.data;
  });
}

export function newPhoneConfirm(data: object) {
  const token = JSON.parse(localStorage.getItem('currentUser') || "")
  return axios({
    method: 'post',
    url: BASE_URL + 'users/new-phone-confirm/',
    data: data,
    headers: {
      'Authorization': "Bearer " + token.access,
    }
  }).then((response) => {
    return response.data
  })
}

