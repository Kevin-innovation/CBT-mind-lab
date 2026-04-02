  var STORE_KEY = "cbt_mind_records";
  var SETTINGS_KEY = "cbt_mind_gemini_settings";
  var REPORT_CACHE_KEY = "cbt_mind_weekly_report_cache";
  var BACKUP_VERSION = 1;
  var DEFAULT_MODEL = "gemini-2.5-flash";
  var NONE_DISTORTION = "특정 왜곡 미발견";

  var EMOTIONS = ["불안", "우울", "분노", "수치심", "죄책감", "짜증", "무기력", "혼란", "초조", "답답함"];

  var DIST = {
    "흑백논리": {
      icon: "fa-circle-half-stroke",
      color: "#2f6f58",
      kw: ["전부", "아무것도", "완벽", "망했다", "0점", "무조건", "절대", "전혀", "다 틀렸", "하나도", "완전히"],
      desc: "중간 단계를 인정하지 않고 완벽하거나 완전히 실패한 것으로만 평가하는 패턴입니다.",
      cardDesc: "성공과 실패만 보는 극단 해석",
      q: ["0점과 100점 사이의 중간 평가는 없을까요?", "부분적으로 해낸 부분은 없었나요?", "완벽하지 않다고 해서 완전히 실패한 것일까요?"],
      alt: ["완벽하지 않아도 일부는 충분히 해낼 수 있다.", "한 번의 결과가 내 전체 능력을 증명하지는 않는다.", "성공과 실패 사이에는 다양한 단계가 있다."]
    },
    "파국화": {
      icon: "fa-volcano",
      color: "#c7854b",
      kw: ["끝장", "죽겠다", "망할", "대재앙", "치명적", "최악", "절망", "파탄", "끝이다"],
      desc: "부정적 사건이 곧 큰 재앙으로 이어질 것처럼 확대 해석하는 패턴입니다.",
      cardDesc: "작은 실패를 재앙처럼 확대",
      q: ["실제로 최악이 될 확률은 얼마나 될까요?", "비슷한 일이 있었을 때 정말 재앙이 되었나요?", "결과가 나빠도 내가 감당할 방법은 없을까요?"],
      alt: ["불편한 일일 수 있지만 재앙이라고 단정할 필요는 없다.", "최악의 가능성보다 현실적인 가능성을 먼저 볼 수 있다.", "결과가 기대보다 나빠도 완전히 무너지지는 않는다."]
    },
    "과잉일반화": {
      icon: "fa-arrows-left-right-to-line",
      color: "#5a7c9c",
      kw: ["항상", "늘", "매번", "언제나", "결국", "역시", "번번이", "계속", "한 번도"],
      desc: "한 번의 사건이나 일부 경험을 근거로 전체를 일반화하는 패턴입니다.",
      cardDesc: "한 번의 결과를 전체로 일반화",
      q: ["정말 항상 그랬나요, 예외는 없었나요?", "과거에 잘 해낸 경험은 없었나요?", "이번 일이 앞으로의 모든 결과를 대표하나요?"],
      alt: ["이번에는 어려웠지만 항상 그런 것은 아니다.", "과거에 잘한 순간도 있었으니 전체를 일반화할 필요는 없다.", "한 번의 결과가 다음 결과를 모두 결정하지 않는다."]
    },
    "마음읽기": {
      icon: "fa-eye",
      color: "#8b6db2",
      kw: ["나보고", "내가 싫어", "웃음거리", "비웃", "판단할", "평가할", "사람들이", "속으로"],
      desc: "타인이 자신을 부정적으로 보고 있다고 확신하는 패턴입니다.",
      cardDesc: "타인의 생각을 단정해 해석",
      q: ["상대의 생각을 확인한 적이 있나요?", "다른 해석 가능성은 없을까요?", "상대가 정말 그렇게 생각한다고 단정할 근거가 있나요?"],
      alt: ["상대의 생각을 나는 완전히 알 수 없다.", "타인은 내가 생각하는 것만큼 나를 오래 보지 않을 수 있다.", "부정적으로 보였더라도 그 이유가 꼭 나 때문은 아닐 수 있다."]
    },
    "감정적 추론": {
      icon: "fa-heart-crack",
      color: "#c45b6a",
      kw: ["느끼기 때문에", "느끼니까", "직감", "느낌이", "분명", "틀림없어"],
      desc: "느낌을 사실의 증거처럼 받아들이는 패턴입니다.",
      cardDesc: "느낌을 사실처럼 믿는 해석",
      q: ["감정과 사실은 항상 같을까요?", "불안하다는 느낌이 곧 실패를 의미하나요?", "감정과 다른 객관적 근거는 없나요?"],
      alt: ["불안하다고 해서 실제로 위험한 것은 아니다.", "감정은 중요한 정보지만 사실 그 자체는 아니다.", "기분과 현실을 분리해서 볼 수 있다."]
    },
    "해야식 사고": {
      icon: "fa-gavel",
      color: "#b5922d",
      kw: ["해야", "해야만", "반드시", "의무", "당연히", "꼭", "기필코", "안 하면 안 돼"],
      desc: "자신이나 타인에게 매우 엄격한 규칙을 적용하는 패턴입니다.",
      cardDesc: "\"반드시 해야 해\" 식 압박",
      q: ["그 규칙은 꼭 절대적이어야 하나요?", "못 지키면 어떤 의미가 생긴다고 믿고 있나요?", "해야 한다를 하면 좋다로 바꿔볼 수 있나요?"],
      alt: ["하고 싶지만 못했다고 해서 내 가치가 사라지지는 않는다.", "원하는 목표와 절대 규칙은 다를 수 있다.", "조금 덜 해내도 충분히 의미가 있다."]
    },
    "개인화": {
      icon: "fa-hand-point-back",
      color: "#4d8b7f",
      kw: ["내 탓", "내 잘못", "내가 때문에", "내가 못 해서", "나만", "내 책임"],
      desc: "여러 요인이 있는 상황에서도 지나치게 자신의 책임으로 돌리는 패턴입니다.",
      cardDesc: "여러 원인을 전부 내 탓으로 돌림",
      q: ["다른 요인도 있었나요?", "내가 통제할 수 없는 부분은 없었나요?", "친구가 같은 상황이면 그 친구에게도 전부 네 탓이라고 말할까요?"],
      alt: ["그 결과에는 여러 요인이 함께 작용했다.", "내 책임이 일부 있을 수는 있어도 전부는 아니다.", "자책보다 다음 행동을 바꾸는 것이 더 도움이 된다."]
    }
  };

  var DIST_NAMES = Object.keys(DIST);
  var DIST_WITH_NONE = DIST_NAMES.concat([NONE_DISTORTION]);

  var SAMPLE_RECORDS = {
    exam: {
      situation: "수학 모의고사를 봤는데 마지막 3문제를 다 틀렸고, 채점하면서 숨이 막히는 느낌이 들었다.",
      thought: "나는 원래 수학을 못하는 사람이야. 이번에도 망했고 수능도 끝장일 거야.",
      emotion: "불안",
      intensity: 9,
      behavior: "복습을 해야 하는데 책을 덮고 계속 점수만 다시 계산했다."
    },
    presentation: {
      situation: "다음 주 과학 발표 순서를 뽑았는데 내 이름이 첫 번째였다.",
      thought: "발표하다가 말을 더듬으면 다들 내가 준비도 안 한 사람이라고 생각할 거야.",
      emotion: "초조",
      intensity: 8,
      behavior: "발표 자료를 열어보지 못하고 다른 과목 숙제만 했다."
    },
    deadline: {
      situation: "영어 과제를 하루 늦게 제출했고 선생님이 마감 시간을 다시 강조하셨다.",
      thought: "나는 왜 항상 이 모양이지. 제시간에 못 냈으니 전부 내 잘못이고 반드시 만회해야 해.",
      emotion: "죄책감",
      intensity: 7,
      behavior: "다음 과제까지 한꺼번에 완벽하게 하려고 하다가 오히려 시작을 못 했다."
    }
  };

  var CHAT_STEPS = [
    {
      field: "situation",
      prompt: "안녕하세요. 오늘 어떤 상황에서 학습 불안이나 스트레스를 느꼈는지 말해 주세요.\n\n예: 수학 모의고사를 봤는데 마지막 3문제를 틀렸어."
    },
    {
      field: "thought",
      prompt: "그 상황에서 자동으로 떠오른 생각은 무엇이었나요?\n머릿속 문장을 그대로 적는 것이 좋습니다."
    },
    {
      field: "emotion",
      prompt: "그때 어떤 감정이 들었고 강도는 몇 점이었나요?\n예: 불안 7점"
    },
    {
      field: "behavior",
      prompt: "그 감정 때문에 어떻게 행동했나요? 또는 무엇을 하지 못했나요?"
    }
  ];

  var ANALYSIS_SCHEMA = {
    type: "object",
    properties: {
      summary: { type: "string" },
      distortions: {
        type: "array",
        minItems: 1,
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            name: { type: "string", enum: DIST_WITH_NONE },
            confidence: { type: "integer", minimum: 0, maximum: 100 },
            reason: { type: "string" },
            evidence: { type: "string" }
          },
          required: ["name", "confidence", "reason", "evidence"]
        }
      },
      reflectionQuestions: {
        type: "array",
        minItems: 2,
        maxItems: 3,
        items: { type: "string" }
      },
      alternativeThoughts: {
        type: "array",
        minItems: 2,
        maxItems: 3,
        items: { type: "string" }
      },
      metacognitionInsight: { type: "string" },
      nextAction: { type: "string" },
      cautionNote: { type: "string" }
    },
    required: ["summary", "distortions", "reflectionQuestions", "alternativeThoughts", "metacognitionInsight", "nextAction", "cautionNote"]
  };

  var REPORT_SCHEMA = {
    type: "object",
    properties: {
      summary: { type: "string" },
      patternHighlights: {
        type: "array",
        minItems: 2,
        maxItems: 4,
        items: { type: "string" }
      },
      emotionalTrend: { type: "string" },
      recommendedExercises: {
        type: "array",
        minItems: 2,
        maxItems: 4,
        items: { type: "string" }
      },
      nextWeekFocus: { type: "string" },
      warningSignal: { type: "string" }
    },
    required: ["summary", "patternHighlights", "emotionalTrend", "recommendedExercises", "nextWeekFocus", "warningSignal"]
  };

  var records = [];
  var settings = {
    apiKey: "",
    model: DEFAULT_MODEL,
    verifiedAt: ""
  };
  var formStep = 0;
  var selectedEmotion = null;
  var chatStep = 0;
  var chatData = {};
  var isFormBusy = false;
  var isChatBusy = false;
  var weeklyReportCache = null;
  var currentReportMode = "local";
  var lineChart = null;
  var donutChart = null;

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function clamp(num, min, max) {
    return Math.min(max, Math.max(min, num));
  }

  function formatDateShort(value) {
    var date = new Date(value);
    return (date.getMonth() + 1) + "/" + date.getDate();
  }

  function formatDateTime(value) {
    var date = new Date(value);
    var hour = date.getHours();
    var period = hour < 6 ? "밤" : hour < 12 ? "오전" : hour < 18 ? "오후" : "저녁";
    return date.getMonth() + 1 + "월 " + date.getDate() + "일 " + period;
  }

  function formatStamp(value) {
    var date = new Date(value);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    var hour = String(date.getHours()).padStart(2, "0");
    var minute = String(date.getMinutes()).padStart(2, "0");
    return year + month + day + "-" + hour + minute;
  }

  function dedupeStrings(items, max) {
    var seen = {};
    var out = [];
    for (var i = 0; i < items.length; i++) {
      var value = String(items[i] || "").trim();
      if (!value || seen[value]) continue;
      seen[value] = true;
      out.push(value);
      if (max && out.length >= max) break;
    }
    return out;
  }

  function toast(message, type) {
    var box = $("toast-box");
    var el = document.createElement("div");
    el.className = "toast " + (type || "success");
    el.textContent = message;
    box.appendChild(el);
    setTimeout(function() {
      el.style.opacity = "0";
      el.style.transform = "translateY(-10px)";
      setTimeout(function() {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 260);
    }, 2600);
  }

  function saveRecords() {
    localStorage.setItem(STORE_KEY, JSON.stringify(records));
  }

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  function saveReportCache() {
    localStorage.setItem(REPORT_CACHE_KEY, JSON.stringify(weeklyReportCache));
  }

  // 앱 시작 시 localStorage에 남아 있는 기록, 설정, 리포트를 한 번에 복원한다.
  function loadStorage() {
    try {
      var rawRecords = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
      if (!Array.isArray(rawRecords)) rawRecords = [];
      records = rawRecords.map(normalizeRecord).filter(Boolean);
      saveRecords();
    } catch (error) {
      records = [];
    }

    try {
      var rawSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
      settings.apiKey = String(rawSettings.apiKey || "");
      settings.model = String(rawSettings.model || DEFAULT_MODEL);
      settings.verifiedAt = String(rawSettings.verifiedAt || "");
    } catch (error) {
      settings = { apiKey: "", model: DEFAULT_MODEL, verifiedAt: "" };
    }

    try {
      weeklyReportCache = JSON.parse(localStorage.getItem(REPORT_CACHE_KEY) || "null");
    } catch (error) {
      weeklyReportCache = null;
    }
  }

  function buildBackupPayload() {
    return {
      app: "cbt-mind-lab",
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      records: records,
      settings: {
        model: getModelName()
      }
    };
  }

  function updateBackupStatus(extraText) {
    var el = $("backup-status");
    if (!el) return;

    var base = "저장된 기록 " + records.length + "건";
    var safe = "백업 파일에는 API 키가 포함되지 않습니다.";
    el.textContent = extraText ? extraText + " · " + base + " · " + safe : base + " · " + safe;
  }

  function downloadJsonFile(filename, payload) {
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function() {
      URL.revokeObjectURL(url);
    }, 0);
  }

  function exportRecordsBackup() {
    var payload = buildBackupPayload();
    var filename = "cbt-mind-backup-" + formatStamp(payload.exportedAt) + ".json";
    downloadJsonFile(filename, payload);
    updateBackupStatus("백업 파일을 내보냈습니다");
    toast("기록 백업 파일을 내보냈습니다.", "success");
  }

  function importBackupPayload(payload) {
    var rawRecords = null;

    if (Array.isArray(payload)) {
      rawRecords = payload;
    } else if (payload && Array.isArray(payload.records)) {
      rawRecords = payload.records;
    }

    if (!rawRecords) {
      throw new Error("지원하지 않는 백업 형식입니다.");
    }

    var imported = rawRecords.map(normalizeRecord).filter(Boolean);
    if (!imported.length && rawRecords.length) {
      throw new Error("백업 파일에서 불러올 기록을 찾지 못했습니다.");
    }

    var mergedMap = {};
    var i;

    for (i = 0; i < records.length; i++) {
      mergedMap[String(records[i].id)] = records[i];
    }
    for (i = 0; i < imported.length; i++) {
      mergedMap[String(imported[i].id)] = imported[i];
    }

    records = Object.keys(mergedMap).map(function(key) {
      return mergedMap[key];
    }).sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    if (payload && payload.settings && payload.settings.model) {
      settings.model = String(payload.settings.model || DEFAULT_MODEL);
      $("model-name").value = settings.model;
      saveSettings();
    }

    saveRecords();
    invalidateWeeklyCache();
    refreshDashboard();
    renderReport("local");
    updateBackupStatus("백업 파일을 불러왔습니다");
    toast("백업 파일을 불러와 로컬 저장소에 반영했습니다.", "success");
  }

  function getDistMeta(name) {
    if (DIST[name]) return DIST[name];
    return {
      icon: "fa-magnifying-glass",
      color: "#6f766f",
      desc: "입력된 생각에서 뚜렷한 특정 왜곡이 강하게 드러나지 않았습니다."
    };
  }

  function normalizeDistortionItem(item) {
    var name = DIST[item && item.name] || item && item.name === NONE_DISTORTION ? item.name : NONE_DISTORTION;
    var meta = getDistMeta(name);
    return {
      name: name,
      confidence: clamp(parseInt(item && item.confidence, 10) || 40, 0, 100),
      reason: String(item && item.reason || meta.desc),
      evidence: String(item && item.evidence || ""),
      icon: meta.icon,
      color: meta.color,
      desc: meta.desc
    };
  }

  function normalizeAnalysisObject(raw, record) {
    var fallback = getRuleBasedAnalysis(record, "");
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return fallback;

    var distortions = Array.isArray(raw.distortions) ? raw.distortions.map(normalizeDistortionItem) : fallback.distortions;
    if (!distortions.length) distortions = fallback.distortions;

    var questions = dedupeStrings(Array.isArray(raw.reflectionQuestions) ? raw.reflectionQuestions : fallback.reflectionQuestions, 3);
    var alternatives = dedupeStrings(Array.isArray(raw.alternativeThoughts) ? raw.alternativeThoughts : fallback.alternativeThoughts, 3);

    return {
      summary: String(raw.summary || fallback.summary),
      distortions: distortions.slice(0, 3),
      reflectionQuestions: questions.length ? questions : fallback.reflectionQuestions,
      alternativeThoughts: alternatives.length ? alternatives : fallback.alternativeThoughts,
      metacognitionInsight: String(raw.metacognitionInsight || fallback.metacognitionInsight),
      nextAction: String(raw.nextAction || fallback.nextAction),
      cautionNote: String(raw.cautionNote || fallback.cautionNote),
      source: String(raw.source || "fallback"),
      model: String(raw.model || fallback.model),
      fallbackReason: String(raw.fallbackReason || "")
    };
  }

  // 이전 버전 데이터와 현재 버전 데이터를 같은 분석 구조로 맞춘다.
  function normalizeLegacyAnalysis(raw) {
    if (!Array.isArray(raw) || !raw.length) return null;

    var distortions = raw.map(function(item) {
      return normalizeDistortionItem({
        name: item.name,
        confidence: 60,
        reason: item.desc,
        evidence: Array.isArray(item.q) && item.q.length ? item.q[0] : ""
      });
    }).slice(0, 3);

    var first = raw[0] || {};
    var qs = [];
    var alts = [];
    for (var i = 0; i < raw.length; i++) {
      if (Array.isArray(raw[i].q)) qs = qs.concat(raw[i].q);
      if (Array.isArray(raw[i].alt)) alts = alts.concat(raw[i].alt);
    }

    return {
      summary: first.desc || "기존 규칙 기반 분석 결과입니다.",
      distortions: distortions.length ? distortions : [normalizeDistortionItem({ name: NONE_DISTORTION, confidence: 40, reason: "기존 데이터", evidence: "" })],
      reflectionQuestions: dedupeStrings(qs, 3),
      alternativeThoughts: dedupeStrings(alts, 3),
      metacognitionInsight: "이 기록은 이전 버전에서 저장된 데이터입니다. 현재 버전에서는 생각-감정-행동 연결 구조를 유지한 채 다시 분석할 수 있습니다.",
      nextAction: "같은 상황이 오면 생각을 문장으로 다시 적고, 근거가 있는지 차분하게 확인해보세요.",
      cautionNote: "이 결과는 자기점검용이며 전문 상담을 대체하지 않습니다.",
      source: "legacy-local",
      model: "rule-engine-legacy",
      fallbackReason: ""
    };
  }

  function normalizeRecord(raw) {
    if (!raw || typeof raw !== "object") return null;

    var record = {
      id: raw.id || Date.now() + Math.floor(Math.random() * 1000),
      date: raw.date || new Date().toISOString(),
      situation: String(raw.situation || raw.sit || "").trim(),
      thought: String(raw.thought || raw.tho || "").trim(),
      emotion: String(raw.emotion || raw.emo || "혼란").trim(),
      intensity: clamp(parseInt(raw.intensity || raw.int || 5, 10) || 5, 1, 10),
      behavior: String(raw.behavior || raw.beh || "").trim(),
      analysis: null
    };

    if (Array.isArray(raw.analysis)) {
      record.analysis = normalizeLegacyAnalysis(raw.analysis) || getRuleBasedAnalysis(record, "");
    } else {
      record.analysis = normalizeAnalysisObject(raw.analysis, record);
    }

    return record;
  }

  // 로컬 분석은 생각 문장의 키워드를 바탕으로 왜곡 후보를 빠르게 추정한다.
  function rankDistortions(thought) {
    var text = String(thought || "");
    var ranked = [];

    for (var i = 0; i < DIST_NAMES.length; i++) {
      var name = DIST_NAMES[i];
      var meta = DIST[name];
      var matched = [];
      for (var j = 0; j < meta.kw.length; j++) {
        if (text.indexOf(meta.kw[j]) !== -1) matched.push(meta.kw[j]);
      }
      if (!matched.length) continue;
      ranked.push({
        name: name,
        confidence: clamp(52 + matched.length * 12, 40, 96),
        reason: meta.desc,
        evidence: "감지된 표현: " + matched.slice(0, 3).join(", ")
      });
    }

    ranked.sort(function(a, b) {
      return b.confidence - a.confidence;
    });

    if (!ranked.length) {
      ranked.push({
        name: NONE_DISTORTION,
        confidence: 36,
        reason: "입력한 생각에서 특정 왜곡 키워드가 강하게 드러나지 않았습니다. 더 구체적인 문장으로 적으면 패턴이 보일 수 있습니다.",
        evidence: "명시적 왜곡 키워드가 적거나 중립적 서술이 많습니다."
      });
    }

    return ranked.slice(0, 3).map(normalizeDistortionItem);
  }

  // Gemini가 없거나 실패해도 결과를 끊지 않기 위한 로컬 규칙 기반 안전망이다.
  function getRuleBasedAnalysis(record, fallbackReason) {
    var distortions = rankDistortions(record.thought);
    var primary = distortions[0];
    var primaryMeta = getDistMeta(primary.name);
    var questions = [];
    var alternatives = [];

    for (var i = 0; i < distortions.length; i++) {
      var meta = getDistMeta(distortions[i].name);
      if (DIST[distortions[i].name]) {
        questions = questions.concat(DIST[distortions[i].name].q);
        alternatives = alternatives.concat(DIST[distortions[i].name].alt);
      } else {
        questions.push("이 생각이 사실이라는 근거와 반대 근거를 각각 적어볼 수 있을까요?");
        alternatives.push("지금은 불안하지만, 한 번의 결과가 모든 가능성을 결정하지는 않는다.");
      }
    }

    questions = dedupeStrings(questions, 3);
    alternatives = dedupeStrings(alternatives, 3);

    return {
      summary: primary.name === NONE_DISTORTION
        ? "현재 문장에서는 특정 왜곡 하나가 강하게 보이지 않지만, 생각을 더 구체적으로 적으면 패턴을 더 선명하게 볼 수 있습니다."
        : "입력한 생각에서는 \"" + primary.name + "\" 패턴이 가장 먼저 보입니다. 사건 자체보다 해석이 감정 강도와 행동 회피를 더 크게 키운 것으로 보입니다.",
      distortions: distortions,
      reflectionQuestions: questions.length ? questions : ["이 생각이 사실인지 확인할 수 있는 근거는 무엇인가요?", "다른 해석 가능성은 없을까요?"],
      alternativeThoughts: alternatives.length ? alternatives : ["지금 느끼는 불안이 곧 결과를 확정하는 것은 아니다.", "한 번의 결과가 내 전체 능력을 설명하지는 않는다."],
      metacognitionInsight: "상황 → 생각 → 감정 → 행동이 연결되어 있습니다. 특히 \"" + (record.thought || "자동 사고") + "\" 같은 문장이 감정 강도를 높이고 \"" + (record.behavior || "행동") + "\" 같은 반응으로 이어졌는지 관찰해보세요.",
      nextAction: "오늘은 자동 사고 문장을 한 줄 적은 뒤, 그 옆에 사실 근거 1개와 반대 근거 1개를 함께 써보세요.",
      cautionNote: "이 결과는 자기점검용이며 전문 상담이나 치료를 대체하지 않습니다.",
      source: "fallback",
      model: "rule-engine-v2",
      fallbackReason: String(fallbackReason || "")
    };
  }

  function hasApiKey() {
    return String(settings.apiKey || "").trim().length > 0;
  }

  function getModelName() {
    return String(settings.model || DEFAULT_MODEL).trim() || DEFAULT_MODEL;
  }

  function extractGeminiText(payload) {
    if (!payload || !payload.candidates || !payload.candidates.length) return "";
    var parts = payload.candidates[0] && payload.candidates[0].content && payload.candidates[0].content.parts;
    if (!Array.isArray(parts)) return "";
    var text = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] && typeof parts[i].text === "string") text += parts[i].text;
    }
    return text.trim();
  }

  // Gemini 응답을 JSON으로 고정해 이후 카드, 차트, 리포트에서 안정적으로 재사용한다.
  async function callGeminiJson(options) {
    if (!hasApiKey()) throw new Error("Gemini API 키가 없습니다.");

    var response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(getModelName()) + ":generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": settings.apiKey.trim()
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: options.systemInstruction }]
        },
        contents: [{
          role: "user",
          parts: [{ text: options.prompt }]
        }],
        generationConfig: {
          temperature: typeof options.temperature === "number" ? options.temperature : 0.35,
          responseMimeType: "application/json",
          responseJsonSchema: options.schema
        }
      })
    });

    var payload = {};
    try {
      payload = await response.json();
    } catch (error) {
      payload = {};
    }

    if (!response.ok) {
      var message = payload && payload.error && payload.error.message ? payload.error.message : "Gemini API 호출에 실패했습니다.";
      throw new Error(message);
    }

    var text = extractGeminiText(payload);
    if (!text) throw new Error("Gemini 응답이 비어 있습니다.");

    try {
      return JSON.parse(text);
    } catch (error) {
      throw new Error("Gemini 응답 JSON 파싱에 실패했습니다.");
    }
  }

  // 프롬프트는 발표 자료의 핵심 구조인 상황-생각-감정-행동 순서를 그대로 따른다.
  function buildAnalysisPrompt(record) {
    return [
      "다음 학생 기록을 CBT 관점에서 분석하세요.",
      "반드시 아래 인지 왜곡 목록에서만 선택하세요: " + DIST_WITH_NONE.join(", "),
      "학습 불안 상황에 맞는 쉬운 한국어로 설명하세요.",
      "전문 진단처럼 단정하지 말고, 자기점검용 피드백으로 작성하세요.",
      "상황: " + record.situation,
      "생각: " + record.thought,
      "감정: " + record.emotion + " / 강도 " + record.intensity + "점",
      "행동: " + record.behavior,
      "출력 규칙:",
      "- distortions는 가능성이 높은 순서로 1~3개",
      "- confidence는 0~100 정수",
      "- evidence는 원문에 기반한 짧은 근거",
      "- reflectionQuestions는 스스로 다시 생각해볼 질문 2~3개",
      "- alternativeThoughts는 균형 잡힌 대안 사고 2~3개",
      "- nextAction은 오늘 바로 할 수 있는 1단계 행동",
      "- cautionNote는 한 문장",
      "JSON만 반환하세요."
    ].join("\n");
  }

  function buildAnalysisSystemInstruction() {
    return [
      "너는 한국어 CBT 기록 보조 시스템이다.",
      "사용자의 생각을 안전하고 교육적인 톤으로 요약하되, 의학적 진단이나 확정적 판정은 하지 않는다.",
      "학습 불안 맥락에 집중하고, 감정-생각-행동 연결을 이해하도록 돕는다."
    ].join(" ");
  }

  // 실제 분석 진입점: AI 우선, 실패 시 로컬 분석으로 폴백한다.
  async function analyzeRecord(record) {
    var fallback = getRuleBasedAnalysis(record, "");
    if (!hasApiKey()) {
      fallback.fallbackReason = "Gemini API 키가 저장되지 않아 로컬 규칙 분석을 사용했습니다.";
      return fallback;
    }

    try {
      var raw = await callGeminiJson({
        systemInstruction: buildAnalysisSystemInstruction(),
        prompt: buildAnalysisPrompt(record),
        schema: ANALYSIS_SCHEMA,
        temperature: 0.25
      });

      var normalized = normalizeAnalysisObject({
        summary: raw.summary,
        distortions: raw.distortions,
        reflectionQuestions: raw.reflectionQuestions,
        alternativeThoughts: raw.alternativeThoughts,
        metacognitionInsight: raw.metacognitionInsight,
        nextAction: raw.nextAction,
        cautionNote: raw.cautionNote,
        source: "gemini",
        model: getModelName()
      }, record);

      normalized.source = "gemini";
      normalized.model = getModelName();
      return normalized;
    } catch (error) {
      fallback.fallbackReason = error.message;
      return fallback;
    }
  }

  // 최근 7일 기록으로 감정 강도, 주요 감정, 주요 왜곡, 추세를 계산한다.
  function buildWeeklyStats() {
    var now = new Date();
    var weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    var weekRecords = records.filter(function(record) {
      return new Date(record.date) >= weekAgo;
    });

    weekRecords.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    var intensitySum = 0;
    var emotionCounts = {};
    var distortionCounts = {};
    for (var i = 0; i < weekRecords.length; i++) {
      intensitySum += weekRecords[i].intensity;
      emotionCounts[weekRecords[i].emotion] = (emotionCounts[weekRecords[i].emotion] || 0) + 1;
      var primaryName = weekRecords[i].analysis && weekRecords[i].analysis.distortions && weekRecords[i].analysis.distortions[0] ? weekRecords[i].analysis.distortions[0].name : NONE_DISTORTION;
      if (primaryName !== NONE_DISTORTION) {
        distortionCounts[primaryName] = (distortionCounts[primaryName] || 0) + 1;
      }
    }

    var topEmotion = topEntry(emotionCounts) || [weekRecords[0] ? weekRecords[0].emotion : "없음", 0];
    var topDistortion = topEntry(distortionCounts) || [NONE_DISTORTION, 0];
    var avgIntensity = weekRecords.length ? (intensitySum / weekRecords.length) : 0;

    var half = Math.floor(weekRecords.length / 2);
    var firstHalf = weekRecords.slice(0, half || weekRecords.length);
    var secondHalf = weekRecords.slice(half || 0);
    var firstAvg = averageIntensity(firstHalf);
    var secondAvg = averageIntensity(secondHalf);
    var diff = secondAvg - firstAvg;
    var trendLabel = diff > 0.6 ? "증가 추세" : diff < -0.6 ? "감소 추세" : "안정적";

    return {
      from: weekAgo,
      to: now,
      records: weekRecords,
      total: weekRecords.length,
      avgIntensity: avgIntensity,
      topEmotion: { name: topEmotion[0], count: topEmotion[1] || 0 },
      topDistortion: { name: topDistortion[0], count: topDistortion[1] || 0 },
      trend: { diff: diff, label: trendLabel },
      signature: weekRecords.map(function(item) { return item.id; }).join("|"),
      recentSamples: weekRecords.slice(-8).map(function(item) {
        return {
          date: formatDateTime(item.date),
          situation: item.situation,
          thought: item.thought,
          emotion: item.emotion,
          intensity: item.intensity,
          behavior: item.behavior,
          primaryDistortion: item.analysis && item.analysis.distortions && item.analysis.distortions[0] ? item.analysis.distortions[0].name : NONE_DISTORTION
        };
      })
    };
  }

  function averageIntensity(list) {
    if (!list.length) return 0;
    var sum = 0;
    for (var i = 0; i < list.length; i++) sum += list[i].intensity;
    return sum / list.length;
  }

  function topEntry(objectMap) {
    var entries = [];
    for (var key in objectMap) {
      entries.push([key, objectMap[key]]);
    }
    entries.sort(function(a, b) {
      return b[1] - a[1];
    });
    return entries[0] || null;
  }

  // AI 리포트가 없을 때도 발표 가능한 수준의 요약을 만들도록 로컬 리포트를 유지한다.
  function buildLocalWeeklyReport(stats, reason) {
    if (!stats.total) {
      return {
        summary: "최근 7일 내 기록이 없어 주간 리포트를 만들 수 없습니다. 먼저 1건 이상 기록을 저장해보세요.",
        patternHighlights: ["기록이 있어야 감정 변화와 왜곡 패턴을 확인할 수 있습니다.", "폼 입력 또는 대화형 입력 중 편한 방식으로 시작하면 됩니다."],
        emotionalTrend: "데이터 없음",
        recommendedExercises: ["오늘 있었던 학습 스트레스 상황 한 가지를 떠올려 기록하기", "자동 사고를 한 문장으로 적고 감정 강도를 1~10점으로 표시하기"],
        nextWeekFocus: "이번 주는 기록 습관 만들기에 집중하세요.",
        warningSignal: "강한 불안이나 우울이 반복된다면 주변 도움을 일찍 요청하는 것이 좋습니다.",
        source: "fallback",
        model: "local-report-v1",
        fallbackReason: reason || ""
      };
    }

    var topDistMeta = DIST[stats.topDistortion.name];
    var patternHighlights = [];
    patternHighlights.push("이번 주 기록은 총 " + stats.total + "건이며 평균 감정 강도는 " + stats.avgIntensity.toFixed(1) + "점이었습니다.");
    patternHighlights.push("가장 자주 나온 감정은 \"" + stats.topEmotion.name + "\"이고 " + stats.topEmotion.count + "건에서 나타났습니다.");
    if (stats.topDistortion.name !== NONE_DISTORTION) {
      patternHighlights.push("가장 자주 관찰된 사고 패턴은 \"" + stats.topDistortion.name + "\"이며 " + stats.topDistortion.count + "건에서 반복되었습니다.");
    } else {
      patternHighlights.push("아직 특정 왜곡이 강하게 반복되기보다 다양한 생각이 섞여 나타났습니다.");
    }

    var exercises = [];
    if (topDistMeta) {
      exercises = dedupeStrings(topDistMeta.q.concat(topDistMeta.alt), 3);
    } else {
      exercises = [
        "자동 사고 문장 옆에 사실 근거 1개와 반대 근거 1개 적기",
        "감정 강도가 높은 상황만 따로 모아 반복 패턴 보기",
        "완벽한 표현 대신 중간 표현을 사용해 다시 문장 만들기"
      ];
    }

    return {
      summary: "이번 주에는 학습 상황에서 감정 강도가 " + stats.trend.label + "를 보였습니다. 반복되는 감정과 생각 패턴을 보면, 사건보다 해석 방식이 행동 회피를 더 크게 만들고 있을 가능성이 있습니다.",
      patternHighlights: patternHighlights,
      emotionalTrend: "주간 감정 흐름은 \"" + stats.trend.label + "\"입니다. 평균 강도 변화 차이는 " + stats.trend.diff.toFixed(1) + "점입니다.",
      recommendedExercises: exercises,
      nextWeekFocus: stats.topDistortion.name !== NONE_DISTORTION
        ? "\"" + stats.topDistortion.name + "\" 패턴이 보일 때마다 자동 사고를 1문장으로 적고, 그 문장을 조금 더 균형 잡힌 표현으로 바꾸는 연습을 해보세요."
        : "감정 강도가 높았던 순간을 더 구체적으로 기록해 반복 패턴을 선명하게 만드는 데 집중해보세요.",
      warningSignal: "감정 강도 8점 이상 기록이 반복되거나 회피 행동이 계속 늘어난다면, 혼자 버티기보다 상담 교사나 전문가와 상의하는 것이 좋습니다.",
      source: "fallback",
      model: "local-report-v1",
      fallbackReason: reason || ""
    };
  }

  function buildReportPrompt(stats) {
    return [
      "다음은 최근 7일간의 학습 불안 CBT 기록 통계와 샘플이다.",
      "학생이 이해하기 쉬운 한국어로 주간 리포트를 작성하라.",
      "전문 진단처럼 말하지 말고, 자기점검과 다음 주 연습 방향 제안에 집중하라.",
      "주간 통계:",
      JSON.stringify({
        total: stats.total,
        avgIntensity: Number(stats.avgIntensity.toFixed(1)),
        topEmotion: stats.topEmotion,
        topDistortion: stats.topDistortion,
        trend: stats.trend
      }),
      "최근 샘플:",
      JSON.stringify(stats.recentSamples),
      "출력 규칙:",
      "- summary는 이번 주 흐름을 3~4문장으로 설명",
      "- patternHighlights는 구체적 패턴 2~4개",
      "- emotionalTrend는 감정 흐름을 한 문단으로 설명",
      "- recommendedExercises는 다음 주 실천할 연습 2~4개",
      "- nextWeekFocus는 핵심 한 문단",
      "- warningSignal은 주의할 신호 한 문단",
      "JSON만 반환하라."
    ].join("\n");
  }

  // 주간 리포트도 기록 분석과 같은 이중 경로를 가진다: Gemini 또는 로컬 요약.
  async function generateAiWeeklyReport(stats) {
    var fallback = buildLocalWeeklyReport(stats, "");
    if (!hasApiKey()) {
      fallback.fallbackReason = "Gemini API 키가 없어 로컬 주간 리포트를 사용했습니다.";
      return fallback;
    }

    try {
      var raw = await callGeminiJson({
        systemInstruction: "너는 학습 불안 CBT 기록을 요약하는 한국어 AI 코치다. 학생이 이해하기 쉬운 말로 주간 패턴과 다음 주 실천 방향을 제안하라.",
        prompt: buildReportPrompt(stats),
        schema: REPORT_SCHEMA,
        temperature: 0.35
      });

      return {
        summary: String(raw.summary || fallback.summary),
        patternHighlights: dedupeStrings(Array.isArray(raw.patternHighlights) ? raw.patternHighlights : fallback.patternHighlights, 4),
        emotionalTrend: String(raw.emotionalTrend || fallback.emotionalTrend),
        recommendedExercises: dedupeStrings(Array.isArray(raw.recommendedExercises) ? raw.recommendedExercises : fallback.recommendedExercises, 4),
        nextWeekFocus: String(raw.nextWeekFocus || fallback.nextWeekFocus),
        warningSignal: String(raw.warningSignal || fallback.warningSignal),
        source: "gemini",
        model: getModelName(),
        fallbackReason: ""
      };
    } catch (error) {
      fallback.fallbackReason = error.message;
      return fallback;
    }
  }

  function setStatusPill(id, tone, icon, text) {
    var el = $(id);
    if (!el) return;
    el.className = "status-pill " + tone;
    el.innerHTML = "<i class=\"fa-solid " + icon + "\"></i><span>" + escapeHtml(text) + "</span>";
  }

  function syncModeStatus() {
    if (hasApiKey()) {
      var label = settings.verifiedAt ? "Gemini 연결 준비됨 · " + getModelName() : "Gemini 키 저장됨 · 테스트 권장";
      setStatusPill("api-status", settings.verifiedAt ? "status-good" : "status-warn", settings.verifiedAt ? "fa-circle-check" : "fa-circle-exclamation", label);
      setStatusPill("hero-ai-status", settings.verifiedAt ? "status-good" : "status-warn", settings.verifiedAt ? "fa-bolt" : "fa-circle-exclamation", settings.verifiedAt ? "Gemini 분석 모드로 준비되었습니다." : "Gemini 키는 저장됐지만 연결 테스트가 아직 없습니다.");
      $("api-note").textContent = "연결된 모델: " + getModelName() + (settings.verifiedAt ? " · 마지막 확인 " + settings.verifiedAt : " · 연결 테스트를 눌러 확인하세요.");
    } else {
      setStatusPill("api-status", "status-warn", "fa-circle-exclamation", "저장된 API 키 없음");
      setStatusPill("hero-ai-status", "status-warn", "fa-circle-exclamation", "현재 로컬 규칙 분석 모드입니다.");
      $("api-note").textContent = "Gemini 키가 없으면 기록 저장과 차트는 그대로 동작하지만, 분석 문장은 로컬 규칙 엔진이 생성합니다.";
    }
  }

  function renderDistortionCards() {
    var html = "";
    for (var i = 0; i < DIST_NAMES.length; i++) {
      var name = DIST_NAMES[i];
      var meta = DIST[name];
      html += "<article class=\"distortion-card\">";
      html += "<div class=\"distortion-card-head\">";
      html += "<span style=\"background:" + meta.color + "18; color:" + meta.color + ";\"><i class=\"fa-solid " + meta.icon + "\"></i></span>";
      html += "<strong style=\"margin:0; font-size:15px;\">" + escapeHtml(name) + "</strong>";
      html += "</div>";
      html += "<p>" + escapeHtml(meta.cardDesc || meta.desc) + "</p>";
      html += "</article>";
    }
    $("distortion-grid").innerHTML = html;
  }

  function renderEmotionChips() {
    var html = "";
    for (var i = 0; i < EMOTIONS.length; i++) {
      html += "<button type=\"button\" class=\"emotion-chip\" data-emotion=\"" + escapeHtml(EMOTIONS[i]) + "\">" + escapeHtml(EMOTIONS[i]) + "</button>";
    }
    $("emotion-grid").innerHTML = html;
  }

  function setSelectedEmotion(value) {
    selectedEmotion = value;
    var chips = $("emotion-grid").querySelectorAll(".emotion-chip");
    for (var i = 0; i < chips.length; i++) {
      chips[i].classList.toggle("selected", chips[i].getAttribute("data-emotion") === value);
    }
  }

  // 4단계 폼은 CBT 기록 순서를 그대로 UI 단계로 나눈 구조다.
  function updateFormUi() {
    for (var i = 0; i < 4; i++) {
      $("step-" + i).classList.toggle("active", i === formStep);
    }

    var labels = ["상황 입력", "생각 입력", "감정 입력", "행동 입력"];
    $("step-label").textContent = (formStep + 1) + " / 4 · " + labels[formStep];
    $("progress-bar").style.width = ((formStep + 1) * 25) + "%";

    var dots = $("step-dots").children;
    for (var j = 0; j < dots.length; j++) {
      dots[j].classList.toggle("active", j <= formStep);
    }

    $("prev-step").style.display = formStep === 0 ? "none" : "inline-flex";
    $("next-step").innerHTML = formStep === 3
      ? "<i class=\"fa-solid fa-wand-magic-sparkles\"></i> 분석하고 저장"
      : "다음 <i class=\"fa-solid fa-arrow-right\"></i>";
  }

  function getFormRecord() {
    return {
      id: Date.now(),
      date: new Date().toISOString(),
      situation: $("field-situation").value.trim(),
      thought: $("field-thought").value.trim(),
      emotion: selectedEmotion || "혼란",
      intensity: clamp(parseInt($("field-intensity").value, 10) || 5, 1, 10),
      behavior: $("field-behavior").value.trim(),
      analysis: null
    };
  }

  function validateCurrentStep() {
    if (formStep === 0) return $("field-situation").value.trim().length >= 8;
    if (formStep === 1) return $("field-thought").value.trim().length >= 6;
    if (formStep === 2) return !!selectedEmotion;
    if (formStep === 3) return $("field-behavior").value.trim().length >= 4;
    return false;
  }

  function setRecordStatus(text) {
    $("record-status").textContent = text || "";
  }

  function resetForm() {
    formStep = 0;
    selectedEmotion = null;
    $("field-situation").value = "";
    $("field-thought").value = "";
    $("field-behavior").value = "";
    $("field-intensity").value = "5";
    $("intensity-value").textContent = "5";
    setSelectedEmotion(null);
    updateFormUi();
    setRecordStatus("");
  }

  function setFormBusy(isBusy, label) {
    isFormBusy = isBusy;
    $("prev-step").disabled = isBusy;
    $("next-step").disabled = isBusy;
    $("next-step").innerHTML = isBusy
      ? "<i class=\"fa-solid fa-spinner fa-spin\"></i> " + escapeHtml(label || "분석 중")
      : (formStep === 3 ? "<i class=\"fa-solid fa-wand-magic-sparkles\"></i> 분석하고 저장" : "다음 <i class=\"fa-solid fa-arrow-right\"></i>");
  }

  function invalidateWeeklyCache() {
    weeklyReportCache = null;
    saveReportCache();
  }

  // 폼 입력의 핵심 저장 흐름: 검증 → 분석 → 저장 → 대시보드/리포트 갱신.
  async function submitFormRecord() {
    if (!validateCurrentStep()) {
      var errors = [
        "상황을 조금 더 구체적으로 적어주세요.",
        "자동 사고 문장을 6자 이상 적어주세요.",
        "감정을 선택해주세요.",
        "행동을 4자 이상 적어주세요."
      ];
      toast(errors[formStep], "warn");
      return;
    }

    if (formStep < 3) {
      formStep += 1;
      updateFormUi();
      return;
    }

    var record = getFormRecord();
    setFormBusy(true, "분석 중");
    setRecordStatus("기록을 저장하고 분석 중입니다...");

    var analysis = await analyzeRecord(record);
    record.analysis = analysis;
    records.unshift(record);
    saveRecords();
    invalidateWeeklyCache();
    refreshDashboard();
    renderReport(currentReportMode);
    showResult(record);
    resetForm();
    setFormBusy(false);

    if (analysis.source === "gemini") {
      toast("Gemini 분석이 완료되고 기록이 저장되었습니다.", "success");
    } else {
      toast("기록은 저장되었고 로컬 분석으로 결과를 생성했습니다.", "warn");
    }
  }

  function switchTab(tab) {
    var buttons = document.querySelectorAll(".tab-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle("active", buttons[i].getAttribute("data-tab") === tab);
    }

    $("form-panel").style.display = tab === "form" ? "block" : "none";
    $("chat-panel").classList.toggle("active", tab === "chat");
    if (tab === "chat" && !$("chat-log").children.length) initChat();
  }

  function addChatBubble(type, text) {
    var row = document.createElement("div");
    row.className = "bubble-row " + type;
    var bubble = document.createElement("div");
    bubble.className = "bubble " + (type === "user" ? "user" : "ai");
    bubble.textContent = text;
    row.appendChild(bubble);
    $("chat-log").appendChild(row);
    $("chat-log").scrollTop = $("chat-log").scrollHeight;
  }

  function showTyping() {
    var row = document.createElement("div");
    row.className = "bubble-row";
    row.id = "typing-row";
    row.innerHTML = "<div class=\"typing\"><span></span><span></span><span></span></div>";
    $("chat-log").appendChild(row);
    $("chat-log").scrollTop = $("chat-log").scrollHeight;
  }

  function hideTyping() {
    var el = $("typing-row");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function delay(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
  }

  function parseEmotionMessage(message) {
    var emotion = "혼란";
    for (var i = 0; i < EMOTIONS.length; i++) {
      if (message.indexOf(EMOTIONS[i]) !== -1) {
        emotion = EMOTIONS[i];
        break;
      }
    }

    var match = message.match(/(\d+)/);
    var intensity = match ? clamp(parseInt(match[1], 10) || 5, 1, 10) : 5;
    return {
      emotion: emotion,
      intensity: intensity
    };
  }

  function initChat() {
    chatStep = 0;
    chatData = {};
    $("chat-log").innerHTML = "";
    addChatBubble("ai", CHAT_STEPS[0].prompt);
    $("chat-input").value = "";
    $("chat-input").disabled = false;
    $("chat-send").disabled = false;
  }

  function setChatBusy(isBusy) {
    isChatBusy = isBusy;
    $("chat-input").disabled = isBusy;
    $("chat-send").disabled = isBusy;
    if (isBusy) {
      $("chat-send").innerHTML = "<i class=\"fa-solid fa-spinner fa-spin\"></i>";
    } else {
      $("chat-send").innerHTML = "<i class=\"fa-solid fa-paper-plane\"></i> 전송";
    }
  }

  async function sendChatMessage() {
    if (isChatBusy) return;
    var value = $("chat-input").value.trim();
    if (!value) return;

    addChatBubble("user", value);
    $("chat-input").value = "";

    var field = CHAT_STEPS[chatStep].field;
    if (field === "emotion") {
      var parsed = parseEmotionMessage(value);
      chatData.emotion = parsed.emotion;
      chatData.intensity = parsed.intensity;
    } else {
      chatData[field] = value;
    }

    chatStep += 1;

    if (chatStep < CHAT_STEPS.length) {
      setChatBusy(true);
      showTyping();
      await delay(700);
      hideTyping();
      addChatBubble("ai", CHAT_STEPS[chatStep].prompt);
      setChatBusy(false);
      $("chat-input").focus();
      return;
    }

    setChatBusy(true);
    showTyping();
    await delay(700);
    hideTyping();
    addChatBubble("ai", "기록이 정리되었습니다. 지금 바로 생각 패턴을 분석해볼게요.");

    var record = {
      id: Date.now(),
      date: new Date().toISOString(),
      situation: chatData.situation || "",
      thought: chatData.thought || "",
      emotion: chatData.emotion || "혼란",
      intensity: chatData.intensity || 5,
      behavior: chatData.behavior || "",
      analysis: null
    };

    var analysis = await analyzeRecord(record);
    record.analysis = analysis;
    records.unshift(record);
    saveRecords();
    invalidateWeeklyCache();
    refreshDashboard();
    renderReport(currentReportMode);
    showResult(record);
    initChat();
    setChatBusy(false);

    if (analysis.source === "gemini") {
      toast("대화형 기록이 저장되고 Gemini 분석이 완료되었습니다.", "success");
    } else {
      toast("대화형 기록은 저장되었고 로컬 분석으로 결과를 생성했습니다.", "warn");
    }
  }

  function fillSample(key) {
    var sample = SAMPLE_RECORDS[key];
    if (!sample) return;
    switchTab("form");
    $("field-situation").value = sample.situation;
    $("field-thought").value = sample.thought;
    $("field-behavior").value = sample.behavior;
    $("field-intensity").value = String(sample.intensity);
    $("intensity-value").textContent = String(sample.intensity);
    setSelectedEmotion(sample.emotion);
    setRecordStatus("예시 데이터가 채워졌습니다. 내용을 수정한 뒤 분석해도 됩니다.");
    formStep = 0;
    updateFormUi();
    toast("예시 기록을 채웠습니다.", "success");
  }

  function resultSourceBadge(analysis) {
    if (analysis.source === "gemini") {
      return "<span class=\"badge green\"><i class=\"fa-solid fa-robot\"></i> Gemini · " + escapeHtml(analysis.model) + "</span>";
    }
    return "<span class=\"badge sand\"><i class=\"fa-solid fa-compass\"></i> 로컬 분석</span>";
  }

  function renderTextList(items) {
    var html = "";
    for (var i = 0; i < items.length; i++) {
      html += "<div class=\"text-item\"><span>" + (i + 1) + ".</span><div>" + escapeHtml(items[i]) + "</div></div>";
    }
    return html;
  }

  function showResult(record) {
    var analysis = record.analysis || getRuleBasedAnalysis(record, "");
    var distortionHtml = "";

    for (var i = 0; i < analysis.distortions.length; i++) {
      var item = analysis.distortions[i];
      distortionHtml += "<article class=\"analysis-card\">";
      distortionHtml += "<div class=\"analysis-card-head\">";
      distortionHtml += "<div class=\"analysis-card-head-left\">";
      distortionHtml += "<span class=\"analysis-icon\" style=\"background:" + item.color + "18; color:" + item.color + ";\"><i class=\"fa-solid " + item.icon + "\"></i></span>";
      distortionHtml += "<div><strong style=\"margin-bottom: 4px;\">" + escapeHtml(item.name) + "</strong><div class=\"small-muted\">" + escapeHtml(item.reason) + "</div></div>";
      distortionHtml += "</div>";
      distortionHtml += "<span class=\"analysis-score\">가능성 " + item.confidence + "%</span>";
      distortionHtml += "</div>";
      if (item.evidence) {
        distortionHtml += "<p><strong style=\"font-size: 13px;\">판단 근거</strong><br>" + escapeHtml(item.evidence) + "</p>";
      }
      distortionHtml += "</article>";
    }

    var infoBlocks = "";
    infoBlocks += "<div class=\"text-stack\" style=\"margin-top: 18px;\">";
    infoBlocks += "<div class=\"text-block\"><h4><i class=\"fa-solid fa-lightbulb\" style=\"color: var(--green); margin-right: 8px;\"></i>AI 해석</h4><div class=\"text-list\"><div class=\"text-item\"><span>•</span><div>" + escapeHtml(analysis.summary) + "</div></div></div></div>";
    infoBlocks += "<div class=\"text-block\"><h4><i class=\"fa-solid fa-circle-question\" style=\"color: var(--green); margin-right: 8px;\"></i>다시 생각해볼 질문</h4><div class=\"text-list\">" + renderTextList(analysis.reflectionQuestions) + "</div></div>";
    infoBlocks += "<div class=\"text-block\"><h4><i class=\"fa-solid fa-scale-balanced\" style=\"color: var(--green); margin-right: 8px;\"></i>대안적 사고</h4><div class=\"text-list\">" + renderTextList(analysis.alternativeThoughts) + "</div></div>";
    infoBlocks += "<div class=\"text-block\"><h4><i class=\"fa-solid fa-brain\" style=\"color: var(--green); margin-right: 8px;\"></i>메타인지 힌트</h4><div class=\"text-list\"><div class=\"text-item\"><span>•</span><div>" + escapeHtml(analysis.metacognitionInsight) + "</div></div></div></div>";
    infoBlocks += "<div class=\"text-block\"><h4><i class=\"fa-solid fa-footprint\" style=\"color: var(--green); margin-right: 8px;\"></i>오늘의 1단계 행동</h4><div class=\"text-list\"><div class=\"text-item\"><span>•</span><div>" + escapeHtml(analysis.nextAction) + "</div></div></div></div>";
    infoBlocks += "<div class=\"analysis-note\">" + escapeHtml(analysis.cautionNote) + (analysis.fallbackReason ? "<br><br>폴백 사유: " + escapeHtml(analysis.fallbackReason) : "") + "</div>";
    infoBlocks += "</div>";

    $("result-body").innerHTML =
      "<div style=\"display:flex; flex-wrap:wrap; gap:10px; margin-bottom:14px;\">" +
      resultSourceBadge(analysis) +
      "<span class=\"badge gray\"><i class=\"fa-solid fa-clock\"></i> " + escapeHtml(formatDateTime(record.date)) + "</span>" +
      "<span class=\"badge gray\"><i class=\"fa-solid fa-heart\"></i> " + escapeHtml(record.emotion) + " " + record.intensity + "/10</span>" +
      "</div>" +
      "<div class=\"modal-grid\">" +
      "<div class=\"mini-card\"><small>상황</small><p>" + escapeHtml(record.situation) + "</p></div>" +
      "<div class=\"mini-card\"><small>생각</small><p>" + escapeHtml(record.thought) + "</p></div>" +
      "<div class=\"mini-card\"><small>감정</small><p>" + escapeHtml(record.emotion) + " · 강도 " + record.intensity + "/10</p></div>" +
      "<div class=\"mini-card\"><small>행동</small><p>" + escapeHtml(record.behavior) + "</p></div>" +
      "</div>" +
      "<div class=\"analysis-stack\">" + distortionHtml + "</div>" +
      infoBlocks;

    $("result-modal").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeResultModal() {
    $("result-modal").classList.remove("open");
    document.body.style.overflow = "";
  }

  // records 배열 하나를 기준으로 모든 시각화와 기록 목록을 다시 그린다.
  function refreshDashboard() {
    updateBackupStatus();
    if (!records.length) {
      $("dashboard-empty").style.display = "block";
      $("dashboard-shell").style.display = "none";
      return;
    }

    $("dashboard-empty").style.display = "none";
    $("dashboard-shell").style.display = "grid";
    drawLineChart();
    drawDonutChart();
    drawHeatmap();
    drawRecordList();
  }

  // 선 그래프는 날짜에 따른 감정 강도 변화를 보여준다.
  function drawLineChart() {
    var ctx = $("line-chart").getContext("2d");
    if (lineChart) lineChart.destroy();

    var ordered = records.slice().reverse();
    lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ordered.map(function(item) { return formatDateShort(item.date); }),
        datasets: [{
          data: ordered.map(function(item) { return item.intensity; }),
          borderColor: "#2f6f58",
          backgroundColor: "rgba(47, 111, 88, 0.12)",
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 5,
          tension: 0.35
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#173a2d",
            callbacks: {
              label: function(context) {
                return "감정 강도 " + context.raw + "/10";
              }
            }
          }
        },
        scales: {
          y: {
            min: 0,
            max: 10,
            ticks: { stepSize: 2 }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // 도넛 차트는 가장 자주 반복되는 왜곡 패턴이 무엇인지 보여준다.
  function drawDonutChart() {
    var ctx = $("donut-chart").getContext("2d");
    if (donutChart) donutChart.destroy();

    var counts = {};
    for (var i = 0; i < records.length; i++) {
      var primary = records[i].analysis && records[i].analysis.distortions && records[i].analysis.distortions[0] ? records[i].analysis.distortions[0].name : NONE_DISTORTION;
      if (primary === NONE_DISTORTION) continue;
      counts[primary] = (counts[primary] || 0) + 1;
    }

    var entries = [];
    for (var name in counts) entries.push([name, counts[name]]);
    entries.sort(function(a, b) { return b[1] - a[1]; });
    if (!entries.length) entries.push([NONE_DISTORTION, 1]);

    donutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: entries.map(function(item) { return item[0]; }),
        datasets: [{
          data: entries.map(function(item) { return item[1]; }),
          backgroundColor: entries.map(function(item) {
            return getDistMeta(item[0]).color;
          }),
          borderColor: "#fff",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "58%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              font: { size: 12 },
              usePointStyle: true
            }
          }
        }
      }
    });
  }

  // 히트맵은 언제 불안이 높아지는지 시간대와 요일 관점에서 읽게 한다.
  function drawHeatmap() {
    var dayLabels = ["월", "화", "수", "목", "금", "토", "일"];
    var timeLabels = ["오전", "오후", "저녁", "밤"];
    var grid = {};
    var i;

    for (i = 0; i < 7; i++) {
      for (var j = 0; j < 4; j++) {
        grid[i + "-" + j] = [];
      }
    }

    for (i = 0; i < records.length; i++) {
      var date = new Date(records[i].date);
      var day = date.getDay() - 1;
      if (day < 0) day = 6;
      var hour = date.getHours();
      var slot = hour < 6 ? 3 : hour < 12 ? 0 : hour < 18 ? 1 : 2;
      grid[day + "-" + slot].push(records[i].intensity);
    }

    function tone(values) {
      if (!values.length) {
        return "background: rgba(244, 239, 231, 0.9); color: #9a9588;";
      }
      var sum = 0;
      for (var k = 0; k < values.length; k++) sum += values[k];
      var avg = sum / values.length;
      var ratio = (avg - 1) / 9;
      var red = Math.round(126 + ratio * 72);
      var green = Math.round(178 - ratio * 72);
      var blue = Math.round(149 - ratio * 54);
      return "background: rgba(" + red + "," + green + "," + blue + "," + (0.22 + ratio * 0.55) + "); color:" + (ratio > 0.45 ? "#fff" : "#173a2d") + ";";
    }

    var html = "<table class=\"heat-table\"><thead><tr><th></th>";
    for (i = 0; i < timeLabels.length; i++) {
      html += "<th>" + timeLabels[i] + "</th>";
    }
    html += "</tr></thead><tbody>";

    for (i = 0; i < dayLabels.length; i++) {
      html += "<tr><td>" + dayLabels[i] + "</td>";
      for (var t = 0; t < timeLabels.length; t++) {
        var values = grid[i + "-" + t];
        var avgValue = values.length ? (values.reduce(function(a, b) { return a + b; }, 0) / values.length).toFixed(1) : "-";
        html += "<td><div class=\"heat-cell\" style=\"" + tone(values) + "\">" + avgValue + "</div></td>";
      }
      html += "</tr>";
    }

    html += "</tbody></table>";
    $("heatmap").innerHTML = html;
  }

  function drawRecordList() {
    var html = "";
    var visible = records.slice(0, 20);

    for (var i = 0; i < visible.length; i++) {
      var record = visible[i];
      var primary = record.analysis && record.analysis.distortions && record.analysis.distortions[0] ? record.analysis.distortions[0] : normalizeDistortionItem({ name: NONE_DISTORTION, confidence: 36, reason: "", evidence: "" });
      var sourceBadge = record.analysis && record.analysis.source === "gemini"
        ? "<span class=\"badge green\"><i class=\"fa-solid fa-robot\"></i> Gemini</span>"
        : "<span class=\"badge sand\"><i class=\"fa-solid fa-compass\"></i> 로컬</span>";

      html += "<article class=\"record-item\" data-record-id=\"" + record.id + "\">";
      html += "<div class=\"record-head\">";
      html += "<div style=\"flex:1; min-width:0;\">";
      html += "<div class=\"record-badges\">";
      html += "<span class=\"badge gray\"><i class=\"fa-solid fa-clock\"></i> " + escapeHtml(formatDateTime(record.date)) + "</span>";
      html += "<span class=\"badge gray\" style=\"background:" + primary.color + "18; color:" + primary.color + ";\"><i class=\"fa-solid " + primary.icon + "\"></i> " + escapeHtml(primary.name) + "</span>";
      html += sourceBadge;
      html += "</div>";
      html += "<p class=\"record-title\">" + escapeHtml(record.situation) + "</p>";
      html += "<div class=\"record-sub\">\"" + escapeHtml(record.thought) + "\"</div>";
      html += "</div>";
      html += "<div class=\"record-score\">";
      html += "<strong style=\"color:" + (record.intensity >= 7 ? "#b85d4c" : record.intensity >= 4 ? "#b78939" : "#2f6f58") + ";\">" + record.intensity + "</strong>";
      html += "<span>" + escapeHtml(record.emotion) + "</span>";
      html += "</div>";
      html += "</div>";
      html += "</article>";
    }

    $("record-list").innerHTML = html;
  }

  // 주간 리포트는 최근 7일 통계를 로컬 또는 AI 리포트로 변환해 렌더링한다.
  function renderReport(mode) {
    currentReportMode = mode || "local";
    var stats = buildWeeklyStats();
    var report;

    if (mode === "ai" && weeklyReportCache && weeklyReportCache.signature === stats.signature) {
      report = weeklyReportCache.report;
    } else {
      report = buildLocalWeeklyReport(stats, "");
      currentReportMode = "local";
    }

    setReportModeStatus(report);

    if (!stats.total) {
      $("report-box").innerHTML =
        "<div class=\"empty-card\">" +
        "<div class=\"empty-mark\"><i class=\"fa-solid fa-file-circle-plus\"></i></div>" +
        "<h3 style=\"margin-bottom: 10px;\">이번 주 기록이 없습니다</h3>" +
        "<p class=\"helper\" style=\"max-width: 520px; margin: 0 auto 18px;\">리포트는 최근 7일 기록을 기준으로 생성됩니다. 먼저 한 건 이상 기록한 뒤 다시 확인해주세요.</p>" +
        "<a href=\"#record\" class=\"btn primary\"><i class=\"fa-solid fa-pen\"></i> 기록 시작</a>" +
        "</div>";
      return;
    }

    $("report-box").innerHTML = buildReportHtml(stats, report);
  }

  function setReportModeStatus(report) {
    if (report.source === "gemini") {
      setStatusPill("report-mode-status", "status-good", "fa-robot", "Gemini 리포트 표시 중 · " + report.model);
    } else {
      setStatusPill("report-mode-status", "status-warn", "fa-table", "로컬 요약 리포트 표시 중");
    }
  }

  function buildReportHtml(stats, report) {
    var highlights = renderReportList(report.patternHighlights, "•");
    var exercises = renderReportList(report.recommendedExercises, "→");
    var topDistText = stats.topDistortion.name === NONE_DISTORTION ? "뚜렷한 우세 패턴 없음" : stats.topDistortion.name;

    return "" +
      "<article class=\"report-panel\">" +
        "<div class=\"report-header\">" +
          "<div>" +
            "<h3>최근 7일 리포트</h3>" +
            "<p>" + escapeHtml((stats.from.getMonth() + 1) + "/" + stats.from.getDate() + " ~ " + (stats.to.getMonth() + 1) + "/" + stats.to.getDate()) + " · 총 " + stats.total + "건 기록</p>" +
          "</div>" +
          resultSourceBadge(report) +
        "</div>" +

        "<div class=\"report-stats\">" +
          "<article class=\"report-stat\"><strong>" + stats.total + "</strong><span>최근 7일 기록 수</span></article>" +
          "<article class=\"report-stat\"><strong>" + stats.avgIntensity.toFixed(1) + "</strong><span>평균 감정 강도</span></article>" +
          "<article class=\"report-stat\"><strong>" + escapeHtml(stats.topEmotion.name) + "</strong><span>가장 많이 느낀 감정 · " + stats.topEmotion.count + "건</span></article>" +
          "<article class=\"report-stat\"><strong>" + escapeHtml(topDistText) + "</strong><span>주요 왜곡 패턴 · " + stats.topDistortion.count + "건</span></article>" +
        "</div>" +

        "<div class=\"report-block\">" +
          "<h4><i class=\"fa-solid fa-lightbulb\" style=\"color: var(--green); margin-right: 8px;\"></i>이번 주 요약</h4>" +
          "<p>" + escapeHtml(report.summary) + "</p>" +
        "</div>" +

        "<div class=\"report-insight-grid\">" +
          "<div class=\"report-block\">" +
            "<h4><i class=\"fa-solid fa-crosshairs\" style=\"color: var(--green); margin-right: 8px;\"></i>패턴 하이라이트</h4>" +
            "<div class=\"report-list\">" + highlights + "</div>" +
          "</div>" +
          "<div class=\"report-block\">" +
            "<h4><i class=\"fa-solid fa-chart-line\" style=\"color: var(--green); margin-right: 8px;\"></i>감정 흐름 해석</h4>" +
            "<p>" + escapeHtml(report.emotionalTrend) + "</p>" +
          "</div>" +
        "</div>" +

        "<div class=\"report-insight-grid\">" +
          "<div class=\"report-block\">" +
            "<h4><i class=\"fa-solid fa-dumbbell\" style=\"color: var(--green); margin-right: 8px;\"></i>다음 주 실천 과제</h4>" +
            "<div class=\"report-list\">" + exercises + "</div>" +
          "</div>" +
          "<div class=\"report-block\">" +
            "<h4><i class=\"fa-solid fa-bullseye\" style=\"color: var(--green); margin-right: 8px;\"></i>다음 주 초점</h4>" +
            "<p>" + escapeHtml(report.nextWeekFocus) + "</p>" +
            "<div class=\"analysis-note\" style=\"margin-top: 14px;\">" + escapeHtml(report.warningSignal) + (report.fallbackReason ? "<br><br>폴백 사유: " + escapeHtml(report.fallbackReason) : "") + "</div>" +
          "</div>" +
        "</div>" +
      "</article>";
  }

  function renderReportList(items, marker) {
    var html = "";
    for (var i = 0; i < items.length; i++) {
      html += "<div class=\"report-list-item\"><span>" + escapeHtml(marker) + "</span><div>" + escapeHtml(items[i]) + "</div></div>";
    }
    return html;
  }

  function applySavedSettingsToInputs() {
    $("api-key").value = settings.apiKey || "";
    $("model-name").value = settings.model || DEFAULT_MODEL;
  }

  // 실제 분석 전에 API 키와 모델 응답을 확인하는 연결 검증 단계다.
  async function testGeminiConnection() {
    if (!String($("api-key").value).trim()) {
      toast("먼저 Gemini API 키를 입력해주세요.", "warn");
      return;
    }

    settings.apiKey = $("api-key").value.trim();
    settings.model = $("model-name").value.trim() || DEFAULT_MODEL;
    saveSettings();
    syncModeStatus();

    var button = $("test-api");
    button.disabled = true;
    button.innerHTML = "<i class=\"fa-solid fa-spinner fa-spin\"></i> 테스트 중";

    try {
      var raw = await callGeminiJson({
        systemInstruction: "짧은 연결 테스트를 위한 시스템이다.",
        prompt: "연결 테스트입니다. {ok:boolean, message:string} 형태로 짧게 응답하세요.",
        schema: {
          type: "object",
          properties: {
            ok: { type: "boolean" },
            message: { type: "string" }
          },
          required: ["ok", "message"]
        },
        temperature: 0
      });

      settings.verifiedAt = new Date().toLocaleString("ko-KR");
      saveSettings();
      syncModeStatus();
      toast("Gemini 연결이 확인되었습니다.", "success");
      $("api-note").textContent = "연결 테스트 통과: " + String(raw.message || "응답 확인 완료");
    } catch (error) {
      settings.verifiedAt = "";
      saveSettings();
      syncModeStatus();
      toast("연결 테스트에 실패했습니다. 로컬 폴백은 계속 사용 가능합니다.", "error");
      $("api-note").textContent = "연결 오류: " + error.message;
    } finally {
      button.disabled = false;
      button.innerHTML = "<i class=\"fa-solid fa-wifi\"></i> 연결 테스트";
    }
  }

  function loadDemoData() {
    var now = Date.now();
    var day = 24 * 60 * 60 * 1000;
    var demo = [
      { off: -6, key: "exam" },
      { off: -5, key: "presentation" },
      { off: -4, key: "deadline" },
      { off: -3, data: {
        situation: "국어 시험에서 85점을 받았는데 예상보다 낮아서 성적표를 계속 다시 봤다.",
        thought: "85점이면 거의 0점이나 마찬가지야. 상위권은 다 95점 이상인데 나만 못했어.",
        emotion: "수치심",
        intensity: 6,
        behavior: "성적표를 가방 안쪽에 숨기고 복습 계획을 세우지 않았다."
      }},
      { off: -2, data: {
        situation: "학원에서 선생님이 이 문제는 쉬웠다고 말했는데 나는 못 풀었다.",
        thought: "다들 쉬운데 나만 못 풀었어. 나는 바보 같고 앞으로도 계속 이럴 거야.",
        emotion: "무기력",
        intensity: 8,
        behavior: "남은 시간 내내 문제를 보지 못하고 멍하게 앉아 있었다."
      }},
      { off: -1, data: {
        situation: "친구가 요즘 공부 많이 하네라고 말했을 때 순간적으로 마음이 불편했다.",
        thought: "저 말은 나를 비꼬는 거야. 속으로는 내가 못한다고 생각할 거야.",
        emotion: "짜증",
        intensity: 5,
        behavior: "대답을 짧게 하고 자리를 피했다."
      }}
    ];

    for (var i = 0; i < demo.length; i++) {
      var payload = demo[i].data || SAMPLE_RECORDS[demo[i].key];
      var record = {
        id: now + demo[i].off * day + Math.floor(Math.random() * 1000),
        date: new Date(now + demo[i].off * day + 1000 * 60 * 60 * (i + 1)).toISOString(),
        situation: payload.situation,
        thought: payload.thought,
        emotion: payload.emotion,
        intensity: payload.intensity,
        behavior: payload.behavior,
        analysis: null
      };
      record.analysis = getRuleBasedAnalysis(record, "데모 데이터는 로컬 분석으로 생성되었습니다.");
      records.unshift(record);
    }

    saveRecords();
    invalidateWeeklyCache();
    refreshDashboard();
    renderReport(currentReportMode);
    toast("데모 데이터가 추가되었습니다.", "success");
  }

  function updateNav() {
    var ids = ["about", "design", "setup", "record", "dashboard", "report"];
    var current = "";
    for (var i = 0; i < ids.length; i++) {
      var section = $(ids[i]);
      if (section && section.getBoundingClientRect().top <= 160) current = ids[i];
    }

    var links = document.querySelectorAll(".nav-link, .mobile-link");
    for (var j = 0; j < links.length; j++) {
      links[j].classList.toggle("active", links[j].getAttribute("href") === "#" + current);
    }
  }

  function observeReveal() {
    var observer = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) entries[i].target.classList.add("visible");
      }
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    });

    var targets = document.querySelectorAll(".reveal");
    for (var i = 0; i < targets.length; i++) observer.observe(targets[i]);
  }

  // 화면의 모든 버튼과 입력창을 실제 기능 함수에 연결하는 허브다.
  function bindEvents() {
    $("emotion-grid").addEventListener("click", function(event) {
      var button = event.target.closest(".emotion-chip");
      if (!button) return;
      setSelectedEmotion(button.getAttribute("data-emotion"));
    });

    $("field-intensity").addEventListener("input", function(event) {
      $("intensity-value").textContent = event.target.value;
    });

    $("next-step").addEventListener("click", function() {
      if (isFormBusy) return;
      submitFormRecord();
    });

    $("prev-step").addEventListener("click", function() {
      if (isFormBusy || formStep === 0) return;
      formStep -= 1;
      updateFormUi();
    });

    var tabButtons = document.querySelectorAll(".tab-btn");
    for (var i = 0; i < tabButtons.length; i++) {
      tabButtons[i].addEventListener("click", function() {
        switchTab(this.getAttribute("data-tab"));
      });
    }

    $("chat-send").addEventListener("click", sendChatMessage);
    $("chat-input").addEventListener("keydown", function(event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendChatMessage();
      }
    });

    document.addEventListener("click", function(event) {
      var sampleButton = event.target.closest(".sample-btn");
      if (sampleButton) {
        fillSample(sampleButton.getAttribute("data-sample"));
      }

      var recordItem = event.target.closest(".record-item");
      if (recordItem) {
        var id = String(recordItem.getAttribute("data-record-id"));
        var record = records.find(function(item) { return String(item.id) === id; });
        if (record) showResult(record);
      }
    });

    $("close-modal").addEventListener("click", closeResultModal);
    $("result-modal").addEventListener("click", function(event) {
      if (event.target === $("result-modal")) closeResultModal();
    });
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") closeResultModal();
    });

    $("save-api").addEventListener("click", function() {
      settings.apiKey = $("api-key").value.trim();
      settings.model = $("model-name").value.trim() || DEFAULT_MODEL;
      settings.verifiedAt = "";
      saveSettings();
      syncModeStatus();
      toast(settings.apiKey ? "Gemini 설정을 저장했습니다." : "API 키가 비어 있어 로컬 모드로 유지됩니다.", settings.apiKey ? "success" : "warn");
    });

    $("clear-api").addEventListener("click", function() {
      settings = { apiKey: "", model: DEFAULT_MODEL, verifiedAt: "" };
      saveSettings();
      $("api-key").value = "";
      $("model-name").value = DEFAULT_MODEL;
      syncModeStatus();
      toast("저장된 Gemini 설정을 삭제했습니다.", "success");
    });

    $("test-api").addEventListener("click", testGeminiConnection);

    $("export-records").addEventListener("click", exportRecordsBackup);

    $("import-records").addEventListener("click", function() {
      $("backup-file").click();
    });

    $("backup-file").addEventListener("change", function(event) {
      var file = event.target.files && event.target.files[0];
      if (!file) return;

      var reader = new FileReader();
      reader.onload = function(loadEvent) {
        try {
          var parsed = JSON.parse(String(loadEvent.target.result || "{}"));
          importBackupPayload(parsed);
        } catch (error) {
          toast("백업 파일을 읽지 못했습니다. JSON 형식을 확인해주세요.", "error");
          updateBackupStatus("백업 불러오기에 실패했습니다");
        } finally {
          event.target.value = "";
        }
      };
      reader.onerror = function() {
        toast("백업 파일 읽기에 실패했습니다.", "error");
        updateBackupStatus("백업 불러오기에 실패했습니다");
        event.target.value = "";
      };
      reader.readAsText(file, "utf-8");
    });

    $("load-demo").addEventListener("click", loadDemoData);

    $("clear-records").addEventListener("click", function() {
      if (!records.length) return;
      if (!window.confirm("저장된 기록을 모두 삭제할까요?")) return;
      records = [];
      saveRecords();
      invalidateWeeklyCache();
      refreshDashboard();
      renderReport("local");
      toast("모든 기록을 삭제했습니다.", "success");
    });

    $("show-local-report").addEventListener("click", function() {
      renderReport("local");
    });

    $("generate-ai-report").addEventListener("click", async function() {
      var stats = buildWeeklyStats();
      if (!stats.total) {
        toast("최근 7일 기록이 있어야 주간 리포트를 생성할 수 있습니다.", "warn");
        return;
      }

      var button = $("generate-ai-report");
      button.disabled = true;
      button.innerHTML = "<i class=\"fa-solid fa-spinner fa-spin\"></i> 리포트 생성 중";

      var report = await generateAiWeeklyReport(stats);
      if (report.source === "gemini") {
        weeklyReportCache = {
          signature: stats.signature,
          report: report
        };
        saveReportCache();
        currentReportMode = "ai";
        $("report-box").innerHTML = buildReportHtml(stats, report);
        setReportModeStatus(report);
        toast("Gemini 주간 리포트를 생성했습니다.", "success");
      } else {
        currentReportMode = "local";
        renderReport("local");
        toast("Gemini 리포트 생성에 실패해 로컬 리포트를 표시했습니다.", "warn");
      }

      button.disabled = false;
      button.innerHTML = "<i class=\"fa-solid fa-robot\"></i> Gemini 리포트 생성";
    });

    $("mobile-toggle").addEventListener("click", function() {
      $("mobile-menu").classList.toggle("open");
      this.innerHTML = $("mobile-menu").classList.contains("open")
        ? "<i class=\"fa-solid fa-xmark\"></i>"
        : "<i class=\"fa-solid fa-bars\"></i>";
    });

    var mobileLinks = document.querySelectorAll(".mobile-link");
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener("click", function() {
        $("mobile-menu").classList.remove("open");
        $("mobile-toggle").innerHTML = "<i class=\"fa-solid fa-bars\"></i>";
      });
    }

    window.addEventListener("scroll", updateNav, { passive: true });
  }

  // 앱 부팅 순서: 저장소 복원 → 기본 UI 렌더링 → 이벤트 연결.
  function init() {
    loadStorage();
    renderDistortionCards();
    renderEmotionChips();
    applySavedSettingsToInputs();
    syncModeStatus();
    updateFormUi();
    refreshDashboard();
    renderReport("local");
    initChat();
    bindEvents();
    observeReveal();
    updateNav();
  }

  init();
