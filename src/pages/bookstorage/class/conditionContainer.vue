<template>
<div class="flex condition-container flex-box">
    <p class="condition-title">{{title}}</p>
      <div class="flex flex-box flex-one condition-select">
        <p @click="reset" :class="{active:seletedValue===0}" class="condition-all">全部</p>
        <div class="flex flex-box flex-one export">
          <p v-for="item in conditions" :key="item.value" class="condition-item" :class="{active:seletedValue===item.value}" @click="handleClick(item.value)">{{item.text}}</p>
        </div>
      </div>
</div>
</template>

<script>

export default {
  name: "condition-container",
  data(){
    return {
      //seletedValue: 0
    }
  },
  props: {
    seletedValue: 0,
    title: String,
    conditions: Array
  },
  methods:{
      handleClick(val) {
        var target = event.target;
        if(target.parentElement.scroll)
          target.parentElement.scroll(target.offsetLeft-target.parentElement.offsetWidth/2,0);
        else if(target.parentElement.scrollLeft)
          target.parentElement.scrollLeft = target.offsetLeft-target.parentElement.offsetWidth/2.2;
        // target.parentElement.scroll(target.offsetLeft-target.parentElement.offsetWidth/2,0);不兼容scroll方法
        this.$emit('selectedChanged',val);
      },
      reset(){
          this.$emit('selectedChanged', 0);
      }
  }
};
</script>


<style scoped>
.condition-item {
  padding: 0.1rem 0.4rem;
  background-color: #fff;
}
.flex-one {
  flex: 1;
}
.condition-container{color: #7C7C8C;}
.condition-container{margin-right:-.9375rem;padding: .78125rem 0;border-bottom: 1px solid #E8E8E8;font-size: .875rem;}
.condition-all{padding: 0.1rem 0.4rem;
  background-color: #fff;}
.export{overflow-x: auto;-webkit-overflow-scrolling: touch;}
/* .export::-webkit-scrollbar {width: 0;display: none;} */
.active {
  background-color: rgba(29, 183, 172, 1);
  color: #fff;
  padding: 0.1rem 0.4rem;
  border-radius: 0.3rem;

}
</style>
