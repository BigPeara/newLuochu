<template>
    <router-link :to="'/book/'+id" class="fast-adv">
      <p class="btn-hot">热门</p>
      <div class="adv-list">{{title}}</div>
    </router-link>
</template>

<script>

export default {
  name: 'fast-adv',
  data() {
    return {

    }
  },
  props:{
    title:String,
    id:String
  }
}
</script>

<style scoped>
  .fast-adv{display: flex;padding:1.25rem 0 0.9375rem;margin: 0 0.9375rem;border-bottom: 1px solid #f1f1f1;}
  .fast-adv .btn-hot{background-color: #F25449;width: 2.5rem;margin-right: 0.625rem;border-radius: 4px;-webkit-border-radius: 4px;color: #fff;font-size: 0.75rem;text-align: center;}
  .fast-adv .adv-list{font-size: 0.8125rem;color: #333;}
</style>
