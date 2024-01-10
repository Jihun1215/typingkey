import { ReactNode } from "react";
import styled from "styled-components";
import { tooltipAnimation, tooltipMoveAnimation } from "styles/Animation";

type TooltipProps = {
  message: string;
  children: ReactNode;
  // placement: string;
};

export const Tooltip = ({ message, children }: TooltipProps) => {
  // console.log(placement);
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
  bottom: 0px;
  cursor: pointer;
  ${({ theme }) => theme.FlexRow};
  justify-content: center;
  /* border: 1px solid red; */
  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
    /* animation: ${tooltipAnimation} 0.4s ease-in-out; */
  }
  &:hover > svg,
  &:active > svg {
    /* animation: ${tooltipMoveAnimation} 0.45s ease-in-out; */
  }
`;

const Content = styled.div`
  display: none;
  position: absolute;
  z-index: 200;
  bottom: 35px;
  min-width: 90px;
  height: 25px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
  padding: 8px;
  text-align: center;
  > p {
    position: absolute;
    ${({ theme }) => theme.WH100};
    ${({ theme }) => theme.BoxCenter};
    font-weight: 500;
    color: ${({ theme }) => theme.color};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
  }
`;
