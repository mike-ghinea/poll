import { useState } from "react";
import { postVote } from "../../../requests/vote";

export const useQuestion = (pollId: string, showResults: () => void) => {
  const [selectedOption, setSelectedOption] = useState<string>();
  const updateSelectedOption = (option: string) => setSelectedOption(option);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const onSubmit = () => {
    if (!selectedOption) return;
    setIsLoading(true);
    setError(undefined);
    postVote(pollId, selectedOption)
      .then(() => showResults())
      .catch(() =>
        setError(
          "Something went wrong while submitting your vote. Please try again later.",
        ),
      )
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    error,
    selectedOption,
    onSubmit,
    updateSelectedOption,
  };
};
