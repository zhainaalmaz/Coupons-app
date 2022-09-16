import axios from 'axios';
const BASE_URL = 'http://185.178.44.117/api/v1/';

export const getSubtitleTags = () => {
  return axios.get(BASE_URL + 'tags');
};

export function getContactInfo() {
  return axios.get(BASE_URL + "info/networks")
}


export function getCoupons() {
  return axios.get(BASE_URL + "coupons")
}

// auth

export function auth(data: object) {
  return axios({
    method: 'post',
    url: BASE_URL + 'users/auth/',
    data: data
  })
    .then((response) => {
      return response.data
    })
}

export function confirm(data: object) {
  return axios({
    method: 'post',
    url: BASE_URL + 'users/login-confirm/',
    data: data
  }).then((response) => {
    return response
  })
}

export function login(data: object) {
  return axios({
    method: 'post',
    url: BASE_URL + 'users/login/',
    data: data,
  }).then((response) => {

    return response.data
  })
}
export function checkUSer(data: object) {
  return axios({
    method: 'post',
    url: BASE_URL + 'users/check-user/',
    data: data,
  }).then((response) => {
    return response.data
  })
}

export function changePassword(data: object) {
  const token = JSON.parse(localStorage.getItem('currentUser') || "")
  console.log(token);

  return axios({
    method: 'put',
    url: BASE_URL + 'users/change-password/',
    data: data,
    headers: {
      'Authorization': "Bearer " + token.access,
    }
  }).then((response) => {
    return response.data
  })
}

export function changePhone(data: object) {
  const token = JSON.parse(localStorage.getItem('currentUser') || "")
  return axios({
    method: 'post',
    url: BASE_URL + 'users/change-old-phone/',
    data: data,
    headers: {
      'Authorization': "Bearer " + token.access,
    }
  }).then((response) => {
    return response.data
  })
}

export function recoveryPassword(data: object) {
  return axios({
    method: 'put',
    url: BASE_URL + 'users/recovery-password/',
    data: data,
  }).then((response) => {
    return response.data
  })
}

export function recoveryPasswordConfirm(data: object) {
  return axios({
    method: 'post',
    url: BASE_URL + 'users/recovery-password-confirm/',
    data: data,
  }).then((response) => {
    return response.data
  })
}
