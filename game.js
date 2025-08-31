// =================================================================
//
//                      寄生史莱姆 - v0.3.0 (新增第二章)
//                      Game Logic File
//
// =================================================================

import * as gameData from './data.js';
import { LanguageManager } from './languageManager.js';
import { LANGS } from './language.js';
window.gameData = gameData; // <-- 添加这一行代码

const NUM_SAVE_SLOTS = 8; // <-- 【新增】定义存档栏位总数为 8
// 在 game.js 文件顶部
const GAME_VERSION = 2; // 定义当前游戏的最新版本号

const migrationScripts = {
    // 这个脚本负责将版本1 (或更早) 的存档升级到版本2
    2: (state) => {
        console.log("Running migration script to version 2...");

        // 【关键】非破坏性地迁移旧的、扁平化的 flag 进度
        // 检查旧的 flag 是否存在
        if (state.story.flags.songXinEverPossessed) {
            if (!state.hosts.song_xin) state.hosts.song_xin = {}; // 安全检查
            state.hosts.song_xin.wasEverPossessed = true;
            state.hosts.song_xin.isPuppet = true;
            console.log("Migrated: songXinEverPossessed -> wasEverPossessed = true");
            console.log("Migrated: songXinEverPossessed -> isPuppet = true");
        }
        if (state.story.flags.totalPossessionTriggered) {
            if (!state.hosts.song_wei) state.hosts.song_wei = {};
            state.hosts.song_wei.wasEverPossessed = true;
            console.log("Migrated: totalPossessionTriggered -> wasEverPossessed = true");
        }

        // 未来如果版本3修复了其他问题，你可以在这里添加：
        // 3: (state) => { ... }
        return state;
    }
};

// 在 game.js 文件中
// ▼▼▼ 请用这个代码块，完整替换掉现有的 StateManager 类 ▼▼▼
class StateManager {
    constructor() {
        const initialLang = new LanguageManager().getCurrentLanguageData();
        this.initialState = Object.freeze({
            version: GAME_VERSION,
            controlState: 'HOST',
            activeHostId: 'song_wei',
            chapter: 1,
            hosts: {
                // ... (您原有的 hosts 对象内容)
                'song_wei': {
                    name: initialLang['host_name_song_wei'],
                    stamina: 100, sanity: 100,
                    currentLocationId: 'home_bedroom',
                    expectedLocationId: 'home_bedroom',
                    isAiControlled: false,
                    status: 'ACTIVE',
                    isPuppet: false,
                    nsfwUsedThisSegment: false,
                    wasEverPossessed: false,
                    tags: ['song_wei_home', 'work', 'public', 'guest'],
                    portraits: {
                        normal: "image/特写/songwei_mormal.png",
                        controlled: "image/特写/songwei_ctrol.png"
                    },
                    events: {
                        reEnterEvent: 're_enter_song_wei',
                        detachImage: {
                            normal: "image/CG/宋薇/宿主模式/常规脱离躯体.png",
                            puppet: "image/CG/宋薇/接管模式/永久接管脱离躯体.png"
                        },
                        reEnterImage: {
                            normal: "image/CG/宋薇/宿主模式/常规返回躯体.png",
                            puppet: "image/CG/宋薇/接管模式/永久接管返回躯体.png"
                        },
                        returnControlDesc: {
                            mismatch: 'return_control_mismatch_desc',
                            match: 'return_control_match_desc'
                        },
                        sanityLossImage: "image/CG/宋薇/失去理智.png",
                    }

                },
                'song_xin': {
                    name: initialLang['host_name_song_xin'],
                    stamina: 100, sanity: 100,
                    currentLocationId: 'home_livingroom',
                    expectedLocationId: 'home_livingroom',
                    isAiControlled: false,
                    status: 'INACTIVE',
                    isPuppet: false,
                    nsfwUsedThisSegment: false,
                    wasEverPossessed: false,
                    tags: ['guest', 'public', 'song_xin', 'song_wei_home'],
                    portraits: {
                        normal: "image/特写/宋欣正常.png",
                        controlled: "image/特写/宋欣肖像.png"
                    },
                    events: {
                        reEnterEvent: 're_enter_song_xin',
                        initialTakeoverEvent: 'initial_song_xin_takeover',
                        detachImage: {
                            normal: "image/CG/宋欣/离开躯体.png",
                            puppet: "image/CG/宋欣/离开躯体.png"
                        },
                        reEnterImage: {
                            normal: "image/CG/宋欣/返回躯体.png",
                            puppet: "image/CG/宋欣/返回躯体.png"
                        },
                        returnControlDesc: {
                            mismatch: 'return_control_mismatch_desc',
                            match: 'return_control_match_desc'
                        }
                    }

                },
                'zhang_huili': {
                    name: initialLang['host_name_zhang_huili'],
                    stamina: 100, sanity: 100,
                    currentLocationId: 'huili_home_huili_bedroom',
                    expectedLocationId: 'huili_home_huili_bedroom',
                    isAiControlled: true,
                    status: 'INACTIVE',
                    isPuppet: false,
                    nsfwUsedThisSegment: false,
                    wasEverPossessed: false,
                    tags: ['zhang_huili', 'public', 'guest'],
                    portraits: {
                        normal: "image/特写/张慧丽正常.png",
                        controlled: "image/特写/张慧丽控制.png"
                    },
                    events: {
                        reEnterEvent: 're_enter_zhang_huili',
                        initialTakeoverEvent: 'initial_takeover_zhang_huili',
                        detachImage: {
                            normal: "image/CG/张慧丽/宿主模式/常规脱离躯体.png",
                            puppet: "image/CG/张慧丽/接管模式/永久接管脱离躯体.png"
                        },
                        sanityLossImage: "image/CG/张慧丽/失去理智.png",
                        reEnterImage: {
                            normal: "image/CG/张慧丽/宿主模式/常规返回躯体.png",
                            puppet: "image/CG/张慧丽/接管模式/永久接管返回躯体.png"
                        },
                        returnControlDesc: {
                            mismatch: 'return_control_mismatch_desc',
                            match: 'return_control_match_desc'
                        }
                    }
                },
                'liu_min': {
                    name: initialLang['host_name_liu_min'],
                    stamina: 100, sanity: 100,
                    currentLocationId: 'liumin_home_bedroom',
                    expectedLocationId: 'liumin_home_bedroom',
                    isAiControlled: true,
                    status: 'INACTIVE',
                    isPuppet: false,
                    nsfwUsedThisSegment: false,
                    wasEverPossessed: false,
                    tags: ['liu_min', 'public', 'guest'],
                    portraits: {
                        normal: "image/特写/刘敏正常.png",
                        controlled: "image/特写/刘敏控制.png"
                    },
                    events: {
                        reEnterEvent: 're_enter_liu_min',
                        initialTakeoverEvent: 'initial_takeover_liu_min',
                        detachImage: {
                            normal: "image/CG/刘敏/宿主模式/常规脱离躯体.png",
                            puppet: "image/CG/刘敏/接管模式/永久接管脱离躯体.png"
                        },
                        sanityLossImage: "image/CG/刘敏/失去理智.png",
                        reEnterImage: {
                            normal: "image/CG/刘敏/宿主模式/常规返回躯体.png",
                            puppet: "image/CG/刘敏/接管模式/永久接管返回躯体.png"
                        },
                        returnControlDesc: {
                            mismatch: 'return_control_mismatch_desc',
                            match: 'return_control_match_desc'
                        }
                    }
                },
                'jane': {
                    name: initialLang['host_name_jane'],
                    stamina: 100, sanity: 100,
                    currentLocationId: 'abandoned_warehouse',
                    expectedLocationId: 'abandoned_warehouse',
                    isAiControlled: true,
                    status: 'INACTIVE',
                    isPuppet: false,
                    nsfwUsedThisSegment: false,
                    wasEverPossessed: false,
                    tags: ['jane', 'public', 'guest'],
                    portraits: {
                        normal: "image/特写/Jane正常.png",
                        controlled: "image/特写/Jane控制.png"
                    },
                    events: {
                        reEnterEvent: 're_enter_jane',
                        initialTakeoverEvent: 'takeover_host_jane_event',
                        sanityLossImage: "image/CG/Jane/失去理智.png",
                        detachImage: {
                            normal: "image/CG/Jane/常规脱离.png",
                            puppet: "image/CG/Jane/永久接管脱离.png"
                        },
                        reEnterImage: {
                            normal: "image/CG/Jane/常规返回躯体.png",
                            puppet: "image/CG/Jane/永久接管返回躯体.png"
                        },
                        returnControlDesc: {
                            mismatch: 'return_control_mismatch_desc',
                            match: 'return_control_match_desc'
                        }
                    }
                },
            },
            slime: { mutationPoints: 0, skills: { global: {}, 'song_wei': {}, 'song_xin': {} }, totalRanks: 0, suspicion: 0, currentLocationId: null },
            time: { day: 1, dayOfWeek: 1, segment: 'morning-1' },
            story: {
                dailyFlow: 'none',
                nsfwActsToday: 0,
                mainQuest: null,
                countdown: { key: null, days: 0 },
                flags: {
                    chapter1: {
                        npc_song_xin: { memoryPlundered: false, invited: false, arrivalTime: -1 },
                        npc_zhang_chao: { rumorHeard: false },
                        main_quest_escape: { zhangChaoPlanKnown: false, escapePlanArrangedBySongWei: false, escapePlanFinalized: false },
                        secrets: {}
                    },
                    chapter2: {
                        investigation: {
                            camera_found: false,
                            water_system_found: false,
                            square_cameras_found: false,
                            office_met_zhao: false,
                            lake_found_warehouse_shadow: false,
                            plan_made: false
                        },
                        quests: {
                            liumin_home_unlocked: false,
                            warehouse_found: false,
                            jane_met: false,
                            jane_met_zhao: false
                        },
                        npc_zhang_huili: { memoryPlundered: false },
                        npc_liu_min: { memoryPlundered: false },
                        npc_jane: { memoryPlundered: false },
                        npc_zhao_qimin: {},
                        upgrades: {
                            special_store_discovered: false,
                            cameras_home_destroyed: false,
                            cameras_public_destroyed: false,
                            scp500_clone_purchased: false,
                            puppet_maintenance_level: 0
                        }
                    }
                }
            },
            npcs: {
                'zhang_chao': { name: initialLang['npc_name_zhang_chao'], favorability: 0, isPresent: false, met: false },
                'song_xin': { name: initialLang['host_name_song_xin'], favorability: 0, isPresent: false, met: false },
                'zhang_huili': { name: initialLang['npc_name_zhang_huili'], favorability: 0, isPresent: false, met: false },
                'liu_min': { name: initialLang['host_name_liu_min'], favorability: 0, isPresent: false, met: false },
                'zhao_qimin': { name: initialLang['npc_name_zhao_qimin'], favorability: 0, isPresent: false, met: false }
            },
            logs: [],
        });
        this.state = JSON.parse(JSON.stringify(this.initialState));
    }

    getState() { return this.state; }

    getActiveHost() {
        const state = this.getState();
        return state.activeHostId ? state.hosts[state.activeHostId] : null;
    }

    resetState() { this.state = JSON.parse(JSON.stringify(this.initialState)); }

    saveState(slot) {
        try {
            localStorage.setItem(`parasite_save_v8_${slot}`, JSON.stringify(this.state));
            return true;
        } catch (e) { console.error("Save failed:", e); return false; }
    }

    // 在 game.js 的 StateManager 类中
    loadState(slot) {
        const data = localStorage.getItem(`parasite_save_v8_${slot}`);
        if (data) {
            try {
                let loadedState = JSON.parse(data);

                // 【最终修复】定义一个健壮的存档合并/修补函数
                const deepMerge = (target, source) => {
                    let output = Array.isArray(target) ? [] : {};

                    Object.assign(output, target);

                    if (typeof target === 'object' && target !== null && typeof source === 'object' && source !== null) {
                        Object.keys(source).forEach(key => {
                            const sourceValue = source[key];
                            const targetValue = target[key];

                            if (sourceValue !== undefined) {
                                if (typeof targetValue === 'object' && targetValue !== null && typeof sourceValue === 'object' && sourceValue !== null && !Array.isArray(targetValue)) {
                                    output[key] = deepMerge(targetValue, sourceValue);
                                } else {
                                    output[key] = sourceValue;
                                }
                            }
                        });
                    }
                    return output;
                };

                const saveVersion = loadedState.version || 0;

                if (saveVersion < GAME_VERSION) {
                    console.log(`Old save detected (v${saveVersion}), updating to v${GAME_VERSION}...`);
                    for (let v = saveVersion + 1; v <= GAME_VERSION; v++) {
                        if (migrationScripts[v]) {
                            loadedState = migrationScripts[v](loadedState);
                        }
                    }
                }

                let freshState = JSON.parse(JSON.stringify(this.initialState));
                this.state = deepMerge(freshState, loadedState);
                this.state.version = GAME_VERSION;

                if (!Array.isArray(this.state.logs)) {
                    this.state.logs = [];
                }

                console.log("Save file successfully loaded and patched.");
                return true;

            } catch (error) {
                console.error("Failed to load or migrate save file:", error);
                return false;
            }
        }
        return false;
    }
}

class UIManager {
    constructor(game, languageManager) {
        this.game = game; // 保存 game 对象的引用
        this.dom = this.getDOMElements();
        this.languageManager = languageManager;
    }
    getDOMElements() {
        const ids = [
            // --- 新增的主菜单元素ID ---
            'start-menu', 'start-new-game-button', 'continue-game-button',
            'game-container', 'char-image', 'control-status-display', 'control-status-text', 'main-content', 'time-display', 'story-text',
            'choices-display', 'choices-title', 'choices-container', 'modal-overlay', 'generic-modal', 'modal-title', 'modal-content', 'modal-close-button',
            'confirm-modal', 'confirm-title', 'confirm-text', 'confirm-yes', 'confirm-no', 'takeover-screen', 'takeover-title', 'takeover-description', 'takeover-choices',
            'event-modal', 'event-text-box', 'event-title', 'event-description', 'event-choices-container',
            'tetris-modal', 'tetris-lines-left', 'tetris-skip-button',
            'toast-container', 'stat-hostname', 'stat-stamina', 'stat-sanity', 'stat-suspicion',
            'stat-mutation-points', 'stat-integration', 'intro-modal', 'intro-image', 'intro-title', 'intro-text', 'intro-next-button', 'gameover-modal',
            'gameover-title', 'gameover-text', 'gameover-restart-button', 'top-right-ui', 'task-ui', 'task-button', 'task-title', 'countdown-container', 'countdown-text',
            'favor-ui-container', 'extra-actions-container', 'location-event-button', 'enter-host-button', 'detach-status-display', 'detach-status-text', 'detach-button',
            'skill-tree-button', 'save-button', 'load-button', 'reset-button', 'cheat-button',
            'host-management-button', 'host-modal', 'host-modal-content', 'host-modal-close-button',
            'clicker-modal', 'clicker-progress-bar', 'clicker-timer', 'clicker-button',
            // ▼▼▼ 【核心修复】确保这两个新增的ID在这里被正确添加 ▼▼▼
            'chapter-select-modal', 'chapter-select-close-button',
            'modal-extra-buttons', 'import-save-button', 'import-file-input'
        ];
        return ids.reduce((acc, id) => {
            const propName = id.replace(/-(\w)/g, (_, g) => g.toUpperCase());
            acc[propName] = document.getElementById(id);
            return acc;
        }, {});
    }

    // 在 game.js 的 UIManager 类中
    // 在 UIManager 类中
    render(state, game) {
        const LANG = game.languageManager.getCurrentLanguageData();
        this.renderStats(state, game.skillManager, game.stateManager.getActiveHost(), LANG);
        this.renderScene(state, game, LANG);
        this.renderTopRightUI(state, LANG);
        this.renderHostManagementButton(state);

        // ▼▼▼ 【核心修复】将 SLIME 和 PERMANENT_SLIME 归为一类 ▼▼▼
        if (state.controlState === 'HOST') {
            // 只有在宿主模式下，才显示宿主的UI
            this.renderHostMode(state, game, game.stateManager.getActiveHost(), LANG);
        }
        else if (state.controlState === 'SLIME' || state.controlState === 'PERMANENT_SLIME') {
            // 临时的和永久的接管，都显示史莱姆的UI
            this.renderSlimeMode(state, game, game.stateManager.getActiveHost(), LANG);
        }
        else if (state.controlState === 'SLIME_DETACHED') {
            // 史莱姆独立行动的UI
            this.renderSlimeDetachedMode(state, game, LANG);
        }
    }

    renderHostManagementButton(state) {
        // 检查宋欣是否已经见面，如果见过，就显示宿主管理按钮
        const shouldShow = state.npcs.song_xin.met;
        this.dom.hostManagementButton.classList.toggle('hidden', !shouldShow);
    }

    // 文件: game.js

    renderStats(state, skillManager, activeHost, LANG) {
        if (!activeHost && state.controlState !== 'SLIME_DETACHED') return;
        let hostName, stamina, sanity;

        const isControlled = state.controlState === 'SLIME' || state.controlState === 'PERMANENT_SLIME';

        if (state.controlState === 'SLIME_DETACHED' && state.slime.detachedHostData) {
            hostName = state.slime.detachedHostData.name;
            stamina = Math.round(state.slime.detachedHostData.stamina);
            sanity = Math.round(state.slime.detachedHostData.sanity);
        } else if (activeHost) {
            hostName = activeHost.name;
            stamina = (state.controlState === 'PERMANENT_SLIME' ? '∞' : Math.round(activeHost.stamina));
            sanity = isControlled ? 0 : Math.round(activeHost.sanity);
        } else {
            hostName = "N/A"; stamina = 'N/A'; sanity = 'N/A';
        }

        this.dom.statHostname.textContent = hostName;
        this.dom.statStamina.textContent = stamina;
        this.dom.statSanity.textContent = sanity;
        this.dom.statSuspicion.textContent = Math.round(state.slime.suspicion);
        this.dom.statMutationPoints.textContent = state.slime.mutationPoints;
        this.dom.statIntegration.textContent = 1 + Math.floor(state.slime.totalRanks / 5);

        this.dom.controlStatusDisplay.classList.toggle('hidden', !isControlled);
        if (isControlled) { this.dom.controlStatusText.textContent = state.controlState === 'PERMANENT_SLIME' ? LANG['control_status_permanent'] : LANG['control_status_takeover']; }

        // ▼▼▼ 核心修正：将 'song_wei' 修改为 state.activeHostId ▼▼▼
        const canDetach = skillManager.getSkillRank('golden_cicada_shell', state.activeHostId) > 0 && (isControlled || state.controlState === 'SLIME_DETACHED');
        // ▲▲▲ 修正结束 ▲▲▲

        this.dom.detachStatusDisplay.classList.toggle('hidden', !canDetach);
        if (canDetach) {
            const isDetached = state.controlState === 'SLIME_DETACHED';
            this.dom.detachStatusText.textContent = isDetached ? LANG['detach_status_detached'] : LANG['detach_status_available'];
            this.dom.detachButton.textContent = isDetached ? LANG['detach_button_enter'] : LANG['detach_button_detach'];
            this.dom.detachButton.disabled = isDetached && this.game.getAvailableHostsToEnter().length === 0;
        }
    }

