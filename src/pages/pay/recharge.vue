<template>
  <div class="wrapper">
      <!-- 充值协议 -->
      <div class="recharge">
          <h3 class="explain">用户充值说明</h3>
          <p class="introduction">
            尊敬的用户，为保障您的合法权益，请您在充值前仔细阅读本规则，以免造成误解。当您点击“立即充值”按钮后，即视为您已阅读、理解本协议，并同意按本协议的规定参与充值。
          </p>
          <h3 class="headline">1、兑换比例</h3>
          <p class="content">1元人民币=100书币</p>
          <h3 class="headline">2、赠送比例</h3>
          <p class="content">单笔充值50元，送10元，且升级为<span class="vip">VIP</span>用户</p>
          <p class="content">单笔充值100元，送25元，且升级为<span class="vip">VIP</span>用户</p>
          <p class="content">单笔充值200元，送60元，且升级为<span class="vip">VIP</span>用户</p>
          <p class="content">单笔充值500元，送200元，且升级为<span class="vip">高级VIP</span>用户</p>
          <h3 class="headline">3、赠送条件及相应说明</h3>
          <p class="content">3.1 充值送只针对首次充值用户。</p>
          <p class="content">3.2 充值赠送金额兑换的为阅读币，阅读币可以用来订阅VIP章节（阅读币不能订阅全本特价书籍，也不能用来打赏作者）</p>
          <p class="content">3.3 重大节假日，充值活动时满额即送，不单单局限首充用户</p>
          <h3 class="headline">4、特别说明</h3>
          <p class="content">4.1 充值余额有效期：充值及返现金额有期限为自充值日起至用完即止；</p>
          <p class="content">4.2 余额花费及退款规则：充值金额为虚拟货币，暂不支持退款，如遇特殊情况请联系客服。</p>
          <p class="content">4.3 目前只支持支付宝和微信充值</p>
          <h3 class="headline">5、联系客服</h3>
          <p class="content">充值过程中遇到任何问题均可联系客服，客服请加微信公众号：luochucom</p>
      </div>
  </div>  
</template>
<script>
export default {
    name:"recharge",
    data(){
        return{

        }
    }
}
</script>


<style scoped>
.wrapper {
  width: 100%;
  background-color: #fff;
}
/* 充值协议 */
.recharge{
  background-color: #fff;
  padding: 0.9375rem ;
  text-align: left;
}
.recharge .explain{
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.25rem;
  text-align: center;
}
.recharge .introduction{
  font-size: 0.875rem;
  color:   #7c7c8c;
 
}
.headline{
margin-top: 2rem;
}
.headline,.content{
  font-size: 0.875rem;
  color: #333;
  margin-bottom: 1.25rem;
}
.recharge .content{
color:  #7c7c8c;
margin-bottom: 1.25rem;
}
.recharge .content .vip{
  color: #1db7ac;
}
</style>

