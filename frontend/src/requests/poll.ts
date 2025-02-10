import axios from "axios";
import { apiRoot, pollDomain } from "../utils/request.utils";
import { Poll } from "./models";

export const getActivePoll = () => {
  return axios.get<Poll>(`${apiRoot}${pollDomain}/active`);
};
