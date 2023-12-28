import styled from "styled-components";

export const Home = () => {
  return <Container></Container>;
};

const Container = styled.div`
  width: 80vw;
  height: 650px;
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 12px;
`;
