# AORR 상태 머신 설계

이 문서는 `newrest.github.io`를 GitHub Pages에서 동작하는 정적 개인 프로페셔널 웹사이트로 만들기 위한 실행 가능한 AORR 상태 머신이다.

대상 결과물은 HTML, CSS, JavaScript만으로 동작해야 하며, 루트 디렉토리에 최소 다음 파일이 존재해야 한다.

- `index.html`
- `styles.css`
- `script.js`
- 게임 구현에 필요한 추가 JavaScript 파일 또는 `script.js` 내부 게임 코드

백엔드 서버는 사용하지 않는다.

## 1) Target

### 프로페셔널 웹사이트 개발 목표

- 개인 프로페셔널 웹사이트를 정적 사이트로 구현한다.
- 데스크톱과 모바일에서 모두 읽기 쉽고 조작 가능해야 한다.
- 소개, 경력, 프로젝트, 연락 정보 같은 개인 소개 콘텐츠를 담는다.
- 상단 내비게이션에서 주요 섹션과 Games 탭으로 이동할 수 있어야 한다.

### GitHub Pages 배포 목표

- GitHub Pages에서 별도 서버 없이 정적 파일만으로 배포 가능해야 한다.
- 상대 경로와 정적 자원 참조가 GitHub Pages 경로 규칙에 맞아야 한다.
- 외부 런타임 의존성 없이 브라우저에서 직접 열려야 한다.

### 입력 자료

- 저장소의 기존 파일과 디렉토리 구조
- `README.md`
- 개인 소개 콘텐츠
- 프로젝트 목록
- 경력/이력 요약
- 연락처 정보
- Games 탭과 지렁이 게임 요구사항
- Step 1 문서 또는 요구사항 메모

### 필수 페이지와 섹션

- 홈 또는 소개 섹션
- About 또는 프로필 섹션
- Skills 또는 강점 섹션
- Projects 또는 프로젝트 섹션
- Contact 또는 연락 섹션
- Games 섹션 또는 Games 페이지

### Games 탭 및 지렁이 게임 요구사항

- 상단에 Games 탭이 있어야 한다.
- Games 탭은 지렁이 게임으로 이동하거나 해당 섹션을 열어야 한다.
- 게임은 키보드 입력으로 조작 가능해야 한다.
- 게임은 모바일 터치 조작으로도 가능해야 한다.
- 점수, 재시작, 게임 오버 상태가 확인 가능해야 한다.
- 브라우저에서 정적으로 실행되어야 한다.
- [게임 추가 기능:] Step 1에 추가 기능이 명시되어 있다면 해당 기능을 게임 루프에 포함한다. 현재 확인된 입력에는 해당 항목이 없으므로 [사람 확인 필요].

### 데스크톱 및 모바일 완료 기준

- 320px 폭에서 가로 스크롤이 없어야 한다.
- 768px 부근에서 레이아웃이 무너지지 않아야 한다.
- 데스크톱에서 섹션과 게임이 자연스럽게 읽혀야 한다.
- 모바일에서 네비게이션과 게임 조작이 손가락으로 가능해야 한다.
- 브라우저 콘솔에 오류가 없어야 한다.

## 2) Act

### 한 번의 개발 루프에서 수행할 최소 작업

- 하나의 실패 원인만 고친다.
- 관련된 최소 파일만 수정한다.
- 변경한 기능에 대해 같은 Verifier를 다시 실행한다.
- 기존에 통과한 기능에 대한 회귀 확인을 포함한다.

### 수정 가능한 파일 범위

- `index.html`
- `styles.css`
- `script.js`
- 게임 분리 파일이 있을 경우 해당 게임 JavaScript 파일
- 정적 자원 파일

### 생성할 수 있는 파일

- `index.html`
- `styles.css`
- `script.js`
- `game.js` 또는 `snake.js` 같은 게임 전용 파일
- 이미지, 아이콘, 폰트 같은 정적 자원 파일
- 필요할 때만 보조 문서 파일

### 실행 가능한 로컬 검증 명령어

