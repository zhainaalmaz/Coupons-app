// A mock function to mimic making an async request for data

import axios from "axios";

const baseURL = "http://185.178.44.117/api/v1/"

export function getContactInfo() {
  return axios.get(baseURL + "info/networks")
}

export function fetchCount(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
      setTimeout(() => resolve({ data: amount }), 500)
    );
}
  
export function searchCoupons(params: string) {
  return axios.get(baseURL + "coupons/search/?search=" + params)
}

export function  getCoupons  ():any  {
  return axios.get(baseURL + "coupons")
}

export function getConfidentials() {
  return axios.get(baseURL + "info/privacy-policy/")
}

