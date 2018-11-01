/**
 * 更新页面Api
 * filename:bookstorage.js
 * created by charlesshang
 */

import HttpUtil from '@/utils/httpUtil'

export default {
    /**
     * 排行榜
     */
    rankList(query={}){
        query.channelid = 0;
        query.token = '';
        query.pageSize = 10;
        return new Promise(function(resolve, reject) {
            HttpUtil.requestPager('api/BookStorage/BookCharts',query).then(
                response => {
                    resolve(response.data);
                });
        });
    },
    /**
     * 限时免费
     */
    getFree(query={}){
        query.channelid = 0;
        query.token = '';
        query.pageSize = 10;
        query.pageIndex = 1;
        return new Promise(function(resolve, reject) {
            HttpUtil.request('api/v2/BookStorage/FreePage',query).then(
                response => {
                    resolve(response.data);
                });
        });
    },
    /**
     * 全本
     */
    getComplete(query={}){
        query.channelid = 0;
        query.token = '';
        query.pageSize = 10;
        query.pageIndex = 1;
        return new Promise(function(resolve, reject) {
            HttpUtil.request('api/v2/BookStorage/CompletePage',query).then(
                response => {
                    resolve(response.data);
                });
        });
    },
    /**
     * 大神
     */
    getManito(query={}){
        console.log("请求",query)
        query.channelid = 0;
        query.token = '';
        query.pageSize = 10;
        query.pageIndex = query.pageIndex || 1;
        return new Promise(function(resolve, reject) {
            HttpUtil.request('api/v2/BookStorage/ManitoPage',query).then(
                response => {
                    resolve(response.data);
                });
        });
    }
}