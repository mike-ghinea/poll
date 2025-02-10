import s from "./Poll.styles";
import { useState } from "react";
import Result from "./Result/Result";
import Question from "./Question/Question";
import { Poll as PollInterface } from "../../requests/models";

const Poll: React.FC<{ poll: PollInterface }> = ({ poll }) => {
  const [showResults, setShowResults] = useState(false);

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
