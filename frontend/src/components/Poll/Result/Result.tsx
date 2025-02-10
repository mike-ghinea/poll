import { useEffect, useState } from "react";
import s from "../Poll.styles";
import { getVotes } from "../../../requests/vote";
import { PollOptionWithVoteCount } from "../../../requests/utils";
import { LoadingBox } from "../../LoadingBox/LoadingBox";
import { ErrorMessage, SIZE } from "../../ErrorMessage/ErrorMessage";

const Result = () => {
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

  if (isLoading) return <LoadingBox />;

  if (error) return <ErrorMessage size={SIZE.TITLE} message={error} />;

  if (!pollOptions) return <></>;

  return (
    <>
      <s.Header>Thank you for your response!</s.Header>
      <s.OptionWrapper>
        {pollOptions.map((pollOption) => {
          const formattedPercentage = new Intl.NumberFormat("en-GB", {
            style: "percent",
            maximumSignificantDigits: 3,
          }).format(pollOption.count / totalVotes);
          return (
            <s.PollResult
              key={pollOption.id}
              $percentage={pollOption.count / totalVotes}
            >
              <p className="side"></p>
              <p>{pollOption.text}</p>
              <p className="side">{`${formattedPercentage}`}</p>
            </s.PollResult>
          );
        })}
      </s.OptionWrapper>
    </>
  );
};

export default Result;
