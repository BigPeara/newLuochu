<template>
 <mt-loadmore class="wrapper" :top-method="loadTop" :autoFill="true" ref="reload" @top-status-change="handleTopChange">   
    <div class="header flex">
      <router-link :to="'/mine/userInfo'">
        <ws-avatar :avatar='userData.avatar' />
      </router-link>
      <div class="user-info flex flex-box">
        <div v-if="!isLogined">
          <p @click="login">请登录</p>
        </div>
        <div v-if="isLogined">
        <p><span class="user-nickname">{{userData.nickName.substring(0,20)+(userData.nickName.length>20?'...':'')}}</span> <i class="icon" :class="[{'icon-woman':userData.gender,'icon-man':!userData.gender}]"></i></p>
        <p v-if="showPay" class="account-info">余额：<span>{{userData.vipMoney}}</span>书币+<span>{{userData.readcoins}}</span>阅读币</p>
        </div>
      </div>
    </div>
    <ws-cell-module>
      <ws-cell title="充值" titleColor="#F25449" label="充值有礼" icon="money" iconColor="#F25449" link='/pay' v-if="showPay"></ws-cell>
    </ws-cell-module>
    <ws-cutoff-rull />
    <ws-cell-module hasBorder='true'>
      <ws-cell title="阅读记录" v-if="showPay" icon='record' iconColor='#F49F00' link='/bookcase/1' ></ws-cell>
      <ws-cell title="充值记录" v-if="showPay" icon='pay-record' iconColor='#F49F00' link='/mine/payRecords'></ws-cell>
      <ws-cell title="消费记录" v-if="showPay" icon='paper' iconColor='#F49F00' link='/mine/subRecords' ></ws-cell>
      <ws-cell title="个人资料" icon='personage' iconColor='#F02134' link='/mine/userInfo' ></ws-cell>
      <ws-cell title="联系客服" icon='eye' iconColor='#F02134' link='/mine/custService' ></ws-cell>
      <ws-cell v-show="!userData.mob" v-if="showPay" title="绑定手机号" icon='phone' iconColor='#9ED40C' link='/mine/bindMobile' label="赠100币"></ws-cell>
      <!-- <ws-cell title="下载APP" icon='download' iconColor='#F02639' label="每天领书币" linkType='href' link='http://a.app.qq.com/o/simple.jsp?pkgname=com.luochu.reader'></ws-cell> -->
    </ws-cell-module>
    <ws-cutoff-rull />
    <ws-button-cell v-if='!isLogined' text="登录" @click="login" />
    <ws-button-cell v-if='isLogined' text="切换账号" @click="login" />
    <ws-cutoff-rull />
    <div slot="top" class="mint-loadmore-top">
    <p v-show="topStatus !== 'loading'" >
      <span :class="[{ 'rotate': topStatus === 'drop' }]">↓</span>
      &nbsp;
      <span>{{topStatus==='drop'?'放手是一种态度':'使劲...'}}</span>
    </p>
    <p v-show="topStatus === 'loading'" class="flex flex-box flex-center">
        <mt-spinner color='#999' type="fading-circle" :size='16' class="flex flex-box"></mt-spinner>
        <span>&nbsp;数据加载中...</span>
    </p>
  </div>
    </mt-loadmore>
</template>
<script>
import WsCellModule from "@/components/cell/cellModule";
import WsCell from "@/components/cell/cell";
import WsCutoffRull from "@/components/cell/cutoffRull";
import WsButtonCell from "@/components/button/buttoncell";
import WsInput from "@/components/form/input";
import WsAvatar from "@/components/avatar/avatar";
import Authentication from "@/utils/authentication";
import { Toast, Loadmore } from "mint-ui";
import PersonalCenterService from "@/domain/personalcenterService";
import SystemService from "@/domain/systemService";
import Native from "@/utils/nativeUtil";
import CookieConfig from '@/utils/cookieConfig';

export default {
  name: "mine-index",
  data() {
    return {
      isLogined: false,
      userData: {
        avatar: "",
        nickName: "",
        vipMoney: 0,
        readcoins: 0,
        mob: ""
      },
      topStatus: "pull",
      showPay: Native.platform == "android"
    };
  },
  created() {
    this.isLogined = Authentication.getLoginState();
    
      let redirect = this.$cookie.get(CookieConfig.WS_REDIRECT_URL);
      if(redirect){
        this.$router.push(redirect);
        return;
      }
    this.reload();
    this.payConfig();
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    reload() {
      if (this.isLogined) {
        PersonalCenterService.userInfo(this).then(data => {
          this.userData.avatar = data.avatar;
          this.userData.nickName = data.nickName;
          this.userData.vipMoney = data.data.vipMoney;
          this.userData.readcoins = data.data.extcredits2;
          this.userData.mob = data.mob;

          setTimeout(() => {
            this.$refs.reload.onTopLoaded();
            this.topStatus = "pull";
          }, 500);
        });
      } else {
        setTimeout(() => {
          this.$refs.reload.onTopLoaded();
          this.topStatus = "pull";
        }, 500);
      }
    },
    loadTop() {
      this.reload();
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    goPay() {
      if (!this.isLogined) {
        this.$router.push("/login");
        this.$cookie.set(CookieConfig.WS_REDIRECT_URL, "/pay");
        return;
      }
      Authentication.goPay(this.bridge);
    },
    payConfig() {
      this.showPay = SystemService.iosChecked();
    //   console.log(this.showPay);
    }
  },
  components: {
    WsCellModule,
    WsCell,
    WsCutoffRull,
    WsAvatar,
    WsButtonCell,
    WsInput
  }
};
</script>
<style scoped>
.wrapper {
  margin-bottom: -3.125rem;
  min-height: 100vh;
}
.header {
  height: 5.4375rem;
  background: #1db7ac;
}
.header .ws-avatar {
  margin: 0.9375rem 0.625rem;
}
.header .user-info {
  text-align: left;
  color: #fff;
  font-size: 1rem;
  margin: 0.9375rem 0rem;
}
.header .user-info .account-info {
  font-size: 0.875rem;
}
.user-nickname {
  max-width: 50%;
}
.icon-man {
  color: #63e0ff;
}
.icon-woman {
  color: #ff7989;
}
</style>
