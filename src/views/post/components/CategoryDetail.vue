<template>
  <div class="categoryDetail">
    <el-button type="primary" plain size="mini" @click="goBack">返回</el-button>
    <div class="category-div">
      <h3 class="title">
        <span class="title-span">{{ title }}</span>
      </h3>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formData"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="所属主题" prop="topic_id">
          <el-select
            v-model="formData.topic_id"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in topics"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别描述" prop="desc">
          <el-input v-model="formData.desc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="create_time">
          <el-input
            v-model="formData.create_time"
            :disabled="isEdit"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('formData')"
            size="small"
            >{{ submitButtonText }}</el-button
          >
          <el-button @click="resetForm('formData')" size="small"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { allTopic, categoryDetail, editCategory } from "@/api/post";
export default {
  name: "CategoryDetail",
  data() {
    return {
      submitButtonText: "保存编辑",
      rules: {
        name: [
          { required: true, message: "请输入类别名称", trigger: "blur" },
          { max: 15, message: "长度必须小于15" },
        ],
        topic_id: [{ required: true, message: "请选择所属主题", trigger: "blur" }],
        desc: [
          { required: true, message: "请输入描述信息", trigger: "blur" },
          { max: 50, message: "长度必须小于50" },
        ],
        c_time: [{ required: true }],
      },
      formData: {
        name: "",
        topic_id: "",
        desc: "",
        cate_img: "",
        create_time: "",
      },
      title: "",
      topics: [],
      isEdit: true,
      categoryId: "",
    };
  },
  methods: {
    submitForm() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          editCategory({ data: this.formData, id: this.categoryId })
            .then((res) => {
              this.goBack();
            })
            .catch(() => {});
        }
      });
    },
    resetForm() {
      this.$refs["formData"].resetFields();
      this.getCategory();
    },

    goBack() {
      this.$router.go(-1);
    },
    getTopic() {
      allTopic()
        .then((res) => {
          this.topics = res.data;
        })
        .catch(() => {});
    },
    getCategory() {
      categoryDetail({ id: this.categoryId }).then((res) => {
        this.formData = res.data;
        this.title = `编辑类别${this.formData.name}`;
      });
    },
  },
  created() {
    // 判断是编辑还是新增
    if (this.$route.params.action === "edit") {
      this.categoryId = this.$route.params.id;
      this.isEdit = true;
      this.getCategory();
    } else {
      this.isEdit = false;
      this.submitButtonText = "立即创建";
    }
    // 加载所有的topic
    this.getTopic();
  },
};
</script>
<style>
.category-div {
  padding: 10px 80px;
}
.title {
  margin-bottom: 8px;
}
.title-span {
  border-bottom: 3px solid cornflowerblue;
}
</style>