- `python -m http.server 8000`
- `node --check script.js` [사람 확인 필요: Node.js가 설치되어 있을 때만]
- `git diff --check`
- 브라우저에서 `http://localhost:8000` 열기
- 브라우저 개발자 도구 콘솔 확인

## 3) Observe

### 확인 항목

- 파일 생성 여부
- HTML, CSS, JavaScript 오류
- 로컬 웹서버 응답
- 브라우저 콘솔 오류
- 데스크톱 화면
- 모바일 화면
- 키보드 게임 조작
- 터치 게임 조작
- GitHub Pages 호환성

### 관찰 방법

- 파일 존재 여부는 파일 시스템에서 확인한다.
- HTML 구조는 브라우저 렌더링과 화면 레이아웃으로 확인한다.
- CSS 오류는 화면 깨짐, overflow, 잘린 텍스트로 확인한다.
- JavaScript 오류는 콘솔과 동작 실패로 확인한다.
- 게임 입력은 실제 키보드와 모바일 터치로 확인한다.
- GitHub Pages 호환성은 상대 경로, 정적 파일 의존성, 서버 불필요 여부로 확인한다.

## 4) Reason

실패 원인은 다음 분류 중 하나로만 태깅한다.

| 분류 | 의미 | 대표 증상 |
|---|---|---|
| `HTML_STRUCTURE` | HTML 구조 문제 | 잘못된 계층, 깨진 내비게이션, 누락된 섹션 |
| `CSS_RESPONSIVE` | 반응형 스타일 문제 | 작은 화면에서 overflow, 겹침, 잘림 |
| `JAVASCRIPT` | 일반 JS 오류 | 콘솔 에러, 이벤트 미동작, 런타임 예외 |
| `GAME_LOGIC` | 게임 규칙 문제 | 먹이/충돌/점수/종료 로직 오류 |
| `GAME_CONTROL` | 입력 제어 문제 | 키보드, 터치, 버튼 반응 이상 |
| `CONTENT` | 콘텐츠 문제 | 소개, 프로젝트, 문구, 링크 품질 문제 |
| `TEST` | 검증 절차 문제 | 테스트 누락, 잘못된 verifier, 회귀 미확인 |
| `ENVIRONMENT` | 환경 문제 | 로컬 서버, 브라우저, 도구, OS 차이 |
| `GITHUB_PERMISSION` | 저장소 권한 문제 | clone, push, Pages 설정 접근 실패 |
| `DEPLOYMENT` | 배포 문제 | GitHub Pages 반영 실패, 경로 문제 |
| `UNKNOWN` | 원인 불명 | 증상 재현은 되지만 원인이 불명확 |

## 5) Repeat

- 한 번에 하나의 실패 원인만 수정한다.
- 관련된 최소 파일만 변경한다.
- 수정 후 동일한 Verifier를 다시 실행한다.
- 기존에 통과한 기능은 회귀 테스트로 다시 확인한다.
- 같은 증상이 반복되면 fingerprint를 기록한다.
- 동일한 오류 fingerprint가 2회 반복되면 즉시 중단하고 원인을 재분류한다.

## 6) Stop

다음 중 하나면 중단한다.

- 전체 테스트가 통과한 경우
- 최대 Retry에 도달한 경우
- 동일한 오류 fingerprint가 2회 반복된 경우
- 개인정보나 콘텐츠 확인이 필요한 경우
- GitHub 인증 또는 배포 권한 문제가 발생한 경우

## 7) Human-in-the-loop

다음 경우는 사람 확인이 필요하다.

- 이름, 소개, 경력, 프로젝트 등 개인 콘텐츠가 불명확한 경우
- 기존 콘텐츠 삭제가 필요한 경우
- 외부 분석 도구나 외부 서비스를 추가해야 하는 경우
- GitHub 저장소 설정을 변경해야 하는 경우
- 요구사항이 충돌하는 경우
- [사람 확인 필요] Step 1에 작성된 추가 게임 기능이 있는지 확인이 필요한 경우

## 8) 상태 정의