    renderScene(state, game, LANG) {
        const activeHost = game.stateManager.getActiveHost();
        const isDetached = state.controlState === 'SLIME_DETACHED';
        const currentLocationId = isDetached ? state.slime.currentLocationId : activeHost.currentLocationId;

        // 【修复】从 game 对象获取当前章节的地点数据
        const currentChapterLocations = game.getCurrentChapterLocations();
        const location = currentChapterLocations[currentLocationId];

        if (!location) { console.error(`Location data not found for ID: ${currentLocationId} in chapter ${state.chapter}`); return; }

        const dayOfWeek = LANG['time_weekday'][state.time.dayOfWeek - 1];
        const [timeOfDay, segment] = state.time.segment.split('-');
        const timeOfDayText = LANG['time_segment'][timeOfDay];
        let timeText = `${LANG['time_day']} ${state.time.day} (${dayOfWeek}) - ${timeOfDayText} (${segment}/2) - ${LANG[location.nameKey]}`;

        if (state.controlState === 'SLIME' || state.controlState === 'PERMANENT_SLIME') timeText = `<span class="slime-mode-text">${LANG['control_mode_prefix']}</span> ${timeText}`;
        if (isDetached) timeText = `<span class="slime-mode-text">${LANG['detached_mode_prefix']}</span> ${timeText}`;

        this.dom.timeDisplay.innerHTML = timeText;
        this.dom.mainContent.style.backgroundImage = `url('${location.image}')`;

        let newCharImage = 'https://placehold.co/400x400/1a202c/ffffff?text=Error'; // 默认错误图片
        if (isDetached) {
            newCharImage = "image/特写/史莱姆特写.png";
        } else if (activeHost && activeHost.portraits) {
            if (state.controlState.includes('SLIME')) {
                newCharImage = activeHost.portraits.controlled;
            } else if (activeHost.sanity <= 0) {
                newCharImage = 'https://placehold.co/400x400/c53030/ffffff?text=Insane';
            } else {
                newCharImage = activeHost.portraits.normal;
            }
        }
        if (this.dom.charImage && !this.dom.charImage.src.includes(newCharImage)) {
            this.dom.charImage.src = newCharImage;
        }
    }

    // 在 game.js 的 UIManager 类中
    // ▼▼▼ 使用这个【优化版】的函数，完整替换掉旧的 renderHostMode 函数 ▼▼▼

    renderHostMode(state, game, activeHost, LANG) {
        this.dom.choicesDisplay.classList.remove('hidden');
        this.dom.extraActionsContainer.classList.remove('hidden');
        this.dom.enterHostButton.classList.add('hidden');

        let storyTextContent = ""; // 初始化旁白文本
        const hostFlows = game.getActiveHostFlows();

        // --- 【核心】使用统一的动态旁白逻辑 ---
        // (这部分旁白逻辑保持不变)
        if (hostFlows && state.story.dailyFlow !== 'none') {
            const flow = hostFlows[state.story.dailyFlow];
            if (flow && flow[state.time.segment] && flow[state.time.segment].textKey) {
                storyTextContent = LANG[flow[state.time.segment].textKey];
            }
        }
        if (!storyTextContent) {
            const currentLocationData = game.getCurrentChapterLocations()[activeHost.currentLocationId];
            if (currentLocationData && currentLocationData.descriptionKey) {
                storyTextContent = LANG[currentLocationData.descriptionKey];
            }
        }
        if (!storyTextContent) {
            if (state.story.dailyFlow === 'none') {
                storyTextContent = LANG['story_new_day_text'];
            } else {
                storyTextContent = LANG['story_free_time_text'] || "自由活动时间。";
            }
        }
        if (activeHost.currentLocationId === 'home_livingroom') {
            if (state.activeHostId === 'song_wei' && state.npcs.song_xin.isPresent) {
                storyTextContent = state.hosts.song_xin.wasEverPossessed ? LANG['story_text_sx_present_puppet'] : LANG['story_text_sx_present_normal'];
            } else if (state.activeHostId === 'song_xin' && state.hosts.song_wei.currentLocationId === 'home_livingroom') {
                storyTextContent = state.hosts.song_wei.isAiControlled ? LANG['story_text_sw_present_puppet'] : LANG['story_text_sw_present_normal'];
            }
        }
        this.dom.storyText.innerHTML = storyTextContent.replace('{HOST_NAME}', activeHost.name);


        // --- 【核心优化】统一按钮渲染逻辑 ---

        // 检查是否为第一章且需要进行“上班/请假”的特殊选择
        const isChapter1PlanningChoice = (
            state.story.dailyFlow === 'none' &&
            state.chapter === 1 &&
            hostFlows && hostFlows.workday
        );

        if (isChapter1PlanningChoice) {
            // **情况A：第一章的特殊计划选择**
            // 只有在这种情况下，才显示“上班/请假”选项，且不显示“欲望激荡”
            this.dom.choicesTitle.textContent = LANG['story_plan_prompt'];
            this.dom.choicesContainer.innerHTML = '';
            this.dom.choicesContainer.appendChild(this.createActionButton(LANG['action_go_to_work'], 'bg-blue-600', () => game.handleAction('go_to_work')));
            this.dom.choicesContainer.appendChild(this.createActionButton(LANG['action_ask_for_leave'], 'bg-yellow-600', () => game.handleAction('ask_for_leave')));
        } else {
            // **情况B：所有其他情况 (包括第二章的早晨和所有章节的行动阶段)**
            // 统一显示“继续”和“欲望激荡”按钮

            // 根据是否在计划阶段，显示不同的标题
            this.dom.choicesTitle.textContent = (state.story.dailyFlow === 'none')
                ? LANG['story_plan_prompt'] // 早晨显示“今天的计划是？”
                : LANG['choices_title_host'];  // 其他时间显示“要做什么？”

            this.dom.choicesContainer.innerHTML = '';
            this.dom.choicesContainer.appendChild(this.createActionButton(LANG['action_continue'], 'bg-blue-600', () => game.handleAction('continue')));
            const nsfwButton = this.createActionButton(LANG['action_lust_surge'], 'bg-pink-600', () => game.handleAction('open_nsfw_modal'));
            nsfwButton.disabled = activeHost.nsfwUsedThisSegment;
            this.dom.choicesContainer.appendChild(nsfwButton);
        }
    }

    renderSlimeDetachedMode(state, game, LANG) {
        const currentChapterLocations = game.getCurrentChapterLocations();

        // --- 1. 获取基础旁白：史莱姆对当前位置的感知 (逻辑不变) ---
        const slimeLocationData = currentChapterLocations[state.slime.currentLocationId];
        let storyTextContent = (slimeLocationData && slimeLocationData.slimeDescriptionKey)
            ? LANG[slimeLocationData.slimeDescriptionKey]
            : LANG['slime_desc_default'];

        // --- 2. 【核心重构】只在待机点，显示“傀儡”的专属神情/动作描述 ---
        let extraHostDescriptions = [];
        const standbyLocationId = gameData.chapterData[state.chapter]?.puppetStandbyLocationId;

        // A. 只有当史莱姆在待机点时，才进行下一步的检查
        if (standbyLocationId && state.slime.currentLocationId === standbyLocationId) {

            Object.entries(state.hosts).forEach(([hostId, hostData]) => {
                // B. 跳过所有“断联”的角色
                if (hostData.status === 'DISCONNECTED') {
                    return;
                }

                // C. 只处理那些“是傀儡”且“在待机点”的宿主
                if (hostData.wasEverPossessed && hostData.currentLocationId === standbyLocationId) {
                    const puppetDescKey = `puppet_desc_${hostId}`;
                    if (LANG[puppetDescKey]) {
                        extraHostDescriptions.push(LANG[puppetDescKey]);
                    }
                }
            });
        }

        // --- 3. 组合最终文本 ---
        if (extraHostDescriptions.length > 0) {
            // 将所有傀儡的描述附加到主旁白后
            storyTextContent += "\n\n" + extraHostDescriptions.join('\n\n');
        }

        // 附加通用的结尾
        storyTextContent += "\n\n" + LANG['story_detached_mode_suffix_generic'];

        // --- 4. 渲染UI (这部分逻辑不变，但现在内容是正确的) ---
        this.dom.storyText.innerHTML = storyTextContent;
        this.dom.choicesDisplay.classList.remove('hidden');
        this.dom.extraActionsContainer.classList.remove('hidden');
        this.dom.enterHostButton.classList.remove('hidden');
        this.dom.enterHostButton.disabled = game.getAvailableHostsToEnter().length === 0;
        this.dom.choicesTitle.textContent = LANG['choices_title_detached'];

        this.dom.choicesContainer.innerHTML = '';
        const moveButton = this.createActionButton(LANG['slime_action_move_detached'], 'bg-purple-600', () => game.handleSlimeAction('MOVE'));
        const waitButton = this.createActionButton(LANG['slime_action_wait'], 'bg-gray-600', () => game.handleSlimeAction('WAIT'));
        this.dom.choicesContainer.appendChild(moveButton);
        this.dom.choicesContainer.appendChild(waitButton);
    }

    // 文件: game.js

    renderSlimeMode(state, game, activeHost, LANG) {
        let storyTextContent = LANG['story_slime_mode_text'].replace('{HOST_NAME}', activeHost.name).replace('{STAMINA}', state.controlState === 'PERMANENT_SLIME' ? '∞' : Math.round(activeHost.stamina));
        if (activeHost.currentLocationId === 'home_livingroom') {
            if (state.activeHostId === 'song_wei' && state.npcs.song_xin.isPresent) {
                storyTextContent = state.hosts.song_xin.wasEverPossessed ? LANG['story_text_slime_observing_sx_puppet'] : LANG['story_text_slime_observing_sx_normal'];
            } else if (state.activeHostId === 'song_xin' && state.hosts.song_wei.currentLocationId === 'home_livingroom') {
                storyTextContent = state.hosts.song_wei.isAiControlled ? LANG['story_text_slime_observing_sw_puppet'] : LANG['story_text_slime_observing_sw_normal'];
            }
        }
        this.dom.storyText.innerHTML = storyTextContent;
        this.dom.choicesDisplay.classList.remove('hidden');
        this.dom.extraActionsContainer.classList.remove('hidden');
        this.dom.enterHostButton.classList.add('hidden');
        this.dom.choicesTitle.textContent = LANG['choices_title_slime'];
        this.dom.choicesContainer.innerHTML = '';

        const actions = [
            { text: LANG['slime_action_move'], type: 'MOVE', disabled: game.skillManager.getSkillRank('basics', state.activeHostId) === 0 },
            { text: LANG['action_lust_surge'], type: 'NSFW', disabled: activeHost.nsfwUsedThisSegment },
            { text: LANG['slime_action_wait'], type: 'WAIT' }
        ];

        // ▼▼▼ 核心修改部分 ▼▼▼
        // 将判断条件从 (!=='PERMANENT_SLIME') 改为 (==='SLIME')，逻辑更清晰严谨
        if (state.controlState === 'SLIME') {
            actions.push({ text: LANG['slime_action_return_control'], type: 'RETURN_CONTROL' });
        }
        // ▲▲▲ 修改结束 ▲▲▲

        actions.forEach(action => {
            const button = this.createActionButton(action.disabled ? `${action.text}${LANG['action_disabled_suffix']}` : action.text, action.type === 'NSFW' ? 'bg-pink-600' : (action.type === 'RETURN_CONTROL' ? 'bg-green-600' : 'bg-purple-600'), () => game.handleSlimeAction(action.type));
            button.disabled = action.disabled;
            if (button.disabled) button.classList.add('bg-gray-700', 'opacity-50', 'cursor-not-allowed');
            this.dom.choicesContainer.appendChild(button);
        });
    }

    // 文件: game.js

    renderTopRightUI(state, LANG) {
        // --- 任务显示部分保持不变 ---
        if (state.story.mainQuest && gameData.taskData[state.story.mainQuest]) {
            this.dom.taskButton.classList.remove('hidden');
            const quest = gameData.taskData[state.story.mainQuest];
            this.dom.taskTitle.textContent = LANG[quest.titleKey];
        } else {
            this.dom.taskButton.classList.add('hidden');
        }

        // ▼▼▼ 核心修正：增加对 isVisible 的判断 ▼▼▼
        // 只有当倒计时存在，并且 isVisible 为 true 时，才显示
        if (state.story.countdown.key && state.story.countdown.isVisible) {
            const countdownData = gameData.taskData[state.story.countdown.key];
            if (countdownData && countdownData.countdownTextKey) {
                this.dom.countdownText.textContent = `${LANG[countdownData.countdownTextKey]} ${state.story.countdown.days} ${LANG['time_unit_days']}`;
                this.dom.countdownContainer.classList.remove('hidden');
            } else {
                // 如果找不到对应的倒计时文本数据，也隐藏
                this.dom.countdownContainer.classList.add('hidden');
            }
        } else {
            this.dom.countdownContainer.classList.add('hidden');
        }
        // ▲▲▲ 修正结束 ▲▲▲

        // --- 好感度条渲染部分保持不变 ---
        this.dom.favorUiContainer.innerHTML = '';
        Object.entries(state.npcs).forEach(([npcId, npcData]) => {
            const correspondingHost = state.hosts[npcId];
            const shouldShow = npcData.isPresent && (!correspondingHost || !correspondingHost.wasEverPossessed);

            if (shouldShow) {
                const npcUI = document.createElement('div');
                npcUI.className = 'ui-box';
                npcUI.innerHTML = `<div class="flex justify-between items-center mb-1"><h4 class="font-bold text-md text-pink-300">${npcData.name}</h4><span class="text-sm">${npcData.favorability}/100</span></div><div class="favor-bar-bg"><div class="favor-bar-fill" style="width: ${npcData.favorability}%"></div></div>`;
                this.dom.favorUiContainer.appendChild(npcUI);
            }
        });
    }

    createActionButton(text, colorClass, onClick) {
        const button = document.createElement('button');
        button.innerHTML = text;
        button.className = `action-button w-full text-white font-bold py-2.5 px-4 rounded-lg shadow-md ${colorClass}`;
        button.onclick = onClick;
        return button;
    }
    // 在 UIManager 类中
    // 用这个函数【替换】掉旧的 showMessage 函数
    showMessage(messageKey, type = 'info', replacements = {}) {
        const LANG = this.languageManager.getCurrentLanguageData();
        let message = LANG[messageKey] || messageKey;

        for (const key in replacements) {
            message = message.replace(`{${key}}`, replacements[key]);
        }

        // --- 【新增】日志记录逻辑 ---
        const state = this.game.stateManager.getState();
        const time = state.time;
        const timeOfDayText = LANG['time_segment'][time.segment.split('-')[0]];
        const timestamp = `Day ${time.day} - ${timeOfDayText}`;

        state.logs.push({ timestamp, message, type });
        // 为了防止存档过大，只保留最新的100条日志
        if (state.logs.length > 100) {
            state.logs.shift();
        }
        // --- 新增逻辑结束 ---

        const colors = { info: 'bg-blue-500', success: 'bg-green-500', warning: 'bg-yellow-500', error: 'bg-red-500' };
        const toast = document.createElement('div');
        toast.className = `p-4 rounded-lg text-white shadow-lg animate-fade-in-out ${colors[type]}`;
        toast.textContent = message;

        this.dom.toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    showIntro(index, onFinished) {
        const LANG = this.languageManager.getCurrentLanguageData();
        if (index >= gameData.introData.length) {
            this.dom.introModal.classList.add('hidden');
            onFinished();
            return;
        }
        const data = gameData.introData[index];
        this.dom.introModal.classList.remove('hidden');
        this.dom.introTitle.innerHTML = LANG[data.titleKey];
        this.dom.introText.innerHTML = LANG[data.textKey];
        this.dom.introImage.src = data.image;
        this.dom.introNextButton.onclick = () => this.showIntro(index + 1, onFinished);
    }

    openModal(title, contentCallback, isSkillTree = false) {
        this.dom.modalOverlay.classList.remove('hidden');
        this.dom.genericModal.classList.remove('hidden');
        this.dom.genericModal.classList.toggle('skill-tree-bg', isSkillTree);
        this.dom.modalTitle.textContent = title;
        this.dom.modalContent.innerHTML = '';
        contentCallback(this.dom.modalContent);
    }

    openHostSelectionModal(hosts, onSelect) {
        const LANG = this.languageManager.getCurrentLanguageData();
        this.openModal(LANG['modal_title_host_selection'], (contentEl) => {
            const container = document.createElement('div');
            container.className = 'space-y-3';
            hosts.forEach(host => {
                const button = this.createActionButton(host.name, 'bg-purple-600', () => {
                    this.closeModal();
                    onSelect(host.id);
                });
                container.appendChild(button);
            });
            contentEl.appendChild(container);
        });
    }

    closeModal() {
        this.dom.modalOverlay.classList.add('hidden');
        this.dom.genericModal.classList.add('hidden');
        this.dom.tetrisModal.classList.add('hidden');
        this.closeHostManagementModal();
    }

    closeHostManagementModal() {
        if (this.dom.hostModal) {
            this.dom.hostModal.classList.add('hidden');
        }
    }

    showConfirm(title, text, onYes) {
        this.dom.modalOverlay.classList.remove('hidden');
        this.dom.confirmModal.classList.remove('hidden');
        this.dom.confirmTitle.textContent = title;
        this.dom.confirmText.textContent = text;
        this.dom.confirmYes.onclick = () => { this.hideConfirm(); onYes(); };
        this.dom.confirmNo.onclick = () => this.hideConfirm();
    }

    hideConfirm() {
        this.dom.modalOverlay.classList.add('hidden');
        this.dom.confirmModal.classList.add('hidden');
    }

    openEventModal({ title, description, background, choices }) {
        this.dom.eventModal.style.backgroundImage = `url('${background}')`;
        this.dom.eventModal.classList.remove('hidden');
        this.dom.eventTitle.textContent = title;
        this.dom.eventDescription.innerHTML = description;
        this.dom.eventChoicesContainer.innerHTML = '';
        if (choices.length === 1) this.dom.eventChoicesContainer.className = 'flex justify-center';
        else this.dom.eventChoicesContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-3';
        choices.forEach(choice => {
            const button = this.createActionButton(choice.text, choice.color || 'bg-indigo-600', choice.action);
            this.dom.eventChoicesContainer.appendChild(button);
        });
    }

    closeEventModal() { this.dom.eventModal.classList.add('hidden'); }

    // 文件: game.js

    toggleTakeoverScreen(show, canTakeover, activeHost) {
        const LANG = this.languageManager.getCurrentLanguageData();
        this.dom.takeoverDescription.textContent = canTakeover ? LANG['takeover_desc_opportunity'] : LANG['takeover_desc_warning'];
        this.dom.takeoverChoices.innerHTML = '';
        if (canTakeover) {
            this.dom.takeoverChoices.appendChild(this.createActionButton(LANG['takeover_choice_take_control'], 'bg-red-700', () => game.takeControl()));
        }
        const releaseBtnText = canTakeover ? LANG['takeover_choice_observe'] : LANG['takeover_choice_stabilize'];
        this.dom.takeoverChoices.appendChild(this.createActionButton(releaseBtnText, 'bg-blue-600', () => game.releaseControl()));

        if (show && activeHost) {
            // ▼▼▼ 核心修改部分：直接从宿主数据中读取图片路径 ▼▼▼
            let img = 'https://placehold.co/800x600/c53030/ffffff?text=Insane'; // 设置一个默认的后备图片
            if (activeHost.events && activeHost.events.sanityLossImage) {
                img = activeHost.events.sanityLossImage; // 如果定义了图片，就使用它
            }
            // ▲▲▲ 修改结束 ▲▲▲

            this.dom.takeoverScreen.style.backgroundImage = `url('${img}')`;
            this.dom.takeoverScreen.style.backgroundSize = 'cover';
            this.dom.takeoverScreen.style.backgroundPosition = 'center';
        } else {
            this.dom.takeoverScreen.style.backgroundImage = '';
        }
        this.dom.takeoverScreen.classList.toggle('hidden', !show);
    }

    showGameOver(reason) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const dataKey = gameData.gameOverData[reason];
        if (!dataKey || !LANG[dataKey]) return;
        this.dom.gameoverModal.classList.remove('hidden');
        this.dom.gameoverText.innerHTML = LANG[dataKey];
    }

