# DS Architectural Surfaces — libing

정적 HTML 웹사이트입니다. GitHub 코드 화면에서는 HTML이 **소스만** 보이므로, 아래 방법으로 열어 주세요.

## 사이트 보기

### 1) GitHub Pages (권장)
배포 후 아래 주소에서 확인합니다.

**https://chujaechol.github.io/libing/**

| 페이지 | 주소 |
|--------|------|
| 홈 | https://chujaechol.github.io/libing/ |
| 전체 페이지 목록 | https://chujaechol.github.io/libing/site-map.html |
| Material List | https://chujaechol.github.io/libing/materials.html |
| 모짜이크 | https://chujaechol.github.io/libing/mosaic-categories.html |

### 2) 로컬에서 바로 열기
저장소를 받은 뒤 `index.html`을 브라우저로 엽니다.

```bash
# 예: VS Code / Cursor Live Server, 또는
npx --yes serve .
```

> `file://`로 열어도 대부분 동작하지만, 일부 브라우저·경로에서는 이미지가 깨질 수 있어 로컬 서버를 권장합니다.

---

## 페이지 구조 (HTML)

```
libing/
├── index.html                 # 홈 / Collections
├── site-map.html              # 전체 HTML 안내·바로가기
├── materials.html             # Material List (규격 목록)
├── material-list.html         # materials.html 리다이렉트
├── catalog.html               # 규격별 제품 카탈로그 (?format=)
├── product.html               # 제품 상세 (?format=&product=)
│
├── mosaic-categories.html     # 모짜이크 5카테고리
├── mosaic-gallery.html        # 모짜이크 갤러리 (?cat=&size=)
│
├── photo-gallery.html         # Photo Gallery 허브
├── gallery-kitchen.html
├── gallery-600x600.html
├── gallery-300x600.html
│
├── brand-daelim.html          # 브랜드 카탈로그
├── brand-kyerim.html
├── brand-lauche.html
├── auxiliary.html             # 수전 등 보조재
│
├── css/                       # 스타일
├── js/                        # 데이터·페이지 로직
└── assets/                    # 이미지
```

---

## 주요 사용자 동선

### Material List → 제품 상세
1. `index.html` → **Material List**
2. `materials.html` → 규격 선택 (예: Point / 600×600 …)
3. `catalog.html?format=200x1200` → 제품 클릭
4. `product.html?format=…&product=…` → 상세

### 모짜이크 (Point → 모짜이크)
1. Point 카탈로그에서 **모짜이크** 클릭  
   → `mosaic-categories.html`
2. 정각 / 직사각 / 육각 / 원형 / 모양 선택  
   → `mosaic-gallery.html?cat=square` 등
3. 직사각은 규격 한 번 더 선택  
   → `mosaic-gallery.html?cat=rect&size=45x145`
4. 제품 클릭 → `product.html?format=mosaic&product=…` 상세

### Photo Gallery
1. `photo-gallery.html` → kitchen / 600×600 / 300×600
2. 일부 제품은 showcase 상세 레이아웃

---

## HTML 파일 목록

| 파일 | 역할 |
|------|------|
| `index.html` | 브랜드 홈, 컬렉션 카드 |
| `site-map.html` | **전체 페이지 맵 (이 문서의 HTML 버전)** |
| `materials.html` | Material List 규격 타일 |
| `catalog.html` | 규격별 제품 그리드 |
| `product.html` | 제품 상세 (classic / showcase) |
| `mosaic-categories.html` | 모짜이크 카테고리 5종 |
| `mosaic-gallery.html` | 모짜이크 제품 그리드 |
| `photo-gallery.html` | 포토 갤러리 허브 |
| `gallery-kitchen.html` | 키친 갤러리 |
| `gallery-600x600.html` | 600×600 갤러리 |
| `gallery-300x600.html` | 300×600 갤러리 |
| `brand-daelim.html` | 대림 브랜드 |
| `brand-kyerim.html` | 계림 브랜드 |
| `brand-lauche.html` | 라우체 브랜드 |
| `auxiliary.html` | 보조 자재 |
| `material-list.html` | → materials.html |

---

## JS / 데이터

| 파일 | 역할 |
|------|------|
| `js/catalog-data.js` | 타일 규격·제품·상세 |
| `js/mosaic-catalog-data.js` | 모짜이크 상세 등록 (483+) |
| `js/mosaic-rect-data.js` | 직사각 규격별 목록 |
| `js/mosaic-flat-data.js` | 정각·육각·원형·모양 목록 |
| `js/product-page.js` | 상세 페이지 렌더 |
| `js/catalog-page.js` | 카탈로그 렌더 |
| `js/materials.js` | Material List 렌더 |

---

## GitHub에서 HTML이 “안 보이는” 이유

GitHub 저장소의 `index.html`을 클릭하면 **코드 뷰**만 열립니다.  
웹사이트처럼 보려면 **GitHub Pages** 또는 **로컬 서버**가 필요합니다.

설정: Repository → **Settings** → **Pages** → Source: `Deploy from a branch` → Branch: `master` / `/ (root)` → Save
