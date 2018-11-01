<template>
  <div>
  </div>
</template>

<script>

import Authentication from '@/utils/authentication'
import {Indicator} from "mint-ui"
export default {
  name:"page-pay",
  created(){
      Indicator.open();
      setTimeout(()=>{
          var payLocation = "http://zhifu.luochu.com/pay/app/defaultSdk.aspx";
          var userData = Authentication.getUserData();
          payLocation+=("?uid="+userData.id);
          payLocation+=("&username="+userData.nickName);
          payLocation+=("&client_ver=IOS_1_0_2");
          payLocation+=("&device_id=85bd4771ce1f67f8ec5ea433f87d39a6");
          payLocation+=("&channel_id=12225&pn_id=12225&app_scheme=luochu");
          payLocation+=("&token="+Authentication.getToken());
          window.location.href = payLocation;
      },100);
  }
}
</script>
