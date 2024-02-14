import { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { UserCheckState } from "state/atoms";

import { Header, Footer } from "shared";
import { UserInfoModal } from "components/UserInfoModal";
// import { firestore } from "utils/firebase";
// import { collection } from "firebase/firestore";

export const Layout = () => {
  const userCheck = useRecoilValue(UserCheckState);

  // const [userData, setUserData] = useState(null); // 사용자 데이터 상태

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // Firestore에서 사용자 데이터 가져오기
  //       const userId = "사용자의 UID"; // 실제 UID로 변경
  //       const userDoc = await firestore.collection("users").doc(userId).get();

  //       if (userDoc.exists) {
  //         // 사용자 데이터가 존재할 경우 상태에 저장
  //         setUserData(userDoc.data());
  //       } else {
  //         console.log("User not found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error.message);
  //     }
  //   };

  //   if (userCheck) {
  //     fetchUserData(); // 사용자가 로그인한 경우에만 데이터를 가져옴
  //   }
  // }, [userCheck]);

  // console.log(userData);

  return (
    <LayoutContainer>
      {userCheck ? <UserInfoModal /> : null}
      <Header />
      <Outlet />
      <Footer />
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  gap: 20px 0;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
  ${({ theme }) => theme.PretendardFontBody};
`;
