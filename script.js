const API_URL = 'https://api.github.com/search/repositories';
const categories = {
  all: { label: '모든 프로젝트', query: '' },
  automation: { label: '업무 자동화', query: 'automation' },
  docs: { label: '문서·자료 정리', query: 'document' },
  web: { label: '홈페이지 만들기', query: 'topic:web' },
  ai: { label: 'AI 도우미', query: 'topic:ai' },
};

const skillGuides = [
  { key: 'automation', label: '엑셀·업무 자동화', words: ['excel', 'spreadsheet', 'vba', 'macro', 'xlsx', 'xlsm', 'xlflow'], summary: '엑셀 파일을 다루거나 반복 작업을 줄이는 데 활용될 수 있어요.', text: '엑셀 매크로나 스프레드시트 자동화 프로젝트일 수 있어요. 사용 중인 엑셀 버전과 파일 형식, 매크로 실행 권한을 먼저 확인해 보세요.', audience: '엑셀에서 같은 작업을 자주 반복하는 분' },
  { key: 'graphics', label: '그래픽·3D 만들기', words: ['graphics', 'rendering', 'blender', 'webgl', 'opengl', 'threejs', '3d'], summary: '그림, 화면 효과, 3D 장면을 만들 때 참고할 수 있는 도구예요.', text: '컴퓨터 그래픽이나 3D 화면을 만들고 표시하는 프로젝트일 수 있어요. 필요한 그래픽 카드, 지원 기기와 사용 예제를 확인해 보세요.', audience: '디자인·게임·3D 그래픽에 관심 있는 분' },
  { key: 'ai', label: 'AI 도우미 만들기', words: ['agent', 'mcp', 'llm', 'ai', 'claude', 'openai', 'langchain', 'ollama'], summary: 'AI가 질문에 답하거나 여러 작업을 도와주는 기능을 만드는 데 참고할 수 있어요.', text: 'AI 모델에 검색이나 다른 도구를 연결해 여러 단계의 작업을 돕게 하는 기술이에요. 구체적인 기능은 각 프로젝트의 설명과 사용 예제를 확인해 보세요.', audience: 'AI를 업무나 생활에 활용해 보고 싶은 분' },
  { key: 'docs', label: '내 자료로 답 찾기', words: ['rag', 'retrieval', 'vector', 'embedding'], summary: '내 문서와 자료를 찾아 답변에 활용하는 AI 기술을 알아볼 수 있어요.', text: 'RAG는 AI가 답하기 전에 관련 문서나 자료를 찾아 참고하게 하는 방식이에요. 사내 자료 검색이나 문서 질의응답 등에 활용할 수 있습니다.', audience: '자료가 많아 필요한 정보를 찾기 어려운 분' },
  { key: 'web', label: '홈페이지 만들기', words: ['next', 'react', 'vue', 'svelte', 'astro', 'frontend', 'web'], summary: '홈페이지나 온라인 서비스를 만들 때 쓰이는 기술과 도구예요.', text: '웹사이트 화면을 만들고 인터넷에 공개하는 데 필요한 프레임워크와 도구예요. 프로젝트마다 코딩 경험이나 설치 환경이 다를 수 있어요.', audience: '개인 홈페이지나 온라인 서비스를 만들어 보고 싶은 분' },
  { key: 'language', label: '앱과 프로그램 만들기', words: ['rust', 'golang', 'python', 'typescript', 'javascript', 'zig'], summary: '웹사이트나 앱을 만드는 데 활용되는 프로그래밍 언어와 도구예요.', text: '프로그램을 만들 때 사용하는 언어 또는 관련 도구예요. 처음 시작한다면 설치 방법과 입문 예제가 제공되는지 살펴보세요.', audience: '직접 프로그램을 만들어 보고 싶은 분' },
  { key: 'devtools', label: '만드는 과정 간단하게', words: ['docker', 'kubernetes', 'devops', 'terminal', 'cli', 'database', 'postgres'], summary: '프로그램을 만들고 실행하는 과정을 편리하게 도와주는 도구예요.', text: '개발자가 프로그램을 만들고 실행·관리하는 과정을 돕는 프로젝트예요. 일반 사용자가 바로 쓰는 도구가 아닐 수 있으니 사용 대상과 준비 환경을 먼저 확인해 보세요.', audience: '기술을 직접 만들거나 운영해 보고 싶은 분' },
  { key: 'automation', label: '반복 업무 줄이기', words: ['automation', 'workflow', 'n8n', 'zapier'], summary: '반복해서 하는 일을 자동으로 처리하는 방법을 찾을 때 참고할 수 있어요.', text: '여러 앱이나 작업 단계를 연결해 반복 업무를 줄이는 프로젝트일 수 있어요. 실제 자동화 범위와 지원 서비스는 프로젝트 안내에서 확인해 보세요.', audience: '매번 같은 작업을 반복하는 개인이나 팀' },
  { key: 'ai', label: 'AI로 자료 정리하기', words: ['document', 'summarization', 'transcription', 'speech'], summary: '긴 문서나 음성 자료에서 핵심 내용을 정리하는 데 활용될 수 있어요.', text: '문서나 음성을 읽고 요약·검색하는 기능을 제공하는 프로젝트일 수 있어요. 한국어 지원 여부와 입력 자료의 개인정보 처리 방식을 꼭 확인해 주세요.', audience: '회의록이나 긴 자료를 자주 다루는 분' },
  { key: 'data', label: '데이터 살펴보기', words: ['analytics', 'visualization', 'dashboard', 'data'], summary: '숫자와 자료를 보기 쉽게 정리하거나 분석할 때 참고할 수 있어요.', text: '데이터를 정리하고 차트나 대시보드로 살펴보는 데 쓰이는 프로젝트일 수 있어요. 어떤 파일 형식과 데이터베이스를 지원하는지 확인해 보세요.', audience: '판매·업무 데이터를 정리하고 싶은 분' },
];

