<template>
  <div>
    <el-button type="primary" plain size="mini" @click="back">返回</el-button>
    <div class="post" v-bind:style="{ height: height }">
      <div class="title">
        <h3 class="post-title">{{ post.title }}</h3>
        <p style="margin-top: 5px">
          <span class="sub-title mr"
            ><i class="fa fa-user"></i>{{ post.author }}</span
          >
          <span class="sub-title mr"
            ><i class="fa fa-tag"></i>{{ post.category }}</span
          >
          <span class="sub-title mr"
            ><i class="fa fa-calendar-check-o"></i>{{ post.c_time }}</span
          >
        </p>
      </div>
      <div class="content">
        <article v-html="post.content" v-highlight></article>
      </div>
    </div>
    <div v-if="review.show" style="margin-top: 8px">
      <el-tabs v-model="review.name" @tab-click="switchTab">
        <el-tab-pane label="审核通过" name="pass">
          <el-input type="textarea" :rows="5" value="审核通过" disabled>
          </el-input>
        </el-tab-pane>
        <el-tab-pane label="审核未通过" name="fail">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入审核不通过原因"
            v-model="review.reason"
          >
          </el-input>
        </el-tab-pane>
      </el-tabs>
      <el-button
        type="primary"
        size="small"
        plain
        style="margin-top: 5px"
        @click="reviewPost"
        >审核帖子</el-button
      >
    </div>
    <el-backtop target=".post" :bottom="bottom">
      <div><i class="fa fa-arrow-up"></i></div>
    </el-backtop>
  </div>
</template>


<script>
import { postDetail, postReviewPass, postReviewFail } from "@/api/post";
import { showMessage } from "@/util/notice";
export default {
  name: "PostContent",
  data() {
    return {
      bottom: 300,
      height: "500px",
      post: {
        title: "",
        c_time: "",
        author: "",
        category: "",
        content: "",
      },
      review: {
        pass: true,
        reason: "",
        name: "pass",
        show: true,
      },
      postId: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 如果是从帖子编辑页面路由过来的则不显示下方的帖子审核相关UI
      if (from.path === '/post/edit') {
        vm.review.show = false
        vm.height = '650px'
        vm.bottom = 200
      }
    });
  },
  created() {
    this.getPostDetail();
  },
  methods: {
    getPostDetail() {
      let postId = this.$route.params.id;
      this.postId = postId;
      postDetail(postId)
        .then((res) => {
          this.post = res.data;
        })
        .catch(() => {});
    },

    back() {
      this.$router.go(-1);
    },
    switchTab(tab, event) {
      if (tab.name === "pass") {
        this.review.pass = true;
        this.review.name = "pass";
      } else {
        this.review.pass = false;
        this.review.name = "fail";
      }
    },
    // 审核帖子代码
    reviewPost() {
      if (!this.review.pass && this.review.reason === "") {
        showMessage("请输入审核不通过原因!", "error");
        return;
      }
      if (this.review.pass) {
        let params = { postId: this.postId };
        postReviewPass(params)
          .then((res) => {
            showMessage(res.msg, "success");
            this.$router.go(-1);
          })
          .catch(() => {});
      } else {
        let params = { postId: this.postId, reason: this.review.reason };
        postReviewFail(params).then((res) => {
          showMessage(res.msg, "success");
          this.$router.go(-1);
        });
      }
    },
  },
};
</script>

<style scoped>
.post-title {
  font-size: 22px;
  font-weight: bold;
  line-height: 24px;
}
.title {
  text-align: center;
}
.sub-title {
  padding: 5px;
  border-radius: 5px;
  display: inline;
  color: #333333;
  background: #eeeeee;
}
.sub-title span {
  margin-right: 5px;
}
.sub-title i {
  margin-right: 3px;
}
.post {
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}
.post-title-h1 {
  font-size: 22px;
  font-weight: bold;
}

.hljs {
  display: block;
  padding: 0.5em;
  background: #23241f;
  overflow-y: hidden;
}
.mr {
  margin-right: 5px;
}
</style>