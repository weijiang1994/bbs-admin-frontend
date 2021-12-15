<template>
  <div class="search">
    <el-form :inline="true" :model="data" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input
          size="small"
          v-model="data.keyword"
          placeholder="输入查询关键字"
        ></el-input>
      </el-form-item>
      <el-form-item label="查询类别">
        <el-select v-model="data.category" placeholder="查询类别" size="small" style="max-width:180px">
          <el-option label="用户名" value="username">
            <span style="float: left">用户名</span>
            <span style="float: right; color: #8492a6; font-size: 13px"
              >username</span
            >
          </el-option>
          <el-option label="昵称" value="nickname">
            <span style="float: left">昵称</span>
            <span style="float: right; color: #8492a6; font-size: 13px"
              >nickname</span
            >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" size="small">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        keyword: "",
        category: "username",
      },
    };
  },
  methods: {
    search() {
      if (this.data.keyword === "") {
        this.$message({
          message: "请先输入查询参数",
          type: "info",
        });
      }
    },
  },
};
</script>

<style>
.search {
  display: flex;
  justify-content: flex-end;
}
</style>