    // 文件: game.js

    openStoreModal() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.game.stateManager.getState();
        const template = document.getElementById('store-item-template');

        this.openModal(LANG['modal_title_special_store'], (contentEl) => {
            contentEl.innerHTML = `<p class="text-center text-gray-400 mb-4">${LANG['store_current_mutation_points']} <span class="font-bold text-lime-400">${state.slime.mutationPoints}</span></p>`;
            const container = document.createElement('div');
            container.className = 'space-y-4';
            contentEl.appendChild(container);

            Object.entries(gameData.storeItemsData).forEach(([itemId, itemData]) => {
                const itemNode = template.content.cloneNode(true);
                itemNode.querySelector('.item-name').textContent = LANG[itemData.nameKey];
                itemNode.querySelector('.item-desc').textContent = LANG[itemData.descKey];
                itemNode.querySelector('.item-cost').textContent = `${LANG['store_item_cost'] || '成本: '}${itemData.cost}`;

                const buyButton = itemNode.querySelector('.buy-button');

                // ▼▼▼ 核心修正：使用语言文件中的文本替换所有硬编码 ▼▼▼
                const currentPurchases = state.story.flags.chapter2.upgrades[itemId + '_level'] || (itemData.isPurchased(state) ? 1 : 0);
                const maxPurchases = itemData.maxPurchases || 1;

                if (currentPurchases >= maxPurchases) {
                    // 使用 'store_btn_acquired' 文本键
                    buyButton.textContent = LANG['store_btn_acquired'] + (maxPurchases > 1 ? ` (${currentPurchases}/${maxPurchases})` : '');
                    buyButton.disabled = true;
                } else if (state.slime.mutationPoints < itemData.cost) {
                    // 使用 'store_btn_buy' 文本键
                    buyButton.textContent = LANG['store_btn_buy'] || '购买';
                    buyButton.disabled = true;
                } else {
                    // 使用 'store_btn_buy' 文本键
                    buyButton.textContent = LANG['store_btn_buy'] || '购买';
                    buyButton.onclick = () => this.game.purchaseStoreItem(itemId);
                }

                if (maxPurchases > 1 && currentPurchases > 0) {
                    // 使用 'store_item_level' 文本键
                    const levelText = LANG['store_item_level'] || ' (等级 {level})';
                    itemNode.querySelector('.item-name').textContent += levelText.replace('{level}', currentPurchases);
                }
                // ▲▲▲ 修正结束 ▲▲▲

                container.appendChild(itemNode);
            });
        });
    }

    // 在 UIManager 类中新增
    openChapterSelectModal() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const modal = this.dom.chapterSelectModal;
        const contentEl = modal.querySelector('#chapter-select-content');
        const template = document.getElementById('chapter-card-template');

        contentEl.innerHTML = ''; // 清空旧内容

        Object.entries(gameData.chapterSelectData).forEach(([chapterNum, chapterData]) => {
            const card = template.content.cloneNode(true);
            card.querySelector('.chapter-image').src = chapterData.image;
            card.querySelector('.chapter-title').textContent = LANG[chapterData.titleKey];
            card.querySelector('.chapter-desc').textContent = LANG[chapterData.descKey];

            const startButton = card.querySelector('.chapter-start-button');
            startButton.onclick = () => this.game.startChapter(parseInt(chapterNum, 10));

            contentEl.appendChild(card);
        });

        this.dom.modalOverlay.classList.remove('hidden');
        modal.classList.remove('hidden');
    }

    // 在 UIManager 类中，修改 closeModal，让它也能关闭新弹窗
    closeModal() {
        this.dom.modalOverlay.classList.add('hidden');
        this.dom.genericModal.classList.add('hidden');
        this.dom.tetrisModal.classList.add('hidden');
        this.closeHostManagementModal();
        // ▼▼▼ 在此新增 ▼▼▼
        if (this.dom.chapterSelectModal) {
            this.dom.chapterSelectModal.classList.add('hidden');
        }
        // ▲▲▲ 新增结束 ▲▲▲
    }

    // 在 UIManager 类中新增
    openImportSlotSelectModal(importedData) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const title = LANG['modal_title_import_slot_select'];

        this.openModal(title, (contentEl) => {
            const container = document.createElement('div');
            container.className = 'space-y-4';

            for (let i = 1; i <= NUM_SAVE_SLOTS; i++) {
                const button = this.createActionButton(`${LANG['save_slot_prefix']} ${i}`, 'bg-indigo-600', () => {
                    localStorage.setItem(`parasite_save_v8_${i}`, JSON.stringify(importedData));
                    this.closeModal();
                    this.showMessage(LANG['toast_import_success'].replace('{SLOT}', i), 'success');
                    // 重新打开存档界面以刷新显示
                    this.game.openSaveLoadModal('load');
                });
                container.appendChild(button);
            }
            contentEl.appendChild(container);
        });
    }
}

class SkillManager {
    constructor(stateManager, uiManager, languageManager) {
        this.stateManager = stateManager;
        this.uiManager = uiManager;
        this.languageManager = languageManager;
    }

    // 在 SkillManager 类中，完全替换 getSkillRank 函数
    getSkillRank(skillId, hostId) {
        const state = this.stateManager.getState();

        // ▼▼▼ 【核心修复】改进的技能读取逻辑 ▼▼▼
        console.log(`正在查询技能: ${skillId}, 宿主: ${hostId || state.activeHostId}`);

        // 确保skillsData访问正确
        const skillsData = window.gameData?.skillsData || gameData?.skillsData;
        if (!skillsData) {
            console.error("skillsData未找到!");
            return 0;
        }

        // 确保技能数据结构存在
        if (!state.slime?.skills) {
            console.error("state.slime.skills不存在!");
            return 0;
        }

        // 检查全局技能（史莱姆技能）
        if (skillsData.slime?.skills?.[skillId]) {
            const globalSkills = state.slime.skills.global || {};
            const rank = globalSkills[skillId] || 0;
            console.log(`全局技能 ${skillId}: ${rank} (从 globalSkills:`, globalSkills, ')');
            return rank;
        }

        // 检查宿主特定技能（侵蚀技能）  
        if (skillsData.erosion?.skills?.[skillId]) {
            const currentHostId = hostId || state.activeHostId;
            if (!currentHostId) {
                console.log(`宿主特定技能 ${skillId}: 无当前宿主ID`);
                return 0;
            }

            const hostSkills = state.slime.skills[currentHostId] || {};
            const rank = hostSkills[skillId] || 0;
            console.log(`宿主技能 ${skillId} (${currentHostId}): ${rank} (从 hostSkills:`, hostSkills, ')');
            return rank;
        }

        console.log(`技能 ${skillId} 在技能定义中未找到`);
        return 0;
        // ▲▲▲ 修复结束 ▲▲▲
    }

    getTotalErosionRanks(hostId) {
        const state = this.stateManager.getState();
        const currentHostId = hostId || state.activeHostId;
        if (!currentHostId || !state.slime.skills[currentHostId]) return 0;
        const skills = state.slime.skills[currentHostId];
        return Object.keys(gameData.skillsData.erosion.skills).reduce((acc, skillId) => acc + (skills[skillId] || 0), 0);
    }

    purchaseSkill(skillId, cost, onPurchase) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        if (state.slime.mutationPoints < cost) {
            this.uiManager.showMessage(LANG['toast_no_mutation_points'], 'warning');
            return;
        }

        state.slime.mutationPoints -= cost;

        if (gameData.skillsData.slime.skills[skillId]) {
            if (!state.slime.skills.global) state.slime.skills.global = {};
            state.slime.skills.global[skillId] = (state.slime.skills.global[skillId] || 0) + 1;
        }
        else if (gameData.skillsData.erosion.skills[skillId]) {
            const activeHostId = state.activeHostId;
            if (!activeHostId) return;
            if (!state.slime.skills[activeHostId]) state.slime.skills[activeHostId] = {};
            state.slime.skills[activeHostId][skillId] = (state.slime.skills[activeHostId][skillId] || 0) + 1;
        }

        state.slime.totalRanks++;
        this.uiManager.showMessage(LANG['toast_skill_unlocked'], 'success');
        if (skillId === 'total_possession' && !state.hosts.song_wei.wasEverPossessed) {
            this.uiManager.showMessage(LANG['toast_final_assimilation_ready'], 'warning');
        }
        onPurchase();
    }

    openSkillTreeModal(game) {
        const LANG = this.languageManager.getCurrentLanguageData();
        this.uiManager.openModal(LANG['modal_title_skill_tree'], (contentEl) => {
            const state = this.stateManager.getState();
            const activeHost = game.stateManager.getActiveHost();
            if (!activeHost) {
                contentEl.innerHTML = `<p class='text-center text-gray-400'>${LANG['no_active_host_skill_tree']}</p>`;
                return;
            }
            const activeHostId = state.activeHostId;

            const container = document.createElement('div');
            container.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';
            Object.keys(gameData.skillsData).forEach(treeKey => {
                const treeContainer = document.createElement('div');
                treeContainer.className = 'space-y-2';
                container.appendChild(treeContainer);
                const treeData = gameData.skillsData[treeKey];
                const title = document.createElement('h4');
                title.className = 'text-2xl font-bold text-center text-purple-400';
                const titleSuffix = treeKey === 'erosion' ? LANG['skill_tree_title_erosion_suffix'].replace('{HOST_NAME}', activeHost.name) : LANG['skill_tree_title_global_suffix'];
                title.textContent = `${LANG[treeData.titleKey]} ${titleSuffix}`;
                treeContainer.appendChild(title);

                if (treeKey === 'erosion') {
                    const memoryPlunderRank = this.getSkillRank('memory_plunder', activeHostId);
                    if (memoryPlunderRank === 0 && activeHostId !== 'song_xin') {
                        title.textContent += ` (${LANG['skill_tree_erosion_locked']})`;
                        title.classList.replace('text-purple-400', 'text-gray-600');
                        const lockInfo = document.createElement('p');
                        lockInfo.className = 'text-center text-gray-500 mt-4 p-4 bg-black/20 rounded-lg';
                        lockInfo.textContent = LANG['skill_tree_erosion_locked_desc'];
                        treeContainer.appendChild(lockInfo);
                        return;
                    }
                }

                const tiers = {};
                Object.entries(treeData.skills).forEach(([skillId, skill]) => {
                    if (!tiers[skill.tier]) tiers[skill.tier] = [];
                    tiers[skill.tier].push({ id: skillId, ...skill });
                });
                Object.keys(tiers).sort().forEach(tier => {
                    const divider = document.createElement('div');
                    divider.className = 'skill-tier-divider';
                    const req = tiers[tier][0].requirement;
                    const tierText = req > 0 ? LANG['skill_tier_req'].replace('{REQ}', req) : LANG['skill_tier_initial'];
                    divider.innerHTML = `<span class="px-2 text-sm font-bold">${LANG['skill_tier_prefix'].replace('{TIER}', tier)} <span class="text-xs">(${tierText})</span></span>`;
                    treeContainer.appendChild(divider);
                    tiers[tier].forEach(skill => {
                        const rank = this.getSkillRank(skill.id, activeHostId);
                        const node = document.createElement('div');
                        node.className = 'skill-node p-3 rounded-lg';
                        node.innerHTML = `<div class="flex justify-between items-center"><span class="font-bold">${LANG[skill.nameKey]}</span><span class="font-mono">[${rank}/${skill.maxRank}]</span></div><p class="text-xs text-gray-400 mt-1">${LANG[skill.descriptionKey]}</p><p class="text-xs text-yellow-400 mt-1">${LANG['skill_node_cost'].replace('{COST}', skill.cost)}</p>`;

                        let isLocked = (skill.requirement && state.slime.totalRanks < skill.requirement);

                        if (activeHostId === 'song_xin' && treeKey === 'erosion') {
                            node.classList.add('maxed');
                            const rankSpan = node.querySelector('.font-mono');
                            if (rankSpan) {
                                rankSpan.textContent = `[${skill.maxRank}/${skill.maxRank}]`;
                            }
                        } else if (isLocked) {
                            node.classList.add('locked');
                        } else if (rank >= skill.maxRank) {
                            node.classList.add('maxed');
                        } else {
                            node.classList.add('available');
                            node.onclick = () => this.purchaseSkill(skill.id, skill.cost, () => {
                                game.update();
                                this.openSkillTreeModal(game);
                            });
                        }
                        treeContainer.appendChild(node);
                    });
                });
            });
            contentEl.appendChild(container);
        }, true);
    }
}


class TimeManager {
    constructor(stateManager, uiManager, skillManager, onTimeAdvanced, languageManager, game) {
        this.stateManager = stateManager;
        this.uiManager = uiManager;
        this.skillManager = skillManager;
        this.onTimeAdvanced = onTimeAdvanced;
        this.languageManager = languageManager;
        this.game = game; 

        // 🔧 修复：添加缺失的时间段数组定义
        this.timeSegments = [
            'morning-1',
            'morning-2',
            'noon-1',
            'noon-2',
            'afternoon-1',
            'afternoon-2',
            'evening-1',
            'evening-2',
        ];
    }
    // 在 game.js 的 TimeManager 类中
    // ▼▼▼ 使用这个【修正版】的代码，完整替换掉旧的 advanceSegment 函数 ▼▼▼

    advanceSegment() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();

        // ▼▼▼ 【核心重构】使用新的数据驱动逻辑 ▼▼▼
        // 当玩家未做选择时 (例如在接管模式下跳过了早晨)
        if (state.story.dailyFlow === 'none' && state.time.segment === 'morning-1') {
            const hostFlows = this.game.getActiveHostFlows(); // 使用保存的 game 实例调用辅助函数
            // 从数据中读取该宿主的默认路线
            if (hostFlows && hostFlows.defaultFlow) {
                state.story.dailyFlow = hostFlows.defaultFlow;
                this.uiManager.showMessage('toast_default_flow_activated', 'info', { FLOW_NAME: LANG[`flow_name_${hostFlows.defaultFlow}`] }); // (可选) 提示玩家
            }
        }
    // ▲▲▲ 重构结束 ▲▲▲

        const currentIndex = this.timeSegments.indexOf(state.time.segment);
        const activeHost = this.stateManager.getActiveHost();

        // ▼▼▼ 【核心修复】重新定义被意外删除的 activeHostId 变量 ▼▼▼
        const activeHostId = state.activeHostId;

        // 现在下面的 if 语句可以正常工作了
        if (activeHost && this.skillManager.getSkillRank('total_possession', activeHostId) > 0 && currentIndex === this.timeSegments.length - 1 && state.controlState !== 'PERMANENT_SLIME' && state.controlState !== 'SLIME_DETACHED') {
            this.onTimeAdvanced({ gameEvent: 'start_clicker_game', hostId: activeHostId });
            return;
        }

        if (currentIndex >= this.timeSegments.length - 1) {
            this.nextDay();
        } else {
            const nextSegment = this.timeSegments[currentIndex + 1];
            state.time.segment = nextSegment;
            this.updateOnTimePassage();
            this.onTimeAdvanced();
        }
    }
    // 文件: game.js

    nextDay() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        state.time.day++;
        state.time.dayOfWeek = (state.time.dayOfWeek % 7) + 1;
        state.time.segment = 'morning-1';
        state.story.dailyFlow = (state.time.dayOfWeek > 5) ? 'weekend' : 'none';
        state.story.nsfwActsToday = 0;

        Object.values(state.hosts).forEach(host => {
            host.nsfwUsedThisSegment = false;
        });

        if (state.story.countdown.key) {
            state.story.countdown.days--;
            if (state.story.countdown.days <= 0) {
                if (state.story.countdown.key === 'health_check_main') {
                    this.onTimeAdvanced({ gameEvent: 'health_check_failed' });
                    return;
                } else if (state.story.countdown.key === 'bomb_countdown') {
                    this.onTimeAdvanced({ gameEvent: 'bomb_detonated' });
                    return;
                }
            }
        }

        let suspicionReduction = 30 + (this.skillManager.getSkillRank('simulate_emotion', 'song_wei') > 0 ? 70 : 0);
        state.slime.suspicion = Math.max(0, state.slime.suspicion - suspicionReduction);
        this.uiManager.showMessage('toast_new_day_started', 'success', { AMOUNT: suspicionReduction });

        Object.entries(state.hosts).forEach(([hostId, host]) => {
            const isPlayerControlledSlime = (hostId === state.activeHostId) && (state.controlState === 'SLIME' || state.controlState === 'PERMANENT_SLIME');
            if (!isPlayerControlledSlime) {
                host.stamina = 100;
            }
            if (host.isAiControlled && !isPlayerControlledSlime) {
                host.sanity = 50;
            } else if (host.sanity > 0 && !isPlayerControlledSlime) {
                host.sanity = Math.min(100, host.sanity + 30);
            }
        });

        this.uiManager.showMessage('toast_all_hosts_stamina_full', 'success');

        if (state.controlState === 'HOST') {
            this.uiManager.showMessage('toast_sanity_recovered_sleep', 'success');
        }

        // ▼▼▼ 核心修正：修复傀儡保养收益的计算逻辑 ▼▼▼
        const maintenanceLevel = state.story.flags.chapter2.upgrades.puppet_maintenance_level || 0;
        if (maintenanceLevel > 0) {
            const puppetCount = Object.values(state.hosts).filter(h => h.isPuppet).length;
            // 正确的公式：每个傀儡的产量 = 保养等级
            const pointsGained = puppetCount * maintenanceLevel;
            if (pointsGained > 0) {
                state.slime.mutationPoints += pointsGained;
                this.uiManager.showMessage('toast_maintenance_income', 'success', { POINTS: pointsGained });
            }
        }
        // ▲▲▲ 修正结束 ▲▲▲

        this.updateOnTimePassage(true);
        this.onTimeAdvanced();
    }

    // 文件: game.js

    updateOnTimePassage(isNewDay = false) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();

        // 1. 重置所有宿主的 nsfw 标记
        Object.values(state.hosts).forEach(host => {
            host.nsfwUsedThisSegment = false;
        });

        // ▼▼▼ 核心修正：重构AI行动规划逻辑 ▼▼▼
        // 2. AI 宿主行动规划 (只更新期望地点)
        Object.keys(state.hosts).forEach(hostId => {
            // 只规划非玩家当前控制的AI宿主
            if (hostId !== state.activeHostId && state.hosts[hostId].isAiControlled) {
                const host = state.hosts[hostId];
                if (host.isPuppet) {
                    // 如果是傀儡，规划前往待机地点
                    const standbyLocation = gameData.chapterData[state.chapter].puppetStandbyLocationId;
                    host.expectedLocationId = standbyLocation;
                } else {
                    // 如果是正常的AI，按日程规划
                    const chapterFlows = this.game.getCurrentChapterFlows(); // 使用辅助函数
                    if (chapterFlows && chapterFlows[hostId]) {
                        const hostFlows = chapterFlows[hostId];

                        // 修正后的日程表选择逻辑
                        let flowKey = hostFlows.defaultFlow; // 首先尝试读取默认日程
                        if (!flowKey) { // 如果没有默认，则根据日期判断
                            flowKey = state.time.dayOfWeek <= 5 ? 'workday' : 'weekend';
                        }
                        // 确保我们使用的flowKey在数据中真实存在
                        const flow = hostFlows[flowKey] || hostFlows[Object.keys(hostFlows)[0]];

                        if (flow && flow[state.time.segment]) {
                            host.expectedLocationId = flow[state.time.segment].locationId;
                        }
                    }
                }
            }
        });
        // ▲▲▲ 修正结束 ▲▲▲

        // 3. AI 宿主行动执行 (在这里统一移动)
        Object.values(state.hosts).forEach(host => {
            if (host.isAiControlled && host.currentLocationId !== host.expectedLocationId) {
                host.currentLocationId = host.expectedLocationId;
            }
        });

        // 4. 玩家控制的宿主恢复体力/理智 (逻辑不变)
        const activeHost = this.stateManager.getActiveHost();
        if (activeHost && state.controlState === 'HOST') {
            const isNewPeriod = state.time.segment.endsWith('-1');
            if (isNewPeriod && !isNewDay) {
                if (activeHost.sanity > 0) {
                    activeHost.sanity = Math.min(100, activeHost.sanity + 15);
                    this.uiManager.showMessage(LANG['toast_new_period_sanity_recovered'], 'success');
                }
                const staminaRecovery = 20 + (this.skillManager.getSkillRank('hyper_excitement', state.activeHostId) * 20);
                activeHost.stamina = Math.min(100, activeHost.stamina + staminaRecovery);
                this.uiManager.showMessage(LANG['toast_stamina_recovered'].replace('{AMOUNT}', staminaRecovery), 'success');
            }
        }

        // 5. 检查并扣除控制消耗 (逻辑不变)
        if (this.updateControlCost()) {
            this.onTimeAdvanced({ gameEvent: 'force_return_control' });
        }
    }

    updateControlCost() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();
        if (activeHost && state.controlState === 'SLIME') {
            if (state.activeHostId === 'song_xin') return false;
            const cost = 15; activeHost.stamina -= cost;
            this.uiManager.showMessage(LANG['toast_control_cost'].replace('{COST}', cost), 'warning');
            if (activeHost.stamina <= 0) {
                activeHost.stamina = 0;
                this.uiManager.showMessage(LANG['toast_control_lost_energy'], 'error');
                return true;
            }
        }
        return false;
    }
}


