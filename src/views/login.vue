<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      :rules="validateRule"
      status-icon
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 50%"
          @click="handleSubmit"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/auth";
import { setToken } from "@/util/token";

export default {
  data() {
    return {
      logining: false,
      loginForm: {
        username: "",
        password: "",
      },
      validateRule: {
        username: [
          {
            required: true,
            message: "请输入登录用户",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
        ],
      },
      checked: false,
    };
  },
  methods: {
    // 提交登录请求
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.logining = true;
          login({
            username: this.loginForm.username,
            password: this.loginForm.password,
          })
            .then((res) => {
              if (res.code === 200) {
                this.showMessage(res.msg || "登录成功", "success");
                setToken("Access-Token", 'Bearer ' + res.access_token);
                this.$router.push("/");
                this.logining = false;
              }
            })
            .catch(error =>{
              this.logining = false;
              console.log(error);
            })
        }
      });
    },
    // 显示登录提示信息
    showMessage(message, type) {
      this.$message({
        message,
        type,
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}

h3{
  margin-bottom: 5px;
}
</style>