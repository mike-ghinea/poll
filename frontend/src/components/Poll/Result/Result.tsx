import s from "../Poll.styles";
import { LoadingBox } from "../../LoadingBox/LoadingBox";
import { ErrorMessage, SIZE } from "../../ErrorMessage/ErrorMessage";
import { useResult } from "./useResult";

const Result = () => {
  const { isLoading, error, pollOptions, totalVotes } = useResult();

  if (isLoading) return <LoadingBox />;

  if (error) return <ErrorMessage size={SIZE.TITLE} message={error} />;

  if (!pollOptions) return <></>;

  return (
    <>
      <s.Header>Thank you for your response!</s.Header>
      <s.OptionWrapper>
        {pollOptions.map((pollOption) => {
          const formattedPercentage =
            pollOption.count === 0
              ? "0%"
              : new Intl.NumberFormat("en-GB", {
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
