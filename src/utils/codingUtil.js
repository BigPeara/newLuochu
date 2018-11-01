/**
 * 编码操作类
 * filename:codingUtil.js
 * created by charlesshang
 */

export default {
    /**
     * unicode转中文
     * @param {*unicode字符串} str 
     */
    decodeUnicode(str) {
        str = str.replace(/\\/g, "%");
        return unescape(str);
    },
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}