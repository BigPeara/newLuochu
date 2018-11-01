/**
 * 阅读配置类
 * filename:readingConfig.js
 * created by charlesshang
 */
import Vue from 'vue'
import VueCookie from 'vue-cookie'
const WS_READINGCONFIG = "ws_readingconfig";
const MAX_FONTSIZE = 2.0;
const MINI_FONTSIZE = 0.8;

export default {
    get() {
        var config = JSON.parse(VueCookie.get(WS_READINGCONFIG)) || {
            mode: 'sun',
            fontsize: 1.2
        };
        return config;
    },
    set(val) {
        VueCookie.set(WS_READINGCONFIG, JSON.stringify(val));
    },
    setMode(mode) {
        let config = this.get();
        config.mode = mode;
        this.set(config);
        return mode;
    },
    fontSizePlus() {
        return this.changeFontSize(0.1);
    },
    fontSizeMinus() {
        return this.changeFontSize(-.1);
    },
    changeFontSize(val) {
        let config = this.get();
        if (config.fontsize + val < MINI_FONTSIZE) {
            config.fontsize = MINI_FONTSIZE;
        } else if (config.fontsize + val > MAX_FONTSIZE) {
            config.fontsize = MAX_FONTSIZE;
        } else {
            config.fontsize += val;
        }
        this.set(config);
        return config.fontsize;
    }
}