<template>
    <div class="tabbar">
      <div class="ws-tabbar">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name:'ws-tabbar',
}
</script>


<style scoped>
.ws-tabbar{
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    position: fixed;
    background-color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    height: 3.125rem;
    color: #aaa;
    border-top:1px solid #cecece;
    -webkit-overflow-scroll:touch;
}
</style>
