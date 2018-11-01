<template>
  <div class="page-wrapper">
    <div id="bindMobile">
      <h4 class="title">绑定手机号</h4>
      <ws-input-sendmsg  label='手机号：' v-model="bindMobile.mobile"  :msgType='2' type='sendMsg' placeholder="请输入手机号" />
      <ws-input label='验证码：' v-model="bindMobile.validCode" type='number' placeholder="请输入验证码" />
      <ws-input label='设置密码：' v-model="bindMobile.password" type='password' placeholder="6-18位密码" />
      <ws-button :block='true' text='确定' @click="submit" :actived="formValid()"/>
      <div class="tip">
        <p><i class="icon icon-info"></i>为了您的账户安全，请先绑定手机号码</p>
      </div>
    </div>
  </div>
</template>
<script>
import WsInput from "@/components/form/input";
import WsInputSendmsg from "@/components/form/inputSendMsg";
import WsButton from "@/components/button/button";
import PersonalCenterService from "@/domain/personalcenterService";
export default {
  name:"page-bindMobile",
  data() {
    return {
      loading:false,
      bindMobile: {
        mobile: "",
        validCode: "",
        password:""
      }
    };
  },
  methods: {
    submit() {
      PersonalCenterService.mobileBind(this).then(data => {
          this.$router.push("/mine");
        });
    },
    formValid() {
      return (
        this.bindMobile.mobile != "" &&
        this.bindMobile.validCode != "" &&
        this.bindMobile.password != "" &&
        (this.bindMobile.password.length>=6&&this.bindMobile.password.length<=18)&&
        !this.loading
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
  color: #C7C7C7;
}
.tip .icon{
  color: #F25449;
}
</style>
