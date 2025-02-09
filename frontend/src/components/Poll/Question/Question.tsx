import s from "../Poll.styles";
import React from "react";

const Question: React.FC<{
  pollOptions: { id: number; text: string; percentage: number }[];
  showResults: () => void;
}> = ({ pollOptions, showResults }) => {
  const [selectedOption, setSelectedOption] = React.useState<number>();
  const onSubmit = () => {
    console.log("Submitted:", selectedOption);
    showResults();
  };
  return (
    <>
      <s.Header>
        What is heavier? A kilogramme of feathers or a kilogramme of steel?
      </s.Header>
      <s.OptionWrapper>
        {pollOptions.map((pollOption) => (
          <s.PollOption
            key={pollOption.id}
            onClick={(e) => {
              e.preventDefault();
              setSelectedOption(pollOption.id);
            }}
            $hightlight={pollOption.id === selectedOption}
          >
            {pollOption.text}
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