const state = {
  category: 'all',
  query: '',
  periodDays: 365,
  periodMode: 'created',
  resultLimit: 24,
  resultLimitExplicit: false,
  sort: 'stars',
  page: 1,
  loading: false,
  savedOnly: false,
  items: [],
  requestId: 0,
};

const grid = document.querySelector('#results-grid');
const resultsLabel = document.querySelector('#results-label');
const emptyState = document.querySelector('#empty-state');
const errorState = document.querySelector('#error-state');
const loadMoreButton = document.querySelector('#load-more');
const savedCount = document.querySelector('#saved-count');
const savedToggle = document.querySelector('#saved-toggle');
const dialog = document.querySelector('#detail-dialog');
const dialogContent = document.querySelector('#dialog-content');
const intentSummary = document.querySelector('#intent-summary');
const dateWindow = document.querySelector('#date-window');
const themeToggle = document.querySelector('#theme-toggle');
const filterRow = document.querySelector('.filter-row');
const emptyTitle = emptyState.querySelector('h3');
const emptyText = emptyState.querySelector('p');
const emptyButton = document.querySelector('#reset-search');

const EMPTY_COPY = {
  search: {
    title: '아직 발견된 프로젝트가 없어요',
    text: '다른 키워드나 분야를 선택해 다시 검색해 보세요.',
    button: '전체 프로젝트 보기',
  },
  saved: {
    title: '저장한 기술이 아직 없어요',
    text: '둘러보기에서 마음에 드는 프로젝트의 ♡ 버튼을 누르면 이곳에 모아 볼 수 있어요.',
    button: '전체 프로젝트 둘러보기',
  },
};

function applyEmptyState(mode) {
  const copy = EMPTY_COPY[mode];
  if (!copy) return;
  emptyTitle.textContent = copy.title;
  emptyText.textContent = copy.text;
  emptyButton.textContent = copy.button;
}

function setTheme(isDark, persist = true) {
  document.body.classList.toggle('theme-dark', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? '주간 모드로 전환' : '야간 모드로 전환');
  themeToggle.title = isDark ? '주간 모드' : '야간 모드';
  document.querySelector('meta[name="theme-color"]').content = isDark ? '#0e1622' : '#e8eef4';
  if (!persist) return;
  try {
    localStorage.setItem('skillradar-theme-mode', isDark ? 'dark' : 'day');
  } catch (error) {
    console.error('화면 모드 설정을 저장하지 못했습니다.', error);
  }
}

function loadTheme() {
  try {
    return localStorage.getItem('skillradar-theme-mode') === 'dark';
  } catch (error) {
    console.error('저장된 화면 모드를 읽지 못했습니다.', error);
    return false;
  }
}

