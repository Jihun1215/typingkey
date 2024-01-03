import styled from "styled-components";

export const TypingInfo = () => {
  return (
    <Container>
      {/* <Main>
        <Text>알아서 잘 딱 깔끔하고 센스있게</Text>
      </Main>
      <Bottom /> */}
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

// const Main = styled.div`
//   width: 80%;
//   height: 120px;
//   background-color: gray;
//   ${({ theme }) => theme.BoxCenter};
// `;

// const Text = styled.h4`
//   width: 90%;
//   height: 50px;
//   background: #fff;
//   color: black;
//   ${({ theme }) => theme.BoxCenter};
//   font-size: 24px;
// `;

// const Bottom = styled.div`
//   width: 100%;
//   height: 30px;
//   border: 1px solid red;
// `;
