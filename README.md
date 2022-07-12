# 무한 스크롤 페이지
> 과제 리터칭 (express.js -> next.js+react.js)

## #0. 환경
- ```create-next-app --example with-typescript```
- ```add styled-components```
  - ```create-next-app --example with-styled-components``` 로 대체 가능
- ```add eslint && add eslint-config-next```

## #1. 목표
- 사용자 리스트 무한 조회
- ```/api/list```
    ```bash
    queryParam = {
        page,
        size
    }
    ```

## #2. 시나리오
- 로딩 시 기본 리스트 페이지 조회
- 스크롤 시 동적 페이지 호출
- 컴포넌트 화 


## #3. TODO
1. api단 graphql 로 변경
1. static generation 처리
1. 재사용 가능하도록 컴포넌트 처리