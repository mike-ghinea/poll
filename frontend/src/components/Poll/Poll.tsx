import s from "./Poll.styles";
import React from "react";
import Result from "./Result/Result";
import Question from "./Question/Question";

const Poll = () => {
  const pollOptions: { id: number; text: string; percentage: number }[] = [
    { id: 1, text: "Option A", percentage: 0.8 },
    { id: 2, text: "Option B", percentage: 0.15 },
    { id: 3, text: "Option C", percentage: 0.05 },
  ];

  const [showResults, setShowResults] = React.useState(false);

  return (
    <s.PollWrapper>
      {showResults ? (
        <Result pollOptions={pollOptions} />
      ) : (
        <Question
          pollOptions={pollOptions}
          showResults={() => setShowResults(true)}
        />
      )}
    </s.PollWrapper>
  );
};

export default Poll;
