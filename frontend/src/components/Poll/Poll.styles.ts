import styled, { css } from "styled-components";

const PollWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PollOption = styled.button<{ $hightlight: boolean }>`
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid white;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.6);
  }

  ${(props) =>
    props.$hightlight &&
    css`
      &,
      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0.8);
      }
    `}

  height: 3rem;
  width: 70vw;
  margin: 0.5rem;
  font-size: 1rem;

  @media (min-width: 1250px) {
    height: 5rem;
    width: 25vw;
    margin: 1rem;
    font-size: 2rem;
  }
`;

const PollResult = styled.div<{ $percentage: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  text-align: center;

  padding-left: 1rem;
  padding-right: 1rem;

  & > .side {
    width: 10%;
    font-size: 0.75rem;
    @media (min-width: 1250px) {
      width: 15%;
      font-size: 1.5rem;
    }
  }

  background: linear-gradient(
    to right,
    white ${(props) => props.$percentage * 100}%,
    rgba(255, 255, 255, 0.5) ${(props) => props.$percentage * 100}%
  );
  border: 2px solid white;
  border-radius: 0.5rem;

  height: 3rem;
  width: 70vw;
  margin: 0.5rem;
  font-size: 1rem;

  @media (min-width: 1250px) {
    height: 5rem;
    width: 25vw;
    margin: 1rem;
    font-size: 2rem;
  }
`;

const Header = styled.h1`
  color: white;
  text-align: center;

  width: 70vw;
  font-size: 2rem;

  @media (min-width: 1250px) {
    width: 33vw;
    font-size: 3rem;
  }
`;

const SubmitButton = styled.button`
  background-color: ${(props) => (props.disabled ? "lightgrey" : "white")};
  border: none;
  border-radius: 0.5rem;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  height: 3rem;
  width: 70vw;
  margin: 0.5rem;
  font-size: 1rem;

  @media (min-width: 1250px) {
    height: 5rem;
    width: 25vw;
    margin: 1rem;
    font-size: 2rem;
  }
`;

export default {
  PollWrapper,
  OptionWrapper,
  PollOption,
  Header,
  SubmitButton,
  PollResult,
};
