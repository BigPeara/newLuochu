/**
 * 个人中心业务类
 * filename:personalcenter.js
 * created by charlesshang
 */
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import HttpUtil from '@/utils/httpUtil'
import Authentication from '@/utils/authentication'
import { Toast } from 'mint-ui'


export default {
    /**
     * 静默登录
     */
    guestLogin($vm, token, appid) {
        return new Promise(function(resolve, reject) {
            $vm.isLogining = true;
            HttpUtil.request('api/PersonalCenter/Guest', {
                nickNameTitle: VueCookie.get('nickNameTitle') || '落初文学书友_',
                magapp_token: token,
                app_id: appid
            }).then(
                response => {
                    Toast('欢迎回来!')
                    $vm.isLogining = false;
                    Authentication.setLoginState(response.data, response.Token);
                    resolve(response.data);
                },
                err => {
                    $vm.isLogining = false;
                });
        });
    },
    /**
     * 账号密码登录
     */
    userLogin($vm) {
        return new Promise(function(resolve, reject) {
            $vm.isLogining = true;
            HttpUtil.request('api/PersonalCenter/UserLogin', {
                account: $vm.loginWithAccount.username,
                pwd: $vm.loginWithAccount.password
            }).then(
                response => {
                    Toast('欢迎回来!')
                    $vm.isLogining = false;
                    Authentication.setLoginState(response.data, response.Token);
                    resolve(response.data);
                },
                err => {
                    $vm.isLogining = false;
                });
        });
    },
    /**
     * 手机验证码登录
     */
    mobileLogin($vm) {
        return new Promise(function(resolve, reject) {
            $vm.isLogining = true;
            HttpUtil.request('api/PersonalCenter/MobileLogin', {
                mob: $vm.loginWithMobile.mobile,
                mobKey: $vm.loginWithMobile.validCode
            }).then(
                response => {
                    Toast('欢迎回来!')
                    $vm.isLogining = false;
                    Authentication.setLoginState(response.data, response.Token);
                    resolve(response.data);
                },
                err => {
                    $vm.isLogining = false;
                });
        });
    },
    /**
     * 手机绑定
     */
    mobileBind($vm) {
        return new Promise(function(resolve, reject) {
            $vm.loading = true;
            HttpUtil.request('api/PersonalCenter/BindMobile', {
                mob: $vm.bindMobile.mobile,
                mobKey: $vm.bindMobile.validCode,
                pwd: $vm.bindMobile.password
            }).then(
                response => {
                    Toast('绑定成功!')
                    $vm.loading = false;
                    Authentication.setLoginState(response.data, response.Token);
                    resolve(response.data);
                },
                err => {
                    $vm.loading = false;
                });
        });
    },
    /**
     * 刷洗用户信息
     */
    userInfo($vm) {
        return new Promise(function(resolve, reject) {
            HttpUtil.request('api/PersonalCenter/Info', {}).then(
                response => {
                    Authentication.setLoginState(response.data, response.Token);
                    resolve(response.data);
                },
                err => {});
        });
    },
    /**
     * 注册
     */
    register() {

    },
    /**
     * 订阅记录
     */
    getRecords($vm) {
        return new Promise(function(resolve, reject) {
            if ($vm.pager.loadFinished || $vm.pager.isloading)
                return;
            $vm.pager.isloading = true;
            HttpUtil.requestPager('api/OperationCenter/SubscriptionRecord', {
                type: 2,
                pageSize: $vm.pager.pageSize,
                pageIndex: $vm.pager.pageIndex
            }).then(
                response => {
                    $vm.pager.isloading = false;
                    $vm.pager.records += response.data.length;
                    $vm.pager.pageIndex++;
                    if ($vm.pager.records >= response.Total)
                        $vm.pager.loadFinished = true;
                    resolve(response.data);
                });
        });

    },
    /**
     * 充值记录
     */
    getPay($vm) {
        return new Promise(function(resolve, reject) {
            if ($vm.pager.loadFinished || $vm.pager.isloading)
                return;
            $vm.pager.isloading = true;
            HttpUtil.requestPager('api/Pay/LogPay', {
                pageSize: $vm.pager.pageSize,
                pageIndex: $vm.pager.pageIndex
            }).then(
                response => {
                    $vm.pager.isloading = false;
                    $vm.pager.records += response.data.length;
                    $vm.pager.pageIndex++;
                    if ($vm.pager.records >= response.Total)
                        $vm.pager.loadFinished = true;
                    resolve(response.data);
                });
        });

    },
    /**
     *全本订阅
     */
    allRecords($vm) {
        return new Promise(function(resolve, reject) {
            if ($vm.pager.loadFinished || $vm.pager.isloading)
                return;
            $vm.pager.isloading = true;
            HttpUtil.requestPager('api/OperationCenter/SpecialSubRecord', {
                pageSize: $vm.pager.pageSize,
                pageIndex: $vm.pager.pageIndex
            }).then(
                response => {
                    $vm.pager.isloading = false;
                    $vm.pager.records += response.data.length;
                    $vm.pager.pageIndex++;
                    if ($vm.pager.records >= response.Total)
                        $vm.pager.loadFinished = true;
                    resolve(response.data);
                });
        });

    },
}