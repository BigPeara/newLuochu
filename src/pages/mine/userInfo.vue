<template>
  <div class="page-wrapper">
      <simple-cell title="头像"><ws-avatar :avatar='userInfo.avatar' :size="'small'" /></simple-cell>
      <simple-cell title="用户ID">{{userInfo.id}}</simple-cell>
      <simple-cell title="昵称">{{userInfo.nickName}}</simple-cell>
      <simple-cell title="性别">{{userInfo.gender?'男':'女'}}</simple-cell>
      <simple-cell title="手机号码">{{userInfo.mob}}</simple-cell>
  </div>
</template>
<script>
import WsAvatar from '@/components/avatar/avatar'
import PersonalCenterService from '@/domain/personalcenterService'
import SimpleCell from '@/components/cell/simpleCell'
export default {
  data(){
    return{
      isLogined:false,
      userInfo:{}
    }
  },
  created(){
    //this.$data.isLogined = Authentication.getLoginState();
    PersonalCenterService.userInfo(this).then(data=>{
      this.userInfo = data;
    });
  },
  components:{
    SimpleCell,
    WsAvatar
  }
}
</script>
<style scoped>
.ws-cell {
  height: 3.4375rem;
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
}
.ws-cell.flex .icon {
  font-size: 1.25rem;
}
.ws-cell .ws-cell-title .icon {
  margin-right: 0.5rem;
}
.ws-cell.flex .icon,
.ws-cell.flex span {
  line-height: 1.25rem;
  display: block;
}
.ws-cell.flex .we-cell-label-text {
  color: #99a9c3;
  font-size: 0.8125rem;
}
.ws-cell-label .icon {
  color: #c6c6c6;
}
</style>
