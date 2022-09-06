import axios from "axios";
// import {useDispatch} from "react-redux";

const baseURL = "http://185.178.44.117/api/v1/"
// const dispatch = useDispatch()


export function fetchCount(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
      setTimeout(() => resolve({ data: amount }), 500)
    );
  }

  
export function  getCoupons  ():any  {
  return axios.get(baseURL + "coupons")
}

