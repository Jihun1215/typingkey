# Typingkey

## Typingkey 배포 링크

🗓[지금 바로 Typingkey 방문하기](https://typingkey.store/)

## 프로젝트 기능

### 😊 다크 모드

> 다크 모드 적용

<details>
<summary>미리보기</summary>
  <p>
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/95469708/300266924-bbd4bc2e-fecd-49fb-ad70-9f4e4371b5c0.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240128%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240128T134506Z&X-Amz-Expires=300&X-Amz-Signature=e44415ae75753648768040779b583d5f2fef74dacfbeeaf95d8cd2c34a3b5386&X-Amz-SignedHeaders=host&actor_id=95469708&key_id=0&repo_id=736592641" />
</p>
</details>

### ✏️ 타이핑 언어 변경

> 탭버튼을 클릭 하여 타이핑 할 언어를 변경 할 수 있습니다.

<details>
<summary>미리보기</summary>
  <p>
  <img src="https://github.com/Jihun1215/typingkey/assets/95469708/434f21f0-827b-4619-872c-d34a1cefa4fb">
</p>
</details>

### 💯 타이핑 스피드 & 시간 & 진행도 & 진행된 문장 수

> UI를 사용자에게 더 친숙한 퍼센트지를 사용하였습니다.

<details>  
<summary>미리보기</summary>
  <div>
    <img src="https://github.com/Jihun1215/typingkey/assets/95469708/0740dc27-7c24-4708-97d5-aa4f5bdcfbe1"/>
  </div>
</details>

## 적용 기술

### ◻ HTTPS

> 신뢰성, SEO, 브라우저, 보안 측면에서 사용자에게 안전한 환경을 제공하기 때문에 적용하였습니다.

### ◻ CI/CD

> 빌드와 배포를 효율적으로 하기 위해 CI/CD를 구축했습니다

## 🚨 Trouble Shooting


<details>
  <summary>타이핑 마지막 글자가 한글로 끝날 시 다음 input Value의 마지막글자가 남는 오류</summary>

  <br/>

시도

- 최초에는 onKeyDown 이벤트 대신 onKeyPress 이벤트를 사용하여 문제를 해결했다. 하지만 MDN 에서onKeyPress 방식을 지양하지 않기 때문에 onKeyDown을 사용해서 해결해야했다.

해결

- 기존 코드에서 로직부분을 함수로 만들어서 분리하여 사용

</details>

## 🌐 배포 Architecture

<div>
 <img src ="https://github.com/Jihun1215/typingkey/assets/95469708/9bb5832b-7566-448b-a85a-15c3995ce4eb">
</div>

### 감사합니다.
