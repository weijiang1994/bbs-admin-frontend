<template>
  <div id="topic">
    <div style="display: flex">
      <div class="mt-2">
        <el-button type="primary" size="mini" @click="newTopic"
          >新增主题</el-button
        >
      </div>
      <div class="search-div">
        <search @reset="resetPage" @search="search"></search>
      </div>
    </div>
    <el-table :data="topicList" style="width: 100%" height="680">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div v-if="scope.row.children.length" class="children-div">
            <p><strong>当前主题下的帖子类别:</strong></p>
            <el-table
              :data="scope.row.children"
              style="width: 100%"
              height="220"
            >
              <el-table-column prop="id" label="ID" sortable> </el-table-column>
              <el-table-column prop="name" label="名称"> </el-table-column>
              <el-table-column prop="desc" label="描述信息"> </el-table-column>
              <el-table-column prop="c_time" label="创建时间">
              </el-table-column>
            </el-table>
          </div>
          <div
            v-else
            style="
              text-align: center;
              font-size: 12px;
              font-weight: bold;
              color: #444;
            "
          >
            <p>暂时没有帖子类别归类到该主题下</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="80" sortable>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="name"
        label="主题名称"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="c_time"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column header-align="center" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editTopic(scope.row)" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :disable="paginationData.disabled"></pagination>
    <add-topic-dialog
      v-if="topicDialog.show"
      :show="topicDialog.show"
      :dialogRow="topicDialog.data"
      :isAdd="topicDialog.new"
      @topic-dialog-close="topicDialogClose"
      @add-finish="newTopicFinihsh"
      :title="dialogTitle"
    ></add-topic-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import Search from '@/components/Search'
import { postTopicList, searchTopic } from "@/api/post";
import AddTopicDialog from "./components/AddTopicDialog.vue";
export default {
  data() {
    return {
      total: 0,
      dialogTitle: "",
      topicList: [],
      paginationData: {
        page: 1,
        limit: 20,
        disabled: false,
      },
      topicDialog: {
        show: false,
        data: {},
        new: true,
      },
    };
  },
  components: { Pagination, Search, AddTopicDialog },
  created() {
    this.getTopicList();
  },
  methods: {
    newTopicFinihsh() {
      this.getTopicList();
    },
    resetPage() {
      this.getTopicList();
      this.paginationData.disabled = false;
    },
    getTopicList() {
      let params = {
        page: this.paginationData.page,
        size: this.paginationData.limit,
      };
      postTopicList(params)
        .then((res) => {
          this.topicList = res.data;
        })
        .catch(() => {});
    },
    newTopic() {
      this.topicDialog.show = true;
      this.topicDialog.new = true;
      this.dialogTitle = "添加新的主题";
    },
    editTopic(row) {
      this.topicDialog.show = true;
      this.topicDialog.new = false;
      this.topicDialog.data = row;
      this.dialogTitle = "编辑主题";
    },
    topicDialogClose() {
      this.topicDialog.show = false;
    },
    search(datas) {
      let params = { name: datas[0] };
      searchTopic(params)
        .then((res) => {
          this.topicList = res.data;
          this.paginationData.disabled = true
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
.children-div {
  padding-right: 15px;
  padding-left: 15px;
  background: rgb(166, 195, 248);
  padding-bottom: 15px;
}
</style>