<template>
  <el-container>
    <el-aside width="auto" class="header-logo tap">
      <img class="logo" src="@/assets/imgs/logo.png" alt="Logo" />
    </el-aside>
    <el-aside width="auto" class="header-logo tap">
      <div class="mr-2">
        <el-tooltip effect="dark" content="论坛前台页面" placement="bottom">
          <el-button size="mini" circle @click="goFrontend"
            ><i class="fa fa-home"></i
          ></el-button>
        </el-tooltip>
      </div>
      <div class="mr-2">
        <el-tooltip effect="dark" content="后台主页面" placement="bottom">
          <el-button @click="goDashborad" size="mini" circle
            ><i class="fa fa-tachometer"></i
          ></el-button>
        </el-tooltip>
      </div>

      <div class="mr-2">
        <el-tooltip effect="dark" content="处理用户举报" placement="bottom">
          <el-button size="mini" circle><i class="fa fa-coffee"></i></el-button>
        </el-tooltip>
      </div>

      <div class="mr-2">
        <el-tooltip effect="dark" content="查看消息" placement="top">
          <el-badge is-dot class="item">
            <el-button size="mini" circle
              ><i class="fa fa-bell-o"></i
            ></el-button>
          </el-badge>
        </el-tooltip>
      </div>

      <div class="mr-2">
        <el-tooltip effect="dark" content="全屏显示" placement="top">
          <el-button size="mini" circle @click="fullScreen"
            ><i class="fa fa-arrows-alt"></i
          ></el-button>
        </el-tooltip>
      </div>

      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :src="avatar"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo"
            ><i class="fa fa-user fa-fw"></i>个人信息</el-dropdown-item
          >
          <el-dropdown-item command="logout"
            ><i class="fa fa-sign-out fa-fw"></i>退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-aside>
  </el-container>
</template>

<script>
import { removeToken } from "@/util/token";
import { getUserInfo } from "@/api/auth";

export default {
  data() {
    return {
      activeIndex: "1",
      avatar: "",
      userId: undefined,
      fullscreen: false,
    };
  },
  methods: {
    fullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    goDashborad() {
      this.$router.push("/index");
    },
    goFrontend() {
      window.open(process.env.VUE_APP_FRONTEND_HOME);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      switch (command) {
        case "logout":
          removeToken("Access-Token");
          location.reload();
          break;

        default:
          break;
      }
    },
  },
  created() {
    getUserInfo({}).then((res) => {
      this.avatar = res.avatar;
      this.userId = res.id;
    });
  },
};
</script>

<style scoped>
.el-aside {
  display: flex;
  justify-content: center;
  align-items: center;
}

section {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 0 0;
}

.logo {
  width: 200px;
}

.headerLogo,
.logo {
  cursor: pointer;
}

.mr-2 {
  margin-right: 20px;
}
</style>