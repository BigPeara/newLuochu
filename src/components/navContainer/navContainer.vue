<template>
  <div class="nav-container">
      <div class="nav-list">
        <router-link class="nav-item" to='/wellChosenFemale'>
          <p class="nav-item-icon"><img src="@/assets/img/gril.png"/></p>
          <p class="nav-name">女生</p>
        </router-link>
        <router-link to='/wellChosenMale' class="nav-item">
          <p class="nav-item-icon"><img src="@/assets/img/boy.png"/></p>
          <p class="nav-name">男生</p>
        </router-link>
        <router-link to='/bookstorage/search' class="nav-item">
          <p class="nav-item-icon"><img src="@/assets/img/icon_jx_search.png"/></p>
          <p class="nav-name">找书</p>
        </router-link>
        <router-link to='/bookstorage/classify/c/0' class="nav-item">
          <p class="nav-item-icon"><img src="@/assets/img/icon_xf_sk.png"/></p>
          <p class="nav-name">书库</p>
        </router-link>
        <router-link to='rank' class="nav-item">
          <p class="nav-item-icon"><img src="@/assets/img/icon_jx_ph.png"/></p>
          <p class="nav-name">排行</p>
        </router-link>
        <router-link to='exemption' class="nav-item">
          <p class="nav-item-icon"><img src="@/assets/img/icon_jx_xm.png"/></p>
          <p class="nav-name">限免</p>
        </router-link>
        <router-link to='god' class="nav-item">
          <p class="nav-item-icon"><img src="@/assets/img/icon_jx_ds.png"/></p>
          <p class="nav-name">大神</p>
        </router-link>
        <router-link to='all' class="nav-item">
          <p class="nav-item-icon"><img src="@/assets/img/icon_jx_qb.png"/></p>
          <p class="nav-name">全本</p>
        </router-link>
        <router-link to='/bookcase/0' class="nav-item">
          <p class="nav-item-icon"><img src="@/assets/img/icon_xf_sj.png"/></p>
          <p class="nav-name">书架</p>
        </router-link>
        <router-link to='/mine' class="nav-item">
          <p class="nav-item-icon"><img src="@/assets/img/icon_jx_wd.png"/></p>
          <p class="nav-name">我的</p>
        </router-link>
      </div>
  </div>
</template>

<script>

export default {
  name:"nav-container",
  data(){
    return{

    }
  },
  methods:{
  }
}
</script>
<style scoped>
  .active{background-image: -webkit-linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
        background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));}
  /* .nav-container{background-color: #fff;} */
  .nav-container .nav-list{display: flex;flex-wrap: wrap;}
  .nav-container .nav-item{width: 20%;display: flex;flex-direction: column;align-items: center;padding-top: 1.25rem;}
  .nav-container .nav-item .nav-item-icon{width: 2rem;}
  .nav-container .nav-item .nav-name{font-size: 0.8125rem;color: #333;line-height: 1.6rem;}
</style>

