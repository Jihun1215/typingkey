import styled from "styled-components";

export const TypingInfo = () => {
  return (
    <Container>

    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 200px;
  margin: 25px auto;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  gap: 50px 0;
  background: #fff;
  border-radius: 4px;
`;

