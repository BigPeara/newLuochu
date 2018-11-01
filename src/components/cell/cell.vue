<template>
<div class="ws-cell-wrapper">
    <router-link class="ws-cell flex flex-justify flex-box" v-if="linkType==='vue-router'" :to="link" >
      <div class="ws-cell-title flex">
          <i :class="'icon icon-'+ icon" :style="{color:iconColor}"></i>
          <span :style="{color:titleColor}">{{title}}</span> 
      </div>
      <div class="ws-cell-label flex">
          <span class="we-cell-label-text">{{label}}</span>
          <i class="icon icon-next"></i>
      </div>
    </router-link>

  <a class="ws-cell flex flex-justify flex-box" v-if="linkType==='href'" :href="link" >
      <div class="ws-cell-title flex">
          <i :class="'icon icon-'+ icon" :style="{color:iconColor}"></i>
          <span :style="{color:titleColor}">{{title}}</span> 
      </div>
      <div class="ws-cell-label flex">
          <span class="we-cell-label-text">{{label}}</span>
          <i class="icon icon-next"></i>
      </div>
  </a>

  <div class="ws-cell flex flex-justify flex-box" v-if="linkType==='function'" @click="handleClick" >
      <div class="ws-cell-title flex">
          <i :class="'icon icon-'+ icon" :style="{color:iconColor}"></i>
          <span :style="{color:titleColor}">{{title}}</span> 
      </div>
      <div class="ws-cell-label flex">
          <span class="we-cell-label-text">{{label}}</span>
          <i class="icon icon-next"></i>
      </div>
  </div>
</div>
  
</template>

<script>
import UrlConfig from "@/utils/urlConfig";
export default {
  name: "ws-cell",
  props: {
    title: String,
    titleColor: String,
    label: String,
    icon: String,
    iconColor: String,
    link:{
        type:String,
        default:'/mine/readRecords'
    },
    linkType: {
      type: String,
      default: "vue-router",
      validator(value) {
        return ["vue-router", "href", "function", 4].indexOf(value) > -1;
      }
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>


<style scoped>
.ws-cell-wrapper {
  height: 3.4375rem;
  background: #fff;
  padding: 0 1.1rem;
  border-bottom: 1px solid #e4e4e4;
}
.ws-cell {
  height: 3.4375rem;
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
</style>