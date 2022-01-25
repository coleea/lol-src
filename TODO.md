# TODO

1. 주의 user summary에서 kda 카테고리의 괄호는 승률이 아님. 킬관여율이다
    1. 킬관여율 평균은 match 정보의 킬관여율을 평균내서 구할것
1. 이미지에 alt 추가할것

1. [DONE] React Router로 http://localhost:3000/user/:유저네임 경로 구현할것
1. [DONE] user detail game info CSS 리팩토링하기
1. [DONE] user game summary CSS 리팩토링하기
1. [DONE] user summary js파일 리팩토링할것
1. [DONE] JS로직 - usermain summary - champion별 kda에 따라서 색깔 다르게 표기하기
1. [DONE] 즐겨찾기 목록에서 중복이 제거되지 않음
1. [DONE] 일부 요소들에서 즐겨찾기 클릭시 반응이 없음. 
1. [DONE] JS로직 - header - 오토컴플리트를 클릭을 했을시에 히스토리에 반영되지 않음
1. [DONE] header - 오토컴플리트를 css를 수정할것
1. [DONE] usermain detail - 트리플킬 뱃지와 에이스 뱃지를 가로로 정렬할것
1. [DONE] usermain summary - 선호포지션 승률에 띄어쓰기 할것
1. [DONE] usermain summary - KDA 괄호표기를 띄어쓰기할것
1. [DONE] 평점 6 이상일 때 css 수정할 것
1. [DONE] 승률 60% 이상일 때 css 수정할 것

## 리팩토링 

1. [DONE] 헤더 jsx 리팩토링할것
1. [DONE] SASS 코드 계층적으로 리팩토링하기

## 없는 기능 구현

1. [API문제] SideBar Champion - 분당 CS 데이터를 어디에서 받아오는지 확인할 것
1. [DONE] Usermain - 솔로게임 & 자유랭크 클릭시 필터링 구현하기
1. [DONE] Header - 검색창 클릭시 히스토리 나오게끔 수정
1. [DONE] SideBar Champion- "7일간 챔피언 승률"을 클릭시에 새로운 챔피언 리스트 렌더링하기
1. [DONE] SideBar Champion - 챔피언 승률 요약 화면 그리기
1. [DONE] UserMain Summary - svg기반의 원형 그래프 구현
1. [DONE] GameDetail - 아이템 호버링시 tooltip 구현하기
1. [DONE] GameDetail - 날짜(하루전)을 제대로 구현하기
1. [DONE] SideBar Champion - 챔피언 정렬하여 화면에 뿌려주기
1. [DONE] UserMain Summary - "솔로게임" 카테고리 클릭시 데이터 필터링하기
1. [DONE] Header - 검색창 입력시 autocomplete json 리퀘스트 요청하기
1. [DONE] SideBar Summary - "탑 (총 27게임)" 부분에 들어갈 데이터 찾기
---

## UI 구현

1. [DONE] header - 최근검색 스타일링
1. [DONE] GameDetail - 아이템 바구니 아이콘을 LOSE사이드도 별도로 그릴것
1. [DONE] GameDetail - 챔피언 영어명을 한글로 맵핑하기
1. [DONE] GameDetail - 팀원 정보에서 창 칸을 넘어가는 경우 ...로 표기하기
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