// 在 game.js 文件中
// ▼▼▼ 使用这个新版本，完整替换掉旧的 EventManager 类 ▼▼▼

class EventManager {
    constructor(stateManager, uiManager, game) {
        this.stateManager = stateManager;
        this.uiManager = uiManager;
        this.game = game;
        this.languageManager = game.languageManager;
    }

    // ==========================================================
    // --- 新的数据驱动事件系统 (New Data-Driven Event System) ---
    // ==========================================================

    /**
     * 主触发器：根据事件ID启动一个数据驱动的事件。
     * @param {string} eventName - 在 allEventData 中定义的事件ID。
     */
    triggerEvent(eventName, context = {}) {
        const eventData = gameData.allEventData[eventName];
        if (!eventData) {
            console.error(`Event data not found for event: ${eventName}`);
            return;
        }
        this.showEventPage(eventData, 0, context);
    }

    /**
     * 页面渲染器：负责显示事件的特定页面。
     * @param {object} eventData - 完整的事件数据对象。
     * @param {number} pageIndex - 当前要显示的页面索引。
     * @param {object} context - 用于传递动态数据的上下文对象（如动态图片）。
     */
    showEventPage(eventData, pageIndex, context = {}) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const page = eventData.pages[pageIndex];
        const uiChoices = [];

        if (page.choices) {
            // 如果当前页有预设的选项
            page.choices.forEach(choiceData => {
                uiChoices.push({
                    text: LANG[choiceData.textKey],
                    color: choiceData.color || 'bg-indigo-600',
                    action: () => this.processActionEffects(choiceData.action)
                });
            });
        } else if (pageIndex < eventData.pages.length - 1) {
            // 如果不是最后一页，自动创建“继续”按钮
            uiChoices.push({
                text: LANG['btn_continue'] || 'Continue...',
                action: () => this.showEventPage(eventData, pageIndex + 1, context)
            });
        }

        const image = page.image === '{dynamic}' ? context.dynamicImage : page.image;

        this.uiManager.openEventModal({
            title: LANG[eventData.titleKey],
            description: LANG[page.textKey],
            background: image,
            choices: uiChoices
        });
    }

    /**
     * 效果处理器：解析并执行 action 数组中定义的所有效果。
     * @param {Array<object>} actions - 包含效果定义的对象数组。
     */
    processActionEffects(actions) {
        if (!actions) {
            this.uiManager.closeEventModal();
            this.game.update();
            return;
        };
        this.uiManager.closeEventModal();
        const state = this.stateManager.getState();
        let calculatedData = {}; // 用于存储计算结果，供后续action使用

        for (const effect of actions) {
            switch (effect.type) {
                case 'setFlag':
                    // ▼▼▼ 核心修正：增加对函数值的处理 ▼▼▼
                    let finalValue = effect.value;
                    if (typeof effect.value === 'function') {
                        finalValue = effect.value(state); // 如果value是函数，则执行它并取其返回值
                    }
                    this.setFlagByPath(state, effect.path, finalValue);
                    // ▲▲▲ 修正结束 ▲▲▲
                    break;
                case 'showMessage':
                    let replacements = {};
                    if (effect.replacements) {
                        Object.entries(effect.replacements).forEach(([key, value]) => {
                            if (typeof value === 'string' && value.startsWith('{lang:')) {
                                const langKey = value.substring(6, value.length - 1);
                                replacements[key] = this.languageManager.getCurrentLanguageData()[langKey] || langKey;
                            } else if (value === '{calculated}') {
                                replacements[key] = calculatedData[key];
                            } else {
                                replacements[key] = value;
                            }
                        });
                    }
                    this.uiManager.showMessage(effect.key, effect.messageType || 'info', replacements);
                    break;
                case 'takeoverHost':
                    // ▼▼▼ 核心修正：增加对函数值的处理 ▼▼▼
                    const previousHostIdValue = typeof effect.previousHostId === 'function'
                        ? effect.previousHostId(state)
                        : effect.previousHostId;

                    state.activeHostId = effect.hostId;
                    state.hosts[effect.hostId].wasEverPossessed = true;
                    state.hosts[effect.hostId].isAiControlled = false;

                    if (previousHostIdValue && state.hosts[previousHostIdValue]) {
                        state.hosts[previousHostIdValue].isAiControlled = true;
                    }
                    // ▲▲▲ 修正结束 ▲▲▲
                    break;
                case 'reEnterHost':
                    const targetHost = state.hosts[effect.hostId];
                    state.activeHostId = effect.hostId;
                    targetHost.isAiControlled = false;
                    state.controlState = targetHost.isPuppet ? 'PERMANENT_SLIME' : 'SLIME';
                    Object.keys(state.hosts).forEach(id => {
                        if (id !== effect.hostId && state.hosts[id].status !== 'DISCONNECTED') {
                            state.hosts[id].isAiControlled = true;
                        }
                    });
                    break;
                case 'advanceTime':
                    this.game.timeManager.advanceSegment();
                    return; // 推进时间后，立即返回，防止重复update
                case 'setSongXinArrivalTime':
                    this.setFlagByPath(state, 'story.flags.chapter1.npc_song_xin.arrivalTime', state.time.day + effect.offset);
                    break;
                case 'maxOutErosionSkills':
                    let addedRanks = 0;
                    if (!state.slime.skills[effect.hostId]) state.slime.skills[effect.hostId] = {};
                    Object.keys(gameData.skillsData.erosion.skills).forEach(skillId => {
                        const skill = gameData.skillsData.erosion.skills[skillId];
                        const currentRank = state.slime.skills[effect.hostId][skillId] || 0;
                        const rankToAdd = skill.maxRank - currentRank;
                        state.slime.skills[effect.hostId][skillId] = skill.maxRank;
                        addedRanks += rankToAdd;
                    });
                    state.slime.totalRanks += addedRanks;
                    calculatedData['ADDED_RANKS'] = addedRanks;
                    break;
                case 'modifyFavor': // effect: { type: 'modifyFavor', npcId: 'zhang_chao', value: 10 }
                    if (state.npcs[effect.npcId]) {
                        state.npcs[effect.npcId].favorability = Math.min(100, state.npcs[effect.npcId].favorability + effect.value);
                    }
                    break;
                case 'advanceMaze':
                    // 这个逻辑会直接显示迷宫事件的下一页
                    this.showEventPage(gameData.allEventData['forest_maze_event'], effect.stage - 1);
                    return; // 阻止后续的 game.update()

                case 'failMaze':
                    this.uiManager.closeEventModal();
                    this.uiManager.showMessage('toast_maze_failed', 'warning');
                    this.game.timeManager.advanceSegment();
                    return;
                case 'moveActiveHost':
                    if (state.activeHostId && state.hosts[state.activeHostId]) {
                        state.hosts[state.activeHostId].currentLocationId = effect.locationId;
                    }
                    break;
                case 'startNewChapter':
                    this.game.startNewChapter();
                    return; // 同 advanceTime，防止重复update
            }
        }

        this.game.update();
    }

    /**
     * 辅助函数：根据字符串路径安全地设置对象的值。
     */
    setFlagByPath(baseObject, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();

        // ▼▼▼ 【核心修复】让 reduce 从正确的根对象开始 ▼▼▼
        const target = keys.reduce((obj, key) => {
            // 如果中间路径不存在，则安全地创建它
            if (obj[key] === undefined || typeof obj[key] !== 'object') {
                obj[key] = {};
            }
            return obj[key];
        }, baseObject); // <-- 这里的 baseObject 就是我们传入的 state

        if (target && typeof target === 'object') {
            target[lastKey] = value;
        } else {
            console.error(`Failed to set flag. Invalid path target for: ${path}`);
        }
    }

    // ==========================================================
    // --- 保留的旧有/特殊事件逻辑 (Retained Legacy/Special Logic) ---
    // ==========================================================

    /**
     * 检查时间驱动的事件（保留，因为它处理游戏循环中的自动触发）。
     */
    checkTriggerEvents() {
        const state = this.stateManager.getState();

        // 【修正】将所有第一章的检查都限制在 state.chapter === 1 的条件下
        if (state.chapter === 1) {
            if (state.time.day >= 3 && state.time.segment === 'morning-1' && !state.story.mainQuest) {
                this.game.eventQueue.push('health_check');
            }
            if (state.time.day >= 3 && state.time.segment === 'noon-1' && !state.npcs.zhang_chao.met) {
                const activeHost = this.game.stateManager.getActiveHost();
                if (activeHost && activeHost.currentLocationId === 'work_office') {
                    this.game.eventQueue.push('zhang_chao_intro');
                }
            }
            // ▼▼▼ 关键修复 ▼▼▼
            // 确保这个检查只在第一章，并且 chapter1 的 flags 对象存在时才执行
            if (state.story.flags.chapter1 && state.story.flags.chapter1.npc_song_xin.invited && state.time.day === state.story.flags.chapter1.npc_song_xin.arrivalTime && state.time.segment === 'morning-1') {
                this.game.eventQueue.push('song_xin_arrival');
            }
        }

        // 在这里为第二章添加时间驱动的事件
        if (state.chapter === 2) {
            // 例如: if (state.time.day > 35 && !state.story.flags.chapter2.some_event) { ... }
        }
    }

    startMemoryPlunderGame(hostId) {
        const LANG = this.languageManager.getCurrentLanguageData();
        this.uiManager.dom.modalOverlay.classList.remove('hidden');
        this.uiManager.dom.tetrisModal.classList.remove('hidden');
        const canvas = document.getElementById('tetris-canvas');

        const onTetrisComplete = (success) => {
            this.uiManager.closeModal();
            if (success) {
                let successEventName = '';
                // ▼▼▼ 核心逻辑：根据传入的角色ID，决定成功后触发哪个事件 ▼▼▼
                if (hostId === 'song_wei') {
                    successEventName = 'memory_plunder_success';
                } else if (hostId === 'zhang_huili') {
                    successEventName = 'memory_plunder_success_zh';
                } else if (hostId === 'liu_min') {
                    successEventName = 'memory_plunder_success_lm';
                }
                else if (hostId === 'jane') {
                    successEventName = 'memory_plunder_success_jane';
                }

                if (successEventName) {
                    this.triggerEvent(successEventName);
                } else {
                    console.error(`No memory plunder success event defined for host: ${hostId}`);
                }
            } else {
                this.uiManager.showMessage(LANG['toast_mem_plunder_fail'], "error");
                this.game.timeManager.advanceSegment();
            }
        };

        this.tetrisManager = new TetrisManager(canvas, onTetrisComplete.bind(this));
        this.uiManager.dom.tetrisSkipButton.onclick = () => {
            if (this.tetrisManager) { this.tetrisManager.stop(); }
            onTetrisComplete(true);
        };
        this.tetrisManager.start();
    }

    // 在 game.js 的 EventManager 类中
    // ▼▼▼ 使用这个【修正版】的代码，完整替换掉旧的 startClickerGame 函数 ▼▼▼

    startClickerGame(hostId) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const dom = this.uiManager.dom;
        dom.clickerModal.classList.remove('hidden');

        let clicks = 0;
        const requiredClicks = 50;
        let timeLeft = 30;

        // 1. 【提取】将UI更新逻辑提取为一个独立的辅助函数
        const updateProgressBar = () => {
            const percentage = Math.min(100, (clicks / requiredClicks) * 100);
            dom.clickerProgressBar.style.width = `${percentage}%`;
        };

        const endGame = (won) => {
            clearInterval(timer);
            dom.clickerModal.classList.add('hidden');
            if (won) {
                const eventName = `permanent_takeover_${hostId}`;
                this.triggerEvent(eventName);
            } else {
                this.uiManager.openEventModal({
                    title: LANG['event_clicker_fail_title'],
                    description: LANG['event_clicker_fail_desc'],
                    background: 'https://placehold.co/800x600/1a202c/ffffff?text=Normal',
                    choices: [{
                        text: LANG['event_clicker_fail_choice'], action: () => {
                            this.uiManager.closeEventModal();
                            this.uiManager.showMessage(LANG['toast_clicker_fail_retry'], 'warning');
                            this.game.timeManager.nextDay();
                        }
                    }]
                });
            }
        };

        // 2. 【核心修复】在游戏开始时，立即调用一次UI更新，将所有显示设置为初始状态
        dom.clickerTimer.textContent = timeLeft.toFixed(1);
        updateProgressBar(); // <-- 这会根据 clicks = 0 将进度条设置为 0%

        // 3. 启动游戏循环
        const timer = setInterval(() => {
            timeLeft -= 0.1;
            dom.clickerTimer.textContent = timeLeft.toFixed(1);
            if (timeLeft <= 0) {
                endGame(false);
            }
        }, 100);

        dom.clickerButton.onclick = () => {
            clicks++;
            updateProgressBar(); // <-- 在每次点击时，继续调用这个函数来更新进度条
            if (clicks >= requiredClicks) {
                endGame(true);
            }
        };
    }

    /**
     * 返还控制权（保留，因为其文本和怀疑度计算是高度动态的）。
     */
    returnControl(isForced = false) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();
        if (!activeHost) return;

        // --- 1. 计算怀疑度 (这部分逻辑是通用的，予以保留) ---
        const memoryPlunderRank = this.game.skillManager.getSkillRank('memory_plunder', state.activeHostId);
        const suspicionReduction = 1 - (memoryPlunderRank * 0.2);
        let baseSuspicionGain = 20;
        const locationMismatch = activeHost.currentLocationId !== activeHost.expectedLocationId;
        if (locationMismatch) baseSuspicionGain += 30;
        const finalSuspicionGain = Math.round(baseSuspicionGain * suspicionReduction);

        // --- 2. 【核心修复】使用新的、数据驱动的方式生成描述文本 ---
        let description = isForced ? LANG['return_control_forced_desc'] : LANG['return_control_voluntary_desc'];

        // 从宿主自己的元数据中读取描述Key
        const descKeys = activeHost.events.returnControlDesc;
        const key = locationMismatch ? descKeys.mismatch : descKeys.match;

        // 拼接最终的描述
        description += LANG[key]
            .replace('{HOST_NAME}', activeHost.name)
            .replace('{LOCATION_NAME}', LANG[this.game.getCurrentChapterLocations()[activeHost.currentLocationId].nameKey]);

        // --- 3. 弹出事件窗口 (逻辑不变) ---
        this.uiManager.openEventModal({
            title: LANG['return_control_title'],
            description: description,
            choices: [{
                text: LANG['event_continue_ellipsis'],
                action: () => {
                    this.uiManager.closeEventModal();
                    state.controlState = 'HOST';
                    activeHost.sanity = 50;
                    state.slime.suspicion = Math.min(200, state.slime.suspicion + finalSuspicionGain);

                    if (finalSuspicionGain > 0) {
                        this.uiManager.showMessage(LANG['toast_suspicion_up_confusion'].replace('{AMOUNT}', finalSuspicionGain), 'warning');
                    }
                    if (isForced) {
                        const forcedPenalty = Math.round(40 * suspicionReduction);
                        state.slime.suspicion = Math.min(200, state.slime.suspicion + forcedPenalty);
                        this.uiManager.showMessage(LANG['toast_suspicion_up_forced'].replace('{AMOUNT}', forcedPenalty), 'error');
                    }

                    this.game.timeManager.advanceSegment();
                }
            }]
        });
    }
}

class NpcManager {
    constructor(stateManager, uiManager, skillManager, game) {
        this.stateManager = stateManager;
        this.uiManager = uiManager;
        this.skillManager = skillManager;
        this.game = game;
        this.languageManager = game.languageManager;
    }
    // 在 NpcManager 类中
    // ▼▼▼ 使用这个【最终完整版】的函数，替换掉旧的 updateNpcPresence ▼▼▼

    updateNpcPresence() {
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();

        // 1. 重置所有NPC的在场状态
        Object.values(state.npcs).forEach(npc => npc.isPresent = false);

        // 2. 获取当前玩家的位置
        const currentLocation = state.controlState === 'SLIME_DETACHED'
            ? state.slime.currentLocationId
            : (activeHost ? activeHost.currentLocationId : null);

        if (!currentLocation) return;

        // --- 第一章 NPC ---
        if (state.chapter === 1) {
            const zhang_chao = state.npcs.zhang_chao;
            if (zhang_chao.met) {
                const isWorkTime = state.time.dayOfWeek <= 5 && (state.time.segment.startsWith('noon') || state.time.segment.startsWith('afternoon'));
                if (isWorkTime && currentLocation === 'work_office') {
                    zhang_chao.isPresent = true;
                }
            }
        }

        // --- 第二章 NPC ---
        if (state.chapter === 2) {
            // 赵齐民: 只在工作时间 (周一至周五) 的中午和下午出现在办事处
            const zhao_qimin = state.npcs.zhao_qimin;
            if (zhao_qimin.met) {
                const isOfficeHours = state.time.segment.startsWith('noon') || state.time.segment.startsWith('afternoon');
                if (isOfficeHours && currentLocation === 'village_office') {
                    zhao_qimin.isPresent = true;
                }
            }
        }

        // --- 通用：作为NPC的宿主 (例如宋欣、张慧丽、刘敏) ---
        // 逻辑：如果一个宿主当前由AI控制，并且玩家和TA在同一个地方，那么TA就作为NPC“在场”
        Object.entries(state.hosts).forEach(([hostId, hostData]) => {
            if (state.npcs[hostId]) {
                // 【优化后逻辑】只要 NPC 已见面、和玩家在同一地点，并且她不是玩家当前控制的角色，就应该视为在场。
                const isNotPlayerCharacter = (hostId !== state.activeHostId);

                if (state.npcs[hostId].met && isNotPlayerCharacter && hostData.currentLocationId === currentLocation) {
                    state.npcs[hostId].isPresent = true;
                }
            }
        });
    }

    openNsfwChoiceModal() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();
        if (!activeHost) return;

        const hostNsfwData = gameData.allNsfwData[state.activeHostId];
        if (!hostNsfwData) return;

