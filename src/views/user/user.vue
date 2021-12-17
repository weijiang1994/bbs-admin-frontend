<style>
</style>
<template>
  <div id="user">
    <bread></bread>
    <search
      @search="searchUser"
      @reset="resetPage"
      :ban="!selected"
      @batch-ban-user="banUsers"
    ></search>
    <el-table
      v-loading="loading"
      :data="userList"
      border
      style="width: 100%"
      height="680"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        fixed="left"
        prop="username"
        label="用户名"
        sortable
        width="120"
      ></el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="120">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        show-overflow-tooltip
        width="240"
      >
      </el-table-column>
      <el-table-column prop="gender" label="性别" sortable width="100">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色"
        :filters="[
          { text: '学生', value: '学生' },
          { text: '超级管理员', value: '超级管理员' },
        ]"
        :filter-method="filterRole"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="slogan" label="个性签名" width="120">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 1 ? 'success' : 'danger'"
            disable-transitions
            effect="dark"
            size="small"
          >
            <p v-if="scope.row.status === 1">正常</p>
            <p v-else>封禁</p>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="website"
        label="个人网站"
        show-overflow-tooltip
        width="200"
      ></el-table-column>
      <el-table-column
        prop="join"
        label="加入时间"
        sortable
        show-overflow-tooltip
        width="180"
      >
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="edit"
            size="mini"
            @click="onEditUser(scope.row)"
            >编辑</el-button
          >

          <el-button
            v-if="scope.row.status === 1"
            type="danger"
            size="mini"
            @click="onBaned(scope.row)"
            >封禁</el-button
          >
          <el-button
            v-else
            size="mini"
            type="warning"
            @click="onUnbaned(scope.row)"
            >解禁</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="pageTotal"
      @page-change="changeCurrentPage"
      @size-change="changePageSize"
      :disable="paginationData.disable"
    ></pagination>
    <edit-user-dialog
      v-if="editDialog.show"
      :showEdit="editDialog.show"
      :dialogRow="editDialog.dialogRow"
      @close-dialog="closeUserEdit"
      @edit-finish="userEditFinish"
    ></edit-user-dialog>
  </div>
</template>

<script>
import Bread from "@/components/bread";
import Pagination from "@/components/pagination";
import {
  getUserList,
  banUser,
  unbanUser,
  queryUser,
  batchBanUser,
} from "@/api/user";
import Search from "./components/search";
import EditUserDialog from "./components/edit";

export default {
  name: "User",
  components: {
    Bread,
    Pagination,
    Search,
    EditUserDialog,
  },
  data() {
    return {
      userList: [],
      loading: true,
      paginationData: {
        page: 1,
        limit: 20,
        disable: false,
      },
      pageTotal: 0,
      selected: false,
      selectedRow: [],
      editDialog: {
        show: false,
        dialogRow: {}
      },
    };
  },
  methods: {
    closeUserEdit() {
      this.editDialog.show = false;
    },
    onEditUser(row) {
      this.editDialog.show = true;
      this.editDialog.dialogRow = {...row}
    },

    // 封禁用户
    onBaned(row) {
      this.showConfirm("确定封禁该用户吗?", "提示", "warning")
        .then(() => {
          let params = { username: row.username };
          banUser(params).then((res) => {
            this.showNotify(res.msg, "成功", "success");
            this.getUser();
          });
        })
        .catch(() => {});
    },

    // 解禁用户
    onUnbaned(row) {
      this.showConfirm("确定解禁该用户吗？", "提示", "warning").then(() => {
        let params = { username: row.username };
        unbanUser(params)
          .then((res) => {
            this.showNotify(res.msg, "成功", "success");
            this.getUser();
          })
          .catch(() => {});
      });
    },
    // 显示确认提示框
    showConfirm(msg, title, type) {
      return this.$confirm(msg, title, {
        type,
      });
    },
    // 显示通知框
    showNotify(msg, title, type) {
      this.$notify({
        title: title,
        message: msg,
        type: type,
        duration: 2 * 1000,
      });
    },
    // 过滤角色
    filterRole(value, row) {
      return row.role === value;
    },
    // 换页
    changeCurrentPage(page) {
      this.paginationData.page = page;
      this.getUser();
    },
    // 切换每页数量
    changePageSize(size) {
      this.paginationData.limit = size;
      this.getUser();
    },
    // 选中行数时触发
    handleSelectionChange(val) {
      if (val.length) this.selected = true;
      else this.selected = false;
      let usernames = [];
      val.forEach((element) => {
        usernames.push(element.username);
      });
      this.selectedRow = usernames;
    },
    // 后端接口获取用户列表
    getUser() {
      this.loading = true;
      getUserList({
        page: this.paginationData.page,
        size: this.paginationData.limit,
      }).then((res) => {
        this.userList = res.data;
        this.pageTotal = res.total;
        this.loading = false;
      });
    },
    // 搜索用户
    searchUser(datas) {
      queryUser({
        keyword: datas[0],
        category: datas[1],
      }).then((res) => {
        this.userList = res.data;
        this.paginationData.disable = true;
      });
    },
    // 重置页面
    resetPage() {
      this.getUser();
      this.paginationData.disable = false;
    },
    // 批量封禁用户
    banUsers() {
      this.showConfirm("确定批量封禁/解封这些用户吗?", "提示", "warning")
        .then(() => {
          if (this.selectedRow.length <= 0) {
            this.showNotify("请先选择需要封禁/解封的数据！", "提示", "warning");
            return;
          }
          batchBanUser({
            users: this.selectedRow,
          }).then((res) => {
            this.showNotify(res.msg, "成功", "success");
            this.getUser();
          });
        })
        .catch(() => {});
    },
    userEditFinish(datas){
      this.showNotify(datas.msg, '成功', 'success')
      this.getUser()
    }
  },
  created() {
    this.getUser();
  },
};
</script>
