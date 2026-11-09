# CLAUDE.md

## 프로젝트 개요

NWBW(No Way But Way) iOS/Apple Watch 트레일 러닝 네비게이션 앱의 공식 웹사이트.
GitHub Pages로 배포되는 정적 HTML/CSS 사이트.

## 기술 스택

- **HTML5 + CSS3** (순수 정적 사이트, 스크린샷 캐러셀 `carousel.js`, 모션 그래픽 `motion.js`/`motion.css`)
- **Google Fonts**: Outfit (300, 400, 600, 700, 800)
- **빌드 도구 없음**: 패키지 매니저, 번들러, CI/CD 파이프라인 없음
- **배포**: GitHub Pages (정적 파일 직접 서빙)

## 파일 구조

```
├── index.html          # 메인 랜딩 페이지 (앱 소개, 기능, 사용 방법) - 한국어
├── privacy.html        # 개인정보 처리방침 - 한국어
├── support.html        # 고객 지원 및 FAQ - 한국어
├── carousel.js         # 스크린샷 캐러셀 (한/영 공용, <html lang>으로 aria-label 언어 결정)
├── motion.css          # 모션 그래픽 스타일 (index 한/영 공용)
├── motion.js           # 모션 그래픽 동작 (index 한/영 공용)
├── assets/             # 로고·스크린샷 (한국어 스크린샷, 언어 무관 이미지)
│   └── en/             # 영어 앱 화면 스크린샷 (en/index.html 전용)
└── en/                 # 영어 페이지 (한국어 페이지와 1:1 대응)
    ├── index.html
    ├── privacy.html
    └── support.html
```

## 디자인 시스템

### CSS 변수 (다크 테마)

```css
--primary: #FF5722       /* Deep Orange - CTA, 강조 */
--primary-dark: #E64A19  /* 호버 상태 */
--dark: #1A1A1A          /* 다크 배경 */
--darker: #0D0D0D        /* 메인 배경 */
--light: #FAFAFA         /* 텍스트 */
--gray: #888888          /* 보조 텍스트 */
```

### 모션 그래픽 (index 전용, 2026-11)

- **히어로 장면** `.hero-scene`: 등고선(천천히 회전), 일출 빛, 산 능선 3겹(스크롤 패럴랙스, `--depth`), 안개, 정상까지
  저절로 그려지는 트레일 + 반복해서 오르는 러너, 정상 깃발, 내비 칩 3개(직진·오르막 200m 전·CP 급수).
  히어로 아래에 풍경 자리를 `padding-bottom`으로 확보한다. 도형 좌표는 SVG path로 마크업에 들어 있다.
- **코스 여정** `.journey`(`data-journey`): 스크롤 고정(sticky) 장면. 스크롤 진행률로 러너가 고도 프로필을 달리고,
  `.jcard`의 `data-at`(0~1) 지점마다 카드가 바뀐다. 거리·고도·누적 상승은 프로필에서 계산(`data-total-km`).
  카드 숫자(총 상승 1,297m, 정상 1,403m, 남은 상승 229m)는 이 계산과 맞춰 두었으니 프로필을 바꾸면 같이 고친다.
- **등장 효과**: 기능 카드·사용 방법·마무리 섹션에 JS가 `.reveal` 클래스를 붙여 페이드업.
- `prefers-reduced-motion`이면 모든 움직임을 끄고 최종 상태(여정 카드 전체 목록)로 보여준다.
- 한/영 마크업은 같은 구조. 문구만 다르니 한쪽을 고치면 다른 쪽도 같이 고친다.

### 레이아웃

- 최대 너비: index 1200px / 콘텐츠 페이지 800px
- 반응형 브레이크포인트: 768px (모바일에서 네비게이션 숨김)
- 그리드: `auto-fit minmax(280px, 1fr)` (features), `auto-fit minmax(220px, 1fr)` (tips)

## 주요 외부 링크

- **App Store (한국어)**: `https://apps.apple.com/kr/app/nwbw-running-navigator/id6758130832`
- **App Store (영어)**: `https://apps.apple.com/us/app/nwbw/id6758130832`
- **문의 이메일**: `info@codestove.io`

## 언어

한국어(ko)가 기본, 영어(en)는 `en/` 폴더에 같은 구조로 존재한다 (앱 0.3.7부터 영어 UI 지원).

- **두 언어 동시 수정 원칙**: 문구·기능 카드·FAQ·스타일·헤더/푸터를 바꿀 때는 한국어 페이지와 `en/` 페이지를 반드시 함께 수정한다.
  CSS(`<style>`)와 HTML 구조·클래스·ID는 두 언어가 동일해야 한다.
- **영어 용어**: 앱의 영어 UI 표기를 따른다 (Courses, Records, Settings, Free Run, Navigation, Map, Elevation, Stats, Laps,
  Controls, Backtrack, Sunset warning, Auto-Pause, Target Pace, Companion Mode, Live Tracking, Mark Lap, Run Assist,
  GPS Mode: High Accuracy / Balanced / Battery Saver, Apple Health).
- **경로**: `en/` 페이지는 `../assets/...`, `../carousel.js`, `../motion.css`, `../motion.js`를 쓰고, 영어 페이지끼리는 같은 폴더 상대 경로(`privacy.html`)로 연결한다.
- **언어 전환**: 모든 페이지 헤더의 `.lang-switch`("한국어 | English")가 상대 언어의 같은 페이지로 연결된다.
  `.nav-links`는 768px 이하에서 숨겨지므로 `.lang-switch`는 `.nav-links` 밖(`.nav-right` 안)에 둔다.
- **hreflang**: 6개 페이지 모두 `<link rel="alternate" hreflang="ko|en|x-default">`를 절대 URL
  (`https://shine-codestove.github.io/nwbw-site/...`)로 가진다. x-default는 한국어 페이지. 새 페이지 추가 시 함께 넣는다.
- **App Store 링크**: 한국어 페이지는 `apps.apple.com/kr/...`, 영어 페이지는 `https://apps.apple.com/us/app/nwbw/id6758130832`.
- **스크린샷**: 영어 페이지는 `../assets/en/`의 영어 앱 화면을 쓴다(iPhone 1320×2868, 워치 422×514, 시뮬레이터 데모 데이터로 캡처). 한국어 시스템 화면(파일 앱 GPX 가져오기, 건강 권한)과 중복 경로 이탈 알림은 영어 페이지에서 뺐다. 스플래시(`스크린샷_1.png`), Strava 인증(`스크린샷_10.PNG`), 워치 지도(`워치_10.PNG`)는 언어 무관이라 공용으로 쓴다. 원본은 앱 저장소 `appstore-screenshots/en/`.
- **개인정보 처리방침**: 법적 문서이므로 한국어 원문을 바꾸면 영어 번역도 빠짐없이 같은 내용으로 갱신한다.

## 작업 시 유의사항

- 6개 HTML 파일(한국어 3 + `en/` 3) 모두에 CSS가 `<style>` 태그로 인라인 포함됨 (공통 CSS 파일 없음)
- 스타일 변경 시 각 파일의 공통 부분(헤더, 푸터, 색상 변수 등)을 모두 동기화해야 함
- 동적 기능은 `carousel.js`처럼 별도 JS 파일로 추가 (한/영 공용이면 `<html lang>`으로 문구 분기)
- 각 페이지 간 네비게이션은 상대 경로(`privacy.html`, `support.html`) 사용 (같은 언어 폴더 안에서)