themeToggle.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('theme-dark'));
});
setTheme(loadTheme(), false);

function getSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem('skillradar-saved') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveItems(items) {
  try {
    localStorage.setItem('skillradar-saved', JSON.stringify(items));
    updateSavedCount();
  } catch {
    showError('브라우저 저장 공간을 사용할 수 없어 저장하지 못했어요. 브라우저 설정을 확인해 주세요.');
  }
}

function updateSavedCount() {
  savedCount.textContent = String(getSaved().length);
}

function formatNumber(number) {
  return new Intl.NumberFormat('ko-KR', { notation: number > 9999 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(number || 0);
}

function timeAgo(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '날짜 정보 없음';
  const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
  if (days === 0) return '오늘';
  if (days < 30) return `${days}일 전`;
  if (days < 365) return `${Math.floor(days / 30)}개월 전`;
  return `${Math.floor(days / 365)}년 전`;
}

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function getGuide(repository) {
  const terms = `${repository.name} ${repository.description || ''} ${(repository.topics || []).join(' ')} ${repository.language || ''}`
    .toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  return skillGuides.find((guide) => guide.words.some((word) => terms.includes(word)))
    || { key: 'devtools', label: '새로운 도구 알아보기', summary: '새로운 기능이나 작업 방법을 살펴볼 수 있는 공개 프로젝트예요.', text: 'GitHub에 공개된 프로젝트입니다. 실제로 어떤 일을 할 수 있는지, 설치나 사용에 필요한 조건은 무엇인지 원본 설명과 사용 예제를 확인해 보세요.', audience: '새로운 도구와 기술을 탐색하고 싶은 분' };
}

function getCategory(repository) {
  return getGuide(repository).label;
}

function renderCard(repository, index) {
  const saved = getSaved().some((item) => item.id === repository.id);
  const guide = getGuide(repository);
  const category = getCategory(repository);
  const languageColor = repository.language === 'TypeScript' ? '#3178c6'
    : repository.language === 'Python' ? '#e2c34c'
      : repository.language === 'Rust' ? '#e96b4b'
        : repository.language === 'JavaScript' ? '#e9d45d'
          : repository.language === 'Go' ? '#63c9dd' : '#9a9d92';

  return `
    <article class="repo-card" data-repo-id="${repository.id}" tabindex="0" role="button" aria-label="${escapeHTML(repository.full_name)} 상세 정보 보기" style="animation-delay:${Math.min(index, 8) * 35}ms">
      <div class="card-top">
        <span class="card-category">${escapeHTML(category)}</span>
        <span class="card-rank">최근 1년 안에 공개</span>
      </div>
      <h3 class="repo-title"><span class="owner">${escapeHTML(repository.owner?.login || '')}</span><span class="slash">/</span><span class="name">${escapeHTML(repository.name)}</span></h3>
      <p class="repo-purpose">이런 일에 참고할 수 있어요</p>
      <p class="repo-summary">${escapeHTML(guide.summary)}</p>
      <p class="repo-audience">추천 대상 · ${escapeHTML(guide.audience)}</p>
      <div class="card-bottom">
        <span class="card-metric star"><span aria-hidden="true">★</span> ${formatNumber(repository.stargazers_count)} 스타</span>
        <span class="card-metric"><span aria-hidden="true">⑂</span> ${formatNumber(repository.forks_count)} 포크</span>
        ${repository.language ? `<span class="card-language"><i class="language-dot" style="background:${languageColor}"></i>${escapeHTML(repository.language)}</span>` : ''}
        <span class="card-updated">업데이트 ${timeAgo(repository.updated_at)}</span>
      </div>
      <button class="bookmark-button${saved ? ' saved' : ''}" type="button" data-save-id="${repository.id}" aria-label="${saved ? '저장 취소' : '기술 저장'}" aria-pressed="${saved}">${saved ? '♥' : '♡'}</button>
    </article>`;
}

function renderRepositories(items, append = false) {
  if (!append) grid.innerHTML = '';
  grid.insertAdjacentHTML('beforeend', items.map((item, index) => renderCard(item, append ? grid.children.length + index : index)).join(''));
  grid.setAttribute('aria-busy', 'false');
  emptyState.hidden = grid.children.length > 0;
}

function showSkeletons() {
  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = Array.from({ length: 6 }, () => '<div class="skeleton" aria-hidden="true"></div>').join('');
}

function showError(message) {
  errorState.hidden = false;
  errorState.textContent = message;
}

function clearStatus() {
  errorState.hidden = true;
  errorState.textContent = '';
  emptyState.hidden = true;
}

function makeSearchQuery() {
  const categoryQuery = categories[state.category]?.query || '';
  const date = new Date();
  date.setDate(date.getDate() - state.periodDays);
  const since = date.toISOString().slice(0, 10);
  const dateQualifier = `${state.periodMode}:>=${since}`;
  const terms = [translateSearchQuery(state.query), categoryQuery, dateQualifier].filter(Boolean).join(' ');
  return terms;
}

function parseNaturalQuery(input) {
  const text = input.trim();
  const numberWords = { 한: 1, 하나: 1, 일: 1, 이: 2, 두: 2, 둘: 2, 삼: 3, 세: 3, 사: 4, 네: 4, 오: 5, 육: 6, 칠: 7, 팔: 8, 구: 9, 십: 10 };
  const durationPattern = /(?:(최근|지난)\s*)?(\d+|하나|한|일|둘|두|이|세|삼|네|사|오|육|칠|팔|구|십)?\s*(일|주|개월|개원|달|월|년)\s*(?:간|동안)?/i;
  const durationMatch = /이번\s*주|오늘|금일|이번\s*달/.test(text) ? null : text.match(durationPattern);
  let periodDays = 365;
  let hasPeriod = Boolean(durationMatch) || /이번\s*주|오늘|금일|이번\s*달|요즘|최근|지난/.test(text);
  let query = text;

  if (durationMatch) {
    const amount = Number(durationMatch[2]) || numberWords[durationMatch[2]] || 1;
    const unit = durationMatch[3];
    const multiplier = unit === '주' ? 7 : ['개월', '개원', '달', '월'].includes(unit) ? 30 : unit === '년' ? 365 : 1;
    periodDays = Math.min(3650, amount * multiplier);
    query = query.replace(durationMatch[0], ' ');
  } else if (/이번\s*주/.test(query)) {
    periodDays = 7;
    query = query.replace(/이번\s*주/g, ' ');
  } else if (/오늘|금일/.test(query)) {
    periodDays = 1;
    query = query.replace(/오늘|금일/g, ' ');
  } else if (/이번\s*달/.test(query)) {
    periodDays = 30;
    query = query.replace(/이번\s*달/g, ' ');
  } else if (/요즘|최근|지난/.test(query)) {
    periodDays = 30;
    query = query.replace(/요즘|최근|지난/g, ' ');
  }

  const rankedCount = text.match(/(?:베스트|best|top|상위|인기(?:\s*순)?|추천)\s*(\d+)/i);
  const plainCount = text.match(/(\d+)\s*개(?!월|원)/);
  const resultLimit = Math.min(100, Math.max(1, Number(rankedCount?.[1] || plainCount?.[1]) || 24));
  const requestsBest = /베스트|best|top|상위|인기/.test(text.toLowerCase());
  const sort = /업데이트|최근 활동|갱신/.test(text) ? 'updated' : /포크|파생/.test(text) ? 'forks' : requestsBest ? 'stars' : null;
  const periodMode = /새로|신규|생성|만들어진|새로 나온|새로 생긴/.test(text) ? 'created' : hasPeriod ? 'pushed' : 'created';
  query = query
    .replace(/(?:베스트|best|top|상위|인기(?:\s*순)?|추천)\s*\d*/gi, ' ')
    .replace(/\d+\s*(?:개|종)?/g, ' ')
    .replace(/(?:이번|관련|분야|스킬|기술|도구|프로젝트|찾아줘|찾아|검색해줘|검색|보여줘|알려줘|만들어진|새로 나온|새로 생긴|새로|신규)/g, ' ')
    .replace(/\s+/g, ' ').trim();

  return { query, periodDays, periodMode, resultLimit, resultLimitExplicit: Boolean(rankedCount || plainCount), sort };
}

function formatPeriod(days) {
  const commonPeriods = { 1: '1일', 3: '3일', 7: '1주', 14: '2주', 30: '1개월', 60: '2개월', 90: '3개월', 180: '6개월', 365: '1년' };
  return commonPeriods[days] || `${days}일`;
}

function updateIntentSummary() {
  if (state.savedOnly) {
    const total = getSaved().length;
    intentSummary.textContent = `저장한 기술 전체 ${total}개 · 검색어와 분야 필터 없이 표시`;
    dateWindow.textContent = '저장한 기술';
    return;
  }
  const mode = state.periodMode === 'pushed' ? '최근 활동' : '새로 생성';
  const topic = state.query || (state.category === 'all' ? '전체 분야' : categories[state.category].label);
  const sort = state.sort === 'updated' ? '최근 업데이트 순' : state.sort === 'forks' ? '포크 수 많은 순' : '스타 수 많은 순';
  intentSummary.textContent = `${formatPeriod(state.periodDays)} ${mode} · ${topic} · ${sort} · 상위 ${state.resultLimit}개`;
  dateWindow.textContent = `${formatPeriod(state.periodDays)} · ${mode}`;
}

function applySearchIntent(input) {
  const intent = parseNaturalQuery(input);
  state.query = intent.query;
  state.periodDays = intent.periodDays;
  state.periodMode = intent.periodMode;
  state.resultLimit = intent.resultLimit;
  state.resultLimitExplicit = intent.resultLimitExplicit;
  if (intent.sort) state.sort = intent.sort;
  document.querySelector('#sort-select').value = state.sort;
}

function translateSearchQuery(query) {
  const text = query.trim();
  if (!text || !/[가-힣]/.test(text)) return text;
  const matches = [
    { pattern: /엑셀|스프레드시트/, term: 'spreadsheet' },
    { pattern: /반복 업무|반복 작업|자동화|업무 줄이/, term: 'automation' },
    { pattern: /문서|자료|회의록|요약|긴 글/, term: 'document' },
    { pattern: /홈페이지|웹사이트|웹페이지|웹 만들|사이트 만들/, term: 'website' },
    { pattern: /그래픽|컴퓨터 그래픽|렌더링|3d/, term: 'graphics' },
    { pattern: /이미지|그림|일러스트/, term: 'image generation' },
    { pattern: /디자인|색상|ui|ux/, term: 'design' },
    { pattern: /인공지능|ai|도우미/, term: 'AI agent' },
    { pattern: /데이터|분석|차트|매출/, term: 'data analytics' },
    { pattern: /쇼핑몰|주문/, term: 'ecommerce' },
  ];
  const terms = matches.filter((item) => item.pattern.test(text)).map((item) => item.term);
  return terms.length ? [...new Set(terms)].join(' ') : text;
}

async function searchRepositories({ append = false } = {}) {
  if (state.loading) return;
  if (state.savedOnly) {
    // 저장한 기술 보기는 검색어·분야 필터를 적용하지 않고 저장된 전체 목록을 보여준다.
    const saved = getSaved().slice().sort(compareSavedItems);
    state.items = saved;
    updateIntentSummary();
    applyEmptyState('saved');
    clearStatus();
    renderRepositories(saved);
    resultsLabel.innerHTML = `저장한 프로젝트 <strong>${saved.length}</strong>개`;
    loadMoreButton.hidden = true;
    return;
  }

  applyEmptyState('search');
  const requestId = ++state.requestId;
  state.loading = true;
  clearStatus();
  loadMoreButton.hidden = true;
  if (!append) {
    state.page = 1;
    showSkeletons();
    resultsLabel.textContent = `GitHub에서 ${formatPeriod(state.periodDays)} ${state.periodMode === 'pushed' ? '활동한' : '새로 생성된'} 프로젝트를 찾고 있어요...`;
  }

  const pageSize = state.resultLimitExplicit ? state.resultLimit : 24;
  const params = new URLSearchParams({
    q: makeSearchQuery(),
    sort: state.sort,
    order: 'desc',
    per_page: String(pageSize),
    page: String(state.page),
  });

  try {
    const response = await fetch(`${API_URL}?${params.toString()}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        const resetTime = Number(response.headers.get('x-ratelimit-reset')) * 1000;
        const resetText = resetTime ? ` 약 ${Math.max(1, Math.ceil((resetTime - Date.now()) / 60000))}분 후 다시 시도해 주세요.` : ' 잠시 후 다시 시도해 주세요.';
        throw new Error(`GitHub API 요청 한도에 도달했어요.${resetText}`);
      }
      if (response.status === 422) throw new Error('검색 조건을 처리하지 못했어요. 검색어를 간단히 바꿔 다시 시도해 주세요.');
      throw new Error(`GitHub에서 검색 결과를 가져오지 못했어요. (오류 ${response.status})`);
    }

    const data = await response.json();
    if (requestId !== state.requestId) return;
    const results = Array.isArray(data.items) ? data.items : [];
    state.items = append ? [...state.items, ...results] : results;
    renderRepositories(results, append);
    resultsLabel.innerHTML = `${formatPeriod(state.periodDays)} ${state.periodMode === 'pushed' ? '활동한' : '새로 생성된'} 프로젝트 <strong>${state.items.length}</strong>개 표시`;
    loadMoreButton.hidden = results.length < pageSize || (state.resultLimitExplicit && state.items.length >= state.resultLimit) || state.items.length >= data.total_count;
    if (results.length === 0) {
      emptyState.hidden = false;
      resultsLabel.innerHTML = '검색 결과가 없습니다';
    }
    document.querySelector('#source-note').hidden = false;
  } catch (error) {
    if (requestId !== state.requestId) return;
    grid.innerHTML = '';
    grid.setAttribute('aria-busy', 'false');
    resultsLabel.textContent = '검색 중 문제가 발생했어요';
    showError(`${error.message} GitHub API는 로그인 없이 검색할 수 있지만 요청 횟수에 제한이 있습니다.`);
  } finally {
    if (requestId === state.requestId) state.loading = false;
  }
}

function openDetails(repository) {
  const guide = getGuide(repository);
  const topics = repository.topics || [];
  const language = repository.language || '언어 정보 없음';
  dialogContent.innerHTML = `
    <p class="dialog-category">${escapeHTML(getCategory(repository))} · GitHub 프로젝트</p>
    <h2 class="dialog-title" id="dialog-title"><span class="dialog-owner">${escapeHTML(repository.owner?.login || '')} / </span>${escapeHTML(repository.name)}</h2>
    <div class="dialog-block"><h3>어떤 일에 도움이 되나요?</h3><p>${escapeHTML(guide.text)}</p></div>
    <div class="dialog-block"><h3>누구에게 잘 맞나요?</h3><p>${escapeHTML(guide.audience)}</p></div>
    <div class="dialog-block"><h3>시작 전에 확인해 주세요</h3><p>프로젝트마다 필요한 지식과 설치 방법이 달라요. GitHub에서 사용 예제와 준비 환경을 먼저 확인해 보세요. ${topics.length ? `분류 참고: ${topics.slice(0, 4).map(escapeHTML).join(', ')}.` : ''}</p></div>
    <div class="dialog-block"><h3>GitHub에 등록된 프로젝트 설명</h3><p>${escapeHTML(repository.description || '저장소에 등록된 설명이 없습니다. GitHub에서 README를 확인해 보세요.')}</p></div>
    <div class="dialog-metrics"><span>★ ${formatNumber(repository.stargazers_count)} 스타</span><span>⑂ ${formatNumber(repository.forks_count)} 포크</span><span>${escapeHTML(language)}</span><span>최근 업데이트 ${escapeHTML(timeAgo(repository.updated_at))}</span></div>
    <div class="dialog-actions"><a href="${escapeHTML(repository.html_url)}" target="_blank" rel="noreferrer">GitHub에서 살펴보기 ↗</a><button type="button" data-dialog-save="${repository.id}">${getSaved().some((item) => item.id === repository.id) ? '저장 취소' : '나중에 읽기 ♡'}</button></div>`;
  dialog.showModal();
}

function toggleSaved(repositoryId) {
  const saved = getSaved();
  const exists = saved.some((item) => item.id === repositoryId);
  const updated = exists ? saved.filter((item) => item.id !== repositoryId) : [...saved, state.items.find((item) => item.id === repositoryId)].filter(Boolean);
  saveItems(updated);
  if (state.savedOnly) {
    searchRepositories();
  } else {
    const cardButton = document.querySelector(`[data-save-id="${repositoryId}"]`);
    if (cardButton) {
      cardButton.classList.toggle('saved', !exists);
      cardButton.textContent = exists ? '♡' : '♥';
      cardButton.setAttribute('aria-label', exists ? '기술 저장' : '저장 취소');
      cardButton.setAttribute('aria-pressed', String(!exists));
    }
    if (dialog.open) {
      const dialogButton = dialog.querySelector('[data-dialog-save]');
      if (dialogButton) dialogButton.textContent = exists ? '나중에 읽기 ♡' : '저장 취소';
    }
  }
}

function compareSavedItems(left, right) {
  const key = state.sort === 'updated' ? 'updated_at' : state.sort === 'forks' ? 'forks_count' : 'stargazers_count';
  if (key === 'updated_at') return String(right.updated_at || '').localeCompare(String(left.updated_at || ''));
  return (Number(right[key]) || 0) - (Number(left[key]) || 0);
}

function runNewSearch() {
  state.savedOnly = false;
  savedToggle.classList.remove('is-active');
  savedToggle.setAttribute('aria-pressed', 'false');
  filterRow?.classList.remove('is-saved-view');
  updateIntentSummary();
  state.requestId += 1;
  state.loading = false;
  state.page = 1;
  searchRepositories();
}

document.querySelector('#search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  applySearchIntent(document.querySelector('#search-input').value);
  runNewSearch();
});

document.querySelectorAll('.quick-searches button, .goal-card').forEach((button) => {
  button.addEventListener('click', () => {
    const query = button.dataset.query || '';
    document.querySelector('#search-input').value = query;
    applySearchIntent(query);
    state.category = 'all';
    document.querySelector('.category-tab.selected')?.classList.remove('selected');
    document.querySelector('.category-tab[data-category="all"]').classList.add('selected');
    runNewSearch();
    document.querySelector('#trending').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('.category-tab').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.category-tab.selected')?.classList.remove('selected');
    button.classList.add('selected');
    state.category = button.dataset.category || 'all';
    runNewSearch();
  });
});

document.querySelector('#sort-select').addEventListener('change', (event) => {
  state.sort = event.target.value;
  if (state.savedOnly) {
    searchRepositories();
    return;
  }
  runNewSearch();
});

loadMoreButton.addEventListener('click', () => {
  state.page += 1;
  searchRepositories({ append: true });
});

savedToggle.addEventListener('click', () => {
  state.savedOnly = !state.savedOnly;
  savedToggle.classList.toggle('is-active', state.savedOnly);
  savedToggle.setAttribute('aria-pressed', String(state.savedOnly));
  filterRow?.classList.toggle('is-saved-view', state.savedOnly);
  if (state.savedOnly) {
    state.requestId += 1;
    state.loading = false;
    resultsLabel.textContent = '저장한 프로젝트를 불러오고 있어요';
    searchRepositories();
  } else {
    runNewSearch();
  }
});

document.querySelector('#reset-search').addEventListener('click', () => {
  document.querySelector('#search-input').value = '';
  state.query = '';
  state.periodDays = 365;
  state.periodMode = 'created';
  state.resultLimit = 24;
  state.resultLimitExplicit = false;
  state.sort = 'stars';
  document.querySelector('#sort-select').value = state.sort;
  state.category = 'all';
  document.querySelector('.category-tab.selected')?.classList.remove('selected');
  document.querySelector('.category-tab[data-category="all"]').classList.add('selected');
  runNewSearch();
});

grid.addEventListener('click', (event) => {
  const saveButton = event.target.closest('[data-save-id]');
  if (saveButton) {
    event.stopPropagation();
    toggleSaved(Number(saveButton.dataset.saveId));
    return;
  }
  const card = event.target.closest('[data-repo-id]');
  if (card) {
    const repository = state.items.find((item) => item.id === Number(card.dataset.repoId));
    if (repository) openDetails(repository);
  }
});

grid.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-repo-id]')) {
    event.preventDefault();
    const repository = state.items.find((item) => item.id === Number(event.target.dataset.repoId));
    if (repository) openDetails(repository);
  }
});

dialog.addEventListener('click', (event) => {
  if (event.target === dialog || event.target.closest('.dialog-close')) {
    dialog.close();
    return;
  }
  const saveButton = event.target.closest('[data-dialog-save]');
  if (saveButton) toggleSaved(Number(saveButton.dataset.dialogSave));
});

updateIntentSummary();
updateSavedCount();
searchRepositories();