| 상태 | 의미 | 진입 조건 | 종료 조건 |
|---|---|---|---|
| `READY` | 다음 작업을 시작할 준비 상태 | 입력 자료가 충분하고 실패 원인이 정리됨 | `ACTING` 또는 `BLOCKED` |
| `ACTING` | 파일 수정 또는 구현 수행 중 | 최소 작업 단위가 정해짐 | `VERIFYING` |
| `VERIFYING` | Verifier 실행 중 | 변경이 끝남 | `PASSED`, `RETRYING`, `HITL_REQUIRED` |
| `RETRYING` | 실패 원인 하나를 수정하는 재시도 상태 | 동일 루프에서 검증 실패 | `ACTING` 또는 `BLOCKED` |
| `PASSED` | 해당 루프의 검증이 통과 | 로컬 검증이 성공 | 다음 루프의 `READY` 또는 `DEPLOY_READY` |
| `DEPLOY_READY` | 배포 가능한 최종 검증 완료 | 전체 정적 사이트가 통과 | `DEPLOYING` |
| `DEPLOYING` | GitHub Pages 반영 중 | 배포 승인 및 권한 확보 | `DEPLOYED`, `BLOCKED` |
| `DEPLOYED` | GitHub Pages에 반영 완료 | 배포 성공 | 종료 또는 유지보수 루프 |
| `BLOCKED` | 현재 루프를 진행할 수 없음 | 환경, 권한, 충돌, 정보 부족 | `HITL_REQUIRED` 또는 종료 |
| `HITL_REQUIRED` | 사람 결정을 기다림 | 불확실한 콘텐츠/권한/충돌 | 해소 후 `READY` |

## 9) 루프 설계표

| 단계 | 입력 | Act | Observe | 출력 | 테스트 기준 | 다음 상태 |
|---|---|---|---|---|---|---|
| 저장소 및 기존 파일 확인 | `README.md`, 파일 목록, 기존 정적 자원 | 루트 구조와 현재 파일 존재 여부를 확인한다 | 파일이 실제로 무엇만 있는지, 누락된 파일이 무엇인지 본다 | 작업 기준점과 누락 목록 | 루트 파일/디렉토리 목록이 정리됨 | `READY` |
| 정적 사이트 기본 구조 | 요구사항 고정, 사이트맵, 필수 섹션 | `index.html`의 기본 레이아웃, 헤더, 메인, 푸터 구조를 설계한다 | 구조가 한 화면에서 읽히는지 확인한다 | 접근 가능한 기본 HTML 골격 | 필수 섹션이 마크업에 존재 | `ACTING` |
| 프로페셔널 콘텐츠 영역 | 개인 소개, 경력, 프로젝트, 연락처 초안 | 각 콘텐츠 섹션의 정보 밀도와 우선순위를 배치한다 | 문장이 짧고 읽기 쉬운지 본다 | 프로필형 콘텐츠 영역 | 내용이 중복되지 않고 핵심이 선명함 | `VERIFYING` |
| 반응형 내비게이션 | 기본 구조, 콘텐츠 길이, 모바일 우선 기준 | 네비게이션 메뉴와 모바일 접힘 패턴을 만든다 | 작은 화면에서 메뉴가 겹치지 않는지 본다 | 반응형 메뉴 | 320px와 768px에서 메뉴 사용 가능 | `VERIFYING` |
| Games 탭 | 내비 구조, Games 명칭, 게임 섹션 위치 | 상단 탭에서 Games로 이동하는 링크를 만든다 | 탭 클릭 후 목적지로 이동하는지 본다 | Games 진입점 | Games 탭이 항상 보이고 동작 | `ACTING` |
| 지렁이 게임 핵심 로직 | 게임 규칙, 보드 크기, 점수, 종료 조건 | 이동, 먹이, 충돌, 리셋, 상태 전환을 구현한다 | 게임이 실제로 플레이 가능한지 본다 | 동작하는 게임 코어 | 새 게임, 이동, 먹이, 게임 오버가 모두 동작 | `VERIFYING` |
| 키보드 조작 | 게임 코어, 키 매핑 정책 | 방향키와 WASD 입력을 연결한다 | 입력 후 방향이 바뀌는지 본다 | 키보드 제어 가능 게임 | 키 입력이 게임 코어와 일관되게 연결 | `VERIFYING` |
| 모바일 터치 조작 | 게임 코어, 터치 UX, 버튼 배치 | 스와이프 또는 방향 버튼을 연결한다 | 모바일에서 오작동 없이 제어되는지 본다 | 터치 제어 가능 게임 | 터치와 키보드가 같은 명령으로 들어감 | `VERIFYING` |
| 게임 UI 및 점수 | 게임 상태, 점수 표현, 상태 문구 | 점수판, 시작, 재시작, 안내문을 배치한다 | 상태가 시각적으로 즉시 보이는지 본다 | 읽기 쉬운 게임 UI | 점수와 게임 상태가 명확히 표시 | `VERIFYING` |
| 접근성과 반응형 검증 | 완성된 UI, 포커스, 색 대비 | 시맨틱 태그, 포커스, ARIA, 대비를 다듬는다 | 데스크톱/모바일/보조기기 관점에서 확인한다 | 접근성 개선본 | 포커스 가능, 대비 충분, overflow 없음 | `VERIFYING` |
| GitHub Pages 호환성 검증 | 최종 정적 파일, 상대 경로, 외부 의존성 | Pages에서 깨질 수 있는 요소를 제거한다 | 정적 파일만으로 실행 가능한지 본다 | Pages 친화적 산출물 | 서버 없이 브라우저에서 열림 | `DEPLOY_READY` |
| 배포 | 최종 산출물, 저장소 권한, Pages 설정 | GitHub Pages에 반영한다 | 실제 배포 URL이 응답하는지 본다 | 배포 완료 상태 | Pages URL이 200 응답 | `DEPLOYED` |

