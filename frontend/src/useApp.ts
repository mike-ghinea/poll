import { useEffect, useState } from "react";
import { getActivePoll } from "./requests/poll";
import { Poll } from "./requests/models";

export const useApp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [activePoll, setActivePoll] = useState<Poll>();

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);
    getActivePoll()
      .then((res) => setActivePoll(res.data))
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
    activePoll,
  };
};
