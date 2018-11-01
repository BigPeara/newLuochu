<template>
  <div :class="'ws-cell-module '+(hasBorder?'ws-cell-module-border':'')">
      <slot></slot>
  </div>
</template>

<script>
import UrlConfig from '@/utils/urlConfig';
export default {
  name: "ws-cell-module",
  props: {
    hasBorder: String
  }
};
</script>


<style scoped>
.ws-cell-module .ws-cell:first{
    border-top: 1px solid #E4E4E4;
}
.ws-cell-module .ws-cell{
    border-bottom: 1px solid #E4E4E4;
}
.ws-cell-module-border{
    border-top: 1px solid #E4E4E4;
}
</style>