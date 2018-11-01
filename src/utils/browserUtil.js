/**
 * http请求公共操作类
 * filename:httpUtil.js
 * created by charlesshang
 */


export default {
    /**
     * 是否是微信浏览器
     */
    isWechat() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == "micromessenger";
    }
}