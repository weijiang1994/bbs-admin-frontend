<template>
  <div>
    <el-dialog :title="title" :visible.sync="isShow" @close="close">
      <el-form
        ref="topicData"
        :model="topicData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="ID:" v-if="!isAdd" inline>
          <el-input v-model="topicData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="主题名:" prop="name">
          <el-input
            v-model="topicData.name"
            placeholder="请输入主题名"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间:" prop="c_time" v-if="!isAdd">
          <el-input
            v-model="topicData.c_time"
            placeholder="请输入创建时间"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item class="text-right">
          <el-button @click="isShow = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="onSubmit('topicData')" size="medium"
            >提 交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addTopic, editTopic } from "@/api/post";
import { showNotice } from "@/util/notice";
export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入主题名称", trigger: "change" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "change",
          },
        ],
        c_time: [
          { required: true, message: "请输入创建时间", trigger: "change" },
        ],
      },
      isShow: this.show,
      topicData: {
        id: "",
        name: "",
        c_time: "",
      },
    };
  },
  props: {
    show: Boolean,
    dialogRow: Object,
    isAdd: Boolean,
    title: String,
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.addTopic();
          } else {
            this.editTopic();
          }
        }
      });
    },
    addTopic() {
      let params = {
        name: this.topicData.name,
        c_time: this.topicData.c_time,
      };
      addTopic(params).then((res) => {
        this.isShow = false;
        this.$emit("add-finish");
        showNotice(res.msg, "添加成功", "success");
      });
    },
    editTopic() {
      editTopic({ name: this.topicData.name, id: this.topicData.id })
        .then((res) => {
          this.isShow = false;
          this.$emit("add-finish");
          showNotice(res.msg, "编辑成功", "success");
        })
        .catch(() => {});
    },
    close() {
      this.$emit("topic-dialog-close");
    },
  },
  mounted() {
    if (this.isAdd) {
      this.topicData.name = "";
    } else {
      this.topicData = this.dialogRow;
    }
  },
};
</script>