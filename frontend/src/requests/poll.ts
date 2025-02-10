import axios from "axios";
import { apiRoot, pollDomain } from "./utils";

export const getActivePoll = () => {
  return axios.get(`${apiRoot}${pollDomain}/active`);
};
