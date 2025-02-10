import axios from "axios";
import { apiRoot, pollDomain } from "./utils";

export const getVotes = () => {
  return axios.get(`${apiRoot}${pollDomain}/active/vote_count`);
};

export const postVote = (pollId: string, pollOptionId: string) => {
  return axios.post(
    `${apiRoot}${pollDomain}/${pollId}/poll_option/${pollOptionId}/vote`,
  );
};
