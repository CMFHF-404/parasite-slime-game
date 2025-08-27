// ====== 语言管理模块 ======
import { LANGS } from './language.js';

class LanguageManager {
    constructor() {
        this.supportedLanguages = ['zh', 'en'];
        this.defaultLanguage = 'zh';
        this.currentLangCode = this.initializeLanguage();
        this.LANG = LANGS[this.currentLangCode];
    }

    /**
     * 初始化语言设置
     * 优先级：用户设置 > 系统语言 > 默认语言
     */
    initializeLanguage() {
        // 1. 检查用户是否有保存的语言偏好
        const savedLanguage = this.getSavedLanguage();
        if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
            console.log(`使用用户保存的语言设置: ${savedLanguage}`);
            return savedLanguage;
        }

        // 2. 检测系统语言
        const systemLanguage = this.detectSystemLanguage();
        console.log(`检测到系统语言: ${systemLanguage}`);
        return systemLanguage;
    }

    /**
     * 检测系统语言
     */
    detectSystemLanguage() {
        try {
            // 获取用户的语言偏好列表（按优先级排序）
            const userLanguages = navigator.languages || [navigator.language];

            console.log('用户语言偏好列表:', userLanguages);

            // 遍历用户的语言偏好，找到第一个支持的语言
            for (const lang of userLanguages) {
                const normalizedLang = this.normalizeLanguageCode(lang);
                if (this.supportedLanguages.includes(normalizedLang)) {
                    return normalizedLang;
                }
            }

            // 如果没有找到支持的语言，返回默认语言
            console.log(`未找到支持的系统语言，使用默认语言: ${this.defaultLanguage}`);
            return this.defaultLanguage;

        } catch (error) {
            console.warn('检测系统语言失败，使用默认语言:', error);
            return this.defaultLanguage;
        }
    }

    /**
     * 标准化语言代码
     * 将各种语言代码格式统一为支持的格式
     */
    normalizeLanguageCode(languageCode) {
        if (!languageCode) return this.defaultLanguage;

        const lang = languageCode.toLowerCase();

        // 中文相关的语言代码
        const chineseVariants = [
            'zh', 'zh-cn', 'zh-hans', 'zh-hans-cn',  // 简体中文
            'zh-tw', 'zh-hk', 'zh-mo', 'zh-hant',   // 繁体中文
            'cmn'                                    // 官话
        ];

        // 英文相关的语言代码
        const englishVariants = [
            'en', 'en-us', 'en-gb', 'en-au', 'en-ca', 'en-nz', 'en-za'
        ];

        // 检查是否为中文
        if (chineseVariants.some(variant => lang.startsWith(variant))) {
            return 'zh';
        }

        // 检查是否为英文
        if (englishVariants.some(variant => lang.startsWith(variant))) {
            return 'en';
        }

        // 其他语言默认使用英文
        return 'en';
    }

    /**
     * 获取保存的语言设置
     */
    getSavedLanguage() {
        try {
            return localStorage.getItem('gameLanguage');
        } catch (error) {
            console.warn('读取保存的语言设置失败:', error);
            return null;
        }
    }

    /**
     * 保存语言设置
     */
    saveLanguage(langCode) {
        try {
            localStorage.setItem('gameLanguage', langCode);
            console.log(`语言设置已保存: ${langCode}`);
        } catch (error) {
            console.warn('保存语言设置失败:', error);
        }
    }

    /**
     * 切换语言
     */
    switchLanguage(targetLang = null) {
        if (targetLang) {
            // 切换到指定语言
            if (this.supportedLanguages.includes(targetLang)) {
                this.currentLangCode = targetLang;
            } else {
                console.warn(`不支持的语言: ${targetLang}`);
                return false;
            }
        } else {
            // 在支持的语言之间循环切换
            const currentIndex = this.supportedLanguages.indexOf(this.currentLangCode);
            const nextIndex = (currentIndex + 1) % this.supportedLanguages.length;
            this.currentLangCode = this.supportedLanguages[nextIndex];
        }

        // 更新当前语言包
        this.LANG = LANGS[this.currentLangCode];

        // 保存用户选择
        this.saveLanguage(this.currentLangCode);

        // 应用语言更改
        this.applyLanguage();

        // 触发自定义事件（可选）
        this.dispatchLanguageChangeEvent();

        console.log(`语言已切换至: ${this.currentLangCode}`);
        return true;
    }

    /**
     * 应用语言到界面
     */
    applyLanguage() {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            let translatedText = this.LANG[key];

            // 如果当前语言缺失翻译，回退到默认语言
            if (translatedText === undefined && this.currentLangCode !== this.defaultLanguage) {
                translatedText = LANGS[this.defaultLanguage][key];
                console.warn(`缺失翻译 ${this.currentLangCode}:${key}，使用默认语言`);
            }

            if (translatedText !== undefined) {
                element.textContent = translatedText;
            } else {
                console.warn(`完全缺失翻译: ${key}`);
            }
        });

        // 更新HTML的lang属性
        document.documentElement.lang = this.currentLangCode;
    }

    /**
     * 触发语言变更事件
     */
    dispatchLanguageChangeEvent() {
        const event = new CustomEvent('languageChange', {
            detail: {
                language: this.currentLangCode,
                languageData: this.LANG
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * 获取当前语言
     */
    getCurrentLanguage() {
        return this.currentLangCode;
    }

    /**
     * 获取当前语言包
     */
    getCurrentLanguageData() {
        return this.LANG;
    }

    /**
     * 获取语言显示名称
     */
    getLanguageDisplayName(langCode = this.currentLangCode) {
        const displayNames = {
            'zh': '中文',
            'en': 'English'
        };
        return displayNames[langCode] || langCode;
    }

    /**
     * 重置为系统语言
     */
    resetToSystemLanguage() {
        // 清除保存的设置
        try {
            localStorage.removeItem('gameLanguage');
        } catch (error) {
            console.warn('清除语言设置失败:', error);
        }

        // 重新检测系统语言
        const systemLanguage = this.detectSystemLanguage();
        this.switchLanguage(systemLanguage);

        console.log(`已重置为系统语言: ${systemLanguage}`);
    }
}

// ====== 使用示例 ======

// 1. 在游戏初始化时创建语言管理器
const languageManager = new LanguageManager();

// 2. 在游戏类中集成
class Game {
    constructor() {
        this.languageManager = new LanguageManager();

        // 监听语言变更事件
        document.addEventListener('languageChange', (event) => {
            console.log('语言已变更:', event.detail);
            // 更新游戏中的动态文本
            this.updateDynamicTexts();
            // 重新渲染界面
            this.update();
        });

        // 初始应用语言
        this.languageManager.applyLanguage();
    }

    updateDynamicTexts() {
        const state = this.stateManager.getState();
        const LANG = this.languageManager.getCurrentLanguageData();

        // 更新角色名称等动态文本
        if (state.hosts && state.hosts['song_wei']) {
            state.hosts['song_wei'].name = LANG['host_name_song_wei'] || '宋薇';
        }
        if (state.hosts && state.hosts['song_xin']) {
            state.hosts['song_xin'].name = LANG['host_name_song_xin'] || '宋欣';
        }
    }

    // 语言切换方法
    switchLanguage(targetLang = null) {
        return this.languageManager.switchLanguage(targetLang);
    }
}

// 3. HTML中的语言切换按钮
/*
<div class="language-switcher">
    <button onclick="game.switchLanguage()" data-lang-key="btn_language_switch">
        中/EN
    </button>
    
    <!-- 或者使用下拉选择 -->
    <select onchange="game.switchLanguage(this.value)">
        <option value="zh">中文</option>
        <option value="en">English</option>
    </select>
    
    <!-- 重置为系统语言按钮 -->
    <button onclick="game.languageManager.resetToSystemLanguage()" 
            data-lang-key="btn_reset_to_system_language">
        跟随系统
    </button>
</div>
*/

// 4. 导出语言管理器供其他模块使用
export { LanguageManager };