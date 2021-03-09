<template>
  <div class="userAdd">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="username">
        {{ userName }}
      </span>
    </el-header>

    <el-main>
      <!-- 账号列表 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>vip账号列表</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >添加</el-button
          >
        </div>
        <div class="text item">
          <!-- 表格 -->
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="userName" label="账号" width="180">
            </el-table-column>
            <el-table-column prop="realName" label="实名" width="180">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="80">
            </el-table-column>
            <el-table-column prop="idType" label="身份证件"> </el-table-column>
            <!-- 操作 -->
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.row.id)"
                  type="text"
                  size="small"
                  >修改</el-button
                >
                <el-button
                  @click="handleDel(scope.row.id)"
                  type="text"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    // this.$store.dispatch("GET_USERLIST").then(() => {
    //   // console.log("获取数据：", this.$store.state.userList);
    //   // 把全局的userList赋值 给tableData
    //   //   this.tableData = this.$store.state.userList;
    //   this.tableData = this.userList;
    // });
    this.getUserList().then(() => {
      // console.log("获取数据：", this.userList);
      // this.newUserList = this.userList.map((v) => {
      //   if (v.age > 10) {
      //     return v;
      //   }
      // });
      // this.newUserList = this.userList.filter((v) => v.age > 10);
      // console.log("获取数据：", this.newUserList);

      // this.tableData = this.newUserList;

      // 获取全局的getters
      // this.tableData = this.$store.getters.vipUsers;
      // 使用辅助函数 获取全局的getters
      console.log("获取数据：", this.vipUsers);
      this.tableData = this.vipUsers;
    });
  },
  methods: {
    // ...mapActions(["GET_USERLIST"]),
    ...mapActions({
      getUserList: "GET_USERLIST1",
    }),
  },
  computed: {
    //用户名
    // userName() {
    //   return this.$store.state.userInfo.userName;
    // },
    // 辅助函数 获取数据
    ...mapState({
      // userInfo: (state) => state.userInfo,
      userList: (state) => state.userList,
      userName: (state) => state.userInfo.userName,
    }),
    // 获取用户信息
    // userInfo() {
    //   return this.$store.state.userInfo;
    // },
    ...mapGetters({
      vipUsers: "vipUsers",
    }),
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.userAdd {
  width: 100%;
}
.username {
  font-size: 20px;
  color: #409eff;
}
</style>