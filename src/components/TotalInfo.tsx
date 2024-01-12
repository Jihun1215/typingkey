import styled from "styled-components";

// 타이핑 한 문장당 데이터를 가져와 기존 데이터와 비교하여 총 값을 나오게 하기
export const TotalInfo = () => {
  //
  return (
    <Container>
      <Item>CPM: XX</Item>
      <Item>time: XX</Item>
      <Item>MAX: XX</Item>
    </Container>
  );
};

const Container = styled.div`
  width: 40%;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.gray3};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Item = styled.div`
  ${({ theme }) => theme.BoxCenter};
`;
