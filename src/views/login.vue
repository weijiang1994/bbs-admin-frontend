<template>
  <div class="login-container">
    <div class="login-content">
      <h3 class="login-title">系统登录</h3>
      <el-card shadow="never">
        <div>
          <el-form
            :model="loginForm"
            :rules="validateRule"
            status-icon
            ref="loginForm"
            label-position="left"
            label-width="0px"
            class="demo-ruleForm login-page"
          >
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
            <el-checkbox v-model="checked" class="rememberme"
              >记住密码</el-checkbox
            >
            <el-form-item style="width: 100%">
              <div style="text-align: center">
                <el-button
                  type="primary"
                  style="width: 50%"
                  @click="handleSubmit"
                  :loading="logining"
                  size="medium"
                  >登录</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
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
                setToken("Access-Token", "Bearer " + res.access_token);
                this.$router.push("/");
                this.logining = false;
              }
            })
            .catch((error) => {
              this.logining = false;
              console.log(error);
            });
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
.login-title {
  background: rgb(86 132 135);
  text-align: center;
  color: white;
  padding: 8px 0px;
  margin-bottom: 0;
}
.login-container {
  background-image: url(../assets/login-bg.jpg);
  background-size: 100% 100%;
  background-position: center center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}

h3 {
  margin-bottom: 5px;
}
.login-container /deep/ .el-card {
  border-radius: 0;
}
.login-container /deep/ .el-card__body {
  padding-bottom: 3px;
}
.login-content{
  margin: 0 40%;
}

@media screen and (max-width: 768px) {
  .login-content{
    margin: 0 25%;
  }
}
</style>