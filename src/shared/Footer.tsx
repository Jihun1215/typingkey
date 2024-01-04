import styled from "styled-components";

export const Footer = () => {
  return (
    <Container>
      <span>대충 깃허브, 메일, 블로그, 등등 Svg 로고들로 넣기</span>
      <p>@Jirune</p>
      <span>all rights reserved</span>
    </Container>
  );
};

const Container = styled.footer`
  position: absolute;
  bottom: 25px;
  width: 80vw;
  height: 50px;
  ${({ theme }) => theme.BoxCenter};
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 6px;
`;
