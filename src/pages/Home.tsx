import styled from "styled-components";

import { TextInfo } from "components/TextInfo";
import { Input } from "components/Input";

export const Home = () => {
  return (
    <Container>
      <TextInfo />
      <Input />
    </Container>
  );
};

const Container = styled.div`
  width: 80vw;
  height: 600px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 12px;
`;
