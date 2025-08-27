// data.js
// This file contains all the static data for the game, with text references moved to language.js
import { LanguageManager } from './languageManager.js';
const introData = [
    { titleKey: "intro_1_title", image: "image/intro/intro_01_dossier.png", textKey: "intro_1_text" },
    { titleKey: "intro_2_title", image: "image/intro/intro_02_controlled.png", textKey: "intro_2_text" },
    { titleKey: "intro_3_title", image: "image/intro/intro_03_ruins.png", textKey: "intro_3_text" },
    { titleKey: "intro_4_title", image: "image/intro/intro_04_infection.png", textKey: "intro_4_text" }
];

const gameOverData = {
    HOST: "gameover_host",
    SLIME: "gameover_slime",
    PERMANENT_SLIME: "gameover_permanent_slime",
    SONG_XIN_CONTROLLED: "gameover_song_xin_controlled",
    SONG_XIN_AND_SONG_WEI_LOST: "gameover_song_xin_and_song_wei_lost",
    SLIME_ALONE_CONTAINED: "gameover_slime_alone_contained",
    WILLING_HOOK: "gameover_willing_hook", // <-- 新增(愿者上钩)
    BOMB_DETONATED: "gameover_bomb_detonated"
};

// 在 data.js 文件中

// 在 data.js 文件中

const allLocationData = {
    // ===================================
    // 第一章的地点数据 (已重构)
    // ===================================
    1: {
        'home_bedroom': {
            nameKey: 'location_home_bedroom',
            descriptionKey: 'daily_work_m1', // 保留宿主默认描述
            slimeDescriptionKey: 'slime_desc_home_bedroom', // 【新增】
            category: 'home',
            isPublic: false,
            image: "image/环境/卧室.png",
            accessTags: ['song_wei_home'],
            slimeRisk: 10
        },
        'home_livingroom': {
            nameKey: 'location_home_livingroom',
            descriptionKey: 'daily_work_e1', // 保留宿主默认描述
            slimeDescriptionKey: 'slime_desc_home_livingroom', // 【新增】
            category: 'home',
            isPublic: false,
            image: "image/环境/客厅.png",
            accessTags: ['song_wei_home', 'guest'],
            slimeRisk: 5
        },
        'home_bathroom': {
            nameKey: 'location_home_bathroom',
            descriptionKey: 'daily_work_e2', // 保留宿主默认描述
            slimeDescriptionKey: 'slime_desc_home_bathroom', // 【新增】
            category: 'home',
            isPublic: false,
            image: "image/环境/浴室.png",
            accessTags: ['song_wei_home'],
            slimeRisk: 10
        },
        'commute_subway': {
            nameKey: 'location_commute_subway',
            descriptionKey: 'daily_work_m2', // 保留宿主默认描述
            slimeDescriptionKey: 'slime_desc_commute_subway', // 【新增】
            category: 'public',
            isPublic: true,
            image: "image/环境/地铁.png",
            accessTags: ['work'],
            slimeRisk: 30
        },
        'work_office': {
            nameKey: 'location_work_office',
            descriptionKey: 'daily_work_n1', // 保留宿主默认描述
            slimeDescriptionKey: 'slime_desc_work_office', // 【新增】
            category: 'work',
            isPublic: true,
            image: "image/环境/办公室.png",
            accessTags: ['public', 'guest'],
            slimeRisk: 50
        },
        'work_bathroom': {
            nameKey: 'location_work_bathroom',
            descriptionKey: 'daily_work_n2', // 保留宿主默认描述
            slimeDescriptionKey: 'slime_desc_work_bathroom', // 【新增】
            category: 'work',
            isPublic: false,
            image: "image/环境/公司厕所.png",
            accessTags: ['work'],
            slimeRisk: 25
        },
    },
    // 第二章...
    2: {
        'huili_home_your_bedroom': {
            nameKey: 'location_huili_home_your_bedroom',
            descriptionKey: 'location_desc_huili_your_bedroom',
            slimeDescriptionKey: 'slime_desc_huili_your_bedroom',
            category: 'huili_home',
            isPublic: false,
            image: "image/环境/乡村卧室.png",
            accessTags: ['song_xin', 'zhang_huili'],
            suspicionModifier: 1.3
        },
        'huili_home_huili_bedroom': {
            nameKey: 'location_huili_home_huili_bedroom',
            descriptionKey: 'location_desc_huili_her_bedroom',
            slimeDescriptionKey: 'slime_desc_huili_her_bedroom',
            category: 'huili_home',
            isPublic: false,
            image: "image/环境/张慧丽卧室.png",
            accessTags: ['zhang_huili'],
            suspicionModifier: 1.3
        },
        'huili_home_livingroom': {
            nameKey: 'location_huili_home_livingroom',
            descriptionKey: 'location_desc_huili_livingroom',
            slimeDescriptionKey: 'slime_desc_huili_livingroom',
            category: 'huili_home',
            isPublic: false,
            image: "image/环境/乡村客厅.png",
            accessTags: ['song_xin', 'zhang_huili', 'guest'],
            suspicionModifier: 1.3
        },
        'huili_home_bathroom': {
            nameKey: 'location_huili_home_bathroom',
            descriptionKey: 'location_desc_huili_bathroom',
            slimeDescriptionKey: 'slime_desc_huili_bathroom',
            category: 'huili_home',
            isPublic: false,
            image: "image/环境/乡村厕所.png",
            accessTags: ['song_xin', 'zhang_huili'],
            suspicionModifier: 1.3
        },
        // === 刘敏家 (liumin_home) ===
        'liumin_home_bedroom': {
            nameKey: 'location_liumin_home_bedroom',
            descriptionKey: 'location_desc_liumin_bedroom',
            slimeDescriptionKey: 'slime_desc_liumin_bedroom',
            category: 'liumin_home',
            isPublic: false,
            image: "image/环境/刘敏卧室.png",
            accessTags: ['liu_min'],
            unlockFlag: 'chapter2.quests.liumin_home_unlocked', // 【新增】
            suspicionModifier: 1.0
        },
        'liumin_home_bathroom': {
            nameKey: 'location_liumin_home_bathroom',
            descriptionKey: 'location_desc_liumin_bathroom',
            slimeDescriptionKey: 'slime_desc_liumin_bathroom',
            category: 'liumin_home',
            isPublic: false,
            image: "image/环境/刘敏厕所.png",
            accessTags: ['liu_min'],
            unlockFlag: 'chapter2.quests.liumin_home_unlocked', // 【新增】
            suspicionModifier: 1.0
        },
        // === 村内 (village_in) ===
        'village_square': {
            nameKey: 'location_village_square',
            descriptionKey: 'location_desc_village_square',
            slimeDescriptionKey: 'slime_desc_village_square',
            category: 'village_in',
            isPublic: true,
            image: "image/环境/村广场.png",
            accessTags: ['public', 'guest'],
            suspicionModifier: 1.5
        },
        'village_office': {
            nameKey: 'location_village_office',
            descriptionKey: 'location_desc_village_office',
            slimeDescriptionKey: 'slime_desc_village_office',
            category: 'village_in',
            isPublic: true,
            image: "image/环境/办事处.png",
            accessTags: ['public', 'guest'],
            suspicionModifier: 1.5
        },
        // === 村外 (village_out) ===
        'village_lake': {
            nameKey: 'location_village_lake',
            descriptionKey: 'location_desc_village_lake',
            slimeDescriptionKey: 'slime_desc_village_lake',
            category: 'village_out',
            isPublic: false,
            image: "image/环境/湖泊.png",
            accessTags: ['public'],
            suspicionModifier: 1.0
        },
        'special_store': {
            nameKey: 'location_special_store',
            descriptionKey: 'location_desc_special_store',
            slimeDescriptionKey: 'slime_desc_special_store',
            category: 'village_out',
            isPublic: false,
            image: "image/环境/特殊商店.png",
            accessTags: ['slime_only'],
            suspicionModifier: 1.0
        },
        'abandoned_warehouse': {
            nameKey: 'location_abandoned_warehouse',
            descriptionKey: 'location_desc_abandoned_warehouse',
            slimeDescriptionKey: 'slime_desc_abandoned_warehouse',
            category: 'village_out',
            isPublic: false,
            image: "image/环境/废弃仓库.png",
            accessTags: ['public'],
            unlockFlag: 'chapter2.quests.warehouse_found',
            suspicionModifier: 2.0
        },
    }
};

