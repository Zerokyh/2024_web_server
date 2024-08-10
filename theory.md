Web Server[근본]

- Java : JSP + Spring + DB[MySQL, Oracle] + Andriod [2000~2015]

- 전통적인 웹 아키텍쳐(서버몰빵) : 클라이언트 + 찐서버 + 데이터베이스

- RESTFUL API 웹 아키텍쳐
- 클라이언트[React/Angular/Vue] + 찐서버[Java(Springboot)/Python(Django)/JS(express/Nest)]

- 1. res.send() [서버 사이트 랜더링 SSR]

  - UI / UX -> 바로 데이터 보여줌
  - 서버에서 랜더링해서 보내줌

- 2. res.json() [클라이언트 랜더링 CSR]

  - UI / UX -> Loading
  - html에서 js 실행해서 서버에 json을 얻고 클라이언트에서 랜더링해줌
  - 장점 : 코드 유지 보수 개쉬움
  - 단점 : 로딩중, 구글/네이버 이 홈페이지가 뭔지 모름 -> Next.js

  - Next.js : React + SSR

React - import[JS가 Browser에서 돌아감]

JS가 브라우저에서 돌아갈 때는 Import
JS가 외부환경에서 돌아갈 때는 Require
