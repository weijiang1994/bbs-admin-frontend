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
          type="success"
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
          this.axios.post("/auth/login", {
            username: this.loginForm.username,
            password: this.loginForm.password,
          })
          .then((response)=>{
            if (!response.data.success) {
              this.$message({
                message: response.data.msg,
                type: 'error'
              })
            }
            else{
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
            }
          })
          .catch(function(error){
            console.log(error);
          })
        }
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
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
</style>