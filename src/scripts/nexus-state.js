const STORAGE_KEY = 'blackvaultNexus';

const LEVEL_THRESHOLDS = [0, 1000, 2500, 5000, 10000];

const DEFAULT_STATE = {
  xp: 0,
  level: 1,
  achievements: [],
  collectibles: {
    vaultKeys: 0,
    signalFragments: 0,
    realmFragments: 0,
    rareArtifacts: 0,
  },
  missions: {
    spinTheNexus: { progress: 0, target: 10, completed: false },
    break15Signals: { progress: 0, target: 15, completed: false },
    discover5VaultKeys: { progress: 0, target: 5, completed: false },
  },
  gameStats: {
    vaultSpin: { totalSpins: 0, bigWins: 0 },
    signalBreak: { totalBreaks: 0, perfectBreaks: 0, bestStreak: 0 },
    vaultKeys: { totalScans: 0, roundsCompleted: 0 },
  },
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_STATE),
      ...parsed,
      collectibles: { ...DEFAULT_STATE.collectibles, ...parsed.collectibles },
      missions: {
        spinTheNexus: { ...DEFAULT_STATE.missions.spinTheNexus, ...parsed.missions?.spinTheNexus },
        break15Signals: { ...DEFAULT_STATE.missions.break15Signals, ...parsed.missions?.break15Signals },
        discover5VaultKeys: { ...DEFAULT_STATE.missions.discover5VaultKeys, ...parsed.missions?.discover5VaultKeys },
      },
      gameStats: {
        vaultSpin: { ...DEFAULT_STATE.gameStats.vaultSpin, ...parsed.gameStats?.vaultSpin },
        signalBreak: { ...DEFAULT_STATE.gameStats.signalBreak, ...parsed.gameStats?.signalBreak },
        vaultKeys: { ...DEFAULT_STATE.gameStats.vaultKeys, ...parsed.gameStats?.vaultKeys },
      },
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function calculateLevel(xp) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

function getLevelProgress(xp, level) {
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || currentThreshold + 5000;
  const progress = xp - currentThreshold;
  const needed = nextThreshold - currentThreshold;
  return { progress, needed, percent: Math.min((progress / needed) * 100, 100) };
}

export function getState() {
  return load();
}

export function addXP(amount) {
  const state = load();
  state.xp += amount;
  state.level = calculateLevel(state.xp);
  save(state);
  return state;
}

export function unlockAchievement(id, title) {
  const state = load();
  if (state.achievements.find((a) => a.id === id)) return { state, isNew: false };
  state.achievements.push({ id, title, unlockedAt: Date.now() });
  save(state);
  return { state, isNew: true };
}

export function addCollectible(type, amount = 1) {
  const state = load();
  if (state.collectibles[type] !== undefined) {
    state.collectibles[type] += amount;
  }
  save(state);
  return state;
}

export function advanceMission(missionId, amount = 1) {
  const state = load();
  const mission = state.missions[missionId];
  if (!mission || mission.completed) return { state, justCompleted: false };
  mission.progress = Math.min(mission.progress + amount, mission.target);
  const justCompleted = mission.progress >= mission.target && !mission.completed;
  if (justCompleted) mission.completed = true;
  save(state);
  return { state, justCompleted };
}

export function updateGameStat(game, stat, value) {
  const state = load();
  if (state.gameStats[game]) {
    state.gameStats[game][stat] = value;
  }
  save(state);
  return state;
}

export function getXPInfo(state) {
  return getLevelProgress(state.xp, state.level);
}

export { LEVEL_THRESHOLDS };
