<template>
  <div class="ws-input">
      <label>{{label}}</label>
      <div class="input-container">
          <input type="number" :value="value" @input="input" ref='input' :placeholder="placeholder" />
      </div>
      <span class="btn-send" @click="sendMsg" :class="this.validate()?'btn-send-disabled':''" v-text="text" ></span>
  </div>
</template>

<script>
import UrlConfig from "@/utils/urlConfig";
import WsButton from "@/components/button/button";

import SystemService from "@/domain/systemService";
export default {
  name: "ws-input-sendmsg",
  data() {
    return {
      interval: 60,
      seconds: 61,
      disabled: false,
      text: "获取验证码",
      timer: {
        index: 0
      }
    };
  },
  props: {
    msgType: {
      type: Number,
      default: 1,
      validator(value) {
        return [1, 2, 3, 4].indexOf(value) > -1;
      }
    },
    label: String,
    placeholder: String,
    value:String
  },
  methods: {
    /**
     * 发送验证码
     */
    sendMsg() {
      SystemService.sendMsg(this).then(data => {});
    },
    setText() {
      this.text =
        this.seconds < this.interval
          ? this.seconds + "s"
          : this.disabled ? "发送中..." : "获取验证码";
    },
    input(evt){
      this.$emit('input', evt.target.value)
    },
    validate(){
       return this.disabled|| !(/^1[3|4|5|8|9][0-9]\d{8}$/.test(this.value));
    }
  },
  components: {
    WsButton
  }
};
</script>

<style>
.ws-input {
  border-bottom: 1px solid #e5e5e5;
  padding: 0.625rem 0;
  margin: 0.625rem 0;
  position: relative;
  text-align: left;
}
.ws-input input{
    border: none;
    background: transparent;
}
.input-container{
  position: relative;
  top: 0.625rem;
  right: 0;
  position: absolute;
  left: 4.8rem;
  right: 6rem;
}
.ws-input input{
  width: 100%;
}
.btn-send {
  color: #1db7ac;
  border-left: 1px solid #cbcbcb;
  padding-left: 0.5rem;
  top: 0.625rem;
  width: 5rem;
  text-align: center;
  right: 0;
  position: absolute;
}
.btn-send-disabled {
  color: #cbcbcb;
}
</style>