const allDailyFlows = {
    // ===================================
    // 第一章的流程数据
    // ===================================
    1: {
        // 宋薇的流程
        'song_wei': {
            defaultFlow: 'workday',
            workday: {
                'morning-1': { locationId: 'home_bedroom', textKey: "daily_work_m1" },
                'morning-2': { locationId: 'commute_subway', textKey: "daily_work_m2" },
                'noon-1': { locationId: 'work_office', textKey: "daily_work_n1" },
                'noon-2': { locationId: 'work_bathroom', textKey: "daily_work_n2" },
                'afternoon-1': { locationId: 'work_office', textKey: "daily_work_a1" },
                'afternoon-2': { locationId: 'commute_subway', textKey: "daily_work_a2" },
                'evening-1': { locationId: 'home_livingroom', textKey: "daily_work_e1" },
                'evening-2': { locationId: 'home_bathroom', textKey: "daily_work_e2" },
            },
            weekend: {
                'morning-1': { locationId: 'home_bedroom', textKey: "daily_weekend_m1" },
                'morning-2': { locationId: 'home_bedroom', textKey: "daily_weekend_m2" },
                'noon-1': { locationId: 'home_livingroom', textKey: "daily_weekend_n1" },
                'noon-2': { locationId: 'home_livingroom', textKey: "daily_weekend_n2" },
                'afternoon-1': { locationId: 'home_livingroom', textKey: "daily_weekend_a1" },
                'afternoon-2': { locationId: 'home_bedroom', textKey: "daily_weekend_a2" },
                'evening-1': { locationId: 'home_livingroom', textKey: "daily_weekend_e1" },
                'evening-2': { locationId: 'home_bathroom', textKey: "daily_weekend_e2" },
            },
        },
        // 宋欣的流程 (如果她在第一章被控制，可以有自己的流程)
        'song_xin': {
            defaultFlow: 'at_home',
            // 宋欣没有工作日/周末之分，只有一个“在家”流程
            at_home: {
                'morning-1': { locationId: 'home_livingroom', textKey: "daily_songxin_athome_m1" },
                'morning-2': { locationId: 'home_livingroom', textKey: "daily_songxin_athome_m2" },
                'noon-1': { locationId: 'home_livingroom', textKey: "daily_songxin_athome_n1" },
                'noon-2': { locationId: 'home_livingroom', textKey: "daily_songxin_athome_n2" },
                'afternoon-1': { locationId: 'home_livingroom', textKey: "daily_songxin_athome_a1" },
                'afternoon-2': { locationId: 'home_livingroom', textKey: "daily_songxin_athome_a2" },
                'evening-1': { locationId: 'home_livingroom', textKey: "daily_songxin_athome_e1" },
                'evening-2': { locationId: 'home_livingroom', textKey: "daily_songxin_athome_e2" },
            }
        },
    },

    // 在 data.js 的 allDailyFlows 中，添加第二章的数据
    2: {
        //张慧丽
        'zhang_huili': {
            defaultFlow: 'workday',
            workday: {
                'morning-1': { locationId: 'huili_home_huili_bedroom', textKey: 'daily_huili_work_m1' },
                'morning-2': { locationId: 'huili_home_livingroom', textKey: 'daily_huili_work_m2' },
                'noon-1': { locationId: 'village_office', textKey: 'daily_huili_work_n1' },
                'noon-2': { locationId: 'village_office', textKey: 'daily_huili_work_n2' },
                'afternoon-1': { locationId: 'village_office', textKey: 'daily_huili_work_a1' },
                'afternoon-2': { locationId: 'huili_home_livingroom', textKey: 'daily_huili_work_a2' },
                'evening-1': { locationId: 'huili_home_bathroom', textKey: 'daily_huili_work_e1' },
                'evening-2': { locationId: 'huili_home_huili_bedroom', textKey: 'daily_huili_work_e2' }
            },
            weekend: {
                'morning-1': { locationId: 'huili_home_huili_bedroom', textKey: 'daily_huili_weekend_m1' },
                'morning-2': { locationId: 'huili_home_livingroom', textKey: 'daily_huili_weekend_m2' },
                'noon-1': { locationId: 'village_square', textKey: 'daily_huili_weekend_n1' },
                'noon-2': { locationId: 'village_square', textKey: 'daily_huili_weekend_n2' },
                // ▼▼▼ 核心修改部分 ▼▼▼
                'afternoon-1': { locationId: 'village_lake', textKey: 'daily_huili_weekend_a1_lake' }, // <--- 修改地点和文本Key
                'afternoon-2': { locationId: 'village_lake', textKey: 'daily_huili_weekend_a2_lake' }, // <--- 修改地点和文本Key
                // ▲▲▲ 修改结束 ▲▲▲
                'evening-1': { locationId: 'huili_home_bathroom', textKey: 'daily_huili_weekend_e1' },
                'evening-2': { locationId: 'huili_home_huili_bedroom', textKey: 'daily_huili_weekend_e2' }
            }
        },
        'liu_min': {
            defaultFlow: 'all_week',
            all_week: {
                'morning-1': { locationId: 'liumin_home_bedroom', textKey: 'daily_liumin_all_m1' },
                'morning-2': { locationId: 'liumin_home_bedroom', textKey: 'daily_liumin_all_m2' },
                'noon-1': { locationId: 'liumin_home_bedroom', textKey: 'daily_liumin_all_n1' },
                'noon-2': { locationId: 'liumin_home_bedroom', textKey: 'daily_liumin_all_n2' },
                'afternoon-1': { locationId: 'liumin_home_bedroom', textKey: 'daily_liumin_all_a1' },
                'afternoon-2': { locationId: 'liumin_home_bedroom', textKey: 'daily_liumin_all_a2' },
                'evening-1': { locationId: 'village_square', textKey: 'daily_liumin_all_e1' },
                'evening-2': { locationId: 'liumin_home_bathroom', textKey: 'daily_liumin_all_e2' }
            }
        },
        // 宋欣和Jane被玩家控制，所以她们没有AI日程
        'song_xin': {},
        'jane': {}
    }
};

// 在 data.js 文件中
// ▼▼▼ 使用这个新版本，完整替换掉旧的 chapterData 对象 ▼▼▼

const chapterData = {
    // === 第一章的专属配置 ===
    1: {
        puppetStandbyLocationId: 'home_livingroom',
        // 【新增】第一章的移动菜单配置
        moveModalConfig: {
            categoryOrder: ['home', 'work', 'public'], // 第一章的分类顺序
            colors: {                                  // 第一章的颜色方案
                'home': 'bg-green-700',
                'work': 'bg-sky-700',
                'public': 'bg-gray-600'
            }
        }
    },
    // === 第二章的专属配置 ===
    2: {
        puppetStandbyLocationId: 'huili_home_livingroom',
        // 【新增】第二章的移动菜单配置
        moveModalConfig: {
            categoryOrder: ['huili_home', 'liumin_home', 'village_in', 'village_out'], // 第二章的分类顺序
            colors: {                                                              // 第二章的颜色方案
                'huili_home': 'bg-green-700',
                'liumin_home': 'bg-indigo-700',
                'village_in': 'bg-yellow-600',
                'village_out': 'bg-slate-700'
            }
        }
    }
    // 未来可以继续添加第三章等
};
// 在 data.js 文件中