        this.uiManager.openModal(LANG['modal_instinct_prompt_title'], (contentEl) => {
            contentEl.innerHTML = LANG['modal_instinct_prompt_desc'];
            const container = document.createElement('div');
            container.className = 'space-y-3';
            contentEl.appendChild(container);

            // --- A. 创建“独处”选项 ---
            if (hostNsfwData.self) {
                const selfData = hostNsfwData.self;
                const staminaCost = Math.abs(selfData.baseEffects.stamina || 0);

                // ▼▼▼ 【核心优化】动态文案组合 ▼▼▼
                let buttonText = LANG['nsfw_choice_self']; // 1. 获取基础文案 (例如 "自慰")
                if (state.controlState === 'HOST' && staminaCost > 0) {
                    // 2. 如果是HOST模式且有消耗，附加后缀
                    const costSuffix = LANG['nsfw_choice_cost_suffix'] || ' (Stamina -{COST})';
                    buttonText += costSuffix.replace('{COST}', staminaCost);
                }
                // 在 SLIME 模式下，则什么都不做，直接使用基础文案

                const button = this.uiManager.createActionButton(buttonText, 'bg-pink-600', () => {
                    this.uiManager.closeModal();
                    this.showNsfwEvent('self');
                });

                if (state.controlState === 'HOST' && activeHost.stamina < staminaCost) {
                    button.disabled = true;
                    button.textContent += LANG['nsfw_choice_disabled_stamina'];
                }
                container.appendChild(button);
            }

            // --- B. 动态创建所有可用的“互动”选项 ---
            if (hostNsfwData.partnered) {
                Object.entries(hostNsfwData.partnered).forEach(([interactionKey, interactionData]) => {
                    if (interactionData.condition(state, this.skillManager)) {
                        const staminaCost = Math.abs(interactionData.effects.stamina || 0);

                        // ▼▼▼ 【核心优化】同样的动态文案组合逻辑 ▼▼▼
                        let buttonText = LANG[interactionData.buttonTextKey]; // 1. 获取基础文案
                        if (state.controlState === 'HOST' && staminaCost > 0) {
                            // 2. 如果是HOST模式且有消耗，附加后缀
                            const costSuffix = LANG['nsfw_choice_cost_suffix'] || ' (Stamina -{COST})';
                            buttonText += costSuffix.replace('{COST}', staminaCost);
                        }

                        const button = this.uiManager.createActionButton(buttonText, 'bg-pink-600', () => {
                            this.uiManager.closeModal();
                            this.showNsfwEvent('partnered', interactionKey);
                        });

                        if (state.controlState === 'HOST' && activeHost.stamina < staminaCost) {
                            button.disabled = true;
                            button.classList.add('opacity-50', 'cursor-not-allowed');
                            button.textContent += LANG['nsfw_choice_disabled_stamina'];
                        }
                        container.appendChild(button);
                    }
                });
            }
        });
    }

    // 在 NpcManager 类中
    // ▼▼▼ 使用这个【参数修正版】，完整替换掉旧的 showNsfwEvent 函数 ▼▼▼

    showNsfwEvent(nsfwType = 'self', interactionKey = null) { // 参数名从 partnerId 改为 interactionKey
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();
        if (!activeHost) return;

        const controlState = state.controlState.includes('SLIME') ? 'SLIME' : 'HOST';
        const hostNsfwData = gameData.allNsfwData[state.activeHostId];

        let eventData;
        let partnerNpcId = null;

        if (nsfwType === 'self') {
            const locationId = activeHost.currentLocationId;
            const locationNsfw = hostNsfwData.self.locations[locationId] || hostNsfwData.self.locations.default;
            eventData = {
                titleKey: hostNsfwData.self.titleKey,
                descriptionKey: locationNsfw.descriptions[controlState],
                backgroundImage: locationNsfw.images[controlState],
                choiceKey: hostNsfwData.self.choiceKey
            };
        } else if (nsfwType === 'partnered' && interactionKey) {
            const interactionData = hostNsfwData.partnered[interactionKey];
            partnerNpcId = interactionData.npcId;

            // 【新增】支持根据HOST/SLIME模式动态选择标题
            let titleKey = interactionData.titleKey;
            if (typeof titleKey === 'object') {
                titleKey = titleKey[controlState] || Object.values(titleKey)[0];
            }

            eventData = {
                titleKey: titleKey, // 使用处理后的 titleKey
                descriptionKey: interactionData.descriptions[controlState],
                backgroundImage: interactionData.images[controlState],
                choiceKey: 'nsfw_event_choice_succumb'
            };
        }

        if (!eventData || !eventData.backgroundImage || !eventData.descriptionKey) {
            this.uiManager.showMessage('toast_nsfw_not_available_in_this_mode', 'warning');
            return;
        }

        this.uiManager.openEventModal({
            title: LANG[eventData.titleKey],
            description: LANG[eventData.descriptionKey],
            background: eventData.backgroundImage,
            choices: [{
                text: LANG[eventData.choiceKey],
                color: 'bg-red-800',
                // 【核心修复】现在 interactionKey 在这个作用域中是正确定义的了
                action: () => { this.uiManager.closeEventModal(); this.triggerNSFW(nsfwType, interactionKey, partnerNpcId); }
            }]
        });
    }

    // 在 game.js 的 NpcManager 类中，用这个【完全重写版】替换 triggerNSFW 函数

    triggerNSFW(nsfwType = 'self', interactionKey = null, partnerNpcId = null) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();
        if (!activeHost) return;

        // --- 1. 通用前置处理 ---
        activeHost.nsfwUsedThisSegment = true;
        state.story.nsfwActsToday++;
        const activeHostId = state.activeHostId;
        const controlState = state.controlState.includes('SLIME') ? 'SLIME' : 'HOST';
        const hostNsfwData = gameData.allNsfwData[activeHostId];

        // --- 2. 预计算技能效果 ---
        const integrationRank = this.skillManager.getSkillRank('neural_integration', activeHostId);
        const sanityMultiplier = 1 + (integrationRank * 0.20);
        const memoryPlunderRank = this.skillManager.getSkillRank('memory_plunder', activeHostId);
        const hormoneAllureRank = this.skillManager.getSkillRank('hormone_allure', activeHostId);
        const geneMutationRank = this.skillManager.getSkillRank('gene_mutation', activeHostId);
        const cuckoosNestRank = this.skillManager.getSkillRank('cuckoos_nest', activeHostId);

        // --- 3. 通用怀疑度计算函数 ---
        const calculateSuspicion = (baseSuspicion, interactionSuspicion = 0) => {
            const currentLocation = this.game.getCurrentChapterLocations()[activeHost.currentLocationId];
            const isInPublic = currentLocation && currentLocation.isPublic;

            // 1. 获取基础地区权重
            let locationModifier = currentLocation?.suspicionModifier || 1;

            // 2. 动态应用商店升级效果
            const upgrades = state.story.flags.chapter2.upgrades;
            if (upgrades.cameras_home_destroyed && currentLocation.category === 'huili_home') {
                locationModifier = Math.max(0.1, locationModifier - 0.5);
            }
            if (upgrades.cameras_public_destroyed && (currentLocation.category === 'village_in' || currentLocation.category === 'village_out')) {
                locationModifier = Math.max(0.1, locationModifier - 0.5);
            }

            let personalSuspicion = 0;
            if (baseSuspicion > 0 && state.story.nsfwActsToday > 3 && controlState === 'HOST') {
                personalSuspicion += baseSuspicion;
            }
            if (interactionSuspicion > 0) {
                personalSuspicion += interactionSuspicion;
            }

            if (personalSuspicion > 0) {
                const memoryReduction = 1 - (memoryPlunderRank * 0.2);
                personalSuspicion = Math.round(personalSuspicion * memoryReduction * locationModifier);
            }

            let publicSuspicion = 0;
            if (isInPublic) {
                publicSuspicion = 50;
                const hormoneReduction = 1 - (hormoneAllureRank * 0.2);
                publicSuspicion = Math.round(publicSuspicion * hormoneReduction * locationModifier);
            }

            return {
                personal: personalSuspicion,
                public: publicSuspicion,
                total: personalSuspicion + publicSuspicion
            };
        };

        // --- 4. 根据事件类型处理 ---
        if (nsfwType === 'self' && hostNsfwData.self) {
            const selfData = hostNsfwData.self;
            const effects = selfData.baseEffects;
            const staminaLoss = Math.abs(effects.stamina || 0);
            const finalSanityLoss = Math.round(Math.abs(effects.sanity || 0) * sanityMultiplier);

            // 计算怀疑度
            const suspicionResult = calculateSuspicion(effects.baseSuspicion || 0);

            // 应用体力和理智效果
            if (staminaLoss > 0 && controlState === 'HOST') {
                activeHost.stamina = Math.max(0, activeHost.stamina - staminaLoss);
                this.uiManager.showMessage('toast_stamina_down_self', 'warning', { COST: staminaLoss });
            }

            if (finalSanityLoss > 0 && controlState === 'HOST') {
                activeHost.sanity = Math.max(0, activeHost.sanity - finalSanityLoss);
                this.uiManager.showMessage('toast_sanity_down_self', 'warning', { COST: finalSanityLoss });
            }

            // 应用怀疑度
            if (suspicionResult.total > 0) {
                state.slime.suspicion = Math.min(200, state.slime.suspicion + suspicionResult.total);

                // 根据是否在公共场所选择提示信息
                const messageKey = suspicionResult.public > 0 ? 'toast_suspicion_up_self_public' : 'toast_suspicion_up_self';
                this.uiManager.showMessage(messageKey, 'warning', { SUSPICION: suspicionResult.total });
            }

            // 突变点计算
            let mutationChance = 0.3 + (geneMutationRank * 0.15);
            if (controlState === 'SLIME') {
                mutationChance += (cuckoosNestRank * 0.15);
            }

            if (Math.random() < mutationChance) {
                state.slime.mutationPoints += 1;
                this.uiManager.showMessage('toast_mutation_up_1', 'success');
            }
        }
        else if (nsfwType === 'partnered' && interactionKey && partnerNpcId && hostNsfwData.partnered) {
            const interactionData = hostNsfwData.partnered[interactionKey];
            const effects = interactionData.effects;
            const staminaLoss = Math.abs(effects.stamina || 0);
            const finalSanityLoss = Math.round(Math.abs(effects.sanity || 0) * sanityMultiplier);
            const favorGain = effects.favorability || 0;

            // 计算怀疑度
            const suspicionResult = calculateSuspicion(
                effects.baseSuspicion || 0,
                effects.interactionSuspicion || 0
            );

            // 应用好感度效果
            if (favorGain > 0) {
                state.npcs[partnerNpcId].favorability = Math.min(100, state.npcs[partnerNpcId].favorability + favorGain);
                const npcName = state.npcs[partnerNpcId].name;
                this.uiManager.showMessage('toast_favor_up_npc', 'success', { NPC_NAME: npcName, FAVOR: favorGain });
            }

            // 应用体力和理智效果
            if (staminaLoss > 0) {
                activeHost.stamina = Math.max(0, activeHost.stamina - staminaLoss);
                this.uiManager.showMessage('toast_stamina_down_intense', 'warning', { COST: staminaLoss });
            }
            if (finalSanityLoss > 0) {
                activeHost.sanity = Math.max(0, activeHost.sanity - finalSanityLoss);
                this.uiManager.showMessage('toast_sanity_down_taboo', 'warning', { COST: finalSanityLoss });
            }

            // 应用怀疑度
            if (suspicionResult.total > 0) {
                state.slime.suspicion = Math.min(200, state.slime.suspicion + suspicionResult.total);
                this.uiManager.showMessage('toast_suspicion_up_couple', 'warning', { SUSPICION: suspicionResult.total });
            }

            // 突变点计算
            let mutationChance = (effects.mutationChance || 0) + (geneMutationRank * 0.15);
            if (controlState === 'SLIME') {
                mutationChance += (cuckoosNestRank * 0.15);
            }

            if (Math.random() < mutationChance) {
                const points = effects.mutationPoints || 1;
                state.slime.mutationPoints += points;
                this.uiManager.showMessage(`toast_mutation_up_${points}`, 'success');
            }
        }

        // --- 5. 通用收尾处理 ---
        this.game.update();
        if (!this.game.checkGameState()) {
            this.game.timeManager.advanceSegment();
        }
    }
}

class TetrisManager {
    constructor(canvas, onComplete) {
        this.canvas = canvas; this.context = canvas.getContext('2d'); this.onComplete = onComplete;
        this.COLS = 12; this.ROWS = 24; this.BLOCK_SIZE = 20;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.scale(this.BLOCK_SIZE, this.BLOCK_SIZE);
        this.arena = this.createMatrix(this.COLS, this.ROWS);
        this.player = { pos: { x: 0, y: 0 }, matrix: null };
        this.linesCleared = 0; this.TARGET_LINES = 4;
        this.dropCounter = 0; this.dropInterval = 1000;
        this.lastTime = 0; this.animationFrameId = null;
        this.colors = [null, '#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'];
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
        this.boundUpdate = this.update.bind(this);
    }
    createMatrix(w, h) { const m = []; while (h--) { m.push(new Array(w).fill(0)); } return m; }
    createPiece(t) {
        if (t === 'T') return [[0, 0, 0], [1, 1, 1], [0, 1, 0]]; if (t === 'O') return [[2, 2], [2, 2]];
        if (t === 'L') return [[0, 3, 0], [0, 3, 0], [0, 3, 3]]; if (t === 'J') return [[0, 4, 0], [0, 4, 0], [4, 4, 0]];
        if (t === 'I') return [[0, 5, 0, 0], [0, 5, 0, 0], [0, 5, 0, 0], [0, 5, 0, 0]];
        if (t === 'S') return [[0, 6, 6], [6, 6, 0], [0, 0, 0]]; if (t === 'Z') return [[7, 7, 0], [0, 7, 7], [0, 0, 0]];
    }
    drawMatrix(m, o) { m.forEach((r, y) => r.forEach((v, x) => { if (v !== 0) { this.context.fillStyle = this.colors[v]; this.context.fillRect(x + o.x, y + o.y, 1, 1); } })); }
    draw() {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.COLS, this.ROWS);
        this.drawMatrix(this.arena, { x: 0, y: 0 });
        this.drawMatrix(this.player.matrix, this.player.pos);
    }
    merge() { this.player.matrix.forEach((r, y) => r.forEach((v, x) => { if (v !== 0) { this.arena[y + this.player.pos.y][x + this.player.pos.x] = v; } })); }
    collide() {
        const [m, o] = [this.player.matrix, this.player.pos];
        for (let y = 0; y < m.length; ++y) for (let x = 0; x < m[y].length; ++x) if (m[y][x] !== 0 && (this.arena[y + o.y] && this.arena[y + o.y][x + o.x]) !== 0) return true;
        return false;
    }
    playerDrop() {
        this.player.pos.y++;
        if (this.collide()) { this.player.pos.y--; this.merge(); this.playerReset(); this.arenaSweep(); }
        this.dropCounter = 0;
    }
    playerMove(d) { this.player.pos.x += d; if (this.collide()) this.player.pos.x -= d; }
    playerReset() {
        const p = 'ILJOTSZ'; this.player.matrix = this.createPiece(p[p.length * Math.random() | 0]);
        this.player.pos.y = 0; this.player.pos.x = (this.arena[0].length / 2 | 0) - (this.player.matrix[0].length / 2 | 0);
        if (this.collide()) this.gameOver();
    }
    playerRotate(d) {
        const p = this.player.pos.x; let o = 1; this.rotate(this.player.matrix, d);
        while (this.collide()) { this.player.pos.x += o; o = -(o + (o > 0 ? 1 : -1)); if (o > this.player.matrix[0].length) { this.rotate(this.player.matrix, -d); this.player.pos.x = p; return; } }
    }
    rotate(m, d) {
        for (let y = 0; y < m.length; ++y) for (let x = 0; x < y; ++x) [m[x][y], m[y][x]] = [m[y][x], m[x][y]];
        if (d > 0) m.forEach(r => r.reverse()); else m.reverse();
    }
    arenaSweep() {
        outer: for (let y = this.arena.length - 1; y > 0; --y) {
            for (let x = 0; x < this.arena[y].length; ++x) if (this.arena[y][x] === 0) continue outer;
            const r = this.arena.splice(y, 1)[0].fill(0); this.arena.unshift(r); ++y; this.linesCleared++;
        }
        document.getElementById('tetris-lines-left').textContent = Math.max(0, this.TARGET_LINES - this.linesCleared);
        if (this.linesCleared >= this.TARGET_LINES) this.gameWon();
    }
    stop() { cancelAnimationFrame(this.animationFrameId); document.removeEventListener('keydown', this.boundHandleKeyDown); }
    gameOver() { this.stop(); this.onComplete(false); }
    gameWon() { this.stop(); this.onComplete(true); }
    update(t = 0) {
        const dt = t - this.lastTime; this.lastTime = t; this.dropCounter += dt;
        if (this.dropCounter > this.dropInterval) this.playerDrop();
        this.draw(); this.animationFrameId = requestAnimationFrame(this.boundUpdate);
    }
    handleKeyDown(e) {
        if (e.keyCode === 37) this.playerMove(-1); else if (e.keyCode === 39) this.playerMove(1);
        else if (e.keyCode === 40) this.playerDrop(); else if (e.keyCode === 38) this.playerRotate(1);
    }
    start() {
        document.addEventListener('keydown', this.boundHandleKeyDown);
        this.playerReset(); this.update();
    }
}

class Game {
    // 在 Game 类中
    constructor() {
        this.languageManager = new LanguageManager();
        this.uiManager = new UIManager(this, this.languageManager);
        this.stateManager = new StateManager();
        this.skillManager = new SkillManager(this.stateManager, this.uiManager, this.languageManager);
        this.timeManager = new TimeManager(this.stateManager, this.uiManager, this.skillManager, (event) => this.onTimeAdvanced(event), this.languageManager, this);
        this.eventManager = new EventManager(this.stateManager, this.uiManager, this);
        this.npcManager = new NpcManager(this.stateManager, this.uiManager, this.skillManager, this);

        this.eventQueue = [];

        // ▼▼▼ 关键改动：直接引用 UIManager 的 dom 对象，不再重复获取 ▼▼▼
        this.dom = this.uiManager.dom;

        document.addEventListener('languageChange', () => {
            this.updateDynamicTexts();
            this.update();
        });
        this.languageManager.applyLanguage();
    }

    getActiveHostFlows() {
        const state = this.stateManager.getState();
        const chapterFlows = gameData.allDailyFlows[state.chapter];
        if (!chapterFlows) return null;
        return chapterFlows[state.activeHostId] || null;
    }

    updateDynamicTexts() {
        try {
            const state = this.stateManager.getState();
            const LANG = this.languageManager.getCurrentLanguageData();
            Object.keys(state.hosts).forEach(hostId => {
                if (state.hosts[hostId] && LANG[`host_name_${hostId}`]) {
                    state.hosts[hostId].name = LANG[`host_name_${hostId}`];
                }
            });
            Object.keys(state.npcs).forEach(npcId => {
                const langKey = npcId === 'song_xin' ? `host_name_${npcId}` : `npc_name_${npcId}`;
                if (state.npcs[npcId] && LANG[langKey]) {
                    state.npcs[npcId].name = LANG[langKey];
                }
            });
        } catch (error) {
            console.warn('Error updating dynamic texts:', error);
        }
    }

    switchLanguage() {
        if (this.languageManager) {
            this.languageManager.switchLanguage();
        } else {
            console.warn('LanguageManager not initialized');
        }
    }

    startGame() {
        this.showMainMenu();
        this.attachEventListeners();
    }