## 10) 상태 머신 운용 규칙

### 기본 흐름

`READY -> ACTING -> VERIFYING -> PASSED`

### 실패 흐름

`VERIFYING -> RETRYING -> ACTING -> VERIFYING`

### 차단 흐름

`VERIFYING -> BLOCKED -> HITL_REQUIRED`

### 배포 흐름

`PASSED -> DEPLOY_READY -> DEPLOYING -> DEPLOYED`

## 11) Verifier 우선순위

1. 파일 존재 여부 확인
2. HTML 구조 확인
3. CSS 반응형 확인
4. JavaScript 구문 및 런타임 오류 확인
5. 게임 입력 확인
6. 모바일 화면 확인
7. GitHub Pages 호환성 확인

## 12) 초기 추천 루프

가장 안전한 첫 루프는 `저장소 및 기존 파일 확인`과 `정적 사이트 기본 구조`를 묶은 준비 루프다.

이유:

- 아직 최종 개인 콘텐츠가 확정되지 않았을 수 있다.
- Games 기능은 구현 범위가 커서 먼저 뼈대를 고정하는 편이 안전하다.
- GitHub Pages 호환성은 구조가 먼저 안정되어야 검증이 쉽다.

## 13) 명시적 메모

- 현재 확인된 입력 기준으로는 Step 1에 `[게임 추가 기능:]`이 존재하는지 확인되지 않았다.
- 따라서 추가 게임 기능은 [사람 확인 필요]로 둔다.
- 이 문서는 설계 전용이며, 코드 수정, 테스트 실행, 배포는 포함하지 않는다.

## 14) Self-Correcting TDD Loop

이 섹션은 정적 HTML, CSS, JavaScript 웹사이트와 지렁이 게임을 대상으로 하는 Verifier 중심 Self-Correcting TDD 루프다.

### 현재 환경에서 확인된 검증 도구

확인 완료:

- `git` 사용 가능: `C:\Program Files\Git\cmd\git.exe`
- Claude Code CLI 사용 가능: `C:\Users\ansik\.local\bin\claude.exe`
- Claude Code CLI 버전: `2.1.201 (Claude Code)`
- Claude Code CLI 인증 상태: 로그인됨

현재 PATH에서 확인되지 않음:

- `python`
- `python3`
- `py`
- `node`
- `npm`
- `npx`

따라서 이 환경에서는 `python3 -m http.server` 류의 로컬 서버 명령을 기본 검증 도구로 가정하지 않는다. 나중에 설치되면 보조 Verifier로 추가할 수 있다.

### Claude Code CLI 모델 확인 정책

