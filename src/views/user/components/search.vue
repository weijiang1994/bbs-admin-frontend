<template>
  <div class="search">
    <div class="operator">
      <el-button type="danger" size="small" :disabled="ban" @click="batchBan"
        >批量封禁</el-button
      >
    </div>
    <el-form
      :inline="true"
      :model="searchForm"
      :rules="rules"
      ref="searchForm"
      class="demo-form-inline"
    >
      <el-form-item label="关键字" prop="keyword">
        <el-input
          size="small"
          v-model="searchForm.keyword"
          placeholder="输入查询关键字"
        ></el-input>
      </el-form-item>
      <el-form-item label="查询类别">
        <el-select
          v-model="searchForm.category"
          placeholder="查询类别"
          size="small"
          style="max-width: 180px"
        >
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
        <el-tooltip effect="dark" content="搜索用户" placement="bottom">
          <el-button
            type="primary"
            @click="search('searchForm')"
            size="small"
            icon="el-icon-search"
          ></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="重置搜索" placement="bottom">
          <el-button
            type="success"
            @click="reset('searchForm')"
            size="small"
            icon="el-icon-refresh"
          ></el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    ban: { type: Boolean, default: true },
  },
  data() {
    return {
      searchForm: {
        keyword: "",
        category: "username",
      },
      rules: {
        keyword: [
          { required: true, message: "请输入搜索关键字", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    search(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("search", [
            this.searchForm.keyword,
            this.searchForm.category,
          ]);
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
      this.$emit("reset");
    },
    batchBan() {
      this.$emit("batch-ban-user");
    },
  },
};
</script>

<style>
.search {
  display: flex;
  justify-content: flex-end;
}
.operator {
  flex-grow: 1;
  padding-top: 3px;
}
</style>