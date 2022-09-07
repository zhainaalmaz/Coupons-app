// A mock function to mimic making an async request for data

import axios from "axios";

const baseURL = "http://185.178.44.117/api/v1/info/"

export function getContactInfo() {
  return axios.get(baseURL + "networks")
}



export function fetchCount(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
      setTimeout(() => resolve({ data: amount }), 500)
    );
  }
  