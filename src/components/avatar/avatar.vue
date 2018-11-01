<template>
  <div class="ws-avatar" :class="[size]">
        <img :src="avatar||'http://client.h5.luochu.com/img/default_avatar.png'"/>
  </div>
</template>

<script>
export default {
  name: "ws-avatar",
  props: {
    title: String,
    avatar:String,
    size:{
      type:String,
      default:'normal',
      validator(value){
        return ['normal','small'].indexOf(value)>-1;
      }
    }
  }
};
</script>


<style scoped>
.ws-avatar{
    border-radius: 50%;
    -webkit-border-radius:50%;
    border: 4px solid rgba(255, 255, 255, .1)
}
.ws-avatar img{
    width: 2.9rem;
    border-radius: 50%;
    -webkit-border-radius:50%;
    border: 4px solid rgba(255, 255, 255, .3)
}
.ws-avatar.small img{
    width: 1.3125rem;
    border: none;
}
</style>