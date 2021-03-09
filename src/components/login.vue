<template>
  <div class="login">
    <!-- 登录表单 -->
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm"
    >
      <h1 class="title">
        <i class="el-icon-setting"></i>
        myvuex登录
      </h1>

      <el-form-item label="账号" prop="userName">
        <el-input
          type="text"
          v-model="loginForm.userName"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="passWord">
        <el-input
          type="password"
          v-model="loginForm.passWord"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      //登录表单的数据
      loginForm: {
        userName: "",
        passWord: "",
      },
      //验证规则
      rules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "blur",
          },
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          //保留this
          let _this = this;

          //收集用户名和密码 发送给后端
          // console.log(this.loginForm.userName, this.loginForm.passWord);
          //  console.log(this.axios);
          this.axios
            .post("api/checklogin", {
              userName: _this.loginForm.userName,
              passWord: _this.loginForm.passWord,
            })
            .then((response) => {
              if (response.data.length) {
                console.log("接受后端响应登录请求的数据:", response.data[0]);

                // 把当前用户登录数据存入state
                _this.$store.commit("SAVE_USERINFO", response.data[0]);

                // alert("登录成功！");
                _this.$message({
                  message: "恭喜你，登录成功！",
                  type: "success",
                });

                // 跳转到后台首页
                console.log("路由:", _this.$router);
                _this.$router.push("/");
              } else {
                // alert("登陆失败！");
                _this.$message.error(" 请检查用户名和密码！");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html,
body {
  margin: 0;
  padding: 0;
}
html,
body,
#app,
.login {
  height: 100%;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 400px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0 45px 10px 10px;
}
.title {
  font-size: 22px;
  color: #333;
  font-weight: bold;
  padding: 20px 0 20px 60px;
}
</style>
