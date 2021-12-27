<template>
  <div id="manage">
    <div class="top">
      <div style="flex-grow: 1">
        <el-button
          type="danger"
          size="mini"
          :disabled="!selected"
          @click="deleteBatch"
          >批量屏蔽</el-button
        >
        <el-button
          type="success"
          size="mini"
          :disabled="!selected"
          @click="releaseBatch"
          >批量显示</el-button
        >
      </div>
      <search @search="searchComment" @reset="resetPage"></search>
    </div>
    <el-table
      v-loading="loading"
      :data="commentList"
      style="width: 100%"
      height="600px"
      @selection-change="selectRow"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="author"
        label="评论者"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column header-align="center" prop="body" label="评论内容">
        <template slot-scope="scope">
          <p v-html="scope.row.body"></p>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="c_time"
        label="评论时间"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="status"
        label="评论状态"
      >
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.delete_flag === 0"
            >正常</el-tag
          >
          <el-tag type="danger" v-else>屏蔽</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="post" label="所属帖子">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            v-if="scope.row.delete_flag === 0"
            size="mini"
            @click="deleteComment(scope.row.id)"
            >屏蔽</el-button
          >
          <el-button
            type="success"
            v-else
            size="mini"
            @click="releaseComment(scope.row.id)"
            >显示</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :disabled="paginateData.disabled"
      @size-change="changeSize"
      @page-change="changePage"
    ></pagination>
  </div>
</template>
<script>
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import {
  commentList,
  deleteComment,
  releaseComment,
  deleteBatchComment,
  releaseBatchComment,
  searchComment,
} from "@/api/comment";
import { showNotice } from "@/util/notice";
export default {
  name: "CommentManage",
  data() {
    return {
      selectRows: [],
      loading: true,
      selected: false,
      commentList: [],
      paginateData: {
        page: 1,
        limit: 20,
        disabled: false,
      },
      total: 0,
    };
  },
  components: {
    Search,
    Pagination,
  },
  created() {
    this.getCommentList();
  },
  methods: {
    changeSize(size) {
      this.paginateData.limit = size;
      this.getCommentList();
    },
    changePage(page) {
      this.paginateData.page = page;
      this.getCommentList();
    },
    getCommentList() {
      this.loading = true;
      let params = {
        page: this.paginateData.page,
        size: this.paginateData.limit,
      };
      commentList(params)
        .then((res) => {
          this.commentList = res.data;
          this.total = res.total;
          this.loading = false;
        })
        .catch(() => {});
    },
    selectRow(rows) {
      this.selectRows = rows;
      if (rows.length) this.selected = true;
      else this.selected = false;
    },
    deleteComment(id) {
      deleteComment({ commentId: id }).then((res) => {
        showNotice(res.msg, "成功", "success");
        this.getCommentList();
      });
    },
    releaseComment(id) {
      releaseComment({ commentId: id }).then((res) => {
        showNotice(res.msg, "成功", "success");
        this.getCommentList();
      });
    },
    resetPage() {
      this.getCommentList();
      this.paginateData.disabled = false;
    },
    // 搜索评论信息
    searchComment(datas) {
      searchComment({ keyword: datas[0], category: datas[1] })
        .then((res) => {
          this.commentList = res.data;
          this.paginateData.disabled = true;
        })
        .catch(() => {});
    },
    deleteBatch() {
      let commentIds = [];
      this.selectRows.forEach((item) => {
        commentIds.push(item.id);
      });
      deleteBatchComment({ commentIds }).then((res) => {
        showNotice(res.msg, "成功", "success");
        this.getCommentList();
      });
    },
    releaseBatch() {
      let commentIds = [];
      this.selectRows.forEach((item) => {
        commentIds.push(item.id);
      });
      releaseBatchComment({ commentIds }).then((res) => {
        showNotice(res.msg, "成功", "success");
        this.getCommentList();
      });
    },
  },
};
</script>
<style scoped>
.top {
  display: flex;
}
</style>