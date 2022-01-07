<template>
  <el-aside :width="menuWidth">
    <el-row class="tac">
      <el-col>
        <el-menu
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/index" @click="goPage('home')">
            <i class="fa fa-home fa-fw mr"></i>
            <span slot="title">后台中心</span>
          </el-menu-item>

          <el-menu-item index="/user" @click="goPage('user')">
            <i class="fa fa-user fa-fw mr"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>

          <el-submenu index="3">
            <template slot="title">
              <i class="fa fa-paper-plane fa-fw mr"></i>
              <span>帖子管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="/post/review"
                @click="goSecondPage('/post', '/review')"
                ><i class="fa fa-check fa-fw mr"></i>帖子审核</el-menu-item
              >
              <el-menu-item index="/post/edit" @click="goSecondPage('/post', '/edit')"
                ><i class="fa fa-edit fa-fw mr"></i>帖子编辑</el-menu-item
              >
              <el-menu-item
                index="/post/category"
                @click="goSecondPage('/post', '/category')"
                ><i class="fa fa-tag fa-fw mr"></i>帖子类别</el-menu-item
              >
              <el-menu-item index="/post/topic" @click="goSecondPage('/post', '/topic')"
                ><i class="fa fa-bookmark fa-fw mr"></i>帖子主题</el-menu-item
              >

              <el-menu-item index="/post/topic" @click="goSecondPage('/post', '/tag')"
                ><i class="fa fa-hashtag fa-fw mr"></i>帖子标签</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="fa fa-comments fa-fw mr"></i>
              <span>评论管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/comment/manage" @click="goSecondPage('/comment', '/manage')"
                ><i class="fa fa-pencil fa-fw mr"></i>评论编辑</el-menu-item
              >
              <el-menu-item index="/comment/analysis" @click="goSecondPage('/comment', '/analysis')"
                ><i class="fa fa-paw fa-fw mr"></i>评论分析</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="fa fa-building fa-fw mr"></i>
              <span>社区管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/report/unread" @click="goSecondPage('/report', '/unread')"
                ><i class="fa fa-bullhorn fa-fw mr"></i>举报管理</el-menu-item
              >
              <el-menu-item index="/visit/statistics" @click="goSecondPage('/visit', '/statistics')"
                ><i class="fa fa-pie-chart fa-fw mr"></i>访问统计</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  props: {
    isCollapse: { type: Boolean, default: false },
    menuWidth: { type: String, default: "220px" },
  },
  data() {
    return {};
  },
  beforeCreate() {},
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},

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

<style scoped>
.el-row {
  height: 100%;
}

.el-menu {
  border-right: none;
}

.el-aside {
  border-right: 1px solid #f5f1f1;
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}

.mr {
  margin-right: 4px;
  font-size: 18px;
}
</style>