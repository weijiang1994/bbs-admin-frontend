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
        <el-form-item label="示例图片" prop="cate_img">
          <div class="img-div">
            <img
              src="https://bbs.2dogz.cn/normal/image/avatars/523ed2a689cf46bfb6c9521e1e139f92_l.png"
              alt=""
            />
            <div style="margin-left: 30px">
              <el-button type="primary" size="mini" @click="changeImage"
                >修改图片</el-button
              >
            </div>
          </div>
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
      <el-dialog
          title="裁剪图片"
          :visible.sync="showChangeImageDialog"
          >
          <div>
              <cropper-image></cropper-image>
          </div>
          
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { allTopic, categoryDetail, editCategory } from "@/api/post";
import { showNotice } from "@/util/notice";
import CropperImage from '@/components/CropperImage'

export default {
  name: "CategoryDetail",
  components: { CropperImage },
  data() {
    return {
      showChangeImageDialog: false,
      submitButtonText: "保存编辑",
      rules: {
        name: [
          { required: true, message: "请输入类别名称", trigger: "blur" },
          { max: 15, message: "长度必须小于15" },
        ],
        cate_img: [
          { required: true, message: "示例图片不能为空!", trigger: "blur" },
        ],
        topic_id: [
          { required: true, message: "请选择所属主题", trigger: "blur" },
        ],
        desc: [
          { required: true, message: "请输入描述信息", trigger: "blur" },
          { max: 50, message: "长度必须小于50" },
        ],
        create_time: [{ required: true, message: "创建时间不能为空" }],
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
    changeImage() {
      this.showChangeImageDialog = true;
    },
    submitForm() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          editCategory({ data: this.formData, id: this.categoryId })
            .then((res) => {
              this.goBack();
              showNotice(res.msg, "编辑成功", "success");
            })
            .catch(() => {});
        }
      });
    },
    resetForm() {
      this.$refs["formData"].resetFields();
      if (this.isEdit) {
        this.getCategory();
      }
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
      this.title = "新增帖子类别";
    }
    // 加载所有的topic
    this.getTopic();
  },
};
</script>
<style>
.category-div {
  padding: 10px 10px;
  margin: 0 30%;
}
.title {
  margin-bottom: 28px;
}
.title-span {
  border-bottom: 3px solid cornflowerblue;
}
.img-div {
  display: flex;
}
.img-div > img {
  max-height: 150px;
  max-width: 150px;
  border-radius: 5px;
}
</style>
