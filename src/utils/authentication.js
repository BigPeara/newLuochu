/**
 * 身份验证操作类
 * filename:authentication.js
 * created by charlesshang
 */
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import Native from '@/utils/nativeUtil'

const WS_TOKEN = 'ws_token';
const WS_CURRENT_USERDATA = 'ws_current_userdata';
export default {
    /**
     * 获取登录状态
     */
    getLoginState() {
        return this.getUid();
    },
    setLoginState(userdata, token) {
        VueCookie.set(WS_TOKEN, token, { expires: '1Y' });
        VueCookie.set(WS_CURRENT_USERDATA, JSON.stringify(userdata), { expires: '1Y' });
    },
    getToken() {
        return VueCookie.get(WS_TOKEN);
    },
    getUid() {
        var token = VueCookie.get(WS_TOKEN);
        if (token) {
            return token.split(',')[1];
        }
    },
    getUserData() {
        return JSON.parse(VueCookie.get(WS_CURRENT_USERDATA));
    },
    goPay(bridge) {
        var payLocation = "http://client.h5.luochu.com/pay/sdk/defaultSdk.aspx";
        let userData = this.getUserData();
        payLocation += "?uid=" + userData.id;
        payLocation += "&username=" + userData.nickName;
        payLocation += "&client_ver=" + VueCookie.get('client_ver') || 'IOS_1_0_2';
        payLocation += "&device_id=" + VueCookie.get('device_id') || '85bd4771ce1f67f8ec5ea433f87d39a6';
        payLocation += "&channel_id=" + VueCookie.get('channel_id') || '13148';
        payLocation += "&pn_id=" + VueCookie.get('pn_id') || '13148';
        payLocation += "&app_scheme=" + VueCookie.get('app_scheme') || 'luochu';
        payLocation += "&token=" + this.getToken();
        //Native.WindowOpener(bridge).webView(encodeURI(payLocation));
        window.location.href = payLocation;
    }
}