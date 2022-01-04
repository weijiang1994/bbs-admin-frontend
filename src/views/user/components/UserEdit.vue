<template>
  <el-dialog title="编辑用户" :visible.sync="isShow" @close="closeDialog">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input
          disabled
          v-model="form.username"
          autocomplete="off"
          size="medium"
        ></el-input>
      </el-form-item>

      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input
          disabled
          v-model="form.nickname"
          autocomplete="off"
          size="medium"
        ></el-input>
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input
          disabled
          v-model="form.email"
          autocomplete="off"
          size="medium"
        ></el-input>
      </el-form-item>

      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select
          v-model="form.gender_id"
          placeholder="请选择性别"
          size="medium"
        >
          <el-option
            v-for="item in gender"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-select
          v-model="form.role_id"
          placeholder="请选择角色"
          size="medium"
        >
          <el-option
            v-for="item in role"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="个性签名" :label-width="formLabelWidth">
        <el-input v-model="form.slogan" size="medium" disabled></el-input>
      </el-form-item>

      <el-form-item label="个人网站" :label-width="formLabelWidth">
        <el-input v-model="form.website" size="medium" disabled></el-input>
      </el-form-item>

      <el-form-item label="加入时间" :label-width="formLabelWidth">
        <el-input v-model="form.join" size="medium" disabled></el-input>
      </el-form-item>

      <el-form-item class="text-right">
        <el-button @click="isShow = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="onSubmit()" size="medium"
          >提 交</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { editUser } from "@/api/user";
export default {
  data() {
    this.gender = [
      { label: "保密", value: 1 },
      { label: "男", value: 2 },
      { label: "女", value: 3 },
    ];
    this.role = [
      { label: "超级管理员", value: 1 },
      { label: "老师", value: 2 },
      { label: "学生", value: 3 },
    ];

    return {
      isShow: this.showEdit,
      form: {
        username: "",
        nickname: "",
        gender_id: "",
        email: "",
        role_id: "",
        slogan: "",
        website: "",
        join: "",
      },
      formLabelWidth: "120px",
    };
  },
  props: {
    showEdit: Boolean,
    dialogRow: Object,
  },
  mounted() {
    this.form = this.dialogRow;
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    onSubmit() {
      editUser({
        user: this.form,
      }).then((res) => {
        this.isShow = false;
        this.$emit("edit-finish", res);
      });
    },
  },
};
</script>

<style>
.text-right {
  text-align: right;
}
</style>