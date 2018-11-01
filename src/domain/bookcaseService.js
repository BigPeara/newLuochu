/**
 * 书架业务操作类
 * filename:bookcaseService.js
 * created by charlesshang
 */
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import { Toast } from 'mint-ui';
import HttpUtil from '@/utils/httpUtil';

const WS_BOOKCASE = 'ws_bookcase';
const WS_LOCAL_SIMPLE_BOOKCASE = 'ws_local_simple_bookcase';
const WS_READINGRECORDS = 'ws_readingRecords';
const WS_LOCAL_SIMPLE_READINGRECORDS = 'ws_local_simple_readingRecords';

export default {
    /**
     * 书架初始化
     * @param {视图模型}  
     * @param {书籍Id} bids 
     */
    init($vm) {
        var $self = this;
        return new Promise(function(resolve, reject) {
            if ($vm.pager.loadFinished || $vm.pager.isloading)
                return;
            $vm.pager.isloading = true;
            HttpUtil.requestPager('api/BookCase/Init', {
                pageSize: $vm.pager.pageSize,
                pageIndex: $vm.pager.pageIndex
            }).then(
                response => {
                    $vm.pager.isloading = false;
                    $vm.pager.records += response.data.items.length;
                    $vm.pager.pageIndex++;
                    if ($vm.pager.records >= response.Total)
                        $vm.pager.loadFinished = true;
                    resolve(response.data);
                    $self.addLocalBookCase(response.data.items);
                });
        });

    },
    /**
     * 加入书架
     * @param {视图模型}  
     * @param {*书籍Id} bid 
     * @param {*章节Id} cid 
     */
    add($vm, bid, cid) {
        var $self = this;
        return new Promise(function(resolve, reject) {
            HttpUtil.request('api/BookCase/Add', {
                bid: bid,
                cid: cid
            }).then(
                response => {
                    resolve(response.data);
                    $self.addLocalBookCase([{ id: bid, cid: cid }]);
                    Toast('收藏成功！');
                });
        });
    },
    /**
     * 移除书架
     * @param {视图模型}  
     * @param {*书籍Id} bid 
     */
    delete($vm, bids) {
        var $self = this;
        return new Promise(function(resolve, reject) {
            HttpUtil.request('api/BookCase/Delete', {
                bids: bids
            }).then(
                response => {
                    resolve(response.data);
                    Toast('移除成功！');
                    $self.removeLocalBookCase(bids);
                });
        });
    },
    /**
     * 阅读记录
     * @param {视图模型}  
     */
    readingRecords($vm) {
        var $self = this;
        return new Promise(function(resolve, reject) {
            if ($vm.pager.loadFinished || $vm.pager.isloading)
                return;
            $vm.pager.isloading = true;
            HttpUtil.requestPager('api/BookCase/Init', {
                gType: 1001,
                pageSize: $vm.pager.pageSize,
                pageIndex: $vm.pager.pageIndex
            }).then(
                response => {
                    $vm.pager.isloading = false;
                    $vm.pager.records += response.data.items.length;
                    $vm.pager.pageIndex++;
                    if ($vm.pager.records >= response.Total)
                        $vm.pager.loadFinished = true;
                    resolve(response.data);
                    $self.addLocalReadRecords(response.data.items);
                });
        });
    },
    /**
     * 阅读记录
     * @param {视图模型}  
     */
    addReadRecords(bid, cid) {
        var $self = this;
        return new Promise(function(resolve, reject) {
            HttpUtil.post('api/BookCase/AddReadRecords', { bid: bid, cid: cid }).then(
                response => {
                    resolve(response.data);
                    $self.addLocalReadRecords([{ id: bid, cid: cid }]);
                });
        });
    },
    addLocalReadRecords(items) {
        var localReadRecords = this.getLocalReadRecords();
        for (var i = 0, len = items.length; i < len; i++) {
            localReadRecords[items[i].id.toString()] = items[i].cid;
        }
        VueCookie.set(WS_LOCAL_SIMPLE_READINGRECORDS, JSON.stringify(localReadRecords));
    },
    getLocalReadRecords() {
        var cookieStr = VueCookie.get(WS_LOCAL_SIMPLE_READINGRECORDS);;
        return JSON.parse(cookieStr || '{}');
    },
    isExistInReadRecords(bid) {
        var readRecords = this.getLocalReadRecords();
        return readRecords[bid.toString()];
    },
    clearLocalRecords() {
        var records = this.getLocalReadRecords();
        records = {};
        VueCookie.set(WS_LOCAL_SIMPLE_READINGRECORDS, JSON.stringify(records));
    },
    addLocalBookCase(items) {
        var localBookcase = this.getLocalBookCase();
        for (var i = 0, len = items.length; i < len; i++) {
            localBookcase[items[i].id.toString()] = items[i].cid;
        }
        VueCookie.set(WS_LOCAL_SIMPLE_BOOKCASE, JSON.stringify(localBookcase));
    },
    removeLocalBookCase(bid) {
        var localBookcase = this.getLocalBookCase();
        localBookcase[bid.toString()] = undefined;
        VueCookie.set(WS_LOCAL_SIMPLE_BOOKCASE, JSON.stringify(localBookcase));
    },
    getLocalBookCase() {
        var cookieStr = VueCookie.get(WS_LOCAL_SIMPLE_BOOKCASE);;
        return JSON.parse(cookieStr || '{}');
    },
    isExistInBookCase(bid) {
        var localBookcase = this.getLocalBookCase();
        return localBookcase[bid.toString()];
    },
    clear() {
        var localBookcase = this.getLocalBookCase();
        localBookcase = {};
        VueCookie.set(WS_LOCAL_SIMPLE_BOOKCASE, JSON.stringify(localBookcase));
    },
    reloadBookCase() {
        this.clear();
        this.init({
            pager: {
                pageSize: 100,
                pageIndex: 1,
                records: 1
            }
        });
    }
}