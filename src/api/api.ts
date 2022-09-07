import axios from 'axios';
const BASE_URL = 'http://185.178.44.117/api/v1/';

export const getSubtitleTags = () => {
  return axios.get(BASE_URL + 'tags');
};

export function getHeaderPhone() {
  return axios.get(BASE_URL + 'networks');
}

export function getCoupons(): any {
  return axios.get(BASE_URL + 'coupons');
}
