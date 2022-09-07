import axios from 'axios';
const BASE_URL = 'http://185.178.44.117/api/v1/';
// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const getSubtitleTags = () => {
  return axios.get(BASE_URL + 'tags');
};

// export const getSubCategorie = () => {
//   return axios.get(BASE_URL + '/coupons/subcategory/');
// };