const allEventData = {
    // ===================================
    //  第一章事件 (Chapter 1 Events)
    // ===================================

    // --- 主线/时间驱动事件 ---
    'health_check_notice': {
        titleKey: 'event_health_check_title',
        pages: [{
            textKey: 'event_health_check_desc',
            image: "image/事件/城市封锁.png",
            choices: [{
                textKey: 'event_health_check_choice',
                action: [
                    { type: 'setFlag', path: 'story.mainQuest', value: 'health_check_main' },
                    { type: 'setFlag', path: 'story.countdown', value: { key: 'health_check_main', days: 14 } }
                ]
            }]
        }]
    },
    'zhang_chao_intro': {
        titleKey: 'event_zc_intro_title',
        pages: [{
            textKey: 'event_zc_intro_desc',
            image: "image/事件/张超登场.png",
            choices: [{
                textKey: 'event_zc_intro_choice',
                action: [{ type: 'setFlag', path: 'npcs.zhang_chao.met', value: true }]
            }]
        }]
    },
    'song_xin_arrival': {
        titleKey: 'event_sx_arrival_title',
        pages: [{
            textKey: 'event_sx_arrival_desc',
            image: "image/事件/宋欣到访.png",
            choices: [{
                textKey: 'event_sx_arrival_choice',
                action: [
                    { type: 'setFlag', path: 'npcs.song_xin.met', value: true },
                    { type: 'setFlag', path: 'story.flags.chapter1.npc_song_xin.invited', value: false }
                ]
            }]
        }]
    },
    'health_check_failure': {
        titleKey: 'event_health_check_fail_title',
        pages: [{
            textKey: 'event_health_check_fail_desc',
            image: "image/事件/健康检查失败.png",
            choices: [{
                textKey: 'event_continue_ellipsis',
                action: [{ type: 'setFlag', path: 'slime.suspicion', value: 200 }]
            }]
        }]
    },

    // --- 玩家触发事件 ---
    'memory_plunder_success': {
        titleKey: 'event_mem_plunder_success_title',
        pages: [{
            textKey: 'event_mem_plunder_success_desc',
            image: 'image/事件/宋薇记忆夺取.png',
            choices: [{
                textKey: 'event_continue_ellipsis',
                action: [
                    { type: 'setFlag', path: 'story.flags.chapter1.npc_song_xin.memoryPlundered', value: true },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },
    'invite_song_xin': {
        titleKey: 'event_invite_sx_title',
        pages: [{
            textKey: 'event_invite_sx_desc',
            image: "image/事件/邀请宋欣.png",
            choices: [{
                textKey: 'event_invite_sx_choice',
                action: [
                    { type: 'setFlag', path: 'story.flags.chapter1.npc_song_xin.invited', value: true },
                    { type: 'setSongXinArrivalTime', offset: 1 },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },

    //张超系列事件
    'gossip_about_zhang_chao': {
        titleKey: 'event_gossip_title',
        pages: [{
            textKey: 'event_gossip_desc',
            image: "image/事件/打探消息.png",
            choices: [{
                textKey: 'event_gossip_choice',
                action: [
                    { type: 'setFlag', path: 'story.flags.chapter1.npc_zhang_chao.rumorHeard', value: true },
                    { type: 'showMessage', key: 'toast_gossip_info_gain', messageType: 'success' },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },

    'chat_with_zhang_chao_generic': {
        titleKey: 'event_chat_title',
        pages: [{
            textKey: 'event_chat_zc_desc',
            image: "image/事件/张超对话.png",
            choices: [{
                textKey: 'event_chat_choice_favor_up_10',
                action: [
                    { type: 'modifyFavor', npcId: 'zhang_chao', value: 10 },
                    {
                        type: 'showMessage',
                        key: 'toast_favor_up_npc', // 使用我们之前创建的通用Key
                        messageType: 'success',
                        replacements: { NPC_NAME: '{lang:npc_name_zhang_chao}', FAVOR: 10 }
                    },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },

    'zhang_chao_escape_plan': {
        titleKey: 'event_zc_escape_title',
        pages: [{
            textKey: 'event_zc_escape_desc',
            image: "image/事件/张超对话.png",
            choices: [{
                textKey: 'event_zc_escape_choice',
                action: [
                    { type: 'setFlag', path: 'story.flags.chapter1.main_quest_escape.zhangChaoPlanKnown', value: true },
                    { type: 'showMessage', key: 'toast_task_list_updated', messageType: 'success' },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },
    // 在 data.js 的 allEventData 中
    'convince_zhang_chao_with_songwei': {
        titleKey: 'event_convince_zc_sw_title',
        pages: [{
            textKey: 'event_convince_zc_sw_desc',
            image: "image/事件/张超对话.png",
            choices: [{
                textKey: 'event_convince_zc_sw_choice',
                action: [
                    { type: 'setFlag', path: 'story.flags.chapter1.main_quest_escape.escapePlanArrangedBySongWei', value: true },
                    { type: 'showMessage', key: 'toast_arrangement_done', messageType: 'success' },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },
    'convince_zhang_chao_with_songxin': {
        titleKey: 'event_convince_zc_sx_title',    // 修正
        pages: [{
            textKey: 'event_convince_zc_sx_desc',   // 修正
            image: "image/事件/宋欣和张超沟通.png",
            choices: [{
                textKey: 'event_convince_zc_sx_choice',  // 修正
                action: [
                    { type: 'setFlag', path: 'story.flags.chapter1.main_quest_escape.escapePlanFinalized', value: true },
                    { type: 'showMessage', key: 'toast_escape_plan_finalized', messageType: 'success' },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },

    //宋欣系列事件
    'chat_with_song_xin_generic': {
        titleKey: 'event_sister_chat_title',
        pages: [{
            textKey: 'event_sister_chat_desc',
            image: "image/事件/宋欣对话.png",
            choices: [{
                textKey: 'event_sister_chat_choice_favor_up_15',
                action: [
                    { type: 'modifyFavor', npcId: 'song_xin', value: 15 },
                    {
                        type: 'showMessage',
                        key: 'toast_favor_up_npc',
                        messageType: 'success',
                        replacements: { NPC_NAME: '{lang:host_name_song_xin}', FAVOR: 15 }
                    },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },

    // --- 夺取与回归事件 ---
    'initial_song_xin_takeover': {
        titleKey: 'event_takeover_sx_title',
        pages: [
            { textKey: 'takeover_songxin_1', image: 'image/事件/夺取宋欣/第一张.png' },
            { textKey: 'takeover_songxin_2', image: 'image/事件/夺取宋欣/第二张.png' },
            {
                textKey: 'takeover_songxin_3',
                image: 'image/事件/夺取宋欣/第三张.png',
                choices: [{
                    textKey: 'event_continue_dots', color: 'bg-red-700',
                    action: [
                        { type: 'takeoverHost', hostId: 'song_xin', previousHostId: 'song_wei' },

                        // ▼▼▼ 【核心修复】在这里增加一行，明确设置控制状态 ▼▼▼
                        { type: 'setFlag', path: 'controlState', value: 'PERMANENT_SLIME' },

                        { type: 'setFlag', path: 'hosts.song_wei.sanity', value: 50 },
                        { type: 'setFlag', path: 'hosts.song_xin.sanity', value: 0 },
                        { type: 'setFlag', path: 'hosts.song_xin.isPuppet', value: true }, // 【新增】
                        { type: 'maxOutErosionSkills', hostId: 'song_xin' },
                        { type: 'showMessage', key: 'toast_takeover_sx_success', messageType: 'success' },
                        { type: 'showMessage', key: 'toast_sx_skills_maxed', replacements: { ADDED_RANKS: '{calculated}' } }
                    ]
                }]
            }
        ]
    },
    're_enter_song_wei': {
        titleKey: 'event_reenter_sw_title', // 文本Key保持不变
        pages: [{
            textKey: 'event_reenter_sw_desc',
            image: '{dynamic}', // 这是一个通用占位符，告诉引擎使用上下文中的图片
            choices: [{
                textKey: 'btn_continue',
                action: [{ type: 'reEnterHost', hostId: 'song_wei' }]
            }]
        }]
    },

    // ▼▼▼ 【新增】为其他角色也创建类似的简化模板 ▼▼▼
    're_enter_song_xin': {
        titleKey: 'event_reenter_sx_title',
        pages: [{
            textKey: 'event_reenter_sx_desc',
            image: '{dynamic}', // 使用通用占位符
            choices: [{
                textKey: 'btn_continue',
                action: [{ type: 'reEnterHost', hostId: 'song_xin' }]
            }]
        }]
    },
    'permanent_takeover_song_wei': {
        titleKey: 'event_perm_takeover_title',
        pages: [{
            textKey: 'event_perm_takeover_desc',
            image: "image/事件/宋薇完全控制成功.png",
            choices: [{
                textKey: 'event_continue_ellipsis',
                action: [
                    { type: 'setFlag', path: 'controlState', value: 'PERMANENT_SLIME' },
                    { type: 'setFlag', path: 'hosts.song_wei.sanity', value: 0 },
                    { type: 'setFlag', path: 'hosts.song_wei.wasEverPossessed', value: true },
                    { type: 'setFlag', path: 'hosts.song_wei.isPuppet', value: true },
                    { type: 'showMessage', key: 'toast_perm_takeover_success', messageType: 'success' },
                    // ▼▼▼ 【核心修复】在这里增加一行 ▼▼▼
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },


    // --- 章节结束事件 ---
    'leave_city_sequence': {
        titleKey: 'event_leave_city_title',
        pages: [
            {
                // 第一页：车内对话
                textKey: 'event_leave_city_desc_1',
                image: "image/第二章事件/离开城市.png"
                // 没有 choices，会自动显示“继续”按钮并进入下一页
            },
            {
                // 第二页：抵达乡村，张慧丽登场
                textKey: 'event_leave_city_desc_2',
                image: "image/第二章事件/抵达乡村.png",
                choices: [{
                    textKey: 'event_continue_ellipsis',
                    // 【核心】点击后，正式启动第二章
                    action: [{ type: 'startNewChapter' }]
                }]
            }
        ]
    },

    // ===================================
    //  第二章事件 (Chapter 2 Events)
    // ===================================
    // 在 data.js 的 allEventData 中
    // ▼▼▼ 使用这个【地址修正版】，替换掉所有旧的调查事件 ▼▼▼

    'investigate_your_bedroom_c2': {
        titleKey: 'event_investigate_bedroom_c2_title',
        pages: [{
            textKey: 'event_investigate_bedroom_c2_desc',
            image: "image/第二章事件/调查卧室.png",
            choices: [{
                textKey: 'event_continue_ellipsis',
                action: [
                    { type: 'setFlag', path: 'story.flags.chapter2.investigation.camera_found', value: true },
                    { type: "showMessage", key: "toast_task_list_updated", messageType: "success" },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },
    'investigate_bathroom_c2': {
        titleKey: 'event_investigate_bathroom_c2_title',
        pages: [
            {
                textKey: 'event_investigate_bathroom_c2_p1_desc',
                image: "image/第二章事件/调查厕所/第一张.png"
            },
            {
                textKey: 'event_investigate_bathroom_c2_p2_desc',
                image: "image/第二章事件/调查厕所/第二张.png",
                choices: [{
                    textKey: 'event_continue_ellipsis',
                    action: [
                        { type: 'setFlag', path: 'story.flags.chapter2.investigation.water_system_found', value: true },
                        { type: "showMessage", key: "toast_task_list_updated", messageType: "success" },
                        { type: 'advanceTime' }
                    ]
                }]
            }
        ]
    },
    'investigate_square_c2': {
        titleKey: 'event_investigate_square_c2_title',
        pages: [{
            textKey: 'event_investigate_square_c2_desc',
            image: "image/第二章事件/调查广场.png",
            choices: [{
                textKey: 'event_continue_ellipsis',
                action: [
                    { type: 'setFlag', path: 'story.flags.chapter2.investigation.square_cameras_found', value: true },
                    { type: "showMessage", key: "toast_task_list_updated", messageType: "success" },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },
    'meet_zhao_qimin_c2': {
        titleKey: 'event_meet_zhao_qimin_c2_title',
        pages: [{
            textKey: 'event_meet_zhao_qimin_c2_desc',
            image: "image/第二章事件/遇见赵齐民.png",
            choices: [{
                textKey: 'event_continue_ellipsis',
                action: [
                    { type: 'setFlag', path: 'story.flags.chapter2.investigation.office_met_zhao', value: true },
                    { type: 'setFlag', path: 'npcs.zhao_qimin.met', value: true },
                    { type: "showMessage", key: "toast_task_list_updated", messageType: "success" },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },
    'investigate_lake_c2': {
        titleKey: 'event_investigate_lake_c2_title',
        pages: [{
            textKey: 'event_investigate_lake_c2_desc',
            image: "image/第二章事件/调查湖泊.png",
            choices: [{
                textKey: 'event_continue_ellipsis',
                action: [
                    { type: 'setFlag', path: 'story.flags.chapter2.investigation.lake_found_warehouse_shadow', value: true },
                    { type: "showMessage", key: "toast_task_list_updated", messageType: "success" },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },
    'make_takeover_plan_c2': {
        titleKey: 'event_make_plan_c2_title',
        pages: [{
            textKey: 'event_make_plan_c2_desc',
            image: "image/事件/制定计划.png",
            choices: [{
                textKey: 'event_continue_ellipsis',
                action: [
                    { type: 'setFlag', path: 'story.flags.chapter2.investigation.plan_made', value: true },
                    { type: 'showMessage', key: 'toast_task_list_updated', messageType: 'success' },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },
    // 在 data.js 的 allEventData 中
    // ▼▼▼ 使用这个【最终版】，完整替换掉旧的 'takeover_host_zhang_huili' 事件 ▼▼▼

    'takeover_host_zhang_huili': {
        titleKey: 'event_takeover_zhang_huili_title',
        pages: [
            {
                textKey: 'takeover_huili_p1_desc',
                image: "image/第二章事件/侵蚀张慧丽/第一张.png"
            },
            {
                textKey: 'takeover_huili_p2_desc',
                image: "image/第二章事件/侵蚀张慧丽/第二张.png"
            },
            {
                textKey: 'takeover_huili_p3_desc',
                image: "image/第二章事件/侵蚀张慧丽/第三张.png",
                choices: [{
                    textKey: 'event_continue_ellipsis',
                    action: [
                        // 【修复点 1】标记张慧丽为“已见面”，让她出现在宿主管理中
                        { type: 'setFlag', path: 'npcs.zhang_huili.met', value: true },

                        // 【核心逻辑】切换宿主
                        { type: 'takeoverHost', hostId: 'zhang_huili', previousHostId: 'song_xin' },

                        // 【修复点 2】将游戏状态强制切换回“宿主模式”
                        { type: 'setFlag', path: 'controlState', value: 'HOST' },

                        // 【游戏性设计】为张慧丽设置一个初始的、非零的理智值
                        { type: 'setFlag', path: 'hosts.zhang_huili.sanity', value: 80 },

                        { type: 'showMessage', key: 'toast_takeover_huili_success', messageType: 'success' }
                    ]
                }]
            }
        ]
    },

    //===张慧丽相关事件===
    //张慧丽记忆侵夺
    'memory_plunder_success_zh': {
        titleKey: 'event_mem_plunder_success_zh_title',
        pages: [
            {
                textKey: 'event_mem_plunder_success_zh_p1',
                image: 'image/第二章事件/侵蚀张慧丽记忆/第一张.png'
            },
            {
                textKey: 'event_mem_plunder_success_zh_p2',
                image: 'image/第二章事件/侵蚀张慧丽记忆/第二张.png'
            },
            {
                textKey: 'event_mem_plunder_success_zh_p3',
                image: 'image/第二章事件/侵蚀张慧丽记忆/第三张.png',
                choices: [{
                    textKey: 'event_continue_ellipsis',
                    action: [
                        { type: 'setFlag', path: 'story.flags.chapter2.npc_zhang_huili.memoryPlundered', value: true },
                        { type: 'setFlag', path: 'story.countdown.isVisible', value: true },
                        { type: 'showMessage', key: 'toast_mem_plunder_success_zh', messageType: 'success' },
                        { type: 'advanceTime' }
                    ]
                }]
            }
        ]
    },

    //===赵齐民相关事件===
    'chat_zhao_qimin_generic': {
        titleKey: 'event_chat_zq_generic_title',
        pages: [{
            textKey: 'event_chat_zq_generic_desc',
            image: "image/第二章事件/赵齐民对话.png", // 假设的对话背景图
            choices: [{
                textKey: 'event_chat_zq_generic_choice',
                action: [
                    { type: 'modifyFavor', npcId: 'zhao_qimin', value: 5 },
                    {
                        type: 'showMessage',
                        key: 'toast_favor_up_npc',
                        messageType: 'success',
                        replacements: { NPC_NAME: '{lang:npc_name_zhao_qimin}', FAVOR: 5 }
                    },
                    { type: 'advanceTime' }
                ]
            }]
        }]
    },
};
// 在 data.js 文件中 (可以放在 allEventData 之后)

const allNpcInteractions = {
    // === 赵齐民的所有可用互动 ===
    'zhao_qimin': [
        {
            id: 'zhao_qimin_ask_warehouse',
            buttonTextKey: 'event_ask_about_warehouse_btn',
            // 条件：只有当玩家控制刘敏，且好感度>50时，这个选项才会出现
            condition: (state) => state.activeHostId === 'liu_min' && state.npcs.zhao_qimin.favorability > 50,
            // 动作：触发一个事件
            action: { type: 'triggerEvent', eventName: 'warehouse_location_revealed' }
        },
        {
            id: 'zhao_qimin_final_confrontation',
            buttonTextKey: 'event_final_confrontation_btn',
            color: 'bg-red-700', // 可以定义特殊颜色
            // 条件：只有当玩家控制Jane，且接到最终任务时，这个选项才会出现
            condition: (state) => state.activeHostId === 'jane' && state.story.mainQuest === 'from_never_know_deep_or_shallow',
            // 动作：调用一个特殊的、无法完全数据化的复杂逻辑函数
            action: { type: 'runSpecialLogic', functionName: 'triggerFinalConfrontation' }
        },
        {
            id: 'zhao_qimin_generic_chat_jane',
            buttonTextKey: 'event_chat_with_zhao_qimin_btn',
            // 条件：当玩家控制Jane，但不满足最终对峙条件时，显示这个闲聊选项
            condition: (state) => state.activeHostId === 'jane',
            action: { type: 'triggerEvent', eventName: 'chat_zhao_qimin_generic_jane' }
        },
        {
            id: 'zhao_qimin_generic_chat',
            buttonTextKey: 'event_chat_with_zhao_qimin_btn',
            // 条件：作为保底选项，只要见过面就可以闲聊
            condition: (state) => state.npcs.zhao_qimin.met,
            action: { type: 'triggerEvent', eventName: 'chat_zhao_qimin_generic' }
        }
    ],

    // 在 data.js 的 allNpcInteractions 中，添加宋欣的可用互动
    'song_xin': [
        {
            id: 'song_xin_takeover_body',
            buttonTextKey: 'event_takeover_sx_btn',
            color: 'bg-red-700',

            // 【修正的出现条件】: 按钮只在“接管模式”下才【出现】
            condition: (state) =>
                state.controlState.includes('SLIME') &&
                state.npcs.song_xin.isPresent &&
                !state.hosts.song_xin.wasEverPossessed,

            // 【严格的执行检查】: 点击后检查好感度
            check: (state) => state.npcs.song_xin.favorability > 80,

            action: { type: 'triggerEvent', eventName: 'initial_song_xin_takeover' },

            failAction: { // 好感度不足时的反馈
                type: 'showMessage',
                key: 'feedback_favor_not_enough',
                replacements: { FAVOR: '{favorability:song_xin}' }
            }
        },
        {
            id: 'song_xin_generic_chat',
            buttonTextKey: 'event_talk_to_sx_btn',

            // 【修正的出现条件】: 逻辑更清晰
            condition: (state, skillManager) => {
                if (state.hosts.song_xin.wasEverPossessed) return false; // 已夺取后不能闲聊

                if (state.controlState === 'HOST') return true; // HOST模式下总能闲聊

                // SLIME模式下，需要有“生活化”技能
                if (state.controlState.includes('SLIME')) {
                    return skillManager.getSkillRank('domestication', 'song_wei') > 0;
                }
                return false;
            },
            action: { type: 'triggerEvent', eventName: 'chat_with_song_xin_generic' }
        }
    ],

    // === 张超的所有可用互动 (示例) ===
    // 在 data.js 的 allNpcInteractions 中
    'zhang_chao': [
        // 选项1: 与张超确认逃跑 (需要控制宋欣)
        // 这个选项的优先级最高，所以放在最前面
        {
            id: 'zhang_chao_confirm_escape_with_songxin',
            buttonTextKey: 'event_confirm_escape_sx_btn',
            condition: (state) =>
                state.activeHostId === 'song_xin' &&
                state.story.flags.chapter1.main_quest_escape.escapePlanArrangedBySongWei &&
                !state.story.flags.chapter1.main_quest_escape.escapePlanFinalized,
            action: { type: 'triggerEvent', eventName: 'convince_zhang_chao_with_songxin' }
        },
        // 选项2: 与张超安排逃跑 (需要控制宋薇)
        {
            id: 'zhang_chao_arrange_escape_with_songwei',
            buttonTextKey: 'event_arrange_escape_btn',

            // 【修改】condition - 移除接管状态检查，按钮总是显示
            condition: (state) =>
                state.activeHostId === 'song_wei' &&
                state.story.flags.chapter1.main_quest_escape.zhangChaoPlanKnown &&
                state.npcs['song_xin'].met &&
                !state.story.flags.chapter1.main_quest_escape.escapePlanArrangedBySongWei,

            // 【新增】check - 点击时检查是否在接管状态
            check: (state) => state.controlState.includes('SLIME'),

            action: { type: 'triggerEvent', eventName: 'convince_zhang_chao_with_songwei' },

            // 【新增】failAction - 检查失败时的反馈
            failAction: {
                type: 'dynamicMessage',
                conditions: [
                    {
                        // 条件1：不在接管模式
                        check: (state) => !state.controlState.includes('SLIME'),
                        action: {
                            type: 'showMessage',
                            key: 'toast_must_be_in_control_mode',
                            messageType: 'warning'
                        }
                    },
                    {
                        // 条件2：没有社会化技能
                        check: (state, skillManager) => skillManager.getSkillRank('socialization', state.activeHostId) === 0,
                        action: {
                            type: 'showMessage',
                            key: 'toast_need_socialization',
                            messageType: 'warning'
                        }
                    }
                ]
            }
        },
        // 选项3: 向张超询问逃跑计划
        {
            id: 'zhang_chao_ask_escape_plan',
            buttonTextKey: 'event_ask_escape_btn',
            // 【修改】condition - 移除社会化技能检查，按钮更容易显示
            condition: (state) =>
                state.activeHostId === 'song_wei' &&
                state.npcs.zhang_chao.favorability > 80 &&
                !state.story.flags.chapter1.main_quest_escape.zhangChaoPlanKnown,

            // 【新增】check - 点击时检查社会化技能（仅在接管模式下需要）
            check: (state, skillManager) =>
                !state.controlState.includes('SLIME') ||
                skillManager.getSkillRank('socialization', 'song_wei') > 0,

            action: { type: 'triggerEvent', eventName: 'zhang_chao_escape_plan' },

            // 【新增】failAction - 技能不足时的反馈
            failAction: {
                type: 'showMessage',
                key: 'toast_need_socialization',
                messageType: 'warning'
            }
        },

        // 选项4: 通用闲聊 (作为保底选项)
        {
            id: 'zhang_chao_generic_chat',
            buttonTextKey: 'event_talk_to_zc_btn',
            // 【修改】condition - 移除社会化技能检查，按钮总是显示
            condition: (state) => state.activeHostId === 'song_wei',

            // 【新增】check - 点击时检查社会化技能（仅在接管模式下需要）
            check: (state, skillManager) =>
                !state.controlState.includes('SLIME') ||
                skillManager.getSkillRank('socialization', 'song_wei') > 0,

            action: { type: 'triggerEvent', eventName: 'chat_with_zhang_chao_generic' },

            // 【新增】failAction - 技能不足时的反馈
            failAction: {
                type: 'showMessage',
                key: 'toast_need_socialization',
                messageType: 'warning'
            }
        }
    ],
};

const actionData = {
    'continue': { timeEvent: 'advance' },
    'go_to_work': { nextFlow: 'workday' },
    'ask_for_leave': { nextFlow: 'weekend', effects: [{ stat: 'stamina', value: -20 }, { stat: 'suspicion', value: 60 }] },
    'open_nsfw_modal': { event: 'open_nsfw_modal' },
    'nsfw_self_explore': { timeEvent: 'nsfw', nsfwType: 'self_explore', effects: [{ stat: 'stamina', value: -30 }, { stat: 'sanity', value: -20 }] },
};

const skillsData = {
    slime: {
        titleKey: "skill_tree_slime_title",
        skills: {
            neural_integration: { nameKey: "skill_ni_name", maxRank: 3, cost: 1, descriptionKey: "skill_ni_desc", tier: 1 },
            hyper_excitement: { nameKey: "skill_he_name", maxRank: 3, cost: 1, descriptionKey: "skill_he_desc", tier: 1 },
            gene_mutation: { nameKey: "skill_gm_name", maxRank: 3, cost: 1, descriptionKey: "skill_gm_desc", tier: 1 },
            cuckoos_nest: { nameKey: "skill_cn_name", maxRank: 3, cost: 2, descriptionKey: "skill_cn_desc", tier: 2, requirement: 6 },
            memory_plunder: { nameKey: "skill_mp_name", maxRank: 3, cost: 2, descriptionKey: "skill_mp_desc", tier: 2, requirement: 6 },
            hormone_allure: { nameKey: "skill_ha_name", maxRank: 3, cost: 2, descriptionKey: "skill_ha_desc", tier: 2, requirement: 6 },
            simulate_emotion: { nameKey: "skill_se_name", maxRank: 1, cost: 10, descriptionKey: "skill_se_desc", tier: 3, requirement: 15 },
        }
    },
    erosion: {
        titleKey: "skill_tree_erosion_title",
        skills: {
            golden_cicada_shell: { nameKey: "skill_gcs_name", maxRank: 1, cost: 3, descriptionKey: "skill_gcs_desc", tier: 1, requirement: 0 },
            basics: { nameKey: "skill_b_name", maxRank: 1, cost: 2, descriptionKey: "skill_b_desc", tier: 1, requirement: 0 },
            socialization: { nameKey: "skill_s_name", maxRank: 1, cost: 5, descriptionKey: "skill_s_desc", tier: 2, requirement: 6 },
            domestication: { nameKey: "skill_d_name", maxRank: 1, cost: 5, descriptionKey: "skill_d_desc", tier: 2, requirement: 6 },
            total_possession: { nameKey: "skill_tp_name", maxRank: 1, cost: 20, descriptionKey: "skill_tp_desc", tier: 3, requirement: 15 },
        }
    }
};
// 在 data.js 文件中
// ▼▼▼ 使用这个对象，替换掉所有旧的 nsfw...Data 和 zhangChaoNsfwData ▼▼▼

// 在 data.js 文件中
// ▼▼▼ 使用这个【最终修正版】，完整替换掉旧的 allNsfwData 对象 ▼▼▼

const allNsfwData = {
    // ===================================
    //  宋薇 (Song Wei) 的 NSFW 数据 (已包含赵齐民事件)
    // ===================================
    'song_wei': {
        self: {
            titleKey: "nsfw_event_title",
            choiceKey: "nsfw_choice_self",
            baseEffects: { stamina: -30, sanity: -20, baseSuspicion: 15 },
            locations: {
                'default': { images: { HOST: 'https://placehold.co/800x600/e53e3e/ffffff?text=Host+NSFW+Default', SLIME: 'https://placehold.co/800x600/38a169/ffffff?text=Slime+NSFW+Default' }, descriptions: { HOST: "nsfw_desc_default_host", SLIME: "nsfw_desc_default_slime" } },
                'home_bedroom': { images: { HOST: "image/CG/宋薇/宿主模式/宿主卧室.png", SLIME: "image/CG/宋薇/接管模式/接管卧室.png" }, descriptions: { HOST: "nsfw_desc_home_bedroom_host", SLIME: "nsfw_desc_home_bedroom_slime" } },
                'home_bathroom': { images: { HOST: "image/CG/宋薇/宿主模式/宿主浴室.png", SLIME: "image/CG/宋薇/接管模式/接管浴室.png" }, descriptions: { HOST: "nsfw_desc_home_bathroom_host", SLIME: "nsfw_desc_home_bathroom_slime" } },
                'home_livingroom': { images: { HOST: "image/CG/宋薇/宿主模式/宿主客厅.png", SLIME: "image/CG/宋薇/接管模式/接管客厅.png" }, descriptions: { HOST: "nsfw_desc_home_livingroom_host", SLIME: "nsfw_desc_home_livingroom_slime" } },
                'work_bathroom': { images: { HOST: "image/CG/宋薇/宿主模式/宿主厕所.png", SLIME: "image/CG/宋薇/接管模式/接管厕所.png" }, descriptions: { HOST: "nsfw_desc_work_bathroom_host", SLIME: "nsfw_desc_work_bathroom_slime" } },
                'work_office': { images: { HOST: "image/CG/宋薇/宿主模式/宿主办公室.png", SLIME: "image/CG/宋薇/接管模式/接管办公室.png" }, descriptions: { HOST: "nsfw_desc_work_office_host", SLIME: "nsfw_desc_work_office_slime" } },
                'commute_subway': { images: { HOST: "image/CG/宋薇/宿主模式/宿主地铁.png", SLIME: "image/CG/宋薇/接管模式/接管地铁.png" }, descriptions: { HOST: "nsfw_desc_commute_subway_host", SLIME: "nsfw_desc_commute_subway_slime" } }
            }
        },
        partnered: {
            'zhang_chao': {
                npcId: 'zhang_chao', // 【新增】明确NPC ID
                buttonTextKey: 'nsfw_choice_invite_zc',
                condition: (state, skillManager) =>
                    state.npcs.zhang_chao.isPresent &&
                    state.npcs.zhang_chao.favorability > 30 &&
                    !(state.controlState.includes('SLIME') && skillManager.getSkillRank('socialization', 'song_wei') === 0),
                titleKey: 'nsfw_event_zc_title',
                images: { HOST: "image/CG/宋薇/宿主模式/宿主性交.png", SLIME: "image/CG/宋薇/接管模式/接管性交.png" },
                descriptions: { HOST: "zhangchao_nsfw_desc_host", SLIME: "zhangchao_nsfw_desc_slime" },
                effects: { favorability: 15, stamina: -50, sanity: -40, baseSuspicion: 15, interactionSuspicion: 10, mutationChance: 0.5, mutationPoints: 2 }
            },
        },
    },

    // ===================================
    //  宋欣 (Song Xin) 的 NSFW 数据 (已合并第一、二章)
    // ===================================
    'song_xin': {
        self: {
            titleKey: "nsfw_event_sx_title",      // 使用统一的标题 Key
            choiceKey: "nsfw_choice_self_sx",    // 使用统一的按钮 Key
            baseEffects: { stamina: 0, sanity: -20, baseSuspicion: 15 },
            locations: {
                // --- 默认后备 ---
                'default': {
                    images: { SLIME: "image/CG/宋欣/客厅.png" },
                    descriptions: { SLIME: "songxin_nsfw_desc_default_slime" }
                },
                // --- 【恢复】第一章地点 ---
                'home_bedroom': {
                    images: { SLIME: "image/CG/宋欣/卧室.png" },
                    descriptions: { SLIME: "songxin_nsfw_desc_home_bedroom_slime" }
                },
                'home_bathroom': {
                    images: { SLIME: "image/CG/宋欣/浴室.png" },
                    descriptions: { SLIME: "songxin_nsfw_desc_home_bathroom_slime" }
                },
                'home_livingroom': {
                    images: { SLIME: "image/CG/宋欣/客厅.png" },
                    descriptions: { SLIME: "songxin_nsfw_desc_home_livingroom_slime" }
                },
                'work_office': {
                    images: { SLIME: "image/CG/宋欣/办公室.png" },
                    descriptions: { SLIME: "songxin_nsfw_desc_work_office_slime" }
                },
                // --- 第二章地点 ---
                'huili_home_your_bedroom': {
                    images: { SLIME: "image/CG/宋欣/第二章/你的卧室.png" },
                    descriptions: { SLIME: "songxin_c2_nsfw_desc_your_bedroom_slime" }
                },
                'huili_home_bathroom': {
                    images: { SLIME: "image/CG/宋欣/第二章/厕所.png" },
                    descriptions: { SLIME: "songxin_c2_nsfw_desc_bathroom_slime" }
                },
                'huili_home_livingroom': {
                    images: { SLIME: "image/CG/宋欣/第二章/客厅.png" },
                    descriptions: { SLIME: "songxin_c2_nsfw_desc_livingroom_slime" }
                },
                'village_lake': {
                    images: { SLIME: "image/CG/宋欣/第二章/湖泊.png" },
                    descriptions: { SLIME: "songxin_c2_nsfw_desc_lake_slime" }
                },
                'village_square': {
                    images: { SLIME: "image/CG/宋欣/第二章/广场.png" },
                    descriptions: { SLIME: "songxin_c2_nsfw_desc_square_slime" }
                },
            }
        },
        partnered: {
            'zhao_qimin_BJ': {
                npcId: 'zhao_qimin', // 【新增】明确NPC ID
                buttonTextKey: 'nsfw_choice_invite_zq_BJ',
                condition: (state, skillManager) => state.npcs.zhao_qimin.isPresent && state.npcs.zhao_qimin.favorability > 15,
                titleKey: 'nsfw_event_zq_title_BJ',
                images: { SLIME: "image/CG/宋欣/第二章/与赵齐民BJ.png" },
                descriptions: { SLIME: "zq_nsfw_desc_sx_slime_BJ" },
                effects: { favorability: 15, stamina: -30, baseSuspicion: 25, interactionSuspicion: 15, mutationChance: 0.5, mutationPoints: 2 }
            },
            'zhao_qimin_MS': {
                npcId: 'zhao_qimin', // 【新增】明确NPC ID
                buttonTextKey: 'nsfw_choice_invite_zq_MS',
                condition: (state, skillManager) => state.npcs.zhao_qimin.isPresent && state.npcs.zhao_qimin.favorability > 50,
                titleKey: 'nsfw_event_zq_title_MS',
                images: { SLIME: "image/CG/宋欣/第二章/与赵齐民MS.png" },
                descriptions: { SLIME: "zq_nsfw_desc_sx_slime_MS" },
                effects: { favorability: 30, stamina: -50, baseSuspicion: 25, interactionSuspicion: 35, mutationChance: 0.7, mutationPoints: 3 }
            }
        }
    },

    // ===================================
    //  张慧丽 (Zhang Huili) 的 NSFW 数据 (已包含赵齐民事件)
    // ===================================
    'zhang_huili': {
        self: {
            titleKey: "nsfw_event_zh_title",
            choiceKey: "nsfw_choice_self_zh",
            baseEffects: { stamina: -30, sanity: -20, baseSuspicion: 10 },
            locations: {
                'default': { images: { HOST: "image/CG/张慧丽/宿主模式/客厅.png", SLIME: "image/CG/张慧丽/接管模式/客厅.png" }, descriptions: { HOST: "nsfw_desc_huili_livingroom_host", SLIME: "nsfw_desc_huili_livingroom_slime" } },
                'huili_home_huili_bedroom': { images: { HOST: "image/CG/张慧丽/宿主模式/她的卧室.png", SLIME: "image/CG/张慧丽/接管模式/她的卧室.png" }, descriptions: { HOST: "nsfw_desc_huili_bedroom_host", SLIME: "nsfw_desc_huili_bedroom_slime" } },
                'huili_home_bathroom': { images: { HOST: "image/CG/张慧丽/宿主模式/厕所.png", SLIME: "image/CG/张慧丽/接管模式/厕所.png" }, descriptions: { HOST: "nsfw_desc_huili_bathroom_host", SLIME: "nsfw_desc_huili_bathroom_slime" } },
                'huili_home_livingroom': { images: { HOST: "image/CG/张慧丽/宿主模式/客厅.png", SLIME: "image/CG/张慧丽/接管模式/客厅.png" }, descriptions: { HOST: "nsfw_desc_huili_livingroom_host", SLIME: "nsfw_desc_huili_livingroom_slime" } },
                'village_office': { images: { HOST: "image/CG/张慧丽/宿主模式/办公室.png", SLIME: "image/CG/张慧丽/接管模式/办公室.png" }, descriptions: { HOST: "nsfw_desc_village_office_host", SLIME: "nsfw_desc_village_office_slime" } },
                'village_lake': { images: { HOST: "image/CG/张慧丽/宿主模式/湖泊.png", SLIME: "image/CG/张慧丽/接管模式/湖泊.png" }, descriptions: { HOST: "nsfw_desc_huili_lake_host", SLIME: "nsfw_desc_huili_lake_slime" } },
                'village_square': { images: { HOST: "image/CG/张慧丽/宿主模式/广场.png", SLIME: "image/CG/张慧丽/接管模式/广场.png" }, descriptions: { HOST: "nsfw_desc_huili_square_host", SLIME: "nsfw_desc_huili_square_slime" } },
            }
        },
        partnered: {
            'zhao_qimin_BJ': {
                npcId: 'zhao_qimin', // 【新增】明确NPC ID
                buttonTextKey: 'nsfw_choice_invite_zq_BJ',
                condition: (state, skillManager) => state.npcs.zhao_qimin.isPresent && state.npcs.zhao_qimin.favorability > 15,
                titleKey: { HOST: "zq_nsfw_desc_zh_host_BJ_title", SLIME: "zq_nsfw_desc_zh_slime_BJ_title" },
                images: { HOST: "image/CG/张慧丽/宿主模式/与赵齐民BJ.png", SLIME: "image/CG/张慧丽/接管模式/与赵齐民BJ.png" },
                descriptions: { HOST: "zq_nsfw_desc_zh_host_BJ", SLIME: "zq_nsfw_desc_zh_slime_BJ" },
                effects: { favorability: 15, stamina: -30,baseSuspicion: 10, interactionSuspicion: 20, mutationChance: 0.4, mutationPoints: 1 }
            },
            'zhao_qimin_MS': {
                npcId: 'zhao_qimin', // 【新增】明确NPC ID
                buttonTextKey: 'nsfw_choice_invite_zq_MS',
                condition: (state, skillManager) => state.npcs.zhao_qimin.isPresent && state.npcs.zhao_qimin.favorability > 50,
                titleKey: { HOST: "zq_nsfw_desc_zh_host_MS_title", SLIME: "zq_nsfw_desc_zh_slime_MS_title" },
                images: { HOST: "image/CG/张慧丽/宿主模式/与赵齐民MS.png", SLIME: "image/CG/张慧丽/接管模式/与赵齐民MS.png" },
                descriptions: { HOST: "zq_nsfw_desc_zh_host_MS", SLIME: "zq_nsfw_desc_zh_slime_MS" },
                effects: { favorability: 30, stamina: -50, baseSuspicion:10, interactionSuspicion: 35, mutationChance: 0.6, mutationPoints: 2 }
            }
        }
    },

    // ===================================
    //  刘敏 (Liu Min) 的 NSFW 数据 (已包含赵齐民事件)
    // ===================================
    'liu_min': {
        self: { /* ...未来可以添加独处事件... */ },
        partnered: {
            'zhao_qimin_BJ': {
                npcId: 'zhao_qimin', // 【新增】明确NPC ID
                buttonTextKey: 'nsfw_choice_invite_zq_BJ',
                condition: (state, skillManager) => state.npcs.zhao_qimin.isPresent && state.npcs.zhao_qimin.favorability > 15,
                titleKey: 'nsfw_event_zq_title_BJ',
                images: { HOST: "image/CG/刘敏/宿主模式/与赵齐民BJ.png", SLIME: "image/CG/刘敏/接管模式/与赵齐民BJ.png" },
                descriptions: { HOST: "zq_nsfw_desc_lm_host_BJ", SLIME: "zq_nsfw_desc_lm_slime_BJ" },
                effects: { favorability: 15, stamina: -30, suspicion: 40, mutationChance: 0.4, mutationPoints: 1 }
            },
            'zhao_qimin_MS': {
                npcId: 'zhao_qimin', // 【新增】明确NPC ID
                buttonTextKey: 'nsfw_choice_invite_zq_MS',
                condition: (state, skillManager) => state.npcs.zhao_qimin.isPresent && state.npcs.zhao_qimin.favorability > 50,
                titleKey: 'nsfw_event_zq_title_MS',
                images: { HOST: "image/CG/刘敏/宿主模式/与赵齐民MS.png", SLIME: "image/CG/刘敏/接管模式/与赵齐民MS.png" },
                descriptions: { HOST: "zq_nsfw_desc_lm_host_MS", SLIME: "zq_nsfw_desc_lm_slime_MS" },
                effects: { favorability: 30, stamina: -50, suspicion: 70, mutationChance: 0.6, mutationPoints: 2 }
            }
        }
    }
};

const generalHints = ["hint_1", "hint_2", "hint_3"];

const taskData = {
    'health_check_main': {
        titleKey: 'task_health_check_title',
        descriptionKey: 'task_health_check_desc',
        countdownTextKey: 'task_health_check_countdown',
        steps: [
            { textKey: 'task_health_check_step1', isDone: (state) => state.story.flags.chapter1.main_quest_escape.zhangChaoPlanKnown },
            { textKey: 'task_health_check_step2', isDone: (state) => state.hosts.song_xin.wasEverPossessed },
            { textKey: 'task_health_check_step3', isDone: (state) => state.story.flags.chapter1.main_quest_escape.escapePlanFinalized },
        ],
        hintsKeys: ['task_health_check_hint1', 'task_health_check_hint2']
    },
    // 在 data.js 的 taskData 中
    'stranger_in_a_strange_land': {
        titleKey: 'task_stranger_title',
        descriptionKey: 'task_stranger_desc',
        // 任务清单，每个 isDone 函数都指向 story.flags 中的一个特定标记
        steps: [
            { textKey: 'task_stranger_step1', isDone: (state) => state.story.flags.chapter2.investigation.camera_found },
            { textKey: 'task_stranger_step2', isDone: (state) => state.story.flags.chapter2.investigation.water_system_found },
            { textKey: 'task_stranger_step3', isDone: (state) => state.story.flags.chapter2.investigation.square_cameras_found },
            { textKey: 'task_stranger_step4', isDone: (state) => state.story.flags.chapter2.investigation.office_met_zhao },
            { textKey: 'task_stranger_step5', isDone: (state) => state.story.flags.chapter2.investigation.lake_found_warehouse_shadow },
            { textKey: 'task_stranger_step6', isDone: (state) => state.story.flags.chapter2.investigation.plan_made },
        ],
        // 游戏提示
        hintsKeys: ['task_stranger_hint1', 'task_stranger_hint2']
    },
    'bomb_countdown': {
        countdownTextKey: 'task_bomb_countdown',
    },
};

const locationEventData = {
    // 在 data.js 的 locationEventData 中，删除所有旧的 'talk_to_...' 事件
    // 然后用下面这个统一的事件替换
    'talk_to_zhao_qimin': {
        location: 'village_office',
        npcId: 'zhao_qimin', // 保留 npcId 用于分组
        buttonTextKey: 'event_interact_with_npc_btn', // 一个通用的按钮文本，例如“与赵齐民交谈”
        condition: (state) => state.npcs.zhao_qimin.isPresent,
        // 【核心】action 不再是interactWith，而是打开新的互动菜单
        action: (game) => { game.openNpcInteractionModal('zhao_qimin'); }
    },
    // 为张超也创建一个类似的统一入口
    // 在 data.js 的 allEventData 中 (例如，放在 'gossip_about_zhang_chao' 之后)
    // 在 data.js 的 locationEventData 中
    'interact_with_zhang_chao_entry': {
        location: 'work_office',
        npcId: 'zhang_chao', // 保留 npcId 以便按NPC分组显示
        buttonTextKey: 'event_interact_with_npc_btn', // "与张超交谈"
        condition: (state) => state.chapter === 1 && state.npcs.zhang_chao.isPresent, // 条件简化为：在第一章且张超在场
        action: (game) => { game.openNpcInteractionModal('zhang_chao'); } // 打开新的、统一的互动菜单
    },
   
    // 在 data.js 的 locationEventData 对象中

    'memory_plunder_songxin': {
        location: ['home_livingroom', 'home_bedroom', 'home_bathroom'],
        buttonTextKey: 'event_memory_plunder_btn',
        // ▼▼▼ 使用【新的】分类化路径来检查标记 ▼▼▼
        condition: (state, skillManager) => {
            return (
                skillManager.getSkillRank('memory_plunder', 'song_wei') > 0 &&

                // 【核心修复】确保这里检查的是新结构的标记
                !state.story.flags.chapter1.npc_song_xin.memoryPlundered &&

                state.activeHostId === 'song_wei' &&
                state.controlState !== 'SLIME_DETACHED'
            );
        },
        action: (game) => { game.eventManager.startMemoryPlunderGame('song_wei'); }
    },
    'invite_songxin': {
        location: ['home_livingroom', 'home_bedroom', 'home_bathroom'],
        buttonTextKey: 'event_invite_sx_btn',

        // 【宽松的出现条件】: 只要前置任务完成，按钮就【出现】
        condition: (state) =>
            state.story.flags.chapter1.npc_song_xin.memoryPlundered &&
            !state.story.flags.chapter1.npc_song_xin.invited &&
            !state.npcs.song_xin.met,

        // 【严格的执行检查】: 点击【后】才进行模式和技能的校验
        check: (state, skillManager) =>
            state.controlState.includes('SLIME') &&
            skillManager.getSkillRank('domestication', state.activeHostId) > 0,

        // 【成功动作】
        action: (game) => { game.eventManager.triggerEvent('invite_song_xin'); },

        // 【失败反馈】
        failAction: {
            type: 'dynamicMessage',
            conditions: [
                {
                    // 条件1：模式不对
                    check: (state) => !state.controlState.includes('SLIME'),
                    action: {
                        type: 'showMessage',
                        key: 'toast_must_be_in_control_mode',
                        // 使用我们新增的动态值，让提示更清晰
                        replacements: { HOST_NAME: '{activeHostName}' }
                    }
                },
                {
                    // 条件2：技能不足
                    check: (state, skillManager) => skillManager.getSkillRank('domestication', state.activeHostId) === 0,
                    action: {
                        type: 'showMessage',
                        key: 'toast_need_domestication'
                    }
                }
            ]
        }
    },
    'talk_to_songxin': {
        location: ['home_livingroom', 'home_bedroom'],
        npcId: 'song_xin',
        buttonTextKey: 'event_interact_with_npc_btn', // 使用通用Key
        condition: (state) =>
            state.chapter === 1 &&
            state.npcs.song_xin.isPresent &&
            state.activeHostId !== 'song_xin' &&
            !state.hosts.song_xin.wasEverPossessed,
        // 【核心修复】指向新的互动菜单，而不是旧的硬编码函数
        action: (game) => { game.openNpcInteractionModal('song_xin'); }
    },

    'confirm_escape': {
        location: 'work_office',
        buttonTextKey: 'event_confirm_escape_btn',
        color: 'bg-yellow-600 hover:bg-yellow-700',
        condition: (state) => state.story.flags.chapter1.main_quest_escape.escapePlanFinalized && state.activeHostId === 'song_xin',
        action: (game) => {
            const LANG = game.languageManager.getCurrentLanguageData();
            game.uiManager.showConfirm(LANG['event_confirm_escape_btn'], LANG['confirm_escape_text'], () => {
                game.eventManager.triggerEvent('leave_city_sequence'); // 直接在这里调用新事件
            });
        }
    },

    // === 张慧丽相关事件 ===
    //宿主解锁
    'takeover_huili_fake': {
        location: 'huili_home_huili_bedroom',
        buttonTextKey: 'event_takeover_sx_btn', // 复用夺取宋欣的按钮文本
        condition: (state) => !state.story.flags.chapter2.investigation.plan_made,
        action: (game) => { game.uiManager.showGameOver('WILLING_HOOK'); }
    },
    'takeover_huili_real': {
        location: 'huili_home_bathroom',
        buttonTextKey: 'event_execute_plan_btn',
        condition: (state) => state.story.flags.chapter2.investigation.plan_made && state.time.segment.startsWith('evening') && state.activeHostId === 'song_xin',
        action: (game) => { game.eventManager.triggerEvent('takeover_host_zhang_huili'); }
    },
    //张慧丽记忆夺取
    'memory_plunder_zhang_huili': {
        location: ['huili_home_huili_bedroom', 'huili_home_livingroom', 'huili_home_bathroom'], // 地点限制在张慧丽家
        buttonTextKey: 'event_memory_plunder_btn',
        color: 'bg-purple-800',
        // ▼▼▼ 核心修改：更新触发条件 ▼▼▼
        condition: (state, skillManager) => {
            return (
                skillManager.getSkillRank('memory_plunder', state.activeHostId) > 0 &&
                !state.story.flags.chapter2.npc_zhang_huili.memoryPlundered &&
                state.activeHostId === 'zhang_huili' // 必须控制张慧丽
            );
        },
        // ▲▲▲ 修改结束 ▲▲▲
        action: (game) => { game.eventManager.startMemoryPlunderGame('zhang_huili'); }
    },


    // --- 任务【身在他乡为异客】的调查事件 ---
    // 在 data.js 的 locationEventData 中修改这些事件的条件

    'investigate_your_bedroom_c2': {
        location: 'huili_home_your_bedroom',
        buttonTextKey: 'event_investigate_environment_btn',
        condition: (state) =>
            state.activeHostId === 'song_xin' &&
            state.story.mainQuest === 'stranger_in_a_strange_land' &&
            !state.story.flags.chapter2.investigation.camera_found,
        action: (game) => { game.eventManager.triggerEvent('investigate_your_bedroom_c2'); }
    },

    'investigate_bathroom_c2': {
        location: 'huili_home_bathroom',
        buttonTextKey: 'event_investigate_environment_btn',
        condition: (state) =>
            state.activeHostId === 'song_xin' &&
            state.story.mainQuest === 'stranger_in_a_strange_land' &&
            !state.story.flags.chapter2.investigation.water_system_found,
        action: (game) => { game.eventManager.triggerEvent('investigate_bathroom_c2'); }
    },

    'investigate_square_c2': {
        location: 'village_square',
        buttonTextKey: 'event_investigate_environment_btn',
        condition: (state) =>
            state.activeHostId === 'song_xin' &&
            state.story.mainQuest === 'stranger_in_a_strange_land' &&
            !state.story.flags.chapter2.investigation.square_cameras_found,
        action: (game) => { game.eventManager.triggerEvent('investigate_square_c2'); }
    },

    'investigate_office_c2': {
        location: 'village_office',
        buttonTextKey: 'event_investigate_environment_btn',
        condition: (state) =>
            state.activeHostId === 'song_xin' &&
            state.story.mainQuest === 'stranger_in_a_strange_land' &&
            !state.story.flags.chapter2.investigation.office_met_zhao,
        action: (game) => { game.eventManager.triggerEvent('meet_zhao_qimin_c2'); }
    },

    'investigate_lake_c2': {
        location: 'village_lake',
        buttonTextKey: 'event_investigate_environment_btn',
        condition: (state) =>
            state.activeHostId === 'song_xin' &&
            state.story.mainQuest === 'stranger_in_a_strange_land' &&
            !state.story.flags.chapter2.investigation.lake_found_warehouse_shadow,
        action: (game) => { game.eventManager.triggerEvent('investigate_lake_c2'); }
    },

    'make_takeover_plan_c2': {
        location: 'huili_home_your_bedroom',
        buttonTextKey: 'event_make_plan_btn',
        condition: (state) => {
            if (state.activeHostId !== 'song_xin') return false; // 添加宿主检查

            const flags = state.story.flags.chapter2.investigation;
            return flags.camera_found && flags.water_system_found && flags.square_cameras_found &&
                flags.office_met_zhao && flags.lake_found_warehouse_shadow && !flags.plan_made;
        },
        action: (game) => { game.eventManager.triggerEvent('make_takeover_plan_c2'); }
    },
    //出现判定
    'takeover_huili_real': {
        location: 'huili_home_bathroom', // 按钮出现在厕所
        buttonTextKey: 'event_execute_plan_btn',
        color: 'bg-red-700', // 标记为重要事件

        // 【宽松的出现条件】
        condition: (state) =>
            state.story.flags.chapter2.investigation.plan_made &&
            state.activeHostId === 'song_xin' &&
            !state.hosts.zhang_huili.wasEverPossessed,

        // 【严格的执行检查】
        check: (state) => state.time.segment.startsWith('evening'),

        // 【成功动作】
        action: (game) => { game.eventManager.triggerEvent('takeover_host_zhang_huili'); },

        // 【失败反馈】
        failAction: {
            type: 'showMessage',
            key: 'feedback_takeover_huili_not_night',
            messageType: 'warning'
        }
    },

    // === 史莱姆商店 ===
    'access_special_store': {
        location: 'special_store',
        buttonTextKey: 'event_investigate_machine_btn',
        // 条件：只有史莱姆单体能进入
        condition: (state) => state.controlState === 'SLIME_DETACHED',
        action: (game) => { game.uiManager.openStoreModal(); }
    }
};

const chapterSetupData = {
    // === 第二章的启动配置 ===
    2: {
        mainQuest: 'stranger_in_a_strange_land',
        initialCountdown: { key: 'bomb_countdown', days: 30, isVisible: false },
        hostStatusChanges: {
            'song_wei': { status: 'DISCONNECTED' },
            'song_xin': { currentLocationId: 'huili_home_your_bedroom' }
        },
        initialDailyFlow: 'village_life' // 为新章节设置默认流程
    },
    // === 第三章的预留位置 ===
    3: {
        // mainQuest: 'new_quest_for_chapter_3',
        // initialCountdown: { key: 'another_countdown', days: 15, isVisible: true },
        // hostStatusChanges: {
        //     'zhang_huili': { status: 'DISCONNECTED' },
        //     'liu_min': { currentLocationId: 'new_city_apartment' }
        // },
        // initialDailyFlow: 'city_exploration'
    }
    // ... 未来可以继续添加更多章节
};

// 在 data.js 文件末尾
export {
    introData,
    gameOverData,
    allLocationData,
    allDailyFlows,
    actionData,
    skillsData,
    allNsfwData,
    taskData,
    locationEventData,
    chapterData,
    allEventData,
    allNpcInteractions,
    generalHints,
    chapterSetupData
};
