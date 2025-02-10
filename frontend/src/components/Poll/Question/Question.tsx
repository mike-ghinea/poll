import { Poll } from "../../../requests/utils";
import { postVote } from "../../../requests/vote";
import { ErrorMessage, SIZE } from "../../ErrorMessage/ErrorMessage";
import { LoadingBox } from "../../LoadingBox/LoadingBox";
import s from "../Poll.styles";
import React, { useState } from "react";

const Question: React.FC<{
  poll: Poll;
  showResults: () => void;
}> = ({ poll, showResults }) => {
  const [selectedOption, setSelectedOption] = React.useState<string>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const onSubmit = () => {
    if (!selectedOption) return;
    setIsLoading(true);
    setError(undefined);
    postVote(poll.id, selectedOption)
      .then(() => showResults())
      .catch(() =>
        setError(
          "Something went wrong while submitting your vote. Please try again later.",
        ),
      )
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <LoadingBox />;

  if (error) return <ErrorMessage size={SIZE.TITLE} message={error} />;

  return (
    <>
      <s.Header>{poll.question}</s.Header>
      <s.OptionWrapper>
        {poll.options.map((option) => (
          <s.PollOption
            key={option.id}
            onClick={(e) => {
              e.preventDefault();
              setSelectedOption(option.id);
            }}
            $hightlight={option.id === selectedOption}
          >
            {option.text}
          </s.PollOption>
        ))}
      </s.OptionWrapper>
      <s.SubmitButton
        role="submit"
        onClick={onSubmit}
        disabled={!selectedOption}
        aria-disabled={!selectedOption}
      >
        Submit
      </s.SubmitButton>
    </>
  );
};

export default Question;
