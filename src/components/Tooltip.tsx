import { ReactNode } from "react";
import styled from "styled-components";
import { tooltipAnimation, tooltipMoveAnimation } from "styles/Animation";

type TooltipProps = {
  message: string;
  children: ReactNode;
  placement: string;
};

export const Tooltip = ({ message, children, placement }: TooltipProps) => {
  console.log(placement);
  return (
    <Container>
      {children}
      <Content className="tooltip placement">
        <p>{message}</p>
      </Content>
    </Container>
  );
};

const Container = styled.aside`
  position: relative;
  bottom: 8px;
  cursor: pointer;
  ${({ theme }) => theme.FlexRow};
  justify-content: center;
  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
    animation: ${tooltipAnimation} 0.4s ease-in-out;
  }
  &:hover > svg,
  &:active > svg {
    animation: ${tooltipMoveAnimation} 0.45s ease-in-out;
  }
`;

const Content = styled.div`
  display: none;
  position: absolute;
  z-index: 200;
  bottom: 55px;
  min-width: 100px;
  height: 35px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 8px;
  text-align: center;
  > p {
    position: absolute;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 40%;
    width: 0;
    height: 0;
    border: 0.625rem solid transparent;
    border-top-color: ${({ theme }) => theme.colors.blue};
    border-bottom: 0;
    margin-bottom: -7px;
  }
`;
