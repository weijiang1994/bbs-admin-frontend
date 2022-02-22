<template>
  <div class="login-container">
    <div class="login-content">
        <div>
          <div style="text-align: center;line-height: 35px">
            <img src="../assets/login-icon.jpg" class="login-icon" alt="">
            <h2 style="color: white;margin: 15px 0px; border-bottom: 1px solid #f6f6f6;padding-bottom: 3px">用户登录</h2>

          </div>
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
            <div style="display: flex;" class="remember">
              <input type="checkbox" id="simple-3">
              <label for="simple-3" class="red"></label>
              <p>记住密码</p>
            </div>
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

<style lang="less" scoped>
.login-title {
  background: rgb(86 132 135);
  text-align: center;
  color: white;
  padding: 8px 0px;
  margin-bottom: 0;
}
.login-container {
  /*background-image: url(../assets/login-bg.png);*/
  /*background-image: url(../assets/login.jpg);*/
  /*background-image: url(../assets/bg.png);*/
  background: #3ca992;
  /*background-size: 100% 100%;*/
  /*background-position: center center;*/
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
  .login-container /deep/ .el-form-item.is-error .el-input__inner{
    border-color: #3ca992;
  }

  .login-container /deep/ .el-form-item__error{
    color: #9d0000;
  }
  .login-container /deep/ .el-checkbox{
    color: white;
  }
input[type="checkbox"]{
  display: none;
&+label{
   display: inline-block;
   width: 40px;
   height: 20px;
   position: relative;
   transition: 0.3s;
   margin: 0px 0px;
   box-sizing: border-box;
&:after,&:before{
           content: '';
           display: block;
           position: absolute;
           left: 0px;
           top: 0px;
           width: 20px;
           height: 20px;
           transition: 0.3s;
           cursor: pointer;
         }
}
}

#simple-1,#simple-2,#simple-3{
&:checked+label{
&.red{background: #ECA9A7;&:after{background: #D9534F;}}
&.green{background: #AEDCAE;&:after{background: #5CB85C;}}
&:after{
   left: calc(~'100% - 20px');
 }
}
&+label{
   background: #ddd;
   border-radius: 20px;
   box-shadow: 1px 1px 3px #aaa;
&:after{
   background: #fff;
   border-radius: 50%;
   box-shadow: 1px 1px 3px #aaa;
 }
}
}
  .remember{
    display: flex;
    justify-items: center;
  }
  .remember >p {
    margin-left: 10px;
    font-size: 14px;
    color: white;
  }
  .login-icon{
    background-image: url("../assets/login-icon.jpg");
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .login-container /deep/ .el-button--primary{
    background-color: #348c76;
    border-color: #348c76;
  }
.login-container /deep/ .el-button--primary :hover{
  background-color: #73c6b0;
}
</style>