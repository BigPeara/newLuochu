<template>
  <div class="page-wrapper">
    <div id="loginWithAccount" v-show="withAccount" >
      <h4 class="title">账号登录</h4>
      <ws-input label='账号：' v-model='loginWithAccount.username'  placeholder="手机号/账号" />
      <ws-input label='密码：' v-model='loginWithAccount.password'  type='password' placeholder="6-18位密码" />
      <ws-button :block='true' text='登录' @click="login" :actived="validLoginWithAccount()"/>
      <div class="tip">
        <p @click="change(false)">手机号快速登录</p>
      </div>
    </div>

    <div id="loginWithPhone" v-show="!withAccount">
      <h4 class="title">手机快速登录</h4>
      <ws-input-sendmsg  label='手机号：' v-model="loginWithMobile.mobile"  :msgType='4' type='sendMsg' placeholder="请输入手机号" />
      <ws-input label='验证码：' v-model="loginWithMobile.validCode" type='number' placeholder="请输入验证码" />
      <ws-button :block='true' text='登录' @click="login" :actived="validLoginWithMobile()"/>
      
      <div class="tip">
        <p @click="change(true)">账号密码登录</p>
      </div>
    </div>
  </div>
</template>

<script>
import WsInput from "@/components/form/input";
import WsInputSendmsg from "@/components/form/inputSendMsg";
import WsButton from "@/components/button/button";
import PersonalCenterService from "@/domain/personalcenterService";
import BookCaseService from "@/domain/bookcaseService";
import CookieConfig from '@/utils/cookieConfig';
export default {
  data() {
    return {
      isLogining: false,
      withAccount: false,
      loginWithAccount: {
        username: "",
        password: ""
      },
      loginWithMobile: {
        mobile: "",
        validCode: ""
      }
    };
  },
  methods: {
    login() {
      let redirect = this.$cookie.get(CookieConfig.WS_REDIRECT_URL)||'/mine';
      if (this.withAccount) {
        PersonalCenterService.userLogin(this).then(data => {
          this.$router.push(redirect);
          this.$cookie.set(CookieConfig.WS_REDIRECT_URL,'');
          BookCaseService.reloadBookCase();
        });
      } else {
        PersonalCenterService.mobileLogin(this).then(data => {
          this.$router.push(redirect);
          this.$cookie.set(CookieConfig.WS_REDIRECT_URL,'');
          BookCaseService.reloadBookCase();
        });
      }
    },
    change(wa) {
      this.withAccount = wa;
    },
    validLoginWithAccount() {
      return (
        this.$data.loginWithAccount.username != "" &&
        this.$data.loginWithAccount.password != "" &&
        !this.isLogining
      );
    },
    validLoginWithMobile() {
      return (
        this.$data.loginWithMobile.mobile != "" &&
        this.$data.loginWithMobile.validCode != "" &&
        !this.isLogining
      );
    }
  },
  components: {
    WsInput,
    WsButton,
    WsInputSendmsg
  }
};
</script>


<style scoped>
.title {
  text-align: center;
  padding: 1rem .5rem;
}
.tip {
  text-align: center;
  margin-top: 0.625rem;
}
</style>
