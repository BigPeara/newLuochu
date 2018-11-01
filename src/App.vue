<template>
  <div id="app">
    <transition name="slide-left" mode="out-in">
      <router-view class="child-view"></router-view>
    </transition>
    <!-- <ws-tabbar v-show="!this.isReading">
      <ws-tab-item label="精选" icon='wellchosen' link="/wellchosen" :selected="currentRoutePath=='/wellchosen'" ></ws-tab-item>
      <ws-tab-item label="书城" icon='bookstorage' link="/bookstorage" :selected="currentRoutePath=='/'||currentRoutePath.indexOf('/bookstorage')==0||currentRoutePath.indexOf('/book/')==0"></ws-tab-item>
      <ws-tab-item label="书架" icon='bookcase' link="/bookcase/0" :selected="currentRoutePath.indexOf('/bookcase')==0" ></ws-tab-item>
      <ws-tab-item label="我的" icon='user' link="/mine" :selected="currentRoutePath.indexOf('/mine')==0||currentRoutePath.indexOf('/login')==0"></ws-tab-item>
   </ws-tabbar> -->
   <circle-menu v-if="showMenu()"></circle-menu>
  </div>
</template>

<script>
import WsTabbar from "@/components/tab/tabbar.vue";
import WsTabItem from "@/components/tab/tabitem.vue";
import CookieConfig from "@/utils/cookieConfig";
import Authentication from "@/utils/authentication";
import PersonalCenterService from "@/domain/personalcenterService";
import SystemService from '@/domain/systemService'
import BrowserUtil from '@/utils/browserUtil';
import circleMenu from './pages/menu/index';

export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-right",
      // currentRoutePath: "/wellchosen",
       currentRoutePath: "/bookstorage",
      isReading: false
    };
  },
  created() {
    this.currentRoutePath = this.$route.path;
    this.isReading = this.$route.meta.isReading;
    this.autoLogin();
  },
  watch: {
    $route(to, from) {
      // this.currentRoutePath = to.path;
      this.isReading = to.meta.isReading;
    }
  },
  methods:{
    showMenu(){
      if(this.$route.path === '/'){
        return false;
      }else if(this.$route.name == 'readpage'){
        return false;
      }
      return true
    },
    autoLogin() {
      //SystemService.iosChecked();
      //静默登录
      if (!Authentication.getLoginState()) {
        SystemService.init().then(data=>{
          window.app_id=data.app_id;
          window.document.title = data.nickNameTitle;
          if(data.cp==="magapp"){
            if(BrowserUtil.isWechat())
            {
              //微信浏览器静默登录
              window.location = "http://oauth.luochu.com/OAuth/go.aspx?oType=4&sdk=1";
              return;
            }
            mag.toLogin(function(res){
              var appid=window.location.search.split('&')[0].split('=')[1];
              PersonalCenterService.guestLogin(this,res.token,appid);
            });
          }
          else{
            PersonalCenterService.guestLogin(this);
          }
        })
      }
    }
  },
  components: {
    WsTabbar,
    WsTabItem,
    circleMenu
  }
};
</script>

<style>
body {
  background: #ececec;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ececec;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 1;
}
.child-view {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  min-height: 100%;
}
.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translate(0, 0);
  opacity: 1;
  transform: translate(0, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  -webkit-transform: translate(-100vw, 0);
  transform: translate(-100vw, 0);
}
img[lazy=loading] {
  background-image: url('https://res.luochu.com/m/images/sdk/empty.png');
  background-repeat: no-repeat;
  background-position: 0%;
  background-size: cover;
}
</style>
