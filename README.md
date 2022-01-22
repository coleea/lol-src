<img src="./githubFile/logo.png" height="100px"></img>

# 리그오브레젠드 전적검색 앱

creact-react-app으로 제작된 리그오브레젠드 전적검색 앱입니다\
`https://lol.devkr.info`를 통해서도 이용할 수 있습니다
### 웹앱 구동환경

이 앱은 다음의 환경에서 정상작동이 확인되었습니다\
\
OS : Windows 10\
웹브라우저 : 데스크탑용 크롬 버전 97.0.4692.71 및 MS Edge 버전 97.0.1072.62에서 정상작동 확인\
\
OS : Ubuntu 20\
웹브라우저 : 파이어폭스에서 정상작동 확인

---

### node.js에서 구동하기

이 앱을 node.js에서 구동하려면 node.js 버전 `16.13.1`이 필요합니다\
npm을 쓰는경우 커맨드라인에서 `npm i` 입력후 `npm run dev`를 입력한다\
또는 `npm i` 입력후 `npm run d`를 입력한다\
\
yarn을 쓰는경우 커맨드라인에서 `yarn 입력후` `yarn dev`를 입력한다\
또는 `yarn` 입력후 `yarn d`를 입력한다

---

# TODO

## 버그
1. 오토컴플리트를 클릭을 했을시에 히스토리에 반영되지 않음

---

## 리팩토링 

1. 헤더 jsx 리팩토링할것
    1. 컴포넌트를 더욱 세분화할것
    1. jsx내부에 삽입되는 변수는 최대한으로 심플하게 만들것. 미리 컴퓨테이션을 끝내놓을 것
    1. scss를 계층화하여 작성할것
    1. useState에 종속적인 변수는 스테이트로 만들지 말것(중요)

1. SASS 코드 계층적으로 리팩토링하기
1. 이미지에 alt 추가할것

## 없는 기능 구현


1. [API문제] UserMain Summary - "솔로게임" 카테고리 클릭시 데이터 필터링하기
1. [API문제] Header - 검색창 입력시 autocomplete json 리퀘스트 요청하기
1. [API문제] SideBar Summary - "탑 (총 27게임)" 부분에 들어갈 데이터 찾기
1. [API문제] SideBar Champion - 분당 CS 데이터를 어디에서 받아오는지 확인할 것

1. [DONE] Header - 검색창 클릭시 히스토리 나오게끔 수정
1. [DONE] SideBar Champion- "7일간 챔피언 승률"을 클릭시에 새로운 챔피언 리스트 렌더링하기
1. [DONE] SideBar Champion - 챔피언 승률 요약 화면 그리기
1. [DONE] UserMain Summary - svg기반의 원형 그래프 구현
1. [DONE] GameDetail - 아이템 호버링시 tooltip 구현하기
1. [DONE] GameDetail - 날짜(하루전)을 제대로 구현하기
1. [DONE] SideBar Champion - 챔피언 정렬하여 화면에 뿌려주기

---

## UI 구현

1. header - 최근검색 스타일링
1. GameDetail - 아이템 바구니 아이콘을 LOSE사이드도 별도로 그릴것
1. GameDetail - 챔피언 영어명을 한글로 맵핑하기
1. GameDetail - 팀원 정보에서 창 칸을 넘어가는 경우 ...로 표기하기

1. [DONE] UserMain Summary - "선호 포지션"란에서 포지션 아이콘을 구해올것
1. [DONE] GameDetail - "더블킬, 트리플킷"을 이미지화하고 "ACE"도 이미지화하기
1. [DONE] GameDetail - 룬 이미지 삽입하기
1. [DONE] GameDetail - 아이템 리스트에서 empty item을 그리기

---

## 버그

1. [DONE] Main-GameSummary - 챔피언 정보가 없습니다.가 챔피언 3개 초과해도 보이는 에러가 발생함
1. [done] header - 안눌리는 유저네임이 존재함. (z-index가 낮기 때문이었음)
1. [done] 재랜더링하면 d3를 초기화하고 다시 그릴것
1. [done] d3에 [10,10]이 들어가면 에러가 나는현상 수정
1. [DONE]header - 최근검색에서 유저네임을 두번 눌러야 검색되는 에러 수정할것
   -> react onblur interfere onclick. onClick을 onMouseClick으로 대체할것
1. [DONE] GameDetail - KDA에 NaN이라고 나올때 있음. (아마도 death가 0일때 0으로 나눠서 그런듯)
    - 대회에서 KDA가 무한대 즉, 세트 단위로 퍼펙트를 기록하게 되면 해당 경기의 KDA는 (킬 + 어시스트)*1.2로 계산해 표기한다.
    (출처 : https://namu.wiki/w/%EB%A6%AC%EA%B7%B8%20%EC%98%A4%EB%B8%8C%20%EB%A0%88%EC%A0%84%EB%93%9C/%EC%8A%A4%EC%BD%94%EC%96%B4#fn-1)
1. [DONE] UserMain Summary - "선호 포지션"란에서 포지션 아이콘이 렌더링되지 않는 경우 발생