- 독립 Verifier로 Claude Code CLI를 우선 사용한다.
- 모델 선택은 먼저 `sonnet` alias를 시도한다.
- 실제로 `Sonnet 5`가 사용 가능한지 확인되기 전에는 `Sonnet 5`를 확정 모델로 기록하지 않는다.
- 현재 환경에서는 `claude --print --model sonnet` 시도가 시간 초과로 끝났기 때문에, resolved full model name은 [사람 확인 필요]다.
- 따라서 현재 문서상 기록 가능한 값은 `model_alias = sonnet`, `resolved_model = [사람 확인 필요]`이다.

### Verifier 우선순위

1. 파일 존재와 연결 확인
2. HTML 구조와 링크 확인
3. CSS 반응형 확인
4. JavaScript 문법과 콘솔 오류 확인
5. 게임 조작과 상태 전환 확인
6. 로컬 정적 응답 확인
7. GitHub Pages 호환성 확인
8. Claude Code CLI 기반 독립 리뷰 확인

### Self-Correcting 루프 규칙

- 한 루프에서는 하나의 실패 원인만 고친다.
- 수정 범위는 실패 항목과 직접 연결된 최소 파일만 허용한다.
- 검증 기준은 완화하지 않는다.
- 통과한 기능은 매 Retry마다 회귀 확인한다.
- 동일 fingerprint가 2회 반복되면 즉시 중지한다.
- 환경 문제나 권한 문제는 코드 수정으로 우회하지 않는다.
- 개인 콘텐츠 불명확성은 바로 HITL로 올린다.

### 실패 로그 형식

실패가 발생하면 아래를 반드시 남긴다.

| 항목 | 내용 |
|---|---|
| 실행 명령어 | 실제 실행한 명령어 전체 |
| exit code | 명령 종료 코드 |
| 실패한 검증 항목 | 어떤 Verifier가 실패했는지 |
| 핵심 오류 메시지 | 가장 중요한 에러 문구 |
| 관련 파일과 라인 | 파일 경로와 라인 정보 |
| 브라우저 콘솔 메시지 | 콘솔에서 확인된 메시지 |
| 오류 fingerprint | 같은 문제를 식별할 고유 요약 |

### Failure Reason 분류 재사용

Self-Correcting TDD 루프의 실패 원인 분류는 기존 AORR의 Reason 분류를 그대로 재사용한다.

- `HTML_STRUCTURE`
- `CSS_RESPONSIVE`
- `JAVASCRIPT`
- `GAME_LOGIC`
- `GAME_CONTROL`
- `CONTENT`
- `TEST`
- `ENVIRONMENT`
- `GITHUB_PERMISSION`
- `DEPLOYMENT`
- `UNKNOWN`

### 루프 상태 머신

| 상태 | 의미 | 진입 조건 | 종료 조건 | 다음 상태 |
|---|---|---|---|---|
| `READY` | 검증을 시작할 준비 | 입력과 기준이 확보됨 | 첫 Verifier 실행 | `VERIFYING` |
| `VERIFYING` | Verifier 수행 중 | 정적 검증 또는 브라우저 검증 실행 | 성공 또는 실패 판정 | `PASS`, `RETRY`, `HITL_REQUIRED`, `BLOCKED` |
| `PASS` | 현재 범위 통과 | 실패 없음 | 다음 범위 선택 | `READY` 또는 `DEPLOY_READY` |
| `RETRY` | 하나의 원인만 수정 | 실패 원인 분류 완료 | 최소 수정 후 재검증 | `VERIFYING` |
| `DEPLOY_READY` | 배포 전 최종 통과 | 전체 검증이 성공 | 배포 승인 | `DEPLOYING` |
| `DEPLOYING` | Pages 반영 중 | 배포 권한과 절차 확보 | 배포 결과 확인 | `DEPLOYED`, `BLOCKED` |
| `DEPLOYED` | 배포 완료 | Pages URL 확인됨 | 유지보수 전환 | 종료 또는 다음 유지보수 루프 |
| `BLOCKED` | 기계적 재시도로 해결 불가 | 환경/권한/도구 문제 | 사람 판단 요청 | `HITL_REQUIRED` |
| `HITL_REQUIRED` | 사람 확인 대기 | 콘텐츠, 권한, 충돌, 불명확성 | 입력 수령 후 재개 | `READY` |

