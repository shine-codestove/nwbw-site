# CLAUDE.md

## 프로젝트 개요

NWBW(No Way But Way) iOS/Apple Watch 트레일 러닝 네비게이션 앱의 공식 웹사이트.
GitHub Pages로 배포되는 정적 HTML/CSS 사이트.

## 기술 스택

- **HTML5 + CSS3** (순수 정적 사이트, 스크린샷 캐러셀용 `carousel.js`만 사용)
- **Google Fonts**: Outfit (300, 400, 600, 700, 800)
- **빌드 도구 없음**: 패키지 매니저, 번들러, CI/CD 파이프라인 없음
- **배포**: GitHub Pages (정적 파일 직접 서빙)

## 파일 구조

```
├── index.html          # 메인 랜딩 페이지 (앱 소개, 기능, 사용 방법) - 한국어
├── privacy.html        # 개인정보 처리방침 - 한국어
├── support.html        # 고객 지원 및 FAQ - 한국어
├── carousel.js         # 스크린샷 캐러셀 (한/영 공용, <html lang>으로 aria-label 언어 결정)
├── assets/             # 로고·스크린샷 (한/영 공용)
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
- **경로**: `en/` 페이지는 `../assets/...`, `../carousel.js`를 쓰고, 영어 페이지끼리는 같은 폴더 상대 경로(`privacy.html`)로 연결한다.
- **언어 전환**: 모든 페이지 헤더의 `.lang-switch`("한국어 | English")가 상대 언어의 같은 페이지로 연결된다.
  `.nav-links`는 768px 이하에서 숨겨지므로 `.lang-switch`는 `.nav-links` 밖(`.nav-right` 안)에 둔다.
- **hreflang**: 6개 페이지 모두 `<link rel="alternate" hreflang="ko|en|x-default">`를 절대 URL
  (`https://shine-codestove.github.io/nwbw-site/...`)로 가진다. x-default는 한국어 페이지. 새 페이지 추가 시 함께 넣는다.
- **App Store 링크**: 한국어 페이지는 `apps.apple.com/kr/...`, 영어 페이지는 `https://apps.apple.com/us/app/nwbw/id6758130832`.
- **스크린샷**: 현재 영어 페이지도 `../assets/`의 한국어 스크린샷을 사용 중. 영어 스크린샷이 준비되면 `en/index.html`의 `src`만 교체한다.
- **개인정보 처리방침**: 법적 문서이므로 한국어 원문을 바꾸면 영어 번역도 빠짐없이 같은 내용으로 갱신한다.

## 작업 시 유의사항

- 6개 HTML 파일(한국어 3 + `en/` 3) 모두에 CSS가 `<style>` 태그로 인라인 포함됨 (공통 CSS 파일 없음)
- 스타일 변경 시 각 파일의 공통 부분(헤더, 푸터, 색상 변수 등)을 모두 동기화해야 함
- 동적 기능은 `carousel.js`처럼 별도 JS 파일로 추가 (한/영 공용이면 `<html lang>`으로 문구 분기)
- 각 페이지 간 네비게이션은 상대 경로(`privacy.html`, `support.html`) 사용 (같은 언어 폴더 안에서)
