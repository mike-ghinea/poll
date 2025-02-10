import s from "./ErrorMessage.styles";

export enum SIZE {
  TITLE = "title",
  TEXT = "text",
}

interface ErrorMessageProps {
  size: SIZE;
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  size,
  message,
}) => {
  if (size === SIZE.TEXT)
    return <s.RegularErrorMessage>{message}</s.RegularErrorMessage>;
  else if (size === SIZE.TITLE)
    return <s.TitleErrorMessage>{message}</s.TitleErrorMessage>;
};
