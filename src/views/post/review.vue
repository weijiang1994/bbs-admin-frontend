<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-button
        type="success"
        size="small"
        :disabled="!selected"
        @click="batchPass"
        >批量审核成功</el-button
      >
      <el-button
        type="danger"
        size="small"
        :disabled="!selected"
        @click="batchFail"
        >批量审核失败</el-button
      >
    </div>
    <el-table
      v-loading="loading"
      :data="postList"
      border
      style="width: 100%"
      height="680"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        fixed="left"
        prop="author"
        label="发帖用户"
        sortable
        width="120"
      ></el-table-column>
      <el-table-column prop="title" label="标题" sortable> </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="content"
        label="内容预览"
        width="500"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.content" type="textarea"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="category"
        label="类别"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="anonymous"
        label="匿名"
      >
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.anonymous === 1">是</el-tag>
          <el-tag type="primary" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="c_time"
        label="发帖时间"
        sortable
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="edit"
            size="mini"
            @click="onPostDetail(scope.row)"
            >审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      @page-change="changeCurrentPage"
      @size-change="changePageSize"
    ></pagination>
  </div>
</template>

<script>
import Pagination from "@/components/pagination";
import { reviewPostList, reviewBatchPass, reviewBatchFail } from "@/api/post";
import { showMessage, showNotice, showConfirm } from "@/util/notice";

export default {
  data() {
    return {
      selected: false,
      postList: [],
      loading: true,
      paginationData: {
        page: 1,
        limit: 20,
      },
      total: 0,
      selectRows: [],
    };
  },
  name: "review",
  components: { Pagination },
  created() {
    this.getPostList();
  },
  methods: {
    getPostList() {
      let params = {
        page: this.paginationData.page,
        size: this.paginationData.limit,
      };
      reviewPostList(params)
        .then((res) => {
          this.loading = false;
          this.postList = res.data;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    changeCurrentPage(page) {
      this.paginationData.page = page;
      this.getPostList();
    },
    changePageSize(size) {
      this.paginationData.limit = size;
      this.getPostList();
    },
    handleSelectionChange(rows) {
      this.selectRows = [];
      rows.forEach((item) => {
        this.selectRows.push(item.id);
      });

      if (this.selectRows.length) this.selected = true;
      else this.selected = false;
    },
    batchPass() {
      showConfirm(
        "确定批量审核通过这些帖子吗?",
        "提示",
        "确定",
        "取消",
        "warning"
      )
        .then(() => {
          let params = { ids: this.selectRows };
          reviewBatchPass(params)
            .then((res) => {
              showNotice(res.msg, "成功", "success");
              this.getPostList();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },

    batchFail() {
      showConfirm(
        "确定这些帖子审核不通过吗?",
        "提示",
        "确定",
        "取消",
        "warning"
      )
        .then(() => {
          let params = { ids: this.selectRows };
          reviewBatchFail(params)
            .then((res) => {
              showNotice(res.msg, "成功", "success");
              this.getPostList();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    onPostDetail(row){
      this.$router.push(`/post/detail/${row.id}`)
    },
  },
};
</script>