    showMainMenu() {
        this.dom.startMenu.classList.remove('hidden');
        this.dom.gameContainer.classList.add('hidden');
        this.uiManager.dom.gameoverModal.classList.add('hidden');

        // ▼▼▼ 【核心修改】使用循环来检查所有存档栏位，而不是写死 ▼▼▼
        let hasSave = false;
        for (let i = 1; i <= NUM_SAVE_SLOTS; i++) {
            if (localStorage.getItem(`parasite_save_v8_${i}`)) {
                hasSave = true;
                break; // 只要找到一个存档，就没必要继续检查了
            }
        }

        this.dom.continueGameButton.disabled = !hasSave;
    }

    beginNewGame() {
        this.dom.startMenu.classList.add('hidden');
        this.uiManager.openChapterSelectModal(); // 不再直接开始游戏，而是打开章节选择
    }

    continueGame() {
        this.dom.startMenu.classList.add('hidden');
        this.dom.gameContainer.classList.remove('hidden');
        this.openSaveLoadModal('load');
    }

    init() {
        this.uiManager.dom.gameContainer.classList.remove('hidden');
        const state = this.stateManager.getState();
        if (state.story.dailyFlow === 'none' && state.time.dayOfWeek > 5) {
            state.story.dailyFlow = 'weekend';
        }
        this.updateDynamicTexts();
        this.update();
    }

    // ▼▼▼ 在 Game 类中，添加这个全新的函数 ▼▼▼
    checkLocationTriggers() {
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();
        if (!activeHost) return false;

        for (const trigger of gameData.locationTriggerEvents) {
            // 检查：1. 地点是否匹配  2. 触发条件是否满足
            if (activeHost.currentLocationId === trigger.locationId && trigger.condition(state)) {
                this.eventManager.triggerEvent(trigger.eventName);
                return true;
            }
        }
        return false;
    }

    // 在 Game 类中
    update() {
        const state = this.stateManager.getState();

        if (this.checkLocationTriggers()) {
            return; // 如果触发了事件，则立即停止本次update，防止逻辑冲突
        }

        const activeHost = this.stateManager.getActiveHost();

        // 1. 玩家控制的宿主，根据日程更新期望地点
        if (state.controlState === 'HOST' && activeHost) {
            const hostFlows = this.getActiveHostFlows();
            if (hostFlows) {
                const flow = hostFlows[state.story.dailyFlow] || hostFlows[Object.keys(hostFlows)[0]];
                if (flow && flow[state.time.segment]) {
                    activeHost.expectedLocationId = flow[state.time.segment].locationId;
                }
            }
        }

        // 2. 所有宿主执行移动（AI宿主 + 宿主模式下的玩家宿主）
        Object.entries(state.hosts).forEach(([hostId, hostData]) => {
            const isPlayerControlledHost = (hostId === state.activeHostId);
            const isInHostMode = state.controlState === 'HOST';

            // 移动条件：是AI宿主 OR（是玩家宿主且处于宿主模式）
            const shouldAutoMove = !isPlayerControlledHost || (isPlayerControlledHost && isInHostMode);

            if (shouldAutoMove && hostData.currentLocationId !== hostData.expectedLocationId) {
                hostData.currentLocationId = hostData.expectedLocationId;
            }
        });

        // 3. 处理事件队列
        if (this.eventQueue.length > 0 && this.uiManager.dom.eventModal.classList.contains('hidden')) {
            this.processNextEvent();
        } else {
            this.eventManager.checkTriggerEvents();
            if (this.eventQueue.length > 0) {
                this.processNextEvent();
                return;
            }
        }

        // 4. 渲染和检查游戏状态
        this.npcManager.updateNpcPresence();
        this.uiManager.render(state, this);
        this.checkGameState();
    }

    processNextEvent() {
        if (this.eventQueue.length === 0) return;
        const eventType = this.eventQueue.shift();
        // 在 Game.processNextEvent 中
        switch (eventType) {
            case 'health_check': this.eventManager.triggerEvent('health_check_notice'); break;
            case 'zhang_chao_intro': this.eventManager.triggerEvent('zhang_chao_intro'); break;
            case 'song_xin_arrival': this.eventManager.triggerEvent('song_xin_arrival'); break;
        }
    }

    onTimeAdvanced(event = {}) {
        if (event.gameEvent) {
            switch (event.gameEvent) {
                case 'force_return_control': this.returnControl(true); break;
                case 'start_clicker_game':
                    this.eventManager.startClickerGame(event.hostId);
                    break;
                case 'health_check_failed': this.eventManager.triggerEvent('health_check_failure'); break;
                case 'bomb_detonated': this.uiManager.showGameOver('BOMB_DETONATED'); break; // <-- 处理新的事件
            }
        } else { this.update(); }
    }

    // 在 Game 类中
    attachEventListeners() {
        // --- 核心游戏按钮 ---
        this.dom.skillTreeButton.onclick = () => this.skillManager.openSkillTreeModal(this);
        this.dom.locationEventButton.onclick = () => this.openLocationEventModal();
        this.dom.hostManagementButton.onclick = () => this.openHostManagementModal();

        // --- 存档与系统 ---
        this.dom.saveButton.onclick = () => this.openSaveLoadModal('save');
        this.dom.loadButton.onclick = () => this.openSaveLoadModal('load');
        this.dom.resetButton.onclick = () => this.resetGame(false);
        this.dom.cheatButton.onclick = () => this.openCheatModal();

        // --- 主菜单按钮 ---
        this.dom.startNewGameButton.onclick = () => this.beginNewGame();
        this.dom.continueGameButton.onclick = () => this.continueGame();
        this.dom.gameoverRestartButton.onclick = () => this.showMainMenu();

        // --- 模态框与特殊UI ---
        this.dom.modalCloseButton.onclick = () => this.uiManager.closeModal();

        // ▼▼▼ 【核心修复】修改此处的点击事件 ▼▼▼
        this.dom.chapterSelectCloseButton.onclick = () => {
            this.uiManager.closeModal(); // 首先关闭章节选择弹窗
            this.showMainMenu();      // 然后显示主菜单
        };
        // ▲▲▲ 修复结束 ▲▲▲

        this.dom.modalOverlay.onclick = () => { this.uiManager.closeModal(); this.uiManager.hideConfirm(); };
        this.dom.taskButton.onclick = () => this.openTaskModal();
        this.dom.enterHostButton.onclick = () => this.enterHost();
        this.dom.detachButton.onclick = () => {
            const state = this.stateManager.getState();
            if (state.controlState === 'SLIME_DETACHED') this.enterHost();
            else this.detachFromHost();
        };
        this.dom.importSaveButton.onclick = () => this.importSave();
    }

    handleAction(actionId) {
        const action = gameData.actionData[actionId];
        if (!action) return;
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();
        if (action.effects) {
            action.effects.forEach(eff => {
                if (eff.stat === 'suspicion') state.slime[eff.stat] = Math.min(200, state.slime[eff.stat] + eff.value);
                else if (activeHost) activeHost[eff.stat] = Math.max(0, activeHost[eff.stat] + eff.value);
            });
        }
        if (action.nextFlow) { state.story.dailyFlow = action.nextFlow; }
        if (action.timeEvent === 'advance') this.timeManager.advanceSegment();
        else if (action.event === 'open_nsfw_modal') this.npcManager.openNsfwChoiceModal();
        else if (action.timeEvent === 'nsfw') this.npcManager.triggerNSFW();
        else this.update();
    }

    // 在 game.js 的 Game 类中
    handleSlimeAction(actionType) {
        switch (actionType) {
            case 'MOVE': this.openMoveModal(); break;
            case 'NSFW': this.npcManager.openNsfwChoiceModal(); break;
            // ▼▼▼ 核心修复 ▼▼▼
            case 'RETURN_CONTROL': this.eventManager.returnControl(); break;
            // ▲▲▲ 修复结束 ▲▲▲
            case 'WAIT': this.timeManager.advanceSegment(); break;
        }
    }

    // 在 game.js 的 Game 类中，用此函数【完整替换】旧的 openMoveModal 函数

    // 在 game.js 的 Game 类中
    // ▼▼▼ 使用这个【最终版】的代码，完整替换掉旧的 openMoveModal 函数 ▼▼▼

    openMoveModal() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const isDetached = state.controlState === 'SLIME_DETACHED';
        const currentChapterLocations = this.getCurrentChapterLocations();
        let availableLocations;
        let currentLocationId;

        // --- 1. 获取所有可用的地点 ---
        const isLocationUnlocked = (locationData) => {
            if (!locationData.unlockFlag) { return true; }
            const flagPath = locationData.unlockFlag.split('.');
            let flagValue = state.story.flags;
            for (const key of flagPath) {
                flagValue = flagValue?.[key];
                if (flagValue === undefined) { return false; }
            }
            return !!flagValue;
        };

        if (isDetached) {
            currentLocationId = state.slime.currentLocationId;
            availableLocations = Object.entries(currentChapterLocations).filter(([id, data]) => isLocationUnlocked(data));
        } else {
            const activeHost = this.stateManager.getActiveHost();
            if (!activeHost) return;
            currentLocationId = activeHost.currentLocationId;
            const hostTags = activeHost.tags || [];
            availableLocations = Object.entries(currentChapterLocations).filter(([locationId, locationData]) => {
                if (!isLocationUnlocked(locationData)) { return false; }
                // 在这里添加针对刘敏家的特殊权限检查
                if (locationId.startsWith('liumin_home') && state.activeHostId === 'zhang_huili' && state.npcs.liu_min.favorability > 30) {
                    return true;
                }
                if (!locationData.accessTags) return false;
                return hostTags.some(tag => locationData.accessTags.includes(tag));
            });
        }

