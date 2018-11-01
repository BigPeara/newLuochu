<template>
<div class='footer'>
  <fieldset v-if='pager.loadFinished' class="footer-line">  
    <legend >我是有底线的</legend> 
  </fieldset>
  <p v-if="pager.isloading" class="loading">
    <mt-spinner class='spinner' type="fading-circle" :size="size"></mt-spinner>
    <span class='text'>加载中...</span>
  </p>
</div> 

</template>

<script>

export default {
  name: "ws-footer-line",
  data(){
    return {
      size:18
    }
  },
  props: {
    pager:Object
  }
};
</script>


<style scoped>
.footer{margin:1rem 0 0 0;}
.footer-line{border:none;border-top:1px solid #c5c5c5;color:#c5c5c5;position:relative;text-align:center;font-size:0.8rem;}
.footer-line legend{padding:0 0.8rem;background: #ececec;}
.footer .loading .spinner{display:inline-block;margin-right:0.5rem;line-height:24px;}
.footer .loading .text{display:inline-block;vertical-align:text-bottom;}
.footer .loading{color:#c5c5c5;font-size:.8rem;text-align:center;line-height:24px;}
</style>