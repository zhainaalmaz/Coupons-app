import axios from 'axios';
const BASE_URL = 'http://185.178.44.117/api/v1/';

export const getSubtitleTags = () => {
  return axios.get(BASE_URL + 'tags');
};

export function getContactInfo() {
  return axios.get(BASE_URL + 'info/networks');
}

export function getCoupons() {
  return axios.get(BASE_URL + 'coupons');
}

export function getHelpInfo() {
  return axios.get(BASE_URL + 'info/faq/');
}
