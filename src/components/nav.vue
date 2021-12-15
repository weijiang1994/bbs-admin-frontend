<style scoped>
.el-row {
  height: 100%;
}

.el-menu {
  border-right: none;
}
.el-aside {
  border-right: 1px solid #f5f1f1;
}
.mr {
  margin-right: 4px;
  font-size: 18px;
}
</style>

<template>
  <el-aside width="200px">
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" @click="goPage('home')">
            <i class="fa fa-home fa-fw mr"></i>
            <span slot="title">后台中心</span>
          </el-menu-item>

          <el-menu-item index="2" @click="goPage('user')">
            <i class="fa fa-user fa-fw mr"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>

          <el-submenu index="3">
            <template slot="title">
              <i class="fa fa-folder fa-fw mr"></i>
              <span>帖子管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="3-1"
                @click="goSecondPage('/post', '/review')"
                ><i class="fa fa-check fa-fw mr"></i>帖子审核</el-menu-item
              >
              <el-menu-item index="3-2" @click="goSecondPage('/post', '/edit')"
                ><i class="fa fa-edit fa-fw mr"></i>帖子编辑</el-menu-item
              >
              <el-menu-item
                index="3-3"
                @click="goSecondPage('/post', '/category')"
                ><i class="fa fa-bookmark fa-fw mr"></i>帖子类别</el-menu-item
              >
              <el-menu-item index="3-4" @click="goSecondPage('/post', '/topic')"
                ><i class="fa fa-cube fa-fw mr"></i>帖子主题</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
var $this = {};
export default {
  data() {
    return {};
  },
  beforeCreate() {
    $this = this;
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },

    // 跳转到顶级路由页
    goPage(link) {
      if (link === "home") {
        this.$router.push("/index").catch((error) => error);
      } else if (link === "user") {
        this.$router.push("/user").catch((error) => error);
      }
    },

    // 跳转到二级路由页
    goSecondPage(parent, child) {
      this.$router.push(`${parent}${child}`).catch((error) => error);
    },
  },
};
</script>