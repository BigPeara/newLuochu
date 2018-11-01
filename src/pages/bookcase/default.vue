<template>
<div>
  <router-view class="router-view"></router-view>
</div>
</template>

<script>
import WsTabbar from './../../components/tab/tabbar.vue'
import WsTabItem from './../../components/tab/tabitem.vue'
export default {
  name:"bookcase-container",
  components:{
      WsTabbar,
      WsTabItem
  }
}
</script>
