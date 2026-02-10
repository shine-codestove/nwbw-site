# NWBW - No Way But Way

Apple Watch 트레일 러닝 네비게이션 앱 **NWBW**의 공식 웹사이트입니다.
https://shine-codestove.github.io/nwbw-site/

## 소개

NWBW는 GPX 파일 기반의 Apple Watch 트레일 러닝 네비게이션 앱입니다. 낯선 산길에서도 실시간 방향 안내를 받으며 자신 있게 달릴 수 있습니다.

### 주요 기능

- **실시간 방향 안내** - 나침반 기반 다음 방향 전환점 안내, 경로 이탈 시 즉시 알림
- **GPX 코스 지원** - iPhone에서 GPX 파일 가져오기, Watch로 동기화, 러닝 후 GPX Export
- **운동 추적** - 심박수, 거리, 페이스, 칼로리, 누적 상승 고도 실시간 모니터링
- **Apple Watch 최적화** - iPhone 없이 독립 실행, Companion Mode로 배터리 절약
- **5가지 러닝 화면** - 네비게이션, 지도, 고도, 운동 통계, 컨트롤

## 웹사이트 구조

| 페이지            | 파일           | 설명                          |
| ----------------- | -------------- | ----------------------------- |
| 홈                | `index.html`   | 앱 소개, 기능 목록, 사용 방법 |
| 개인정보 처리방침 | `privacy.html` | 데이터 수집/저장/보호 정책    |
| 지원              | `support.html` | FAQ, 사용 팁, 문의 안내       |

## 기술 스택

- HTML5 + CSS3 (순수 정적 사이트)
- Google Fonts (Outfit)
- GitHub Pages 배포

## 로컬 실행

별도의 빌드 과정 없이 HTML 파일을 브라우저에서 직접 열 수 있습니다.

```bash
# 간단한 로컬 서버 실행 (선택)
python3 -m http.server 8000
```

## 배포

`main` 브랜치에 푸시하면 GitHub Pages를 통해 자동 배포됩니다.

## 링크

- [App Store](https://apps.apple.com/kr/app/nwbw-running-navigator/id6758130832)
- [문의](mailto:info@codestove.io)

## 라이선스

© 2026 NWBW. All rights reserved.
