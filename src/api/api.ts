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
  }).then((response)=>{

     return response.data
  })
}
export function checkUSer(data: object) {
  return axios({
    method: 'post',
    url: BASE_URL + 'users/check-user/',
    data: data,
  }).then((response)=>{

     return response.data
  })
}

