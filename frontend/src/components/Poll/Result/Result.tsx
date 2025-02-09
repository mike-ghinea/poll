import s from "../Poll.styles";
import React from "react";

const Result: React.FC<{
  pollOptions: { id: number; text: string; percentage: number }[];
}> = ({ pollOptions }) => {
  return (
    <>
      <s.Header>Thank you for your response!</s.Header>
      <s.OptionWrapper>
        {pollOptions.map((pollOption) => (
          <s.PollResult key={pollOption.id} $percentage={pollOption.percentage}>
            <p className="side"></p>
            <p>{pollOption.text}</p>
            <p className="side">{`${pollOption.percentage * 100}%`}</p>
          </s.PollResult>
        ))}
      </s.OptionWrapper>
    </>
  );
};

export default Result;
