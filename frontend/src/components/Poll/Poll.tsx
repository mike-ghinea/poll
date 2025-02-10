import s from "./Poll.styles";
import React from "react";
import Result from "./Result/Result";
import Question from "./Question/Question";
import { Poll as PollInterface } from "../../requests/utils";

const Poll: React.FC<{ poll: PollInterface }> = ({ poll }) => {
  const [showResults, setShowResults] = React.useState(false);

  return (
    <s.PollWrapper>
      {showResults ? (
        <Result />
      ) : (
        <Question poll={poll} showResults={() => setShowResults(true)} />
      )}
    </s.PollWrapper>
  );
};

export default Poll;
