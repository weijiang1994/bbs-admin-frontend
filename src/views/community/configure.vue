<template>
  <div>
    <el-form ref="configure" :model="configure" label-width="80px">
      <el-form-item label="帖子审核">
        <el-input v-model="configure.admin.audit"></el-input>
      </el-form-item>
      <el-form-item label="开放注册">
        <el-input v-model="configure.admin.audit"></el-input>
      </el-form-item>
      <el-form-item label="图片尺寸">
        <el-input v-model="configure.admin.audit"></el-input>
      </el-form-item>
      <el-form-item label="管理员邮箱">
        <el-input v-model="configure.admin.audit"></el-input>
      </el-form-item>
      <el-form-item label="后台链接">
        <el-input v-model="configure.admin.audit"></el-input>
      </el-form-item>
      <el-form-item label="类别图片路径">
        <el-input v-model="configure.admin.audit"></el-input>
      </el-form-item>
      <el-form-item label="第三方登录">
        <el-input v-model="configure.admin.audit"></el-input>
      </el-form-item>
      <el-form-item label="第三方登录客户端">
        <el-input v-model="configure.admin.audit"></el-input>
      </el-form-item>
      <el-form-item label="前台域名">
        <el-input v-model="configure.admin.audit"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getConfiguration } from "../../api/community";
export default {
  data() {
    return {
      configure: {},
    };
  },
  created() {
    this.getConfigure();
  },
  methods: {
    getConfigure() {
      // get server configure
      getConfiguration().then((res) => {
        this.configure = res.data;
      });
    },
    saveConfigure() {
      // save configure's modify
    },
  },
};
</script>