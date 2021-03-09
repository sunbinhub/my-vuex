<template>
  <div class="home">
    <!-- 首页头部 -->
    <el-header style="text-align: right; font-size: 12px">
      <!-- <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <!-- 从state里面获取用户名 -->
      <span class="username">
        <!-- {{ $store.state.userInfo.userName }} -->
        {{ realName }}
      </span>
    </el-header>

    <!-- 首页的主体 -->
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户信息卡</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          > -->
        </div>
        <div class="text item">用户账号：{{ userInfo.userName }}</div>
        <div class="text item">用户密码：{{ userInfo.passWord }}</div>
        <div class="text item">真实姓名：{{ userInfo.realName }}</div>
        <div class="text item">证件号码：{{ userInfo.idType }}</div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
// 引入mapstate 辅助函数
import { mapState } from "vuex";
export default {
  computed: {
    //用户名
    // userName() {
    //   return this.$store.state.userInfo.userName;
    // },
    // 辅助函数 获取数据
    ...mapState({
      userInfo: (state) => state.userInfo,
      realName: (state) => state.userInfo.realName,
    }),
    // 获取用户信息
    // userInfo() {
    //   return this.$store.state.userInfo;
    // },
  },
  // 组件内路由守卫
  // beforeRouteEnter: (to, from, next) => {
  //   console.log("路由独享守卫", localStorage.getItem("userInfo"));
  //   // to: Route: 即将要进入的目标 路由对象
  //   // from: Route: 当前导航正要离开的路由
  //   //如果next为空则路由正常进行跳转，如果next不为空，则进行跳转时，会中断

  //   // const nextRoute = ["home", "userList", "vipUsers", "passwordEdit"];
  //   let isLogin = localStorage.getItem("userInfo"); // 是否登录，一般从storage中读取
  //   // 未登录状态；当路由到nextRoute指定页时，跳转至login
  //   if (!isLogin) {
  //     console.log("用户没用登录！请登录");
  //     next({ name: "login" });
  //   }
  //   next();
  // },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.home {
  width: 100%;
}
.username {
  font-size: 20px;
  color: #409eff;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
