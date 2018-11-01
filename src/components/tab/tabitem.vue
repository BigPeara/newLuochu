<template>
  <div class="ws-tab-item" :class="selected?'is-selected':''">
      <router-link :to='link'>
      <div class="ws-tab-item-icon" >
          <i :class="'icon icon-'+icon+(selected?'-fill':'')"></i>
      </div>
      <div class="ws-tab-item-label">{{label}}</div>
      </router-link>
  </div>
</template>

<script>
import Router from "vue-router";
export default {
  name: "ws-tab-item",
  props: {
    icon: String,
    label: String,
    selected: Boolean,
    link:String
  }
};
</script>


<style scoped>
.ws-tab-item {
  flex: 1;
}
.ws-tab-item.is-selected {
  color: #1db7ac;
}
.ws-tab-item-icon {
  min-height: 1.34rem;
  font-size: 1.3125rem;
  margin-top: 0.2rem;
}
.ws-tab-item-label {
  font-size: 0.75rem;
  line-height: 1;
}
</style>