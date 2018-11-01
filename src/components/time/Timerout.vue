<template>
  <div class="timer-container flex flex-box" >
    <button class='item-container'>{{day}}</button>
    <i>:</i>
    <button class='item-container'>{{hour}}</button>
    <i>:</i>
    <button class='item-container'>{{min}}</button>
    <i>:</i>
    <button class='item-container'>{{sec}}</button>
    <input type="hidden" v-text="total">
  </div>
</template>
<script>
export default {
  name: "timer-out",
  data() {
    return {
      totalSec:'--',
      day: '--',
      hour: '--',
      min: '--',
      sec: '--'
    };
  },
  props: ["total"],
  methods: {
    init() {
      this.$data.totalSec = this.$props.total;
      if(this.$data.totalSec>0)
        this.build().start(this.$data.totalSec);
    },
    render(timerObj) {
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;
      //Day
      day = Math.floor(this.$data.totalSec / (60 * 60 * 24));
      if (day <= 9) {
        day = "0" + day;
      }
      this.$data.day = day;
      //Hour
      hour = Math.floor(this.$data.totalSec / (60 * 60)) - day * 24;
      if (hour <= 9) {
        hour = "0" + hour;
      }
      this.$data.hour = hour;
      //Minute
      minute = Math.floor(this.$data.totalSec / 60) - day * 24 * 60 - hour * 60;
      if (minute <= 9) {
        minute = "0" + minute;
      }
      this.$data.min = minute;
      //Second
      second =
        Math.floor(this.$data.totalSec) -
        day * 24 * 60 * 60 -
        hour * 60 * 60 -
        minute * 60;
      if (second <= 9) {
        second = "0" + second;
      }
      this.$data.sec = second;
      if (this.$data.totalSec-- == 0) {
        timerObj.stop();
        this.$emit("timeout", timerObj);
      }
    },
    build() {
      var timerObj = {};
      var render = this.render;
      //timer
      var timer = function(total) {
        var index = window.setInterval(function(){
          render(timerObj);
        }, 1000);
        return index;
      };
      timerObj = {
        index: 0,
        start: function(total) {
          this.index = timer(total);
          return this;
        },
        stop: function() {
          window.clearInterval(this.index);
        }
      };
      return timerObj;
    }
  },
  mounted(){
    this.init();
  },
  watch:{
    total(){
      this.init()
    }
  },
  updated(){
    // this.init();
  }
};
</script>
<style scoped>
.timer-container {
  width: 10rem;
}
.timer-container i{
  margin: 0 .1875rem;
  font-size: .75rem;
}
.item-container {
  font-size: 0.625rem;
  display: block;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: #333;
  color: #fff;
  border: none;
  outline: none;
}
.item-container:first-child {
  background: #f25449;
}
</style>