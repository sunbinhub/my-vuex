<template>
  <div class="userlist">
    <el-header style="text-align: right; font-size: 12px">
      <!-- <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <span>{{ realName }}</span>
    </el-header>

    <el-main>
      <!-- 账号列表 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户账号列表</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text"
            >添加</el-button
          > -->
        </div>
        <div class="text item">
          <!-- 表格 -->
          <el-table :data="tableData" stripe style="width: 100%"
            ><el-table-column
              prop="id"
              label="序号"
              align="center"
              sortable
              width="100"
            >
            </el-table-column>
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
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :pager-count="paginations.pager_count"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
// 引入辅助函数
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      paginations: {
        page_index: 1, //当前页
        total: 15, //总数
        page_size: 1, //一页显示多少条数据
        page_sizes: [1, 10, 15, 20], //下拉框：每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", //组件布局，子组件名用逗号分隔
        pager_count: 7, //页码按钮的数量，当总页数超过该值时会折叠
      },
      allTableData: [],
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
      // this.tableData = this.userList;
      this.allTableData = this.userList;
      this.setPaginations();
    });
  },
  methods: {
    // ...mapActions(["GET_USERLIST"]),
    ...mapActions({
      getUserList: "GET_USERLIST1",
    }),

    // 分页事件
    // getInfoList() {
    //   this.$axios
    //     .get("/mock/5bee2bf96b3691268016a10f/getInfoList")
    //     .then((res) => {
    //       if (res.data.status === 1) {
    //         const data = res.data.data;
    //         // this.tableData = data;
    //         this.allTableData = data;
    //         // console.log(this.tableData)
    //         this.setPaginations();
    //       }
    //     });
    // },
    setPaginations() {
      //设置分页 显示数据
      console.log("设置分页显示数据");
      this.paginations.total = this.allTableData.length; //数据的数量
      this.paginations.page_index = 1; //默认显示第一页
      this.paginations.page_size = 1; //每页显示多少数据

      //显示数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      console.log("pageSize改变时触发");
      //pageSize改变时触发
      this.paginations.page_index = 1; //第一页
      this.paginations.page_size = page_size; //每页先显示多少数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // 5
      console.log("当前页：", page, "currentPage改变时会触发");
      //currentPage 改变时会触发
      //获取前一页的总条数
      let index = this.paginations.page_size * (page - 1); // 20
      //获取总条数
      let allData = this.paginations.page_size * page; // 25

      let tablist = []; // 显示的当前页数据：20条-25条
      for (let i = index; i < allData; i++) {
        if (this.allTableData[i]) {
          //如果最后只要23条数据，只显示到23条
          tablist.push(this.allTableData[i]);
        }
        this.tableData = tablist;
      }
    },
  },
  computed: {
    ...mapState({
      userList: (state) => state.userList,
      realName: (state) => state.userInfo.realName,
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

.userlist {
  width: 100%;
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
/* 分页样式 */
.page {
  float: left;
  margin: 10px 0;
}
</style>