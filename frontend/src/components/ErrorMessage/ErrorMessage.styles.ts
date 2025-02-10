import { css, styled } from "styled-components";

const BaseStyling = css`
  color: white;
  text-align: center;
`;

const TitleErrorMessage = styled.h1`
  ${BaseStyling}
  font-size: 3rem;
  width: 70vw;

  @media (min-width: 1250px) {
    font-size: 5rem;
    width: 34vw;
  }
`;

const RegularErrorMessage = styled.p`
  ${BaseStyling}
`;

export default {
  TitleErrorMessage,
  RegularErrorMessage,
};
