<template>
  <div>
    <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm">
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
          <el-option
            v-for="(cate, index) in category"
            :key="index"
            :label="cate.label"
            :value="cate.value"
          >
            <span style="float: left">{{ cate.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              cate.value
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-tooltip effect="dark" :content="searchTip" placement="bottom">
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
  name: "Search",
  data() {
    return {
      rules: {
        keyword: [
          { required: true, message: "请输入搜索关键字", trigger: "change" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      searchForm: {
        keyword: "",
        category: "title",
      },
      category: [],
      searchTip: "搜索帖子",
    };
  },
  methods: {
    reset(formName) {
      this.$refs[formName].resetFields();
      this.$emit("reset");
    },
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
  },
  created() {
    this.category = this.$route.meta.searchData;
    this.searchForm.category = this.category[0].value;
    this.searchTip = this.$route.meta.searchTip;
    if (this.$route.meta.rules) {
      this.rules.keyword = this.$route.meta.rules;
    }
  },
};
</script>