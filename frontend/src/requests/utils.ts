export const apiRoot = "http://localhost:8080";
export const pollDomain = "/api/poll";

export interface PollOption {
  id: string;
  text: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

export interface PollOptionWithVoteCount extends PollOption {
  count: number;
}
