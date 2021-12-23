<template>
  <div id="category">
    <div style="display: flex">
      <div class="mt-2">
        <el-button type="primary" size="small">新增类别</el-button>
      </div>
      <div class="search-div">
        <search @reset="reset" @search="search"></search>
      </div>
    </div>
    <el-table :data="cateList" style="width: 100%" height="680">
      <el-table-column prop="name" label="类别名"> </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="topic"
        label="所属主题"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.topic_id === null" type="warning">{{
            scope.row.topic
          }}</el-tag>
          <el-tag v-else type="success">{{ scope.row.topic }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="desc" label="类别描述">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="c_time"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="cate_img"
        label="类别图片"
      >
      </el-table-column>
    </el-table>
    <pagination
      :disable="paginationData.disable"
      :total="total"
      @page-change="changeCurrentPage"
      @size-change="changePageSize"
    ></pagination>
  </div>
</template>

<script>
import Pagination from "../../components/pagination.vue";
import Search from "../../components/search.vue";
import { postCategoryList, searchCategory } from "@/api/post";
export default {
  data() {
    return {
      total: 0,
      cateList: [],
      paginationData: {
        page: 1,
        limit: 20,
        disable: false,
      },
    };
  },
  components: { Pagination, Search },
  methods: {
    getPostCategoryList() {
      let params = {
        page: this.paginationData.page,
        size: this.paginationData.limit,
      };
      postCategoryList(params).then((res) => {
        this.cateList = res.data;
      });
    },
    changeCurrentPage(page) {
      this.paginationData.page = page;
    },
    changePageSize(size) {
      this.paginationData.limit = size;
    },
    reset() {
      this.getPostCategoryList();
      this.paginationData.disable = false;
    },
    search(datas) {
      let params = { name: datas[0] };
      searchCategory(params).then((res) => {
        this.cateList = res.data;
        this.paginationData.disable = true;
      });
    },
  },
  created() {
    this.getPostCategoryList();
  },
};
</script>
