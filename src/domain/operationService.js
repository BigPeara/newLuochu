/**
 * 操作中心类
 * filename:operationService.js
 * created by charlesshang
 */
import HttpUtil from '@/utils/httpUtil'
import { Toast } from 'mint-ui'
export default {
    /**
     * 订阅章节
     * @param {*viewmodel}  
     * @param {*书籍Id} bid 
     * @param {*章节Id} cid 
     */
    subscribe($vm, bid, cid) {
        return new Promise(function(resolve, reject) {
            if (!$vm.actived) return;
            $vm.actived = false;
            HttpUtil.request('api/OperationCenter/SubscribeChapter', {
                bid: bid,
                cids: cid,
                isAuto: true
            }).then(
                response => {
                    Toast('订阅成功！');
                    resolve(response.data);
                    $vm.actived = true;
                },
                err => {
                    $vm.actived = true;
                });
        });
    }
}