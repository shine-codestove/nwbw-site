# CLAUDE.md

## 프로젝트 개요

NWBW(No Way But Way) iOS/Apple Watch 트레일 러닝 네비게이션 앱의 공식 웹사이트.
GitHub Pages로 배포되는 정적 HTML/CSS 사이트.

## 기술 스택

- **HTML5 + CSS3** (순수 정적 사이트, JavaScript 없음)
- **Google Fonts**: Outfit (300, 400, 600, 700, 800)
- **빌드 도구 없음**: 패키지 매니저, 번들러, CI/CD 파이프라인 없음
- **배포**: GitHub Pages (정적 파일 직접 서빙)

## 파일 구조

```
├── index.html      # 메인 랜딩 페이지 (앱 소개, 기능, 사용 방법)
├── privacy.html    # 개인정보 처리방침
└── support.html    # 고객 지원 및 FAQ
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

- **App Store**: `https://apps.apple.com/kr/app/nwbw-running-navigator/id6758130832`
- **문의 이메일**: `info@codestove.io`

## 언어

한국어(ko) 기반. 일부 영어 요소 포함 (앱 이름, 성경 구절).

## 작업 시 유의사항

- 3개 HTML 파일 모두에 CSS가 `<style>` 태그로 인라인 포함됨 (공통 CSS 파일 없음)
- 스타일 변경 시 각 파일의 공통 부분(헤더, 푸터, 색상 변수 등)을 모두 동기화해야 함
- JavaScript가 없으므로 동적 기능 추가 시 별도 파일 생성 필요
- 각 페이지 간 네비게이션은 상대 경로(`privacy.html`, `support.html`) 사용
