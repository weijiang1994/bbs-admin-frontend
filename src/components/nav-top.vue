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
</style>

<template>
  <el-container>
    <el-aside width="auto" class="header-logo tap">
      <img class="logo" src="@/assets/imgs/logo.png" alt="Logo" />
    </el-aside>
    <el-aside width="auto" class="header-logo tap">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar icon="el-icon-user-solid" class="headerLogo"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><i class="fa fa-user fa-fw"></i>个人信息</el-dropdown-item>
          <el-dropdown-item><i class="fa fa-sign-out fa-fw"></i>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      
    </el-aside>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>