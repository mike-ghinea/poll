import { useEffect, useState } from "react";
import { getVotes } from "../../../requests/vote";
import { PollOptionWithVoteCount } from "../../../requests/utils";

export const useResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [pollOptions, setPollOptions] = useState<PollOptionWithVoteCount[]>();

  const totalVotes =
    pollOptions?.reduce((acc, option) => acc + option.count, 0) ?? 0;

  useEffect(() => {
    setIsLoading(true);
    getVotes()
      .then((res) => setPollOptions(res.data.pollOptions))
      .catch((e: { status: number }) => {
        if (e.status === 404)
          setError(
            "There are no active polls at the moment. Please check in later.",
          );
        else
          setError(
            "We are not able to get the active poll at the moment. Please try again later.",
          );
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    error,
    pollOptions,
    totalVotes,
  };
};
