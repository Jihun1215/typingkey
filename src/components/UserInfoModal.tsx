import { useState, ChangeEvent } from "react";
import styled from "styled-components";

import { useMutation } from "react-query";

import { v4 as uuidv4 } from "uuid";

import { userI } from "types/type";

// FIREBASE
import { auth, firestore } from "utils/firebase";
import { getAuth, signInAnonymously, User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export const UserInfoModal = () => {
  const [userName, setuserName] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setuserName(inputValue);

    if (inputValue.length >= 1 && validateNickname(inputValue)) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const validateNickname = (name: string): boolean => {
    const regex = /^[a-zA-Z가-힣]{2,5}$/;
    return regex.test(name) && !/\d/.test(name);
  };

  // useMutation을 사용하여 데이터 추가
  //   const mutation = useMutation(async (newUserData: userI) => {
  //     // 익명 인증으로 로그인
  //     const authInstance = getAuth();
  //     const userCredential = await signInAnonymously(authInstance);
  //     const user: User | null = userCredential.user;

  //     // 로그인 후에만 닉네임 저장
  //     if (user) {
  //       // Firestore에 데이터 추가
  //       const userId = uuidv4(); // uuid로 사용자 UID 생성
  //       //   const userId = user.uid; // 사용자 UID 가져오기
  //       const docRef = await addDoc(collection(firestore, "users"), {
  //         ...newUserData,
  //         userId,
  //       });
  //       return docRef.id;
  //     }

  //     // 만약 로그인이 실패했다면, 여기에 추가적인 처리를 할 수 있습니다.
  //     throw new Error("Anonymous sign in failed");
  //   });

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (buttonDisabled) {
      try {
        // 익명으로 로그인
        const userCredential = await signInAnonymously(auth);
        const user: User | null = userCredential.user;

        // 로그인 후에만 닉네임 저장
        if (user) {
          const userId = user.uid; // 사용자 UID 가져오기

          const userInfo = {
            nickname: userName,
            userId,
          };

          try {
            // Firestore에 데이터 추가
            await addDoc(collection(firestore, "users"), userInfo);

            // 로컬 스토리지에 문자열로 변환된 객체 저장
            localStorage.setItem("userinfo", JSON.stringify(userInfo));

            console.log("Successfully logged in with user ID:", userId);
          } catch (firestoreError) {
            console.error(
              "Error adding user data to Firestore:",
              firestoreError.message
            );
          }
        }
      } catch (authError) {
        console.error("Error during login:", authError.message);
      }

      // if (buttonDisabled) {
      //   const userId = uuidv4(); // uuid로 사용자 UID 생성
      //   // useMutation으로 정의한 쿼리 실행
      //   mutation.mutate({ nickname: userName, userId });
      // }
    }
  };

  // useMutation을 사용하여 데이터 추가
  //   const mutation = useMutation(async (newUserData: userI) => {
  //     // 익명 인증으로 로그인
  //     const auth = getAuth();
  //     const userCredential = await signInAnonymously(auth);
  //     const user: User | null = userCredential.user;

  //     // 로그인 후에만 닉네임 저장
  //     if (user) {
  //       // Firestore에 데이터 추가
  //       const userId = user.uid; // 사용자 UID 가져오기
  //       const docRef = await addDoc(collection(firestore, "users"), {
  //         ...newUserData,
  //         userId,
  //       });
  //       return docRef.id;
  //     }

  //     // 만약 로그인이 실패했다면, 여기에 추가적인 처리를 할 수 있습니다.
  //     throw new Error("Anonymous sign in failed");
  //   });

  //   // useMutation을 사용하여 데이터 추가

  //   const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     if (buttonDisabled) {
  //       const userId: string = uuidv4();
  //       // useMutation으로 정의한 쿼리 실행
  //       mutation.mutate({ nickname: userName, userId });
  //     }
  //   };

  return (
    <Container>
      <Card>
        <Title>닉네임 작성 해달라능</Title>
        <InputBox onSubmit={onSubmit}>
          <Input
            type="text"
            maxLength={5}
            value={userName}
            onChange={onChangeUserName}
            placeholder="닉네임을 입력해주세요."
          />
          <Button disabledcheck={buttonDisabled.toString()}>제출</Button>
        </InputBox>
        <About>
          <p>닉네임의 경우 선택사항입니다</p>
          <span>한글, 영문만 가능하며 2 ~ 5 사이로 입력해주세요</span>
        </About>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.FlexRow};
  justify-content: center;
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
`;

const Card = styled.section`
  position: relative;
  z-index: 5px;
  width: 350px;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.gray1};
  top: 30%;
  border-radius: 16px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

const Title = styled.h2`
  width: 350px;
  height: 80px;
  ${({ theme }) => theme.BoxCenter};
`;

const InputBox = styled.form`
  width: 100%;
  height: 150px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Input = styled.input`
  width: 300px;
  height: 45px;
  border-radius: 14px;
  transition: 0.3s;
  padding-left: 10px;
  border: 2px solid ${({ theme }) => theme.colors.greey};
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.lightblue};
  }
`;

const Button = styled.button<{ disabledcheck: string }>`
  width: 150px;
  height: 35px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.lightblue};
  opacity: ${(props) => (props.disabledcheck === "true" ? `1` : "0.4")};
  /* background-color: ${(props) => (props.disabled ? `blue` : "red")}; */
  /* ${({ theme }) => theme.colors.lightblue}; */
`;

const About = styled.div`
  width: 100%;
  height: 70px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  justify-content: center;
  gap: 5px;
  p {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.gray4};
  }
  span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray3};
  }
`;