### Verifier 중심 단계 설계

| 단계 | 입력 | Verifier | Observe | 실패 fingerprint 예시 | 최소 수정 원칙 | 다음 상태 |
|---|---|---|---|---|---|---|
| 저장소 및 기존 파일 확인 | `README.md`, `AORR.md`, 현재 파일 목록 | `git status`, `rg --files` | 루트에 무엇이 존재하는지 | `missing-root-file:index.html` | 누락 여부만 기록하고 수정은 별도 루프로 이동 | `READY` |
| 기본 파일 검증 | 루트 파일 목록, HTML 진입점 | Claude Code CLI 독립 리뷰, 파일 존재 확인 | `index.html`, `styles.css`, `script.js` 존재 여부 | `missing-css-link`, `missing-script-link`, `absolute-local-path` | 링크와 경로만 고친다 | `VERIFYING` |
| HTML 검증 | `index.html` | Claude Code CLI HTML 리뷰 + 브라우저 렌더 리뷰 | title, meta viewport, semantic tag, nav, Games 영역, alt, internal link | `html-missing-semantic-nav`, `broken-internal-link` | HTML만 수정한다 | `VERIFYING` |
| CSS 검증 | `styles.css`와 화면 캡처 | 브라우저 viewport 확인 + Claude Code CSS 리뷰 | desktop, tablet, mobile, horizontal scroll, nav responsive | `overflow-x-on-mobile`, `games-ui-wrap-break` | CSS만 수정한다 | `VERIFYING` |
| JavaScript 검증 | `script.js` 및 게임 파일 | Claude Code JS 리뷰, 브라우저 콘솔 확인 | syntax error, null ref, duplicate listener, load-time error | `js-null-ref`, `duplicate-listener`, `load-handler-crash` | JS만 수정한다 | `VERIFYING` |
| 지렁이 게임 검증 | 게임 코드, UI | 브라우저 조작 검증, 독립 리뷰 | start, pause, restart, score, food, collision, control, no double-run | `game-no-score`, `game-reverse-turn`, `games-tab-double-init` | 게임 최소 부분만 수정한다 | `VERIFYING` |
| 로컬 실행 검증 | 정적 파일 전체 | 가능할 때만 로컬 서버 + HTTP 확인 | `index.html`, CSS, JS 응답 | `local-server-unavailable`, `http-404`, `mime-mismatch` | 환경이 아니라 코드에서 해결 가능한 경우만 수정 | `VERIFYING` |
| 브라우저 검증 | 실제 브라우저와 viewport | 브라우저 수동 검증 또는 자동화 가능 시 추가 검증 | 375px, 768px, 1440px | `mobile-layout-break`, `tablet-nav-overlap` | 화면별로 가장 작은 수정만 적용 | `VERIFYING` |
| GitHub Pages 호환성 | 최종 정적 산출물 | Claude Code CLI 리뷰 + 경로 점검 | root index, relative path, no backend/local FS dependency | `pages-root-mismatch`, `pages-absolute-path` | Pages 호환성 관련 파일만 수정 | `DEPLOY_READY` |

### 기본 검증 항목별 Verifier

#### 1. 기본 파일 검증

- `rg --files`
- Claude Code CLI 독립 리뷰
- `git diff --check`

검증 포인트:

- 루트에 `index.html`이 있는가
- `styles.css`와 `script.js`가 연결되어 있는가
- 잘못된 로컬 파일 경로가 없는가
- 대소문자 불일치가 없는가
- GitHub Pages에서 사용할 수 없는 절대 로컬 경로가 없는가

#### 2. HTML 검증

- Claude Code CLI HTML 리뷰
- 브라우저 렌더링 확인

검증 포인트:

- 기본 문서 구조가 있는가
- `title`, `meta viewport`가 있는가
- 시맨틱 태그가 있는가
- 내비게이션 링크가 살아 있는가
- Games 영역이 있는가
- 이미지에 `alt`가 있는가
- 깨진 내부 링크가 없는가

