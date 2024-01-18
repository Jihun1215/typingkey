import styled from "styled-components";

import { Tooltip } from "components";
import { FaGithub, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
  return (
    <Container>
      <Item>
        <Tooltip message="깃허브" placement="footer">
          <SvgArea
            href="https://github.com/Jihun1215/typingkey"
            target="_black"
          >
            <FaGithub />
          </SvgArea>
        </Tooltip>

        <Tooltip message="메일보내기" placement="footer">
          <SvgArea href="mailto:jhmc5268@naver.com" target="_black">
            <FaEnvelope />
          </SvgArea>
        </Tooltip>
      </Item>

      <Item>Developer: Jirune</Item>

      <Item>
        <p>Ver_1.0.1</p>
      </Item>
    </Container>
  );
};

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 380px;
  height: 50px;
  ${({ theme }) => theme.BoxCenter};
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 6px;
  @media (max-width: 900px) {
    width: 90%;
  }
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  gap: 0 15px;
  font-weight: 600;
  p {
    font-size: 18px;
    font-weight: 500;
  }
`;

const SvgArea = styled.a`
  width: 24px;
  height: 24px;
  color: white;

  svg {
    ${({ theme }) => theme.WH100};
  }
  &:hover {
    color: #8a7ebe;
  }
`;
