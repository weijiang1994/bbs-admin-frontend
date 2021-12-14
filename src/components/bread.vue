<template>
  <div class="mb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>

      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="mb"></el-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadList: [],
    };
  },
  methods: {
    getBreadList() {
      if (this.$route.matched.length >= 2) {
        let matched = this.$route.matched;
        if (matched[matched.length - 1].name === "Centre") {
          return;
        }
        this.breadList = { title: matched[matched.length - 1].meta.title };
      }
    },
  },
  created() {
    this.getBreadList();
  },
};
</script>

<style scoped>
.mb {
  margin-bottom: 6px;
}
</style>