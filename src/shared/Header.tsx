import styled from "styled-components";

export const Header = () => {
  return <Conaienrt>Header</Conaienrt>;
};

const Conaienrt = styled.header`
  position: absolute;
  top: 5px;
  width: 80vw;
  height: 80px;
  ${({ theme }) => theme.BoxCenter};
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 6px;
`;