#### 3. CSS 검증

- Claude Code CLI CSS 리뷰
- 브라우저 viewport 확인

검증 포인트:

- 데스크톱 화면이 유지되는가
- 태블릿 화면이 유지되는가
- 모바일 화면이 유지되는가
- 가로 스크롤이 발생하지 않는가
- 내비게이션과 Games UI가 반응형으로 동작하는가

#### 4. JavaScript 검증

- Claude Code CLI JS 리뷰
- 브라우저 콘솔 확인

검증 포인트:

- 문법 오류가 없는가
- 브라우저 콘솔 오류가 없는가
- DOM 요소 null 참조가 없는가
- 중복 이벤트 리스너가 없는가
- 페이지 로드 시 오류가 없는가

#### 5. 지렁이 게임 검증

- 브라우저 실제 조작
- Claude Code CLI 독립 리뷰

검증 포인트:

- 게임 시작이 되는가
- 일시정지가 되는가
- 다시 시작이 되는가
- 점수가 증가하는가
- 음식이 생성되는가
- 벽 또는 자기 몸 충돌이 되는가
- 키보드 방향키 또는 WASD가 동작하는가
- 모바일 버튼 또는 터치가 동작하는가
- 반대 방향 즉시 전환이 방지되는가
- Games 탭을 다시 열었을 때 중복 실행이 없는가

### Retry 정책

- 하나의 오류에 대해 최대 3회 시도한다.
- 동일 fingerprint가 2회 반복되면 즉시 중지한다.
- 각 Retry에는 가설, 변경 파일, 실행 명령어, 결과를 기록한다.
- 환경 또는 권한 문제는 코드 수정으로 해결하지 않는다.

### 배포 전 최종 Gate

배포 직전에는 다음이 모두 통과해야 한다.

- 기본 파일 검증
- HTML 검증
- CSS 검증
- JavaScript 검증
- 지렁이 게임 검증
- GitHub Pages 호환성 검증
- `git diff --check`

### 현재 프로젝트에 대한 적용 메모

- 현재 저장소 구조는 매우 단순하며 루트에는 `README.md`와 `AORR.md`만 존재한다.
- 따라서 첫 Self-Correcting TDD 루프는 새 기능 수정이 아니라 검증 기준과 실패 fingerprint를 고정하는 준비 루프가 된다.
- `python`, `python3`, `py`, `node`, `npm`, `npx`는 현재 환경에서 PATH에 없다.
- 독립 Verifier로 쓸 수 있는 CLI는 `git`과 Claude Code CLI다.
- Claude Code CLI는 로그인되어 있지만, `Sonnet 5` 여부는 아직 확정되지 않았다.
- `claude --print --model sonnet` 호출은 시간 초과로 끝났으므로 resolved full model name은 [사람 확인 필요]다.

## 15) Change Request Loop Plan

This project now treats user edits as structured change requests instead of ad-hoc edits.

### Change Request Flow

| Step | Purpose | Output |
|---|---|---|
| Intake | Capture the user's exact requested modification | A structured change request record |
| Classify | Determine whether the request is bug fix, content edit, UI/UX change, deployment, or another category | Stable category and risk tag |
| Plan | Identify the minimum safe set of files and verifiers | A small implementation plan |
| Act | Change only the files required for the current change item | Updated source files |
| Observe | Verify the visible result, regressions, and deployment compatibility | Pass/fail evidence |
| Reason | Classify failures using the shared reason taxonomy | One failure reason per retry |
| Repeat | Fix one cause at a time with the same verifier | Controlled retry loop |
| Stop | Stop on pass, repeated fingerprint, or HITL condition | Final state |

### Change Request Files

- `CHANGE_REQUEST.md` stores structured request intake and change items.
- `AORR.md` stores the loop model, verifier policy, and state machine.
- `MEMORY.md` stores the project state, latest commit, latest deployment, and loop history.

### Current Operating Rule

- Do not widen the scope of a change request just because a user asked for one visible tweak.
- Preserve the existing site structure unless the request explicitly requires structural changes.
- When a request is ambiguous, record it as `[사람 확인 필요]` and keep the current behavior intact.
