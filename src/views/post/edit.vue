<template>
  <div id="editPost">
    <div style="display: flex">
      <div class="operator-button-div">
        <el-button
          type="success"
          size="small"
          :disabled="!selected"
          @click="batchBlockPost"
          >批量封禁</el-button
        >
        <el-button
          type="danger"
          size="small"
          :disabled="!selected"
          @click="batchUnBlockPost"
          >批量解封</el-button
        >
      </div>
      <div class="search-div">
        <search @reset="resetPage" @search="searchPost"></search>
      </div>
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
      <el-table-column prop="status_id" label="帖子状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status_id === 1" type="success">
            {{ scope.row.status }}
          </el-tag>
          <el-tag v-else-if="scope.row.status_id === 2" type="danger">
            {{ scope.row.status }}
          </el-tag>
          <el-tag v-else type="warning">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="edit"
            size="mini"
            @click="onPostDetail(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      @page-change="changeCurrentPage"
      @size-change="changePageSize"
      :disable="paginationData.disable"
    ></pagination>
  </div>
</template>

<script>
import Pagination from "@/components/pagination.vue";
import Search from "@/components/search.vue";
import { showNotice, showConfirm } from "@/util/notice";
import {
  postList,
  postSearch,
  postBatchBlock,
  postBatchUnblock,
} from "@/api/post";
export default {
  data() {
    return {
      selected: false,
      postList: [],
      loading: true,
      paginationData: {
        page: 1,
        limit: 20,
        disable: false,
      },
      total: 0,
      selectRows: [],
    };
  },
  components: {
    Pagination,
    Search,
  },
  methods: {
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
    batchBlockPost() {
      showConfirm(
        "确认封禁这些帖子？",
        "批量封禁帖子",
        "确认",
        "算了",
        "warning"
      )
        .then(() => {
          let params = { postIds: this.selectRows };
          postBatchBlock(params)
            .then((res) => {
              this.getPostList();
              showNotice(res.msg, "封禁成功", "success");
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    batchUnBlockPost() {
      showConfirm(
        "确认解封这些帖子？",
        "批量解封帖子",
        "确认",
        "算了",
        "warning"
      )
        .then(() => {
          let params = { postIds: this.selectRows };
          postBatchUnblock(params)
            .then((res) => {
              this.getPostList();
              showNotice(res.msg, "解封成功", "success");
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    getPostList() {
      let params = {
        page: this.paginationData.page,
        size: this.paginationData.limit,
      };
      postList(params).then((res) => {
        this.postList = res.data;
        this.total = res.total;
      });
    },
    resetPage() {
      this.getPostList();
      this.paginationData.disable = false;
    },
    searchPost(datas) {
      let keyword = datas[0];
      let category = datas[1];
      let params = { keyword, category };
      postSearch(params)
        .then((res) => {
          this.postList = res.data;
          this.paginationData.disable = true;
        })
        .catch(() => {});
    },
    onPostDetail(row){
        this.$router.push(`/post/detail/${row.id}`)
    }
  },
  created() {
    this.loading = false;
    this.getPostList();
  },
};
</script>
<style scoped>
.operator-button-div {
  margin-top: 3px;
}
.search-div {
  flex-grow: 1;
  text-align: end;
}
</style>