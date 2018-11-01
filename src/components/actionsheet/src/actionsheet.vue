<template>
<transition name="ws-actionsheet-pop">
<div class="ws-actionsheet" v-show="visible"  >
    <div class="ws-actionsheet-wrapper">
      <ul>
        <li v-for="(aciton,$index) in actions" :key="$index" @click="aciton.callback"><i :class="['icon','icon'+item.icon]"></i>{{aciton.title}}</li>
      </ul>
    </div>
  </div>
</transition>
  
</template>


<style scoped>
.ws-actionsheet {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  transition: opacity .2s linear;
}
.ws-actionsheet-wrapper {
  position: fixed;
  width: 100%;
  padding: 0 1rem;
  background: #ffffff;
  color: #333;
}
.ws-dialog-content {
  padding: 0.875rem;
  background: #fff;
  border-radius: 5px;
  -webkit-border-radius: 5px;
}
.ws-dialog-title {
  text-align: center;
}
.ws-dialog-close {
  width: 100%;
  color: #fff;
  font-size: 1.25rem;
  text-align: center;
  position: absolute;
  bottom: -3rem;
}

.ws-actionsheet-pop-enter, .ws-actionsheet-pop-leave-active {
  opacity: 0;
}
</style>

<script type="text/babel">
export default {
  props: {
    title: String,
    actions:Array
  },
  data() {
    return {
        visible: false
      };
  },
  computed: {},
  methods: {
    close() {
      this.visible =false;
    }
  }
};
</script>

