<template>
<div class="ws-cell flex flex-justify flex-box">
      <div class="ws-cell-title flex">
          <span>{{title}}</span> 
      </div>
      <div class="ws-cell-label flex display-row1">
          <slot></slot>
      </div>
      </div>
  
</template>

<script>
import UrlConfig from "@/utils/urlConfig";
export default {
  name: "ws-cell",
  props: {
    title: String,
    label: String
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>


<style scoped>
.ws-cell {
  height: 3.4375rem;
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
}
.ws-cell.flex .icon {
  font-size: 1.25rem;
}
.ws-cell .ws-cell-title .icon {
  margin-right: 0.5rem;
}
.ws-cell.flex .icon,
.ws-cell.flex span {
  line-height: 1.25rem;
  display: block;
}
.ws-cell.flex .we-cell-label-text {
  color: #99a9c3;
  font-size: 0.8125rem;
}
.ws-cell-label .icon {
  color: #c6c6c6;
}
.ws-cell-label{
  color: #999;
  max-width: 50%;
}
</style>