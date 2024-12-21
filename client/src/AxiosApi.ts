import axios from "axios";
import { baseUrl } from './GeneralConstants.ts';

const axiosAPI = axios.create({
  baseURL: baseUrl,
});

export default axiosAPI;
