import { Poll } from "../../../requests/utils";
import { ErrorMessage, SIZE } from "../../ErrorMessage/ErrorMessage";
import { LoadingBox } from "../../LoadingBox/LoadingBox";
import s from "../Poll.styles";
import { useQuestion } from "./useQuestion";

const Question: React.FC<{
  poll: Poll;
  showResults: () => void;
}> = ({ poll, showResults }) => {
  const { isLoading, error, selectedOption, onSubmit, updateSelectedOption } =
    useQuestion(poll.id, showResults);

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
              updateSelectedOption(option.id);
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
