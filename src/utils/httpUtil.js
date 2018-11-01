/**
 * http请求公共操作类
 * filename:httpUtil.js
 * created by charlesshang
 */
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import { Toast, Indicator } from 'mint-ui';
import UrlConfig from '../utils/urlConfig'
import Md5 from '../utils/md5'
import Authentication from '@/utils/authentication'

const REQUEST_BASE_URL = UrlConfig.REQUEST_BASE_URL
// const CHOICE_BASE_URL=UrlConfig.CHOICE_BASE_URL

export default {
    /**
     * 生成签名
     * @param {*待提交的数据} postdata
     */
    makeSign(postdata) {
        //属性排序
        let properties = [];
        for (var p in postdata) {
            properties.push(p);
        }
        var sortProArr = properties.sort((a, b) => a < b ? -1 : 1);
        //拼接
        let str = '';
        for (var i = 0, len = sortProArr.length; i < len; i++) {
            str = str + (sortProArr[i].toLocaleLowerCase() + '=' + postdata[sortProArr[i]]) + (i < len - 1 ? '&' : '');
        }
        str += '&key=PKwUJyO1GGraH7mDhClqWHExSPgGgcq';
        var signStr = Md5.md5(Md5.md5(str));
        return signStr;
    },
    /**
     * post提交数据
     * @param {*请求地址} url
     * @param {*请求数据} postdata
     * @param {*请求前回调} beforeRequest
     * @param {*请求结束回调} requested
     */
    post(url, postdata, beforeRequest, requested) {
        var $self = this;
        if (beforeRequest) beforeRequest();
        return new Promise(function(resolve, reject) {
            postdata['token'] = Authentication.getToken() || '';
            postdata['uid'] = Authentication.getUid() || 0;
            //postdata['app_id'] = VueCookie.get('app_id') || 13148;
            postdata['channel_id'] = VueCookie.get('channel_id') || 13148;
            postdata['pkgname'] = VueCookie.get('pkgname') || 'com.luochu.reader';
            postdata['device_id'] = VueCookie.get('device_id') || 13148;
            var signStr = $self.makeSign(postdata);
            postdata['sign'] = signStr;
            Vue.http.post(REQUEST_BASE_URL + url, postdata).then(response => {
                if (requested) requested();
                if (response.status === 200) {
                    var $response = response.body;
                    if ($response.Success) {
                        resolve($response);
                    } else {
                        if(postdata.hideToast){
                            return;
                        }
                        Toast($response.Message);
                        reject($response.Message);
                    }
                } else {
                    Toast('请求失败');
                    reject('');
                }
            }, error => {
                if (requested) requested();
                Toast('网络错误');
                reject(error);
            })
        });
    },
    /**
     * post请求数据
     * @param {*请求url地址} url
     * @param {*提交的数据} postdata
     */
    request(url, postdata) {
        return this.post(url, postdata, () => {
                Indicator.open();
            },
            () => {
                Indicator.close();
            });
    },
    /**
     * 分页查询数据请求
     * @param {*请求url地址} url
     * @param {*提交的数据} postdata
     */
    requestPager(url, postdata) {
        return this.post(url, postdata, () => {
                ///Indicator.open();
            },
            () => {
                //Indicator.close();
            });
    }
}
