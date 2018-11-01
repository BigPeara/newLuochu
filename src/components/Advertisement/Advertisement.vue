<template>
  <div class="ws-Advertisement">
    <router-link to='/bookstorage/classify/122/0'>
        <img :src="baseurl+link"/>
    </router-link>
  </div>
</template>
<script>
import UrlConfig from '@/utils/urlConfig'

export default {
  name:"ws-Advertisement",
  data(){
    return{
      baseurl: UrlConfig.SWIPE_BASE_URL,
    }
 },
 props:{
     link:String,
     id:String
 }
}
</script>
<style scoped>

</style>

