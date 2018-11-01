<template>
  <div class="wrapper" v-infinite-scroll="getPay"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="5">
      <!-- <h4>充值记录</h4> -->
      <div class="paytitle">
        <p class="title">账户余额: <span class="count">{{userData.vipMoney}}</span>&nbsp;书币+<span class="count">{{userData.extcredits2}}</span>&nbsp;阅读币</p>
      </div>
      <ul class="payRecords">
        <li class="paylist" v-for="(item,index) in list" :key="index">
          <div class="payWays flex flex-justify">
            <div class="wayInfo">
              <p class="way">充值方式：{{item.pType}}</p>
              <p class="orderNumber">订单号：{{item.orderNumber}}</p>
            </div>
            <p class="payMoney" v-bind:class="{ 'green': item.isSuccess,'red':!item.isSuccess }">￥{{item.payAmount}}</p>
          </div>
          <div class="statusInfo flex flex-justify">
            <p class="time">{{item.addtime}}</p>
            <p class="status">{{item.isSuccess?'交易成功':'交易失败'}}</p>
          </div>

        </li>
      </ul>
       <ws-footer-line :pager="pager" />
  </div>
</template>
<script>
import PersonalCenterService from '@/domain/personalcenterService'
import WsFooterLine from "@/components/footer/footerline";
import Authentication from '@/utils/authentication'
export default {
  name: "pay-records",
  data() {
    return {
       list:[],
       pager:{
        pageIndex:1,
        pageSize:10,
        records:0,
        loadFinished:false,
        isloading:false
      },
      money:0,
      userData:{}
    };
  },
  created(){
    this.init();
    this.getPay();
  },
  methods: {
   getPay(){
      PersonalCenterService.getPay(this.$data,this.$route.params.bid ).then(data=>{
        for(var b in data){ 
          this.$data.list.push(data[b]);
        }
      });
    },
    init(){
      var userData = Authentication.getUserData();
      this.userData = userData.data;
    }
  },
  components:{
    WsFooterLine
  }
}
</script>
<style scoped>
.wrapper{
  text-align: left;
}
.paytitle{
padding:0 0.9375rem;
}
.paytitle .title{
  font-size: 0.8125rem;
  color:#666;
  height: 1.5625rem;
  line-height: 1.5625rem;
  padding: 0.9375rem 0
}
.paytitle .count {
 color: #F25449;
}
.payRecords{
  padding: 0 0.9375rem;
  background-color: #fff;
}
.payRecords li:nth-last-child(1){
  border-bottom: none;
}
.paylist{
  padding: 0.9375rem 0;
  border-bottom: 1px solid #E5E5E5;
}
.way{
  font-size: 0.9375rem;
  color: #333;
}
.orderNumber{
  font-size: 0.8125rem;
  color: #666;
  width:  90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.payWays{
  height: 2.5rem;
}
.payMoney{
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 1rem;
  color: #F25449;
}
.statusInfo{
  color: #999;
  font-size: 0.75rem;
  margin-top: 0.625rem;
}
.payWays .red{
  color:#F25449;
}
.green{
  color: #5CCC76;
}
</style>


