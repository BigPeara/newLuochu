<template>
  <div class="ws-button">
      <button class="btn-cell" @click="handleClick" >{{text}}</button>
  </div>
</template>

<script>
export default {
  name: "ws-button-cell",
  data(){
    return{
      size:''
    }
  }, 
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  },
  props: {
    text:String,
  }
};
</script>


<style scoped>
.ws-button .btn-cell{
  background: #fff;
  color: #1DB7AC;
  width: 100%;
  border:none;
  height: 3.4375rem;
}
</style>