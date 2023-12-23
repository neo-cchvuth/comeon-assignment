import axios from 'axios';

export type BaseResponse = {
  status: 'success' | 'fail';
};

export const configureAxios = () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
};
