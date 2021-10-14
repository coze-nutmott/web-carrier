## 🚀 Quick start

0.  **최소 버전 확인**

    이 프로젝트는 npm workspace 를 사용합니다. 따라서 npm v7 이상을 설치해주세요

1.  **패키지 설치하기**

    root 디렉토리에서 아래 명령어 실행

    ```shell
    npm i
    ```

2.  **개발 환경 실행하기**

    todo workspace 는 root 디렉토리에서 아래 명령어 실행

    ```shell
    npm start -w=todo
    ```

## todo 프로젝트

todo 프로젝트는 예제를 위해 만들었습니다

`주요 포인트` 로 전체 검색을 하시면 도움이 되는 부분을 중점적으로 확인할 수 있습니다.

### 새로운 프로젝트 만드는 과정

0.  **todo 를 복사**

    todo 폴더 전체를 복사해서 packages 밑에 넣습니다. 불필요한 코드는 삭제합니다.

1.  **package 설정**

    root 디렉토리의 package.json 에 workspaces 속성이 있습니다. 새로 만든 프로젝트를 추가하고 `npm i` 를 실행합니다.
