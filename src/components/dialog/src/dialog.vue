<template>
<transition name="ws-dialog-pop">
<div class="ws-dialog" v-show="visible"  >
    <div class="ws-dialog-wrapper">
      <div class="ws-dialog-content">
        <div v-if="title" class="ws-dialog-title">
        <h4>{{title}}</h4>
        </div>
        <slot></slot>
      </div>
      
        <div class="ws-dialog-close">
          <i class="icon icon-delete" @click="close"></i>
        </div>
    </div>
  </div>
</transition>
  
</template>


<style scoped>
.ws-dialog {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  transition: opacity .2s linear;
}
.ws-dialog-wrapper {
  position: relative;
  margin: 40% auto;
  min-width: 5rem;
  max-width: 80%;
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

.ws-dialog-pop-enter, .ws-dialog-pop-leave-active {
  opacity: 0;
}
</style>

<script type="text/babel">
export default {
  props: {
    title: String
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