        // --- 2. 打开模态框并渲染内容 ---
        this.uiManager.openModal(LANG['modal_title_move_to'], (contentEl) => {
            // A. 将可用地点按 category 分组
            const locationsByCategory = {};
            availableLocations.forEach(([id, data]) => {
                const category = data.category || 'public';
                if (!locationsByCategory[category]) {
                    locationsByCategory[category] = [];
                }
                locationsByCategory[category].push([id, data]);
            });

            // B. 【核心】从 data.js 动态加载当前章节的UI配置
            const chapterConfig = gameData.chapterData[state.chapter];
            if (!chapterConfig || !chapterConfig.moveModalConfig) {
                console.error(`Move modal configuration not found for chapter ${state.chapter}!`);
                contentEl.innerHTML = `<p class="text-center text-gray-400">Error: UI Config Missing.</p>`;
                return;
            }
            const moveConfig = chapterConfig.moveModalConfig;
            const categoryOrder = moveConfig.categoryOrder;
            const colorMap = moveConfig.colors;

            // C. 内部渲染函数 (无需修改)
            const renderLocationGroup = (titleKey, locations, colorClass) => {
                if (locations && locations.length > 0) {
                    const title = document.createElement('h4');
                    title.className = 'text-lg font-bold text-purple-400 border-b border-gray-600 pb-2';
                    title.textContent = LANG[titleKey] || titleKey;
                    container.appendChild(title);
                    const locContainer = document.createElement('div');
                    locContainer.className = 'grid grid-cols-2 gap-3';
                    locations.forEach(([id, data]) => {
                        const button = this.uiManager.createActionButton(LANG[data.nameKey], colorClass, () => this.moveToLocation(id));
                        if (id === currentLocationId) {
                            button.disabled = true;
                            button.classList.add('opacity-50', 'cursor-not-allowed');
                        }
                        locContainer.appendChild(button);
                    });
                    container.appendChild(locContainer);
                }
            };

            const container = document.createElement('div');
            container.className = 'space-y-4';
            contentEl.appendChild(container);

            // D. 遍历从配置中读取的顺序，进行动态渲染
            categoryOrder.forEach(categoryKey => {
                const locations = locationsByCategory[categoryKey];
                if (locations) {
                    const titleKey = `move_category_${categoryKey}`;
                    const colorClass = colorMap[categoryKey] || 'bg-gray-500'; // 从配置中读取颜色
                    renderLocationGroup(titleKey, locations, colorClass);
                }
            });

            // E. 处理没有可用地点的情况
            if (availableLocations.length === 0) {
                container.innerHTML = `<p class="text-center text-gray-400">${LANG['no_locations_available'] || 'No available locations.'}</p>`;
            }
        });
    }

    // 在 game.js 的 Game 类中
    checkGameState() {
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();

        // ▼▼▼ 【核心修改】重写怀疑值满的判断逻辑 ▼▼▼
        if (state.slime.suspicion >= 200) {
            let reason = 'SLIME'; // 设置一个默认值

            // 如果是第二章，则强制使用新的结局
            if (state.chapter === 2) {
                reason = 'FALSE_TAKEOVER_ZH_OUTCOME';
            }
            // 否则，执行原来的第一章结局逻辑
            else {
                if (state.controlState === 'SLIME_DETACHED') reason = 'SLIME_ALONE_CONTAINED';
                else if (state.activeHostId === 'song_xin') {
                    reason = state.hosts.song_wei.wasEverPossessed ? 'SONG_XIN_AND_SONG_WEI_LOST' : 'SONG_XIN_CONTROLLED';
                } else if (state.activeHostId === 'song_wei') {
                    if (state.controlState === 'PERMANENT_SLIME') reason = 'PERMANENT_SLIME';
                    else reason = 'SLIME';
                }
            }

            this.uiManager.showGameOver(reason);
            return true;
        }
        // ▲▲▲ 修改结束 ▲▲▲

        if (activeHost && activeHost.sanity <= 0 && state.controlState === 'HOST') {
            const canTakeover = this.skillManager.getSkillRank('cuckoos_nest', state.activeHostId) > 0;
            this.uiManager.toggleTakeoverScreen(true, canTakeover, activeHost);
            return true;
        }
        return false;
    }

    // 文件: game.js

    startNewChapter() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const nextChapter = state.chapter + 1;
        // ▼▼▼ 核心修正：从 data.js 的 chapterSetupData 读取配置 ▼▼▼
        const setup = gameData.chapterSetupData[nextChapter];

        if (!setup) {
            console.error(`Chapter setup data not found for Chapter ${nextChapter}!`);
            this.uiManager.showGameOver('GENERIC_ERROR'); // 设置一个通用错误结局
            return;
        }

        // --- 开始根据配置数据更新游戏状态 ---
        state.chapter = nextChapter;
        state.story.mainQuest = setup.mainQuest || null;
        // ▼▼▼ 核心修正：正确地应用倒计时数据，而不是清空它 ▼▼▼
        state.story.countdown = setup.initialCountdown || {};

        if (setup.hostStatusChanges) {
            Object.entries(setup.hostStatusChanges).forEach(([hostId, changes]) => {
                if (state.hosts[hostId]) {
                    Object.assign(state.hosts[hostId], changes);
                }
            });
        }

        state.story.dailyFlow = setup.initialDailyFlow || 'none';

        const titleKey = `chapter_${nextChapter}_title`;
        this.uiManager.showMessage(LANG[titleKey] || `Chapter ${nextChapter}`, 'success');

        this.update();
    }

    // 在 Game 类中
    // ▼▼▼ 替换此函数 ▼▼▼
    takeControl() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();

        // 【核心】仅设置“被侵入过”的逻辑标记，绝不触碰UI标记
        if (activeHost && !activeHost.wasEverPossessed) {
            activeHost.wasEverPossessed = true;
        }

        state.controlState = 'SLIME';
        activeHost.sanity = 0;
        const erosionRanks = this.skillManager.getTotalErosionRanks(state.activeHostId);
        const staminaRefund = erosionRanks * 20;
        if (staminaRefund > 0) {
            activeHost.stamina = Math.min(100, activeHost.stamina + staminaRefund);
            this.uiManager.showMessage(LANG['toast_erosion_activated'].replace('{STAMINA}', staminaRefund), 'success');
        }
        this.uiManager.toggleTakeoverScreen(false, false, activeHost);
        this.uiManager.showMessage(LANG['toast_control_taken'], 'warning');
        this.update();
    }

    releaseControl() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();
        state.controlState = 'HOST';
        activeHost.sanity = 40;
        this.uiManager.toggleTakeoverScreen(false, false, activeHost);
        this.uiManager.showMessage(LANG['toast_control_released'], 'info');
        this.update();
    }

    returnControl(isForced = false) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();
        if (!activeHost) return;
        const memoryPlunderRank = this.skillManager.getSkillRank('memory_plunder', state.activeHostId);
        const suspicionReduction = 1 - (memoryPlunderRank * 0.2);
        let baseSuspicionGain = 20;
        const locationMismatch = activeHost.currentLocationId !== activeHost.expectedLocationId;
        if (locationMismatch) baseSuspicionGain += 30;
        const finalSuspicionGain = Math.round(baseSuspicionGain * suspicionReduction);
        let description = isForced ? LANG['return_control_forced_desc'] : LANG['return_control_voluntary_desc'];
        const currentChapterLocations = this.getCurrentChapterLocations();
        if (locationMismatch) {
            description += LANG['return_control_mismatch_desc']
                .replace('{HOST_NAME}', activeHost.name)
                .replace('{LOCATION_NAME}', LANG[currentChapterLocations[activeHost.currentLocationId].nameKey]);
        } else {
            description += LANG['return_control_match_desc'].replace('{HOST_NAME}', activeHost.name);
        }
        this.uiManager.openEventModal({
            title: LANG['return_control_title'],
            description: description,
            choices: [{
                text: LANG['event_continue_ellipsis'], action: () => {
                    this.uiManager.closeEventModal();
                    state.controlState = 'HOST';
                    activeHost.sanity = 50;
                    state.slime.suspicion = Math.min(200, state.slime.suspicion + finalSuspicionGain);
                    if (finalSuspicionGain > 0) {
                        this.uiManager.showMessage(LANG['toast_suspicion_up_confusion'].replace('{AMOUNT}', finalSuspicionGain), 'warning');
                    }
                    if (isForced) {
                        const forcedPenalty = Math.round(40 * suspicionReduction);
                        state.slime.suspicion = Math.min(200, state.slime.suspicion + forcedPenalty);
                        this.uiManager.showMessage(LANG['toast_suspicion_up_forced'].replace('{AMOUNT}', forcedPenalty), 'error');
                    }
                    this.timeManager.advanceSegment();
                }
            }]
        });
    }
    // 在 Game 类中
    openSaveLoadModal(mode) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const title = mode === 'save' ? LANG['modal_title_save'] : LANG['modal_title_load'];

        this.dom.modalExtraButtons.classList.add('hidden');

        this.uiManager.openModal(title, (contentEl) => {
            const container = document.createElement('div');
            container.className = 'space-y-6';

            const importWrapper = document.createElement('div');
            importWrapper.className = 'flex justify-center';
            const importButton = this.uiManager.createActionButton(LANG['btn_import_save'], 'bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg');
            importButton.onclick = () => this.importSave();
            importWrapper.appendChild(importButton);
            container.appendChild(importWrapper);

            const saveSlotsContainer = document.createElement('div');
            saveSlotsContainer.className = 'space-y-4';

            for (let i = 1; i <= NUM_SAVE_SLOTS; i++) {
                const slotKey = `parasite_save_v8_${i}`;
                const data = localStorage.getItem(slotKey);

                const slotCard = document.createElement('div');
                slotCard.className = 'bg-gray-800/60 rounded-lg p-3 border-2 border-gray-700 hover:border-purple-500 transition-colors flex flex-col space-y-2';

                // ▼▼▼ 【核心修改】交换按钮位置 ▼▼▼

                // 1. 主信息和【导出】按钮
                const topRow = document.createElement('div');
                topRow.className = 'flex justify-between items-center';

                let infoHtml = `<span class="font-bold text-lg">${LANG['save_slot_prefix']} ${i}</span>`;
                if (data) {
                    const parsed = JSON.parse(data);
                    const timeOfDay = parsed.time.segment.split('-')[0];
                    const timeOfDayText = LANG['time_segment'][timeOfDay] || timeOfDay;
                    infoHtml += `<span class="text-gray-300">Day ${parsed.time.day} | ${timeOfDayText}</span>`;
                } else {
                    infoHtml += `<span class="text-gray-500">${LANG['save_slot_empty']}</span>`;
                }

                const infoWrapper = document.createElement('div');
                infoWrapper.className = 'flex-grow flex justify-between items-center pr-4';
                infoWrapper.innerHTML = infoHtml;

                const exportButton = this.uiManager.createActionButton(LANG['btn_export_save'], 'bg-sky-600 hover:bg-sky-700', () => this.exportSave(i));
                exportButton.classList.remove('w-full');
                exportButton.classList.add('w-auto', 'flex-shrink-0');
                if (!data) {
                    exportButton.disabled = true;
                    exportButton.classList.add('opacity-50', 'cursor-not-allowed');
                }

                topRow.appendChild(infoWrapper);
                topRow.appendChild(exportButton); // 将导出按钮放在顶部行
                slotCard.appendChild(topRow);

                // 2. 【保存/读取】按钮 (现在放在下方)
                const actionButton = this.uiManager.createActionButton(
                    mode === 'save' ? LANG['btn_save_game'] : LANG['btn_load_game'],
                    'bg-indigo-600 hover:bg-indigo-700 w-full mt-2',
                    () => {
                        this.uiManager.closeModal();
                        if (mode === 'save') {
                            if (this.stateManager.saveState(i)) this.uiManager.showMessage(LANG['toast_save_success'].replace('{SLOT}', i), 'success');
                            else this.uiManager.showMessage(LANG['toast_save_fail'], 'warning');
                        } else {
                            if (data) {
                                if (this.stateManager.loadState(i)) {
                                    this.uiManager.showMessage(LANG['toast_load_success'].replace('{SLOT}', i), 'success');
                                    this.init();
                                } else this.uiManager.showMessage(LANG['toast_load_fail'].replace('{SLOT}', i), 'warning');
                            } else {
                                this.uiManager.showMessage(LANG['toast_load_fail_empty_slot'], 'warning');
                            }
                        }
                    }
                );

                if (mode === 'load' && !data) {
                    actionButton.disabled = true;
                    actionButton.classList.add('opacity-50', 'cursor-not-allowed');
                }
                slotCard.appendChild(actionButton); // 将主按钮放在下方

                // ▲▲▲ 修改结束 ▲▲▲

                saveSlotsContainer.appendChild(slotCard);
            }
            container.appendChild(saveSlotsContainer);
            contentEl.appendChild(container);
        });

        this.dom.modalCloseButton.onclick = () => {
            this.dom.modalExtraButtons.classList.add('hidden');
            this.uiManager.closeModal();
        };
    }

    // 在 Game 类中
    // ▼▼▼ 使用这个【动态扩展版】，完整替换掉旧的 openCheatModal 函数 ▼▼▼

    openCheatModal() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState(); // 获取当前状态

        this.uiManager.openModal(LANG['modal_title_cheat'], (contentEl) => {
            // ▼▼▼ 【核心修改】动态生成 NPC 选项 ▼▼▼
            let npcOptions = '';
            Object.entries(state.npcs).forEach(([npcId, npcData]) => {
                // 只要这个NPC有favorability属性，就将它加入列表
                if (npcData.favorability !== undefined) {
                    npcOptions += `<option value="${npcId}">${npcData.name}</option>`;
                }
            });

            contentEl.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
                <button id="cheat-add-mutation" class="action-button bg-green-600 rounded-lg">${LANG['cheat_btn_add_mutation']}</button>
                <button id="cheat-restore-stamina" class="action-button bg-cyan-600 rounded-lg">${LANG['cheat_btn_restore_stamina']}</button>
                <button id="cheat-zero-sanity" class="action-button bg-purple-600 rounded-lg">${LANG['cheat_btn_zero_sanity']}</button>
                <button id="cheat-zero-suspicion" class="action-button bg-yellow-600 rounded-lg">${LANG['cheat_btn_zero_suspicion']}</button>
            </div>
            <div class="mt-6 border-t border-gray-700 pt-4">
                <h4 class="text-lg font-bold text-center mb-2">${LANG['cheat_title_favor_editor']}</h4>
                <div class="space-y-3">
                    <div>
                        <label for="npc-select" class="block text-sm font-medium text-gray-400">${LANG['cheat_label_target']}</label>
                        <select id="npc-select" class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            ${npcOptions}
                        </select>
                    </div>
                    <div>
                        <label for="favor-slider" class="block text-sm font-medium text-gray-400">${LANG['cheat_label_favor']}<span id="favor-value">50</span></label>
                        <input type="range" id="favor-slider" min="0" max="100" value="50" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer">
                    </div>
                    <button id="cheat-set-favor" class="action-button bg-pink-600 w-full rounded-lg">${LANG['cheat_btn_apply_favor']}</button>
                </div>
            </div>
        `;

            // --- 事件监听器保持不变 ---
            document.getElementById('cheat-add-mutation').onclick = () => this.applyCheat('add_mutation');
            document.getElementById('cheat-restore-stamina').onclick = () => this.applyCheat('restore_stamina');
            document.getElementById('cheat-zero-sanity').onclick = () => this.applyCheat('zero_sanity');
            document.getElementById('cheat-zero-suspicion').onclick = () => this.applyCheat('zero_suspicion');
            const slider = document.getElementById('favor-slider');
            const valueDisplay = document.getElementById('favor-value');
            slider.oninput = () => { valueDisplay.textContent = slider.value; };
            document.getElementById('cheat-set-favor').onclick = () => {
                const npcId = document.getElementById('npc-select').value;
                const favor = parseInt(slider.value, 10);
                this.applyCheat('set_favor', { npcId, favor });
            };
        });
    }

    applyCheat(type, payload) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const activeHost = this.stateManager.getActiveHost();
        switch (type) {
            case 'add_mutation': state.slime.mutationPoints += 50; this.uiManager.showMessage(LANG['toast_cheat_mutation'], 'success'); break;
            case 'restore_stamina': if (activeHost) activeHost.stamina = 100; this.uiManager.showMessage(LANG['toast_cheat_stamina'], 'success'); break;
            case 'zero_sanity': if (activeHost) activeHost.sanity = 0; this.uiManager.showMessage(LANG['toast_cheat_sanity'], 'warning'); break;
            case 'zero_suspicion': state.slime.suspicion = 0; this.uiManager.showMessage(LANG['toast_cheat_suspicion'], 'success'); break;
            case 'set_favor':
                state.npcs[payload.npcId].favorability = payload.favor;
                this.uiManager.showMessage(LANG['toast_cheat_favor_set'].replace('{NPC_NAME}', state.npcs[payload.npcId].name).replace('{FAVOR}', payload.favor), 'success');
                break;
        }
        this.uiManager.closeModal();
        this.update();
    }

    resetGame(isFromGameOver) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const action = () => {
            if (isFromGameOver) { window.location.reload(); }
            else { this.stateManager.resetState(); this.init(); this.uiManager.showMessage(LANG['toast_game_reset'], 'info'); }
        };
        if (isFromGameOver) { action(); }
        else { this.uiManager.showConfirm(LANG['confirm_reset_title'], LANG['confirm_reset_text'], action); }
    }

    // 在 UIManager 类中
    openTaskModal() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();

        this.uiManager.openModal(LANG['modal_title_task_details'], (contentEl) => {
            contentEl.innerHTML = `
                <div class="flex border-b border-gray-700 mb-4">
                    <button id="task-tab-button" class="px-4 py-2 text-lg font-bold border-b-2 border-purple-400 text-white">${LANG['tab_title_tasks']}</button>
                    <button id="log-tab-button" class="px-4 py-2 text-lg font-bold text-gray-500 border-b-2 border-transparent">${LANG['tab_title_logs']}</button>
                </div>
                <div id="task-tab-content"></div>
                <div id="log-tab-content" class="hidden text-sm space-y-2 max-h-[60vh] overflow-y-auto pr-2"></div>
            `;

            const taskTabButton = contentEl.querySelector('#task-tab-button');
            const logTabButton = contentEl.querySelector('#log-tab-button');
            const taskTabContent = contentEl.querySelector('#task-tab-content');
            const logTabContent = contentEl.querySelector('#log-tab-content');

            taskTabButton.addEventListener('click', () => {
                taskTabContent.classList.remove('hidden');
                logTabContent.classList.add('hidden');
                taskTabButton.classList.add('border-purple-400', 'text-white');
                taskTabButton.classList.remove('border-transparent', 'text-gray-500');
                logTabButton.classList.add('border-transparent', 'text-gray-500');
                logTabButton.classList.remove('border-purple-400', 'text-white');
            });

            logTabButton.addEventListener('click', () => {
                logTabContent.classList.remove('hidden');
                taskTabContent.classList.add('hidden');
                logTabButton.classList.add('border-purple-400', 'text-white');
                logTabButton.classList.remove('border-transparent', 'text-gray-500');
                taskTabButton.classList.add('border-transparent', 'text-gray-500');
                taskTabButton.classList.remove('border-purple-400', 'text-white');
            });

            const quest = state.story.mainQuest ? gameData.taskData[state.story.mainQuest] : null;
            let questContentHtml = '';
            if (!quest) {
                questContentHtml = `<p class="text-center text-gray-400">${LANG['task_none']}</p>`;
            } else {
                let stepsHtml = (quest.steps || []).filter(step => !step.isVisible || step.isVisible(state)).map(step =>
                    `<li class="mb-2 ${step.isDone(state) ? 'text-green-400 line-through' : 'text-gray-300'}">${step.isDone(state) ? '✓' : '✗'} ${LANG[step.textKey]}</li>`
                ).join('');
                questContentHtml = `
                    <h2 class="text-2xl font-bold text-amber-400 mb-2">${LANG[quest.titleKey]}</h2>
                    <p class="text-gray-300 mb-4">${LANG[quest.descriptionKey]}</p>
                    <h3 class="text-xl font-bold border-b border-gray-600 pb-2 mb-3">${LANG['task_current_objectives']}</h3>
                    <ul class="list-none pl-2">${stepsHtml}</ul>`;
            }
            let allVisibleHints = (quest?.hintsKeys || []).filter(hint => typeof hint === 'string' ? true : (!hint.condition || hint.condition(state))).map(hint => typeof hint === 'string' ? hint : hint.key);
            allVisibleHints.push(...(gameData.generalHints || []));
            const hintsListHtml = allVisibleHints.map(key => `<li>${LANG[key] || key}</li>`).join('');
            const hintsHtml = `
                <div class="mt-6 pt-4 border-t border-gray-600">
                    <h3 class="text-xl font-bold text-cyan-400 mb-3">${LANG['task_game_hints']}</h3>
                    <ul class="list-disc list-outside pl-4 space-y-2 text-gray-400 text-sm">
                        ${hintsListHtml}
                    </ul>
                </div>
            `;
            taskTabContent.innerHTML = questContentHtml + hintsHtml;

            // ▼▼▼ 【核心修复】修改日志的HTML和CSS类 ▼▼▼
            const logColors = { info: 'text-blue-300', success: 'text-green-300', warning: 'text-yellow-300', error: 'text-red-300' };
            if (state.logs.length === 0) {
                logTabContent.innerHTML = `<p class="text-gray-500">暂无日志记录。</p>`;
            } else {
                logTabContent.innerHTML = state.logs.slice().reverse().map(log =>
                    `<div class="flex items-start border-b border-white/10 pb-1 mb-1">
                        <span class="flex-shrink-0 font-bold text-gray-400 whitespace-nowrap">[${log.timestamp}]</span>
                        <span class="ml-2 ${logColors[log.type] || 'text-gray-200'}">${log.message}</span>
                    </div>`
                ).join('');
            }
            // ▲▲▲ 修复结束 ▲▲▲
        });
    }


    // 在 game.js 的 Game 类中
    // ▼▼▼ 使用这个新版本，完整替换掉旧的 openLocationEventModal 函数 ▼▼▼

    openLocationEventModal() {
        const LANG = this.languageManager.getCurrentLanguageData();
        this.uiManager.openModal(LANG['modal_title_location_events'], (contentEl) => {
            const state = this.stateManager.getState();
            const activeHost = this.stateManager.getActiveHost();
            const isDetached = state.controlState === 'SLIME_DETACHED';
            const currentLocationId = isDetached ? state.slime.currentLocationId : (activeHost ? activeHost.currentLocationId : null);

            if (!currentLocationId) {
                contentEl.innerHTML = `<p class="text-center text-gray-400">${LANG['no_location_events']}</p>`;
                return;
            }

            const availableEvents = Object.values(gameData.locationEventData).filter(event => {
                const locationMatch = Array.isArray(event.location) ? event.location.includes(currentLocationId) : event.location === currentLocationId;
                if (!locationMatch) return false;
                if (isDetached && event.npcId) return false;
                return event.condition(state, this.skillManager);
            });

            if (availableEvents.length === 0) {
                contentEl.innerHTML = `<p class="text-center text-gray-400">${LANG['no_location_events']}</p>`;
                return;
            }

            const eventsByNpc = {};
            const generalEvents = [];
            availableEvents.forEach(event => {
                if (event.npcId && state.npcs[event.npcId]) {
                    if (!eventsByNpc[event.npcId]) eventsByNpc[event.npcId] = [];
                    eventsByNpc[event.npcId].push(event);
                } else {
                    generalEvents.push(event);
                }
            });

            const container = document.createElement('div');
            container.className = 'space-y-3';
            contentEl.appendChild(container);

            // --- A. 渲染NPC互动按钮 (这部分逻辑不变) ---
            Object.entries(eventsByNpc).forEach(([npcId, events]) => {
                // ▼▼▼ 【核心修复】在这里增加“预检查”逻辑 ▼▼▼
                const interactionList = gameData.allNpcInteractions[npcId];
                let hasAvailableInteractions = false;
                if (interactionList) {
                    // 检查是否存在至少一个满足条件的互动
                    hasAvailableInteractions = interactionList.some(interaction =>
                        interaction.condition(state, this.skillManager)
                    );
                }

                // 如果没有任何可用互动，则直接跳过，不创建按钮
                if (!hasAvailableInteractions) return;
                // ▲▲▲ 修复结束 ▲▲▲
                const npc = state.npcs[npcId];
                const buttonTextTemplate = LANG['event_interact_with_npc_btn'] || 'Interact with {NPC_NAME}';
                const buttonText = buttonTextTemplate.replace('{NPC_NAME}', npc.name);
                const mainInteraction = events[0];
                const button = this.uiManager.createActionButton(buttonText, mainInteraction.color || 'bg-indigo-600', () => {
                    this.uiManager.closeModal();
                    mainInteraction.action(this);
                });
                container.appendChild(button);
            });

            // --- B. 渲染通用地点事件按钮 ---
            generalEvents.forEach(event => {
                const button = this.uiManager.createActionButton(LANG[event.buttonTextKey], event.color || 'bg-teal-700', () => {
                    this.uiManager.closeModal();

                    // ▼▼▼ 【核心修复】在这里也加入 check/failAction 的“守卫逻辑” ▼▼▼
                    if (event.check && !event.check(state, this.skillManager)) {
                        // 如果二次验证失败，则执行失败动作
                        this.executeNpcAction(event.failAction);
                    } else {
                        // 如果没有二次验证或验证成功，则执行成功动作
                        event.action(this);
                    }
                });
                container.appendChild(button);
            });
        });
    }

    // 在 Game 类中
    openNpcInteractionModal(npcId) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const npc = state.npcs[npcId];
        const interactionList = gameData.allNpcInteractions[npcId];

        if (!npc || !interactionList) {
            console.error(`Interaction data not found for NPC: ${npcId}`);
            this.uiManager.openModal(LANG['modal_title_npc_interaction'].replace('{NPC_NAME}', npc.name), (contentEl) => {
                contentEl.innerHTML = `<p class="text-center text-gray-400">${LANG['no_interactions_available']}</p>`;
            });
            return;
        }

        const availableInteractions = interactionList.filter(interaction =>
            interaction.condition(state, this.skillManager)
        );

        this.uiManager.openModal(LANG['modal_title_npc_interaction'].replace('{NPC_NAME}', npc.name), (contentEl) => {
            if (availableInteractions.length === 0) {
                contentEl.innerHTML = `<p class="text-center text-gray-400">${LANG['no_interactions_available']}</p>`;
                return;
            }

            const container = document.createElement('div');
            container.className = 'space-y-3';
            contentEl.appendChild(container);

            availableInteractions.forEach(interaction => {
                const button = this.uiManager.createActionButton(
                    LANG[interaction.buttonTextKey],
                    interaction.color || 'bg-teal-700',
                    () => {
                        this.uiManager.closeModal();

                        // ▼▼▼ 核心修改：增加对函数类型action的处理 ▼▼▼
                        const processAction = (action) => {
                            if (typeof action === 'function') {
                                action(this); // 直接执行函数，并传入game实例
                            } else if (action) {
                                this.executeNpcAction(action); // 按原有方式处理对象
                            }
                        };

                        if (interaction.check && !interaction.check(state, this.skillManager)) {
                            processAction(interaction.failAction);
                        } else {
                            processAction(interaction.action);
                        }
                        // ▲▲▲ 修改结束 ▲▲▲
                    }
                );
                container.appendChild(button);
            });
        });
    }

    executeNpcAction(action) {
        if (!action) return;
        const state = this.stateManager.getState();

        switch (action.type) {
            case 'triggerEvent':
                this.eventManager.triggerEvent(action.eventName);
                break;

            case 'runSpecialLogic':
                if (typeof this.eventManager[action.functionName] === 'function') {
                    this.eventManager[action.functionName]();
                } else { console.error(`Special logic function not found: ${action.functionName}`); }
                break;

            case 'showMessage':
                const key = action.key;
                const messageType = action.messageType || 'warning';
                let replacements = {};
                if (action.replacements) {
                    Object.entries(action.replacements).forEach(([rKey, rValue]) => {
                        if (typeof rValue === 'string' && rValue.startsWith('{favorability:')) {
                            const npcId = rValue.substring(13, rValue.length - 1);
                            replacements[rKey] = state.npcs[npcId] ? state.npcs[npcId].favorability : 'N/A';
                        } else if (rValue === '{activeHostName}') {
                            const activeHost = this.stateManager.getActiveHost();
                            replacements[rKey] = activeHost ? activeHost.name : 'N/A';
                        } else {
                            replacements[rKey] = rValue;
                        }
                    });
                }
                this.uiManager.showMessage(key, messageType, replacements);
                break;

            case 'dynamicMessage':
                // ▼▼▼ 【核心修复】在这里同时传入 state 和 this.skillManager ▼▼▼
                const matchedCondition = action.conditions.find(cond => cond.check(state, this.skillManager));

                if (matchedCondition) {
                    this.executeNpcAction(matchedCondition.action);
                }
                break;
        }
    }


    // In class Game...
    openHostManagementModal() {
        const state = this.stateManager.getState();
        if (!state) return;

        const LANG = this.languageManager.getCurrentLanguageData();
        const content = this.uiManager.dom.hostModalContent;
        const template = document.getElementById('host-panel-template');

        if (!template) {
            console.error("Template 'host-panel-template' not found in index.html!");
            return;
        }
        content.innerHTML = '';

        // ▼▼▼ 【核心修改】调整排序逻辑 ▼▼▼
        const sortedHosts = Object.entries(state.hosts).sort(([, a], [, b]) => {
            const isA_Active = (a.name === state.hosts[state.activeHostId]?.name);
            const isB_Active = (b.name === state.hosts[state.activeHostId]?.name);
            const isA_Disconnected = a.status === 'DISCONNECTED';
            const isB_Disconnected = b.status === 'DISCONNECTED';

            // 1. 将当前控制的宿主置顶
            if (isA_Active) return -1;
            if (isB_Active) return 1;

            // 2. 将断联的宿主置底
            if (isA_Disconnected && !isB_Disconnected) return 1;
            if (!isA_Disconnected && isB_Disconnected) return -1;

            // 3. 其他情况保持原顺序
            return 0;
        });
        // ▲▲▲ 修改结束 ▲▲▲

        sortedHosts.forEach(([hostId, hostData]) => {
            let shouldShow = false;
            if (hostId === 'song_wei') {
                shouldShow = true;
            } else if (state.npcs[hostId] && state.npcs[hostId].met) {
                shouldShow = true;
            }
            if (!shouldShow) return;

            const panel = template.content.cloneNode(true);
            let statusClass = '';
            let statusText = '';

            if (hostId === state.activeHostId && state.controlState !== 'HOST') {
                statusClass = 'status-control';
                statusText = LANG['host_status_control'];
            } else if (hostData.status === 'DISCONNECTED') {
                statusClass = 'status-disconnected';
                statusText = LANG['host_status_disconnected'];
            } else if (hostData.isPuppet) {
                statusClass = 'status-puppet';
                statusText = LANG['host_status_puppet'];
            } else {
                statusClass = 'status-normal';
                statusText = LANG['host_status_normal'];
            }

            const panelRoot = panel.querySelector('.host-panel');
            if (panelRoot) {
                panelRoot.classList.add(statusClass);
                if (statusClass === 'status-control') {
                    panelRoot.classList.add('shadow-lg', 'shadow-purple-500/50');
                }
            }

            const statusElement = panel.querySelector('.status-badge');
            if (statusElement) {
                statusElement.textContent = statusText;
                statusElement.classList.add(statusClass);
            }

            let portraitSrc = 'https://placehold.co/100x100/333/fff?text=NoImg';
            if (hostData.portraits) {
                const isControlledByPlayer = (hostId === state.activeHostId && state.controlState !== 'HOST');
                if (isControlledByPlayer || hostData.isPuppet) {
                    portraitSrc = hostData.portraits.controlled;
                } else {
                    portraitSrc = hostData.portraits.normal;
                }
            }
            panel.querySelector('.host-portrait').src = portraitSrc;

            panel.querySelector('.host-name').textContent = hostData.name;

            const staminaElement = panel.querySelector('.stat-stamina');
            const stamina = (state.controlState === 'PERMANENT_SLIME' && hostId === state.activeHostId) ? '∞' : Math.round(hostData.stamina);
            staminaElement.textContent = `${stamina} / 100`;

            const sanityElement = panel.querySelector('.stat-sanity');
            const isCurrentlyControlled = (hostId === state.activeHostId && state.controlState !== 'HOST');
            const sanity = isCurrentlyControlled ? 0 : Math.round(hostData.sanity);
            sanityElement.textContent = `${sanity} / 100`;

            const currentLocationElement = panel.querySelector('.location-current');
            const currentChapterLocations = this.getCurrentChapterLocations();
            const locationName = currentChapterLocations[hostData.currentLocationId] ? LANG[currentChapterLocations[hostData.currentLocationId].nameKey] : LANG['location_unknown'];
            currentLocationElement.textContent = locationName;

            const nextLocationElement = panel.querySelector('.location-next');
            const nextLocationInfo = this.getNextLocationInfo(hostId);
            nextLocationElement.textContent = nextLocationInfo.name;

            content.appendChild(panel);
        });

        this.uiManager.dom.modalOverlay.classList.remove('hidden');
        this.uiManager.dom.hostModal.classList.remove('hidden');
    }

    // 文件: game.js

    getNextLocationInfo(hostId) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const host = state.hosts[hostId];
        if (!host) return { name: LANG['location_unknown'] };

        const chapterLocations = this.getCurrentChapterLocations();
        const chapterFlows = this.getCurrentChapterFlows();

        // 条件1: 宿主正被玩家主动控制
        if (hostId === state.activeHostId && state.controlState !== 'HOST') {
            return { name: LANG['location_player_controlled'] };
        }

        // 条件2: 宿主是傀儡 (但非玩家当前控制)，将会前往待机地点
        if (host.isPuppet) {
            const standbyLocationId = gameData.chapterData[state.chapter].puppetStandbyLocationId;
            const locationName = chapterLocations[standbyLocationId] ? LANG[chapterLocations[standbyLocationId].nameKey] : LANG['location_unknown'];
            return { name: locationName };
        }

        // 条件3: 宿主是正常的AI，根据日程预测下一步行动
        if (!chapterFlows || !chapterFlows[hostId] || Object.keys(chapterFlows[hostId]).length === 0) {
            return { name: LANG['location_free_action'] };
        }

        const hostFlows = chapterFlows[hostId];

        // ▼▼▼ 核心修正：更智能的日程表选择逻辑 ▼▼▼
        let flowKey = hostFlows.defaultFlow; // 1. 优先尝试读取 defaultFlow (例如 'all_week')
        if (!hostFlows[flowKey]) { // 2. 如果 defaultFlow 不存在或无效，则根据日期判断
            flowKey = state.time.dayOfWeek <= 5 ? 'workday' : 'weekend';
        }
        // 3. 使用找到的 flowKey，或使用第一个可用的日程表作为保底
        const flow = hostFlows[flowKey] || hostFlows[Object.keys(hostFlows)[0]];
        // ▲▲▲ 修正结束 ▲▲▲

        if (!flow) return { name: LANG['location_free_action'] };

        const currentIndex = this.timeManager.timeSegments.indexOf(state.time.segment);
        if (currentIndex >= this.timeManager.timeSegments.length - 1) {
            return { name: LANG['location_free_action'] }; // 一天结束，日程中没有下一个时间段
        }

        const nextSegmentKey = this.timeManager.timeSegments[currentIndex + 1];
        const nextSegment = flow[nextSegmentKey];

        if (nextSegment && chapterLocations[nextSegment.locationId]) {
            return { name: LANG[chapterLocations[nextSegment.locationId].nameKey] };
        } else {
            return { name: LANG['location_free_action'] };
        }
    }


    // 确保 Game 类中有这两个辅助函数来获取当前章节的数据
    getCurrentChapterLocations() {
        return gameData.allLocationData[this.stateManager.getState().chapter] || {};
    }

    getCurrentChapterFlows() {
        return gameData.allDailyFlows[this.stateManager.getState().chapter] || {};
    }

    // 在 Game 类中
    detachFromHost() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState(); // <-- 【新增】获取state
        // ▼▼▼ 【核心修复】将 'song_wei' 修改为 state.activeHostId ▼▼▼
        if (this.skillManager.getSkillRank('golden_cicada_shell', state.activeHostId) === 0) return;

        const activeHost = this.stateManager.getActiveHost();
        if (!activeHost) return;

        const detachedHostId = state.activeHostId;

        const hostEvents = activeHost.events;
        if (!hostEvents || !hostEvents.detachImage) {
            console.error(`Detach event metadata not found for host: ${detachedHostId}`);
            return;
        }

        state.slime.detachedHostData = { id: detachedHostId, name: activeHost.name, stamina: activeHost.stamina, sanity: activeHost.sanity };
        state.controlState = 'SLIME_DETACHED';
        state.slime.currentLocationId = activeHost.currentLocationId;
        Object.values(state.hosts).forEach(h => h.isAiControlled = true);
        state.activeHostId = null;
        state.hosts[detachedHostId].expectedLocationId = state.hosts[detachedHostId].currentLocationId;

        const isPuppet = state.hosts[detachedHostId].isPuppet;
        const bgImage = isPuppet ? hostEvents.detachImage.puppet : hostEvents.detachImage.normal;
        let descriptionKey = isPuppet ? 'event_detach_desc_puppet' : 'event_detach_desc_normal';
        let description = LANG[descriptionKey].replace('{HOST_NAME}', activeHost.name);

        if (isPuppet) {
            const standbyLocationId = gameData.chapterData[state.chapter].puppetStandbyLocationId;
            const locationName = LANG[this.getCurrentChapterLocations()[standbyLocationId].nameKey];
            description = description.replace('{LOCATION_NAME}', locationName);
        }

        this.uiManager.openEventModal({
            title: LANG['event_detach_title'],
            description: description,
            background: bgImage,
            choices: [{
                text: LANG['event_detach_choice'],
                action: () => {
                    this.uiManager.closeEventModal();
                    this.update();
                }
            }]
        });
    }

    enterHost() {
        const LANG = this.languageManager.getCurrentLanguageData();
        const availableHosts = this.getAvailableHostsToEnter(); // 使用新的统一函数

        if (availableHosts.length === 0) {
            this.uiManager.showMessage('toast_no_host_to_enter', 'warning');
            return;
        }

        if (availableHosts.length === 1) {
            this.executePossession(availableHosts[0].id);
        } else {
            const modalChoices = availableHosts.map(h => ({
                id: h.id,
                name: LANG['choice_enter_host'].replace('{HOST_NAME}', h.name)
            }));
            this.uiManager.openHostSelectionModal(modalChoices, (hostId) => {
                this.executePossession(hostId);
            });
        }
    }

    // 在 Game 类中
    // ▼▼▼ 替换此函数 ▼▼▼
    getAvailableHostsToEnter() {
        const state = this.stateManager.getState();
        if (state.controlState !== 'SLIME_DETACHED') {
            return [];
        }

        const availableHosts = [];
        Object.entries(state.hosts).forEach(([hostId, hostData]) => {
            if (hostData.currentLocationId !== state.slime.currentLocationId) {
                return;
            }

            // ▼▼▼ 【核心】判断能否进入时，严格使用 wasEverPossessed ▼▼▼
            if (!hostData.wasEverPossessed) {
                return;
            }

            availableHosts.push({ id: hostId, name: hostData.name });
        });

        return availableHosts;
    }

    // 在 game.js 的 Game 类中
    executePossession(hostId) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const targetHost = state.hosts[hostId];

        if (!targetHost || !targetHost.events) {
            console.error(`Event metadata not found for target host: ${hostId}`);
            return;
        }

        // --- 初次夺取逻辑 (保持不变) ---
        if (targetHost.events.initialTakeoverEvent && !targetHost.wasEverPossessed) {
            // ... (特殊检查逻辑) ...
            this.eventManager.triggerEvent(targetHost.events.initialTakeoverEvent);
            return; // 执行后直接返回
        }

        // --- 常规重进逻辑 (全新重构) ---
        if (targetHost.events.reEnterEvent && targetHost.events.reEnterImage) {
            // 1. 从宿主元数据中，根据 isPuppet 状态选择正确的图片
            const isPuppet = targetHost.isPuppet;
            const image = isPuppet ? targetHost.events.reEnterImage.puppet : targetHost.events.reEnterImage.normal;

            // 2. 获取事件ID
            const eventId = targetHost.events.reEnterEvent;

            // 3. 将图片路径作为上下文，调用事件引擎
            this.eventManager.triggerEvent(eventId, { dynamicImage: image });
        } else {
            console.error(`Re-enter event metadata is incomplete for host: ${hostId}`);
        }
    }


    // 修改 game.js 中的 moveToLocation 函数
    // 在移动逻辑的最后添加特殊区域检查

    moveToLocation(locationId) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const state = this.stateManager.getState();
        const isDetached = state.controlState === 'SLIME_DETACHED';
        this.uiManager.closeModal();

        const currentChapterLocations = this.getCurrentChapterLocations();
        const locationData = currentChapterLocations[locationId];
        if (!locationData) return;

        const locationName = LANG[locationData.nameKey];

        if (isDetached) {
            const riskValue = locationData.slimeRisk !== undefined ? locationData.slimeRisk : 20;
            state.slime.currentLocationId = locationId;
            state.slime.suspicion += riskValue;

            let message = LANG['toast_slime_moved_prefix'] + locationName + LANG['toast_slime_moved_suffix'];
            message = message.replace('{RISK}', riskValue);
            this.uiManager.showMessage(message, 'warning');
        } else {
            const activeHost = this.stateManager.getActiveHost();
            if (activeHost) {
                activeHost.currentLocationId = locationId;
                this.uiManager.showMessage(`${LANG['toast_host_moved_prefix'].replace('{HOST_NAME}', activeHost.name)}${locationName}${LANG['toast_host_moved_suffix']}`, 'info');
            }
        }

        // ▼▼▼ 新增：特殊区域自动事件触发检查 ▼▼▼
        this.checkSpecialLocationEvents(locationId);
        // ▲▲▲ 新增结束 ▲▲▲

        this.timeManager.advanceSegment();
    }

    // 在 Game 类中
    startChapter(chapter) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const title = LANG['confirm_chapter_start_title'];
        const text = LANG[`confirm_chapter_${chapter}_start_text`];

        // ▼▼▼ 【核心修复】先关闭章节选择，再弹出确认框 ▼▼▼
        this.uiManager.closeModal();

        this.uiManager.showConfirm(title, text, () => {
            this.dom.gameContainer.classList.remove('hidden');
            this.stateManager.resetState();

            if (chapter === 1) {
                this.uiManager.showIntro(0, () => this.init());
            } else if (chapter === 2) {
                this.startChapter2Preset();
            }
        });
    }

    // 在 Game 类中新增
    startChapter2Preset() {
        // 1. 获取一个干净的游戏状态
        const state = this.stateManager.getState();

        // 2. 【核心修复】手动设置第二章的精确开局状态
        state.chapter = 2;
        state.time.day = 14;
        state.time.dayOfWeek = (14 - 1) % 7 + 1; // 自动计算星期
        state.time.segment = 'morning-1';

        state.activeHostId = 'song_xin'; // 切换当前控制角色为宋欣
        state.controlState = 'PERMANENT_SLIME'; // 宋欣已经是傀儡状态

        // 设置角色状态和位置
        state.hosts.song_wei.status = 'DISCONNECTED'; // 宋薇断联
        state.hosts.song_xin.currentLocationId = 'huili_home_your_bedroom'; // 宋欣的初始位置
        state.hosts.song_xin.wasEverPossessed = true;
        state.hosts.song_xin.isPuppet = true;
        state.npcs.song_xin.met = true;

        // 设置主线任务和倒计时
        state.story.mainQuest = gameData.chapterSetupData[2].mainQuest;
        state.story.countdown = gameData.chapterSetupData[2].initialCountdown;

        // 3. 预设技能 (这部分逻辑保持不变)
        const skillsToSet = {
            global: {
                'memory_plunder': 1,
                'cuckoos_nest': 1,
                'gene_mutation': 2,
                'neural_integration': 1,
                'hyper_excitement': 2
            },
            hostSpecific: {
                'song_wei': ['total_possession', 'golden_cicada_shell', 'basics', 'socialization', 'domestication'],
                'song_xin': ['total_possession', 'golden_cicada_shell', 'basics', 'socialization', 'domestication']
            }
        };

        for (const [skillId, rank] of Object.entries(skillsToSet.global)) {
            state.slime.skills.global[skillId] = rank;
            state.slime.totalRanks += rank;
        }

        // ▼▼▼ 【核心修复】将 Object.values 修改为 Object.keys ▼▼▼
        for (const hostId of Object.keys(skillsToSet.hostSpecific)) {
            if (!state.slime.skills[hostId]) state.slime.skills[hostId] = {};
            Object.keys(gameData.skillsData.erosion.skills).forEach(skillId => {
                const skill = gameData.skillsData.erosion.skills[skillId];
                const currentRank = state.slime.skills[hostId][skillId] || 0;
                const rankToAdd = skill.maxRank - currentRank;
                state.slime.skills[hostId][skillId] = skill.maxRank;
                state.slime.totalRanks += rankToAdd;
            });
        }

        console.log("Chapter 2 preset applied. Starting game.");

        // 4. 初始化并渲染游戏
        this.updateDynamicTexts();
        this.init();
    }

    // ▼▼▼ 新增：特殊区域事件检查函数 ▼▼▼
    checkSpecialLocationEvents(locationId) {
        const state = this.stateManager.getState();

        // 检查神秘商店初见事件
        if (locationId === 'special_store' &&
            state.controlState === 'SLIME_DETACHED' &&
            !state.story.flags.chapter2.upgrades.special_store_discovered) {

            // 延迟触发，确保移动提示显示完毕后再弹出事件
            setTimeout(() => {
                this.eventManager.triggerEvent('discover_special_store');
            }, 1000);
        }

        // 未来可以在这里添加其他特殊区域的自动事件
        // if (locationId === 'another_special_location' && condition) {
        //     this.eventManager.triggerEvent('another_auto_event');
        // }
    }
    // ▲▲▲ 新增函数结束 ▲▲▲
    // 在 Game 类中新增
    exportSave(slot) {
        const LANG = this.languageManager.getCurrentLanguageData();
        const slotKey = `parasite_save_v8_${slot}`;
        const data = localStorage.getItem(slotKey);

        if (!data) {
            this.uiManager.showMessage(LANG['toast_no_save_to_export'], 'warning');
            return;
        }

        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `parasite-slime-save-slot-${slot}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // 在 Game 类中新增
    importSave() {
        const fileInput = this.dom.importFileInput;
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            // 在 Game 类中，替换 importSave() 函数中的 reader.onload 部分
            reader.onload = (event) => {
                try {
                    const rawData = event.target.result;
                    console.log("Raw file content length:", rawData.length);
                    console.log("First 100 characters:", rawData.substring(0, 100));

                    const importedData = JSON.parse(rawData);
                    console.log("Parsed data keys:", Object.keys(importedData));
                    console.log("Version:", importedData.version, "Type:", typeof importedData.version);
                    console.log("Has hosts:", !!importedData.hosts, "Hosts type:", typeof importedData.hosts);

                    // 改进的验证逻辑
                    const validationErrors = [];

                    if (!importedData || typeof importedData !== 'object') {
                        validationErrors.push("根对象无效");
                    }

                    if (importedData.version === undefined || importedData.version === null) {
                        validationErrors.push("缺少版本信息");
                    }

                    if (!importedData.hosts || typeof importedData.hosts !== 'object') {
                        validationErrors.push("缺少或无效的宿主数据");
                    } else if (Object.keys(importedData.hosts).length === 0) {
                        validationErrors.push("宿主数据为空");
                    }

                    // 检查核心必需字段
                    const requiredFields = ['controlState', 'activeHostId', 'chapter', 'slime', 'time', 'story', 'npcs'];
                    for (const field of requiredFields) {
                        if (importedData[field] === undefined) {
                            validationErrors.push(`缺少必需字段: ${field}`);
                        }
                    }

                    if (validationErrors.length > 0) {
                        console.error("Validation errors:", validationErrors);
                        throw new Error(`存档文件验证失败: ${validationErrors.join(', ')}`);
                    }

                    console.log("Validation passed, opening slot selection modal");
                    this.uiManager.closeModal(); // 关闭当前的存档界面
                    this.uiManager.openImportSlotSelectModal(importedData);

                } catch (error) {
                    console.error("Import error details:", error);
                    const LANG = this.languageManager.getCurrentLanguageData();

                    let errorMessage = LANG['toast_import_fail_invalid_file'] || '导入失败：文件格式无效';

                    // 提供更详细的错误信息
                    if (error.name === 'SyntaxError') {
                        errorMessage = '导入失败：JSON格式错误 - ' + error.message;
                    } else if (error.message.includes('存档文件验证失败')) {
                        errorMessage = error.message;
                    }

                    this.uiManager.showMessage(errorMessage, 'error');
                }
            };
            reader.readAsText(file);
            fileInput.value = ''; // 清空输入，以便下次可以选择同一个文件
        };
        fileInput.click();
    }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
    game.startGame();
});

