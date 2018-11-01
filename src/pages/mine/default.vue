<template>
<div>
  <router-view ></router-view>
</div>
</template>

<script>
import WsTabbar from './../../components/tab/tabbar.vue'
import WsTabItem from './../../components/tab/tabitem.vue'
export default {
  name:"mine-container",
  components:{
      WsTabbar,
      WsTabItem
  }
}
</script>
