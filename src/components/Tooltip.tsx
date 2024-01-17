import { ReactNode } from "react";
import styled from "styled-components";
import { tooltipAnimation, tooltipMoveAnimation } from "styles/Animation";

type TooltipProps = {
  message: string;
  children: ReactNode;
  placement: string;
};

export const Tooltip = ({ message, children, placement }: TooltipProps) => {

  return (
    <Container>
      {children}

      {placement === "header" ? (
        <Content className="tooltip">
          <p>{message}</p>
        </Content>
      ) : placement === "footer" ? (
        <Content className="tooltip footer">
          <p>{message}</p>
        </Content>
      ) : (
        <Content className="tooltip typinginfo">
          <p>{message}</p>
        </Content>
      )}

    </Container>
  );
};
// 920000
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
    /* animation: ${tooltipAnimation} 0.2s ease-in-out; */
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
  max-width: 120px;
  height: 25px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray5};
  padding: 8px;
  text-align: center;
  &.typinginfo {
    bottom: 70px;
  }

  &.footer {
    bottom: 50px;
  }
  p {
    position: absolute;
    ${({ theme }) => theme.WH100};
    ${({ theme }) => theme.BoxCenter};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
  }
`;
